---
title: API Endpoints
description: Complete reference for all Relock API endpoints
sidebar_label: Endpoints
---

# API Endpoints

Complete reference for all Relock API endpoints with examples, parameters, and responses.

## Base URL

All API endpoints use the base URL:
```
https://relock.host/api/v1
```

## Authentication

All requests require authentication using your API key:

```bash
Authorization: Bearer YOUR_API_KEY
```

## Health Check

### GET /health

Check the health status of the Relock API.

**Request:**
```bash
curl -X GET "https://relock.host/api/v1/health" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0"
  }
}
```

## Authentication Endpoints

### POST /auth/generate-url

Generate a secure authentication URL for device verification.

**Request Body:**
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

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | Unique user identifier |
| `sessionId` | string | ✅ | Session identifier |
| `redirectUrl` | string | ✅ | URL to redirect after authentication |
| `options.timeout` | number | ❌ | Authentication timeout in seconds (default: 300) |
| `options.theme` | string | ❌ | UI theme: `light` or `dark` (default: `light`) |
| `options.language` | string | ❌ | UI language code (default: `en`) |

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/auth/generate-url" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "sessionId": "session456",
    "redirectUrl": "https://yourapp.com/auth/callback",
    "options": {
      "timeout": 300,
      "theme": "light",
      "language": "en"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "authUrl": "https://relock.host/auth/verify?token=abc123&session=session456",
    "expiresAt": "2024-01-01T00:05:00Z",
    "sessionId": "session456"
  }
}
```

### POST /auth/verify-token

Verify an authentication token returned from the authentication flow.

**Request Body:**
```json
{
  "token": "string",
  "userId": "string",
  "sessionId": "string"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `token` | string | ✅ | Authentication token from callback |
| `userId` | string | ✅ | User identifier |
| `sessionId` | string | ✅ | Session identifier |

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/auth/verify-token" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "abc123",
    "userId": "user123",
    "sessionId": "session456"
  }'
```

**Response:**
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

### POST /auth/refresh-token

Refresh an expired authentication token.

**Request Body:**
```json
{
  "refreshToken": "string",
  "userId": "string"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `refreshToken` | string | ✅ | Refresh token from initial authentication |
| `userId` | string | ✅ | User identifier |

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/auth/refresh-token" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "refresh_xyz789",
    "userId": "user123"
  }'
```

**Response:**
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

## Device Management

### POST /devices/register

Register a new device for a user.

**Request Body:**
```json
{
  "userId": "string",
  "deviceInfo": {
    "name": "string",
    "type": "string",
    "os": "string",
    "browser": "string"
  }
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | User identifier |
| `deviceInfo.name` | string | ✅ | Device name (e.g., "John's iPhone") |
| `deviceInfo.type` | string | ✅ | Device type: `mobile`, `desktop`, `tablet` |
| `deviceInfo.os` | string | ❌ | Operating system |
| `deviceInfo.browser` | string | ❌ | Browser name |

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/devices/register" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "deviceInfo": {
      "name": "John'\''s iPhone",
      "type": "mobile",
      "os": "iOS 17.0",
      "browser": "Safari"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "deviceId": "device789",
    "userId": "user123",
    "name": "John's iPhone",
    "type": "mobile",
    "registeredAt": "2024-01-01T00:00:00Z",
    "trusted": true
  }
}
```

### GET /devices

List all devices for a user.

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | User identifier |
| `limit` | number | ❌ | Number of devices to return (default: 10) |
| `offset` | number | ❌ | Number of devices to skip (default: 0) |

**Example Request:**
```bash
curl -X GET "https://relock.host/api/v1/devices?userId=user123&limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "deviceId": "device789",
        "name": "John's iPhone",
        "type": "mobile",
        "trusted": true,
        "lastUsed": "2024-01-01T00:00:00Z",
        "registeredAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

### DELETE /devices/{deviceId}

Revoke access for a specific device.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `deviceId` | string | ✅ | Device identifier |

**Example Request:**
```bash
curl -X DELETE "https://relock.host/api/v1/devices/device789" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "deviceId": "device789",
    "revoked": true,
    "revokedAt": "2024-01-01T00:00:00Z"
  }
}
```

## Session Management

### POST /sessions/create

Create a new session for a user.

**Request Body:**
```json
{
  "userId": "string",
  "deviceId": "string",
  "options": {
    "timeout": 3600,
    "autoRefresh": true
  }
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | ✅ | User identifier |
| `deviceId` | string | ✅ | Device identifier |
| `options.timeout` | number | ❌ | Session timeout in seconds (default: 3600) |
| `options.autoRefresh` | boolean | ❌ | Auto-refresh session (default: true) |

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/sessions/create" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "deviceId": "device789",
    "options": {
      "timeout": 3600,
      "autoRefresh": true
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session456",
    "userId": "user123",
    "deviceId": "device789",
    "createdAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-01-01T01:00:00Z",
    "active": true
  }
}
```

