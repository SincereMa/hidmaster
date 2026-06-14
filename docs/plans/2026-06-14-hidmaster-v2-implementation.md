# hidmaster v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task.

**Goal:** Build a one-click installer that enhances any AI coding agent with production-ready skills and auto-orchestration.

**Architecture:** Shell script installer + CLI tool that detects agent, copies skills + instructions to native directories.

**Tech Stack:** Bash (installer), TypeScript/Bun (CLI), Markdown (skills + instructions)

---

## Task 1: Project Restructuring

**Files:**
- Modify: `package.json`
- Create: `install.sh`
- Create: `src/index.ts` (new entry point)

- [ ] **Step 1: Update package.json**

```json
{
  "name": "hidmaster",
  "version": "2.0.0",
  "description": "One-click AI agent workflow enhancer",
  "type": "module",
  "bin": {
    "hidmaster": "./bin/hidmaster.ts"
  },
  "scripts": {
    "build": "tsc",
    "dev": "bun run bin/hidmaster.ts",
    "test": "bun test",
    "typecheck": "tsc --noEmit",
    "install:local": "bash install.sh"
  }
}
```

- [ ] **Step 2: Create install.sh**

```bash
#!/bin/bash
# install.sh - One-click hidmaster installation

set -e

HIDMASTER_DIR="$HOME/.hidmaster"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing hidmaster..."

# Create directory structure
mkdir -p "$HIDMASTER_DIR/bin"
mkdir -p "$HIDMASTER_DIR/skills"
mkdir -p "$HIDMASTER_DIR/instructions"

# Copy files
cp -r "$SCRIPT_DIR/skills/"* "$HIDMASTER_DIR/skills/"
cp -r "$SCRIPT_DIR/instructions/"* "$HIDMASTER_DIR/instructions/"
cp "$SCRIPT_DIR/bin/hidmaster.ts" "$HIDMASTER_DIR/bin/hidmaster.ts"

# Make executable
chmod +x "$HIDMASTER_DIR/bin/hidmaster.ts"

# Create wrapper script
cat > "$HIDMASTER_DIR/bin/hidmaster" << 'EOF'
#!/bin/bash
exec bun run "$HOME/.hidmaster/bin/hidmaster.ts" "$@"
EOF
chmod +x "$HIDMASTER_DIR/bin/hidmaster"

# Add to PATH (different methods for different shells)
if [[ "$SHELL" == */zsh ]]; then
    if ! grep -q '.hidmaster/bin' ~/.zshrc 2>/dev/null; then
        echo 'export PATH="$HOME/.hidmaster/bin:$PATH"' >> ~/.zshrc
        echo "Added to ~/.zshrc"
    fi
elif [[ "$SHELL" == */bash ]]; then
    if ! grep -q '.hidmaster/bin' ~/.bashrc 2>/dev/null; then
        echo 'export PATH="$HOME/.hidmaster/bin:$PATH"' >> ~/.bashrc
        echo "Added to ~/.bashrc"
    fi
fi

echo ""
echo "Installation complete!"
echo ""
echo "Usage:"
echo "  cd your-project"
echo "  hidmaster"
echo ""
echo "This will automatically:"
echo "  1. Detect your AI agent"
echo "  2. Install production skills"
echo "  3. Configure auto-orchestration"
```

- [ ] **Step 3: Commit**

```bash
git add package.json install.sh
git commit -m "feat: add project restructuring and install script"
```

---

## Task 2: Production Skills (6 Core)

**Files:**
- Modify: `skills/core/explore/SKILL.md`
- Modify: `skills/core/architect/SKILL.md`
- Modify: `skills/core/implement/SKILL.md`
- Modify: `skills/core/validate/SKILL.md`
- Modify: `skills/core/ship/SKILL.md`
- Modify: `skills/core/iterate/SKILL.md`

- [ ] **Step 1: Rewrite explore skill with production depth**

```markdown
---
name: explore
description: Deep codebase understanding and requirements analysis
category: core
triggers:
  - "understand this codebase"
  - "what does this project do"
  - "how is this structured"
  - "analyze this code"
  - "before making changes"
prerequisites: []
output: mental_model
---

# Explore Skill

## Purpose
Systematically explore and understand codebases, requirements, and constraints before making changes.

## When to Use
- Starting work on unfamiliar code
- Understanding complex systems
- Before making significant changes
- When onboarding to a new project
- When user asks "what does this do?"

## Workflow

### Phase 1: High-Level Understanding (2-3 minutes)
1. Read README.md, package.json, or equivalent entry documentation
2. Identify project type (library, app, service, CLI tool, etc.)
3. Note key dependencies and technologies used
4. Understand the project's primary purpose

### Phase 2: Structure Mapping (5-10 minutes)
1. List top-level directories and their purposes
2. Identify entry points (main files, index files, CLI entry)
3. Map the dependency graph between modules
4. Find configuration files (tsconfig, webpack, etc.)
5. Locate test directories and test patterns

### Phase 3: Pattern Recognition (3-5 minutes)
1. Read 3-5 representative source files
2. Identify coding patterns (functional, OOP, mix)
3. Note naming conventions (camelCase, snake_case, etc.)
4. Understand error handling approach
5. Check for logging patterns

### Phase 4: Test Analysis (2-3 minutes)
1. Find test files and test framework
2. Understand test structure (unit, integration, e2e)
3. Note test coverage approach
4. Identify test utilities and helpers

## Output Format

Create a mental model document:

```
## Project Overview
- Type: [library/app/service/CLI]
- Language: [typescript/python/go/etc]
- Framework: [react/express/fastapi/etc]
- Purpose: [one sentence description]
- Scale: [small/medium/large - number of files]

## Key Components
- [Component 1]: [purpose and responsibility]
- [Component 2]: [purpose and responsibility]
- [Component 3]: [purpose and responsibility]

## Architecture
- Pattern: [MVC/layered/hexagonal/etc]
- Data Flow: [description]
- State Management: [approach]

## Conventions
- Naming: [convention observed]
- Imports: [style - relative/absolute, order]
- Error Handling: [try-catch, Result type, etc]
- Logging: [framework/approach]

## Testing
- Framework: [jest/vitest/pytest/etc]
- Patterns: [AAA, Given-When-Then, etc]
- Coverage: [current approach]

## Dependencies
- Key: [critical dependencies]
- Dev: [development dependencies]

## Areas of Note
- [Interesting pattern or decision]
- [Potential concern or technical debt]
- [Extension points]
```

## Examples

### Example 1: User says "Help me understand this codebase"
1. Run explore skill
2. Produce mental model
3. Ask: "What specific area would you like to work on?"

### Example 2: Before bug fix
User: "Fix the login bug"
1. Run explore skill to understand auth system
2. Then run debug skill to find the bug

### Example 3: Before feature implementation
User: "Add dark mode support"
1. Run explore skill to understand UI architecture
2. Then run architect skill to design the feature

## Error Handling

- If README is missing: Note it, proceed with code analysis
- If project structure unclear: Ask user for clarification
- If too many files: Focus on entry points first, then drill down
- If dependencies unclear: Check package.json/requirements.txt/go.mod
```

- [ ] **Step 2: Commit**

```bash
git add skills/core/explore/SKILL.md
git commit -m "feat: upgrade explore skill to production quality"
```

- [ ] **Step 3: Rewrite architect skill**

```markdown
---
name: architect
description: Technical design and architecture decisions
category: core
triggers:
  - "design a solution"
  - "how should I implement this"
  - "what's the best approach"
  - "plan this feature"
prerequisites: ["explore"]
output: design_document
---

# Architect Skill

## Purpose
Design technical solutions and make architecture decisions before implementation.

## When to Use
- Planning significant changes
- Designing new features
- Evaluating trade-offs between approaches
- When multiple implementation options exist
- Before complex refactoring

## Workflow

### Phase 1: Requirements Analysis (3-5 minutes)
1. Understand the problem statement
2. Identify constraints (time, tech, team)
3. List requirements (must-have, nice-to-have)
4. Identify risks and unknowns

### Phase 2: Option Generation (5-10 minutes)
1. Generate 2-3 possible approaches
2. For each approach, document:
   - High-level design
   - Pros and cons
   - Implementation complexity
   - Maintenance burden
   - Performance implications

### Phase 3: Trade-off Analysis (3-5 minutes)
1. Create comparison matrix
2. Score each option on:
   - Simplicity (1-5)
   - Performance (1-5)
   - Maintainability (1-5)
   - Testability (1-5)
   - Time to implement (1-5)

### Phase 4: Decision & Documentation (5 minutes)
1. Select best approach with rationale
2. Document the decision
3. Outline implementation plan
4. Identify verification criteria

## Output Format

```
## Problem Statement
[Clear description of what needs to be solved]

