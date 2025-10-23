---
title: JavaScript Agent Integration
description: Deploy the Relock JavaScript Agent (relock.js) for invisible, continuous authentication
sidebar_label: JavaScript Agent Integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JavaScript Agent Integration

The JavaScript Agent provides invisible, continuous authentication that works entirely in the background. This is the recommended integration method for production applications requiring maximum security with zero user friction.

## Overview

The JavaScript Agent is a lightweight `relock.js` file that:

- Runs silently in the background
- Provides request-level authentication
- Automatically rotates cryptographic keys
- Works with any authentication system
- Requires zero user interaction after initial setup

## Prerequisites

Before you begin, ensure you have:

- Relock account and gateway configuration
- Reverse proxy setup (required)
- HTTPS enabled on your domain
- Administrative access to your web application

## Step 1: Reverse Proxy Setup

Your reverse proxy must route all requests from `/relock/*` to `https://relock.host/` and include the `X-Key-Wildcard` header with your gateway UUID. This UUID binds requests to your specific gateway configuration.

<Tabs>
  <TabItem value="nginx" label="NGINX">
```nginx
location /relock/ {
  proxy_pass https://relock.host/;
  proxy_set_header Host relock.host;
  proxy_set_header X-Key-Wildcard "your-gateway-uuid";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```
  </TabItem>
  <TabItem value="apache" label="Apache">
```apacheconf
<VirtualHost *:443>
  ServerName example.com
  SSLProxyEngine On
  ProxyRequests Off

  <Location /relock/>
    ProxyPass https://relock.host/relock/
    ProxyPassReverse https://relock.host/relock/
    RequestHeader set X-Key-Wildcard "your-gateway-uuid"
  </Location>
</VirtualHost>
```
  </TabItem>
  <TabItem value="nextjs" label="Next.js Middleware">