### GET /sessions/{sessionId}

Get information about a specific session.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | ✅ | Session identifier |

**Example Request:**
```bash
curl -X GET "https://relock.host/api/v1/sessions/session456" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session456",
    "userId": "user123",
    "deviceId": "device789",
    "active": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-01-01T01:00:00Z",
    "lastActivity": "2024-01-01T00:00:00Z"
  }
}
```

### POST /sessions/{sessionId}/refresh

Refresh an existing session.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | ✅ | Session identifier |

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/sessions/session456/refresh" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session456",
    "expiresAt": "2024-01-01T02:00:00Z",
    "refreshedAt": "2024-01-01T01:00:00Z"
  }
}
```

### DELETE /sessions/{sessionId}

End a specific session.

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sessionId` | string | ✅ | Session identifier |

**Example Request:**
```bash
curl -X DELETE "https://relock.host/api/v1/sessions/session456" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "session456",
    "ended": true,
    "endedAt": "2024-01-01T00:00:00Z"
  }
}
```

## Webhook Endpoints

### POST /webhooks/configure

Configure webhook endpoints for your application.

**Request Body:**
```json
{
  "url": "string",
  "events": ["string"],
  "secret": "string"
}
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | ✅ | Webhook endpoint URL |
| `events` | array | ✅ | Array of events to subscribe to |
| `secret` | string | ✅ | Secret for webhook verification |

**Available Events:**
- `authentication.success`
- `authentication.failed`
- `device.registered`
- `device.revoked`
- `session.created`
- `session.ended`

**Example Request:**
```bash
curl -X POST "https://relock.host/api/v1/webhooks/configure" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://yourapp.com/webhooks/relock",
    "events": ["authentication.success", "authentication.failed"],
    "secret": "your_webhook_secret"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "webhookId": "webhook123",
    "url": "https://yourapp.com/webhooks/relock",
    "events": ["authentication.success", "authentication.failed"],
    "active": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "field": "specific_field",
      "reason": "detailed_reason"
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
| `DEVICE_NOT_FOUND` | 404 | Device not found |
| `SESSION_EXPIRED` | 401 | Session has expired |
| `INTERNAL_ERROR` | 500 | Internal server error |

## Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 100 requests | 1 minute |
| Device Management | 50 requests | 1 minute |
| Session Management | 200 requests | 1 minute |
| Webhooks | 20 requests | 1 minute |

## SDK Examples

### Node.js

```javascript
const { RelockClient } = require('@relock/sdk');

const relock = new RelockClient({
  apiKey: process.env.RELOCK_API_KEY,
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID
});

// Generate auth URL
const authUrl = await relock.generateAuthUrl({
  userId: 'user123',
  sessionId: 'session456',
  redirectUrl: 'https://yourapp.com/callback'
});

// Verify token
const result = await relock.verifyToken(token, userId);
```

### Python

```python
from relock import RelockClient

relock = RelockClient(
    api_key=os.getenv('RELOCK_API_KEY'),
    gateway_uuid=os.getenv('RELOCK_GATEWAY_UUID')
)

# Generate auth URL
auth_url = relock.generate_auth_url(
    user_id='user123',
    session_id='session456',
    redirect_url='https://yourapp.com/callback'
)

# Verify token
result = relock.verify_token(token, user_id)
```

### Java

```java
import com.relock.RelockClient;

RelockClient relock = new RelockClient.Builder()
    .apiKey(System.getenv("RELOCK_API_KEY"))
    .gatewayUuid(System.getenv("RELOCK_GATEWAY_UUID"))
    .build();

// Generate auth URL
String authUrl = relock.generateAuthUrl(
    "user123",
    "session456",
    "https://yourapp.com/callback"
);

// Verify token
VerificationResult result = relock.verifyToken(token, userId);
```

## Testing

### Postman Collection

Import our Postman collection to test all endpoints:

```json
{
  "info": {
    "name": "Relock API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "https://relock.host/api/v1"
    },
    {
      "key": "apiKey",
      "value": "YOUR_API_KEY"
    }
  ]
}
```

### cURL Examples

All endpoints include cURL examples for easy testing. Copy and paste the examples, replacing `YOUR_API_KEY` with your actual API key.

## Next Steps

- [API Quick Start](./quick-start.md) - Get started in 5 minutes
- [Authentication Guide](./authentication.md) - Detailed authentication flow
- [SDK Documentation](./sdks.md) - Language-specific SDKs
- [Webhooks Guide](./webhooks.md) - Real-time event notifications
