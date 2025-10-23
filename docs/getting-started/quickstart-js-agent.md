---
title: JavaScript Agent Quickstart
description: Get started with Relock JavaScript Agent Integration
sidebar_label: JavaScript Agent Integration
---

# JavaScript Agent Quickstart

Get Relock JavaScript Agent Integration up and running with seamless, invisible device verification.

## Quick Concept Summary

JavaScript Agent Integration embeds Relock's authentication directly into your web application using the `relock.js` library. This approach provides:

- **Seamless Experience**: No redirects or page interruptions
- **Maximum Security**: Continuous device verification with cryptographic proofs
- **Real-time Updates**: Immediate response to security state changes
- **Customizable**: Full control over authentication UI and flow

**For detailed architecture and security model, see [JavaScript Agent Reference](../integration/js-agent-integration.md)**

## Prerequisites

- A web application with HTTPS enabled
- Access to configure reverse proxy (nginx, Apache, etc.)
- Basic understanding of JavaScript and web security
- Relock gateway UUID (provided during setup)

## Step 1: Set Up Your Gateway

### 1.1 Create Gateway

1. Visit [relock.host](https://relock.host)
2. Click "Create Gateway"
3. Enter your domain (e.g., `example.com`)
4. Choose "JavaScript Agent Integration" as your pattern
5. Copy your gateway UUID

### 1.2 Configure Reverse Proxy

JavaScript Agent Integration requires a reverse proxy to route `/relock/*` requests to the Relock gateway.

#### Nginx Configuration

```nginx
location /relock/ {
  proxy_pass https://relock.host/;
  proxy_set_header Host relock.host;
  proxy_set_header X-Key-Wildcard "your-gateway-uuid";
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

#### Apache Configuration

```xml
<Location /relock/>
  ProxyPass https://relock.host/relock/
  ProxyPassReverse https://relock.host/relock/
  RequestHeader set X-Key-Wildcard "your-gateway-uuid"
</Location>
```

## Step 2: Include Relock SDK

### 2.1 Basic Integration

```html
<script src="/relock/relock.js" async></script>
```

### 2.2 With Subresource Integrity

```html
<script src="/relock/relock.js"
        integrity="sha384-..."
        crossorigin="anonymous"
        async></script>
```

### 2.3 With Content Security Policy

```html
<script src="/relock/relock.js"
        nonce="{{RANDOM_NONCE}}"
        async></script>
```

## Step 3: Handle Relock Events

### 3.1 Basic Event Handling

```javascript
// Listen for when Relock keys are established
window.addEventListener('X-Key-Established', async function (event) {
  console.log('Relock keys established:', event.detail);
  
  // Generate authentication tokens
  let token = await window.relock.token();
  let signature = await window.relock.sign(token);
  
  // Use tokens for authentication
  console.log('Token:', token.hexlify());
  console.log('Signature:', signature.hexlify());
});

// Listen for re-keying completion
window.addEventListener('X-Key-Rekeying-Done', function (event) {
  console.log('Re-keying completed:', event.detail);
});
```

### 3.2 Advanced Event Handling

```javascript
// Comprehensive event handling
const relockEvents = {
  'X-Key-Established': handleKeysEstablished,
  'X-Key-Rekeying-Done': handleRekeyingDone,
  'X-Key-View-Change': handleViewChange,
  'X-Key-Error': handleError
};

Object.entries(relockEvents).forEach(([eventName, handler]) => {
  window.addEventListener(eventName, handler);
});

function handleKeysEstablished(event) {
  console.log('Keys ready:', event.detail);
  // Initialize your authentication system
}

function handleRekeyingDone(event) {
  console.log('Rekeying complete:', event.detail);
  // Update your security state
}

function handleViewChange(event) {
  console.log('View changed:', event.detail);
  // Handle SPA navigation
}

function handleError(event) {
  console.error('Relock error:', event.detail);
  // Handle authentication errors
}
```

## Step 4: Implement Request Authentication

### 4.1 Basic Authentication

```javascript
async function makeAuthenticatedRequest(url, data) {
  // Get fresh Relock tokens
  let token = await window.relock.token();
  let signature = await window.relock.sign(token);
  
  // Make authenticated request
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Key-Token': token.hexlify(),
      'X-Key-Signature': signature.hexlify()
    },
    body: JSON.stringify(data)
  });
  
  return response.json();
}
```

### 4.2 Advanced Authentication with Error Handling

```javascript
async function makeAuthenticatedRequest(url, data, options = {}) {
  try {
    // Check if Relock is ready
    if (!window.relock || !window.relock.token) {
      throw new Error('Relock not initialized');
    }
    
    // Get fresh tokens
    const token = await window.relock.token();
    const signature = await window.relock.sign(token);
    
    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      'X-Key-Token': token.hexlify(),
      'X-Key-Signature': signature.hexlify(),
      ...options.headers
    };
    
    // Make request
    const response = await fetch(url, {
      method: options.method || 'POST',
      headers,
      body: JSON.stringify(data),
      ...options
    });
    
    // Handle authentication errors
    if (response.status === 401) {
      // Token might be expired, trigger rekeying
      window.dispatchEvent(new CustomEvent('X-Key-View-Change'));
      throw new Error('Authentication failed - please refresh');
    }
    
    return response.json();
    
  } catch (error) {
    console.error('Authenticated request failed:', error);
    throw error;
  }
}
```

## Step 5: Handle SPA Navigation

### 5.1 Angular Router Integration

```typescript
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      // Notify Relock of view change
      let event = new CustomEvent('X-Key-View-Change', { bubbles: false });
      window.dispatchEvent(event);
    });
}
```

### 5.2 React Router Integration

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RelockNavigationHandler() {
  const location = useLocation();
  
  useEffect(() => {
    // Notify Relock of view change
    const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
    window.dispatchEvent(event);
  }, [location]);
  
  return null;
}
```