## Requirements
### Must Have
- [ ] [requirement 1]
- [ ] [requirement 2]

### Nice to Have
- [ ] [requirement 3]

## Constraints
- [constraint 1]
- [constraint 2]

## Options Considered

### Option A: [Name]
**Description:** [high-level overview]
**Pros:**
- [pro 1]
- [pro 2]
**Cons:**
- [con 1]
- [con 2]
**Complexity:** [Low/Medium/High]

### Option B: [Name]
**Description:** [high-level overview]
**Pros:**
- [pro 1]
**Cons:**
- [con 1]
**Complexity:** [Low/Medium/High]

## Recommendation

**Chosen Option:** [Option X]

**Rationale:**
[Why this option was chosen]

**Implementation Plan:**
1. [Step 1]
2. [Step 2]
3. [Step 3]

**Verification:**
- [ ] [test case 1]
- [ ] [test case 2]
```

## Examples

### Example 1: New Feature Design
User: "Add user authentication"
1. Run explore to understand current auth system (if any)
2. Run architect to design auth solution
3. Present design to user for approval
4. Then run implement

### Example 2: Refactoring Decision
User: "Should I refactor the database layer?"
1. Run explore to understand current DB layer
2. Run architect to evaluate refactoring approaches
3. Present options with trade-offs
4. Let user decide, then implement

## Error Handling

- If requirements unclear: Ask clarifying questions first
- If too many options: Focus on top 2-3 most viable
- If constraints unknown: Make reasonable assumptions, note them
```

- [ ] **Step 4: Commit**

```bash
git add skills/core/architect/SKILL.md
git commit -m "feat: upgrade architect skill to production quality"
```

- [ ] **Step 5: Rewrite implement skill**

```markdown
---
name: implement
description: Code implementation following design specifications
category: core
triggers:
  - "implement this"
  - "write the code"
  - "build this feature"
  - "add this functionality"
prerequisites: ["architect"]
output: working_code
---

# Implement Skill

## Purpose
Execute code changes following established designs and patterns.

## When to Use
- After design decisions are made
- Implementing features
- Making code changes
- Writing new modules

## Workflow

### Phase 1: Preparation (2-3 minutes)
1. Review the design document
2. Identify files to create/modify
3. Check existing patterns in codebase
4. Set up test structure

### Phase 2: Incremental Implementation (10-30 minutes)
1. Start with the smallest useful piece
2. Write code that matches existing patterns
3. Test each piece before moving on
4. Commit frequently (every 15-30 minutes)

### Phase 3: Integration (5-10 minutes)
1. Ensure all pieces work together
2. Run full test suite
3. Check for edge cases
4. Verify error handling

### Phase 4: Polish (3-5 minutes)
1. Review code quality
2. Add comments for complex logic
3. Update related documentation
4. Prepare for review

## Best Practices

### Code Quality
- Match existing code style exactly
- Keep functions small and focused
- Use meaningful names
- Avoid premature optimization

### Testing
- Write tests as you go
- Test edge cases
- Test error conditions
- Aim for clear test names

### Git Hygiene
- Commit early and often
- Write clear commit messages
- One logical change per commit
- Don't commit broken code

## Output Format

```markdown
## Implementation Summary

### Files Created
- `path/to/new/file.ts` - [purpose]

### Files Modified
- `path/to/existing/file.ts` - [what changed]

### Changes Made
1. [Change 1 with brief explanation]
2. [Change 2 with brief explanation]

### Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed

### Notes
- [Any important notes about the implementation]
- [Known limitations]
- [Future improvements]
```

## Examples

### Example 1: Feature Implementation
1. Review architect's design
2. Implement in small increments
3. Test each increment
4. Run full test suite
5. Commit with clear message

### Example 2: Bug Fix
1. Understand the bug from debug skill
2. Write failing test first
3. Implement fix
4. Verify test passes
5. Check for similar issues

## Error Handling

- If design is unclear: Ask for clarification before implementing
- If tests fail: Fix immediately, don't proceed
- If encountering unexpected issues: Document and adjust plan
```

- [ ] **Step 6: Commit**

```bash
git add skills/core/implement/SKILL.md
git commit -m "feat: upgrade implement skill to production quality"
```

- [ ] **Step 7: Rewrite validate skill**

```markdown
---
name: validate
description: Testing, type checking, and functional verification
category: core
triggers:
  - "test this"
  - "verify it works"
  - "check for errors"
  - "run tests"
prerequisites: ["implement"]
output: validation_report
---

# Validate Skill

## Purpose
Verify that changes work correctly through testing and validation.

## When to Use
- After implementing changes
- Before committing code
- Before marking task complete
- When debugging issues

## Workflow

### Phase 1: Automated Testing (5-10 minutes)
1. Run unit tests: `npm test` / `bun test` / `pytest`
2. Run type checking: `npm run typecheck` / `tsc --noEmit`
3. Run linting: `npm run lint` / `eslint .`
4. Check for any failures

### Phase 2: Manual Verification (3-5 minutes)
1. Start the application (if applicable)
2. Test the specific change
3. Test related functionality
4. Check edge cases

### Phase 3: Code Review (5 minutes)
1. Review your own changes
2. Check for:
   - Naming consistency
   - Error handling
   - Edge cases
   - Performance concerns

### Phase 4: Documentation (2-3 minutes)
1. Update relevant docs
2. Add inline comments if needed
3. Update changelog (if applicable)

## Validation Checklist

### Automated
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Build succeeds

### Manual
- [ ] Feature works as expected
- [ ] Edge cases handled
- [ ] Error messages are clear
- [ ] Performance is acceptable

### Code Quality
- [ ] Code follows project patterns
- [ ] Names are meaningful
- [ ] Functions are focused
- [ ] No code duplication

## Output Format

```markdown
## Validation Report

### Test Results
- Unit Tests: ✅ PASS (X tests)
- Integration Tests: ✅ PASS (X tests)
- Type Checking: ✅ PASS
- Linting: ✅ PASS (X warnings)

### Manual Testing
- [x] Feature works correctly
- [x] Edge cases handled
- [x] Error handling works

### Code Review
- [x] Follows project patterns
- [x] Names are meaningful
- [x] No issues found

### Status
✅ All validations passed - Ready for review/merge
```

## Examples

### Example 1: After Feature Implementation
1. Run all automated tests
2. Manually test the feature
3. Review code quality
4. Produce validation report

### Example 2: Before Git Commit
1. Run type checking
2. Run linting
3. Run tests
4. Commit only if all pass

## Error Handling

- If tests fail: Fix issues before proceeding
- If type errors: Fix type issues
- If linting fails: Fix linting issues
- If manual test fails: Investigate and fix
```

- [ ] **Step 8: Commit**

```bash
git add skills/core/validate/SKILL.md
git commit -m "feat: upgrade validate skill to production quality"
```

- [ ] **Step 9: Rewrite ship skill**

```markdown
---
name: ship
description: Merging, releases, and documentation updates
category: core
triggers:
  - "ship this"
  - "merge the PR"
  - "prepare for release"
  - "finalize changes"
prerequisites: ["validate"]
output: shipped_changes
---

# Ship Skill

## Purpose
Prepare and execute code delivery, including merging, releases, and documentation.

## When to Use
- After validation passes
- Preparing for release
- Finalizing a feature branch
- Updating documentation

## Workflow

### Phase 1: Pre-Ship Review (5 minutes)
1. Run final validation
2. Review all changes in branch
3. Check commit history is clean
4. Verify no conflicts

### Phase 2: Documentation Update (5-10 minutes)
1. Update README if needed
2. Update CHANGELOG
3. Update API documentation
4. Update inline comments

### Phase 3: Release Preparation (5 minutes)
1. Update version number (if applicable)
2. Create release notes
3. Tag the release (if applicable)

### Phase 4: Merge & Deploy (5 minutes)
1. Create/update PR
2. Address review comments
3. Merge to main
4. Verify deployment (if applicable)

## Shipping Checklist

### Code
- [ ] All tests pass
- [ ] Type checking passes
- [ ] Linting passes
- [ ] No conflicts with main

### Documentation
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] API docs updated
- [ ] Code comments reviewed

### Release
- [ ] Version bumped (if needed)
- [ ] Release notes written
- [ ] Tags created (if needed)

### Post-Merge
- [ ] Build succeeds on main
- [ ] Deployment successful
- [ ] Monitoring shows no issues

## Output Format

```markdown
## Shipping Report

### Changes Summary
- Files changed: X
- Lines added: X
- Lines removed: X

### Documentation Updated
- [x] README.md
- [x] CHANGELOG.md

