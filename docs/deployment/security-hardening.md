---
title: Security Hardening
description: Best practices for securing your Relock deployment
sidebar_label: Security Hardening
---

# Security Hardening

Relock provides strong security by design, but its protection is only as strong as the surrounding environment. This guide covers essential security measures to harden your Relock deployment.

:::warning Critical
Implement these security measures to maintain Relock's security guarantees.
:::

## HTTP Security Headers

### Essential Security Headers

Implement these headers on all responses to harden your application:

#### HTTP Strict Transport Security (HSTS)
```javascript
// Force HTTPS and prevent downgrade attacks
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Parameters:**
- `max-age=63072000`: Enforce HTTPS for 2 years
- `includeSubDomains`: Apply to all subdomains
- `preload`: Include in browser preload lists

#### Frame Options
```javascript
// Prevent clickjacking attacks
X-Frame-Options: DENY
```

**Options:**
- `DENY`: Block all framing
- `SAMEORIGIN`: Allow same-origin framing only
- `ALLOW-FROM uri`: Allow specific origin (deprecated)

#### Content Type Options
```javascript
// Prevent MIME type sniffing
X-Content-Type-Options: nosniff
```

#### XSS Protection
```javascript
// Enable XSS filtering (legacy browsers)
X-XSS-Protection: 1; mode=block
```

### Additional Security Headers

#### Referrer Policy
```javascript
// Control referrer information
Referrer-Policy: strict-origin-when-cross-origin
```

**Options:**
- `no-referrer`: Never send referrer
- `strict-origin`: Send origin only for same-origin requests
- `strict-origin-when-cross-origin`: Send origin for same-origin, no referrer for cross-origin

#### Permissions Policy
```javascript
// Control browser feature access
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

#### Cross-Domain Policies
```javascript
// Control cross-domain access
X-Permitted-Cross-Domain-Policies: none
```

### Implementation Examples

#### Nginx Configuration
```nginx
# Add security headers to all responses
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Frame-Options DENY always;
add_header X-Content-Type-Options nosniff always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header X-Permitted-Cross-Domain-Policies none always;
```

#### Apache Configuration
```xml
# Add security headers
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
Header always set X-Frame-Options DENY
Header always set X-Content-Type-Options nosniff
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
Header always set X-Permitted-Cross-Domain-Policies none
```

#### Express.js Middleware
```javascript
// Security headers middleware
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  next();
});
```

## Content Security Policy (CSP)

### CSP Implementation

Content Security Policy is critical for Relock deployments, especially JavaScript Agent integration:

#### Basic CSP Configuration
```javascript
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

#### CSP Directives Explained

| Directive | Purpose | Value |
|-----------|---------|-------|
| `default-src` | Default resource policy | `'self'` |
| `script-src` | JavaScript execution policy | `'self' 'nonce-{NONCE}' 'strict-dynamic'` |
| `connect-src` | Network connection policy | `'self' https://relock.host` |
| `style-src` | CSS loading policy | `'self'` |
| `img-src` | Image loading policy | `'self' data:` |
| `frame-ancestors` | Frame embedding policy | `'none'` |
| `base-uri` | Base URI policy | `'none'` |
| `object-src` | Object/embed policy | `'none'` |

### Nonce Generation

Generate cryptographically strong nonces for each request:

#### Node.js/Express
```javascript
import crypto from "node:crypto";

export function csp(req, res, next) {
  const nonce = crypto.randomBytes(16).toString("base64");
  res.locals.cspNonce = nonce;
  
  res.setHeader("Content-Security-Policy", [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "connect-src 'self' https://relock.host",
    "style-src 'self'",
    "img-src 'self' data:",
    "frame-ancestors 'none'",
    "base-uri 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
    "require-trusted-types-for 'script'"
  ].join("; "));
  
  next();
}
```

#### Python/Flask
```python
import os
import base64
from flask import g, make_response

def make_nonce():
    return base64.b64encode(os.urandom(16)).decode()

@app.after_request
def add_csp(response):
    nonce = getattr(g, "csp_nonce", None) or make_nonce()
    g.csp_nonce = nonce
    
    csp = (
        "default-src 'self'; "
        f"script-src 'self' 'nonce-{nonce}' 'strict-dynamic'; "
        "connect-src 'self' https://relock.host; "
        "style-src 'self'; img-src 'self' data:; "
        "frame-ancestors 'none'; base-uri 'none'; object-src 'none';"
        "upgrade-insecure-requests; require-trusted-types-for 'script';"
    )
    
    response.headers["Content-Security-Policy"] = csp
    return response
```

