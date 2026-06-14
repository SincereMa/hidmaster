---
name: architect
description: Technical design decisions and architecture planning
category: core
prerequisites:
  - Completed exploration phase
  - Understanding of requirements
  - Knowledge of constraints
  - Access to architectural patterns
output:
  type: design_document
  format: markdown
  sections:
    - problem_statement
    - design_options
    - recommended_approach
    - implementation_plan
    - risk_assessment
---

# Architect Skill

## Overview

Make informed technical design decisions by evaluating options, considering trade-offs, and creating actionable implementation plans. This skill transforms exploration findings into concrete architectural decisions.

## When to Use

- Designing new features or components
- Refactoring existing systems
- Evaluating technology choices
- Planning complex implementations
- Creating technical specifications
- Reviewing proposed changes
- Making build vs buy decisions

## Prerequisites

- Completed exploration phase (understanding of current system)
- Clear requirements and constraints defined
- Knowledge of team capabilities and preferences
- Understanding of business context and timelines

## Detailed Workflow

### Phase 1: Problem Definition (10-15 minutes)

**Step 1.1: Requirement Analysis**
- Distill functional requirements (what it must do)
- Identify non-functional requirements (performance, security, scalability)
- Clarify constraints (time, budget, technology, team)
- Define success criteria and metrics

**Step 1.2: Context Mapping**
- Document current system state
- Identify integration points and dependencies
- Map stakeholders and their concerns
- Note technical debt and legacy constraints