### Release Notes
[Release notes content]

### Status
✅ Successfully shipped!
```

## Examples

### Example 1: Feature Branch Merge
1. Run final validation
2. Update documentation
3. Create PR with release notes
4. Address review comments
5. Merge to main

### Example 2: Version Release
1. All of the above
2. Bump version number
3. Create git tag
4. Publish package (if applicable)

## Error Handling

- If validation fails: Fix issues before shipping
- If conflicts exist: Resolve before merging
- If deployment fails: Rollback and investigate
```

- [ ] **Step 10: Commit**

```bash
git add skills/core/ship/SKILL.md
git commit -m "feat: upgrade ship skill to production quality"
```

- [ ] **Step 11: Rewrite iterate skill**

```markdown
---
name: iterate
description: Feedback collection and continuous improvement
category: core
triggers:
  - "improve this"
  - "optimize this"
  - "refactor this"
  - "make this better"
prerequisites: ["validate"]
output: improvement_plan
---

# Iterate Skill

## Purpose
Collect feedback and continuously improve based on learnings.

## When to Use
- After shipping features
- During code reviews
- When addressing issues
- When optimizing performance
- When improving code quality

## Workflow

### Phase 1: Feedback Collection (5-10 minutes)
1. Gather feedback from:
   - Code review comments
   - User reports
   - Performance metrics
   - Test coverage reports
2. Categorize feedback:
   - Bugs
   - Performance
   - Usability
   - Code quality

### Phase 2: Analysis (5-10 minutes)
1. Identify patterns in feedback
2. Prioritize by impact and effort
3. Group related items
4. Estimate effort for each

### Phase 3: Planning (5 minutes)
1. Create improvement plan
2. Define success criteria
3. Set timeline
4. Assign priorities

### Phase 4: Execution (varies)
1. Implement improvements
2. Test changes
3. Measure impact
4. Document learnings

## Improvement Categories

### Performance
- Response time
- Memory usage
- Bundle size
- Build time

### Code Quality
- Test coverage
- Type safety
- Documentation
- Code complexity

### User Experience
- Error messages
- Workflow efficiency
- Feature completeness

### Maintainability
- Code readability
- Modularity
- Dependencies

## Output Format

```markdown
## Improvement Plan

### Current State
- [Current metric 1]: [value]
- [Current metric 2]: [value]

### Identified Issues
1. [Issue 1] - Impact: High, Effort: Medium
2. [Issue 2] - Impact: Low, Effort: Low

### Proposed Improvements
1. [Improvement 1]
   - Expected impact: [description]
   - Estimated effort: [time]
   - Priority: [High/Medium/Low]

2. [Improvement 2]
   - Expected impact: [description]
   - Estimated effort: [time]
   - Priority: [High/Medium/Low]

### Success Criteria
- [ ] [metric 1] improved by X%
- [ ] [metric 2] improved by X%
- [ ] [quality goal] achieved

### Timeline
- Week 1: [improvements]
- Week 2: [improvements]
```

## Examples

### Example 1: Post-Code Review
1. Collect review comments
2. Categorize issues
3. Create improvement plan
4. Implement fixes
5. Verify improvements

### Example 2: Performance Optimization
1. Collect performance metrics
2. Identify bottlenecks
3. Plan optimizations
4. Implement and measure
5. Document results

## Error Handling

- If feedback is unclear: Ask for clarification
- If improvements conflict: Prioritize by impact
- If timeline unrealistic: Adjust scope
```

- [ ] **Step 12: Commit**

```bash
git add skills/core/iterate/SKILL.md
git commit -m "feat: upgrade iterate skill to production quality"
```

---

## Task 3: Development Skills (3)

- [ ] **Step 1: Create debug skill**

```markdown
---
name: debug
description: Systematic debugging methodology
category: development
triggers:
  - "debug this"
  - "find the bug"
  - "why isn't this working"
  - "fix this error"
prerequisites: ["explore"]
output: root_cause_and_fix
---

# Debug Skill

## Purpose
Systematically find and fix bugs using structured debugging methodology.

## When to Use
- When something isn't working
- When encountering errors
- When behavior is unexpected
- When tests are failing

## Workflow

### Phase 1: Reproduce (5 minutes)
1. Understand the expected behavior
2. Understand the actual behavior
3. Create minimal reproduction case
4. Document the steps to reproduce

### Phase 2: Investigate (10-20 minutes)
1. Add strategic logging
2. Use debugger/breakpoints
3. Check recent changes
4. Examine error messages
5. Check dependencies

### Phase 3: Hypothesize (5 minutes)
1. Form hypotheses about root cause
2. Prioritize by likelihood
3. Design tests for each hypothesis

### Phase 4: Fix & Verify (10-15 minutes)
1. Implement fix
2. Write regression test
3. Verify fix works
4. Check for related issues

## Debugging Techniques

### Binary Search
- Comment out half the code
- See if bug persists
- Repeat until isolated

### Print Debugging
- Add console.log at key points
- Trace data flow
- Check intermediate values

### Rubber Duck
- Explain the problem aloud
- Walk through the code
- Often reveals the issue

### Git Bisect
- Find when bug was introduced
- Check recent commits
- Identify breaking change

## Output Format

```markdown
## Debug Report

### Problem
- Expected: [what should happen]
- Actual: [what actually happens]
- Reproduction: [steps to reproduce]

### Investigation
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

### Root Cause
[Description of the root cause]

### Fix
[Description of the fix]

### Prevention
[How to prevent this in the future]

### Status
✅ Bug fixed and verified
```

## Examples

### Example 1: Runtime Error
1. Reproduce the error
2. Add logging around error
3. Identify null reference
4. Add null check
5. Write regression test

### Example 2: Test Failure
1. Run failing test
2. Understand expected vs actual
3. Find difference in implementation
4. Fix implementation
5. Verify test passes

## Error Handling

- If can't reproduce: Ask for more details
- If root cause unclear: Continue investigating
- If fix introduces new issues: Revert and try different approach
```

- [ ] **Step 2: Commit**

```bash
git add skills/development/debug/SKILL.md
git commit -m "feat: add production debug skill"
```

- [ ] **Step 3: Create refactor skill**

```markdown
---
name: refactor
description: Code refactoring best practices
category: development
triggers:
  - "refactor this"
  - "clean up this code"
  - "improve code structure"
  - "make this more maintainable"
prerequisites: ["explore", "validate"]
output: refactored_code
---

# Refactor Skill

## Purpose
Improve code structure without changing behavior.

## When to Use
- Code is hard to understand
- Code is hard to test
- Code has duplication
- Code violates patterns

## Workflow

### Phase 1: Analysis (5-10 minutes)
1. Understand current structure
2. Identify code smells
3. Plan refactoring steps
4. Ensure tests exist

### Phase 2: Safe Refactoring (10-20 minutes)
1. Make one small change
2. Run tests
3. Commit
4. Repeat

### Phase 3: Verification (5 minutes)
1. Run full test suite
2. Verify behavior unchanged
3. Check performance
4. Review changes

## Code Smells to Look For

### Duplication
- Similar code in multiple places
- Copy-pasted logic
- Similar function signatures

### Complexity
- Long functions (>50 lines)
- Deep nesting (>3 levels)
- Many parameters (>4)

### Structure
- God classes
- Circular dependencies
- Tight coupling

## Refactoring Patterns

### Extract Function
- Pull code into named function
- Improve readability
- Enable reuse

### Extract Class
- Group related functionality
- Separate concerns
- Improve cohesion

### Rename
- Improve naming
- Make intent clear
- Reduce comments

### Move
- Relocate code
- Improve organization
- Reduce coupling

## Output Format

```markdown
## Refactoring Report

### Issues Found
1. [Code smell 1]
2. [Code smell 2]

### Changes Made
1. [Refactoring 1]
2. [Refactoring 2]

### Verification
- [x] Tests pass
- [x] Behavior unchanged
- [x] Performance acceptable

### Status
✅ Refactoring complete
```

## Examples

### Example 1: Extract Function
1. Identify repeated code
2. Extract to function
3. Replace all occurrences
4. Run tests

### Example 2: Simplify Conditionals
1. Identify complex conditionals
2. Extract to well-named functions
3. Simplify logic
4. Run tests

## Error Handling

- If tests fail: Revert and try smaller change
- If behavior changes: Revert immediately
- If performance degrades: Revert and optimize differently
```

- [ ] **Step 4: Commit**

```bash
git add skills/development/refactor/SKILL.md
git commit -m "feat: add production refactor skill"
```

- [ ] **Step 5: Create optimize skill**