```typescript title="middleware.ts"
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Route all /relock/* requests to Relock Cloud
  if (pathname.startsWith('/relock/')) {
    const relockHost = process.env.RELOCK_HOST || 'relock.host';
    const protocol = process.env.RELOCK_PROTOCOL || 'https';
    const url = new URL(`${protocol}://${relockHost}${pathname}`);
    
    // Add the required headers for proper proxying
    const headers = new Headers(request.headers);
    headers.set('Host', relockHost);
    headers.set('X-Key-Wildcard', process.env.RELOCK_GATEWAY_UUID!);
    headers.set('X-Forwarded-For', request.headers.get('x-forwarded-for') || 'unknown');
    headers.set('X-Forwarded-Proto', request.nextUrl.protocol);
    
    return NextResponse.rewrite(url, {
      headers,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/relock/:path*',
};
```
  </TabItem>
</Tabs>

## Step 2: Include the JavaScript Agent

Add the Relock JavaScript agent to your HTML `<head>` section:

```html
<script src="/relock/relock.js" async></script>
```

### Content Security Policy (Recommended)

For enhanced security, use CSP with nonces:

```html
<!-- Set CSP header with nonce -->
<script src="/relock/relock.js" nonce="{{CSP_NONCE}}" async></script>
```

The behavior of the Relock agent differs between Multi-Page Applications (MPAs) and Single-Page Applications (SPAs). MPAs automatically reload the `<head>` on each navigation, while SPAs typically render views dynamically without reloading the entire page.

## Step 3: Understanding Events

The JavaScript agent automatically establishes secure keys and notifies your application when authentication is ready. Listen for these events to integrate with your existing authentication system:

### X-Key-Established Event

This event fires when the Relock agent has successfully established cryptographic keys:

```javascript
window.addEventListener('X-Key-Established', async function (event) {
  console.log('Relock authentication established:', event.detail);
  
  // Get authentication token and signature
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
  
  // Use token and signature for API calls
  console.log('Token:', token);
  console.log('Signature:', signature);
});
```

### X-Key-Rekeying-Done Event

This event fires whenever key rotation or re-initialization has finished:

```javascript
window.addEventListener('X-Key-Rekeying-Done', function (event) {
  console.log('Key rotation completed:', event.detail);
});
```

### Event Payload Structure

Both events include a JSON payload with information about the device authentication process:

```json
{
  "fresh": false,         // First-time interaction with the gateway?
  "valid": true,          // Was the secret validation successful?
  "state": false,         // Was a new key agreement performed?
  "owner": false,         // Device has assigned owner?
  "network": false,       // Network location change?
  "authenticated": false, // Is the user authenticated?
  "status": "OK",         // Human-readable status message
  "code": 200             // Operation status code
}
```

**Event Attributes Explained:**

| Field | Description |
| ----- | ----------- |
| `authenticated` | Boolean. Indicates if the user is authenticated in the current session. |
| `code` | Integer. HTTP-like status code of the operation. |
| `fresh` | Boolean. `true` only for a device interacting with the gateway for the first time. |
| `state` | Boolean. `true` if a new key agreement was performed (e.g., re-keying failure or key collision). |
| `owner` | Boolean. `true` if a user was signed-in before and the device has an owner. |
| `network` | Boolean. `true` if server-side reports network location change. |
| `status` | String. Human-readable description of the operation result. |
| `valid` | Boolean. `true` if the key validation was successful. |

## Step 4: Generate Tokens

Once the `X-Key-Established` event fires, you can generate authentication tokens:

```javascript
window.addEventListener('X-Key-Established', async function (event) {
  // Generate a fresh token
  const token = await window.relock.token();
  
  // Sign the token
  const signature = await window.relock.sign(token);
  
  // Get the device public key (for backend verification)
  const publicKey = window.relock.public;
  
  // Use these for API authentication
  console.log('Token:', token);
  console.log('Signature:', signature);
  console.log('Public Key:', publicKey);
});
```

### JavaScript API Reference

The `window.relock` object provides these methods:

- `window.relock.token()` - Generate a fresh authentication token
- `window.relock.sign(token)` - Sign a token with the device's private key
- `window.relock.public` - Get the device's public key (hex-encoded)

## Step 5: Multi-Tab Support

Relock natively supports multi-tab browsing without compromising security. Each browser tab is enumerated with a unique tab identifier. If a new tab is opened and the identifier changes, the Relock agent automatically invokes a fresh session agreement with the gateway.

This ensures that:
- SOTTs remain single-use and tied to the active tab context
- Tokens or session state cannot be replayed across tabs
- Race conditions between parallel requests in different tabs are avoided

From the user's perspective, the experience is seamless: opening new tabs continues the session, but cryptographic material is refreshed to preserve origin binding and one-time-use guarantees.

## Step 6: SPA Routing

Single-Page Applications (SPAs) update the page content dynamically without reloading the entire page. Because the `<head>` section is not reloaded on navigation, the Relock agent must be manually notified whenever a view change occurs.

Dispatch the `X-Key-View-Change` event when your application's route changes:

```javascript
// Dispatch the event when route changes
let event = new CustomEvent(
  'X-Key-View-Change',
  { bubbles: false }
);
window.dispatchEvent(event);
```

### Framework Router Integration

Many JavaScript frameworks allow you to handle this automatically within their routing mechanisms:

**React Router Example:**
```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Dispatch event on route change
    const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
    window.dispatchEvent(event);
  }, [location]);
  
  return <div>Your app content</div>;
}
```

**Vue Router Example:**
```javascript
// In your Vue app
router.afterEach(() => {
  const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
  window.dispatchEvent(event);
});
```

**Angular Router Example:**
```javascript
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
      window.dispatchEvent(event);
    });
}
```

## HTTP Strict Transport Security (HSTS)

Relock depends on the integrity of the browser's origin enforcement. To prevent downgrade or redirection attacks, it is strongly recommended to enable HTTP Strict Transport Security (HSTS) on all domains that integrate Relock.

**Recommended configuration:**

```html
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

Where:
- `max-age=63072000` enforces HTTPS for two years
- `includeSubDomains` applies the rule to all subdomains
- `preload` allows the domain to be added to browser preload lists for protection from the very first request

## Next Steps

Now that you have the JavaScript Agent deployed, you can:

1. **[Implement backend verification](/docs/guides/request-verification)** - Learn how to verify tokens and signatures on your server
2. **[Add user management](/docs/guides/user-management)** - Implement login/logout and remember-me functionality
3. **[Choose a framework guide](/docs/guides)** - See framework-specific implementation patterns
4. **[Secure your deployment](/docs/guides/content-security-policy)** - Implement CSP, SRI, and other security measures

## Troubleshooting

### Common Issues

**Script not loading:**
- Verify your reverse proxy configuration
- Check that `/relock/relock.js` resolves to `https://relock.host/relock.js`
- Ensure the `X-Key-Wildcard` header is set correctly

**Events not firing:**
- Check browser console for JavaScript errors
- Verify the script is loaded before your event listeners
- Ensure HTTPS is enabled (required for Relock)

**Tokens not generating:**
- Wait for the `X-Key-Established` event before calling `window.relock.token()`
- Check that the gateway is properly configured
- Verify network connectivity to `relock.host`

### Getting Help

- **Documentation**: Check our [API Reference](/docs/api/js-agent-api) for complete JavaScript API details
- **Examples**: See working implementations in our [examples](/docs/examples)
- **Support**: Contact us at [hi@relock.security](mailto:hi@relock.security)