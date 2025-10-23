import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Quick Start Guide

How to quickly add Relock continuous authentication to your website.

Relock is a continuous authentication platform that helps businesses protect their applications from
account takeover, session hijacking, and unauthorized access. Relock capabilities include:

* **Continuous Authentication**: Automatically verify user identity on every request without user
  interaction
* **Cryptographic Key Management**: Secure, rotating keys that can't be stolen or replicated
* **Zero User Friction**: Invisible authentication that works in the background

In this guide, we will quickly get you started with Relock so you can test it out yourself.

## 1. Create a Gateway Account

A gateway is your secure connection point between your domain and Relock's authentication services.
Each domain gets its own unique identifier for security isolation.

1. Sign up for your account at [relock.host](https://relock.host)
2. Navigate to **Your Gateways** in the dashboard
3. Click **Add new domain** and enter your domain name
4. Click on your domain in the active gateway list
5. Navigate to **Access Keys** to get your unique Gateway ID

## 2. Set Up Environment Variables

These variables tell your application how to connect to Relock's services securely. Store them in
your `.env` file or deployment environment.

```properties
RELOCK_GATEWAY_UUID=your-gateway-uuid-here
RELOCK_HOST=relock.host
RELOCK_PROTOCOL=https
```

## 3. Configure Reverse Proxy

The reverse proxy routes Relock's JavaScript agent and API calls through your domain, making it
appear as if Relock is part of your application. This ensures first-party cookies and maintains
origin binding for security.

<Tabs>
  <TabItem value="nginx" label="NGINX">
```nginx
location /relock/ {
  proxy_pass https://relock.host/;
  proxy_set_header Host relock.host;
  proxy_set_header X-Key-Wildcard "RELOCK_GATEWAY_UUID";
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
    RequestHeader set X-Key-Wildcard "RELOCK_GATEWAY_UUID"
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

## 4. Add the Relock Script

The JavaScript agent runs invisibly in the background, establishing cryptographic keys with the
user's device. Include it in your HTML `<head>` section:

```html
<script src="/relock/relock.js" async></script>
```

:::info
With the proxy settings in step 3, this request ends up resolving to `https://relock.host/relock/relock.js`
:::

## 5. Handle Authentication Events

The JavaScript agent automatically establishes secure keys and notifies your application when
authentication is ready. Listen for these events to integrate with your existing authentication
system:

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

## What's Next

* Not sure Relock is for you? See our [Use Cases](../use-cases) or [Examples](../examples)
* Questions about how it works? See the [Concepts](../concepts) section
* Ready for production? Check our [Security Best Practices](../security/best-practices)
* Need help? Contact us at [hi@relock.security](mailto:hi@relock.security)
