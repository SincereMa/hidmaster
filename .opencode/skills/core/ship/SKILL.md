---
name: ship
description: Merging and release management
category: core
triggers:
  - "merge code"
  - "release feature"
  - "deploy changes"
  - "ship to production"
  - "create pull request"
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
    - deployment_config
    - rollback_plan
---

# Ship Skill

## Overview

Systematic approach to merging code changes, creating releases, and deploying to production. This skill ensures reliable, repeatable, and safe deployment processes with proper rollback strategies.

## When to Use

- Merging pull requests
- Creating releases
- Deploying to production
- Hotfix deployments
- Rolling back changes
- Managing release branches
- Coordinating deployments

## Prerequisites

- Code changes validated and tested
- Code review completed and approved
- Release strategy and versioning scheme defined
- Deployment environment configured
- Access to deployment tools and infrastructure

## Detailed Workflow

### Phase 1: Pre-Ship Preparation (15-20 minutes)

**Step 1.1: Final Validation**
- Run full test suite one final time
- Verify all CI/CD checks pass
- Check for any unresolved conflicts
- Validate deployment configuration

**Step 1.2: Release Preparation**
- Update version numbers
- Generate changelog
- Create release notes
- Prepare deployment artifacts

**Step 1.3: Communication Planning**
- Notify stakeholders of upcoming release
- Coordinate with team members
- Plan deployment window
- Prepare rollback communication plan

### Phase 2: Code Integration (10-15 minutes)

**Step 2.1: Pull Request Finalization**
```bash
# Ensure branch is up to date
git fetch origin
git rebase origin/main

# Resolve any conflicts
git merge --abort  # if needed
git rebase -i HEAD~5  # interactive rebase if needed

# Final commit with conventional format
git commit -m "feat: implement user authentication

- Add JWT token generation
- Implement refresh token flow
- Add rate limiting
- Update API documentation

Closes #123"
```

**Step 2.2: Code Review Completion**
- Address all review comments
- Get final approval from reviewers
- Ensure all discussions resolved
- Verify CI/CD passes on final version

**Step 2.3: Merge Strategy Selection**
- **Merge Commit**: Preserves complete history
- **Squash Merge**: Clean history for features
- **Rebase**: Linear history for clean branches

### Phase 3: Release Creation (20-30 minutes)

**Step 3.1: Version Management**
```bash
# Semantic versioning
# Major.Minor.Patch
# 1.2.3

# Update version
npm version patch  # 1.2.3 → 1.2.4
npm version minor  # 1.2.3 → 1.3.0
npm version major  # 1.2.3 → 2.0.0

# Create release branch (if needed)
git checkout -b release/v1.3.0
```

**Step 3.2: Release Notes Generation**
```markdown
# Release v1.3.0

## Features
- User authentication with JWT
- Rate limiting for API endpoints
- Enhanced error handling

## Bug Fixes
- Fixed memory leak in connection pooling
- Resolved race condition in user creation

## Improvements
- Performance optimization for user queries
- Updated dependencies to latest versions

## Breaking Changes
- API endpoint /users now requires authentication
- Response format changed for error responses

## Migration Guide
1. Update API clients to handle new error format
2. Add authentication headers to all requests

## Dependencies Updated
- express: 4.18.2 → 4.19.0
- jsonwebtoken: 9.0.0 → 9.0.1
```

**Step 3.3: Release Artifact Creation**
```bash
# Create release tag
git tag -a v1.3.0 -m "Release v1.3.0: User authentication feature"

# Push tag
git push origin v1.3.0

# Create GitHub release (if using GitHub)
gh release create v1.3.0 \
  --title "v1.3.0: User Authentication" \
  --notes-file CHANGELOG.md
```

### Phase 4: Deployment (30-45 minutes)

**Step 4.1: Staging Deployment**
```bash
# Deploy to staging
npm run deploy:staging

# Run smoke tests
npm run test:smoke:staging

# Validate in staging environment
npm run validate:staging
```

**Step 4.2: Production Deployment**
```bash
# Create deployment
npm run deploy:production

# Monitor deployment
npm run monitor:deployment

# Verify health checks
npm run health:check
```

**Step 4.3: Post-Deployment Validation**
```bash
# Run production tests
npm run test:production

# Monitor error rates
npm run monitor:errors

# Check performance metrics
npm run monitor:performance
```

### Phase 5: Post-Ship Activities (15-20 minutes)

**Step 5.1: Monitoring and Observation**
- Monitor application metrics
- Watch for error spikes
- Check user feedback channels
- Verify business metrics

**Step 5.2: Documentation Updates**
- Update API documentation
- Notify stakeholders of release
- Update project wiki/docs
- Archive release artifacts

**Step 5.3: Retrospective Preparation**
- Document deployment process
- Note any issues encountered
- Record lessons learned
- Plan improvements for next release

## Deployment Strategies

### Blue-Green Deployment
```yaml
# blue-green-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-blue
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: app
        image: app:v1.3.0
        ports:
        - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: app-blue  # Switch to app-green for new version
  ports:
  - port: 80
    targetPort: 8080
```

