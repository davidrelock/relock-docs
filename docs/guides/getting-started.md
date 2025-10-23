---
title: Getting Started
description: Get up and running with Relock in minutes
sidebar_label: Getting Started
---

# Getting Started with Relock

Welcome to Relock! This guide will help you choose the right integration approach and get started quickly.

## Choose Your Integration Path

Relock offers three integration approaches, each designed for different use cases and security requirements:

### 🚀 Simple Integration (Cloud Redirect)
**Perfect for**: Quick deployment, minimal code changes, OTP-heavy flows

- **Implementation time**: 30 minutes
- **User experience**: Redirect to Relock cloud domain
- **Security level**: Login-level protection
- **Best for**: MVP applications, quick security wins

[Get Started with Simple Integration →](./simple-integration)

### 🌐 SameSite Integration (Proxy)
**Perfect for**: Brand consistency, enhanced security, existing proxy infrastructure

- **Implementation time**: 2-4 hours
- **User experience**: Seamless on your domain
- **Security level**: Enhanced with proxy security
- **Best for**: Brand-conscious applications, enterprise deployments

[Get Started with SameSite Integration →](./samesite-integration)

### 🔧 JavaScript Agent Integration
**Perfect for**: Maximum security, zero user friction, continuous protection

- **Implementation time**: 1-2 days
- **User experience**: Completely invisible
- **Security level**: Request-level verification
- **Best for**: High-security applications, seamless UX requirements

[Get Started with JavaScript Agent →](./js-agent-integration)

## Quick Decision Matrix

| Need | Recommended Path | Why |
|------|------------------|-----|
| **Deploy today** | Simple Integration | Fastest to implement |
| **Brand consistency** | SameSite Integration | Users never leave your domain |
| **Maximum security** | JavaScript Agent | Continuous verification |
| **Minimal changes** | Simple Integration | No infrastructure required |
| **Enterprise compliance** | SameSite or JavaScript Agent | Enhanced security features |

## What You'll Need

### Required
- Relock account ([Sign up here](https://relock.host))
- Your application's backend/frontend code
- Basic understanding of your authentication flow

### Optional (depending on integration)
- Reverse proxy setup (SameSite/JavaScript Agent)
- JavaScript development environment (JavaScript Agent)
- SSL certificates (production deployments)

## Next Steps

1. **Choose your integration path** based on your requirements
2. **Follow the specific guide** for your chosen approach
3. **Test your integration** with our troubleshooting resources
4. **Deploy to production** with confidence

## Need Help Choosing?

Still unsure which path to take? Consider these questions:

- **How quickly do you need to deploy?**
- **How important is user experience?**
- **What's your security expertise level?**
- **What infrastructure do you have available?**

[Contact our team](mailto:hi@relock.security?subject=Integration%20Guidance) for personalized recommendations based on your specific use case.

## Additional Resources

- [How Relock Works](../concepts/how-it-works.md) - Understand the underlying technology
- [Security Model](../concepts/security-model.md) - Learn about our security approach
- [API Reference](../api/overview.md) - Technical implementation details
- [Examples](../examples/) - Code examples for different platforms
