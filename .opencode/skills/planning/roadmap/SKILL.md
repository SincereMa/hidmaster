---
name: roadmap
description: Strategic project roadmap creation and milestone planning
category: planning
triggers:
  - roadmap
  - project planning
  - milestone planning
  - quarterly planning
  - release planning
  - strategic planning
  - what should we build next
prerequisites:
  - Product vision or goals defined
  - Features prioritized or backlog exists
  - Team capacity known
  - Timeline constraints identified
output:
  type: roadmap_document
  format: markdown
  sections:
    - vision
    - priorities
    - milestones
    - timeline
    - dependencies
    - success_metrics
---

# Roadmap Skill

## Purpose

Create a strategic roadmap that aligns team effort with business goals, communicates priorities clearly, and provides a clear path from current state to desired future state.

## When to Use

- Quarterly or annual planning
- After major feature completion
- When priorities shift
- For stakeholder alignment
- When onboarding new team members
- For board/investor updates

## Prerequisites

- Product vision or goals defined
- Features prioritized (or backlog exists)
- Team capacity and velocity known
- Market/competitive context understood
- Technical constraints known

## Detailed Workflow

### Phase 1: Strategic Alignment (20-30 minutes)

1. **Review vision and goals**
   - What's the long-term vision?
   - What are the quarterly/annual goals?
   - What are the key results (OKRs)?

2. **Assess current state**
   - What's been completed?
   - What's in progress?
   - What's blocked?

3. **Identify strategic themes**
   - Growth
   - Retention
   - Technical debt
   - Platform stability
   - Innovation

### Phase 2: Feature Prioritization (25-35 minutes)

1. **Gather feature candidates**
   - From backlog
   - From stakeholder requests
   - From technical needs
   - From market research

2. **Evaluate each feature**
   - Business value (high/medium/low)
   - User impact (high/medium/low)
   - Technical effort (high/medium/low)
   - Strategic alignment (strong/moderate/weak)
   - Risk level (high/medium/low)

3. **Prioritize using framework**
   - **RICE**: Reach × Impact × Confidence / Effort
   - **Value vs Effort**: 2x2 matrix
   - **MoSCoW**: Must/Should/Could/Won't
   - **Kano**: Basic/Performance/Excitement

### Phase 3: Milestone Definition (20-30 minutes)

1. **Define milestones**
   - What's delivered at each milestone?
   - What's the goal of this milestone?
   - What dependencies exist?

2. **Sequence milestones**
   - Logical dependencies
   - Value delivery order
   - Risk mitigation order

3. **Set milestone criteria**
   - Definition of done
   - Success criteria
   - Go/no-go checkpoints

### Phase 4: Timeline Creation (15-20 minutes)

1. **Map to calendar**
   - Account for team capacity
   - Include buffer for unknowns
   - Consider external deadlines

2. **Identify critical path**
   - Longest dependency chain
   - Bottlenecks
   - Parallel opportunities

3. **Set review points**
   - Weekly check-ins
   - Monthly reviews
   - Quarterly adjustments

### Phase 5: Communication (15-20 minutes)

1. **Create stakeholder versions**
   - Executive summary (high-level)
   - Team version (detailed)
   - External version (for partners/customers)

2. **Define metrics**
   - How to measure progress
   - How to measure success
   - How to measure failure

3. **Plan reviews**
   - When to revisit roadmap
   - How to handle changes
   - Who decides priority shifts

## Output Format

```markdown
## Product Roadmap: [Product Name]

### Vision
[1-2 sentence vision statement]

### Strategic Goals (Q[X] 20XX)
1. [goal 1]
2. [goal 2]
3. [goal 3]

### Roadmap Overview

```
[Timeline visualization]
Q1 2026          Q2 2026          Q3 2026          Q4 2026
|----------------|----------------|----------------|----------------|
[Foundation]     [Growth]        [Scale]          [Innovate]
```

### Milestone 1: [Name] (Q1 20XX)
**Goal**: [what this milestone achieves]

**Features**:
- [feature 1] - [priority] - [effort]
- [feature 2] - [priority] - [effort]

**Success Criteria**:
- [metric 1]: [target]
- [metric 2]: [target]

**Dependencies**:
- [dependency 1]
- [dependency 2]

**Timeline**: [start] - [end]
**Owner**: [name]

### Milestone 2: [Name] (Q2 20XX)
[Same structure]

### Milestone 3: [Name] (Q3 20XX)
[Same structure]

### Feature Priority Matrix

| Feature | Business Value | User Impact | Effort | Priority | Milestone |
|---------|---------------|-------------|--------|----------|-----------|
| [feature 1] | High | High | Medium | P1 | M1 |
| [feature 2] | High | Medium | Low | P1 | M1 |
| [feature 3] | Medium | High | High | P2 | M2 |

### Dependencies & Risks

| Dependency | Type | Mitigation |
|------------|------|------------|
| [dependency] | External | [mitigation] |
| [dependency] | Technical | [mitigation] |

### Capacity Planning

| Team | Velocity | Capacity/Quarter | Allocation |
|------|----------|------------------|------------|
| Frontend | [X] pts/sprint | [X] pts | [%] |
| Backend | [X] pts/sprint | [X] pts | [%] |
| Platform | [X] pts/sprint | [X] pts | [%] |

### Success Metrics

| Metric | Current | Q1 Target | Q2 Target | Q3 Target |
|--------|---------|-----------|-----------|-----------|
| [metric 1] | [value] | [target] | [target] | [target] |
| [metric 2] | [value] | [target] | [target] | [target] |

### Review Cadence

| Review | Frequency | Participants | Purpose |
|--------|-----------|--------------|---------|
| Standup | Daily | Team | Progress update |
| Sprint Review | Bi-weekly | Team + Stakeholders | Demo & feedback |
| Roadmap Review | Monthly | Leadership | Priority adjustment |
| Strategic Review | Quarterly | Executives | Goal alignment |

### Communication Plan

| Audience | Version | Frequency | Owner |
|----------|---------|-----------|-------|
| Executives | High-level summary | Monthly | [name] |
| Team | Detailed roadmap | Weekly | [name] |
| Customers | Feature preview | Quarterly | [name] |

### Change Log

| Date | Change | Reason | Approved By |
|------|--------|--------|-------------|
| [date] | [what changed] | [why] | [who] |
```

