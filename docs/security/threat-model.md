---
title: Threat Model
description: Understanding Relock's security assumptions and attack vectors
sidebar_label: Threat Model
---

# Threat Model

This page outlines Relock's security assumptions, threat model, and risk analysis. Understanding these security boundaries helps you make informed decisions about deployment and integration.

## Security Assumptions

### Trusted Components

Relock assumes the following components are trustworthy:

- **Relock Infrastructure**: The Relock service and its cryptographic operations
- **TLS/HTTPS**: Transport layer security between client and server
- **Browser Security**: Modern browser security features and sandboxing
- **Origin Isolation**: Same-origin policy enforcement

### Threat Assumptions

Relock is designed to protect against:

- **Network Attacks**: Man-in-the-middle, replay, and traffic analysis
- **Session Hijacking**: Stolen cookies, tokens, or session identifiers
- **Cross-Site Request Forgery**: Unauthorized actions using authenticated sessions
- **Phishing**: Fake websites attempting to steal credentials
- **Device Compromise**: Stolen or compromised devices

## Attack Vectors

### 1. Network Layer Attacks

#### Man-in-the-Middle (MiTM)
- **Risk**: High
- **Mitigation**: TLS 1.3, certificate pinning, origin binding
- **Relock Protection**: Origin binding prevents requests from unauthorized domains

#### Traffic Analysis
- **Risk**: Medium
- **Mitigation**: Request-level authentication, no persistent identifiers
- **Relock Protection**: Each request requires fresh cryptographic proof

#### Replay Attacks
- **Risk**: High
- **Mitigation**: Signed One-Time Tokens (SOTT), timestamp validation
- **Relock Protection**: SOTT ensures each token can only be used once

### 2. Application Layer Attacks

#### Session Hijacking
- **Risk**: High
- **Mitigation**: Continuous authentication, cryptographic proofs
- **Relock Protection**: Replaces bearer tokens with per-request validation

#### Cross-Site Request Forgery (CSRF)
- **Risk**: Medium
- **Mitigation**: Origin binding, cryptographic validation
- **Relock Protection**: Origin binding prevents cross-origin attacks

#### Cross-Site Scripting (XSS)
- **Risk**: Medium
- **Mitigation**: Content Security Policy, input validation
- **Relock Protection**: Limited - XSS can still compromise user sessions

### 3. Client-Side Attacks

#### Malware/Keyloggers
- **Risk**: High
- **Mitigation**: Device binding, behavioral analysis
- **Relock Protection**: Device binding detects unauthorized access

#### Browser Extensions
- **Risk**: Medium
- **Mitigation**: Origin isolation, sandboxing
- **Relock Protection**: Origin binding limits extension access

#### Device Theft
- **Risk**: Medium
- **Mitigation**: Device binding, automatic key rotation
- **Relock Protection**: Device binding detects new devices

## Risk Assessment

### High Risk Scenarios

1. **Compromised Relock Infrastructure**
   - Impact: Complete system compromise
   - Mitigation: Multi-tenant isolation, security audits
   - Detection: Monitoring, anomaly detection

2. **TLS Certificate Compromise**
   - Impact: Man-in-the-middle attacks
   - Mitigation: Certificate pinning, HSTS
   - Detection: Certificate transparency logs

3. **Client Device Compromise**
   - Impact: Unauthorized access to user accounts
   - Mitigation: Device binding, behavioral analysis
   - Detection: Anomaly detection, user reporting

### Medium Risk Scenarios

1. **Browser Vulnerabilities**
   - Impact: Sandbox escape, origin bypass
   - Mitigation: Regular updates, security headers
   - Detection: Security monitoring, vulnerability scanning

2. **Social Engineering**
   - Impact: User credential theft
   - Mitigation: User education, multi-factor authentication
   - Detection: User reporting, anomaly detection

3. **Supply Chain Attacks**
   - Impact: Compromised dependencies
   - Mitigation: Dependency scanning, integrity checks
   - Detection: Automated scanning, security audits

### Low Risk Scenarios

1. **Brute Force Attacks**
   - Impact: Account compromise
   - Mitigation: Rate limiting, account lockout
   - Detection: Rate limiting, monitoring

2. **Information Disclosure**
   - Impact: Sensitive data exposure
   - Mitigation: Minimal data collection, encryption
   - Detection: Data loss prevention, monitoring

## Security Boundaries

### What Relock Protects

- **Authentication**: Continuous cryptographic validation
- **Session Security**: Per-request authentication
- **Origin Binding**: Domain-specific access control
- **Device Binding**: Device-specific authentication
- **Replay Prevention**: One-time token validation

### What Relock Doesn't Protect

- **Application Logic**: Business logic vulnerabilities
- **Data Storage**: Database security and encryption
- **User Input**: Input validation and sanitization
- **Access Control**: Authorization and permissions
- **Infrastructure**: Server and network security

## Defense in Depth

### Primary Defenses

1. **Cryptographic Authentication**: Strong cryptographic proofs
2. **Origin Binding**: Domain-specific access control
3. **Device Binding**: Device-specific authentication
4. **Replay Prevention**: One-time token validation

### Secondary Defenses

1. **TLS/HTTPS**: Transport layer security
2. **Security Headers**: CSP, HSTS, X-Frame-Options
3. **Input Validation**: Request parameter validation
4. **Rate Limiting**: Abuse prevention

### Tertiary Defenses

1. **Monitoring**: Security event logging
2. **Alerting**: Automated threat detection
3. **Incident Response**: Security incident procedures
4. **Regular Audits**: Security assessment and testing

## Threat Modeling Process

### 1. Asset Identification

Identify critical assets:
- User authentication data
- Cryptographic keys
- Session information
- API endpoints

### 2. Threat Enumeration

List potential threats:
- Authentication bypass
- Session hijacking
- Data exfiltration
- Service disruption

### 3. Risk Assessment

Evaluate threat likelihood and impact:
- **Likelihood**: Frequency of attack attempts
- **Impact**: Severity of successful attack
- **Risk Score**: Likelihood × Impact

### 4. Mitigation Planning

Develop countermeasures:
- **Prevention**: Reduce attack likelihood
- **Detection**: Identify attack attempts
- **Response**: Contain and recover from attacks

## Continuous Improvement

### Regular Reviews

- **Monthly**: Threat landscape updates
- **Quarterly**: Risk assessment review
- **Annually**: Comprehensive security audit

### Threat Intelligence

- **Industry Reports**: Security research and trends
- **Vulnerability Databases**: CVE tracking and analysis
- **Security Communities**: Information sharing and collaboration

### Security Testing

- **Penetration Testing**: Regular security assessments
- **Vulnerability Scanning**: Automated security testing
- **Red Team Exercises**: Simulated attack scenarios

## Conclusion

Relock's threat model is designed around the principle of **defense in depth**, providing multiple layers of security while maintaining excellent user experience. By understanding these security boundaries and attack vectors, you can make informed decisions about deployment, integration, and risk management.

For more information on implementing security best practices, see [Security Hardening](../deployment/security-hardening.md) and [Incident Response](incident-response.md).