#### PHP
```php
<?php
function generateNonce() {
    return base64_encode(random_bytes(16));
}

function setCSPHeaders() {
    $nonce = generateNonce();
    
    $csp = [
        "default-src 'self'",
        "script-src 'self' 'nonce-{$nonce}' 'strict-dynamic'",
        "connect-src 'self' https://relock.host",
        "style-src 'self'",
        "img-src 'self' data:",
        "frame-ancestors 'none'",
        "base-uri 'none'",
        "object-src 'none'",
        "upgrade-insecure-requests",
        "require-trusted-types-for 'script'"
    ];
    
    header("Content-Security-Policy: " . implode("; ", $csp));
    return $nonce;
}
?>
```

### Nonce Usage in HTML

Use the generated nonce in your script tags:

```html
<!-- relock.js with nonce -->
<script src="/relock/relock.js" 
        nonce="{{CSP_NONCE}}" 
        async></script>

<!-- Inline scripts with nonce -->
<script nonce="{{CSP_NONCE}}">
  window.addEventListener('X-Key-Established', function(event) {
    console.log('Relock keys established:', event.detail);
  });
</script>
```

## Subresource Integrity (SRI)

### SRI Implementation

Add SRI hashes to external resources for supply chain security:

#### Relock.js SRI
```html
<script src="/relock/relock.js"
        integrity="sha384-{HASH_FROM_RELOCK_ADMIN_PANEL}"
        crossorigin="anonymous"
        nonce="{{CSP_NONCE}}"
        async></script>
```

#### Other External Resources
```html
<!-- External CSS with SRI -->
<link rel="stylesheet" 
      href="https://cdn.example.com/style.css"
      integrity="sha384-{HASH}"
      crossorigin="anonymous">

<!-- External JavaScript with SRI -->
<script src="https://cdn.example.com/script.js"
        integrity="sha384-{HASH}"
        crossorigin="anonymous"
        nonce="{{CSP_NONCE}}"></script>
```

### SRI Hash Generation

Generate SRI hashes for your resources:

```bash
# Generate SRI hash for a file
cat relock.js | openssl dgst -sha384 -binary | openssl base64 -A

# Or use a dedicated tool
npm install -g sri-toolbox
sri-toolbox generate relock.js
```

## SSL/TLS Configuration

### TLS Version Requirements

- **Minimum**: TLS 1.2
- **Recommended**: TLS 1.3
- **Deprecated**: TLS 1.0, TLS 1.1

### Strong Cipher Suites

#### Nginx Configuration
```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
```

#### Apache Configuration
```xml
SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
SSLCipherSuite ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384
SSLHonorCipherOrder on
SSLCompression off
```

### Certificate Security

#### Certificate Requirements
- **Valid CA**: Issued by trusted Certificate Authority
- **Key Size**: 2048 bits minimum (RSA), 256 bits (ECDSA)
- **Chain**: Complete certificate chain included
- **Expiration**: Monitor and renew before expiration

#### OCSP Stapling
```nginx
# Enable OCSP stapling
ssl_stapling on;
ssl_stapling_verify on;
ssl_trusted_certificate /path/to/chain.crt;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
```

## Cookie Security

### Secure Cookie Configuration

Configure cookies with security best practices:

#### SameSite Configuration
```javascript
// Set secure cookie attributes
document.cookie = "session=value; SameSite=Strict; Secure; HttpOnly; Path=/";
```

#### Backend Cookie Setting
```javascript
// Express.js example
res.cookie('session', sessionId, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/'
});
```

#### Cookie Security Attributes

| Attribute | Purpose | Value |
|-----------|---------|-------|
| `HttpOnly` | Prevent XSS access | `true` |
| `Secure` | HTTPS only | `true` |
| `SameSite` | CSRF protection | `Strict` or `Lax` |
| `Path` | Scope to specific paths | `/` or specific path |

## Input Validation and Sanitization

### Request Validation

Validate all Relock-related requests:

#### Token Validation
```javascript
// Validate Relock token format
function validateRelockToken(token) {
  // Token should be hex-encoded
  if (!/^[0-9a-fA-F]+$/.test(token)) {
    return false;
  }
  
  // Token should be reasonable length
  if (token.length < 32 || token.length > 128) {
    return false;
  }
  
  return true;
}

// Validate signature format
function validateRelockSignature(signature) {
  // Signature should be hex-encoded Ed25519 signature
  if (!/^[0-9a-fA-F]{128}$/.test(signature)) {
    return false;
  }
  
  return true;
}
```

