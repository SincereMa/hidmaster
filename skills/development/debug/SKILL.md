---
name: debug
description: Systematic debugging methodology for identifying and resolving software defects
category: development
prerequisites:
  - Access to error messages or stack traces
  - Understanding of expected vs actual behavior
  - Access to relevant source code
output:
  - Root cause identification
  - Fix implementation
  - Regression prevention
---

# Debug Skill

## Purpose

Systematically identify, analyze, and resolve software defects using a structured methodology that minimizes guesswork and ensures thorough investigation.

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1 (Reproduce + Isolate), you cannot propose fixes.

**Violating the letter of this process is violating the spirit of debugging.**

## When to Use

- Runtime errors or exceptions occur
- Tests fail unexpectedly
- Behavior doesn't match specifications
- Performance degrades without obvious cause
- Intermittent or hard-to-reproduce issues
- Integration failures between components

**Use this ESPECIALLY when:**
- Under time pressure (emergencies make guessing tempting)
- "Just one quick fix" seems obvious
- You've already tried multiple fixes
- Previous fix didn't work
- You don't fully understand the issue

## Workflow

### Phase 1: Reproduce

1. **Confirm the bug exists** - Verify the issue is reproducible
2. **Document exact steps** - Create minimal reproduction steps
3. **Capture error output** - Save full error messages, stack traces, logs
4. **Identify environment** - Note OS, runtime version, dependencies

### Phase 2: Isolate

1. **Binary search the codebase** - Comment out code to narrow the failure range
2. **Check recent changes** - Review git log for related modifications
3. **Add strategic logging** - Insert console.log/print at key checkpoints
4. **Use debugger** - Set breakpoints and step through execution
5. **Check dependencies** - Verify library versions, external services

### Phase 3: Analyze

1. **Read the error message carefully** - Extract file, line, variable names
2. **Trace data flow** - Follow values from input to failure point
3. **Check assumptions** - Verify preconditions, types, null states
4. **Review similar code** - Look for patterns that work correctly

### Phase 4: Fix

1. **Implement minimal fix** - Change only what's necessary
2. **Verify the fix works** - Run reproduction steps, confirm resolution
3. **Check for side effects** - Test related functionality
4. **Write regression test** - Prevent the bug from returning

### Phase 5: Document

1. **Add code comments** - Explain non-obvious fix rationale
2. **Update issue tracker** - Document root cause and solution
3. **Share learnings** - Note if this reveals a systemic issue

## Output Format

```
## Bug Report

### Issue
[Clear description of the problem]

### Root Cause
[Technical explanation of why it happened]

### Fix
[What was changed and why]

### Prevention
[How to avoid similar issues]

### Files Modified
- [file path]: [brief description of change]
```

## Examples

### Example 1: Null Reference Error

**Symptom**: `TypeError: Cannot read property 'name' of undefined`

**Debug Process**:
1. Check where 'name' is accessed
2. Trace why the object is undefined
3. Add null check or fix initialization

**Fix**:
```javascript
// Before
const name = user.profile.name;

// After
const name = user?.profile?.name ?? 'Unknown';
```

### Example 2: Test Failure

**Symptom**: Unit test expects 200, gets 500

**Debug Process**:
1. Check test setup - is mock configured correctly?
2. Check request - are headers/body correct?
3. Check handler - is the route registered?

**Fix**: Mock not returning expected format for new API version.

## Error Handling

| Error Type | Action |
|------------|--------|
| Cannot reproduce | Check environment variables, timing issues, race conditions |
| Intermittent failures | Look for concurrency issues, resource leaks, flaky tests |
| Dependency conflicts | Check version constraints, lockfiles, peer dependencies |
| Memory errors | Profile memory usage, check for leaks, review data structures |
| Type errors | Add type checks, use TypeScript strict mode, validate inputs |

## Debugging Tools Checklist

- [ ] Browser DevTools / IDE Debugger
- [ ] Console logging (strategic placement)
- [ ] Network inspector (API calls, responses)
- [ ] Profiler (CPU, memory)
- [ ] Git bisect (find regression commit)
- [ ] Reproduction script (isolated test case)

## Integration

**Related skills:**
- **tdd** — Write failing test reproducing the bug, then fix
- **validate** — Verify fix worked before claiming success
- **optimize** — If debug reveals performance issue, use optimize skill

**Workflow chain:**
```
debug → tdd (write regression test) → validate → ship
```

**Next skill:** After root cause is found, use **tdd** to write a failing regression test, then fix the bug.

## Common Anti-Patterns

- **Guessing without evidence** - Always verify assumptions
- **Changing multiple things at once** - Change one thing, test, repeat
- **Ignoring error messages** - Read the full stack trace
- **Skipping reproduction** - Reproduce before fixing
- **Not writing regression tests** - Prevents the same bug twice

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "Issue is simple, don't need process" | Simple issues have root causes too. Process is fast for simple bugs. |
| "Emergency, no time for process" | Systematic debugging is FASTER than guess-and-check thrashing. |
| "Just try this first, then investigate" | First fix sets the pattern. Do it right from the start. |
| "I'll write test after confirming fix works" | Untested fixes don't stick. Test first proves it. |
| "Multiple fixes at once saves time" | Can't isolate what worked. Causes new bugs. |
| "I see the problem, let me fix it" | Seeing symptoms ≠ understanding root cause. |
| "One more fix attempt" (after 2+ failures) | 3+ failures = architectural problem. Question pattern, don't fix again. |

## Red Flags — STOP and Follow Process

If you catch yourself thinking:
- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Add multiple changes, run tests"
- "Skip the test, I'll manually verify"
- "It's probably X, let me fix that"
- "I don't fully understand but this might work"
- Proposing solutions before tracing data flow
- **"One more fix attempt" (when already tried 2+)**

**ALL of these mean: STOP. Return to Phase 1 (Reproduce).**

**If 3+ fixes failed:** Question the architecture — is this pattern fundamentally sound?
