---
title: What is Relock?
description: Understanding Relock's continuous passive authentication approach
sidebar_label: What is Relock?
---

# What is Relock?

Relock is a software cryptographic authenticator that provides invisible,
continuous authentication for web applications. Unlike traditional authentication
systems that only verify identity at login, Relock continuously validates device
identity on every request, providing cryptographic proof that each interaction
originates from a trusted device.

## Core Concept

Relock replaces traditional bearer tokens and session cookies with fresh,
origin-bound **Signed One-Time Tokens (SOTTs)** that are cryptographically
verified on every request. This means that even if an attacker intercepts a
token, it cannot be reused because each token is single-use and bound to both
the specific device and the application origin.

The authentication process happens entirely in the background after initial setup,
requiring zero user interaction. Users don't see additional prompts or
challenges—Relock silently establishes and maintains secure cryptographic keys
between the browser and your application server.

## Key Capabilities

### Invisible Continuous Authentication

Relock operates silently in the background, continuously verifying device identity
without any visible user prompts. Once a device is enrolled, users experience a
seamless authentication flow that works automatically across their entire session.

### Cryptographic Device Proof

Every request includes fresh cryptographic proof that validates:
- The request originates from an enrolled, trusted device
- The cryptographic keys have not been compromised
- The device has maintained continuous authentication throughout the session

### Phishing and Session Hijacking Resistance

Relock's origin-bound, single-use tokens make it extremely difficult for
attackers to:
- Steal and replay authentication tokens across different origins
- Hijack sessions through cross-site attacks
- Intercept credentials through phishing attempts
- Use compromised tokens after they've been used once

### Zero-Trust Architecture Support

Relock enforces Zero Trust principles by verifying every request, not just the
initial login. This continuous verification means that even if an attacker gains
access to a user's credentials, they cannot use them from an untrusted device
without going through Relock's cryptographic verification process.

### Regulatory Compliance

Relock supports compliance with:
- **AAL2/AAL3** (Authentication Assurance Level 2 and 3) requirements
- **Strong Customer Authentication (SCA)** for financial services
- **Continuous Access Evaluation Protocol (CAEP)** for Zero Trust deployments

## What You Can Build With Relock

### Account Takeover Protection

Protect user accounts by continuously verifying that requests are coming from
trusted devices. Even if an attacker obtains valid credentials, they cannot
access accounts from devices that haven't been enrolled through Relock's
cryptographic verification.

### Enhanced Multi-Factor Authentication (MFA)

Use Relock as a strong cryptographic factor in your MFA implementation. Devices
that pass Relock verification can proceed with password-only authentication,
while new or untrusted devices require additional verification steps (such as
SMS codes or email confirmation).

### Secure "Remember Me" Functionality

Replace insecure "remember me" cookies with Relock's cryptographic device
verification. Users can enjoy persistent sessions on trusted devices without the
security risks associated with long-lived authentication tokens.

### Password Reset Security

Ensure that password reset requests only succeed from trusted devices, preventing
attackers from exploiting password reset flows even if they have access to a
user's email account.

### Adaptive Authentication

Dynamically adjust authentication requirements based on device trust status:
- **Trusted devices**: Allow password-only authentication for reduced friction
- **New devices**: Require additional verification factors for enhanced security
- **Suspicious activity**: Trigger additional security challenges

## How Relock Works

Relock establishes a secure cryptographic channel between each user's browser and
your application server. This channel uses:

- **Mutual Encryption**: Both the client and server participate in the
  cryptographic key exchange, ensuring bidirectional authentication
- **Key Rotation**: Cryptographic keys are automatically rotated to maintain
  security over time
- **Origin Binding**: Tokens are cryptographically bound to your application's
  origin, preventing cross-site attacks

The cryptographic keys are managed entirely within the browser using WebCrypto
APIs, meaning sensitive private keys never leave the user's device. The server
only receives public keys and signed tokens that can be verified but cannot be
used to impersonate the device.

## Integration Flexibility

Relock offers multiple integration approaches to fit different use cases and
infrastructure requirements:

- **Simple Integration**: Quick cloud-based redirects for rapid deployment
- **SameSite Integration**: Proxy-based solution for brand consistency
- **JavaScript Agent**: Full-featured integration for maximum security and
  seamless user experience

Each approach maintains the same security guarantees while offering different
levels of customization and infrastructure requirements.

## Getting Started

Relock integrates seamlessly with existing authentication systems—you don't need
to replace your current identity provider. Whether you're using Auth0, Okta,
Clerk, or any other IAM solution, Relock enhances your existing authentication
flow with continuous cryptographic verification.

Ready to get started? See our [Getting Started Guide](/docs/guides)
to choose the right integration approach for your application.