#### Request Sanitization
```javascript
// Sanitize Relock request data
function sanitizeRelockRequest(req) {
  const transaction = req.body['X-Key-Transaction'] || '';
  const signature = req.body['X-Key-Transaction-Signature'] || '';
  
  // Remove any whitespace
  const cleanTransaction = transaction.trim();
  const cleanSignature = signature.trim();
  
  // Validate format
  if (!validateRelockToken(cleanTransaction)) {
    throw new Error('Invalid transaction format');
  }
  
  if (!validateRelockSignature(cleanSignature)) {
    throw new Error('Invalid signature format');
  }
  
  return {
    transaction: cleanTransaction,
    signature: cleanSignature
  };
}
```

## Logging and Monitoring

### Security Event Logging

Log all security-related events:

#### Authentication Events
```javascript
// Log Relock authentication events
function logRelockEvent(event, details) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: event,
    details: details,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    sessionId: req.session?.id
  };
  
  // Log to security log
  securityLogger.info('Relock Event', logEntry);
  
  // Alert on suspicious events
  if (event === 'verification_failed' || event === 'signature_invalid') {
    alertSecurityTeam(logEntry);
  }
}
```

#### Security Monitoring
```javascript
// Monitor for suspicious patterns
function monitorRelockActivity(req) {
  const clientIP = req.ip;
  const now = Date.now();
  
  // Track failed attempts per IP
  if (!failedAttempts[clientIP]) {
    failedAttempts[clientIP] = [];
  }
  
  // Remove attempts older than 1 hour
  failedAttempts[clientIP] = failedAttempts[clientIP].filter(
    timestamp => now - timestamp < 60 * 60 * 1000
  );
  
  // Add current attempt
  failedAttempts[clientIP].push(now);
  
  // Alert if too many failures
  if (failedAttempts[clientIP].length > 10) {
    alertSecurityTeam({
      type: 'rate_limit_exceeded',
      ip: clientIP,
      attempts: failedAttempts[clientIP].length
    });
  }
}
```

### Log Security

#### Sensitive Data Exclusion
```javascript
// Never log sensitive Relock data
function logRelockRequest(req, res, next) {
  // Log request metadata (not sensitive data)
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  };
  
  // DO NOT log tokens, signatures, or other sensitive data
  // logData.token = req.body['X-Key-Token']; // ❌ NEVER DO THIS
  
  logger.info('Relock Request', logData);
  next();
}
```

#### Log Encryption
```javascript
// Encrypt sensitive log entries
function encryptLogEntry(logEntry) {
  const key = process.env.LOG_ENCRYPTION_KEY;
  const encrypted = crypto.createCipher('aes-256-gcm', key);
  
  let encryptedData = encrypted.update(JSON.stringify(logEntry), 'utf8', 'hex');
  encryptedData += encrypted.final('hex');
  
  return {
    encrypted: encryptedData,
    tag: encrypted.getAuthTag().toString('hex')
  };
}
```

## Network Security

### Firewall Configuration

Configure firewalls to restrict access:

#### Inbound Rules
```bash
# Allow only necessary ports
iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # HTTPS
iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # HTTP (redirect)
iptables -A INPUT -j DROP                        # Block everything else
```

#### Outbound Rules
```bash
# Allow Relock connectivity
iptables -A OUTPUT -p tcp --dport 443 -d relock.host -j ACCEPT

# Allow DNS resolution
iptables -A OUTPUT -p udp --dport 53 -j ACCEPT
```

### Network Segmentation

#### DMZ Configuration
```bash
# Place Relock proxy in DMZ
# Internal network: 10.0.0.0/8
# DMZ: 192.168.1.0/24
# External: 0.0.0.0/0

# DMZ to internal: restricted access
iptables -A FORWARD -s 192.168.1.0/24 -d 10.0.0.0/8 -j DROP

# Internal to DMZ: allowed
iptables -A FORWARD -s 10.0.0.0/8 -d 192.168.1.0/24 -j ACCEPT
```

## Access Control

### Authentication and Authorization

#### API Access Control
```javascript
// Require authentication for Relock endpoints
function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
}

// Apply to Relock routes
app.post('/relock/confirm', requireAuth, handleRelockConfirm);
app.post('/relock/login', requireAuth, handleRelockLogin);
```

#### Rate Limiting
```javascript
// Implement rate limiting for Relock endpoints
const rateLimit = require('express-rate-limit');

const relockLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/relock/', relockLimiter);
```

## Incident Response

### Security Incident Handling

#### Incident Classification
```javascript
// Classify security incidents
function classifyIncident(event) {
  switch (event.type) {
    case 'signature_invalid':
      return { severity: 'HIGH', action: 'BLOCK_IP' };
    case 'token_reuse':
      return { severity: 'CRITICAL', action: 'TERMINATE_SESSION' };
    case 'rate_limit_exceeded':
      return { severity: 'MEDIUM', action: 'THROTTLE_IP' };
    default:
      return { severity: 'LOW', action: 'LOG_ONLY' };
  }
}
```

