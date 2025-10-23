---
title: Next.js Examples
description: Complete Next.js applications demonstrating Relock integration with TypeScript, App Router, and modern authentication patterns
sidebar_label: Next.js Examples
---

# Next.js Examples

Complete, working Next.js applications that demonstrate different Relock integration patterns. Each example is production-ready and includes TypeScript, App Router, and modern authentication flows.

## 🚀 Available Examples

### [Middleware Integration](relock-nextjs-middleware)

**Production-Ready Authentication with Auth0 + Relock**

- **What it demonstrates**: Robust, production-ready authentication with server-side middleware
- **Key features**: Auth0 user management + Relock cryptographic security, real-time status monitoring, comprehensive error handling, HTTPS support
- **Best for**: Production applications requiring robust, secure authentication

### [Minimal Integration](relock-nextjs-minimal)

**Bare Minimum Implementation**

- **What it demonstrates**: Just the essential code needed to get Relock working
- **Key features**: Minimal dependencies, basic integration, simple setup
- **Best for**: Learning the basics or quick prototyping


## 🔧 Common Prerequisites

All Next.js examples require:

- **Node.js 20+** (LTS recommended)
- **Auth0 Account** - [Sign up for free](https://auth0.com)
- **Relock Account** - [Get started at relock.host](https://relock.host)

## 📦 Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/relock-security/relock-examples.git
   cd relock-examples/nextjs/[example-name]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

4. **Run the example**
   ```bash
   npm run dev
   ```

## 🔑 Environment Variables

Each example requires these environment variables:

```env
# Auth0 Configuration
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-client-id
AUTH0_CLIENT_SECRET=your-client-secret
AUTH0_SECRET=your-32-character-secret

# Application Configuration
APP_BASE_URL=http://localhost:3000

# Relock Configuration
RELOCK_GATEWAY_UUID=your-gateway-uuid
```

## 🎯 Choose Your Example

| Example | Complexity | Use Case | Auth0 | Middleware |
|---------|------------|----------|-------|------------|
| **Minimal** | Low | Learning basics, quick prototyping | ✅ | ❌ |
| **Middleware** | High | Production applications | ✅ | ✅ |

## 📚 Related Documentation

- [Next.js Integration Guide](../integration/nextjs-integration) - Detailed integration patterns
- [JavaScript Agent API](../api/js-agent-api) - Technical reference
- [Security Best Practices](../security/best-practices) - Production security
- [Deployment Guide](../deployment/prerequisites) - Deploy to production
