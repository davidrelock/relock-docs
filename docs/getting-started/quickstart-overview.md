---
title: Quick Start Overview
description: Choose the right Relock integration path for your application
sidebar_label: Quick Start Overview
---

# Quick Start Overview

Relock offers three integration approaches, each designed for different use cases and security requirements. Choose the path that best fits your application architecture and user experience goals.

## Integration Options Comparison

| Feature | Simple Integration | SameSite Integration | JavaScript Agent |
|---------|-------------------|---------------------|------------------|
| **Complexity** | Low | Medium | High |
| **User Experience** | Spinner/loader visible | Spinner/loader on your domain | Completely invisible |
| **Security Level** | Login-level | Login-level | Request-level |
| **Code Changes** | Minimal | Minimal | Moderate |
| **Best For** | OTP-heavy flows, quick wins | Brand consistency, user trust | Maximum security, zero friction |

## 🚀 Simple Integration (Cloud Redirect)

**Perfect for**: OTP-heavy login flows, quick deployment, minimal code changes

The simplest way to integrate Relock. Users are redirected to the Relock cloud domain for device verification, then returned to your application.

**Pros:**
- Fastest to implement
- No reverse proxy required
- Minimal code changes

**Cons:**
- Users see external domain
- Limited user context
- Basic security features

[Get Started →](./quickstart-cloud)

## 🌐 SameSite Integration (Proxy)

**Perfect for**: Brand consistency, user trust, enhanced security features

Deploy Relock under your own domain using a reverse proxy. Users never leave your domain during verification.

**Pros:**
- Maintains brand experience
- First-party cookies
- Enhanced user context
- Better security features

**Cons:**
- Requires reverse proxy setup
- More complex configuration

[Get Started →](./quickstart-samesite)

## 🔧 JavaScript Agent Integration

**Perfect for**: Maximum security, zero user friction, continuous protection

Fully invisible integration that provides request-level verification. The JavaScript agent runs silently in the background.

**Pros:**
- Completely invisible to users
- Maximum security (per-request validation)
- Continuous protection throughout session
- Advanced security features

**Cons:**
- Requires JavaScript integration
- More complex implementation
- CSP considerations

[Get Started →](./quickstart-js-agent)

## Decision Matrix

Use this matrix to choose the right integration approach:

### Choose **Simple Integration** if:
- You want to deploy quickly
- Your users are comfortable with external verification
- You have OTP-heavy authentication flows
- Minimal code changes are required

### Choose **SameSite Integration** if:
- Brand consistency is important
- You want to maintain user trust
- You need enhanced security features
- You can configure a reverse proxy

### Choose **JavaScript Agent** if:
- Zero user friction is critical
- Maximum security is required
- You need continuous protection
- You can implement JavaScript integration

## Next Steps

1. **Review the detailed guide** for your chosen integration method
2. **Set up your Relock account** at [relock.host](https://relock.host)
3. **Configure your gateway** in the Admin Panel
4. **Implement the integration** following the step-by-step guide
5. **Test and deploy** with our troubleshooting resources

## Need Help Choosing?

If you're unsure which integration approach is right for your application, consider:

- **Security requirements**: Higher security needs favor JavaScript Agent
- **User experience goals**: Zero friction favors JavaScript Agent
- **Implementation timeline**: Quick deployment favors Simple Integration
- **Infrastructure capabilities**: Reverse proxy availability affects SameSite choice

[Contact our team](mailto:hi@relock.security?subject=Integration%20Guidance) for personalized recommendations based on your specific use case.
