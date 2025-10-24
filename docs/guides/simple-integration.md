---
title: Simple Integration
description: Deploy Relock with simple cloud redirects for quick security wins with minimal infrastructure
sidebar_label: Simple Integration
---

# Simple Integration

Simple Integration is the fastest way to add Relock's invisible authentication to your application. It uses cloud redirects to verify device identity without requiring any infrastructure changes or complex proxy configurations.

## Overview

Simple Integration provides:

- **Zero infrastructure**: No reverse proxy or additional servers required
- **Maximum security**: Complete isolation from authentication logic
- **Compliance ready**: Meets enterprise security requirements
- **Maintenance free**: No authentication code to maintain
- **Quick deployment**: Get up and running in minutes

## When to Use Simple Integration

Simple Integration is ideal for:

- **Rapid deployment** when you need security quickly
- **OTP-heavy sign-in flows** that rely on SMS codes (especially vulnerable to phishing)
- **Legacy systems** where minimal code changes are required
- **High-security applications** where maximum security isolation is desired
- **MVP applications** where you need quick security wins

## Prerequisites

Before you begin, ensure you have:

- Relock account and access to the Relock Admin Panel
- Administrative access to your web application
- Valid SSL/TLS certificate configured on your domain

## Step 1: Create Cloud Gateway

1. Sign up for your account at [relock.host](https://relock.host)
2. Navigate to **Your Gateways** in the dashboard
3. Click **Add new domain** and enter your domain name (e.g., `example.com`)
4. Configure your Relock Cloud subdomain (Wildcard ID): `example.relock.host`
5. Click on your domain in the active gateway list
6. Navigate to **Access Keys** to get your unique Gateway UUID and public key

## Step 2: Configure Return Routes

In the Relock Admin Panel, configure return routes (URLs) for completed verification in the Core settings tab:

- **Known/Trusted** device → `https://example.com/password_only`
- **New/Fresh** device → `https://example.com/send_sms_otp`

These routes determine where users are redirected after device verification:

- **Trusted Device**: User proceeds directly to password entry, accompanied by a one-time token and cryptographic signature proving the device is trusted
- **Fresh Device**: A fresh credential is enrolled, and the authentication flow continues with an additional factor (e.g., password + OTP or email confirmation)

## Step 3: Implement Redirect Flow

When a user triggers a sign-in action (clicks the sign-in button), redirect the user to the authentication gateway:

```javascript
// Generate a random UUID for this authentication attempt
const randomUUID = crypto.randomUUID(); // or generate your own UUID

// Redirect to the Relock cloud gateway
window.location.href = `https://example.relock.host/${randomUUID}`;
```

### Authentication Flow

1. **Sign-in Triggered**: The user is redirected to the third-party cloud authentication gateway hosted at `example.relock.host`
2. **Spinner/Loading Page**: Cryptographic keys are verified and rotated in the background
3. **Redirect Back**: Based on the verification result, the user is redirected to one of your configured routes

## Step 4: Handle Response

The redirect back to your application will be sent as a **POST** request containing a cryptographically signed Random_UUID, along with additional information about the device.

### Response Verification

Always verify Relock's response signature using Ed25519 with the public key generated in the Admin Panel. This ensures that every response truly originates from Relock and has not been tampered with in transit.

**Node.js Express Example:**

```javascript
const express = require('express');
const crypto = require('crypto');
const { createVerify } = require('crypto');

const app = express();
app.use(express.urlencoded({ extended: true }));

function verifyRelockResponse(req) {
  const transaction = req.body['X-Key-Transaction'];
  const signature = req.body['X-Key-Transaction-Signature'];
  
  // Get public key from Relock Admin panel
  const publicKeyB64 = "9BvLN49xYMLfUnVLi4ncvdIQHrhEo6/A15EaPHas2B4=";
  const publicKey = Buffer.from(publicKeyB64, 'base64');
  
  try {
    const verify = createVerify('ed25519');
    verify.update(Buffer.from(transaction, 'hex'));
    
    return verify.verify(publicKey, Buffer.from(signature, 'hex'));
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

app.post('/password_only', (req, res) => {
  if (verifyRelockResponse(req)) {
    // Device is trusted, proceed with password-only flow
    res.render('password_form');
  } else {
    res.status(400).json({ error: 'Authentication failed' });
  }
});

app.post('/send_sms_otp', (req, res) => {
  if (verifyRelockResponse(req)) {
    // Device is new, proceed with SMS OTP flow
    res.render('sms_otp_form');
  } else {
    res.status(400).json({ error: 'Authentication failed' });
  }
});
```

## Best Practices

### Signature Verification

1. **Verify exact bytes**: The signed content must match byte-for-byte. If Relock signs a canonical payload (e.g., UTF-8 JSON or a UUID string), verify that exact representation (same encoding, no whitespace changes).

2. **Verify key sizes**: Ed25519 uses a 32-byte public key and 64-byte signature. Reject keys/signatures with unexpected lengths.

3. **Handle errors gracefully**: Always implement proper error handling for signature verification failures.

### Security Considerations

1. **Store public keys securely**: Keep your Ed25519 public key secure and rotate it if compromised
2. **Log security events**: Monitor for signature verification failures
3. **Use HTTPS**: Ensure all communication is encrypted
4. **Validate origins**: Check that requests come from expected sources

## Limitations

Simple Integration has some limitations compared to other deployment methods:

- **Cannot track user sign-in/sign-out**: No ability to notify Relock Cloud about sign-in success or sign-out events
- **Third-party authentication only**: Functions as third-party authentication without user context
- **Limited customization**: Less control over the authentication flow
- **User experience**: Users see a redirect to the Relock domain

## Use Case Example

For OTP-heavy login flows, you may want Relock verification to trigger when the user clicks "Sign In," before password entry. Based on Relock's response, you could redirect the user either to a password-only flow or to a password + OTP flow.

```javascript
// Example login flow
function handleSignIn() {
  // Generate UUID for this authentication attempt
  const authUUID = generateUUID();
  
  // Redirect to Relock for device verification
  window.location.href = `https://example.relock.host/${authUUID}`;
}

// Your application handles the POST response from Relock
// and routes users based on device trust status
```

## Troubleshooting

### Common Issues

**Redirects not working:**
- Verify your domain is properly configured in the Relock Admin Panel
- Check that return routes are set correctly
- Ensure HTTPS is enabled

**Signature verification fails:**
- Verify the public key is correct and matches the one in your Admin Panel
- Check that the transaction and signature are properly encoded
- Ensure no whitespace or encoding issues in the data

**Device always treated as new:**
- Check that return routes match exactly (including domain and protocol)
- Verify the domain configuration in the Admin Panel
- Ensure the UUID is properly generated and passed

## Next Steps

Once you have Simple Integration working, you can:

1. **[Upgrade to SameSite Integration](/docs/guides/samesite-integration)** - For brand consistency and user management
2. **[Implement JavaScript Agent](/docs/guides/js-agent-integration)** - For maximum security and seamless UX

## Getting Help

- **Examples**: See working implementations in our [examples](/docs/examples/nextjs/middleware)
- **Support**: Contact us at [hi@relock.security](mailto:hi@relock.security)