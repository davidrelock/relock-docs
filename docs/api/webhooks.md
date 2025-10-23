---
title: Webhooks
description: Real-time event notifications and webhook configuration
sidebar_label: Webhooks
---

# Webhooks

Receive real-time notifications about authentication events, device changes, and session updates through webhooks.

## What are Webhooks?

Webhooks are HTTP callbacks that Relock sends to your application when specific events occur. Instead of polling our API for updates, webhooks provide instant notifications about important events.

## Available Events

| Event | Description | When Triggered |
|-------|-------------|----------------|
| `authentication.success` | User successfully authenticated | After successful device verification |
| `authentication.failed` | Authentication attempt failed | When device verification fails |
| `device.registered` | New device registered | When a user registers a new device |
| `device.revoked` | Device access revoked | When a device is removed or blocked |
| `session.created` | New session started | When a user starts a new session |
| `session.ended` | Session ended | When a user logs out or session expires |
| `security.alert` | Security event detected | When suspicious activity is detected |

## Setting Up Webhooks

### 1. Configure Webhook Endpoint

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

### 2. Create Webhook Handler

#### Node.js Example

```javascript
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Webhook secret for verification
const WEBHOOK_SECRET = process.env.RELOCK_WEBHOOK_SECRET;

// Verify webhook signature
const verifyWebhookSignature = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
};

// Webhook endpoint
app.post('/webhooks/relock', (req, res) => {
  const signature = req.headers['x-relock-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify webhook signature
  if (!verifyWebhookSignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  const { event, data } = req.body;
  
  // Handle different events
  switch (event) {
    case 'authentication.success':
      handleAuthSuccess(data);
      break;
    case 'authentication.failed':
      handleAuthFailed(data);
      break;
    case 'device.registered':
      handleDeviceRegistered(data);
      break;
    case 'device.revoked':
      handleDeviceRevoked(data);
      break;
    case 'session.created':
      handleSessionCreated(data);
      break;
    case 'session.ended':
      handleSessionEnded(data);
      break;
    case 'security.alert':
      handleSecurityAlert(data);
      break;
    default:
      console.log('Unknown event:', event);
  }
  
  res.status(200).json({ received: true });
});

// Event handlers
function handleAuthSuccess(data) {
  console.log('User authenticated:', data.userId);
  // Update user status, send notifications, etc.
}

function handleAuthFailed(data) {
  console.log('Authentication failed for user:', data.userId);
  // Log security event, notify administrators, etc.
}

function handleDeviceRegistered(data) {
  console.log('New device registered:', data.deviceId);
  // Send welcome email, update device list, etc.
}

function handleDeviceRevoked(data) {
  console.log('Device revoked:', data.deviceId);
  // Notify user, update device list, etc.
}

function handleSessionCreated(data) {
  console.log('Session created:', data.sessionId);
  // Update session tracking, analytics, etc.
}

function handleSessionEnded(data) {
  console.log('Session ended:', data.sessionId);
  // Clean up session data, analytics, etc.
}

function handleSecurityAlert(data) {
  console.log('Security alert:', data.alert);
  // Notify security team, log incident, etc.
}

app.listen(3000, () => {
  console.log('Webhook server running on port 3000');
});
```

#### Python Example

```python
from flask import Flask, request, jsonify
import hmac
import hashlib
import json
import os

app = Flask(__name__)
WEBHOOK_SECRET = os.getenv('RELOCK_WEBHOOK_SECRET')

def verify_webhook_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(signature, expected_signature)

@app.route('/webhooks/relock', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Relock-Signature')
    payload = request.get_data(as_text=True)
    
    # Verify webhook signature
    if not verify_webhook_signature(payload, signature, WEBHOOK_SECRET):
        return jsonify({'error': 'Invalid signature'}), 401
    
    data = request.get_json()
    event = data.get('event')
    event_data = data.get('data')
    
    # Handle different events
    if event == 'authentication.success':
        handle_auth_success(event_data)
    elif event == 'authentication.failed':
        handle_auth_failed(event_data)
    elif event == 'device.registered':
        handle_device_registered(event_data)
    elif event == 'device.revoked':
        handle_device_revoked(event_data)
    elif event == 'session.created':
        handle_session_created(event_data)
    elif event == 'session.ended':
        handle_session_ended(event_data)
    elif event == 'security.alert':
        handle_security_alert(event_data)
    else:
        print(f'Unknown event: {event}')
    
    return jsonify({'received': True})

def handle_auth_success(data):
    print(f'User authenticated: {data["userId"]}')
    # Update user status, send notifications, etc.

def handle_auth_failed(data):
    print(f'Authentication failed for user: {data["userId"]}')
    # Log security event, notify administrators, etc.

def handle_device_registered(data):
    print(f'New device registered: {data["deviceId"]}')
    # Send welcome email, update device list, etc.

def handle_device_revoked(data):
    print(f'Device revoked: {data["deviceId"]}')
    # Notify user, update device list, etc.

def handle_session_created(data):
    print(f'Session created: {data["sessionId"]}')
    # Update session tracking, analytics, etc.

def handle_session_ended(data):
    print(f'Session ended: {data["sessionId"]}')
    # Clean up session data, analytics, etc.

def handle_security_alert(data):
    print(f'Security alert: {data["alert"]}')
    # Notify security team, log incident, etc.

if __name__ == '__main__':
    app.run(debug=True)
```

