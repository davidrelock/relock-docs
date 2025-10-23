---
title: API Overview
description: Complete API reference for Relock integration
sidebar_label: API Overview
---

# Relock API Overview

The Relock API provides secure device verification and authentication services. This comprehensive reference covers all endpoints, authentication methods, and integration patterns.

## Base URL

```
https://relock.host/api/v1
```

## Authentication

All API requests require authentication using your API key:

```bash
Authorization: Bearer YOUR_API_KEY
```

## Rate Limits

- **Standard**: 100 requests per minute
- **Burst**: 1000 requests per 5 minutes
- **Daily**: 10,000 requests per day

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "requestId": "req_123456789"
  }
}
```

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Invalid credentials provided",
    "details": {
      "field": "apiKey",
      "reason": "expired"
    }
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "requestId": "req_123456789"
  }
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_API_KEY` | 401 | API key is invalid or expired |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit exceeded |
| `INVALID_REQUEST` | 400 | Request format is invalid |
| `GATEWAY_NOT_FOUND` | 404 | Gateway UUID not found |
| `AUTHENTICATION_FAILED` | 401 | Authentication verification failed |
| `INTERNAL_ERROR` | 500 | Internal server error |

## SDKs and Libraries

### Official SDKs

- **Node.js**: `@relock/sdk`
- **Python**: `relock-python`
- **Java**: `relock-java`
- **Go**: `relock-go`

### Installation

```bash
# Node.js
npm install @relock/sdk

# Python
pip install relock-python

# Java
<dependency>
  <groupId>com.relock</groupId>
  <artifactId>relock-java</artifactId>
  <version>1.0.0</version>
</dependency>

# Go
go get github.com/relock/relock-go
```

## Quick Start Examples

### Node.js

```javascript
const { RelockClient } = require('@relock/sdk');

const relock = new RelockClient({
  apiKey: process.env.RELOCK_API_KEY,
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
  baseUrl: 'https://relock.host'
});

// Generate authentication URL
const authUrl = await relock.generateAuthUrl({
  userId: 'user123',
  sessionId: 'session456',
  redirectUrl: 'https://yourapp.com/callback'
});

// Verify authentication token
const result = await relock.verifyToken(token, userId);
```

### Python

```python
from relock import RelockClient

relock = RelockClient(
    api_key=os.getenv('RELOCK_API_KEY'),
    gateway_uuid=os.getenv('RELOCK_GATEWAY_UUID'),
    base_url='https://relock.host'
)

# Generate authentication URL
auth_url = relock.generate_auth_url(
    user_id='user123',
    session_id='session456',
    redirect_url='https://yourapp.com/callback'
)

# Verify authentication token
result = relock.verify_token(token, user_id)
```

### Java

```java
import com.relock.RelockClient;

RelockClient relock = new RelockClient.Builder()
    .apiKey(System.getenv("RELOCK_API_KEY"))
    .gatewayUuid(System.getenv("RELOCK_GATEWAY_UUID"))
    .baseUrl("https://relock.host")
    .build();

// Generate authentication URL
String authUrl = relock.generateAuthUrl(
    "user123",
    "session456",
    "https://yourapp.com/callback"
);

// Verify authentication token
VerificationResult result = relock.verifyToken(token, userId);
```

## API Endpoints

### Authentication

- **Generate Auth URL** - Create authentication URL for device verification
- **Verify Token** - Verify authentication token returned from callback
- **Refresh Token** - Refresh expired authentication tokens

### Device Management

- **Register Device** - Register new device for user
- **List Devices** - Get user's registered devices
- **Revoke Device** - Revoke device access and remove from trusted devices

### Session Management

- **Create Session** - Create new authenticated session
- **Validate Session** - Validate existing session
- **End Session** - End session and logout user

### Webhooks

- **Webhook Events** - Available webhook events and payloads
- **Webhook Configuration** - Set up webhook endpoints
- **Webhook Security** - Secure webhook handling and verification

## Integration Patterns

### Simple Integration

```javascript
// Redirect-based authentication
app.post('/auth/relock', async (req, res) => {
  const authUrl = await relock.generateAuthUrl({
    userId: req.body.userId,
    sessionId: req.body.sessionId,
    redirectUrl: `${req.protocol}://${req.get('host')}/auth/callback`
  });
  
  res.redirect(authUrl);
});
```

### SameSite Integration

```javascript
// Proxy-based authentication
app.use('/relock', relock.proxyMiddleware({
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
  baseUrl: process.env.RELOCK_BASE_URL
}));
```

### JavaScript Agent

```javascript
// Client-side authentication
const relockAgent = new RelockAgent({
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
  baseUrl: process.env.RELOCK_BASE_URL
});

await relockAgent.authenticate({
  userId: 'user123',
  sessionId: 'session456'
});
```

## Security Best Practices

### API Key Security

- Store API keys in environment variables
- Never commit API keys to version control
- Rotate API keys regularly
- Use different keys for different environments

### Request Security

- Always use HTTPS
- Validate all input parameters
- Implement proper error handling
- Use rate limiting

### Response Security

- Never log sensitive data
- Implement proper session management
- Use secure cookies
- Validate all responses

## Monitoring and Analytics

### Metrics

- Request count and response times
- Error rates by endpoint
- Authentication success rates
- Device registration patterns

### Logging

```javascript
// Structured logging
const logger = {
  api: (endpoint, method, status, duration) => {
    console.log(JSON.stringify({
      event: 'api_request',
      endpoint,
      method,
      status,
      duration,
      timestamp: new Date().toISOString()
    }));
  }
};
```

## Testing

### Test Environment

```javascript
const testConfig = {
  apiKey: process.env.RELOCK_TEST_API_KEY,
  gatewayUuid: process.env.RELOCK_TEST_GATEWAY_UUID,
  baseUrl: 'https://test.relock.host'
};
```

### Mock Responses

```javascript
// Mock for testing
const mockRelock = {
  generateAuthUrl: jest.fn().mockResolvedValue('https://test.relock.host/auth'),
  verifyToken: jest.fn().mockResolvedValue({ verified: true })
};
```

## Support and Resources

### Documentation

- [Authentication Guide](../guides/authentication.md)
- [Security Best Practices](../security/best-practices.md)
- [Troubleshooting Guide](../deployment/troubleshooting.md)

### Community

- [GitHub Repository](https://github.com/relock/relock-docs)
- [Discord Community](https://discord.gg/relock)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/relock)

### Support

- [Email Support](mailto:support@relock.security)
- [Documentation Issues](https://github.com/relock/relock-docs/issues)
- [Feature Requests](https://github.com/relock/relock-docs/discussions)
