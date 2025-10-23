import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# JavaScript Agent Integration

The JavaScript Agent provides invisible, continuous authentication that works entirely in the background. This is the recommended integration method for production applications.

## Overview

The JavaScript Agent:
- Runs silently in the background
- Provides request-level authentication
- Automatically rotates cryptographic keys
- Works with any authentication system
- Requires zero user interaction after initial setup

## Prerequisites

- Relock account and gateway configuration
- Reverse proxy setup (required)
- HTTPS enabled on your domain
- Node.js 18+ for development

## Step 1: Reverse Proxy Setup

Your reverse proxy must route all requests from `/relock/*` to `https://relock.host/` and include the `X-Key-Wildcard` header with your gateway UUID.

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
    headers.set('X-Key-Wildcard', process.env.RELOCK_GATEWAY_UUID);
    headers.set('X-Forwarded-For', request.headers.get('x-forwarded-for') || 'unknown');
    headers.set('X-Forwarded-Proto', request.nextUrl.protocol);
    
    return NextResponse.rewrite(url, {
      headers,
    });
  }

  return NextResponse.next();
}
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

Example CSP header:
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM_NONCE}' 'strict-dynamic';
  connect-src 'self' https://relock.host;
  style-src 'self';
  img-src 'self' data:;
  frame-ancestors 'none';
  base-uri 'none';
  object-src 'none';
  upgrade-insecure-requests;
  require-trusted-types-for 'script';
```

## Step 3: Handle Authentication Events

The JavaScript agent fires events when authentication state changes. Listen for these events to manage your application flow:

```javascript
// Wait for Relock agent to be ready
window.addEventListener('X-Key-Established', async function (event) {
  console.log('Relock authentication established:', event.detail);
  
  // Get authentication token and signature
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
  
  // Use token and signature for API calls
  console.log('Token:', token);
  console.log('Signature:', signature);
});

// Handle re-keying events
window.addEventListener('X-Key-Rekeying-Done', function (event) {
  console.log('Key rotation completed:', event.detail);
});
```

## Step 4: Backend Verification

Verify authentication on your backend using the tokens and signatures provided by the JavaScript agent.

### Basic Verification

For non-critical requests, verify the signature using the device's public key:

```javascript
// Get the device public key
window.addEventListener('X-Key-Established', function (event) {
  console.log('Device public key:', window.relock.public);
});
```

Store this public key on your backend and use it to verify signatures.

### Critical Verification

For critical requests, use the Relock confirmation endpoint:

```javascript
async function verifyAuthentication() {
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
  const xsid = getCookie('X-Key-Session'); // Get from HTTP-only cookie
  
  const response = await fetch('/relock/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'X-Key-Token': token,
      'X-Key-Signature': signature,
      'X-Key-Session': xsid
    })
  });
  
  return response.json();
}
```

## Step 5: User Authentication

Link users to their devices for seamless authentication:

```javascript
async function loginUser(userId, email) {
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
  const xsid = getCookie('X-Key-Session');
  
  const response = await fetch('/relock/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'X-Key-Token': token,
      'X-Key-Signature': signature,
      'X-Key-Session': xsid,
      'user': userId,
      'email': email
    })
  });
  
  return response.json();
}
```

## Single Page Applications (SPAs)

For SPAs, dispatch the `X-Key-View-Change` event when the view changes:

```javascript
// Dispatch when route changes
let event = new CustomEvent('X-Key-View-Change', { bubbles: false });
window.dispatchEvent(event);
```

### React Router Example

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Notify Relock of view change
    const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
    window.dispatchEvent(event);
  }, [location]);
  
  return <div>Your app content</div>;
}
```

### Next.js Router Example

```javascript
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = () => {
      const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
      window.dispatchEvent(event);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);
  
  return <Component {...pageProps} />;
}
```

## Security Best Practices

### HTTP Strict Transport Security (HSTS)

Enable HSTS to prevent downgrade attacks:

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Subresource Integrity (SRI)

Use SRI to verify script integrity:

```html
<script src="/relock/relock.js"
        integrity="sha384-..."
        crossorigin="anonymous"
        nonce="{{CSP_NONCE}}"
        async></script>
```

### Cookie Security

Set secure cookies for session management:

```javascript
// Set secure, HTTP-only cookies
res.cookie('X-Key-Session', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
});
```

## Troubleshooting

### Common Issues

**Relock agent not loading**
- Check reverse proxy configuration
- Verify gateway UUID is correct
- Ensure HTTPS is enabled

**Authentication failing**
- Check CSP configuration
- Verify token and signature generation
- Review backend verification logic

**SPA navigation issues**
- Ensure `X-Key-View-Change` events are dispatched
- Check for JavaScript errors in console
- Verify event listeners are properly set up

### Debug Mode

Enable debug logging:

```javascript
// Enable Relock debug mode
window.relock.debug = true;
```

## Next Steps

- Learn about [Next.js Integration](./nextjs-integration) for complete examples
- Check the [API Reference](../api) for technical details
- Review [Security Best Practices](../security/best-practices) for production deployment