**Step 1.3: Problem Framing**
- State the problem clearly and concisely
- Identify root causes vs symptoms
- Define scope boundaries (what's in/out)
- Establish priority and urgency

### Phase 2: Option Generation (20-30 minutes)

**Step 2.1: Brainstorm Solutions**
- Generate 3-5 viable approaches
- Consider both incremental and radical solutions
- Include both technical and process alternatives
- Don't filter too early - quantity leads to quality

**Step 2.2: Option Analysis**
For each option, evaluate:
- **Feasibility**: Can we actually build this?
- **Complexity**: How hard is implementation?
- **Risk**: What could go wrong?
- **Time**: How long will it take?
- **Cost**: What are resource requirements?
- **Benefits**: What value does it provide?
- **Trade-offs**: What are we giving up?

**Step 2.3: Comparison Matrix**
Create structured comparison:
```
| Criteria          | Option A | Option B | Option C |
|-------------------|----------|----------|----------|
| Implementation    | 3 days   | 1 week   | 2 days   |
| Performance       | Good     | Excellent| Fair     |
| Maintainability   | High     | Medium   | High     |
| Risk Level        | Low      | Medium   | High     |
```

### Phase 3: Decision Making (15-20 minutes)

**Step 3.1: Trade-off Analysis**
- Identify critical trade-offs
- Align with business priorities
- Consider long-term implications
- Document decision rationale

**Step 3.2: Risk Assessment**
- Identify technical risks
- Assess probability and impact
- Develop mitigation strategies
- Plan contingency approaches

**Step 3.3: Decision Documentation**
- Record final decision with rationale
- Document alternatives considered
- Note assumptions and constraints
- Define success metrics

### Phase 4: Implementation Planning (20-30 minutes)

**Step 4.1: High-Level Design**
- Create component diagrams
- Define interfaces and contracts
- Plan data flow and state management
- Identify architectural boundaries

**Step 4.2: Detailed Design**
- Break down into implementable tasks
- Define API contracts and data models
- Plan error handling and edge cases
- Consider security implications

**Step 4.3: Implementation Roadmap**
- Create phased implementation plan
- Identify dependencies and prerequisites
- Plan testing strategy
- Define rollback procedures

## Design Patterns and Techniques

### Architecture Patterns
```
# Layered Architecture
┌─────────────────────────────┐
│      Presentation Layer     │
├─────────────────────────────┤
│      Business Logic Layer   │
├─────────────────────────────┤
│      Data Access Layer      │
├─────────────────────────────┤
│      Infrastructure Layer   │
└─────────────────────────────┘

# Microservices Pattern
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Service │  │ Service │  │ Service │
│    A    │←→│    B    │←→│    C    │
└─────────┘  └─────────┘  └─────────┘
      ↑           ↑           ↑
      └───────────┼───────────┘
                  │
            ┌─────┴─────┐
            │   API     │
            │  Gateway  │
            └───────────┘
```

### Decision Frameworks
```
# Architecture Decision Record (ADR)
## Title: [Decision Title]
### Status: [Proposed | Accepted | Deprecated | Superseded]
### Context:
[What is the issue? What forces are at play?]
### Decision:
[What is the change we are proposing and/or doing?]
### Consequences:
[What becomes easier or harder? What are the trade-offs?]
```

### Design Evaluation Checklist
- [ ] Meets functional requirements
- [ ] Addresses non-functional requirements
- [ ] Aligns with existing architecture
- [ ] Follows team conventions
- [ ] Is implementable within constraints
- [ ] Has clear rollback strategy
- [ ] Includes monitoring and observability
- [ ] Considers security implications

## Output Format

### Design Document Template
```markdown
# Technical Design: [Feature/Component Name]

## Problem Statement
[Clear description of what needs to be solved]

## Requirements
### Functional
- [Requirement 1]
- [Requirement 2]

### Non-Functional
- Performance: [Specific metrics]
- Security: [Requirements]
- Scalability: [Expectations]

## Design Options

### Option A: [Name]
**Description**: [Brief description]
**Pros**:
- [Pro 1]
- [Pro 2]

**Cons**:
- [Con 1]
- [Con 2]

**Effort**: [Time estimate]
**Risk**: [Risk level]

### Option B: [Name]
[Similar structure]

## Recommended Approach
[Chosen option with detailed justification]

## Implementation Plan
### Phase 1: [Name] (Duration)
- [ ] Task 1
- [ ] Task 2

### Phase 2: [Name] (Duration)
- [ ] Task 1
- [ ] Task 2

## Risk Assessment
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | High | Medium | [Strategy] |

## Success Criteria
- [Metric 1]: [Target]
- [Metric 2]: [Target]

## Open Questions
- [Question 1]
- [Question 2]
```

## Examples

### Example 1: API Rate Limiting Design
**Problem**: API experiencing abuse, need rate limiting

**Options Considered**:
1. **In-memory sliding window**: Simple, fast, but not distributed
2. **Redis-based token bucket**: Distributed, persistent, more complex
3. **API Gateway solution**: Managed, expensive, less control

**Decision**: Redis-based token bucket
**Rationale**: Need distributed solution for multi-server deployment, acceptable complexity for team

**Implementation Plan**:
1. Set up Redis connection (1 day)
2. Implement token bucket algorithm (2 days)
3. Add middleware integration (1 day)
4. Create monitoring dashboard (1 day)
5. Test with load testing (1 day)

### Example 2: Database Migration Strategy
**Problem**: Need to migrate from MySQL to PostgreSQL

**Decision**: Phased migration with dual-write
**Rationale**: Minimize risk, allow rollback, maintain service during transition

## Error Handling

### Common Design Pitfalls

1. **Over-Engineering**
   - **Symptom**: Building for imagined future requirements
   - **Solution**: Focus on current needs, design for extensibility

2. **Analysis Paralysis**
   - **Symptom**: Endless evaluation without decision
   - **Solution**: Time-box design phase, make reversible decisions

3. **Ignoring Constraints**
   - **Symptom**: Design that can't be implemented
   - **Solution**: Validate feasibility early, involve implementation team

4. **Copy-Paste Architecture**
   - **Symptom**: Applying patterns without understanding fit
   - **Solution**: Evaluate each pattern against specific requirements

### Recovery Strategies

- **Stuck on Options**: Create pros/cons list, set decision deadline
- **Unclear Requirements**: Stakeholder interviews, prototype validation
- **Technical Uncertainty**: Spike solutions, proof of concepts
- **Team Disagreement**: Data-driven decisions, A/B testing alternatives

## Best Practices

1. **Document Decisions**: Record rationale for future reference
2. **Consider Trade-offs**: Every decision has costs
3. **Validate Early**: Prototype risky assumptions
4. **Involve Stakeholders**: Get input from affected parties
5. **Plan for Failure**: Include rollback and monitoring
6. **Keep it Simple**: Prefer simplicity over cleverness
7. **Think Long-term**: Consider maintenance and evolution
8. **Be Reversible**: When possible, make decisions reversible

## Integration

**Related skills:**
- **explore** — Informed by exploration findings
- **implement** — Guides implementation approach
- **validate** — Defines testing requirements
- **ship** — Plans deployment strategy
- **iterate** — Feeds back into improvement cycle

**Workflow chain:**
```
explore → architect → implement → validate → ship
```

**Next skill:** After architecture decisions are made, use **implement** to transform design into working code.

## Metrics for Success

- **Decision Quality**: Decisions stand the test of time
- **Implementation Success**: Plans are followed successfully
- **Stakeholder Alignment**: All parties understand and support decisions
- **Risk Mitigation**: Identified risks are managed effectively
- **Documentation Value**: Design docs are referenced and useful
