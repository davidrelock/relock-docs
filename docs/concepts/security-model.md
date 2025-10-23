---
title: Security Model
description: Understanding Relock's security guarantees, threat model, and limitations
sidebar_label: Security Model
---

# Security Model

Relock's security model is built around **continuous cryptographic trust** - providing strong authentication guarantees while maintaining zero user friction. This page explains what Relock protects against, how it works, and its security limitations.

## Security Guarantees

### What Relock Protects

Relock provides strong protection against the following attack vectors:

#### 🔒 Session Hijacking
- **Stolen cookies**: Useless without device binding
- **Token replay**: Each token is single-use
- **Session takeover**: Requires device compromise

#### 🛡️ Phishing Attacks
- **Credential theft**: Stolen passwords alone are insufficient
- **Real-time interception**: AiTM attacks are detected
- **Session replay**: Impossible due to token rotation

#### 🌐 Cross-Site Attacks
- **CSRF**: Origin binding prevents cross-site requests
- **Clickjacking**: Frame-ancestors CSP protection
- **Origin confusion**: Strict domain validation

#### ⚡ Man-in-the-Middle
- **Network interception**: TLS + origin binding protection
- **Proxy attacks**: Gateway validation prevents bypass
- **DNS manipulation**: HSTS prevents downgrade attacks

## Threat Model

### Assumed Threats

Relock assumes the following threats exist:

1. **Network Attacks**: Interception, manipulation, replay
2. **Credential Theft**: Stolen passwords, tokens, cookies
3. **Session Hijacking**: Unauthorized session access
4. **Origin Spoofing**: Cross-site request forgery
5. **Token Reuse**: Multiple use of captured tokens

### Protected Against

Relock actively protects against:

- **Bearer credential reuse**: Tokens are single-use
- **Session persistence**: Automatic key rotation
- **Cross-origin attacks**: Strict origin validation
- **Replay attacks**: Server-side token tracking
- **Device spoofing**: Browser fingerprint binding

### Not Protected Against

Relock cannot protect against:

- **XSS Attacks**: Same-origin code execution
- **Malware**: Full device compromise
- **Social Engineering**: User deception
- **Infrastructure Attacks**: DNS, routing, ISP level
- **Physical Access**: Device theft with unlock

## Security Architecture

### Defense in Depth

Relock implements multiple security layers:

#### Layer 1: Cryptographic Foundation
- **AES-256-GCM**: Strong symmetric encryption
- **Ed25519**: Fast, secure digital signatures
- **HKDF**: Secure key derivation

#### Layer 2: Origin Binding
- **HTTPS Enforcement**: TLS 1.2+ required
- **Domain Validation**: Exact origin matching
- **Subdomain Isolation**: Separate cryptographic contexts

#### Layer 3: Device Binding
- **Browser Sandbox**: Process isolation
- **OS Keychain**: Platform security integration
- **Hardware Fingerprint**: Device characteristics

#### Layer 4: Continuous Validation
- **Per-Request Verification**: Every request validated
- **Automatic Rotation**: Keys refresh automatically
- **Real-Time Detection**: Immediate compromise response

### Security Properties

#### Confidentiality
- **Encrypted Storage**: All secrets encrypted at rest
- **Memory Protection**: Raw secrets never persisted
- **TLS Communication**: All network traffic encrypted

#### Integrity
- **Cryptographic Signatures**: Tamper-proof verification
- **Origin Validation**: Request source verification
- **Token Freshness**: Time-based validation

#### Availability
- **Graceful Degradation**: Fail-secure operation
- **Automatic Recovery**: Self-healing key rotation
- **Load Distribution**: Global CDN for reliability

## Attack Scenarios

### Scenario 1: Stolen Session Cookie

**Traditional Authentication**:
1. Attacker steals session cookie
2. Attacker uses cookie from any device
3. Session remains valid until expiration

**With Relock**:
1. Attacker steals session cookie
2. Cookie is useless without device binding
3. Attacker cannot generate valid tokens
4. Session immediately terminated

### Scenario 2: Man-in-the-Middle Attack

**Traditional Authentication**:
1. Attacker intercepts login credentials
2. Attacker can replay credentials
3. Attacker gains full access