### 5.3 Vue Router Integration

```javascript
import { useRouter } from 'vue-router';
import { watch } from 'vue';

export default {
  setup() {
    const router = useRouter();
    
    watch(
      () => router.currentRoute.value.path,
      () => {
        // Notify Relock of view change
        const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
        window.dispatchEvent(event);
      }
    );
  }
};
```

## Step 6: Security Configuration

### 6.1 Content Security Policy

```javascript
// Add to your HTML head
const csp = `
  default-src 'self';
  script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
  connect-src 'self' https://relock.host;
  frame-ancestors 'none';
  base-uri 'none';
`;

const meta = document.createElement('meta');
meta.httpEquiv = 'Content-Security-Policy';
meta.content = csp;
document.head.appendChild(meta);
```

### 6.2 Security Headers

```javascript
// Add these headers to your responses
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
};
```

### 6.3 Subresource Integrity

```html
<script src="/relock/relock.js"
        integrity="sha384-..."
        crossorigin="anonymous"
        nonce="{{RANDOM_NONCE}}"
        async></script>
```

## Step 7: Advanced Features

### 7.1 Multi-Tab Support

```javascript
// Handle multiple tabs
window.addEventListener('storage', function(event) {
  if (event.key === 'relock_tab_id') {
    // Another tab has changed Relock state
    window.dispatchEvent(new CustomEvent('X-Key-View-Change'));
  }
});

// Generate unique tab ID
const tabId = Math.random().toString(36).substr(2, 9);
localStorage.setItem('relock_tab_id', tabId);
```

### 7.2 Automatic Key Rotation

```javascript
// Configure automatic rotation
window.addEventListener('X-Key-Established', function(event) {
  const rotationPolicy = event.detail.rotationPolicy;
  
  if (rotationPolicy === 'per-request') {
    console.log('Keys will rotate with each request');
  } else if (rotationPolicy === 'session-start') {
    console.log('Keys will rotate at session start');
  }
});
```

### 7.3 Error Recovery

```javascript
// Handle authentication failures
window.addEventListener('X-Key-Error', function(event) {
  const error = event.detail;
  
  switch (error.code) {
    case 'DEVICE_CHANGED':
      console.log('Device characteristics changed');
      // Handle device change
      break;
    case 'NETWORK_ERROR':
      console.log('Network error occurred');
      // Retry or show offline message
      break;
    case 'CRYPTO_ERROR':
      console.log('Cryptographic error');
      // Reinitialize Relock
      break;
    default:
      console.error('Unknown error:', error);
  }
});
```

## Step 8: Testing and Debugging

### 8.1 Debug Mode

```javascript
// Enable debug logging
window.addEventListener('X-Key-Established', function(event) {
  console.log('Relock Debug Info:', {
    gateway: event.detail.gateway,
    deviceId: event.detail.deviceId,
    rotationPolicy: event.detail.rotationPolicy,
    timestamp: event.detail.timestamp
  });
});
```

### 8.2 Test Authentication

```javascript
// Test authentication flow
async function testRelockAuth() {
  try {
    const token = await window.relock.token();
    const signature = await window.relock.sign(token);
    
    console.log('Authentication test successful:', {
      token: token.hexlify(),
      signature: signature.hexlify()
    });
    
    return true;
  } catch (error) {
    console.error('Authentication test failed:', error);
    return false;
  }
}
```

## Step 9: Production Deployment

### 9.1 Security Checklist

- [ ] HTTPS enabled on all pages
- [ ] Content Security Policy configured
- [ ] Subresource Integrity implemented
- [ ] Security headers set
- [ ] Error handling implemented
- [ ] Monitoring configured
- [ ] Rate limiting enabled

### 9.2 Performance Optimization

```javascript
// Optimize for production
if (process.env.NODE_ENV === 'production') {
  // Disable debug logging
  console.log = () => {};
  
  // Enable aggressive caching
  const cacheControl = 'public, max-age=31536000, immutable';
}
```

## Troubleshooting

### Common Issues

**Relock not initializing**
- Check if `/relock/relock.js` is accessible
- Verify reverse proxy configuration
- Check browser console for errors
- Ensure HTTPS is enabled

**Authentication tokens failing**
- Verify gateway UUID is correct
- Check proxy header forwarding
- Ensure proper error handling
- Monitor network requests

**SPA navigation issues**
- Verify `X-Key-View-Change` events are fired
- Check router integration
- Monitor event listeners
- Test with browser dev tools

### Getting Help

- **Documentation**: [JavaScript Agent Reference](../integration/js-agent-integration.md)
- **Architecture**: [How Relock Works](../concepts/how-it-works)
- **Security**: [Security Model](../concepts/security-model)
- **Deployment**: [Reverse Proxy Configuration](../deployment/reverse-proxy)
- **Support**: [Contact Relock Support](https://relock.host/support)

## Next Steps

Once your JavaScript Agent Integration is working:

- **Enhance Security**: Implement advanced CSP policies
- **Improve Performance**: Optimize token generation and caching
- **Scale Up**: Add monitoring and alerting
- **Advanced Features**: Implement custom rotation policies

## Security Best Practices

- Implement proper Content Security Policy
- Use Subresource Integrity for all external scripts
- Enable security headers (HSTS, CSP, etc.)
- Monitor for security events and errors
- Implement proper error handling
- Keep Relock library updated
- Monitor authentication patterns

---

**Need help?** See the [JavaScript Agent Reference](../integration/js-agent-integration.md) for detailed architecture and security information.
