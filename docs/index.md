# Relock Documentation

Welcome to Relock's documentation. Learn how to integrate continuous, invisible authentication into your applications.

## What is Relock?

Relock provides **continuous cryptographic authentication** that works entirely in the background. Unlike traditional authentication methods, Relock:

- **Zero user friction** - Works invisibly after initial setup
- **Request-level security** - Every request is cryptographically verified
- **Phishing-resistant** - Protects against session hijacking and replay attacks
- **Easy integration** - Works with any authentication system

## Quick Start

Get up and running with Relock in minutes:

### 1. Choose Your Integration

**JavaScript Agent** (Recommended)
- Invisible, request-level authentication
- Works with any framework
- Zero user interaction required

**Next.js Integration**
- Complete example with Auth0
- Middleware-based protection
- TypeScript support

**Simple Integration**
- Quick setup for testing
- Redirect-based flow
- Minimal configuration

### 2. Set Up Your Gateway

1. Create a Relock account at [relock.host](https://relock.host)
2. Configure your domain and gateway settings
3. Get your gateway UUID and public key

### 3. Integrate with Your App

```javascript
// Include the Relock agent
<script src="/relock/relock.js" async></script>

// Listen for authentication events
window.addEventListener('X-Key-Established', async function (event) {
  const token = await window.relock.token();
  const signature = await window.relock.sign(token);
  
  // Use for API calls
  console.log('Authentication ready!');
});
```

## How It Works

Relock uses **cryptographic one-time tokens** (SOTTs) to provide continuous authentication:

1. **Device Enrollment** - Browser generates cryptographic keys
2. **Key Agreement** - Server and client establish shared secrets
3. **Token Generation** - Fresh tokens created for each request
4. **Verification** - Server validates tokens and signatures
5. **Key Rotation** - Keys rotate automatically for security

## Key Features

### Continuous Authentication
- Every request carries fresh cryptographic proof
- No reusable credentials for attackers
- Automatic key rotation

### Phishing Resistance
- Origin-bound tokens prevent replay attacks
- Session hijacking is immediately detected
- Works with any authentication system

### Zero UX Friction
- Invisible to users after initial setup
- No additional user gestures required
- Seamless integration with existing flows

### Enterprise Ready
- Supports regulatory compliance (PSD2, NIST, SOC 2)
- Works with existing identity providers
- Scales to millions of users

## Integration Methods

### JavaScript Agent
**Best for**: Production applications requiring invisible authentication

- Zero user friction
- Request-level verification
- Works with any framework
- Automatic key rotation

[Get Started with JavaScript Agent →](/docs/guides/js-agent-integration)

### Next.js Integration
**Best for**: Next.js applications with existing authentication

- Complete Auth0 integration example
- Middleware-based protection
- Real-time status monitoring
- TypeScript support

[Get Started with Next.js →](/docs/guides/nextjs-integration)

### Simple Integration
**Best for**: Quick setup and testing

- Minimal configuration
- Redirect-based flow
- Easy to implement
- Good for prototypes

[Get Started with Simple Integration →](/docs/guides/simple-integration)

## API Reference

Relock provides comprehensive APIs for different integration scenarios:

- **[JavaScript Agent API](/docs/api/js-agent-api)** - Client-side integration
- **[Gateway API](/docs/api/gateway-api)** - Server-side verification
- **[Webhook API](/docs/api/webhook-api)** - Event notifications
- **[SDKs](/docs/api/sdks)** - Language-specific libraries

## Security & Compliance

Relock is designed for enterprise security requirements:

- **NIST SP 800-63B** - AAL2/AAL3 compliance
- **PSD2/SCA** - Strong Customer Authentication
- **SOC 2** - Security and availability controls
- **PCI DSS** - Payment industry compliance
- **HIPAA** - Healthcare data protection

## Need Help?

- **Documentation** - Comprehensive guides and API reference
- **Examples** - Working code samples for popular frameworks
- **Support** - Contact us at [hi@relock.security](mailto:hi@relock.security)
- **Community** - Join our [LinkedIn](https://www.linkedin.com/company/relocksecurity) community

## Next Steps

1. **[Choose your integration method](/docs/guides)** - Select the best approach for your application
2. **[Set up your gateway](/docs/guides/js-agent-integration#step-1-reverse-proxy-setup)** - Configure your infrastructure
3. **[Integrate with your app](/docs/guides/js-agent-integration#step-2-include-the-javascript-agent)** - Add Relock to your application
4. **[Verify authentication](/docs/api/gateway-api)** - Implement server-side verification

Ready to get started? [Schedule a demo](https://www.relock.security/#contact) or dive into our [JavaScript Agent guide](/docs/guides/js-agent-integration).