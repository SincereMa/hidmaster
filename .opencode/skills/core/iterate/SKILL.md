---
name: iterate
description: Continuous improvement and optimization
category: core
triggers:
  - "improve code"
  - "optimize performance"
  - "refactor system"
  - "technical debt"
  - "enhance quality"
prerequisites:
  - Current system understanding
  - Performance metrics available
  - User feedback collected
  - Improvement objectives defined
output:
  type: improvement_plan
  format: markdown
  sections:
    - current_state_analysis
    - improvement_areas
    - action_plan
    - success_metrics
    - timeline
---

# Iterate Skill

## Overview

Systematic approach to continuous improvement through analysis, optimization, and refinement of code, processes, and systems. This skill transforms feedback and metrics into actionable improvements.

## When to Use

- After production deployment
- When receiving user feedback
- During performance optimization
- For technical debt reduction
- When improving developer experience
- For process refinement
- During regular maintenance cycles

## Prerequisites

- Current system understanding and metrics
- User feedback and support tickets
- Performance monitoring data
- Clear improvement objectives
- Time allocated for improvements

## Detailed Workflow

### Phase 1: Analysis and Assessment (20-30 minutes)

**Step 1.1: Current State Evaluation**
- Review performance metrics and trends
- Analyze user feedback and support tickets
- Examine code quality metrics
- Assess developer experience and productivity

**Step 1.2: Problem Identification**
- Categorize issues (performance, usability, reliability)
- Prioritize by impact and effort
- Identify root causes vs symptoms
- Map dependencies between issues

**Step 1.3: Improvement Opportunity Mapping**
- Create improvement backlog
- Estimate effort and impact
- Identify quick wins vs long-term projects
- Plan resource allocation

### Phase 2: Planning and Design (30-45 minutes)

**Step 2.1: Improvement Strategy**
- Define improvement objectives
- Set measurable goals
- Plan implementation approach
- Identify success criteria

**Step 2.2: Solution Design**
- Design technical solutions
- Consider architectural implications
- Plan testing approach
- Define rollback strategies

**Step 2.3: Implementation Planning**
- Break improvements into tasks
- Create implementation timeline
- Identify dependencies
- Plan for incremental delivery

### Phase 3: Implementation (Variable)

**Step 3.1: Quick Wins Implementation**
```typescript
// Example: Performance quick win
// Before: N+1 query problem
const users = await User.findAll();
for (const user of users) {
  user.posts = await Post.findByUserId(user.id); // N queries
}

// After: Batch loading
const users = await User.findAll();
const userIds = users.map(u => u.id);
const posts = await Post.findByUserIds(userIds); // 1 query
const postsByUser = groupBy(posts, 'userId');
users.forEach(user => {
  user.posts = postsByUser[user.id] || [];
});
```

**Step 3.2: Refactoring Implementation**
```typescript
// Example: Code quality improvement
// Before: God function
function processOrder(order) {
  // 200 lines of mixed concerns
}

// After: Single responsibility
class OrderProcessor {
  validate(order: Order): void { /* ... */ }
  calculateTotal(order: Order): number { /* ... */ }
  applyDiscounts(order: Order): void { /* ... */ }
  processPayment(order: Order): Promise<void> { /* ... */ }
  sendConfirmation(order: Order): Promise<void> { /* ... */ }
}
```

**Step 3.3: Testing Improvements**
```typescript
// Example: Test coverage improvement
// Before: Minimal tests
describe('UserService', () => {
  it('should create user', async () => {
    // Basic happy path only
  });
});

// After: Comprehensive tests
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => { /* ... */ });
    it('should validate required fields', async () => { /* ... */ });
    it('should enforce email uniqueness', async () => { /* ... */ });
    it('should hash password', async () => { /* ... */ });
    it('should send welcome email', async () => { /* ... */ });
    it('should handle database errors', async () => { /* ... */ });
  });
});
```

### Phase 4: Validation and Measurement (15-20 minutes)

**Step 4.1: Improvement Validation**
- Test changes in staging environment
- Verify improvements with metrics
- Check for regressions
- Validate user experience

**Step 4.2: Metrics Collection**
- Measure before/after metrics
- Track improvement impact
- Monitor for unintended consequences
- Document learnings

**Step 4.3: Documentation Updates**
- Update technical documentation
- Create improvement case studies
- Share learnings with team
- Update processes and guidelines

## Improvement Categories

### Performance Optimization
```typescript
// Caching strategy
class CacheManager {
  private cache = new Map<string, { data: any; expiry: number }>();

  async get<T>(key: string, fetcher: () => Promise<T>, ttl: number): Promise<T> {
    const cached = this.cache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.data;
    }

    const data = await fetcher();
    this.cache.set(key, { data, expiry: Date.now() + ttl });
    return data;
  }
}

// Database query optimization
// Before
const users = await db.query(`
  SELECT * FROM users 
  WHERE status = 'active'
`);

// After
const users = await db.query(`
  SELECT id, name, email 
  FROM users 
  WHERE status = 'active'
  AND created_at > $1
  ORDER BY created_at DESC
  LIMIT 100
`, [thirtyDaysAgo]);
```

### Code Quality Improvement
```typescript
// TypeScript strict mode
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}

// ESLint rules
// .eslintrc.js
module.exports = {
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

### Developer Experience
```typescript
// Improved error messages
class ValidationError extends Error {
  constructor(field: string, value: any, reason: string) {
    super(`Validation failed for ${field}: ${reason}. Received: ${JSON.stringify(value)}`);
    this.name = 'ValidationError';
    this.field = field;
    this.value = value;
  }
}

