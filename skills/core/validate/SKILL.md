---
name: validate
description: Use when testing and verifying code changes before merging or deploying
category: core
prerequisites:
  - Implemented code ready for testing
  - Test environment configured
  - Testing frameworks installed
  - Clear acceptance criteria
output:
  type: test_report
  format: markdown
---

# Validate Skill

## Overview

Comprehensive testing and verification of code changes to ensure correctness, quality, and reliability before merging or deployment.

**Core principle:** Evidence before claims. Run the tests, read the output, then make the claim.

## The Iron Law

```
NO COMPLETION CLAIMS WITHOUT PASSING TESTS
```

If you haven't run the full test suite and seen it pass, you cannot claim the work is done.

## When to Use

- After implementing new features
- When fixing bugs
- Before merging code changes
- Before production deployment
- When refactoring existing code

## Prerequisites

- Code implemented and ready for testing
- Test environment properly configured
- Testing frameworks installed
- Clear acceptance criteria defined

## Workflow

### Phase 1: Test Planning (10-15 minutes)

1. **Define strategy** — what needs testing, at which levels
2. **Design test cases** — requirements, edge cases, negative cases
3. **Setup environment** — databases, mocks, fixtures

### Phase 2: Test Execution (40-60 minutes)

**Testing levels:**

| Level | Purpose | Command |
|-------|---------|---------|
| **Unit** | Individual functions/methods | `npm test` |
| **Integration** | Component interactions | `npm run test:integration` |
| **E2E** | Full user workflows | `npm run test:e2e` |
| **Performance** | Load/stress testing | `npm run test:performance` |

**Execution order:**
```
1. Unit tests (fast feedback)
   ↓
2. Integration tests (component interaction)
   ↓
3. E2E tests (user workflows)
   ↓
4. Performance tests (if applicable)
```

### Phase 3: Test Analysis (15-20 minutes)

1. **Review results** — analyze failures, check coverage
2. **Categorize issues** — flaky, environment, or code bugs
3. **Investigate root causes** — trace failures to source

### Phase 4: Quality Assessment (10-15 minutes)

1. **Acceptance criteria** — verify all requirements met
2. **Risk assessment** — identify potential issues
3. **Go/No-Go decision** — deployment recommendation

## Testing Levels

### Unit Testing
- Test individual functions/methods
- Fast execution, isolated
- Focus on business logic

### Integration Testing
- Test component interactions
- Verify API contracts
- Test database operations

### End-to-End Testing
- Test full user workflows
- Verify UI behavior
- Test across browsers/devices

### Performance Testing
- Load testing (expected traffic)
- Stress testing (peak loads)
- Soak testing (extended duration)

## Common Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| Flaky tests | Random pass/fail | Fix timing, isolation issues |
| Slow tests | Long feedback loop | Parallelize, mock externals |
| False positives | Tests pass but code broken | Review assertions |
| Environment issues | Tests fail in CI only | Standardize environments |

## Best Practices

1. **Test early, test often** — Don't wait until the end
2. **Test what matters** — Focus on critical paths and edge cases
3. **Keep tests fast** — Slow tests don't get run
4. **Make tests reliable** — Flaky tests erode confidence
5. **Automate everything** — Manual testing doesn't scale

## Integration

**Related skills:**
- **implement** — Validates implemented code
- **tdd** — Write tests first, then implement
- **verify** — Verify before claiming completion
- **ship** — Gates deployment decisions

**Workflow chain:**
```
implement → validate → ship
```

**Next skill:** After validation passes, use **ship** to merge code and create releases.