## Prioritization Frameworks

### RICE Scoring
```
RICE Score = (Reach × Impact × Confidence) / Effort

Reach: Number of users affected per quarter
Impact: 3 = massive, 2 = high, 1 = medium, 0.5 = low
Confidence: 100% = sure, 80% = likely, 50% = maybe
Effort: Person-months
```

### Value vs Effort Matrix

```
High Value | Quick Wins    | Major Projects
           | (Do First)    | (Plan Carefully)
-----------+---------------+----------------
Low Value  | Fill-ins      | Thankless Tasks
           | (Delegate)    | (Avoid)
           +---------------+----------------
           Low Effort      High Effort
```

### MoSCoW Prioritization

| Priority | Description | Percentage |
|----------|-------------|------------|
| Must Have | Critical, won't launch without | 60% |
| Should Have | Important, but not critical | 20% |
| Could Have | Nice to have if time permits | 15% |
| Won't Have | Explicitly excluded this time | 5% |

## Examples

### Example 1: SaaS Product Roadmap

**Vision**: Become the leading platform for team collaboration

**Q1 2026 - Foundation**:
- User authentication & profiles (P1)
- Basic project creation (P1)
- Team invitations (P2)
- **Success**: 100 beta users, 80% retention

**Q2 2026 - Growth**:
- Real-time collaboration (P1)
- File sharing (P1)
- Integrations (Slack, GitHub) (P2)
- **Success**: 500 users, NPS > 40

**Q3 2026 - Scale**:
- Advanced permissions (P1)
- Audit logs (P1)
- API for developers (P2)
- **Success**: 2000 users, < 1% churn

### Example 2: Technical Debt Roadmap

**Vision**: Achieve 99.9% uptime and sub-100ms response times

**Q1 - Stabilize**:
- Fix critical bugs (P1)
- Add monitoring (P1)
- Document architecture (P2)
- **Success**: 99.5% uptime

**Q2 - Optimize**:
- Database optimization (P1)
- Caching layer (P1)
- Load testing (P2)
- **Success**: 99.9% uptime, p95 < 200ms

**Q3 - Scale**:
- Horizontal scaling (P1)
- CDN implementation (P1)
- Disaster recovery (P2)
- **Success**: Handle 10x traffic

## Error Handling

| Situation | Action |
|-----------|--------|
| Competing priorities | Use scoring framework, escalate to leadership |
| Capacity insufficient | Adjust scope, extend timeline, or add resources |
| Dependencies blocked | Identify workarounds, adjust sequence |
| Market changes | Re-evaluate priorities, communicate changes |
| Estimates wrong | Re-plan, be transparent about adjustments |
| Stakeholder disagreement | Facilitate alignment, document decisions |

## Roadmap Anti-Patterns

1. **Over-committing** - Promise too much, deliver little
2. **Too detailed** - Long-term plans will change
3. **No flexibility** - Build in buffer for surprises
4. **Ignoring tech debt** - Allocate capacity for maintenance
5. **Feature factory** - Focus on outcomes, not outputs
6. **No communication** - Roadmap exists but nobody knows it
7. **Never updating** - Roadmap is stale after first month

## Communication Best Practices

1. **Be honest** - Uncertainty is okay, don't over-promise
2. **Focus on outcomes** - What users/business gets, not what's built
3. **Show progress** - Update regularly, celebrate milestones
4. **Invite feedback** - Roadmap should be a conversation
5. **Adapt quickly** - Change is inevitable, embrace it

## Metrics for Success

- Milestones hit on time (80%+)
- Stakeholders aligned on priorities
- Team understands roadmap and their role
- Roadmap reviewed and updated regularly
- Business outcomes achieved