**With Relock**:
1. Attacker intercepts login credentials
2. Device verification fails from attacker's device
3. Attacker cannot establish valid session
4. Attack is detected and logged

### Scenario 3: Token Replay

**Traditional Authentication**:
1. Attacker captures authentication token
2. Attacker can reuse token multiple times
3. Attack continues until token expires

**With Relock**:
1. Attacker captures authentication token
2. Token is single-use and immediately invalid
3. Reuse attempt triggers session termination
4. Attack is detected in real-time

## Security Limitations

### Technical Limitations

#### Browser Security Dependencies
- **Origin Isolation**: Relies on browser sandboxing
- **Keychain Security**: Depends on OS security
- **TLS Integrity**: Requires secure network layer

#### Cryptographic Assumptions
- **Random Number Generation**: Depends on secure entropy
- **Algorithm Security**: Assumes cryptographic primitives are secure
- **Key Management**: Requires secure key storage

### Operational Limitations

#### Device Compromise
- **Malware**: Full device control bypasses protection
- **Root Access**: Kernel-level compromise defeats isolation
- **Hardware Attacks**: Physical access can extract secrets

#### Social Engineering
- **User Deception**: Cannot prevent user mistakes
- **Phishing**: Cannot prevent credential entry
- **Insider Threats**: Cannot prevent authorized misuse

## Security Best Practices

### Implementation Security

:::warning Critical
Follow these practices to maintain Relock's security guarantees.
:::

#### Content Security Policy
```javascript
// Implement strict CSP with nonces
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM_NONCE}' 'strict-dynamic';
  connect-src 'self' https://relock.host;
  frame-ancestors 'none';
  base-uri 'none';
```

#### HTTP Security Headers
```javascript
// Enable HSTS to prevent downgrade attacks
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

// Prevent clickjacking
X-Frame-Options: DENY

// Control content type sniffing
X-Content-Type-Options: nosniff
```

#### Subresource Integrity
```html
<!-- Add SRI hashes for supply chain security -->
<script src="/relock/relock.js"
        integrity="sha384-..."
        crossorigin="anonymous"
        nonce="{{RANDOM_NONCE}}"
        async></script>
```

### Operational Security

#### Monitoring and Alerting
- **Security Events**: Monitor authentication failures
- **Anomaly Detection**: Alert on unusual patterns
- **Audit Logging**: Maintain comprehensive logs

#### Incident Response
- **Session Termination**: Immediate response to compromise
- **User Notification**: Alert users to suspicious activity
- **Forensic Analysis**: Investigate security incidents

#### Regular Updates
- **Security Patches**: Keep systems updated
- **Configuration Review**: Regular security assessments
- **Penetration Testing**: Validate security controls

## Compliance and Standards

### Regulatory Frameworks

Relock helps meet requirements for:

- **PSD2/SCA**: Dynamic linking and strong authentication
- **NIST SP 800-63B**: AAL2/AAL3 authenticator assurance
- **SOC 2**: Security, availability, and confidentiality
- **PCI DSS**: Multi-factor authentication and session management
- **HIPAA**: Electronic health data protection
- **GDPR**: State-of-the-art security controls

### Security Standards

Relock aligns with:

- **OWASP Top 10**: Addresses multiple vulnerability categories
- **NIST Cybersecurity Framework**: Identify, protect, detect, respond, recover
- **ISO 27001**: Information security management systems
- **CIS Controls**: Critical security controls

## Security Research

### Vulnerability Disclosure

Relock maintains a responsible disclosure policy:

- **Security Contact**: security@relock.security
- **Response Time**: 48 hours for initial response
- **Public Disclosure**: Coordinated with affected parties
- **Bug Bounty**: Rewards for valid security findings

### Security Audits

Relock undergoes regular security assessments:

- **Third-Party Audits**: Annual security reviews
- **Penetration Testing**: Regular vulnerability assessments
- **Code Reviews**: Ongoing security code analysis
- **Cryptographic Validation**: Algorithm and implementation review

## Next Steps

- **Compare** with [alternative solutions](./comparison)
- **Learn** about [integration patterns](../integration/integration-overview)
- **Understand** [deployment security](../deployment/security-hardening)
- **Start implementing** with our [quickstart guides](../getting-started/quickstart-overview)
