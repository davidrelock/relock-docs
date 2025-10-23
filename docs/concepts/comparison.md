---
title: Comparison with Alternatives
description: How Relock compares to passkeys, hardware keys, SMS OTP, and other authentication methods
sidebar_label: Comparison
---

# Comparison with Alternatives

Relock represents a fundamentally different approach to authentication compared to traditional methods. This page provides detailed comparisons with popular alternatives to help you understand when Relock is the right choice.

## Authentication Methods Overview

### Traditional Methods
- **Passwords**: Something you know
- **SMS OTP**: Something you have (phone)
- **TOTP**: Something you have (authenticator app)
- **Push Notifications**: Something you have (mobile device)

### Modern Methods
- **Passkeys**: Platform-based biometric authentication
- **Hardware Keys**: Physical security tokens
- **Relock**: Continuous cryptographic trust

## Detailed Comparisons

### Relock vs. Passkeys

| Aspect | Relock | Passkeys |
|--------|---------|----------|
| **Security Model** | Continuous per-request validation | One-time login verification |
| **User Experience** | Completely invisible | Biometric prompt on login |
| **Deployment** | Web-based, no platform changes | Platform-specific implementation |
| **Session Security** | Continuous protection | Login-only protection |
| **Phishing Resistance** | Built-in origin binding | Platform-level protection |
| **Cross-Platform** | Works on all browsers | Limited to platform ecosystem |

#### When to Choose Relock Over Passkeys

- **Web-first applications** that need cross-platform compatibility
- **Continuous security** requirements throughout the session
- **Zero user friction** is critical
- **Session hijacking** is a primary concern

#### When to Choose Passkeys Over Relock

- **Platform-specific applications** with native integration
- **Login-only security** is sufficient
- **Biometric authentication** is preferred
- **Platform ecosystem** lock-in is acceptable

### Relock vs. Hardware Keys

| Aspect | Relock | Hardware Keys |
|--------|---------|---------------|
| **Security Model** | Continuous per-request validation | One-time login verification |
| **User Experience** | Completely invisible | Physical touch required |
| **Deployment** | Software-only, no hardware | Hardware distribution required |
| **Session Security** | Continuous protection | Login-only protection |
| **Cost** | Low (cloud service) | High (per-user hardware) |
| **Management** | Zero maintenance | Hardware lifecycle management |

#### When to Choose Relock Over Hardware Keys

- **Large user bases** where hardware costs are prohibitive
- **Web applications** that need seamless integration
- **Continuous security** throughout the session
- **Zero user friction** requirements

#### When to Choose Hardware Keys Over Relock

- **High-security environments** requiring physical possession
- **Offline authentication** requirements
- **Regulatory mandates** for hardware tokens
- **Small user bases** where hardware management is feasible

### Relock vs. SMS OTP

| Aspect | Relock | SMS OTP |
|--------|---------|---------|
| **Security Model** | Continuous cryptographic validation | One-time code verification |
| **User Experience** | Completely invisible | Code entry required |
| **Phishing Resistance** | Built-in origin binding | Vulnerable to AiTM attacks |
| **Cost** | Predictable per-user pricing | Per-SMS costs |
| **Reliability** | Internet-dependent | SMS delivery dependent |
| **International** | Global availability | Carrier-dependent |

#### When to Choose Relock Over SMS OTP

- **Phishing resistance** is critical
- **User experience** is a priority
- **Cost predictability** is important
- **Global deployment** is required

#### When to Choose SMS OTP Over Relock

- **Offline authentication** requirements
- **Legacy system** compatibility
- **Regulatory compliance** mandates SMS
- **Simple integration** is needed

### Relock vs. TOTP (Authenticator Apps)

| Aspect | Relock | TOTP |
|--------|---------|------|
| **Security Model** | Continuous per-request validation | One-time code verification |
| **User Experience** | Completely invisible | Code entry required |
| **Phishing Resistance** | Built-in origin binding | Vulnerable to AiTM attacks |
| **Deployment** | Web-based integration | App installation required |
| **Session Security** | Continuous protection | Login-only protection |
| **Maintenance** | Zero user maintenance | App updates required |

#### When to Choose Relock Over TOTP

- **Continuous security** throughout the session
- **Zero user friction** requirements
- **Phishing resistance** is critical
- **Web-first applications**

#### When to Choose TOTP Over Relock

- **Offline authentication** requirements
- **Simple integration** is needed
- **User control** over authentication app
- **Cost-sensitive** deployments

## Security Comparison

### Attack Vector Analysis

| Attack Vector | Relock | Passkeys | Hardware Keys | SMS OTP | TOTP |
|---------------|---------|----------|---------------|---------|------|
| **Session Hijacking** | ✅ Protected | ❌ Vulnerable | ❌ Vulnerable | ❌ Vulnerable | ❌ Vulnerable |
| **Token Replay** | ✅ Protected | ❌ Vulnerable | ❌ Vulnerable | ❌ Vulnerable | ❌ Vulnerable |
| **Man-in-the-Middle** | ✅ Protected | ✅ Protected | ✅ Protected | ❌ Vulnerable | ❌ Vulnerable |
| **Phishing** | ✅ Protected | ✅ Protected | ✅ Protected | ❌ Vulnerable | ❌ Vulnerable |
| **Device Theft** | ⚠️ Limited | ⚠️ Limited | ✅ Protected | ❌ Vulnerable | ❌ Vulnerable |
| **Malware** | ⚠️ Limited | ⚠️ Limited | ⚠️ Limited | ❌ Vulnerable | ❌ Vulnerable |

### Security Level Comparison