// Better debugging
function debugMiddleware(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
}
```

### Reliability Improvement
```typescript
// Circuit breaker pattern
class CircuitBreaker {
  private failures = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  private lastFailure = 0;

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > this.resetTimeout) {
        this.state = 'half-open';
      } else {
        throw new Error('Circuit breaker is open');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess() {
    this.failures = 0;
    this.state = 'closed';
  }

  private onFailure() {
    this.failures++;
    this.lastFailure = Date.now();
    if (this.failures >= this.threshold) {
      this.state = 'open';
    }
  }
}
```

## Output Format

### Improvement Plan Template
```markdown
# Improvement Plan: [Area/Feature]

## Current State Analysis
### Metrics
- **Performance**: [Current metrics]
- **Quality**: [Current metrics]
- **User Satisfaction**: [Current feedback]

### Issues Identified
1. [Issue 1] - Impact: High, Effort: Medium
2. [Issue 2] - Impact: Medium, Effort: Low
3. [Issue 3] - Impact: High, Effort: High

## Improvement Areas

### Quick Wins (1-2 days)
1. [Improvement 1]
   - **Expected Impact**: [Metrics improvement]
   - **Effort**: [Hours]
   - **Risk**: Low

### Medium-term (1-2 weeks)
1. [Improvement 2]
   - **Expected Impact**: [Metrics improvement]
   - **Effort**: [Days]
   - **Risk**: Medium

### Long-term (1+ months)
1. [Improvement 3]
   - **Expected Impact**: [Metrics improvement]
   - **Effort**: [Weeks]
   - **Risk**: High

## Action Plan

### Phase 1: Quick Wins
- [ ] Task 1 (2 hours)
- [ ] Task 2 (4 hours)
- [ ] Task 3 (1 day)

### Phase 2: Core Improvements
- [ ] Task 4 (3 days)
- [ ] Task 5 (2 days)

### Phase 3: Architecture Enhancements
- [ ] Task 6 (1 week)
- [ ] Task 7 (1 week)

## Success Metrics
| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Response Time | 200ms | 100ms | P95 latency |
| Error Rate | 2% | 0.5% | Daily average |
| Test Coverage | 60% | 80% | Unit tests |

## Timeline
- **Week 1**: Quick wins implementation
- **Week 2-3**: Core improvements
- **Week 4+**: Architecture enhancements

## Resources Required
- **Development Time**: [Hours/Days]
- **Infrastructure**: [Any new resources]
- **Tools**: [Any new tools needed]

## Risk Assessment
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Regression | Medium | High | Comprehensive testing |
| Performance impact | Low | Medium | Gradual rollout |
| User disruption | Low | High | Feature flags |
```

## Examples

### Example 1: API Performance Optimization
**Problem**: API response times increasing

**Analysis**:
- P95 latency: 500ms → 1200ms over 3 months
- Database queries: 15 per request average
- Cache hit rate: 40%

**Improvements**:
1. **Query Optimization**: Reduce to 3 queries per request
2. **Caching**: Implement Redis caching (target 90% hit rate)
3. **Connection Pooling**: Optimize database connections

**Results**:
- P95 latency: 1200ms → 150ms
- Database load: 60% reduction
- Cost savings: $500/month

### Example 2: Developer Experience Improvement
**Problem**: New developer onboarding takes 2 weeks

**Analysis**:
- Documentation outdated
- Local setup complex
- No development guidelines

**Improvements**:
1. **Documentation Overhaul**: Update all docs
2. **Docker Development**: Containerize development environment
3. **Development Guidelines**: Create coding standards

**Results**:
- Onboarding time: 2 weeks → 3 days
- Developer satisfaction: +40%
- Code consistency: +60%

## Error Handling

### Common Iteration Pitfalls

1. **Gold Plating**
   - **Symptom**: Over-engineering solutions
   - **Solution**: Focus on minimum viable improvement

2. **Analysis Paralysis**
   - **Symptom**: Endless planning without action
   - **Solution**: Time-box planning, start with quick wins

3. **Regression Introduction**
   - **Symptom**: Improvements break existing functionality
   - **Solution**: Comprehensive testing, gradual rollout

4. **Metric Manipulation**
   - **Symptom**: Improving metrics but not user experience
   - **Solution**: Focus on user-centric metrics

### Recovery Strategies

- **Stuck on Analysis**: Start with small experiments
- **Regression Issues**: Rollback and analyze root cause
- **Stakeholder Resistance**: Show data and quick wins
- **Resource Constraints**: Prioritize high-impact, low-effort items

## Best Practices

1. **Measure First**: Don't improve what you can't measure
2. **Focus on Impact**: Prioritize high-impact improvements
3. **Iterate Incrementally**: Small, frequent improvements
4. **Validate Changes**: Test improvements thoroughly
5. **Document Learnings**: Record what works and what doesn't
6. **Share Knowledge**: Spread improvements across team
7. **Automate Improvements**: Make improvements sustainable
8. **Celebrate Wins**: Acknowledge progress

## Integration Points

This skill integrates with:
- **explore**: Identifies improvement opportunities
- **architect**: Designs improvement solutions
- **implement**: Executes improvements
- **validate**: Tests improvements
- **ship**: Deploys improvements

## Metrics for Success

- **Improvement Velocity**: How quickly you can implement improvements
- **Impact Measurement**: Ability to measure improvement effects
- **Regression Rate**: Low rate of introduced issues
- **Team Adoption**: Team embraces improvement culture
- **User Satisfaction**: Improved user experience metrics
