---
name: estimate
description: Workload estimation and effort sizing for features and tasks
category: planning
prerequisites:
  - Requirements or user stories defined
  - Technical approach identified
  - Team composition known
  - Historical velocity data available (if applicable)
output:
  type: estimate_document
  format: markdown
  sections:
    - task_breakdown
    - effort_estimates
    - risk_assessment
    - timeline
    - confidence_level
---

# Estimate Skill

## Purpose

Provide accurate effort estimates for features and tasks to enable reliable planning, resource allocation, and commitment. Break down work into measurable units and identify risks.

## When to Use

- Before sprint planning or quarterly planning
- When committing to delivery dates
- When evaluating feature feasibility
- For capacity planning
- When prioritizing work
- For build vs buy decisions

## Prerequisites

- Requirements or user stories defined
- Technical approach identified (or options evaluated)
- Team composition and availability known
- Historical velocity/takt time available (if applicable)

## Detailed Workflow

### Phase 1: Scope Analysis (10-15 minutes)

1. **Review requirements**
   - What exactly needs to be delivered?
   - What's included vs excluded?
   - What are the acceptance criteria?

2. **Identify technical components**
   - Frontend changes?
   - Backend changes?
   - Database changes?
   - Infrastructure changes?
   - Third-party integrations?

3. **Check dependencies**
   - What needs to be done first?
   - What can be parallelized?
   - What's blocked on others?

### Phase 2: Task Breakdown (15-20 minutes)

1. **Decompose into tasks**
   - Each task should be 1-4 hours
   - Clear definition of done
   - Independently estimatable
   - Testable

2. **Identify task types**
   - Development
   - Testing
   - Documentation
   - Review
   - Deployment

3. **Sequence tasks**
   - Dependencies
   - Critical path
   - Parallel opportunities

### Phase 3: Estimation (15-20 minutes)

1. **Choose estimation method**
   - **T-shirt sizing**: XS/S/M/L/XL for quick estimates
   - **Story points**: Fibonacci scale for relative estimation
   - **Hours**: For fixed-price or detailed planning
   - **T-shirt + points**: Combine for different granularity

2. **Estimate each task**
   - Consider complexity
   - Consider uncertainty
   - Consider testing effort
   - Consider review time

3. **Apply estimation technique**
   - **Planning poker**: Consensus-based team estimation
   - **Three-point estimate**: Optimistic, likely, pessimistic
   - **Reference-based**: Compare to similar past work
   - **Bottom-up**: Estimate components, sum up

### Phase 4: Risk Assessment (10-15 minutes)

1. **Identify risks**
   - Technical uncertainty
   - External dependencies
   - Scope ambiguity
   - Resource availability

2. **Add contingency**
   - Low risk: +10-20%
   - Medium risk: +20-40%
   - High risk: +40-70%
   - Unknown: +50-100%

3. **Document assumptions**
   - What we're assuming is true
   - What could invalidate estimates

### Phase 5: Timeline Creation (10-15 minutes)

1. **Map to calendar**
   - Account for meetings, holidays
   - Consider team availability
   - Include buffer for reviews

2. **Identify milestones**
   - Key checkpoints
   - Demo-able states
   - Decision points

3. **Define deliverables**
   - What's delivered at each milestone
   - How to verify progress

## Output Format

```markdown
## Estimate: [Feature/Project Name]

### Summary
- **Total effort**: [X] [hours/points/days]
- **Confidence**: [High/Medium/Low]
- **Timeline**: [start date] to [end date]
- **Team size**: [X] developers

### Task Breakdown

| # | Task | Type | Estimate | Owner | Dependencies |
|---|------|------|----------|-------|--------------|
| 1 | [task] | Dev | [X]h | [name] | - |
| 2 | [task] | Test | [X]h | [name] | #1 |
| 3 | [task] | Dev | [X]h | [name] | - |

### Effort Summary by Type
| Type | Hours | % of Total |
|------|-------|------------|
| Development | [X]h | [%] |
| Testing | [X]h | [%] |
| Review | [X]h | [%] |
| Documentation | [X]h | [%] |

### Risk Assessment
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [risk 1] | High/Med/Low | High/Med/Low | [mitigation] |

### Contingency
- Base estimate: [X]h
- Risk buffer: [X]h (+[%])
- **Total with buffer**: [X]h

### Timeline
```
Week 1: [milestone 1]
  - Task 1: [description]
  - Task 2: [description]

