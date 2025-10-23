# Gateway API

Server-side API for verifying Relock authentication and managing user sessions.

## Overview

The Gateway API provides:
- Token and signature verification
- User session management
- Authentication status checking

## Base URL

```
https://relock.host/
```

## Authentication

All API requests must include your gateway UUID in the `X-Key-Wildcard` header:

```http
X-Key-Wildcard: your-gateway-uuid
```

## Endpoints

### POST /relock/confirm

Verify a token and signature.

**Request**:
```http
POST /relock/confirm
Content-Type: application/json
X-Key-Wildcard: your-gateway-uuid

{
  "X-Key-Token": "hex-encoded-token",
  "X-Key-Signature": "hex-encoded-signature",
  "X-Key-Session": "session-id"
}
```

**Response**:
```json
{
  "success": true,
  "authenticated": true,
  "status_code": 200,
  "status_info": "Authentication successful"
}
```

**Status Codes**:
- `200 OK` - Authentication successful
- `401 Unauthorized` - Missing or invalid data
- `406 Not Acceptable` - Re-keying in progress
- `409 Conflict` - Token mismatch
- `417 Expectation Failed` - Invalid signature
- `404 Not Found` - Session not found
- `410 Gone` - Session expired

### POST /relock/login

Link a user to their device.

**Request**:
```http
POST /relock/login
Content-Type: application/json
X-Key-Wildcard: your-gateway-uuid

{
  "X-Key-Token": "hex-encoded-token",
  "X-Key-Signature": "hex-encoded-signature",
  "X-Key-Session": "session-id",
  "user": "user-id",
  "email": "user@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "authenticated": true,
  "owner": true,
  "status_code": 200,
  "status_info": "User linked to device"
}
```

### POST /relock/logout

Unlink a user from their device.

**Request**:
```http
POST /relock/logout
Content-Type: application/json
X-Key-Wildcard: your-gateway-uuid

{
  "X-Key-Token": "hex-encoded-token",
  "X-Key-Signature": "hex-encoded-signature",
  "X-Key-Session": "session-id"
}
```

**Response**:
```json
{
  "success": true,
  "authenticated": false,
  "status_code": 200,
  "status_info": "User unlinked from device"
}
```

## Usage Examples

### Node.js/Express

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Verify authentication middleware
async function verifyRelockAuth(req, res, next) {
  const { 'X-Key-Token': token, 'X-Key-Signature': signature, 'X-Key-Session': sessionId } = req.body;
  
  if (!token || !signature || !sessionId) {
    return res.status(401).json({ error: 'Missing authentication data' });
  }
  
  try {
    const response = await fetch('https://relock.host/relock/confirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Key-Wildcard': process.env.RELOCK_GATEWAY_UUID
      },
      body: JSON.stringify({
        'X-Key-Token': token,
        'X-Key-Signature': signature,
        'X-Key-Session': sessionId
      })
    });
    
    const result = await response.json();
    
    if (result.status_code === 200) {
      req.relockAuth = result;
      next();
    } else {
      res.status(401).json({ error: 'Authentication failed', details: result });
    }
  } catch (error) {
    console.error('Relock verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Protected route
app.post('/api/protected', verifyRelockAuth, (req, res) => {
  res.json({ 
    message: 'Access granted',
    auth: req.relockAuth
  });
});
```

### Python/Flask

```python
import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

def verify_relock_auth():
    token = request.json.get('X-Key-Token')
    signature = request.json.get('X-Key-Signature')
    session_id = request.json.get('X-Key-Session')
    
    if not all([token, signature, session_id]):
        return jsonify({'error': 'Missing authentication data'}), 401
    
    try:
        response = requests.post('https://relock.host/relock/confirm', 
            headers={
                'Content-Type': 'application/json',
                'X-Key-Wildcard': os.getenv('RELOCK_GATEWAY_UUID')
            },
            json={
                'X-Key-Token': token,
                'X-Key-Signature': signature,
                'X-Key-Session': session_id
            }
        )
        
        result = response.json()
        
        if result.get('status_code') == 200:
            return result
        else:
            return jsonify({'error': 'Authentication failed', 'details': result}), 401
            
    except Exception as e:
        print(f'Relock verification error: {e}')
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/protected', methods=['POST'])
def protected_route():
    auth_result = verify_relock_auth()
    if isinstance(auth_result, tuple):
        return auth_result
    
    return jsonify({'message': 'Access granted', 'auth': auth_result})
```

## Error Handling

### Common Error Responses

```json
{
  "success": false,
  "error": "Invalid signature",
  "status_code": 417,
  "status_info": "Signature verification failed"
}
```

### Retry Logic

For `406 Not Acceptable` responses (re-keying in progress), implement retry logic:

```javascript
async function verifyWithRetry(token, signature, sessionId, maxRetries = 5) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('https://relock.host/relock/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Key-Wildcard': process.env.RELOCK_GATEWAY_UUID
        },
        body: JSON.stringify({
          'X-Key-Token': token,
          'X-Key-Signature': signature,
          'X-Key-Session': sessionId
        })
      });
      
      const result = await response.json();
      
      if (result.status_code === 200) {
        return result;
      } else if (result.status_code === 406 && i < maxRetries - 1) {
        // Re-keying in progress, wait and retry
        await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000));
        continue;
      } else {
        throw new Error(`Authentication failed: ${result.status_info}`);
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, (i + 1) * 1000));
    }
  }
}
```

## Security Considerations

### HTTPS Requirement

All API requests must use HTTPS. HTTP requests will be rejected.

### Gateway UUID Security

Keep your gateway UUID secure and never expose it in client-side code.

### Request Validation

Always validate the response from the Gateway API:

```javascript
function validateRelockResponse(response) {
  if (!response || typeof response !== 'object') {
    throw new Error('Invalid response format');
  }
  
  if (response.status_code !== 200) {
    throw new Error(`Authentication failed: ${response.status_info}`);
  }
  
  return response;
}
```

## Next Steps

- [**JavaScript Agent API**](./js-agent-api) - Client-side integration
- [**JavaScript Agent Integration**](../guides/js-agent-integration) - Complete integration guide