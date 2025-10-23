---
title: API Reference
description: Complete reference for Relock API endpoints, responses, and status codes
sidebar_label: API Reference
---

# API Reference

This page documents all Relock API endpoints, request/response formats, and status codes. Use this reference to integrate Relock into your applications.

## API Overview

### Base URLs

- **Cloud Integration**: `https://your-domain.relock.host/`
- **SameSite Integration**: `https://your-domain.com/relock/`
- **JavaScript Agent**: `https://your-domain.com/relock/`

### Authentication

All Relock API endpoints require proper authentication:

- **Gateway UUID**: Set via `X-Key-Wildcard` header (proxy integration)
- **User Context**: User ID and email for enhanced features
- **Device Verification**: Automatic device binding and validation

### Request Headers

#### Required Headers

| Header | Description | Example |
|--------|-------------|---------|
| `Content-Type` | Request content type | `application/json` |
| `Accept` | Response format preference | `application/json` |

#### Optional Headers

| Header | Description | Example |
|--------|-------------|---------|
| `User-Agent` | Client identification | `MyApp/1.0` |
| `X-Request-ID` | Request tracking | `req-12345` |

## Authentication Endpoints

### Device Verification

#### POST `/gateway/{uuid}`

Verifies device identity and establishes cryptographic session.

**Request:**
```json
{
  "device_info": {
    "browser": "Chrome/120.0.0.0",
    "platform": "Windows 10",
    "user_agent": "Mozilla/5.0..."
  }
}
```

**Response:**
```json
{
  "status": "success",
  "device_id": "dev_abc123",
  "session_id": "sess_xyz789",
  "verification_result": "trusted",
  "redirect_url": "https://example.com/password_only"
}
```

**Status Codes:**
- `200 OK`: Device verified successfully
- `400 Bad Request`: Invalid request format
- `401 Unauthorized`: Authentication required
- `500 Internal Server Error`: Server error

### User Login

#### POST `/login`

Logs a user into the Relock gateway for enhanced features.

