---
name: validate
description: Testing and verification of code changes
category: core
triggers:
  - "test code"
  - "validate changes"
  - "run tests"
  - "verify functionality"
  - "check quality"
prerequisites:
  - Implemented code ready for testing
  - Test environment configured
  - Testing frameworks installed
  - Clear acceptance criteria
output:
  type: test_report
  format: markdown
  sections:
    - test_summary
    - coverage_report
    - issue_analysis
    - recommendations
    - go_nogo_decision
---

# Validate Skill

## Overview

Comprehensive testing and verification of code changes to ensure correctness, quality, and reliability before merging or deployment. This skill provides systematic approaches to testing at multiple levels.

## When to Use

- After implementing new features
- When fixing bugs
- Before merging code changes
- During code review process
- Before production deployment
- When refactoring existing code
- For regression testing

## Prerequisites

- Code implemented and ready for testing
- Test environment properly configured
- Testing frameworks and tools installed
- Clear acceptance criteria defined
- Access to test data and fixtures

## Detailed Workflow

### Phase 1: Test Planning (10-15 minutes)

**Step 1.1: Test Strategy Definition**
- Identify what needs to be tested
- Determine testing levels (unit, integration, e2e)
- Define test environment requirements
- Plan test data management

**Step 1.2: Test Case Design**
- Create test cases from requirements
- Identify edge cases and boundary conditions
- Plan negative test cases
- Define performance test scenarios

**Step 1.3: Test Environment Setup**
- Verify test environment configuration
- Set up test databases and mocks
- Configure test data fixtures
- Validate test tooling

### Phase 2: Test Execution (40-60 minutes)

**Step 2.1: Unit Testing**
```bash
# Run unit tests
npm run test:unit

# With coverage
npm run test:unit -- --coverage

# Watch mode for development
npm run test:unit -- --watch
```

**Step 2.2: Integration Testing**
```bash
# Run integration tests
npm run test:integration

# With specific test file
npm run test:integration -- --testPathPattern=user-service

# With database cleanup
npm run test:integration -- --cleanDB
```

**Step 2.3: End-to-End Testing**
```bash
# Run e2e tests
npm run test:e2e

# Headless mode
npm run test:e2e -- --headless

# Specific browser
npm run test:e2e -- --browser=chrome
```

**Step 2.4: Performance Testing**
```bash
# Load testing
npm run test:performance

# Stress testing
npm run test:performance -- --stress

# With metrics collection
npm run test:performance -- --metrics
```

### Phase 3: Test Analysis (15-20 minutes)

**Step 3.1: Results Analysis**
- Review test execution results
- Analyze failures and errors
- Check performance metrics
- Validate coverage reports

**Step 3.2: Issue Investigation**
- Categorize failures (flaky, environment, code)
- Investigate root causes
- Prioritize issues by severity
- Document findings

**Step 3.3: Coverage Analysis**
- Review code coverage metrics
- Identify untested critical paths
- Analyze coverage gaps
- Plan additional tests if needed

### Phase 4: Quality Assessment (10-15 minutes)

**Step 4.1: Acceptance Criteria Validation**
- Verify all requirements are met
- Check non-functional requirements
- Validate user experience
- Confirm business logic correctness

**Step 4.2: Risk Assessment**
- Identify potential risks
- Assess impact and probability
- Plan mitigation strategies
- Document known issues

**Step 4.3: Go/No-Go Decision**
- Make deployment recommendation
- Document conditions for proceed
- Identify required fixes
- Plan next steps

## Testing Levels and Techniques

### Unit Testing
```typescript
// Example: Testing a utility function
describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15');
    expect(formatDate(date)).toBe('2024-01-15');
  });

  it('should handle null dates', () => {
    expect(formatDate(null)).toBe('');
  });

  it('should handle invalid dates', () => {
    expect(formatDate('invalid')).toBe('');
  });
});
```

### Integration Testing
```typescript
// Example: Testing API endpoint
describe('POST /api/users', () => {
  it('should create user successfully', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
      })
      .expect(201);

    expect(response.body).toMatchObject({
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should return 400 for invalid data', async () => {
    await request(app)
      .post('/api/users')
      .send({
        name: '',
        email: 'invalid-email',
      })
      .expect(400);
  });
});
```

### End-to-End Testing
```typescript
// Example: User registration flow
test('user can register successfully', async ({ page }) => {
  await page.goto('/register');
  
  await page.fill('[data-testid=name-input]', 'John Doe');
  await page.fill('[data-testid=email-input]', 'john@example.com');
  await page.fill('[data-testid=password-input]', 'SecurePass123!');
  
  await page.click('[data-testid=register-button]');
  
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('[data-testid=welcome-message]'))
    .toContainText('Welcome, John!');
});
```

### Performance Testing
```javascript
// Example: Load testing with k6
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '30s', target: 0 },
  ],
};

export default function () {
  const res = http.get('http://test-api/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
```

## Test Data Management

