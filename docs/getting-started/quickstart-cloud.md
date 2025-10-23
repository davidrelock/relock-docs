---
title: Simple Integration Quickstart
description: Get started with Relock Simple Integration in minutes
sidebar_label: Simple Integration
---

# Simple Integration Quickstart

Get Relock Simple Integration up and running in minutes with this step-by-step guide.

## Quick Concept Summary

Simple Integration redirects users to the Relock cloud domain for device verification, then returns them to your application with enhanced security. This approach provides:

- **Maximum Security**: Complete isolation from authentication logic
- **Compliance Ready**: Meets enterprise security requirements  
- **Rapid Deployment**: Minimal setup and configuration
- **Maintenance Free**: No authentication code to maintain

**For detailed architecture and security model, see [Simple Integration Reference](../integration/simple-integration.md)**

## Prerequisites

- A web application with HTTPS enabled
- Access to your domain's DNS settings
- Basic understanding of web development
- Relock gateway UUID (provided during setup)

## Step 1: Set Up Your Gateway

### 1.1 Create Gateway

1. Visit [relock.host](https://relock.host)
2. Click "Create Gateway"
3. Enter your domain (e.g., `example.com`)
4. Choose "Simple Integration" as your pattern
5. Copy your gateway UUID

### 1.2 Configure Return Routes

Set up where users return after authentication:

- **Trusted Device Route**: `https://example.com/password_only`
- **New Device Route**: `https://example.com/send_sms_otp`

## Step 2: Implement Authentication Flow

### 2.1 Redirect to Relock

```javascript
function handleSignInClick() {
  const randomUUID = generateUUID();
  const relockUrl = `https://example.relock.host/${randomUUID}`;
  
  sessionStorage.setItem('relock_transaction', randomUUID);
  window.location.href = relockUrl;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

### 2.2 Handle Response

```javascript
function handleRelockResponse(request) {
  const transaction = request.form.get('X-Key-Transaction');
  const signature = request.form.get('X-Key-Transaction-Signature');
  
  if (verifyRelockSignature(transaction, signature)) {
    if (isTrustedDevice(request)) {
      redirectToPasswordOnly();
    } else {
      redirectToMFAFlow();
    }
  } else {
    handleVerificationError();
  }
}
```

### 2.3 Signature Verification

```python
import base64
import binascii
from nacl.signing import VerifyKey

def verify_relock_response(request):
    transaction = request.form.get('X-Key-Transaction', '')
    signature_hex = request.form.get('X-Key-Transaction-Signature', '')
    
    public_key_b64 = "9BvLN49xYMLfUnVLi4ncvdIQHrhEo6/A15EaPHas2B4="
    
    try:
        transaction_bytes = binascii.unhexlify(transaction)
        signature_bytes = binascii.unhexlify(signature_hex)
        public_key_bytes = base64.b64decode(public_key_b64)
        
        verify_key = VerifyKey(public_key_bytes)
        verify_key.verify(transaction_bytes, signature_bytes)
        
        return True
    except Exception as e:
        print(f"Signature verification failed: {e}")
        return False
```

## Step 3: Configure Your Application

### 3.1 Environment Variables

```bash
# .env
RELOCK_GATEWAY_UUID=your-gateway-uuid-here
RELOCK_PUBLIC_KEY=9BvLN49xYMLfUnVLi4ncvdIQHrhEo6/A15EaPHas2B4=
```

### 3.2 Security Headers

```javascript
// Add these headers to your responses
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
```

## Step 4: Test Your Integration

### 4.1 Test Flow

1. Navigate to your application
2. Click the sign-in button
3. Verify redirect to `example.relock.host`
4. Complete device verification
5. Verify return to your application
6. Check signature validation

### 4.2 Debug Mode

Enable debug logging:

```javascript
// Add to your page for debugging
console.log('Relock transaction:', sessionStorage.getItem('relock_transaction'));
console.log('Relock response:', document.forms[0]?.elements);
```

## Step 5: Production Deployment

### 5.1 Security Checklist

- [ ] HTTPS enabled on all pages
- [ ] Signature verification implemented
- [ ] Security headers configured
- [ ] Error handling implemented
- [ ] Audit logging enabled
- [ ] Rate limiting configured

### 5.2 Monitoring

Set up monitoring for:
- Authentication success/failure rates
- Response times
- Error rates
- Security events

## Troubleshooting

### Common Issues

**Redirect not working**
- Verify HTTPS is enabled
- Check gateway configuration
- Ensure domain matches exactly

**Signature verification fails**
- Verify public key is correct
- Check transaction ID format
- Ensure proper encoding

**User not returning**
- Verify return routes are configured
- Check for JavaScript errors
- Ensure proper form handling

### Getting Help

- **Documentation**: [Simple Integration Reference](../integration/simple-integration.md)
- **Architecture**: [How Relock Works](../concepts/how-it-works)
- **Security**: [Security Model](../concepts/security-model)
- **Support**: [Contact Relock Support](https://relock.host/support)

## Next Steps

Once your Simple Integration is working:

- **Enhance Security**: Add rate limiting and monitoring
- **Improve UX**: Customize error messages and flows
- **Scale Up**: Add multiple gateways for high availability
- **Advanced Features**: Implement user management and roles

## Security Best Practices

- Always verify Relock's response signature
- Use HTTPS for all communications
- Validate transaction ID matches what you sent
- Handle errors gracefully without exposing sensitive information
- Implement proper session management
- Monitor for suspicious activity

---

**Need help?** See the [Simple Integration Reference](../integration/simple-integration.md) for detailed architecture and security information.
