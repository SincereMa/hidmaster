---
name: security-review
description: Security vulnerability assessment and threat modeling for code changes
category: review
prerequisites:
  - Code changes identified for review
  - Understanding of application architecture
  - Knowledge of security requirements and compliance needs
output:
  type: security_report
  format: markdown
  sections:
    - threat_assessment
    - vulnerabilities_found
    - risk_ratings
    - remediation
    - compliance_status
---

# Security Review Skill

## Purpose

Identify security vulnerabilities, assess threat exposure, and provide remediation guidance to prevent exploitation before code reaches production.

## When to Use

- Before merging code handling authentication or authorization
- When adding new API endpoints
- When processing user input or sensitive data
- Before production deployment of critical changes
- After security incidents to check for similar issues
- Periodically as part of security hygiene

## Prerequisites

- Code changes identified for review
- Application architecture understood
- Threat model or security requirements available
- Compliance requirements known (SOC2, GDPR, HIPAA, etc.)

## Detailed Workflow

### Phase 1: Scope Definition (5-10 minutes)

1. **Identify attack surface** - What inputs does this code accept?
2. **Map data flow** - Where does data come from and go?
3. **Identify trust boundaries** - What crosses from untrusted to trusted?
4. **Review dependencies** - Any new external packages?

### Phase 2: Vulnerability Analysis (25-40 minutes)

#### Input Validation

1. **Injection vulnerabilities**
   - SQL injection
   - NoSQL injection
   - Command injection
   - LDAP injection
   - XPath injection

2. **Cross-site scripting (XSS)**
   - Reflected XSS
   - Stored XSS
   - DOM-based XSS

3. **Input sanitization**
   - Server-side validation present?
   - Output encoding applied?
   - Content Security Policy configured?

#### Authentication & Authorization

1. **Authentication checks**
   - Password hashing (bcrypt, argon2)?
   - Session management secure?
   - MFA supported where required?
   - Credential storage safe?

2. **Authorization checks**
   - Access control on every endpoint?
   - Horizontal privilege escalation possible?
   - Vertical privilege escalation possible?
   - IDOR (Insecure Direct Object Reference) possible?

#### Data Protection

1. **Sensitive data handling**
   - Secrets in code? (API keys, passwords)
   - PII properly encrypted?
   - Data masking in logs?
   - Secure data transmission (HTTPS)?

2. **Data storage**
   - Credentials hashed with salt?
   - Encryption at rest?
   - Backup security?
   - Data retention policies?

#### Configuration & Deployment

1. **Security headers**
   - Content-Security-Policy
   - X-Frame-Options
   - X-Content-Type-Options
   - Strict-Transport-Security

2. **Error handling**
   - Stack traces exposed?
   - Database errors shown to users?
   - Verbose error messages?

3. **Dependencies**
   - Known CVEs in dependencies?
   - Outdated packages?
   - License compliance?

### Phase 3: Risk Assessment (10-15 minutes)

1. **Rate each finding** by severity:
   - **Critical**: Remote code execution, authentication bypass, data breach
   - **High**: Privilege escalation, significant data exposure
   - **Medium**: XSS, CSRF, limited data exposure
   - **Low**: Information disclosure, missing headers

2. **Assess exploitability**
   - How easy to exploit?
   - What access is needed?
   - Are there mitigating controls?

3. **Determine business impact**
   - Data loss potential
   - Service disruption risk
   - Compliance implications

### Phase 4: Remediation Planning (10-15 minutes)

1. **Prioritize fixes** by severity and effort
2. **Provide specific remediation steps**
3. **Suggest security testing** for validation

## Output Format

```markdown
## Security Review: [Feature/Branch Name]

### Threat Summary
| Threat Category | Exposure Level | Risk |
|----------------|----------------|------|
| Injection | [High/Med/Low] | [Critical/High/Med/Low] |
| Authentication | [High/Med/Low] | [Critical/High/Med/Low] |
| Authorization | [High/Med/Low] | [Critical/High/Med/Low] |
| Data Exposure | [High/Med/Low] | [Critical/High/Med/Low] |

### Overall Risk Rating: [CRITICAL/HIGH/MEDIUM/LOW]

### Findings

#### Critical (must fix before merge)
1. **[VULN-001] [Title]**
   - **Location**: file:line
   - **Description**: [what's vulnerable]
   - **Impact**: [what could happen]
   - **Exploitability**: [how easy to exploit]
   - **Remediation**: [specific fix]
   - **References**: [CWE/OWASP links]

#### High (should fix before merge)
1. **[VULN-002] [Title]**
   - [same structure]

#### Medium (should fix soon)
1. **[VULN-003] [Title]**
   - [same structure]

#### Low (address when possible)
1. **[VULN-004] [Title]**
   - [same structure]

### Positive Security Controls Found
- [control 1]
- [control 2]

### Recommendations
1. [recommendation 1]
2. [recommendation 2]

### Compliance Impact
- [relevant standards: SOC2, GDPR, HIPAA, PCI-DSS]
- [specific controls affected]

### Sign-off Required
- [ ] Security Team
- [ ] Architecture Review (if high risk)
```

## Common Vulnerabilities Checklist

| Category | Check | CWE |
|----------|-------|-----|
| Injection | SQL parameterized queries used? | CWE-89 |
| Injection | No shell command construction from input? | CWE-78 |
| XSS | Output properly encoded? | CWE-79 |
| Auth | Passwords hashed with bcrypt/argon2? | CWE-328 |
| Auth | Session timeout configured? | CWE-613 |
| Authz | Access control on all endpoints? | CWE-862 |
| Crypto | Strong algorithms (AES-256, RSA-2048+)? | CWE-327 |
| Secrets | No hardcoded credentials? | CWE-798 |
| Config | Security headers set? | CWE-693 |
| Error | No stack traces exposed? | CWE-209 |

## Examples

### Example 1: API Endpoint with User Input

**Code**:
```javascript
app.get('/users/:id', async (req, res) => {
  const user = await db.query(`SELECT * FROM users WHERE id = ${req.params.id}`);
  res.json(user);
});
```

**Finding**:
- **SQL Injection** (Critical) - User input directly interpolated into query
- **Fix**: Use parameterized queries
```javascript
const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
```

### Example 2: Password Storage

**Code**:
```javascript
const hash = crypto.createHash('md5').update(password).digest('hex');
```

**Finding**:
- **Weak Hashing** (High) - MD5 is cryptographically broken
- **Fix**: Use bcrypt with salt
```javascript
const hash = await bcrypt.hash(password, 12);
```

## Error Handling

| Situation | Action |
|-----------|--------|
| Critical vulnerability found | Block merge, notify security team immediately |
| Uncertain if vulnerable | Flag for investigation, don't dismiss |
| Third-party library vulnerability | Check version, update if patched version available |
| Security tool false positive | Verify manually, document finding |
| Compliance requirement unclear | Consult compliance team before approving |

## Security Review Checklist

- [ ] All user input validated server-side
- [ ] SQL queries use parameterized statements
- [ ] Authentication required on sensitive endpoints
- [ ] Authorization checked for every resource access
- [ ] Passwords hashed with strong algorithm
- [ ] No secrets in code or version control
- [ ] Error messages don't expose internals
- [ ] Security headers configured
- [ ] HTTPS enforced for sensitive operations
- [ ] Logging doesn't include sensitive data

## Metrics for Success

- Zero critical vulnerabilities reaching production
- Vulnerabilities caught during review (not in production)
- Remediation time under 24 hours for critical findings
- Compliance requirements met