#### Java Example

```java
@RestController
@RequestMapping("/webhooks")
public class WebhookController {
    
    @Value("${relock.webhook.secret}")
    private String webhookSecret;
    
    @PostMapping("/relock")
    public ResponseEntity<Map<String, Object>> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Relock-Signature") String signature) {
        
        // Verify webhook signature
        if (!verifySignature(payload, signature, webhookSecret)) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid signature"));
        }
        
        // Parse webhook data
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode data = mapper.readTree(payload);
            String event = data.get("event").asText();
            JsonNode eventData = data.get("data");
            
            // Handle different events
            switch (event) {
                case "authentication.success":
                    handleAuthSuccess(eventData);
                    break;
                case "authentication.failed":
                    handleAuthFailed(eventData);
                    break;
                case "device.registered":
                    handleDeviceRegistered(eventData);
                    break;
                case "device.revoked":
                    handleDeviceRevoked(eventData);
                    break;
                case "session.created":
                    handleSessionCreated(eventData);
                    break;
                case "session.ended":
                    handleSessionEnded(eventData);
                    break;
                case "security.alert":
                    handleSecurityAlert(eventData);
                    break;
                default:
                    log.info("Unknown event: {}", event);
            }
            
            return ResponseEntity.ok(Map.of("received", true));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
    
    private boolean verifySignature(String payload, String signature, String secret) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
            mac.init(secretKeySpec);
            
            byte[] hash = mac.doFinal(payload.getBytes());
            String expectedSignature = Hex.encodeHexString(hash);
            
            return MessageDigest.isEqual(signature.getBytes(), expectedSignature.getBytes());
        } catch (Exception e) {
            return false;
        }
    }
    
    private void handleAuthSuccess(JsonNode data) {
        log.info("User authenticated: {}", data.get("userId").asText());
        // Update user status, send notifications, etc.
    }
    
    private void handleAuthFailed(JsonNode data) {
        log.info("Authentication failed for user: {}", data.get("userId").asText());
        // Log security event, notify administrators, etc.
    }
    
    private void handleDeviceRegistered(JsonNode data) {
        log.info("New device registered: {}", data.get("deviceId").asText());
        // Send welcome email, update device list, etc.
    }
    
    private void handleDeviceRevoked(JsonNode data) {
        log.info("Device revoked: {}", data.get("deviceId").asText());
        // Notify user, update device list, etc.
    }
    
    private void handleSessionCreated(JsonNode data) {
        log.info("Session created: {}", data.get("sessionId").asText());
        // Update session tracking, analytics, etc.
    }
    
    private void handleSessionEnded(JsonNode data) {
        log.info("Session ended: {}", data.get("sessionId").asText());
        // Clean up session data, analytics, etc.
    }
    
    private void handleSecurityAlert(JsonNode data) {
        log.info("Security alert: {}", data.get("alert").asText());
        // Notify security team, log incident, etc.
    }
}
```

## Webhook Payload Structure

### Authentication Success

