---
title: SameSite Integration Quickstart
description: Get started with Relock SameSite Integration using reverse proxy
sidebar_label: SameSite Integration
---

# SameSite Integration Quickstart

Get Relock SameSite Integration up and running with reverse proxy configuration.

## Quick Concept Summary

SameSite Integration uses a reverse proxy to handle Relock authentication while maintaining your domain in the browser address bar. This approach provides:

- **Branding Control**: Authentication appears to happen on your domain
- **Enhanced Security**: Proxy provides additional security layer
- **Compliance Ready**: Meets enterprise security requirements
- **Customizable**: Proxy can implement custom security policies

**For detailed architecture and security model, see [SameSite Integration Reference](../integration/samesite-integration.md)**

## Prerequisites

- A web application with HTTPS enabled
- Access to configure reverse proxy (nginx, Apache, etc.)
- Basic understanding of web server configuration
- Relock gateway UUID (provided during setup)

## Step 1: Set Up Your Gateway

### 1.1 Create Gateway

1. Visit [relock.host](https://relock.host)
2. Click "Create Gateway"
3. Enter your domain (e.g., `example.com`)
4. Choose "SameSite Integration" as your pattern
5. Copy your gateway UUID

### 1.2 Configure Return Routes

Set up where users return after authentication:

- **Trusted Device Route**: `https://example.com/require_password_only`
- **New Device Route**: `https://example.com/make_idv_authentication`

## Step 2: Configure Reverse Proxy

### 2.1 Nginx Configuration

```nginx
location /relock/ {
  proxy_pass https://relock.host/;
  proxy_set_header Host relock.host;
  proxy_set_header X-Key-Wildcard "your-gateway-uuid";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
  
  # Security headers
  proxy_hide_header X-Key-Wildcard;
  proxy_set_header X-Real-IP $remote_addr;
  
  # Timeout settings
  proxy_connect_timeout 30s;
  proxy_send_timeout 30s;
  proxy_read_timeout 30s;
}
```

### 2.2 Apache Configuration

```xml
<Location /relock/>
  ProxyPass https://relock.host/relock/
  ProxyPassReverse https://relock.host/relock/
  RequestHeader set X-Key-Wildcard "your-gateway-uuid"
  
  # Security headers
  RequestHeader unset X-Key-Wildcard
  RequestHeader set X-Real-IP %{REMOTE_ADDR}s
  
  # Timeout settings
  ProxyTimeout 30
</Location>
```

### 2.3 Caddy Configuration

```caddy
example.com {
  reverse_proxy /relock/* https://relock.host {
    header_up Host {upstream_hostport}
    header_up X-Key-Wildcard "your-gateway-uuid"
    
    # Security headers
    header_down -X-Key-Wildcard
    header_down X-Real-IP {remote_host}
  }
}
```

## Step 3: Implement Authentication Flow

### 3.1 Redirect to Proxied Path

```javascript
function handleSignInClick() {
  const randomUUID = generateUUID();
  const relockUrl = `https://example.com/relock/gateway/${randomUUID}`;
  
  sessionStorage.setItem('relock_transaction', randomUUID);
  window.location.href = relockUrl;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

### 3.2 Handle Response

```javascript
function handleRelockResponse(request) {
  const transaction = request.form.get('X-Key-Transaction');
  const signature = request.form.get('X-Key-Transaction-Signature');
  
  if (verifyRelockSignature(transaction, signature)) {
    if (isTrustedDevice(request)) {
      redirectToPasswordOnly();
    } else {
      redirectToMFAFlow();
    }
  } else {
    handleVerificationError();
  }
}
```

### 3.3 User Login Hook (Optional)

```javascript
async function loginToRelock(userId, email, token, signature, sessionId) {
  const response = await fetch("/relock/login", {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "X-Key-Token": token,
      "X-Key-Signature": signature,
      "X-Key-Session": sessionId,
      "user": userId,
      "email": email
    })
  });
  
  return response.json();
}
```

## Step 4: Security Configuration

### 4.1 Proxy Security Headers

```nginx
# Add to your nginx configuration
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none';" always;
```

### 4.2 Rate Limiting

```nginx
# Rate limiting for Relock endpoints
limit_req_zone $binary_remote_addr zone=relock:10m rate=10r/s;

location /relock/ {
  limit_req zone=relock burst=20 nodelay;
  
  proxy_pass https://relock.host/;
  # ... other proxy settings
}
```

### 4.3 Access Control

```nginx
# Restrict access to specific IP ranges if needed
location /relock/ {
  allow 10.0.0.0/8;
  allow 172.16.0.0/12;
  allow 192.168.0.0/16;
  deny all;
  
  proxy_pass https://relock.host/;
  # ... other proxy settings
}
```

## Step 5: Test Your Integration

### 5.1 Test Flow

1. Navigate to your application
2. Click the sign-in button
3. Verify redirect to `example.com/relock/gateway/...`
4. Complete device verification
5. Verify return to your application
6. Check signature validation

### 5.2 Debug Mode

Enable debug logging in your proxy:

```nginx
# Nginx debug logging
error_log /var/log/nginx/relock_debug.log debug;

location /relock/ {
  proxy_pass https://relock.host/;
  # ... other settings
}
```

### 5.3 Verify Proxy Headers

Check that headers are being forwarded correctly:

```bash
# Test proxy configuration
curl -H "X-Key-Wildcard: test" https://example.com/relock/status
```

## Step 6: Production Deployment

### 6.1 Security Checklist

- [ ] HTTPS enabled on all pages
- [ ] Proxy security headers configured
- [ ] Rate limiting implemented
- [ ] Access control configured
- [ ] Signature verification implemented
- [ ] Error handling implemented
- [ ] Audit logging enabled
- [ ] Monitoring configured

### 6.2 Monitoring

Set up monitoring for:
- Proxy response times
- Authentication success/failure rates
- Rate limiting events
- Security events
- Network errors

## Troubleshooting

### Common Issues

**Proxy not forwarding requests**
- Verify proxy configuration syntax
- Check proxy logs for errors
- Ensure proxy module is enabled
- Verify upstream connectivity

**Headers not being set**
- Check proxy_set_header directives
- Verify header names are correct
- Ensure no conflicting directives
- Check for header filtering

**Authentication failures**
- Verify gateway UUID is correct
- Check proxy header forwarding
- Ensure HTTPS is enabled
- Verify return routes configuration

### Getting Help

- **Documentation**: [SameSite Integration Reference](../integration/samesite-integration.md)
- **Architecture**: [How Relock Works](../concepts/how-it-works)
- **Security**: [Security Model](../concepts/security-model)
- **Deployment**: [Reverse Proxy Configuration](../deployment/reverse-proxy)
- **Support**: [Contact Relock Support](https://relock.host/support)

## Next Steps

Once your SameSite Integration is working:

- **Enhance Security**: Add advanced proxy security features
- **Improve Performance**: Optimize proxy configuration
- **Scale Up**: Add load balancing and high availability
- **Advanced Features**: Implement custom security policies

## Security Best Practices

- Always verify Relock's response signature
- Configure proxy security headers properly
- Implement rate limiting and access control
- Monitor proxy logs for suspicious activity
- Keep proxy software updated
- Use HTTPS for all communications
- Implement proper error handling

---

**Need help?** See the [SameSite Integration Reference](../integration/samesite-integration.md) for detailed architecture and security information.