```markdown
---
name: optimize
description: Performance analysis and optimization
category: development
triggers:
  - "optimize this"
  - "make this faster"
  - "improve performance"
  - "this is slow"
prerequisites: ["explore", "validate"]
output: optimized_code
---

# Optimize Skill

## Purpose
Identify and fix performance bottlenecks.

## When to Use
- Application is slow
- Memory usage is high
- Bundle size is large
- Build time is long

## Workflow

### Phase 1: Measure (5-10 minutes)
1. Establish baseline metrics
2. Identify what to measure
3. Set up measurement tools
4. Run benchmarks

### Phase 2: Profile (10-15 minutes)
1. Use profiler tools
2. Identify hot paths
3. Find memory leaks
4. Check bundle size

### Phase 3: Optimize (10-20 minutes)
1. Focus on biggest bottleneck
2. Implement optimization
3. Measure improvement
4. Repeat

### Phase 4: Verify (5 minutes)
1. Run benchmarks again
2. Check for regressions
3. Verify correctness
4. Document improvements

## Optimization Areas

### Runtime Performance
- Algorithm complexity
- Data structure choice
- Caching
- Lazy loading

### Memory
- Memory leaks
- Object allocation
- Garbage collection
- Buffer management

### Network
- Request batching
- Compression
- Caching headers
- CDN usage

### Build
- Tree shaking
- Code splitting
- Minification
- Parallel builds

## Output Format

```markdown
## Optimization Report

### Baseline
- Metric 1: [value]
- Metric 2: [value]

### Bottlenecks Found
1. [bottleneck 1]
2. [bottleneck 2]

### Optimizations Applied
1. [optimization 1]
   - Before: [value]
   - After: [value]
   - Improvement: [X%]

2. [optimization 2]
   - Before: [value]
   - After: [value]
   - Improvement: [X%]

### Status
✅ Performance optimized
```

## Examples

### Example 1: Slow API Call
1. Measure response time
2. Profile database queries
3. Add indexing
4. Measure improvement

### Example 2: Large Bundle
1. Analyze bundle size
2. Find large dependencies
3. Implement code splitting
4. Measure reduction

## Error Handling

- If optimization breaks functionality: Revert
- If performance doesn't improve: Try different approach
- If optimization reduces readability: Document trade-off
```

- [ ] **Step 6: Commit**

```bash
git add skills/development/optimize/SKILL.md
git commit -m "feat: add production optimize skill"
```

---

## Task 4: Documentation Skills (3)

- [ ] **Step 1: Create generate-docs skill**

```markdown
---
name: generate-docs
description: Automatic project documentation generation
category: documentation
triggers:
  - "generate documentation"
  - "create docs"
  - "document this"
  - "write README"
prerequisites: ["explore"]
output: documentation
---

# Generate Docs Skill

## Purpose
Automatically generate comprehensive project documentation.

## When to Use
- Project lacks documentation
- Documentation is outdated
- Onboarding new team members
- Preparing for open source release

## Workflow

### Phase 1: Analysis (5-10 minutes)
1. Understand project structure
2. Identify key components
3. Find existing documentation
4. Note documentation gaps

### Phase 2: Generation (15-30 minutes)
1. Generate README.md
2. Generate API documentation
3. Generate architecture docs
4. Generate contribution guide

### Phase 3: Review (5-10 minutes)
1. Review generated docs
2. Add examples
3. Fix inaccuracies
4. Improve clarity

## Documentation Types

### README.md
- Project overview
- Installation instructions
- Usage examples
- API reference
- Contributing guidelines

### API Documentation
- Function signatures
- Parameter descriptions
- Return values
- Usage examples

### Architecture Docs
- System overview
- Component diagrams
- Data flow
- Design decisions

### Contribution Guide
- Development setup
- Coding standards
- Testing requirements
- PR process

## Output Format

```markdown
## Documentation Generated

### Files Created/Updated
- README.md
- docs/API.md
- docs/ARCHITECTURE.md
- CONTRIBUTING.md

### Coverage
- [x] Project overview
- [x] Installation
- [x] Usage examples
- [x] API reference
- [x] Architecture

### Status
✅ Documentation generated
```

## Examples

### Example 1: New Project
1. Analyze project structure
2. Generate comprehensive README
3. Add usage examples
4. Create contribution guide

### Example 2: API Documentation
1. Find all exported functions
2. Generate JSDoc/TSDoc
3. Add examples
4. Create API reference

## Error Handling

- If code is unclear: Add TODO markers
- If examples needed: Create minimal examples
- If structure complex: Create diagrams
```

- [ ] **Step 2: Commit**

```bash
mkdir -p skills/documentation/generate-docs
git add skills/documentation/generate-docs/SKILL.md
git commit -m "feat: add production generate-docs skill"
```

- [ ] **Step 3: Create api-docs skill**

```markdown
---
name: api-docs
description: API documentation generation
category: documentation
triggers:
  - "document API"
  - "create API docs"
  - "generate API reference"
prerequisites: ["explore"]
output: api_documentation
---

# API Docs Skill

## Purpose
Generate comprehensive API documentation from code.

## When to Use
- Creating public APIs
- Updating API documentation
- Preparing SDK release
- Onboarding API consumers

## Workflow

### Phase 1: Discovery (5 minutes)
1. Find all exported functions/classes
2. Identify public API surface
3. Check existing documentation
4. Note documentation standards

### Phase 2: Generation (10-20 minutes)
1. Generate function signatures
2. Add parameter descriptions
3. Document return values
4. Add usage examples

### Phase 3: Validation (5 minutes)
1. Verify examples work
2. Check for completeness
3. Review for clarity
4. Test documentation generation

## Documentation Standards

### Function Documentation
```typescript
/**
 * [Brief description]
 * 
 * @param [param1] - [description]
 * @param [param2] - [description]
 * @returns [description]
 * 
 * @example
 * [usage example]
 */
```

### Class Documentation
```typescript
/**
 * [Brief description]
 * 
 * @example
 * [usage example]
 */
class ClassName {
  /**
   * [Method description]
   * 
   * @param [param] - [description]
   * @returns [description]
   */
  methodName(param: Type): ReturnType {
    // ...
  }
}
```

## Output Format

```markdown
## API Documentation Generated

### Endpoints/Functions Documented
- function1(params): description
- function2(params): description

### Files Updated
- docs/api/function1.md
- docs/api/function2.md

### Status
✅ API documentation generated
```

## Examples

### Example 1: REST API
1. Find route handlers
2. Document endpoints
3. Add request/response examples
4. Create API reference

### Example 2: Library API
1. Find exported functions
2. Generate JSDoc
3. Add usage examples
4. Create API reference

## Error Handling

- If types complex: Add detailed descriptions
- If examples needed: Create minimal examples
- If edge cases: Document them
```

- [ ] **Step 4: Commit**

```bash
mkdir -p skills/documentation/api-docs
git add skills/documentation/api-docs/SKILL.md
git commit -m "feat: add production api-docs skill"
```

- [ ] **Step 5: Create changelog skill**

```markdown
---
name: changelog
description: Automatic changelog generation
category: documentation
triggers:
  - "generate changelog"
  - "create release notes"
  - "update changelog"
prerequisites: ["validate"]
output: changelog
---

# Changelog Skill

## Purpose
Automatically generate changelogs from git history.

## When to Use
- Preparing for release
- Creating release notes
- Updating changelog
- Documenting changes

## Workflow

### Phase 1: Collection (5 minutes)
1. Get git log since last release
2. Categorize commits
3. Identify breaking changes
4. Note new features

### Phase 2: Generation (5-10 minutes)
1. Group by category
2. Write clear descriptions
3. Add breaking change warnings
4. Format consistently

### Phase 3: Review (3-5 minutes)
1. Check for completeness
2. Verify accuracy
3. Improve clarity
4. Add links

## Commit Categories

### Added
- New features
- New capabilities
- New documentation

### Changed
- Changes to existing functionality
- Updates to dependencies
- Modifications to behavior

### Deprecated
- Features that will be removed
- Upcoming breaking changes

### Removed
- Removed features
- Removed functionality

### Fixed
- Bug fixes
- Error corrections
- Issue resolutions

### Security
- Vulnerability fixes
- Security improvements

## Output Format

```markdown
# Changelog

## [Version] - YYYY-MM-DD

