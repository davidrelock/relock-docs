---
title: Benefits and Impact
description: Understanding the security, business, and user experience benefits of Relock
sidebar_label: Benefits and Impact
---

# Benefits and Impact

Relock provides significant benefits across security, user experience, compliance,
and operational efficiency. By implementing continuous cryptographic
authentication, organizations can enhance their security posture while improving
user satisfaction and reducing operational overhead.

## Security Benefits

### Phishing and Session Hijacking Resistance

Relock's origin-bound, single-use tokens make traditional attack vectors
ineffective:

- **Token Replay Prevention**: Even if an attacker intercepts a token, it
  cannot be reused because each token is single-use and cryptographically
  bound to your application's origin
- **Cross-Site Protection**: Tokens cannot be stolen and used on different
  domains due to origin binding
- **Session Hijacking Mitigation**: Continuous verification means stolen
  sessions cannot be maintained without the original device's cryptographic
  keys

### Account Takeover Protection

Relock provides continuous device verification that prevents unauthorized access:

- **Credential Theft Defense**: Even if attackers obtain valid credentials,
  they cannot access accounts from devices that haven't been enrolled through
  Relock's cryptographic verification
- **Device Impersonation Prevention**: Cryptographic keys are bound to specific
  devices and cannot be transferred or replicated
- **Continuous Monitoring**: Every request is verified, not just the initial
  login, providing ongoing protection throughout the session

### Zero Trust Architecture Support

Relock enforces Zero Trust principles by verifying every request:

- **Continuous Verification**: No request is trusted by default—every
  interaction requires fresh cryptographic proof
- **Device Trust Validation**: The system continuously validates that requests
  originate from enrolled, trusted devices
- **Reduced Attack Surface**: By eliminating bearer tokens and long-lived
  sessions, Relock reduces the attack surface for session-based attacks

## User Experience Benefits

### Zero Friction Authentication

Relock operates invisibly in the background after initial device enrollment:

- **No User Prompts**: Users don't see additional authentication challenges
  after their device is enrolled
- **Seamless Sessions**: Authentication works automatically across the entire
  user session without interruption
- **Reduced Authentication Fatigue**: Users aren't repeatedly prompted for
  additional verification steps on trusted devices

### Adaptive Authentication

Relock enables intelligent authentication flows based on device trust:

- **Password-Only on Trusted Devices**: Users with enrolled devices can use
  password-only authentication, reducing friction
- **Enhanced Security for New Devices**: New or untrusted devices automatically
  trigger additional verification steps (SMS, email, etc.)
- **Context-Aware Security**: Authentication requirements adapt based on device
  trust status and risk signals

### Improved Session Management

Relock provides secure, persistent sessions without security compromises:

- **Secure "Remember Me"**: Replace insecure long-lived cookies with
  cryptographic device verification
- **Multi-Tab Support**: Native support for multiple browser tabs without
  compromising security
- **Session Continuity**: Users maintain their sessions across page
  navigations without re-authentication

## Compliance and Regulatory Benefits

### Authentication Assurance Level Compliance

Relock supports AAL2/AAL3 requirements:

- **AAL2 Compliance**: Provides device-bound, non-replayable authentication
  factors required for AAL2
- **AAL3 Compliance**: Meets the higher assurance requirements for AAL3 with
  hardware-backed cryptographic proofs
- **Continuous Assurance**: Maintains assurance levels beyond initial login
  through continuous verification

### Strong Customer Authentication (SCA)

Relock fulfills PSD2/SCA requirements for financial services:

- **Dynamic Linking**: Per-request SOTTs provide dynamic linking of
  transactions, meeting SCA requirements
- **Multi-Factor Authentication**: Serves as a strong cryptographic factor in
  MFA implementations
- **Transaction Security**: Each transaction can be independently verified
  with cryptographic proof

### Zero Trust and CAEP Integration

Relock integrates with Zero Trust architectures:

- **CAEP Transmitter**: Relock can serve as a Continuous Access Evaluation
  Protocol (CAEP) transmitter, enabling real-time access decisions
- **CISA Zero Trust Alignment**: Meets CISA Zero Trust Maturity Model
  requirements for continuous authentication
- **Enterprise Compliance**: Supports enterprise Zero Trust deployments with
  continuous device verification

## Business and Operational Benefits

### Reduced Security Incidents

By preventing common attack vectors, Relock reduces security incidents:

- **Lower Account Takeover Rates**: Continuous device verification prevents
  unauthorized account access
- **Fewer Phishing Victimizations**: Origin-bound tokens prevent successful
  phishing attacks
- **Reduced Session Hijacking**: Single-use tokens eliminate session
  hijacking opportunities

### Cost Reduction

Relock can reduce operational costs in several ways:

- **Lower MFA Costs**: Trusted devices can use password-only authentication,
  reducing SMS and email verification costs
- **Reduced Support Burden**: Fewer authentication-related support tickets
  due to seamless user experience
- **Lower Security Incident Response Costs**: Prevention of attacks reduces
  incident response and remediation expenses

### Operational Efficiency

Relock simplifies authentication operations:

- **Maintenance-Free Authentication**: No authentication code to maintain or
  update—Relock handles cryptographic operations
- **Quick Deployment**: Simple Integration can be deployed in minutes with
  zero infrastructure requirements
- **Scalable Architecture**: Relock's cloud-based architecture scales
  automatically with your application

### Developer Experience

Relock integrates seamlessly with existing systems:

- **No Identity Provider Replacement**: Works alongside existing IAM solutions
  (Auth0, Okta, Clerk, etc.)
- **Minimal Code Changes**: Simple Integration requires minimal code
  modifications
- **Flexible Integration Options**: Choose the integration approach that fits
  your infrastructure and requirements

## Impact on Different Stakeholders

### For Security Teams

- **Enhanced Security Posture**: Continuous verification provides stronger
  security than traditional authentication
- **Compliance Simplification**: Built-in support for regulatory requirements
  reduces compliance overhead
- **Threat Reduction**: Eliminates entire classes of attacks (phishing,
  session hijacking, token replay)

### For End Users

- **Frictionless Experience**: Invisible authentication means no additional
  user interaction after initial setup
- **Faster Access**: Trusted devices experience faster authentication flows
- **Increased Security Confidence**: Users benefit from stronger security
  without experiencing the burden

### For Developers

- **Simplified Integration**: Multiple integration options with clear
  documentation and examples
- **Reduced Maintenance**: No authentication code to maintain or update
- **Flexible Architecture**: Works with existing authentication systems

### For Businesses

- **Risk Reduction**: Lower security incident rates and compliance violations
- **Cost Savings**: Reduced MFA costs and support burden
- **Competitive Advantage**: Enhanced security can be a differentiator in
  competitive markets
- **Regulatory Confidence**: Built-in compliance support reduces regulatory
  risk

## Measuring Impact

To measure the impact of implementing Relock, consider tracking:

- **Security Metrics**: Reduction in account takeover incidents, phishing
  victimizations, and session hijacking attempts
- **User Experience Metrics**: Reduction in authentication-related support
  tickets, user complaints, and authentication abandonment rates
- **Cost Metrics**: Reduction in MFA costs, support costs, and security
  incident response expenses
- **Compliance Metrics**: Time to compliance, audit findings, and
  regulatory alignment

## Getting Started

Ready to experience these benefits? Start with our [Getting Started
Guide](/docs/guides/getting-started) to choose the integration approach that
best fits your needs and begin enhancing your application's security posture
today.