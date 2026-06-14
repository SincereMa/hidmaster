---
name: code-review
description: Systematic code quality review for readability, maintainability, and correctness
category: review
triggers:
  - review code
  - code review
  - check code quality
  - code standards
  - best practices
  - code smell
  - naming conventions
  - code style
prerequisites:
  - Code changes ready for review
  - Access to codebase and context
  - Understanding of project conventions
output:
  type: review_report
  format: markdown
  sections:
    - quality_assessment
    - issues_found
    - suggestions
    - approval_status
---

# Code Review Skill

## Purpose

Systematically evaluate code quality across dimensions of readability, maintainability, correctness, and adherence to project conventions. Identify issues before they reach production.

## When to Use

- Before merging pull requests
- After implementing new features or bug fixes
- During refactoring to ensure quality is maintained
- When onboarding new team members to code standards
- Periodically to assess technical debt

## Prerequisites

- Code changes identified and accessible
- Project coding standards understood
- Context about the change's purpose and scope

## Detailed Workflow

### Phase 1: Context Gathering (5-10 minutes)

1. **Understand the change** - Read PR description, linked issues, or commit messages
2. **Identify scope** - Which files changed, what's the blast radius
3. **Review tests** - Are there tests? Do they cover the change?
4. **Check dependencies** - Any new imports or API changes?

### Phase 2: Structural Review (15-20 minutes)

1. **Architecture alignment**
   - Does the code fit the existing architecture?
   - Are boundaries respected (no circular deps, proper layering)?
   - Is the abstraction level consistent?

2. **Module organization**
   - Files in correct directories?
   - Export/import structure clean?
   - No god files or god functions?

3. **Naming quality**
   - Variables/functions describe what they do?
   - No abbreviations unless obvious?
   - Constants properly named and scoped?

### Phase 3: Code Quality Review (20-30 minutes)

1. **Readability checklist**
   - Functions under 30 lines?
   - Nesting under 3 levels?
   - Comments explain "why", not "what"?
   - No magic numbers or strings?

2. **Correctness checks**
   - Edge cases handled?
   - Error paths covered?
   - Race conditions avoided?
   - Resource cleanup guaranteed?

3. **Maintainability assessment**
   - Single responsibility principle followed?
   - DRY - no unnecessary duplication?
   - Easy to test?
   - Easy to modify later?

4. **Security quick-scan**
   - User input validated?
   - No secrets in code?
   - SQL injection / XSS prevention?

### Phase 4: Testing Review (10-15 minutes)

1. **Test completeness**
   - Happy path covered?
   - Error cases tested?
   - Edge cases included?

2. **Test quality**
   - Tests are readable and maintainable?
   - Assertions are meaningful?
   - Test isolation maintained?

### Phase 5: Synthesis (10-15 minutes)

1. **Categorize findings** by severity
2. **Prioritize recommendations**
3. **Draft review summary**

## Output Format

```markdown
## Code Review: [Feature/Branch Name]

### Overall Assessment
**Status**: APPROVED | CHANGES REQUESTED | NEEDS DISCUSSION

### Summary
[1-2 sentence overview of the change and its quality]

### Quality Score: [1-10]
| Dimension | Score | Notes |
|-----------|-------|-------|
| Readability | X/10 | [brief note] |
| Correctness | X/10 | [brief note] |
| Maintainability | X/10 | [brief note] |
| Test Coverage | X/10 | [brief note] |

### Critical Issues (must fix)
1. **[file:line]** - [Description]
   - Impact: [what could go wrong]
   - Suggestion: [how to fix]

### Warnings (should fix)
1. **[file:line]** - [Description]
   - Impact: [potential issue]
   - Suggestion: [improvement]

### Suggestions (nice to have)
1. **[file:line]** - [Description]
   - Benefit: [what improves]

### What's Good
- [positive observation 1]
- [positive observation 2]

### Files Reviewed
- [list of files with brief assessment]
```

## Examples

### Example 1: API Endpoint Review

**Change**: New user registration endpoint

**Review findings**:
- Password validation missing length check → Critical
- Email not normalized (lowercased) → Warning
- Good use of existing validation middleware → Positive
- Test coverage for duplicate email → Missing

**Verdict**: Changes requested - fix validation, add test

### Example 2: Refactoring Review

**Change**: Extract user service from controller

**Review findings**:
- Clean separation of concerns → Positive
- Business logic properly moved → Good
- One function still in controller → Suggestion
- Tests updated and passing → Good

**Verdict**: Approved with minor suggestion

## Error Handling

| Situation | Action |
|-----------|--------|
| Code doesn't compile/lint | Request fix before review |
| Missing context or docs | Ask author for clarification |
| Architectural concerns | Flag for discussion, don't block |
| Disagree with style choice | Note preference, defer to team standard |
| Security concern found | Block merge, escalate if needed |

## Review Principles

1. **Be constructive** - Suggest improvements, don't just criticize
2. **Be specific** - Point to exact lines and provide examples
3. **Prioritize** - Critical issues first, nice-to-haves last
4. **Acknowledge good work** - Note what's done well
5. **Focus on code, not author** - "This function could be..." not "You should have..."
6. **Ask questions** - If something's unclear, ask rather than assume

## Metrics for Success

- Critical issues caught before merge
- Time to review under 45 minutes
- Review feedback is actionable
- Code quality improves over time
