# JavaScript Agent API

Client-side API for Relock authentication in web applications.

## Overview

The JavaScript Agent provides:
- Automatic device enrollment and verification
- Token and signature generation
- Event-driven authentication state management
- Multi-tab support and session management

## Installation

Include the Relock agent in your HTML:

```html
<script src="/relock/relock.js" async></script>
```

### Content Security Policy (Recommended)

For enhanced security, use CSP with nonces:

```html
<script src="/relock/relock.js" nonce="{{CSP_NONCE}}" async></script>
```

## API Reference

### `window.relock`

The main Relock object available after the agent loads.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `public` | `string` | Device public key (hex-encoded) |
| `debug` | `boolean` | Enable debug logging |

#### Methods

##### `token()`

Generates a fresh authentication token.

```javascript
const token = await window.relock.token();
console.log('Token:', token); // Hex-encoded string
```

**Returns**: `Promise<string>` - Hex-encoded token

##### `sign(token)`

Signs a token with the device's private key.

```javascript
const token = await window.relock.token();
const signature = await window.relock.sign(token);
console.log('Signature:', signature); // Hex-encoded signature
```

**Parameters**:
- `token` (string): The token to sign

**Returns**: `Promise<string>` - Hex-encoded signature

## Events

### `X-Key-Established`

Fired when the Relock agent is ready and authentication is established.

```javascript
window.addEventListener('X-Key-Established', async function (event) {
  console.log('Relock established:', event.detail);
  
  // Get token and signature
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
});
```

**Event Detail**:
```typescript
interface RelockEstablishedEvent {
  fresh: boolean;        // First-time interaction
  valid: boolean;        // Validation successful
  state: boolean;        // New key agreement performed
  owner: boolean;        // Device has assigned owner
  network: boolean;      // Network location changed
  authenticated: boolean; // User is authenticated
  status: string;        // Human-readable status
  code: number;         // HTTP-like status code
}
```

### `X-Key-Rekeying-Done`

Fired when key rotation is complete.

```javascript
window.addEventListener('X-Key-Rekeying-Done', function (event) {
  console.log('Key rotation completed:', event.detail);
});
```

### `X-Key-View-Change`

Trigger this event when the view changes in SPAs.

```javascript
// Dispatch when route changes
const event = new CustomEvent('X-Key-View-Change', { bubbles: false });
window.dispatchEvent(event);
```

## Usage Examples

### Basic Authentication

```javascript
// Wait for Relock to be ready
window.addEventListener('X-Key-Established', async function (event) {
  if (event.detail.valid) {
    // Get authentication credentials
    const token = await window.relock.token();
    const signature = await window.relock.sign(token);
    
    // Use for API calls
    await makeAuthenticatedRequest(token, signature);
  }
});

async function makeAuthenticatedRequest(token, signature) {
  const response = await fetch('/api/protected', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Key-Token': token,
      'X-Key-Signature': signature
    },
    body: JSON.stringify({ data: 'example' })
  });
  
  return response.json();
}
```

### User Authentication

```javascript
async function loginUser(userId, email) {
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
  const sessionId = getCookie('X-Key-Session');
  
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
      'X-Key-Session': sessionId,
      'user': userId,
      'email': email
    })
  });
  
  return response.json();
}
```

### SPA Integration

```javascript
// React Router example
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

## Multi-Tab Support

Relock automatically handles multi-tab browsing:

- Each tab gets a unique identifier
- Tokens cannot be replayed across tabs
- Race conditions are automatically handled

## Debug Mode

Enable debug logging for troubleshooting:

```javascript
// Enable debug mode
window.relock.debug = true;
```

## Security Considerations

### Content Security Policy

Implement strict CSP with nonces:

```html
<!-- Set CSP header with nonce -->
<script src="/relock/relock.js" nonce="{{CSP_NONCE}}" async></script>
```

### HTTPS Requirement

Relock requires HTTPS for security. Ensure your domain has a valid SSL certificate.

## Troubleshooting

### Common Issues

**Agent not loading**
- Check reverse proxy configuration
- Verify script path is correct
- Check browser console for errors

**Authentication failing**
- Verify CSP configuration
- Check for JavaScript errors
- Ensure HTTPS is enabled

**SPA navigation issues**
- Ensure `X-Key-View-Change` events are dispatched
- Check for JavaScript errors in console
- Verify event listeners are properly set up

## Next Steps

- [**Gateway API**](./gateway-api) - Server-side verification
- [**JavaScript Agent Integration**](../guides/js-agent-integration) - Complete integration guide