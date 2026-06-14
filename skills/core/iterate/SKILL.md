---
name: iterate
description: Use when improving existing code, reducing technical debt, or optimizing performance after deployment
category: core
prerequisites:
  - Current system understanding
  - Performance metrics available
  - User feedback collected
  - Improvement objectives defined
output:
  type: improvement_plan
  format: markdown
---

# Iterate Skill

## Overview

Systematic approach to continuous improvement through analysis, optimization, and refinement of code, processes, and systems.

**Core principle:** Measure first, improve incrementally, validate changes.

## The Iron Law

```
NO IMPROVEMENT WITHOUT BASELINE MEASUREMENT
```

If you haven't measured current performance, you can't prove improvement.

## When to Use

- After production deployment
- When receiving user feedback
- During performance optimization
- For technical debt reduction
- During regular maintenance cycles

## Prerequisites

- Current system understanding and metrics
- User feedback and support tickets
- Performance monitoring data
- Clear improvement objectives

## Workflow

### Phase 1: Analysis (20-30 minutes)

1. **Evaluate current state** — review metrics, feedback, code quality
2. **Identify problems** — categorize issues, prioritize by impact/effort
3. **Map opportunities** — create improvement backlog, identify quick wins

### Phase 2: Planning (30-45 minutes)

1. **Define objectives** — measurable goals with success criteria
2. **Design solutions** — consider architectural implications, plan testing
3. **Create timeline** — break into tasks, identify dependencies

### Phase 3: Implementation (Variable)

**Quick wins first:**
- N+1 queries → batch loading
- God functions → extract method/class
- Minimal tests → comprehensive tests

**Then larger improvements:**
- Caching strategies
- Code quality (strict mode, linting)
- Developer experience (error messages, debugging)

### Phase 4: Validation (15-20 minutes)

1. **Test changes** — verify improvements with metrics
2. **Check regressions** — ensure nothing broke
3. **Document learnings** — record what worked

## Improvement Categories

| Category | Techniques |
|----------|------------|
| **Performance** | Caching, query optimization, connection pooling |
| **Code Quality** | Strict mode, linting, extract method/class |
| **Developer Experience** | Better error messages, debugging tools |
| **Reliability** | Circuit breaker, retry logic, graceful degradation |

## Common Pitfalls

| Pitfall | Symptom | Solution |
|---------|---------|----------|
| Gold plating | Over-engineering solutions | Focus on minimum viable improvement |
| Analysis paralysis | Endless planning without action | Time-box planning, start with quick wins |
| Regression | Improvements break functionality | Comprehensive testing, gradual rollout |
| Metric manipulation | Improving metrics but not UX | Focus on user-centric metrics |

## Best Practices

1. **Measure first** — Don't improve what you can't measure
2. **Focus on impact** — Prioritize high-impact improvements
3. **Iterate incrementally** — Small, frequent improvements
4. **Validate changes** — Test improvements thoroughly
5. **Document learnings** — Record what works and what doesn't

## Integration

**Related skills:**
- **explore** — Identifies improvement opportunities
- **architect** — Designs improvement solutions
- **implement** — Executes improvements
- **validate** — Tests improvements
- **ship** — Deploys improvements

**Workflow chain:**
```
iterate → explore → architect → implement → validate → ship
```

**Next skill:** After identifying improvements, use **explore** to understand the current system state before designing solutions.
