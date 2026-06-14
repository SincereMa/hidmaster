---
name: debug
description: Systematic debugging methodology for identifying and resolving software defects
category: development
triggers:
  - bug
  - error
  - crash
  - broken
  - failing
  - not working
  - issue
  - problem
  - exception
  - undefined is not a function
  - cannot read property
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

## When to Use

- Runtime errors or exceptions occur
- Tests fail unexpectedly
- Behavior doesn't match specifications
- Performance degrades without obvious cause
- Intermittent or hard-to-reproduce issues
- Integration failures between components

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

## Common Anti-Patterns

- **Guessing without evidence** - Always verify assumptions
- **Changing multiple things at once** - Change one thing, test, repeat
- **Ignoring error messages** - Read the full stack trace
- **Skipping reproduction** - Reproduce before fixing
- **Not writing regression tests** - Prevents the same bug twice
