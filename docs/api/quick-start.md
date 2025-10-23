---
title: API Quick Start
description: Get started with the Relock API in 5 minutes
sidebar_label: Quick Start
---

# API Quick Start

Get up and running with the Relock API in just 5 minutes. This guide will walk you through your first API call and help you understand the basics.

## What You'll Build

By the end of this guide, you'll have:
- ✅ Set up your Relock account and credentials
- ✅ Made your first API call
- ✅ Authenticated a user with device verification
- ✅ Verified the authentication result

## Prerequisites

- A Relock account ([Sign up here](https://relock.host))
- Basic knowledge of HTTP requests
- Your preferred programming language (Node.js, Python, or cURL)

## Step 1: Get Your API Credentials

### Create a Relock Account

1. Go to [relock.host](https://relock.host) and sign up
2. Create a new gateway in your dashboard
3. Copy your API credentials:
   - **API Key**: `relock_sk_...`
   - **Gateway UUID**: `gateway_...`
   - **Base URL**: `https://relock.host`

### Environment Setup

Create a `.env` file in your project:

```bash
# .env
RELOCK_API_KEY=relock_sk_your_api_key_here
RELOCK_GATEWAY_UUID=gateway_your_gateway_uuid_here
RELOCK_BASE_URL=https://relock.host
```

## Step 2: Make Your First API Call

### Using cURL (Any Platform)

```bash
# Test your API connection
curl -X GET "https://relock.host/api/v1/health" \
  -H "Authorization: Bearer relock_sk_your_api_key_here"
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Using Node.js

```javascript
// Install the SDK
// npm install @relock/sdk

const { RelockClient } = require('@relock/sdk');

// Initialize the client
const relock = new RelockClient({
  apiKey: process.env.RELOCK_API_KEY,
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
  baseUrl: process.env.RELOCK_BASE_URL
});

// Test the connection
async function testConnection() {
  try {
    const health = await relock.health();
    console.log('✅ Connection successful:', health);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
```

### Using Python

```python
# Install the SDK
# pip install relock-python

import os
from relock import RelockClient

# Initialize the client
relock = RelockClient(
    api_key=os.getenv('RELOCK_API_KEY'),
    gateway_uuid=os.getenv('RELOCK_GATEWAY_UUID'),
    base_url=os.getenv('RELOCK_BASE_URL')
)

# Test the connection
try:
    health = relock.health()
    print('✅ Connection successful:', health)
except Exception as error:
    print('❌ Connection failed:', str(error))
```

## Step 3: Authenticate a User

Now let's create a complete authentication flow:

### Node.js Example

```javascript
const express = require('express');
const { RelockClient } = require('@relock/sdk');

const app = express();
const relock = new RelockClient({
  apiKey: process.env.RELOCK_API_KEY,
  gatewayUuid: process.env.RELOCK_GATEWAY_UUID,
  baseUrl: process.env.RELOCK_BASE_URL
});

// Generate authentication URL
app.post('/auth/start', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Create authentication URL
    const authUrl = await relock.generateAuthUrl({
      userId,
      sessionId: `session_${Date.now()}`,
      redirectUrl: 'http://localhost:3000/auth/callback'
    });
    
    res.json({ authUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle authentication callback
app.get('/auth/callback', async (req, res) => {
  try {
    const { token, userId } = req.query;
    
    // Verify the authentication
    const result = await relock.verifyToken(token, userId);
    
    if (result.verified) {
      res.json({ 
        success: true, 
        message: 'Authentication successful!',
        userId: result.userId 
      });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

### Python Example

```python
from flask import Flask, request, jsonify
from relock import RelockClient
import os

app = Flask(__name__)

# Initialize Relock client
relock = RelockClient(
    api_key=os.getenv('RELOCK_API_KEY'),
    gateway_uuid=os.getenv('RELOCK_GATEWAY_UUID'),
    base_url=os.getenv('RELOCK_BASE_URL')
)

@app.route('/auth/start', methods=['POST'])
def start_auth():
    try:
        data = request.get_json()
        user_id = data['userId']
        
        # Generate authentication URL
        auth_url = relock.generate_auth_url(
            user_id=user_id,
            session_id=f'session_{int(time.time())}',
            redirect_url='http://localhost:5000/auth/callback'
        )
        
        return jsonify({'authUrl': auth_url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/auth/callback')
def auth_callback():
    try:
        token = request.args.get('token')
        user_id = request.args.get('userId')
        
        # Verify authentication
        result = relock.verify_token(token, user_id)
        
        if result.verified:
            return jsonify({
                'success': True,
                'message': 'Authentication successful!',
                'userId': result.user_id
            })
        else:
            return jsonify({'error': 'Authentication failed'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
```

## Step 4: Test Your Integration

### Frontend Test Page

Create a simple HTML file to test your authentication:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Relock Authentication Test</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .container { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
        button { background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .result { margin-top: 20px; padding: 10px; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
    </style>
</head>
<body>
    <div class="container">
        <h2>🔐 Relock Authentication Test</h2>
        <p>Click the button below to test device authentication:</p>
        
        <button onclick="startAuth()">Start Authentication</button>
        
        <div id="result"></div>
    </div>

    <script>
        async function startAuth() {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>🔄 Starting authentication...</p>';
            
            try {
                // Start authentication
                const response = await fetch('/auth/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: 'test-user-123' })
                });
                
                const data = await response.json();
                
                if (data.authUrl) {
                    // Redirect to authentication
                    window.location.href = data.authUrl;
                } else {
                    throw new Error(data.error || 'Failed to start authentication');
                }
            } catch (error) {
                resultDiv.innerHTML = `<div class="result error">❌ Error: ${error.message}</div>`;
            }
        }
        
        // Check if we're returning from authentication
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('token')) {
            document.getElementById('result').innerHTML = '<div class="result success">✅ Authentication successful! Check your server logs for details.</div>';
        }
    </script>
</body>
</html>
```

### Testing Steps

1. **Start your server** (Node.js or Python)
2. **Open the test page** in your browser
3. **Click "Start Authentication"**
4. **Follow the device verification process**
5. **Check the result** in your browser and server logs

## Step 5: Understanding the Flow

### What Happens During Authentication

```mermaid
sequenceDiagram
    participant U as User
    participant A as Your App
    participant R as Relock API
    participant D as Device

    U->>A: Click "Authenticate"
    A->>R: POST /auth/generate-url
    R->>A: Return auth URL
    A->>U: Redirect to auth URL
    U->>R: Complete device verification
    R->>D: Verify device trust
    D->>R: Return verification result
    R->>A: Redirect with token
    A->>R: POST /auth/verify-token
    R->>A: Return verification result
    A->>U: Show success/failure
```

### Key Concepts

- **Authentication URL**: A secure URL that handles device verification
- **Token**: A temporary credential proving successful authentication
- **Device Verification**: The process of confirming the user's device is trusted
- **Session**: A period of authenticated access for the user

## Common Issues and Solutions

### Issue: "Invalid API Key"
**Solution**: Double-check your API key in the `.env` file and ensure it starts with `relock_sk_`

### Issue: "Gateway Not Found"
**Solution**: Verify your Gateway UUID is correct and matches your dashboard

### Issue: "Authentication Timeout"
**Solution**: Increase the timeout in your request or check your network connection

### Issue: "Token Verification Failed"
**Solution**: Ensure you're using the token immediately after receiving it, as tokens expire quickly

## Next Steps

Now that you've made your first API call, you're ready to:

1. **Explore the full API** - Check out our [API Reference](./overview.md)
2. **Learn about different integration methods** - See our [Integration Guides](../guides/getting-started.md)
3. **Understand security best practices** - Read our [Security Guide](../security/best-practices.md)
4. **Build a production application** - Follow our [Production Deployment Guide](../deployment/security-hardening.md)

## Need Help?

- **Documentation**: Browse our comprehensive guides
- **Community**: Join our [Discord server](https://discord.gg/relock)
- **Support**: Email us at [support@relock.security](mailto:support@relock.security)

---

**🎉 Congratulations!** You've successfully integrated Relock authentication into your application. You're now ready to build secure, phishing-resistant applications with zero user friction.
