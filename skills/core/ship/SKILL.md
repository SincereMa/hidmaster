---
name: ship
description: Use when merging code changes, creating releases, or deploying to production
category: core
prerequisites:
  - Code validated and tested
  - Review completed
  - Release strategy defined
  - Deployment environment ready
output:
  type: deployment_package
  format: mixed
  includes:
    - merged_code
    - release_notes
    - rollback_plan
---

# Ship Skill

## Overview

Systematic approach to merging code changes, creating releases, and deploying to production.

**Core principle:** Verify tests → Prepare release → Deploy → Monitor → Rollback if needed.

## The Iron Law

```
NO DEPLOYMENT WITHOUT PASSING TESTS
```

If tests don't pass, you cannot ship. Period.

## When to Use

- Merging pull requests
- Creating releases
- Deploying to production
- Hotfix deployments
- Rolling back changes

## Prerequisites

- Code changes validated and tested
- Code review completed and approved
- Deployment environment configured

## Workflow

### Phase 1: Pre-Ship (15-20 minutes)

1. **Final validation** — run full test suite, verify CI/CD passes
2. **Release preparation** — update versions, generate changelog, create release notes
3. **Communication** — notify stakeholders, plan deployment window

### Phase 2: Code Integration (10-15 minutes)

1. **PR finalization** — rebase on main, resolve conflicts, final commit
2. **Review completion** — address all comments, get approval
3. **Merge strategy** — merge commit (history), squash (clean), or rebase (linear)

### Phase 3: Release Creation (20-30 minutes)

1. **Version management** — semantic versioning (MAJOR.MINOR.PATCH)
2. **Release notes** — features, fixes, breaking changes, migration guide
3. **Artifacts** — create tag, push, create GitHub/GitLab release

### Phase 4: Deployment (30-45 minutes)

1. **Staging** — deploy, run smoke tests, validate
2. **Production** — deploy, monitor, verify health checks
3. **Post-deploy** — run production tests, monitor error rates

### Phase 5: Post-Ship (15-20 minutes)

1. **Monitoring** — watch metrics, error spikes, user feedback
2. **Documentation** — update API docs, notify stakeholders
3. **Retrospective** — document process, note issues, plan improvements

## Deployment Strategies

| Strategy | Use When | Tradeoff |
|----------|----------|----------|
| **Rolling** | Default, zero-downtime | Gradual rollout |
| **Blue-Green** | Need instant rollback | Double infrastructure |
| **Canary** | Risk-averse, high traffic | Complex routing |

## Release Checklist

### Pre-Release
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog generated

### Release
- [ ] Code merged to main
- [ ] Release tag created
- [ ] Staging deployment successful
- [ ] Production deployment started
- [ ] Health checks passing

### Post-Release
- [ ] Monitoring active
- [ ] Error rates normal
- [ ] User feedback monitored

## Common Issues

| Issue | Symptom | Solution |
|-------|---------|----------|
| Failed tests | CI/CD fails | Fix issues, don't bypass |
| Deployment failure | App won't start | Rollback immediately |
| Performance degradation | Slow responses | Scale up or rollback |
| Config error | App misbehavior | Fix config, redeploy |

## Best Practices

1. **Automate everything** — Manual steps lead to errors
2. **Deploy small changes** — Easier to debug and rollback
3. **Monitor actively** — Don't wait for user reports
4. **Have rollback plan** — Always know how to undo
5. **Communicate clearly** — Keep stakeholders informed

## Integration

**Related skills:**
- **validate** — Gates deployment decisions
- **implement** — Deploys implemented changes
- **iterate** — Feeds back improvements

**Workflow chain:**
```
validate → ship → iterate (if issues found)
```

**Next skill:** After shipping, use **iterate** to monitor production and plan improvements.