#### Response Procedures
```javascript
// Automated incident response
function handleSecurityIncident(incident) {
  const response = classifyIncident(incident);
  
  switch (response.action) {
    case 'BLOCK_IP':
      blockIP(incident.ip);
      alertSecurityTeam(incident);
      break;
      
    case 'TERMINATE_SESSION':
      terminateUserSession(incident.sessionId);
      alertSecurityTeam(incident);
      notifyUser(incident.userId);
      break;
      
    case 'THROTTLE_IP':
      throttleIP(incident.ip);
      break;
      
    case 'LOG_ONLY':
      logIncident(incident);
      break;
  }
}
```

## Compliance and Auditing

### Compliance Requirements

#### PSD2/SCA Compliance
```javascript
// Log transaction authentication for PSD2
function logTransactionAuth(transactionId, authMethod, result) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    transactionId: transactionId,
    authMethod: authMethod,
    result: result,
    compliance: 'PSD2_SCA',
    auditTrail: true
  };
  
  complianceLogger.info('Transaction Authentication', logEntry);
}
```

#### SOC 2 Compliance
```javascript
// Track access control events for SOC 2
function logAccessControlEvent(userId, resource, action, result) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    userId: userId,
    resource: resource,
    action: action,
    result: result,
    compliance: 'SOC2',
    auditTrail: true
  };
  
  complianceLogger.info('Access Control Event', logEntry);
}
```

### Audit Trail

#### Comprehensive Logging
```javascript
// Maintain complete audit trail
function auditLog(event, details) {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    event: event,
    details: details,
    userId: req.session?.userId,
    sessionId: req.session?.id,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    requestId: req.id,
    compliance: ['PSD2', 'SOC2', 'NIST']
  };
  
  auditLogger.info('Audit Event', auditEntry);
}
```

## Regular Security Assessments

### Security Testing Schedule

#### Penetration Testing
- **Frequency**: Quarterly
- **Scope**: Full application including Relock integration
- **Focus**: Authentication bypass, session hijacking, CSRF

#### Vulnerability Scanning
- **Frequency**: Weekly
- **Scope**: Dependencies, infrastructure, configuration
- **Tools**: OWASP ZAP, Burp Suite, Nmap

#### Code Review
- **Frequency**: Continuous
- **Scope**: All Relock-related code changes
- **Focus**: Security best practices, input validation

### Security Metrics

#### Key Performance Indicators
```javascript
// Track security metrics
const securityMetrics = {
  failedAuthentications: 0,
  successfulAuthentications: 0,
  securityIncidents: 0,
  responseTime: 0,
  availability: 100
};

// Calculate security score
function calculateSecurityScore() {
  const authSuccessRate = securityMetrics.successfulAuthentications / 
    (securityMetrics.successfulAuthentications + securityMetrics.failedAuthentications);
  
  const incidentRate = securityMetrics.securityIncidents / 
    securityMetrics.successfulAuthentications;
  
  return {
    authenticationScore: authSuccessRate * 100,
    incidentScore: Math.max(0, 100 - (incidentRate * 1000)),
    overallScore: (authSuccessRate * 100 + Math.max(0, 100 - (incidentRate * 1000))) / 2
  };
}
```

## Next Steps

### Implementation Checklist

1. **Security Headers**: Implement all recommended HTTP security headers
2. **CSP**: Deploy Content Security Policy with nonces
3. **SRI**: Add Subresource Integrity hashes
4. **SSL/TLS**: Configure strong TLS settings
5. **Cookies**: Secure cookie configuration
6. **Input Validation**: Implement request validation and sanitization
7. **Logging**: Set up security event logging and monitoring
8. **Network Security**: Configure firewalls and network segmentation
9. **Access Control**: Implement authentication and rate limiting
10. **Incident Response**: Establish incident handling procedures

### Security Resources

- **OWASP Top 10**: [owasp.org](https://owasp.org/www-project-top-ten/)
- **Security Headers**: [securityheaders.com](https://securityheaders.com/)
- **CSP Reference**: [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- **TLS Configuration**: [ssl-config.mozilla.org](https://ssl-config.mozilla.org/)

### Need Help?

- **Security Review**: [Contact our security team](mailto:security@relock.security)
- **Implementation Support**: [Contact our team](mailto:hi@relock.security?subject=Security%20Hardening%20Help)
- **Compliance Questions**: Review [compliance guide](../security/compliance)
- **Community Support**: [GitHub Discussions](https://github.com/hooked82/relock-dev-examples/discussions)