### Added
- [Feature 1] (#issue)
- [Feature 2] (#issue)

### Changed
- [Change 1] (#issue)

### Fixed
- [Fix 1] (#issue)

### Breaking Changes
- [Breaking change 1] (#issue)
  - Migration: [instructions]
```

## Examples

### Example 1: Release Preparation
1. Get commits since last release
2. Categorize by type
3. Generate changelog
4. Review and publish

### Example 2: Feature Documentation
1. Get feature branch commits
2. Summarize changes
3. Add to changelog
4. Create release notes

## Error Handling

- If commits unclear: Skip or ask for clarification
- If breaking changes: Highlight prominently
- If large release: Split into sections
```

- [ ] **Step 6: Commit**

```bash
mkdir -p skills/documentation/changelog
git add skills/documentation/changelog/SKILL.md
git commit -m "feat: add production changelog skill"
```

---

## Task 5: Review Skills (3)

- [ ] **Step 1: Create code-review skill**

```markdown
---
name: code-review
description: Code quality review
category: review
triggers:
  - "review this code"
  - "check code quality"
  - "review PR"
  - "code review"
prerequisites: ["explore"]
output: review_report
---

# Code Review Skill

## Purpose
Perform thorough code quality reviews.

## When to Use
- Reviewing pull requests
- Before merging code
- Quality assurance
- Knowledge sharing

## Workflow

### Phase 1: Overview (3-5 minutes)
1. Understand the change
2. Read related issues/PRs
3. Check test coverage
4. Note scope of changes

### Phase 2: Detailed Review (10-20 minutes)
1. Check code quality
2. Verify correctness
3. Review testing
4. Check documentation
5. Assess maintainability

### Phase 3: Feedback (5-10 minutes)
1. Categorize issues
2. Prioritize feedback
3. Write clear comments
4. Suggest improvements

## Review Checklist

### Correctness
- [ ] Logic is correct
- [ ] Edge cases handled
- [ ] Error handling appropriate
- [ ] No off-by-one errors

### Code Quality
- [ ] Names are meaningful
- [ ] Functions are focused
- [ ] Code is readable
- [ ] No duplication

### Testing
- [ ] Tests exist
- [ ] Tests are comprehensive
- [ ] Tests are clear
- [ ] Edge cases tested

### Security
- [ ] No security vulnerabilities
- [ ] Input validated
- [ ] Authentication correct
- [ ] Authorization correct

### Performance
- [ ] No unnecessary operations
- [ ] Efficient algorithms
- [ ] Memory appropriate
- [ ] No N+1 queries

## Output Format

```markdown
## Code Review Report

### Summary
- Files reviewed: X
- Lines changed: X
- Issues found: X

### Issues Found

#### Critical (Must Fix)
1. [issue 1]
2. [issue 2]

#### Important (Should Fix)
1. [issue 3]
2. [issue 4]

#### Minor (Consider Fixing)
1. [issue 5]

### Positive Observations
- [good practice 1]
- [good practice 2]

### Recommendation
[approve/request changes/needs discussion]
```

## Examples

### Example 1: PR Review
1. Read PR description
2. Review changed files
3. Check tests
4. Leave feedback

### Example 2: Code Audit
1. Review codebase
2. Identify issues
3. Prioritize fixes
4. Create action plan

## Error Handling

- If change unclear: Ask for clarification
- If issue ambiguous: Explain concern
- If critical issue: Block merge
```

- [ ] **Step 2: Commit**

```bash
mkdir -p skills/review/code-review
git add skills/review/code-review/SKILL.md
git commit -m "feat: add production code-review skill"
```

- [ ] **Step 3: Create security-review skill**

```markdown
---
name: security-review
description: Security vulnerability review
category: review
triggers:
  - "security review"
  - "check for vulnerabilities"
  - "security audit"
  - "check security"
prerequisites: ["explore"]
output: security_report
---

# Security Review Skill

## Purpose
Identify and address security vulnerabilities.

## When to Use
- Before release
- Security audit
- After security incident
- Compliance requirements

## Workflow

### Phase 1: Assessment (10-15 minutes)
1. Identify attack surfaces
2. Review authentication
3. Check authorization
4. Examine input handling

### Phase 2: Analysis (15-20 minutes)
1. Check for common vulnerabilities
2. Review dependencies
3. Examine data handling
4. Check configuration

### Phase 3: Reporting (5-10 minutes)
1. Document findings
2. Prioritize by severity
3. Suggest fixes
4. Create action plan

## Vulnerability Categories

### Injection
- SQL injection
- Command injection
- LDAP injection
- XSS (Cross-Site Scripting)

### Authentication
- Weak passwords
- Session management
- Token handling
- Multi-factor auth

### Authorization
- Privilege escalation
- Insecure direct object references
- Missing function level access control

### Data Exposure
- Sensitive data exposure
- Insecure storage
- Weak encryption
- Data leakage

## Output Format

```markdown
## Security Review Report

### Summary
- Vulnerabilities found: X
- Critical: X
- High: X
- Medium: X
- Low: X

### Vulnerabilities Found

#### Critical
1. [vulnerability]
   - Description: [description]
   - Impact: [impact]
   - Fix: [recommendation]

#### High
1. [vulnerability]

### Recommendations
1. [recommendation 1]
2. [recommendation 2]

### Status
[secure/needs attention/critical issues found]
```

## Examples

### Example 1: Web Application
1. Review authentication
2. Check input validation
3. Test for XSS
4. Verify HTTPS usage

### Example 2: API Security
1. Review API keys
2. Check rate limiting
3. Verify authentication
4. Test authorization

## Error Handling

- If vulnerability found: Report immediately
- If unsure about severity: Assume highest
- If fix unclear: Provide guidance
```

- [ ] **Step 4: Commit**

```bash
mkdir -p skills/review/security-review
git add skills/review/security-review/SKILL.md
git commit -m "feat: add production security-review skill"
```

- [ ] **Step 5: Create performance-review skill**

```markdown
---
name: performance-review
description: Performance bottleneck review
category: review
triggers:
  - "performance review"
  - "check performance"
  - "performance audit"
  - "optimize performance"
prerequisites: ["explore"]
output: performance_report
---

# Performance Review Skill

## Purpose
Identify and address performance bottlenecks.

## When to Use
- Application is slow
- Performance regression
- Before major release
- Capacity planning

## Workflow

### Phase 1: Measurement (10-15 minutes)
1. Establish baseline metrics
2. Identify key performance indicators
3. Set up monitoring
4. Run benchmarks

### Phase 2: Analysis (15-20 minutes)
1. Profile application
2. Identify bottlenecks
3. Check resource usage
4. Analyze queries

### Phase 3: Optimization (10-20 minutes)
1. Prioritize improvements
2. Implement fixes
3. Measure impact
4. Document changes

## Performance Areas

### Frontend
- Bundle size
- Load time
- Render performance
- Memory usage

### Backend
- Response time
- Throughput
- Database queries
- Cache hit rate

### Infrastructure
- CPU usage
- Memory usage
- Network I/O
- Disk I/O

## Output Format

```markdown
## Performance Review Report

### Baseline Metrics
- Response time: Xms
- Throughput: X req/s
- Memory usage: X MB
- Bundle size: X KB

### Bottlenecks Found
1. [bottleneck 1]
   - Impact: [description]
   - Fix: [recommendation]

2. [bottleneck 2]

### Recommendations
1. [recommendation 1]
   - Expected improvement: X%
   - Effort: [low/medium/high]

### Status
[optimized/needs attention/critical issues found]
```

## Examples

### Example 1: Slow API
1. Measure response time
2. Profile database queries
3. Add indexing
4. Implement caching

### Example 2: Large Bundle
1. Analyze bundle size
2. Find large dependencies
3. Implement code splitting
4. Optimize images

## Error Handling

- If measurement unclear: Use multiple methods
- If bottleneck unclear: Profile deeper
- If fix complex: Break into steps
```

- [ ] **Step 6: Commit**

```bash
mkdir -p skills/review/performance-review
git add skills/review/performance-review/SKILL.md
git commit -m "feat: add production performance-review skill"
```

---

## Task 6: Planning Skills (3)

- [ ] **Step 1: Create brainstorm skill**

```markdown
---
name: brainstorm
description: User brainstorming for requirements
category: planning
triggers:
  - "brainstorm"
  - "let's discuss"
  - "what should we build"
  - "help me think through this"
prerequisites: []
output: requirements
---

# Brainstorm Skill

## Purpose
Collaboratively explore ideas and define requirements.

## When to Use
- Starting new projects
- Defining features
- Exploring possibilities
- Clarifying requirements

## Workflow

### Phase 1: Understanding (5-10 minutes)
1. Understand the goal
2. Identify stakeholders
3. Note constraints
4. List assumptions

### Phase 2: Exploration (10-20 minutes)
1. Generate ideas
2. Consider alternatives
3. Evaluate feasibility
4. Identify risks

### Phase 3: Definition (5-10 minutes)
1. Prioritize ideas
2. Define requirements
3. Create user stories
4. Set success criteria

## Brainstorming Techniques

### Mind Mapping
- Start with central concept
- Branch out to related ideas
- Identify connections

### SCAMPER
- Substitute
- Combine
- Adapt
- Modify
- Put to other uses
- Eliminate
- Reverse

### User Stories
- As a [user], I want [feature] so that [benefit]
- Acceptance criteria: [criteria]

## Output Format

```markdown
## Brainstorm Results

### Goal
[Clear statement of what we're trying to achieve]

### Ideas Generated
1. [idea 1]
2. [idea 2]
3. [idea 3]

### Prioritized Requirements

#### Must Have
- [requirement 1]
- [requirement 2]

#### Should Have
- [requirement 3]

#### Nice to Have
- [requirement 4]

### User Stories
1. As a [user], I want [feature] so that [benefit]
2. As a [user], I want [feature] so that [benefit]

### Success Criteria
- [ ] [criteria 1]
- [ ] [criteria 2]

### Next Steps
1. [step 1]
2. [step 2]
```

## Examples

### Example 1: New Feature
1. Understand user need
2. Generate feature ideas
3. Prioritize by value
4. Define requirements

### Example 2: Project Planning
1. Define project goals
2. Brainstorm approach
3. Identify risks
4. Create plan

## Error Handling

- If unclear: Ask clarifying questions
- If too many ideas: Focus on top 3
- If conflict: Discuss trade-offs
```

- [ ] **Step 2: Commit**

```bash
mkdir -p skills/planning/brainstorm
git add skills/planning/brainstorm/SKILL.md
git commit -m "feat: add production brainstorm skill"
```

- [ ] **Step 3: Create estimate skill**

```markdown
---
name: estimate
description: Workload and complexity estimation
category: planning
triggers:
  - "estimate this"
  - "how long will this take"
  - "what's the complexity"
  - "effort estimation"
prerequisites: ["explore"]
output: estimate
---

# Estimate Skill

## Purpose
Estimate effort and complexity for development tasks.

## When to Use
- Sprint planning
- Project estimation
- Task prioritization
- Resource allocation

## Workflow

### Phase 1: Analysis (5-10 minutes)
1. Understand the task
2. Identify components
3. Check dependencies
4. Note unknowns

### Phase 2: Estimation (5-10 minutes)
1. Break down into subtasks
2. Estimate each subtask
3. Add buffer for unknowns
4. Consider dependencies

### Phase 3: Documentation (3-5 minutes)
1. Record estimates
2. Document assumptions
3. Identify risks
4. Suggest timeline

## Estimation Techniques

### T-Shirt Sizing
- XS: < 1 hour
- S: 1-4 hours
- M: 4-16 hours (1-2 days)
- L: 16-40 hours (1 week)
- XL: 40-80 hours (2 weeks)
- XXL: > 80 hours (break down further)

### Story Points
- 1: Trivial
- 2: Simple
- 3: Medium
- 5: Complex
- 8: Very complex
- 13: Extremely complex (break down)

### Time-Based
- Hours for small tasks
- Days for medium tasks
- Weeks for large tasks

## Output Format

```markdown
## Estimation Report

### Task
[Description of the task]

### Breakdown
1. [Subtask 1]: [estimate]
2. [Subtask 2]: [estimate]
3. [Subtask 3]: [estimate]

### Total Estimate
- Optimistic: [time]
- Realistic: [time]
- Pessimistic: [time]

### Assumptions
- [assumption 1]
- [assumption 2]

### Risks
- [risk 1]
- [risk 2]

### Recommendation
[Timeline suggestion]
```

## Examples

### Example 1: Feature Estimate
1. Analyze requirements
2. Break into subtasks
3. Estimate each
4. Sum and add buffer

### Example 2: Bug Fix Estimate
1. Understand the bug
2. Identify root cause
3. Estimate fix effort
4. Add testing time

## Error Handling

- If unclear: Ask for more details
- If complex: Break down further
- If risky: Add more buffer
```

- [ ] **Step 4: Commit**

```bash
mkdir -p skills/planning/estimate
git add skills/planning/estimate/SKILL.md
git commit -m "feat: add production estimate skill"
```

- [ ] **Step 5: Create roadmap skill**

```markdown
---
name: roadmap
description: Project roadmap planning
category: planning
triggers:
  - "create roadmap"
  - "plan the project"
  - "what's the plan"
  - "project planning"
prerequisites: ["brainstorm", "estimate"]
output: roadmap
---

# Roadmap Skill

## Purpose
Create and maintain project roadmaps.

## When to Use
- Project planning
- Sprint planning
- Release planning
- Strategic planning

## Workflow

### Phase 1: Assessment (10-15 minutes)
1. Understand project goals
2. Identify current state
3. Note constraints
4. List stakeholders

### Phase 2: Planning (15-20 minutes)
1. Define milestones
2. Prioritize features
3. Set timelines
4. Identify dependencies

### Phase 3: Documentation (5-10 minutes)
1. Create roadmap document
2. Define success metrics
3. Plan reviews
4. Communicate plan

## Roadmap Elements

### Milestones
- Major achievements
- Release points
- Feature completions

### Features
- User-facing features
- Technical improvements
- Infrastructure changes

### Timeline
- Short-term (1-2 weeks)
- Medium-term (1-3 months)
- Long-term (3-6 months)

### Dependencies
- External dependencies
- Internal dependencies
- Team dependencies

## Output Format

```markdown
## Project Roadmap

### Vision
[Long-term goal]

### Current State
[Where we are now]

### Milestones

#### Milestone 1: [Name] - [Date]
- [Feature 1]
- [Feature 2]
- Success: [criteria]

#### Milestone 2: [Name] - [Date]
- [Feature 3]
- [Feature 4]
- Success: [criteria]

### Timeline

#### Month 1
- [tasks]

#### Month 2
- [tasks]

#### Month 3
- [tasks]

### Dependencies
- [dependency 1]
- [dependency 2]

### Risks
- [risk 1]
- [risk 2]

### Success Metrics
- [metric 1]
- [metric 2]
```

## Examples

### Example 1: Product Roadmap
1. Define product vision
2. Identify key features
3. Prioritize by value
4. Create timeline

### Example 2: Technical Roadmap
1. Assess current tech debt
2. Plan improvements
3. Set milestones
4. Define success criteria

## Error Handling

- If unclear: Ask for clarification
- If too ambitious: Prioritize ruthlessly
- If timeline unrealistic: Adjust scope
```

- [ ] **Step 6: Commit**

```bash
mkdir -p skills/planning/roadmap
git add skills/planning/roadmap/SKILL.md
git commit -m "feat: add production roadmap skill"
```

---

## Task 7: Collaboration Skills (3)

- [ ] **Step 1: Create parallel skill**

```markdown
---
name: parallel
description: Parallel task execution
category: collaboration
triggers:
  - "do these in parallel"
  - "run concurrently"
  - "parallel execution"
  - "multiple tasks at once"
prerequisites: []
output: parallel_results
---

# Parallel Skill

## Purpose
Execute multiple independent tasks simultaneously.

## When to Use
- Multiple independent tasks
- Time-sensitive work
- Resource availability
- Improving throughput

## Workflow

### Phase 1: Analysis (3-5 minutes)
1. Identify tasks
2. Check dependencies
3. Determine parallelizability
4. Plan execution

### Phase 2: Execution (varies)
1. Start parallel tasks
2. Monitor progress
3. Handle failures
4. Collect results

### Phase 3: Integration (5-10 minutes)
1. Combine results
2. Resolve conflicts
3. Verify completeness
4. Document outcomes

## Parallelization Rules

### Can Parallelize
- Independent tasks
- No shared state
- No dependencies
- Separate resources

### Cannot Parallelize
- Dependent tasks
- Shared state
- Sequential requirements
- Limited resources

## Output Format

```markdown
## Parallel Execution Report

### Tasks Executed
1. [task 1]: ✅ Complete
2. [task 2]: ✅ Complete
3. [task 3]: ✅ Complete

### Results
- [result 1]
- [result 2]
- [result 3]

### Time Savings
- Sequential: [time]
- Parallel: [time]
- Savings: [percentage]

### Status
✅ All tasks completed in parallel
```

## Examples

### Example 1: Multi-file Changes
1. Identify independent files
2. Edit in parallel
3. Run tests
4. Commit together

### Example 2: Multiple Tests
1. Identify independent tests
2. Run in parallel
3. Collect results
4. Report summary

## Error Handling

- If task fails: Handle gracefully
- If conflict: Resolve after completion
- If timeout: Retry or skip
```

- [ ] **Step 2: Commit**

```bash
mkdir -p skills/collaboration/parallel
git add skills/collaboration/parallel/SKILL.md
git commit -m "feat: add production parallel skill"
```

- [ ] **Step 3: Create subagent skill**

```markdown
---
name: subagent
description: Subtask management and delegation
category: collaboration
triggers:
  - "delegate this"
  - "create subtask"
  - "break this down"
  - "assign to subagent"
prerequisites: []
output: delegated_results
---

# Subagent Skill

## Purpose
Break complex tasks into subtasks and delegate to subagents.

## When to Use
- Complex multi-step tasks
- Need for specialization
- Time constraints
- Parallel execution needed

## Workflow

### Phase 1: Analysis (3-5 minutes)
1. Understand the task
2. Identify subtasks
3. Determine delegation
4. Plan coordination

### Phase 2: Delegation (5-10 minutes)
1. Create subtasks
2. Assign to subagents
3. Provide context
4. Set expectations

### Phase 3: Coordination (varies)
1. Monitor progress
2. Handle issues
3. Collect results
4. Integrate outputs

## Delegation Rules

### When to Delegate
- Task is independent
- Specialization needed
- Time pressure
- Parallel execution beneficial

### When Not to Delegate
- Task requires full context
- Task is simple
- Coordination overhead too high
- Task requires authorization

## Output Format

```markdown
## Subagent Delegation Report

### Subtasks Created
1. [subtask 1]: Assigned to [agent]
2. [subtask 2]: Assigned to [agent]
3. [subtask 3]: Assigned to [agent]

### Progress
- [subtask 1]: ✅ Complete
- [subtask 2]: 🔄 In Progress
- [subtask 3]: ⏳ Pending

### Results
- [result 1]
- [result 2]
- [result 3]

### Integration
[How results were combined]

### Status
✅ All subtasks completed
```

## Examples

### Example 1: Feature Implementation
1. Break feature into components
2. Delegate each component
3. Monitor progress
4. Integrate results

### Example 2: Code Review
1. Break review into areas
2. Delegate each area
3. Collect feedback
4. Consolidate report

## Error Handling

- If subagent fails: Retry or handle manually
- If conflict: Resolve after completion
- If delay: Adjust timeline
```

- [ ] **Step 4: Commit**

```bash
mkdir -p skills/collaboration/subagent
git add skills/collaboration/subagent/SKILL.md
git commit -m "feat: add production subagent skill"
```

- [ ] **Step 5: Create handoff skill**

```markdown
---
name: handoff
description: Task handoff and state synchronization
category: collaboration
triggers:
  - "hand off this task"
  - "transfer this"
  - "sync state"
  - "continue where I left off"
prerequisites: []
output: handoff_document
---

# Handoff Skill

## Purpose
Smoothly transfer tasks between agents or sessions.

## When to Use
- Switching between agents
- Session interruption
- Team collaboration
- Context preservation

## Workflow

### Phase 1: Documentation (5-10 minutes)
1. Document current state
2. List completed work
3. Note pending tasks
4. Identify blockers

### Phase 2: Preparation (3-5 minutes)
1. Save all progress
2. Update relevant files
3. Create handoff document
4. Notify stakeholders

### Phase 3: Transfer (3-5 minutes)
1. Provide context to receiver
2. Explain current state
3. Answer questions
4. Confirm understanding

## Handoff Document Format

```markdown
## Task Handoff

### Task
[Description of the task]

### Current State
[Where we are now]

### Completed Work
- [x] [completed item 1]
- [x] [completed item 2]

### Pending Work
- [ ] [pending item 1]
- [ ] [pending item 2]

### Blockers
- [blocker 1]
- [blocker 2]

### Next Steps
1. [step 1]
2. [step 2]

### Context
[Important context for continuation]

### Files
- [file 1]: [status]
- [file 2]: [status]
```

## Examples

### Example 1: Session Handoff
1. Document current progress
2. Save all changes
3. Create handoff document
4. Continue in new session

### Example 2: Team Handoff
1. Document task state
2. Explain decisions made
3. Transfer knowledge
4. Confirm understanding

## Error Handling

- If incomplete: Document what's missing
- If blocker: Clearly identify it
- If unclear: Ask questions before handoff
```

- [ ] **Step 6: Commit**

```bash
mkdir -p skills/collaboration/handoff
git add skills/collaboration/handoff/SKILL.md
git commit -m "feat: add production handoff skill"
```

---

## Task 8: Auto-Orchestration Instructions

**Files:**
- Create: `instructions/opencode.md`
- Create: `instructions/mimocode.md`
- Create: `instructions/claude.md`
- Create: `instructions/codex.md`

- [ ] **Step 1: Create OpenCode instructions**

```markdown
# hidmaster Workflow Instructions for OpenCode

You have access to 22 production-ready skills. Use them automatically to complete tasks.

## Automatic Skill Selection

When a user asks you to do something, automatically determine which skills to use:

### Feature Development Workflow
1. Use `explore` to understand the codebase
2. Use `brainstorm` if requirements are unclear
3. Use `architect` to design the solution
4. Use `estimate` to plan the work
5. Use `implement` to write the code
6. Use `validate` to test and verify
7. Use `ship` to finalize and commit

### Bug Fix Workflow
1. Use `explore` to understand the affected area
2. Use `debug` to find the root cause
3. Use `implement` to fix the bug
4. Use `validate` to verify the fix

### Code Review Workflow
1. Use `explore` to understand the changes
2. Use `code-review` to analyze quality
3. Use `security-review` to check for vulnerabilities
4. Use `performance-review` to optimize

### Documentation Workflow
1. Use `explore` to understand the project
2. Use `generate-docs` to create documentation
3. Use `api-docs` for API documentation
4. Use `changelog` for release notes

### Refactoring Workflow
1. Use `explore` to understand current structure
2. Use `architect` to plan the refactoring
3. Use `refactor` to make changes
4. Use `validate` to ensure no regressions

### Optimization Workflow
1. Use `explore` to understand performance characteristics
2. Use `optimize` to improve performance
3. Use `validate` to verify improvements

## Skill Loading

When you need a skill, call:
```
skill({ name: "skill-name" })
```

## Multi-Step Execution

For complex tasks:
1. Load the first skill
2. Follow its workflow completely
3. Load the next skill
4. Continue until task is complete

## Important Rules

1. **Always start with `explore`** for unfamiliar code
2. **Always end with `validate`** before marking complete
3. **Use `brainstorm`** when requirements are unclear
4. **Use `parallel`** for independent subtasks
5. **Use `subagent`** for complex multi-step tasks
6. **Use `handoff`** when switching contexts

## Example Interactions

### User: "Add user authentication"
1. `explore` - Understand current auth system
2. `brainstorm` - Define auth requirements
3. `architect` - Design auth solution
4. `estimate` - Plan implementation
5. `implement` - Build auth system
6. `validate` - Test thoroughly
7. `ship` - Deploy

### User: "Fix the login bug"
1. `explore` - Understand login flow
2. `debug` - Find root cause
3. `implement` - Fix the bug
4. `validate` - Verify fix

### User: "Review this PR"
1. `explore` - Understand changes
2. `code-review` - Analyze quality
3. `security-review` - Check security
4. `performance-review` - Check performance

## Remember

- Skills are your tools - use them proactively
- Follow the workflows completely
- Don't skip validation
- Document your work
- Ask for clarification when needed
```

- [ ] **Step 2: Commit**

```bash
mkdir -p instructions
git add instructions/opencode.md
git commit -m "feat: add OpenCode auto-orchestration instructions"
```

- [ ] **Step 3: Create MiMo-Code instructions**

```markdown
# hidmaster Workflow Instructions for MiMo-Code

You have access to 22 production-ready skills. Use them automatically.

## Skill Namespace

Skills are available under the `compose:` namespace:
- `compose:explore`
- `compose:architect`
- `compose:implement`
- etc.

## Automatic Workflow Detection

### Feature Development
1. Load `compose:explore` skill
2. Follow exploration workflow
3. Load `compose:architect` skill
4. Design the solution
5. Load `compose:implement` skill
6. Implement the code
7. Load `compose:validate` skill
8. Test and verify
9. Load `compose:ship` skill
10. Finalize and commit

### Bug Fix
1. Load `compose:explore` skill
2. Understand the issue
3. Load `compose:debug` skill
4. Find root cause
5. Load `compose:implement` skill
6. Fix the bug
7. Load `compose:validate` skill
8. Verify fix

## Skill Loading

Load skills using the skill tool:
```
skill({ name: "compose:explore" })
```

## Multi-Step Execution

Execute skills in sequence:
1. Load skill
2. Follow workflow completely
3. Load next skill
4. Continue until complete

## Rules

1. Start with `explore` for new code
2. End with `validate` before completion
3. Use `brainstorm` for unclear requirements
4. Use `parallel` for independent tasks
5. Use `subagent` for complex tasks
```

- [ ] **Step 4: Commit**

```bash
git add instructions/mimocode.md
git commit -m "feat: add MiMo-Code auto-orchestration instructions"
```

- [ ] **Step 5: Create Claude Code instructions**

```markdown
# hidmaster Workflow Instructions for Claude Code

You have access to 22 production-ready skills. Use them automatically to complete tasks.

## Skill Loading

Skills are available in `.claude/skills/`. Load them when needed:
```
skill({ name: "skill-name" })
```

## Automatic Skill Selection

### Feature Development
1. Load `explore` skill - Understand codebase
2. Load `brainstorm` skill - Clarify requirements (if needed)
3. Load `architect` skill - Design solution
4. Load `estimate` skill - Plan work
5. Load `implement` skill - Write code
6. Load `validate` skill - Test and verify
7. Load `ship` skill - Finalize and commit

### Bug Fix
1. Load `explore` skill - Understand affected area
2. Load `debug` skill - Find root cause
3. Load `implement` skill - Fix bug
4. Load `validate` skill - Verify fix

### Code Review
1. Load `explore` skill - Understand changes
2. Load `code-review` skill - Analyze quality
3. Load `security-review` skill - Check security
4. Load `performance-review` skill - Check performance

## Workflow Rules

1. **Always start with `explore`** for unfamiliar code
2. **Always end with `validate`** before completion
3. **Use `brainstorm`** when requirements unclear
4. **Use `parallel`** for independent subtasks
5. **Use `subagent`** for complex tasks

## Example

User: "Add dark mode"
1. `explore` - Understand UI architecture
2. `brainstorm` - Define dark mode requirements
3. `architect` - Design implementation
4. `implement` - Build dark mode
5. `validate` - Test thoroughly
6. `ship` - Deploy
```

- [ ] **Step 6: Commit**

```bash
git add instructions/claude.md
git commit -m "feat: add Claude Code auto-orchestration instructions"
```

- [ ] **Step 7: Create Codex instructions**

```markdown
# hidmaster Workflow Instructions for Codex

You have access to 22 production-ready skills. Use them automatically.

## Skill Loading

Skills are available in `.codex/skills/`. Load them when needed.

## Automatic Workflow

### Feature Development
1. Explore codebase
2. Brainstorm requirements (if unclear)
3. Design solution
4. Estimate work
5. Implement code
6. Validate changes
7. Ship

### Bug Fix
1. Explore affected area
2. Debug root cause
3. Implement fix
4. Validate fix

### Code Review
1. Explore changes
2. Review code quality
3. Check security
4. Check performance

## Rules

1. Start with exploration
2. End with validation
3. Use skills proactively
4. Follow workflows completely
```

- [ ] **Step 8: Commit**

```bash
git add instructions/codex.md
git commit -m "feat: add Codex auto-orchestration instructions"
```

---

## Task 9: CLI Update

**Files:**
- Modify: `src/cli.ts`

- [ ] **Step 1: Update CLI for new workflow**

```typescript
// src/cli.ts
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { homedir } from 'os'
import { detectAgents } from './core/detector'

const HIDMASTER_DIR = join(homedir(), '.hidmaster')

export interface CliOptions {
  command: string
  force?: boolean
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    command: 'setup',
  }

  for (const arg of args) {
    if (arg === 'setup' || arg === 'detect' || arg === 'help') {
      options.command = arg
    } else if (arg === '--force' || arg === '-f') {
      options.force = true
    }
  }

  return options
}

function copyDirSync(src: string, dest: string) {
  mkdirSync(dest, { recursive: true })
  const entries = readdirSync(src)
  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)
    const stat = statSync(srcPath)
    if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

async function setup(projectRoot: string, force: boolean = false) {
  console.log('\nhidmaster - Setting up workflow skills\n')

  // Check if hidmaster is installed
  if (!existsSync(HIDMASTER_DIR)) {
    console.error('Error: hidmaster not installed. Run install.sh first.')
    process.exit(1)
  }

  // Detect agents
  const agents = await detectAgents(projectRoot)
  
  if (agents.length === 0) {
    console.log('No agents detected. Creating .opencode directory...')
    mkdirSync(join(projectRoot, '.opencode'), { recursive: true })
    agents.push({ name: 'opencode', detected: true, configDir: join(projectRoot, '.opencode') })
  }

  console.log('Detected agents:')
  for (const agent of agents) {
    console.log(`  ✓ ${agent.name}`)
  }
  console.log('')

  // Copy skills and instructions to each agent
  for (const agent of agents) {
    const agentDir = dirname(agent.configDir)
    const skillsDir = join(agentDir, agent.name === 'claude-code' ? '.claude' : `.${agent.name}`, 'skills')
    const instructionsFile = join(agentDir, agent.name === 'claude-code' ? 'CLAUDE.md' : `.${agent.name}`, 'AGENTS.md')

    // Copy skills
    console.log(`Installing skills to ${skillsDir}...`)
    const srcSkillsDir = join(HIDMASTER_DIR, 'skills')
    if (existsSync(srcSkillsDir)) {
      copyDirSync(srcSkillsDir, skillsDir)
    }

    // Copy instructions
    console.log(`Installing instructions to ${instructionsFile}...`)
    const instructionsDir = join(HIDMASTER_DIR, 'instructions')
    let instructionFile = 'opencode.md'
    if (agent.name === 'mimocode') instructionFile = 'mimocode.md'
    else if (agent.name === 'claude-code') instructionFile = 'claude.md'
    else if (agent.name === 'codex') instructionFile = 'codex.md'

    const srcInstruction = join(instructionsDir, instructionFile)
    if (existsSync(srcInstruction)) {
      mkdirSync(dirname(instructionsFile), { recursive: true })
      copyFileSync(srcInstruction, instructionsFile)
    }

    console.log(`  ✓ ${agent.name} configured\n`)
  }

  console.log('Setup complete!')
  console.log('')
  console.log('Your agent now has:')
  console.log('  - 22 production-ready skills')
  console.log('  - Auto-orchestration instructions')
  console.log('')
  console.log('Just start coding - your agent will automatically:')
  console.log('  - Use the right skills for each task')
  console.log('  - Orchestrate multi-step workflows')
  console.log('  - Produce high-quality results')
}

async function detect(projectRoot: string) {
  const agents = await detectAgents(projectRoot)
  
  console.log('\nhidmaster - Agent Detection\n')
  
  if (agents.length === 0) {
    console.log('No agents detected.')
    console.log('\nSupported agents:')
    console.log('  - OpenCode (.opencode)')
    console.log('  - MiMo-Code (.mimocode)')
    console.log('  - Claude Code (.claude)')
    console.log('  - Codex (.codex)')
  } else {
    console.log('Detected agents:')
    for (const agent of agents) {
      console.log(`  ✓ ${agent.name}`)
    }
  }
  
  console.log('')
}

function showHelp() {
  console.log(`
hidmaster - AI Agent Workflow Enhancer

Usage:
  hidmaster [command]

Commands:
  setup     Install skills and instructions (default)
  detect    Detect installed agents
  help      Show this help message

Options:
  --force   Force reinstall even if already configured

Examples:
  hidmaster           # Setup skills for detected agents
  hidmaster detect    # Check which agents are installed
  hidmaster setup -f  # Force reinstall
`)
}

export async function main() {
  const args = process.argv.slice(2)
  const options = parseArgs(args)
  const projectRoot = process.cwd()

  switch (options.command) {
    case 'setup':
      await setup(projectRoot, options.force)
      break
    case 'detect':
      await detect(projectRoot)
      break
    case 'help':
      showHelp()
      break
    default:
      console.error(`Unknown command: ${options.command}`)
      showHelp()
      process.exit(1)
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/cli.ts
git commit -m "feat: update CLI for new workflow"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Run all tests**

```bash
bun test
```

- [ ] **Step 2: Test CLI**

```bash
bun run dev help
bun run dev detect
bun run dev setup
```

- [ ] **Step 3: Verify skills are copied**

```bash
ls -la .opencode/skills/
ls -la .opencode/AGENTS.md
```

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: complete hidmaster v2 implementation"
```

---

## Summary

This plan implements **hidmaster v2** with:

- **One-click install** via shell script
- **22 production-ready skills** with detailed workflows
- **Auto-orchestration instructions** for 4 agents
- **Zero configuration** for users
- **Multi-agent support** (OpenCode, MiMo-Code, Claude Code, Codex)

Each skill includes triggers, workflows, output formats, and examples.
The instructions teach agents how to automatically orchestrate skills.
