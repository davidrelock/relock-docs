---
title: Minimal Integration Example
description: Simple, clean Next.js application demonstrating basic Relock integration without over-engineering
sidebar_label: Minimal Integration
---

# ![Relock Next.js Minimal Integration](https://github.com/relock-security/relock-examples/raw/main/nextjs/relock-nextjs-minimal/relock-nextjs-middleware-header.png)

A minimal Next.js application demonstrating how to integrate [Relock](https://relock.host) cryptographic authentication with Auth0 in a clean, simple implementation.

## 🔐 What This Example Demonstrates

- **Bare Minimum Integration**: Just the essential code needed to get Relock working
- **Simple Authentication**: Basic Auth0 + Relock integration without complexity
- **Essential Features**: Core functionality without advanced features
- **Quick Setup**: Minimal dependencies and configuration
- **Learning Focus**: Perfect for understanding the basics

## 🚀 Quick Start

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **Auth0 Account** - [Sign up for free](https://auth0.com)
- **Relock Account** - [Get started at relock.host](https://relock.host)

### 1. Clone and Install

```properties
git clone https://github.com/relock-security/relock-examples.git
cd relock-examples/nextjs/relock-nextjs-minimal
npm install
```

### 2. Environment Setup

Create a `.env.local` file with the following variables:

```properties
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

### 3. Generate Required Secrets

```bash
# Generate AUTH0_SECRET (32 characters)
openssl rand -hex 32
```

### 4. Auth0 Application Setup

1. **Create Auth0 Application**:
   - Go to [Auth0 Dashboard](https://manage.auth0.com)
   - Create a new **Regular Web Application**
   - Note down your `Domain`, `Client ID`, and `Client Secret`

2. **Configure URLs**:
   - **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application in action!

![Relock Next.js Auth0 Status](https://github.com/relock-security/relock-examples/raw/main/nextjs/relock-nextjs-minimal/relock-status.png)

## 🔒 HTTPS Development Setup

For local HTTPS development, the example includes experimental Next.js HTTPS configuration:

### 1. Generate Self-Signed Certificates

```bash
# Create certs directory
mkdir certs
cd certs

# Create and Install a new Local CA
mkcert -install

# Generate certificate
mkcert relock.dev
```

### 2. Update Environment Variables

```env
APP_BASE_URL=https://relock.dev:3000
```

### 3. Run with HTTPS

```bash
npm run dev
# Visit https://relock.dev:3000
```

## 🏗️ Architecture

This minimal example demonstrates:

- **Next.js App Router** with TypeScript
- **Auth0 Next.js SDK** for user authentication
- **Relock JavaScript Agent** for cryptographic verification
- **Simple React Components** for UI
- **Tailwind CSS** for styling

## 📁 Key Files

- `src/components/RelockIntegration.tsx` - Main Relock integration component
- `src/components/RelockEventCard.tsx` - Event display component
- `src/lib/auth0.ts` - Auth0 configuration
- `src/lib/relock.ts` - Relock utility functions
- `src/middleware.ts` - Basic middleware setup

## 🎯 Perfect For

- **Learning Relock integration** - Simple, easy to understand
- **Quick prototyping** - Get up and running fast
- **Simple applications** - Minimal complexity
- **Understanding basics** - Core concepts without complexity

## 🔗 GitHub Repository

**Source Code**: [relock-security/relock-examples/nextjs/relock-nextjs-minimal](https://github.com/relock-security/relock-examples/tree/main/nextjs/relock-nextjs-minimal)

## 📚 Related Documentation

- [Simple Integration Guide](../integration/simple-integration) - Basic integration patterns
- [JavaScript Agent API](../api/js-agent-api) - Relock JavaScript Agent reference
- [Next.js Integration Guide](../integration/nextjs-integration) - Advanced Next.js patterns
- [Getting Started](../getting-started/quickstart-js-agent) - Learn the basics
