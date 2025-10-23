---
title: Troubleshooting Guide
description: Common issues and solutions for Relock deployment
sidebar_label: Troubleshooting
---

# Troubleshooting Guide

This guide covers common issues you may encounter when deploying Relock and provides solutions to resolve them quickly.

## Common Issues

### Device Always Treated as New

**Symptoms:**
- Users are always redirected to MFA flow
- Device verification never succeeds
- Return routes not working properly

**Causes and Solutions:**

#### 1. Return Route Configuration
**Problem**: Return routes don't match your domain exactly.

**Solution**: Ensure return routes include full URLs with domain:
```javascript
// ❌ Incorrect - missing domain
/require_password_only

// ✅ Correct - full URL
https://example.com/require_password_only
```

**Check**: Verify in Relock Admin Panel → Core Settings → Return Routes

#### 2. SSL/TLS Issues
**Problem**: Mixed content or certificate problems.

**Solution**: Ensure consistent HTTPS usage:
```nginx
# Force HTTPS redirect
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}
```

**Check**: Verify all URLs use HTTPS, no mixed content warnings

#### 3. Domain Mismatch
**Problem**: Gateway domain doesn't match return routes.

**Solution**: Ensure gateway domain matches exactly:
```javascript
// Gateway domain: example.com
// Return routes must be: https://example.com/...
// Not: https://www.example.com/... or https://app.example.com/...
```

### Signature Verification Failures

**Symptoms:**
- `Signature invalid` errors
- Authentication requests rejected
- Backend validation failures

**Causes and Solutions:**

#### 1. Public Key Mismatch
**Problem**: Using wrong public key from Admin Panel.

**Solution**: Get fresh public key from Gateway Access Keys tab:
```python
# Verify you're using the correct key
public_key_b64 = "9BvLN49xYMLfUnVLi4ncvdIQHrhEo6/A15EaPHas2B4="
```

**Check**: Relock Admin Panel → Gateway Access Keys → Copy fresh key

#### 2. Encoding Issues
**Problem**: Incorrect hex encoding of tokens/signatures.

**Solution**: Ensure proper hex encoding:
```python
import binascii

# Convert hex strings to bytes correctly
transaction_bytes = binascii.unhexlify(transaction)
signature_bytes = binascii.unhexlify(signature_hex)

# Verify no whitespace or encoding issues
transaction = transaction.strip()
signature_hex = signature_hex.strip()
```

#### 3. Byte Order Issues
**Problem**: Incorrect byte representation handling.

**Solution**: Use consistent byte handling:
```python
# Ensure exact byte representation
transaction = request.form.get('X-Key-Transaction', '').encode('utf-8')
signature = binascii.unhexlify(signature_hex)

# Verify with exact bytes
verify_key.verify(transaction, signature)
```

### Reverse Proxy Issues

**Symptoms:**
- 502 Bad Gateway errors
- `/relock/*` paths not routing
- Header injection not working

**Causes and Solutions:**

#### 1. Nginx Configuration
**Problem**: Incorrect proxy configuration.

**Solution**: Verify Nginx configuration:
```nginx
location /relock/ {
    # Ensure correct proxy_pass
    proxy_pass https://relock.host/;
    
    # Verify header injection
    proxy_set_header X-Key-Wildcard "your-gateway-uuid";
    
    # Check Host header
    proxy_set_header Host relock.host;
}
```

**Check**: `sudo nginx -t` and restart Nginx

#### 2. Apache Configuration
**Problem**: Missing modules or incorrect VirtualHost.

**Solution**: Enable required modules:
```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod headers
sudo systemctl restart apache2
```

**Check**: Verify modules are loaded: `apache2ctl -M | grep proxy`

#### 3. Header Injection
**Problem**: `X-Key-Wildcard` header not being set.

**Solution**: Verify header configuration:
```xml
<Location /relock/>
    ProxyPass https://relock.host/relock/
    ProxyPassReverse https://relock.host/relock/
    RequestHeader set X-Key-Wildcard "your-unique-uuid"
</Location>
```

**Check**: Use browser dev tools to verify headers are set

### JavaScript Agent Issues

**Symptoms:**
- `relock.js` not loading
- Events not firing
- Tokens not generating

**Causes and Solutions:**

#### 1. Script Loading
**Problem**: `relock.js` not accessible.