Week 2: [milestone 2]
  - Task 3: [description]
  - Task 4: [description]
```

### Milestones
| Milestone | Date | Deliverable | Status |
|-----------|------|-------------|--------|
| [milestone 1] | [date] | [what's delivered] | [status] |

### Assumptions
1. [assumption 1]
2. [assumption 2]

### Confidence Factors
- **High confidence**: [what's certain]
- **Medium confidence**: [what's likely]
- **Low confidence**: [what's uncertain]

### Alternatives Considered
| Approach | Effort | Tradeoff |
|----------|--------|----------|
| [approach 1] | [effort] | [tradeoff] |
```

## Estimation Techniques

### T-Shirt Sizing
| Size | Points | Description |
|------|--------|-------------|
| XS | 1 | Trivial, < 2 hours |
| S | 2-3 | Small, clear approach |
| M | 5-8 | Medium, some unknowns |
| L | 13-21 | Large, needs breakdown |
| XL | 34+ | Epic, must decompose |

### Three-Point Estimate
```
Expected = (Optimistic + 4×Likely + Pessimistic) / 6
StdDev = (Pessimistic - Optimistic) / 6
```

### Story Points to Hours (guidelines)
| Points | Hours (typical) |
|--------|-----------------|
| 1 | 1-2 |
| 2 | 2-4 |
| 3 | 4-8 |
| 5 | 8-16 |
| 8 | 16-32 |
| 13 | 32-48 |

## Examples

### Example 1: User Authentication Feature

**Scope**: Add OAuth login (Google, GitHub)

**Task breakdown**:
| Task | Estimate |
|------|----------|
| OAuth provider setup | 4h |
| Backend OAuth flow | 8h |
| Frontend login UI | 6h |
| Session management | 4h |
| Unit tests | 4h |
| Integration tests | 6h |
| Documentation | 2h |
| **Total** | **34h** |

**With risk buffer (+25%)**: 42.5h ≈ 5.5 days

### Example 2: Data Migration

**Scope**: Migrate 1M records from old to new schema

**Task breakdown**:
| Task | Estimate |
|------|----------|
| Migration script development | 8h |
| Data validation logic | 6h |
| Rollback mechanism | 4h |
| Testing with sample data | 4h |
| Production dry run | 4h |
| Production migration | 2h |
| Post-migration validation | 4h |
| **Total** | **32h** |

**With risk buffer (+40% due to data volume)**: 44.8h ≈ 5.5 days

## Error Handling

| Situation | Action |
|-----------|--------|
| Requirements unclear | Estimate with assumptions, document uncertainty |
| First time doing this | Add 50-100% buffer, note as learning |
| External dependency | Add waiting time, identify parallel work |
| Scope keeps changing | Re-estimate, communicate impact |
| Team velocity unknown | Use industry benchmarks, adjust after first sprint |
| Pressure to underestimate | Present ranges, document risks |

## Estimation Anti-Patterns

1. **Anchoring** - First estimate dominates discussion
2. **Optimism bias** - Everything takes longer than expected
3. **Ignoring testing** - Testing is part of the work
4. **Forgetting review** - Code review takes time
5. **No buffer** - Unknown unknowns happen
6. **Individual estimates** - Team consensus is better
7. **Too precise** - "42.5 hours" vs "about 5 days"

## Accuracy Improvement

1. **Track actuals** - Compare estimates to actuals
2. **Calibrate** - Adjust based on historical accuracy
3. **Break down more** - Smaller tasks = better estimates
4. **Involve the team** - Collective wisdom beats individual
5. **Use ranges** - "3-5 days" more honest than "4 days"
6. **Document assumptions** - Know what could invalidate estimate

## Metrics for Success

- Estimates within 20% of actual (after calibration)
- No surprise scope discovered during implementation
- Risks identified and mitigated proactively
- Stakeholders trust estimates
