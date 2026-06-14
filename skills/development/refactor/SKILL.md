---
name: refactor
description: Code refactoring best practices for improving structure without changing behavior
category: development
prerequisites:
  - Existing code that works correctly
  - Test coverage for the code being refactored
  - Clear understanding of current behavior
output:
  - Improved code structure
  - Maintained functionality
  - Better maintainability
---

# Refactor Skill

## Purpose

Improve code structure, readability, and maintainability while preserving existing behavior. Apply systematic refactoring patterns to reduce technical debt.

## The Iron Law

```
NO REFACTORING WITHOUT PASSING TESTS FIRST
```

If the existing tests don't pass before you start, or you can't verify they pass after each change, you cannot refactor safely.

**Violating the letter of this rule is violating the spirit of refactoring.**

## When to Use

- Code is difficult to understand or modify
- Tests are hard to write for existing code
- Changes require touching many unrelated files
- Duplication exists across the codebase
- Function/class files are too long
- Dependencies are tightly coupled

## Workflow

### Phase 1: Assess

1. **Verify tests exist** - Ensure current behavior is captured
2. **Establish baseline** - Run tests, confirm they pass
3. **Identify code smells**:
   - Long methods (>30 lines)
   - Large classes (>200 lines)
   - Duplicate code
   - Deep nesting (>3 levels)
   - Long parameter lists (>3 params)
   - God objects
   - Feature envy
   - Primitive obsession

### Phase 2: Plan

1. **Define target state** - What should the code look like after?
2. **Choose refactoring pattern**:
   - Extract Method/Function
   - Extract Class/Module
   - Inline Method
   - Move Method
   - Rename Variable/Function/Class
   - Replace Conditional with Polymorphism
   - Introduce Parameter Object
   - Replace Magic Numbers with Named Constants
3. **Identify dependencies** - What else might be affected?
4. **Create checklist** - Order of changes to make

### Phase 3: Execute

1. **Make one change at a time** - Small, incremental steps
2. **Run tests after each change** - Verify behavior preserved
3. **Commit frequently** - Save working states
4. **Handle failures immediately** - Don't continue with failing tests

### Phase 4: Verify

1. **Full test suite passes** - All existing tests work
2. **New tests added** - Cover refactored paths
3. **Code review** - Check for missed opportunities
4. **Performance check** - Ensure no regressions

## Output Format

```
## Refactoring Summary

### Changes Made
- [file]: [what was refactored]

### Patterns Applied
- [pattern name]: [brief description]

### Benefits
- [improvement 1]
- [improvement 2]

### Test Coverage
- [tests added/modified]

### Files Modified
- [list of files]
```

## Examples

### Example 1: Extract Method

**Before**:
```javascript
function processOrder(order) {
  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  
  // Apply discount
  if (order.discountCode) {
    const discount = getDiscount(order.discountCode);
    total = total * (1 - discount);
  }
  
  // Add tax
  total = total * 1.1;
  
  return total;
}
```

**After**:
```javascript
function calculateSubtotal(items) {
  return items.reduce((sum, item) => 
    sum + item.price * item.quantity, 0);
}

function applyDiscount(total, discountCode) {
  if (!discountCode) return total;
  const discount = getDiscount(discountCode);
  return total * (1 - discount);
}

function calculateTax(total) {
  return total * 1.1;
}

function processOrder(order) {
  const subtotal = calculateSubtotal(order.items);
  const afterDiscount = applyDiscount(subtotal, order.discountCode);
  return calculateTax(afterDiscount);
}
```

### Example 2: Extract Class

**Before**:
```javascript
class UserManager {
  createUser(data) { /* ... */ }
  validateEmail(email) { /* ... */ }
  sendWelcomeEmail(user) { /* ... */ }
  generateToken(user) { /* ... */ }
  hashPassword(password) { /* ... */ }
}
```

**After**:
```javascript
class EmailService {
  validateEmail(email) { /* ... */ }
  sendWelcomeEmail(user) { /* ... */ }
}

class AuthService {
  generateToken(user) { /* ... */ }
  hashPassword(password) { /* ... */ }
}

class UserManager {
  constructor(emailService, authService) { /* ... */ }
  createUser(data) { /* ... */ }
}
```

## Refactoring Patterns Quick Reference

| Pattern | When to Use | Benefit |
|---------|-------------|---------|
| Extract Method | Long method, repeated code | Reusability, readability |
| Extract Class | Class doing too many things | Single responsibility |
| Inline Method | Method is trivial or only called once | Reduce indirection |
| Move Method | Method used more in another class | Better organization |
| Rename | Unclear names | Readability |
| Replace with Strategy | Complex conditionals | Extensibility |
| Introduce Parameter Object | Long parameter lists | Cleaner API |

## Error Handling

| Situation | Action |
|-----------|--------|
| Tests fail during refactor | Revert immediately, reassess approach |
| Can't identify all usages | Use IDE find references, grep, AST tools |
| Performance degrades | Profile before/after, optimize hot paths |
| Dependencies resist change | Consider adapter pattern, wrapper, or facade |
| Refactor scope creep | Stick to planned changes, create new task for others |

## Anti-Patterns to Avoid

- **Big bang refactoring** - Small steps, not wholesale rewrite
- **Refactoring without tests** - Safety net is essential
- **Mixing refactoring with features** - Separate commits for separate concerns
- **Premature optimization** - Refactor for clarity first
- **Over-engineering** - Stop when code is clear enough
- **Ignoring team conventions** - Follow existing style guides

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Tests exist but are slow" | Slow tests > no tests. Run them anyway. |
| "I'll add tests after refactoring" | Refactoring without tests is rewriting. You'll break things. |
| "This refactor is obvious" | Obvious refactors still break things. Tests prove correctness. |
| "It's just renaming" | Renaming can break imports, reflections, dynamic lookups. Test it. |
| "No time for tests" | No time to do it right = no time to do it at all. |
| "The code is a mess, needs complete rewrite" | Gradual refactoring with tests beats big-bang rewrite. |

## Red Flags — STOP and Add Tests

- About to refactor without verifying tests pass first
- "I'll write tests later" (for existing code being refactored)
- "This is just a small change" (without running tests)
- Mixing refactoring with feature additions
- Refactoring multiple unrelated concerns at once
- "The tests are in the way" (wanting to skip them)

**All of these mean: STOP. Verify tests pass. Add missing tests. Then refactor.**

## Metrics to Track

- Cyclonic complexity (aim for <10)
- Lines of method (aim for <30)
- Class length (aim for <200 lines)
- Test coverage (maintain or improve)
- Technical debt ratio
