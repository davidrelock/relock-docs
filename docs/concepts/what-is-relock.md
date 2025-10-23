---
title: What is Relock?
description: Understanding Relock's continuous passive authentication approach
sidebar_label: What is Relock?
---

# What is Relock?

Relock is an advanced software cryptographic authenticator that provides **continuous passive authentication** with zero user friction. It replaces traditional bearer authentication with per-request cryptographic proofs, delivering enterprise-grade security without compromising user experience.

## The Problem with Traditional Authentication

Traditional web authentication relies on **bearer credentials** - secrets that grant access to anyone who possesses them:

- **Passwords**: Whoever knows the password can sign in
- **Session cookies**: Whoever has the cookie can act as the user
- **Bearer tokens**: Whoever possesses the token gets access
- **OTP codes**: Whoever enters the code is authenticated

:::warning Bearer Authentication Risk
Once an attacker steals a bearer credential, they can fully bypass all login protections and impersonate the user.
:::

### Common Attack Vectors

- **Session hijacking**: Stolen cookies bypass MFA
- **Token replay**: Captured tokens used multiple times
- **Adversary-in-the-Middle (AiTM)**: Real-time credential interception
- **Credential stuffing**: Reused passwords across sites

## Relock's Solution: Continuous Cryptographic Trust

Relock shifts from **one-time login security** to **continuous request-level protection**:

### Core Principles

1. **Per-Request Validation**: Every request must prove device identity
2. **Cryptographic Proofs**: No reusable secrets, only one-time tokens
3. **Origin Binding**: Tokens are valid only from the enrolled browser
4. **Continuous Rotation**: Keys rotate automatically to prevent reuse

### How It Works

Instead of "whoever has the token can act as the user," Relock enforces "every request must prove the origin-bound, continuous cryptographic relationship."

## Key Benefits

### 🔒 Continuous Trust
- **Every request validated**: No single point of failure
- **Real-time compromise detection**: Immediate session termination
- **Session integrity**: Protection throughout the entire session

### 🛡️ Phishing Resistance
- **Cookie theft neutralized**: Stolen sessions are useless
- **Token replay prevention**: Each proof is single-use
- **AiTM protection**: Real-time interception is detected

### ⚡ Zero Friction
- **Invisible protection**: Users see no additional steps
- **No user gestures**: Protection runs in the background
- **Seamless experience**: Maintains existing UX patterns

### 🚀 Easy Deployment
- **Lightweight integration**: Minimal code changes required
- **Cloud-hosted**: No infrastructure to manage
- **Multiple options**: Choose your integration complexity

## Technical Architecture

### Relock Tesseract

The core of Relock's system is the **Tesseract** - a symmetric key wrapped in interdependent encryption:

- **Client-side encryption**: Secret encrypted with server-only key
- **Server-side encryption**: Secret encrypted with client-only key
- **Browser binding**: Additional fingerprint and randomization
- **Memory-only access**: Raw secrets never stored unencrypted

### Four-Axis Binding

Trust is bound along multiple dimensions:

1. **Device**: Browser sandbox and OS keychain
2. **Server**: Relock gateway authentication
3. **Origin**: Domain and protocol enforcement
4. **Time**: Automatic key rotation cadence

### Signed One-Time Tokens (SOTT)

Each request carries a fresh cryptographic proof:

- **Derived from Tesseract**: Unique per request
- **Origin-bound**: Valid only from enrolled browser
- **Single-use**: Cannot be replayed or reused
- **Cryptographically signed**: Tamper-proof verification

## Use Cases

### Financial Services
- **Online banking**: Prevent account takeover
- **Payment processing**: Secure transaction authentication
- **Investment platforms**: Protect sensitive financial data

### Healthcare
- **Patient portals**: Secure health record access
- **Telemedicine**: Protect virtual consultations
- **Clinical systems**: Secure medical data access

### Enterprise Applications
- **Corporate portals**: Protect business applications
- **CRM systems**: Secure customer data access
- **Admin panels**: Protect administrative functions

### E-commerce
- **Shopping carts**: Secure purchase flows
- **Account management**: Protect user profiles
- **Payment processing**: Secure checkout experiences

## Comparison with Alternatives

| Feature | Relock | Passkeys | Hardware Keys | SMS OTP |
|---------|---------|----------|---------------|---------|
| **Security Level** | Continuous | Login-only | Login-only | Login-only |
| **User Friction** | Zero | Low | Medium | High |
| **Deployment** | Easy | Complex | Complex | Easy |
| **Cost** | Low | Medium | High | Medium |
| **Maintenance** | Zero | High | High | Medium |

## Regulatory Compliance

Relock helps organizations meet demanding compliance requirements:

- **PSD2/SCA**: Dynamic linking of transactions
- **NIST AAL2/AAL3**: Strong authenticator assurance
- **SOC 2**: Access controls and monitoring
- **PCI DSS**: MFA and session management
- **HIPAA**: Electronic health data protection
- **GDPR**: State-of-the-art security controls

## Getting Started

Ready to implement Relock? Choose your integration path:

- **[Simple Integration](../getting-started/quickstart-cloud)**: Quick deployment with cloud redirects
- **[SameSite Integration](../getting-started/quickstart-samesite)**: Brand-consistent proxy deployment
- **[JavaScript Agent](../getting-started/quickstart-js-agent)**: Maximum security with zero friction

## Next Steps

- **Learn more** about [how Relock works](./how-it-works)
- **Understand** the [security model](./security-model)
- **Compare** with [alternative solutions](./comparison)
- **Start implementing** with our [quickstart guides](../getting-started/quickstart-overview)