**Solution**: Verify script path and proxy:
```html
<!-- Check script path -->
<script src="/relock/relock.js" async></script>

<!-- Verify proxy routes /relock/* to Relock -->
```

**Check**: Browser Network tab shows successful script load

#### 2. CSP Violations
**Problem**: Content Security Policy blocking script execution.

**Solution**: Configure CSP with nonces:
```javascript
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM_NONCE}' 'strict-dynamic';
  connect-src 'self' https://relock.host;
```

**Check**: Browser console for CSP violation errors

#### 3. Event Handling
**Problem**: Events not firing or handlers not working.

**Solution**: Verify event listeners:
```javascript
// Ensure events are captured
window.addEventListener('X-Key-Established', function(event) {
    console.log('Keys established:', event.detail);
});

// Check for JavaScript errors
console.error('Relock events:', window.relock);
```

**Check**: Browser console for JavaScript errors

## Debugging Steps

### 1. Check Network Connectivity

Verify Relock service is reachable:

```bash
# Test basic connectivity
curl -I https://relock.host/health

# Test with your domain
curl -I https://example.com/relock/health

# Check DNS resolution
nslookup relock.host
```

### 2. Verify Proxy Configuration

Test reverse proxy routing:

```bash
# Test header injection
curl -H "X-Key-Wildcard: test" \
     -I https://example.com/relock/health

# Expected: X-Key-Wildcard should be overwritten
# with your gateway UUID, not "test"
```

### 3. Check SSL/TLS Configuration

Verify certificate and configuration:

```bash
# Test SSL connection
openssl s_client -connect example.com:443 -servername example.com

# Check certificate chain
openssl x509 -in certificate.crt -text -noout
```

### 4. Monitor Logs

Check relevant log files:

#### Nginx Logs
```bash
# Error logs
sudo tail -f /var/log/nginx/error.log

# Access logs
sudo tail -f /var/log/nginx/access.log
```

#### Apache Logs
```bash
# Error logs
sudo tail -f /var/log/apache2/error.log

# Access logs
sudo tail -f /var/log/apache2/access.log
```

#### Application Logs
```javascript
// Add logging to your application
console.log('Relock request:', {
    token: req.body['X-Key-Token']?.substring(0, 8) + '...',
    signature: req.body['X-Key-Token-Signature']?.substring(0, 8) + '...',
    session: req.body['X-Key-Session']
});
```

## Performance Issues

### Slow Authentication

**Symptoms:**
- Long response times
- User experience degradation
- Timeout errors

**Solutions:**

#### 1. Optimize Network
```nginx
# Reduce proxy timeouts
proxy_connect_timeout 10s;
proxy_send_timeout 10s;
proxy_read_timeout 10s;

# Enable keepalive
proxy_http_version 1.1;
proxy_set_header Connection "";
```

