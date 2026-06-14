---
name: brainstorm
description: Collaborative requirements discovery and feature ideation
category: planning
triggers:
  - brainstorm
  - ideation
  - requirements gathering
  - feature planning
  - what should we build
  - explore options
  - design thinking
prerequisites:
  - Problem statement or opportunity identified
  - Stakeholder access for input
  - Understanding of constraints and goals
output:
  type: ideation_document
  format: markdown
  sections:
    - problem_definition
    - requirements
    - options
    - recommendations
    - action_plan
---

# Brainstorm Skill

## Purpose

Facilitate structured ideation and requirements discovery to ensure we build the right thing. Generate options, evaluate tradeoffs, and define clear requirements before implementation.

## When to Use

- Starting a new feature or project
- Requirements are unclear or ambiguous
- Multiple solutions exist and need comparison
- Stakeholder alignment needed
- Innovation or exploration is required
- Before estimation or roadmapping

## Prerequisites

- Problem statement or opportunity identified
- Key stakeholders available for input
- Constraints known (time, budget, technical)
- Current state understood

## Detailed Workflow

### Phase 1: Problem Definition (15-20 minutes)

1. **Clarify the problem**
   - What pain point are we solving?
   - Who experiences this problem?
   - How often does it occur?
   - What's the impact of not solving it?

2. **Define success criteria**
   - What does "done" look like?
   - How will we measure success?
   - What are the must-haves vs nice-to-haves?

3. **Identify constraints**
   - Time constraints
   - Budget limitations
   - Technical constraints
   - Regulatory requirements

### Phase 2: Exploration (20-30 minutes)

1. **Brainstorm solutions**
   - No judgment, all ideas welcome
   - Build on others' ideas
   - Quantity over quality initially
   - Think differently

2. **Categorize ideas**
   - Quick wins
   - Major projects
   - Fill-ins
   - Thankless tasks

3. **Research existing solutions**
   - What do competitors do?
   - What's been tried before?
   - What libraries/frameworks exist?
   - What's the state of the art?

### Phase 3: Evaluation (20-30 minutes)

1. **Define evaluation criteria**
   - User value
   - Technical feasibility
   - Implementation effort
   - Risk level
   - Strategic alignment

2. **Score options**
   - Use weighted scoring if needed
   - Consider both short and long term
   - Assess dependencies

3. **Analyze tradeoffs**
   - What do we gain/lose with each option?
   - What are the second-order effects?
   - What's the reversibility?

### Phase 4: Requirements Definition (20-30 minutes)

1. **User stories**
   - As a [user], I want [goal] so that [benefit]
   - Acceptance criteria for each
   - Priority (Must/Should/Could/Won't)

2. **Technical requirements**
   - API contracts
   - Data models
   - Integration points
   - Performance requirements

3. **Non-functional requirements**
   - Security requirements
   - Scalability needs
   - Availability targets
   - Compliance needs

### Phase 5: Synthesis (15-20 minutes)

1. **Document decisions**
   - What was chosen and why
   - What was rejected and why
   - Assumptions made

2. **Create action plan**
   - Next steps
   - Ownership
   - Timeline

## Output Format

```markdown
## Brainstorm: [Feature/Project Name]

### Problem Statement
[Clear description of the problem we're solving]

### Context
- **User pain**: [description]
- **Current state**: [what exists today]
- **Goal state**: [what we want to achieve]
- **Constraints**: [limitations to consider]

### Requirements

#### Must Have
- [ ] [requirement 1]
- [ ] [requirement 2]

#### Should Have
- [ ] [requirement 3]
- [ ] [requirement 4]

#### Could Have
- [ ] [requirement 5]

#### Won't Have (this time)
- [ ] [explicitly excluded]

### Options Evaluated

#### Option 1: [Name]
- **Approach**: [description]
- **Pros**: [benefits]
- **Cons**: [drawbacks]
- **Effort**: [estimate]
- **Risk**: [level]

#### Option 2: [Name]
- [same structure]

#### Option 3: [Name]
- [same structure]

### Recommendation
**Recommended approach**: [Option X]

**Rationale**: [why this option best fits our needs]

### Decision Log
| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| [decision 1] | [reasoning] | [other options] |

### Open Questions
1. [question that needs answering]
2. [question that needs answering]

### Next Steps
1. [action item 1] - [owner] - [due date]
2. [action item 2] - [owner] - [due date]

### Success Metrics
| Metric | Target | How to Measure |
|--------|--------|----------------|
| [metric 1] | [target] | [measurement method] |
```

## Brainstorming Techniques

### Brainwriting (6-3-5)
6 people write 3 ideas in 5 minutes, then pass to next person

### SCAMPER
- **S**ubstitute - What can be replaced?
- **C**ombine - What can be merged?
- **A**dapt - What can be adapted?
- **M**odify - What can be changed?
- **P**ut to other use - What else could it do?
- **E**liminate - What can be removed?
- **R**everse - What if we do the opposite?

### How Might We
Reframe problems as opportunities: "How might we [achieve goal] for [user]?"

### Impact/Effort Matrix
Plot ideas on 2x2 grid to identify quick wins

## Examples

### Example 1: User Dashboard Feature

**Problem**: Users can't see their activity at a glance

**Requirements gathered**:
- Must show recent activity (last 30 days)
- Must be customizable
- Should load in < 2 seconds
- Could include export functionality

**Options evaluated**:
1. Server-rendered dashboard (fast, limited interactivity)
2. Client-side SPA (interactive, slower initial load)
3. Hybrid approach (best of both, more complex)

**Recommendation**: Hybrid approach with SSR for initial load

### Example 2: API Redesign

**Problem**: Current API is inconsistent and hard to use

**Requirements gathered**:
- Must maintain backward compatibility
- Must follow REST best practices
- Should support versioning
- Could include GraphQL alternative

**Options evaluated**:
1. Version all at once (clean, big bang)
2. Gradual migration (safer, longer)
3. New API alongside old (flexible, confusing)

**Recommendation**: Gradual migration with versioning

## Error Handling

| Situation | Action |
|-----------|--------|
| Requirements unclear | Ask clarifying questions, don't assume |
| Stakeholders disagree | Facilitate discussion, document dissent |
| Too many options | Use weighted scoring to narrow |
| No clear winner | Identify what would make each option viable |
| Constraints conflict | Surface tradeoffs for decision makers |
| Scope creep | Return to success criteria, defer additions |

## Facilitation Tips

1. **Start with the problem** - Don't jump to solutions
2. **All ideas welcome** - No judgment during brainstorming
3. **Build on ideas** - "Yes, and..." not "No, but..."
4. **Time-box discussions** - Stay focused
5. **Document everything** - Capture ideas in writing
6. **Summarize decisions** - Make outcomes clear
7. **Assign owners** - Every action needs someone

## Metrics for Success

- Requirements clear enough to estimate
- Stakeholder alignment achieved
- Options thoroughly evaluated
- Decisions documented with rationale
- Action items assigned with owners