### Test Fixtures
```typescript
// fixtures/users.ts
export const validUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'SecurePass123!',
};

export const invalidUsers = [
  { name: '', email: 'test@example.com' },
  { name: 'Test', email: 'invalid-email' },
  { name: 'Test', email: 'test@example.com', password: '123' },
];
```

### Mock Data
```typescript
// mocks/database.ts
export const mockUserRepository = {
  create: jest.fn().mockResolvedValue({
    id: '123',
    ...validUser,
    createdAt: new Date(),
  }),
  findByEmail: jest.fn().mockResolvedValue(null),
  findById: jest.fn().mockResolvedValue(null),
};
```

## Output Format

### Test Report Template
```markdown
# Test Report: [Feature/Change Name]

## Summary
- **Date**: [Date]
- **Tester**: [Name/AI]
- **Environment**: [Test environment]
- **Duration**: [Test execution time]

## Test Execution Results

### Unit Tests
- **Total**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Skipped**: [Number]
- **Coverage**: [Percentage]

### Integration Tests
- **Total**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Duration**: [Time]

### E2E Tests
- **Total**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Browsers Tested**: [List]

## Coverage Report
| Component | Line Coverage | Branch Coverage | Function Coverage |
|-----------|---------------|-----------------|-------------------|
| UserService | 95% | 90% | 100% |
| UserController | 88% | 85% | 95% |

## Issues Found

### Critical Issues
1. [Issue description]
   - **Impact**: [High/Medium/Low]
   - **Reproduction**: [Steps]
   - **Recommendation**: [Fix approach]

### Minor Issues
1. [Issue description]
   - **Impact**: [Low]
   - **Recommendation**: [Suggestion]

## Performance Metrics
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Response Time | < 200ms | 150ms | ✅ PASS |
| Throughput | > 100 req/s | 120 req/s | ✅ PASS |
| Memory Usage | < 100MB | 85MB | ✅ PASS |

## Go/No-Go Decision
### Recommendation: [GO / NO-GO / CONDITIONAL-GO]

### Conditions (if any):
1. [Condition 1]
2. [Condition 2]

### Sign-off
- [ ] Development Lead
- [ ] QA Lead
- [ ] Product Owner
```

## Examples

### Example 1: Bug Fix Validation
**Bug**: User login fails with special characters in password

**Test Plan**:
1. Unit test for password validation
2. Integration test for login endpoint
3. E2E test for login flow
4. Security test for injection attempts

**Validation Steps**:
1. Run existing login tests (should pass)
2. Add test for special character password
3. Test login with various special characters
4. Verify no regression in other auth flows

**Result**: All tests pass, bug fixed, no regressions.

### Example 2: New Feature Validation
**Feature**: File upload with progress tracking

**Test Plan**:
1. Unit tests for file validation
2. Integration tests for upload API
3. E2E tests for upload UI
4. Performance tests for large files
5. Security tests for malicious files

**Validation Steps**:
1. Test file type validation
2. Test upload progress events
3. Test error handling for large files
4. Test concurrent uploads
5. Test virus scanning integration

**Result**: Feature works as specified, meets performance requirements.

## Error Handling

### Common Testing Issues

1. **Flaky Tests**
   - **Symptom**: Tests pass/fail randomly
   - **Solution**: Identify and fix timing issues, isolation problems

2. **Slow Tests**
   - **Symptom**: Test suite takes too long
   - **Solution**: Optimize test execution, parallelize, mock external services

3. **False Positives/Negatives**
   - **Symptom**: Tests don't reflect actual behavior
   - **Solution**: Review test assertions, improve test design

4. **Environment Issues**
   - **Symptom**: Tests fail in certain environments
   - **Solution**: Standardize test environments, containerize tests

### Recovery Strategies

- **Test Failures**: Investigate root cause, fix code or test
- **Coverage Gaps**: Add missing tests, prioritize critical paths
- **Performance Issues**: Profile and optimize, adjust thresholds
- **Tooling Problems**: Update tools, check configurations

## Best Practices

1. **Test Early, Test Often**: Don't wait until the end
2. **Test What Matters**: Focus on critical paths and edge cases
3. **Keep Tests Fast**: Slow tests don't get run
4. **Make Tests Reliable**: Flaky tests erode confidence
5. **Test in Production-like Environment**: Mimic production conditions
6. **Automate Everything**: Manual testing doesn't scale
7. **Monitor Test Health**: Track test suite metrics
8. **Document Test Decisions**: Record why tests are written this way

## Integration Points

This skill integrates with:
- **implement**: Validates implemented code
- **ship**: Gates deployment decisions
- **iterate**: Identifies improvement areas
- **explore**: Verifies understanding through tests

## Metrics for Success

- **Test Coverage**: Adequate coverage for critical paths
- **Test Reliability**: Low flaky test rate
- **Test Speed**: Fast feedback loop
- **Bug Detection**: Catches issues before production
- **Confidence Level**: High confidence in changes