```json
{
  "event": "authentication.success",
  "data": {
    "userId": "user123",
    "sessionId": "session456",
    "deviceId": "device789",
    "timestamp": "2024-01-01T00:00:00Z",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0...",
    "location": {
      "country": "US",
      "city": "San Francisco",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

### Authentication Failed

```json
{
  "event": "authentication.failed",
  "data": {
    "userId": "user123",
    "sessionId": "session456",
    "timestamp": "2024-01-01T00:00:00Z",
    "reason": "device_not_trusted",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0...",
    "location": {
      "country": "US",
      "city": "San Francisco",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

### Device Registered

```json
{
  "event": "device.registered",
  "data": {
    "deviceId": "device789",
    "userId": "user123",
    "deviceInfo": {
      "name": "John's iPhone",
      "type": "mobile",
      "os": "iOS 17.0",
      "browser": "Safari"
    },
    "timestamp": "2024-01-01T00:00:00Z",
    "ipAddress": "192.168.1.100",
    "location": {
      "country": "US",
      "city": "San Francisco",
      "timezone": "America/Los_Angeles"
    }
  }
}
```

### Device Revoked

```json
{
  "event": "device.revoked",
  "data": {
    "deviceId": "device789",
    "userId": "user123",
    "reason": "user_requested",
    "timestamp": "2024-01-01T00:00:00Z",
    "revokedBy": "user123"
  }
}
```

### Session Created

```json
{
  "event": "session.created",
  "data": {
    "sessionId": "session456",
    "userId": "user123",
    "deviceId": "device789",
    "timestamp": "2024-01-01T00:00:00Z",
    "expiresAt": "2024-01-01T01:00:00Z",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Session Ended

```json
{
  "event": "session.ended",
  "data": {
    "sessionId": "session456",
    "userId": "user123",
    "deviceId": "device789",
    "timestamp": "2024-01-01T00:00:00Z",
    "reason": "user_logout",
    "duration": 3600
  }
}
```

### Security Alert

```json
{
  "event": "security.alert",
  "data": {
    "alertId": "alert123",
    "userId": "user123",
    "alertType": "suspicious_activity",
    "severity": "high",
    "description": "Multiple failed authentication attempts from different locations",
    "timestamp": "2024-01-01T00:00:00Z",
    "ipAddress": "192.168.1.100",
    "location": {
      "country": "US",
      "city": "San Francisco",
      "timezone": "America/Los_Angeles"
    },
    "details": {
      "attemptCount": 5,
      "timeWindow": "5 minutes",
      "locations": ["US", "CA", "GB"]
    }
  }
}
```

## Security Best Practices

### 1. Verify Webhook Signatures

Always verify the webhook signature to ensure the request came from Relock:

```javascript
const crypto = require('crypto');

const verifySignature = (payload, signature, secret) => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
};
```

### 2. Use HTTPS

Always use HTTPS for your webhook endpoints to ensure data is encrypted in transit.

### 3. Implement Rate Limiting

Protect your webhook endpoints from abuse:

```javascript
const rateLimit = require('express-rate-limit');

const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many webhook requests'
});

app.use('/webhooks', webhookLimiter);
```

### 4. Log All Webhook Events

Keep detailed logs of all webhook events for debugging and security:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'webhooks.log' })
  ]
});

app.post('/webhooks/relock', (req, res) => {
  logger.info('Webhook received', {
    event: req.body.event,
    timestamp: new Date().toISOString(),
    ip: req.ip
  });
  
  // Handle webhook...
});
```

## Testing Webhooks

### Using ngrok for Local Development

```bash
# Install ngrok
npm install -g ngrok

# Start your local server
npm start

# In another terminal, expose your local server
ngrok http 3000

# Use the ngrok URL for your webhook endpoint
# https://abc123.ngrok.io/webhooks/relock
```

### Webhook Testing Tool

```javascript
// Test webhook locally
const testWebhook = async () => {
  const testPayload = {
    event: 'authentication.success',
    data: {
      userId: 'test-user',
      sessionId: 'test-session',
      deviceId: 'test-device',
      timestamp: new Date().toISOString()
    }
  };
  
  const response = await fetch('http://localhost:3000/webhooks/relock', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Relock-Signature': 'test-signature'
    },
    body: JSON.stringify(testPayload)
  });
  
  console.log('Webhook test response:', await response.json());
};

testWebhook();
```

## Monitoring and Debugging

### Health Check Endpoint

```javascript
app.get('/webhooks/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Error Handling

```javascript
app.post('/webhooks/relock', (req, res) => {
  try {
    // Verify signature
    if (!verifySignature(req.body, req.headers['x-relock-signature'], WEBHOOK_SECRET)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
    
    // Handle webhook
    handleWebhook(req.body);
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Common Issues

### Webhook Not Receiving Events

1. **Check your endpoint URL** - Ensure it's accessible from the internet
2. **Verify HTTPS** - Relock only sends webhooks to HTTPS endpoints
3. **Check firewall settings** - Ensure your server can receive incoming requests
4. **Verify webhook configuration** - Check that your webhook is properly configured

### Signature Verification Failing

1. **Check your webhook secret** - Ensure it matches the one in your Relock dashboard
2. **Verify payload format** - Ensure you're using the raw request body
3. **Check header name** - Ensure you're reading the correct header (`X-Relock-Signature`)

### Duplicate Events

1. **Implement idempotency** - Use event IDs to prevent duplicate processing
2. **Check your retry logic** - Ensure you're not processing the same event multiple times
3. **Monitor webhook logs** - Check for duplicate events in your logs

## Next Steps

- [API Quick Start](./quick-start.md) - Get started with the API
- [API Endpoints](./endpoints.md) - Complete endpoint reference
- [SDK Documentation](./sdks.md) - Language-specific SDKs
- [Authentication Guide](./authentication.md) - Detailed authentication flow