#### 2. Cache Optimization
```nginx
# Cache static resources
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

#### 3. Load Balancing
```nginx
# Multiple upstream servers
upstream relock_backend {
    server relock.host:443 max_fails=3 fail_timeout=30s;
    keepalive 32;
}
```

### High Error Rates

**Symptoms:**
- Many failed authentications
- Increased support tickets
- Security alerts

**Solutions:**

#### 1. Monitor Error Patterns
```javascript
// Track error rates
const errorCounts = {};
function trackError(error) {
    const key = error.type || 'unknown';
    errorCounts[key] = (errorCounts[key] || 0) + 1;
    
    if (errorCounts[key] > 10) {
        alertSecurityTeam({ type: key, count: errorCounts[key] });
    }
}
```

#### 2. Implement Retry Logic
```javascript
// Retry failed requests
async function retryRequest(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}
```

## Security Issues

### Unauthorized Access

**Symptoms:**
- Invalid tokens being accepted
- Signature verification bypassed
- Security alerts triggered

**Solutions:**

#### 1. Verify All Signatures
```javascript
// Never skip signature verification
function validateRelockRequest(req) {
    const token = req.body['X-Key-Token'];
    const signature = req.body['X-Key-Token-Signature'];
    
    if (!token || !signature) {
        throw new Error('Missing authentication data');
    }
    
    // Always verify signature
    if (!verifyRelockSignature(token, signature)) {
        throw new Error('Invalid signature');
    }
    
    return { token, signature };
}
```

#### 2. Implement Rate Limiting
```javascript
// Rate limit authentication attempts
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many authentication attempts',
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/relock/', authLimiter);
```

### Data Exposure

**Symptoms:**
- Sensitive data in logs
- Information disclosure
- Compliance violations

**Solutions:**

#### 1. Secure Logging
```javascript
// Never log sensitive data
function logRelockRequest(req) {
    const logData = {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        ip: req.ip,
        userAgent: req.get('User-Agent')
        // DO NOT log tokens, signatures, or session data
    };
    
    logger.info('Relock Request', logData);
}
```

#### 2. Input Sanitization
```javascript
// Sanitize all inputs
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Remove potentially dangerous characters
    return input.replace(/[<>\"'&]/g, '');
}
```

## Environment-Specific Issues

### Development Environment

**Common Issues:**
- Local HTTPS not working
- Proxy configuration complex
- Testing difficulties

**Solutions:**

#### 1. Local HTTPS Setup
```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes

# Use in development server
const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443);
```

#### 2. Local Proxy Setup
```nginx
# Development proxy configuration
server {
    listen 443 ssl;
    server_name localhost;
    
    ssl_certificate cert.pem;
    ssl_certificate_key key.pem;
    
    location /relock/ {
        proxy_pass https://relock.host/;
        proxy_set_header X-Key-Wildcard "your-dev-uuid";
    }
}
```

### Production Environment

**Common Issues:**
- Load balancer configuration
- SSL termination
- High availability

**Solutions:**

#### 1. Load Balancer Setup
```nginx
# Upstream configuration
upstream relock_backend {
    server relock.host:443 max_fails=3 fail_timeout=30s;
    keepalive 32;
}

# Health checks
location /relock/health {
    proxy_pass https://relock_backend/health;
    access_log off;
}
```

#### 2. SSL Termination
```nginx
# SSL termination at load balancer
ssl_certificate /path/to/certificate.crt;
ssl_certificate_key /path/to/private.key;

# Pass SSL info to backend
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Ssl on;
```

## Getting Help

### Self-Service Resources

1. **Check Logs**: Review application and proxy logs
2. **Verify Configuration**: Confirm all settings match documentation
3. **Test Connectivity**: Verify network and service reachability
4. **Review Security**: Ensure security headers and CSP are configured

### Contact Support

When contacting support, provide:

1. **Error Details**: Exact error messages and timestamps
2. **Configuration**: Relevant configuration files (sanitized)
3. **Logs**: Error logs and relevant application logs
4. **Environment**: OS, proxy server, application framework
5. **Steps to Reproduce**: Clear reproduction steps

### Support Channels

- **Email**: [hi@relock.security](mailto:hi@relock.security?subject=Troubleshooting%20Help)
- **Documentation**: Review [integration guides](../integration/integration-overview)
- **Community**: [GitHub Discussions](https://github.com/hooked82/relock-dev-examples/discussions)

## Prevention

### Best Practices

1. **Test Thoroughly**: Test all scenarios in staging environment
2. **Monitor Continuously**: Set up monitoring and alerting
3. **Document Changes**: Keep configuration changes documented
4. **Regular Reviews**: Review security and performance regularly
5. **Stay Updated**: Keep dependencies and configurations current

### Monitoring Setup

```javascript
// Basic monitoring
function monitorRelockHealth() {
    setInterval(async () => {
        try {
            const response = await fetch('/relock/health');
            if (!response.ok) {
                alertTeam('Relock health check failed');
            }
        } catch (error) {
            alertTeam('Relock connectivity issue');
        }
    }, 60000); // Check every minute
}
```

## Next Steps

### After Resolving Issues

1. **Document Solution**: Record the problem and solution
2. **Update Procedures**: Update deployment and maintenance procedures
3. **Monitor Performance**: Watch for recurrence of the issue
4. **Share Knowledge**: Share solutions with team members

### Continuous Improvement

- **Regular Audits**: Schedule regular security and performance audits
- **User Feedback**: Collect and act on user feedback
- **Performance Metrics**: Track and improve performance metrics
- **Security Updates**: Stay current with security best practices

### Resources

- **Security Hardening**: [Security Best Practices](./security-hardening)
- **Integration Guide**: [Integration Patterns](../integration/integration-overview)
- **API Reference**: [API Documentation](../integration/api-reference)
- **Quick Start**: [Getting Started](../getting-started/quickstart-overview)
