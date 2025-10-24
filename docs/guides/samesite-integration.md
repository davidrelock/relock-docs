---
title: SameSite Integration
description: Deploy Relock with SameSite redirects using reverse proxy for brand-consistent authentication
sidebar_label: SameSite Integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# SameSite Integration

SameSite Integration makes the Relock authentication flow appear under your own domain while keeping the same logic as the simple redirect option. Cryptographic keys are stored within your domain and are bound to the browser's origin, ensuring they cannot be shared across unrelated sites.

## Overview

SameSite Integration provides:

- **Brand consistency**: Users never leave your domain
- **Enhanced security**: Proxy provides additional security layer
- **First-party cookies**: Better browser security policies
- **User management**: Ability to track sign-in/sign-out events
- **Simplified integration**: No application logic changes required

## Prerequisites

Before you begin, ensure you have:

- Relock account and access to the Relock Admin Panel
- Administrative access to your web application or authentication system
- Valid SSL/TLS certificate configured on your domain
- Reverse proxy or load balancer (NGINX, Apache, or similar)

## Step 1: Create and Configure Gateway

1. Sign up for your account at [relock.host](https://relock.host)
2. Navigate to **Your Gateways** in the dashboard
3. Click **Add new domain** and enter your domain name
4. Click on your domain in the active gateway list
5. Navigate to **Access Keys** to get your unique Gateway UUID

## Step 2: Configure Return Routes

In the Relock Admin Panel, configure return routes (URLs) for completed verification in the Core settings tab:

- **Known/Trusted** device → `https://example.com/require_password_only`
- **New/Fresh** device → `https://example.com/make_idv_authentication`

:::important Origin Verification
The redirect routes must be configured **exactly the same** as in the simple integration. The Relock gateway enforces strict origin verification during its internal checks. If the redirect routes do not match the expected origin of the requests, the device will always be treated as new (or "fresh"), even if it is actually trusted.

Therefore, you must provide a **complete URL including the domain name** when configuring return routes in the Relock Admin Panel.
:::

## Step 3: Reverse Proxy Configuration

Your reverse proxy must route all requests where the path starts with `/relock/` to the Relock gateway on the third-party server at `relock.host`.

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

## Step 4: Implement Redirect Flow

When a user triggers a sign-in action (clicks the sign-in button), redirect the user to the authentication gateway:

```javascript
// Redirect to your proxied Relock gateway
window.location.href = 'https://example.com/relock/gateway/<RANDOM_UUID>';
```

The gateway will be accessible at:
```
https://example.com/relock/gateway/<RANDOM_UUID>
```

### Authentication Flow

1. **Sign-in Triggered**: The user is redirected to your domain's Relock gateway
2. **Spinner/Loading Page**: Cryptographic keys are verified and rotated in the background
3. **Redirect Back**: Based on the verification result, the user is redirected to one of your configured routes

**Trusted Device** → The user proceeds directly to password entry, accompanied by a one-time token and a cryptographic signature proving the device is trusted.

**New Device** → A fresh credential is enrolled. The authentication flow must then continue with an additional factor, such as an OTP code (e.g., password + OTP or email confirmation).

## Step 5: Handle Response

The redirect back to your application will be sent as a **POST** request containing a cryptographically signed Random_UUID, along with additional information about the device.

### Response Verification

Always verify Relock's response signature using Ed25519 with the public key generated in the Admin Panel. This ensures that every response truly originates from Relock and has not been tampered with in transit.

<Tabs>
  <TabItem value="python" label="Python Flask Example">
```python
import base64
import binascii
from nacl.signing import VerifyKey

def verify_relock_response(request):
    transaction = request.form.get('X-Key-Transaction', str())
    signature_hex = request.form.get('X-Key-Transaction-Signature', str())
    
    # Get public key from Relock Admin panel
    public_key_b64 = "9BvLN49xYMLfUnVLi4ncvdIQHrhEo6/A15EaPHas2B4="
    
    transaction_bytes = binascii.unhexlify(transaction)
    signature = binascii.unhexlify(signature_hex)
    public_key = base64.b64decode(public_key_b64)
    
    # Verify signature
    verify_key = VerifyKey(public_key)
    try:
        verify_key.verify(transaction_bytes, signature)
        return True
    except Exception as e:
        print("Signature invalid:", e)
        return False
```
  </TabItem>
  <TabItem value="node.js" label="Node.js Express Example">
```javascript
const crypto = require('crypto');
const { createVerify } = require('crypto');

function verifyRelockResponse(req, res, next) {
  const transaction = req.body['X-Key-Transaction'];
  const signature = req.body['X-Key-Transaction-Signature'];
  
  // Get public key from Relock Admin panel
  const publicKeyB64 = "9BvLN49xYMLfUnVLi4ncvdIQHrhEo6/A15EaPHas2B4=";
  const publicKey = Buffer.from(publicKeyB64, 'base64');
  
  try {
    const verify = createVerify('ed25519');
    verify.update(Buffer.from(transaction, 'hex'));
    
    if (verify.verify(publicKey, Buffer.from(signature, 'hex'))) {
      next();
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Signature verification failed' });
  }
}
```
  </TabItem>
</Tabs>

## Step 6: Login Hook (Optional)

When integrating a Single-Page Application (SPA) where the frontend stores sensitive user data, you can log the user directly into the Relock gateway with a simple fetch request. This approach allows the SPA to establish the **device owner** within the gateway without requiring any redirects or additional friction.

### Frontend Login Hook

```javascript
async function loginToRelock(user, email, token, signature, xsid) {
  return await fetch("/relock/login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "X-Key-Token": token,
      "X-Key-Signature": signature,
      "X-Key-Session": xsid,
      "user": user,
      "email": email
    })
  }).then((res) => res.json());
}
```

### Backend Session Cookie Handling

For non-SPA web applications, you must additionally provide an **HTTP_ONLY session cookie** that is included in your backend request by the browser. Locate the `X-Key-Session` cookie value and include it as a JSON attribute in the request.

**Python Flask Example:**
```python
xsid = request.cookies.get('X-Key-Session', str())
```

**Node.js Express Example:**
```javascript
const xsid = req.cookies['X-Key-Session'] || '';
```

## Benefits of SameSite Integration

### First-Party Cookies
Because the request appears to originate from your domain, Relock can set cookies that are treated as first-party by the browser. This makes session management more secure and reliable compared to third-party cookies.

### Consistent User Experience
The verification flow feels seamless to users since they never leave your domain, even though the authentication process is being proxied to Relock in the background.

### Simplified Integration
You don't need to modify your application logic. Instead, your reverse proxy or load balancer forwards requests to Relock whenever the path begins with `/relock/`.

### User Management
Unlike Simple Integration, SameSite Integration allows you to:
- Track user sign-in and sign-out events
- Pass user information to the gateway
- Implement device ownership
- Simplify authentication flows for returning users

## Best Practices

### Security Considerations

1. **Verify all responses**: Always verify Relock's response signature using Ed25519
2. **Use HTTPS**: Ensure all communication is encrypted
3. **Validate origins**: Check that requests come from expected sources
4. **Log security events**: Monitor for suspicious activity

### Performance Optimization

1. **Cache public keys**: Store the Ed25519 public key securely
2. **Optimize proxy**: Configure your reverse proxy for optimal performance
3. **Monitor latency**: Track response times for authentication flows

## Troubleshooting

### Common Issues

**Device always treated as new:**
- Check that return routes match exactly (including domain)
- Verify origin headers are set correctly
- Ensure proxy configuration is working

**Signature verification fails:**
- Verify the public key is correct
- Check that the transaction and signature are properly encoded
- Ensure no whitespace or encoding issues

**Redirects not working:**
- Verify proxy configuration
- Check that `/relock/` path is properly routed
- Ensure `X-Key-Wildcard` header is set

## Next Steps

Now that you have SameSite Integration deployed, you can:

1. **[Upgrade to JavaScript Agent](/docs/guides/js-agent-integration)** - For maximum security and seamless UX

## Getting Help

- **Examples**: See working implementations in our [examples](/docs/examples/nextjs/minimal)
- **Support**: Contact us at [hi@relock.security](mailto:hi@relock.security)