**Request:**
```json
{
  "X-Key-Token": "abc123...",
  "X-Key-Signature": "def456...",
  "X-Key-Session": "sess_xyz789",
  "user": "user123",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "status": "success",
  "user_id": "user123",
  "device_owner": true,
  "session_active": true,
  "last_login": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**
- `200 OK`: Login successful
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Access denied
- `500 Internal Server Error`: Server error

### User Logout

#### POST `/logout`

Logs out a user from the Relock gateway.

**Request:**
```json
{
  "X-Key-Token": "abc123...",
  "X-Key-Signature": "def456...",
  "X-Key-Session": "sess_xyz789"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User logged out successfully",
  "session_terminated": true
}
```

**Status Codes:**
- `200 OK`: Logout successful
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Invalid credentials
- `500 Internal Server Error`: Server error

## Verification Endpoints

### Token Confirmation

#### POST `/confirm`

Confirms token validity and prevents replay attacks.

**Request:**
```json
{
  "X-Key-Token": "abc123...",
  "X-Key-Signature": "def456...",
  "X-Key-Session": "sess_xyz789"
}
```

**Response:**
```json
{
  "status": "success",
  "token_valid": true,
  "replay_protected": true,
  "device_verified": true,
  "session_active": true
}
```

**Status Codes:**
- `200 OK`: Token valid, user signed in
- `401 Unauthorized`: Invalid token or signature
- `407 Proxy Authentication Required`: Token valid, user not signed in
- `409 Conflict`: Token mismatch, re-keying required
- `417 Expectation Failed`: Invalid signature
- `406 Not Acceptable`: Awaiting re-keying confirmation
- `404 Not Found`: Device data not found
- `410 Gone`: Session no longer exists

### Session Status

#### GET `/status`

Retrieves current session status and device information.

**Request:**
```json
{
  "X-Key-Session": "sess_xyz789"
}
```

**Response:**
```json
{
  "status": "success",
  "session": {
    "id": "sess_xyz789",
    "active": true,
    "created": "2024-01-15T10:30:00Z",
    "last_activity": "2024-01-15T11:45:00Z",
    "expires": "2024-01-16T10:30:00Z"
  },
  "device": {
    "id": "dev_abc123",
    "trusted": true,
    "owner": "user123",
    "last_verification": "2024-01-15T11:45:00Z"
  },
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "authenticated": true
  }
}
```

**Status Codes:**
- `200 OK`: Session information retrieved
- `401 Unauthorized`: Invalid session
- `404 Not Found`: Session not found
- `500 Internal Server Error`: Server error

## JavaScript Agent Endpoints

### Key Establishment

#### POST `/establish`

Establishes cryptographic keys for JavaScript Agent integration.

**Request:**
```json
{
  "device_info": {
    "browser": "Chrome/120.0.0.0",
    "platform": "Windows 10",
    "fingerprint": "fp_abc123"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "keys_established": true,
  "session_id": "sess_xyz789",
  "device_id": "dev_abc123",
  "key_rotation": "session_start"
}
```

**Status Codes:**
- `200 OK`: Keys established successfully
- `400 Bad Request`: Invalid request format
- `500 Internal Server Error`: Server error

### Key Rotation

#### POST `/rotate`

Triggers key rotation for enhanced security.

**Request:**
```json
{
  "X-Key-Session": "sess_xyz789",
  "rotation_type": "manual"
}
```

**Response:**
```json
{
  "status": "success",
  "keys_rotated": true,
  "new_session_id": "sess_new456",
  "rotation_timestamp": "2024-01-15T12:00:00Z"
}
```

**Status Codes:**
- `200 OK`: Keys rotated successfully
- `400 Bad Request`: Invalid request
- `401 Unauthorized`: Invalid session
- `500 Internal Server Error`: Server error

## Event System

### JavaScript Events

Relock JavaScript Agent fires events for integration:

#### `X-Key-Established`

Fired when cryptographic keys are ready for use.

**Event Detail:**
```json
{
  "fresh": false,
  "valid": true,
  "state": false,
  "owner": true,
  "network": false,
  "authenticated": true,
  "status": "OK",
  "code": 200
}
```

#### `X-Key-Rekeying-Done`

Fired when key rotation completes.

**Event Detail:**
```json
{
  "rotation_type": "automatic",
  "new_session_id": "sess_new456",
  "rotation_timestamp": "2024-01-15T12:00:00Z",
  "status": "OK",
  "code": 200
}
```

#### `X-Key-View-Change`

Manual trigger for SPA navigation.

**Usage:**
```javascript
// Dispatch event when view changes
let event = new CustomEvent('X-Key-View-Change', { bubbles: false });
window.dispatchEvent(event);
```

## Error Handling

### Error Response Format

All error responses follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details",
    "timestamp": "2024-01-15T12:00:00Z",
    "request_id": "req_12345"
  }
}
```

### Common Error Codes

| Code | Description | HTTP Status |
|------|-------------|-------------|
| `INVALID_TOKEN` | Token format or validation failed | 400 |
| `INVALID_SIGNATURE` | Cryptographic signature invalid | 417 |
| `TOKEN_MISMATCH` | Token doesn't match server state | 409 |
| `SESSION_EXPIRED` | Session has expired | 410 |
| `DEVICE_NOT_FOUND` | Device not recognized | 404 |
| `RATE_LIMITED` | Too many requests | 429 |
| `GATEWAY_ERROR` | Internal gateway error | 500 |

### Rate Limiting

Relock implements rate limiting to prevent abuse:

- **Default Limit**: 100 requests per 15 minutes per IP
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- **Response**: 429 Too Many Requests when limit exceeded

## Security Considerations

### Request Validation

Always validate Relock responses:

```javascript
// Validate response format
function validateRelockResponse(response) {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format');
  }
  
  if (response.error) {
    throw new Error(`Relock error: ${response.error.message}`);
  }
  
  return response;
}
```

### Signature Verification

Verify all Relock signatures:

```javascript
// Verify Ed25519 signature
import { VerifyKey } from 'tweetnacl';

function verifyRelockSignature(data, signature, publicKey) {
  try {
    const verifyKey = new VerifyKey(publicKey);
    verifyKey.verify(data, signature);
    return true;
  } catch (error) {
    return false;
  }
}
```

### Secure Communication

- **HTTPS Only**: All API calls must use HTTPS
- **Certificate Validation**: Validate Relock's SSL certificate
- **Header Security**: Never log sensitive headers
- **Input Sanitization**: Sanitize all request data

## Testing

### Test Environment

- **Staging Gateway**: Use staging gateway for testing
- **Test Data**: Use non-production user data
- **Mock Responses**: Test error handling with mock responses

### Test Scenarios

1. **Valid Requests**: Test successful API calls
2. **Invalid Tokens**: Test token validation
3. **Rate Limiting**: Test rate limit enforcement
4. **Error Handling**: Test all error scenarios
5. **Security**: Test signature verification

## SDK Integration

### JavaScript SDK

```javascript
// Initialize Relock SDK
window.addEventListener('X-Key-Established', async function(event) {
  console.log('Relock ready:', event.detail);
  
  // Generate tokens for API calls
  let token = await window.relock.token();
  let signature = await window.relock.sign(token);
  
  // Use tokens in API calls
  const response = await fetch('/relock/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Key-Token': token.hexlify(),
      'X-Key-Signature': signature.hexlify()
    }
  });
  
  return response.json();
});
```

### Backend SDK

```python
# Python SDK example
import relock

# Initialize client
client = relock.Client(
    gateway_url="https://example.com/relock",
    public_key="your_public_key"
)

# Verify token
result = client.verify_token(token, signature)
if result.valid:
    print("Token verified successfully")
else:
    print("Token verification failed")
```

## Next Steps

### Implementation

1. **Choose Integration**: Select integration pattern
2. **Configure Gateway**: Set up Relock gateway
3. **Implement Endpoints**: Add API endpoints to your app
4. **Test Integration**: Validate all scenarios
5. **Deploy**: Go live with Relock

### Resources

- **Quick Start**: [Getting Started Guide](../getting-started/quickstart-overview)
- **Integration**: [Integration Patterns](../integration/integration-overview)
- **Security**: [Security Hardening](../deployment/security-hardening)
- **Examples**: [Code Examples](../examples/nodejs-examples)

### Support

- **API Questions**: [Contact our team](mailto:hi@relock.security?subject=API%20Reference%20Help)
- **Integration Support**: [Documentation](../integration/integration-overview)
- **Community**: [GitHub Discussions](https://github.com/hooked82/relock-dev-examples/discussions)