#### High Security (AAL3)
- **Relock**: ✅ Full support with continuous validation
- **Hardware Keys**: ✅ Full support with physical possession
- **Passkeys**: ⚠️ Partial support (login only)
- **TOTP**: ⚠️ Partial support (login only)
- **SMS OTP**: ❌ Limited support

#### Medium Security (AAL2)
- **Relock**: ✅ Full support
- **Hardware Keys**: ✅ Full support
- **Passkeys**: ✅ Full support
- **TOTP**: ✅ Full support
- **SMS OTP**: ⚠️ Partial support

## Cost Comparison

### Implementation Costs

| Method | Development | Infrastructure | Per-User | Maintenance |
|--------|-------------|----------------|----------|-------------|
| **Relock** | Low | Low (cloud) | Low | Zero |
| **Passkeys** | High | Medium | Zero | Low |
| **Hardware Keys** | Medium | Low | High | High |
| **SMS OTP** | Low | Low | Medium | Low |
| **TOTP** | Low | Low | Zero | Low |

### Total Cost of Ownership

#### Small Organization (100 users)
- **Relock**: $500-1,000/year
- **Passkeys**: $2,000-5,000/year
- **Hardware Keys**: $5,000-10,000/year
- **SMS OTP**: $1,000-2,000/year
- **TOTP**: $500-1,000/year

#### Large Organization (10,000 users)
- **Relock**: $10,000-20,000/year
- **Passkeys**: $50,000-100,000/year
- **Hardware Keys**: $200,000-500,000/year
- **SMS OTP**: $50,000-100,000/year
- **TOTP**: $10,000-20,000/year

## User Experience Comparison

### Friction Analysis

| Method | Setup Friction | Login Friction | Session Friction | Overall UX |
|--------|----------------|----------------|------------------|------------|
| **Relock** | Low | Zero | Zero | ⭐⭐⭐⭐⭐ |
| **Passkeys** | Medium | Low | Zero | ⭐⭐⭐⭐ |
| **Hardware Keys** | High | Medium | Zero | ⭐⭐⭐ |
| **SMS OTP** | Low | High | Zero | ⭐⭐ |
| **TOTP** | Medium | High | Zero | ⭐⭐ |

### Adoption Considerations

#### User Adoption
- **Relock**: High (invisible to users)
- **Passkeys**: Medium (platform-dependent)
- **Hardware Keys**: Low (physical burden)
- **SMS OTP**: High (familiar)
- **TOTP**: Medium (app installation)

#### Training Requirements
- **Relock**: None (automatic)
- **Passkeys**: Minimal (biometric setup)
- **Hardware Keys**: High (physical training)
- **SMS OTP**: None (familiar)
- **TOTP**: Medium (app usage)

## Deployment Considerations

### Integration Complexity

| Method | Frontend | Backend | Infrastructure | Testing |
|---------|----------|---------|----------------|---------|
| **Relock** | Low | Medium | Low | Medium |
| **Passkeys** | High | High | Medium | High |
| **Hardware Keys** | Medium | Medium | Low | Medium |
| **SMS OTP** | Low | Low | Low | Low |
| **TOTP** | Low | Low | Low | Low |

### Maintenance Requirements

| Method | Updates | Monitoring | User Support | Compliance |
|---------|---------|------------|--------------|------------|
| **Relock** | Zero | Low | Low | Low |
| **Passkeys** | Medium | Medium | Medium | Medium |
| **Hardware Keys** | High | High | High | High |
| **SMS OTP** | Low | Medium | Medium | Medium |
| **TOTP** | Low | Low | Low | Low |

## Regulatory Compliance

### Framework Support

| Framework | Relock | Passkeys | Hardware Keys | SMS OTP | TOTP |
|-----------|---------|----------|---------------|---------|------|
| **PSD2/SCA** | ✅ Full | ⚠️ Partial | ⚠️ Partial | ❌ Limited | ⚠️ Partial |
| **NIST AAL3** | ✅ Full | ⚠️ Partial | ✅ Full | ❌ Limited | ⚠️ Partial |
| **SOC 2** | ✅ Full | ✅ Full | ✅ Full | ⚠️ Partial | ✅ Full |
| **PCI DSS** | ✅ Full | ✅ Full | ✅ Full | ⚠️ Partial | ✅ Full |
| **HIPAA** | ✅ Full | ✅ Full | ✅ Full | ⚠️ Partial | ✅ Full |

## Decision Matrix

### Choose Relock When:

- **Continuous security** throughout the session is required
- **Zero user friction** is critical
- **Phishing resistance** is a priority
- **Web-first applications** need cross-platform compatibility
- **Cost-effective** enterprise deployment is needed

### Choose Alternatives When:

- **Platform-specific** applications with native integration
- **Physical possession** requirements exist
- **Offline authentication** is needed
- **Simple integration** is the priority
- **Regulatory mandates** require specific methods

## Hybrid Approaches

### Combining Methods

Relock can be combined with other methods for enhanced security:

#### Relock + Passkeys
- **Login**: Passkey for initial authentication
- **Session**: Relock for continuous protection
- **Benefits**: Strong login + continuous session security

#### Relock + Hardware Keys
- **Login**: Hardware key for initial authentication
- **Session**: Relock for continuous protection
- **Benefits**: Physical possession + continuous validation

#### Relock + TOTP
- **Login**: TOTP for additional verification
- **Session**: Relock for continuous protection
- **Benefits**: Familiar method + advanced session security

## Next Steps

- **Understand** [how Relock works](./how-it-works)
- **Learn** about the [security model](./security-model)
- **Explore** [integration options](../integration/integration-overview)
- **Start implementing** with our [quickstart guides](../getting-started/quickstart-overview)
