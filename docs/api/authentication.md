---
title: Authentication API
description: Authentication endpoints and methods
sidebar_label: Authentication
---

# Authentication API

The Authentication API provides endpoints for device verification and user authentication.

## Generate Authentication URL

Create a secure authentication URL for user device verification.

### Endpoint

```
POST /api/v1/auth/generate-url
```

### Request

```json
{
  "userId": "string",
  "sessionId": "string",
  "redirectUrl": "string",
  "options": {
    "timeout": 300,
    "theme": "light",
    "language": "en"
  }
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | Unique user identifier |
| `sessionId` | string | Yes | Session identifier |
| `redirectUrl` | string | Yes | URL to redirect after authentication |
| `options.timeout` | number | No | Authentication timeout in seconds (default: 300) |
| `options.theme` | string | No | UI theme: `light` or `dark` (default: `light`) |
| `options.language` | string | No | UI language code (default: `en`) |

### Response

```json
{
  "success": true,
  "data": {
    "authUrl": "https://relock.host/auth/verify?token=abc123",
    "expiresAt": "2024-01-01T00:05:00Z",
    "sessionId": "session456"
  }
}
```

### Example

```javascript
const response = await fetch('https://relock.host/api/v1/auth/generate-url', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: 'user123',
    sessionId: 'session456',
    redirectUrl: 'https://yourapp.com/auth/callback',
    options: {
      timeout: 300,
      theme: 'light',
      language: 'en'
    }
  })
});

const data = await response.json();
console.log('Auth URL:', data.data.authUrl);
```

## Verify Authentication Token

Verify an authentication token returned from the authentication flow.

### Endpoint

```
POST /api/v1/auth/verify-token
```

### Request

```json
{
  "token": "string",
  "userId": "string",
  "sessionId": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | Yes | Authentication token from callback |
| `userId` | string | Yes | User identifier |
| `sessionId` | string | Yes | Session identifier |

### Response

```json
{
  "success": true,
  "data": {
    "verified": true,
    "userId": "user123",
    "sessionId": "session456",
    "deviceId": "device789",
    "verifiedAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-01-01T01:00:00Z"
  }
}
```

### Example

```javascript
const response = await fetch('https://relock.host/api/v1/auth/verify-token', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    token: 'abc123',
    userId: 'user123',
    sessionId: 'session456'
  })
});

const data = await response.json();
if (data.data.verified) {
  console.log('Authentication successful');
} else {
  console.log('Authentication failed');
}
```

## Refresh Authentication Token

Refresh an expired authentication token.

### Endpoint

```
POST /api/v1/auth/refresh-token
```

### Request

```json
{
  "refreshToken": "string",
  "userId": "string"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `refreshToken` | string | Yes | Refresh token from initial authentication |
| `userId` | string | Yes | User identifier |

### Response

```json
{
  "success": true,
  "data": {
    "token": "new_token_abc123",
    "expiresAt": "2024-01-01T01:00:00Z",
    "refreshToken": "new_refresh_token_xyz789"
  }
}
```

### Example

```javascript
const response = await fetch('https://relock.host/api/v1/auth/refresh-token', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    refreshToken: 'refresh_xyz789',
    userId: 'user123'
  })
});

const data = await response.json();
console.log('New token:', data.data.token);
```

## Error Responses

### Invalid Token

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "The provided token is invalid or expired",
    "details": {
      "token": "abc123",
      "reason": "expired"
    }
  }
}
```

### Authentication Failed

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Device verification failed",
    "details": {
      "userId": "user123",
      "reason": "device_not_trusted"
    }
  }
}
```

### Rate Limit Exceeded

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests, please try again later",
    "details": {
      "limit": 100,
      "window": "1 minute",
      "retryAfter": 60
    }
  }
}
```

## SDK Examples

### Node.js SDK

```javascript
const { RelockClient } = require('@relock/sdk');

const relock = new RelockClient({
  apiKey: process.env.RELOCK_API_KEY,
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID
});

// Generate authentication URL
const authUrl = await relock.generateAuthUrl({
  userId: 'user123',
  sessionId: 'session456',
  redirectUrl: 'https://yourapp.com/callback'
});

// Verify token
const result = await relock.verifyToken(token, userId);
```

### Python SDK

```python
from relock import RelockClient

relock = RelockClient(
    api_key=os.getenv('RELOCK_API_KEY'),
    gateway_uuid=os.getenv('RELOCK_GATEWAY_UUID')
)

# Generate authentication URL
auth_url = relock.generate_auth_url(
    user_id='user123',
    session_id='session456',
    redirect_url='https://yourapp.com/callback'
)

# Verify token
result = relock.verify_token(token, user_id)
```

### Java SDK

```java
import com.relock.RelockClient;

RelockClient relock = new RelockClient.Builder()
    .apiKey(System.getenv("RELOCK_API_KEY"))
    .gatewayUuid(System.getenv("RELOCK_GATEWAY_UUID"))
    .build();

// Generate authentication URL
String authUrl = relock.generateAuthUrl(
    "user123",
    "session456",
    "https://yourapp.com/callback"
);

// Verify token
VerificationResult result = relock.verifyToken(token, userId);
```

## Best Practices

### Security

1. **Always use HTTPS** for all API requests
2. **Validate all input parameters** before making requests
3. **Store tokens securely** and never log them
4. **Implement proper error handling** for all responses
5. **Use rate limiting** to prevent abuse

### Performance

1. **Cache authentication results** when appropriate
2. **Use connection pooling** for high-volume applications
3. **Implement retry logic** with exponential backoff
4. **Monitor API response times** and error rates

### Error Handling

```javascript
async function authenticateUser(userId, sessionId) {
  try {
    const authUrl = await relock.generateAuthUrl({
      userId,
      sessionId,
      redirectUrl: 'https://yourapp.com/callback'
    });
    
    return { success: true, authUrl };
  } catch (error) {
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      // Handle rate limiting
      return { success: false, error: 'Rate limit exceeded' };
    } else if (error.code === 'INVALID_REQUEST') {
      // Handle invalid request
      return { success: false, error: 'Invalid request parameters' };
    } else {
      // Handle other errors
      return { success: false, error: 'Authentication failed' };
    }
  }
}
```

## Testing

### Unit Tests

```javascript
describe('Authentication API', () => {
  test('should generate auth URL', async () => {
    const result = await relock.generateAuthUrl({
      userId: 'test-user',
      sessionId: 'test-session',
      redirectUrl: 'https://test.com/callback'
    });
    
    expect(result).toContain('https://relock.host/auth/verify');
  });
  
  test('should verify valid token', async () => {
    const result = await relock.verifyToken('valid-token', 'test-user');
    expect(result.verified).toBe(true);
  });
});
```

### Integration Tests

```javascript
describe('Authentication Flow', () => {
  test('complete authentication flow', async () => {
    // Generate auth URL
    const authUrl = await relock.generateAuthUrl({
      userId: 'test-user',
      sessionId: 'test-session',
      redirectUrl: 'https://test.com/callback'
    });
    
    // Simulate user authentication
    const token = 'simulated-token';
    
    // Verify token
    const result = await relock.verifyToken(token, 'test-user');
    expect(result.verified).toBe(true);
  });
});
```