### Canary Deployment
```yaml
# canary-deploy.yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: app-canary
spec:
  hosts:
  - app
  http:
  - route:
    - destination:
        host: app
        subset: stable
      weight: 90
    - destination:
        host: app
        subset: canary
      weight: 10
```

### Rolling Deployment
```yaml
# rolling-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 6
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 2
      maxUnavailable: 1
```

## Release Checklist

### Pre-Release
- [ ] All tests passing
- [ ] Code review completed
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog generated
- [ ] Release notes prepared
- [ ] Stakeholders notified

### Release
- [ ] Code merged to main
- [ ] Release tag created
- [ ] Artifacts built
- [ ] Staging deployment successful
- [ ] Smoke tests passing
- [ ] Production deployment started
- [ ] Health checks passing

### Post-Release
- [ ] Monitoring active
- [ ] Error rates normal
- [ ] Performance metrics good
- [ ] User feedback monitored
- [ ] Documentation published
- [ ] Team notified
- [ ] Retrospective scheduled

## Output Format

### Deployment Report Template
```markdown
# Deployment Report: v1.3.0

## Deployment Summary
- **Version**: v1.3.0
- **Date**: [Date]
- **Deployer**: [Name/AI]
- **Duration**: [Time]

## Changes Included
- Feature: User authentication
- Fix: Memory leak in connection pooling
- Improvement: API performance optimization

## Deployment Steps
1. ✅ Pre-deployment checks passed
2. ✅ Staging deployment successful
3. ✅ Smoke tests passing
4. ✅ Production deployment completed
5. ✅ Health checks passing
6. ✅ Monitoring active

## Validation Results
| Check | Status | Notes |
|-------|--------|-------|
| Unit Tests | ✅ PASS | 100% pass rate |
| Integration Tests | ✅ PASS | All endpoints working |
| E2E Tests | ✅ PASS | User flows verified |
| Performance | ✅ PASS | Response time < 200ms |
| Security | ✅ PASS | No vulnerabilities found |

## Rollback Plan
### Trigger Conditions
- Error rate > 5%
- Response time > 500ms
- Critical bug reported

### Rollback Steps
1. Switch traffic to previous version
2. Verify rollback successful
3. Notify stakeholders
4. Investigate root cause

## Monitoring Setup
- **Error Monitoring**: [Tool/Link]
- **Performance Monitoring**: [Tool/Link]
- **Business Metrics**: [Tool/Link]
- **Log Aggregation**: [Tool/Link]

## Sign-off
- [ ] Development Lead
- [ ] Operations Lead
- [ ] Product Owner
- [ ] QA Lead
```

## Examples

### Example 1: Feature Release
**Feature**: User authentication system

**Release Process**:
1. Feature branch completed and tested
2. Pull request created and reviewed
3. Merged to main with squash merge
4. Version bumped to 1.3.0
5. Release notes generated
6. Deployed to staging, validated
7. Deployed to production with canary
8. Monitored for 30 minutes
9. Full traffic shifted

**Result**: Successful release with zero downtime.

### Example 2: Hotfix Deployment
**Issue**: Critical security vulnerability

**Hotfix Process**:
1. Security patch developed and tested
2. Fast-tracked through review
3. Merged directly to main
4. Version bumped to 1.3.1
5. Emergency deployment initiated
6. Deployed with rolling update
7. Verified fix working

**Result**: Vulnerability patched within 2 hours.

## Error Handling

### Common Deployment Issues

1. **Failed Tests**
   - **Symptom**: CI/CD pipeline fails
   - **Solution**: Fix issues, don't bypass checks

2. **Deployment Failures**
   - **Symptom**: Application won't start
   - **Solution**: Rollback immediately, investigate

3. **Performance Degradation**
   - **Symptom**: Slow response times
   - **Solution**: Scale up or rollback

4. **Configuration Errors**
   - **Symptom**: Application misbehavior
   - **Solution**: Fix configuration, redeploy

### Recovery Strategies

- **Failed Deployment**: Rollback to previous version
- **Performance Issues**: Scale horizontally or vertically
- **Security Issues**: Deploy hotfix immediately
- **Data Issues**: Restore from backup if needed

## Best Practices

1. **Automate Everything**: Manual steps lead to errors
2. **Test in Production-like Environment**: Catch issues early
3. **Deploy Small Changes**: Easier to debug and rollback
4. **Monitor Actively**: Don't wait for user reports
5. **Have Rollback Plan**: Always know how to undo
6. **Communicate Clearly**: Keep stakeholders informed
7. **Document Process**: Improve for next time
8. **Learn from Incidents**: Post-mortem every issue

## Integration Points

This skill integrates with:
- **validate**: Gates deployment decisions
- **implement**: Deploys implemented changes
- **iterate**: Feeds back improvements
- **explore**: Verifies deployment success

## Metrics for Success

- **Deployment Frequency**: How often you deploy
- **Lead Time**: Time from code to production
- **Change Failure Rate**: Percentage of failed deployments
- **Mean Time to Recovery**: How quickly you recover from issues
- **Deployment Success Rate**: Percentage of successful deployments
