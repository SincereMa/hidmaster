---
name: optimize
description: Use when improving application performance, identifying bottlenecks, or reviewing code for performance issues before merge
category: development
prerequisites:
  - Performance requirements defined
  - Baseline metrics established
  - Profiling tools available
output:
  - Performance improvements
  - Optimized algorithms
  - Resource efficiency gains
  - Performance review reports (when used in review mode)
---

# Optimize Skill

## Overview

Systematically identify and resolve performance bottlenecks. Covers both active optimization and pre-merge performance review.

**Core principle:** Measure first, optimize incrementally, validate changes.

## The Iron Law

```
NO OPTIMIZATION WITHOUT MEASUREMENT FIRST
```

If you haven't established a baseline and profiled the bottleneck, you cannot propose optimizations.

**Violating the letter of this rule is violating the spirit of optimization.**

## When to Use

**Active optimization:**
- Application feels slow or unresponsive
- Memory usage grows over time
- CPU utilization is high
- Database queries are slow
- API response times exceed SLA

**Review mode (before merge):**
- Reviewing code with performance implications
- Adding new API endpoints or services
- Processing large datasets or high throughput
- After performance regression reports

## Mode 1: Active Optimization

### Phase 1: Measure

1. **Establish baseline** — current performance metrics
2. **Define targets** — what "fast enough" means
3. **Set up monitoring** — tools for ongoing measurement
4. **Profile the application** — find actual bottlenecks

### Phase 2: Identify Bottlenecks

| Area | Tools |
|------|-------|
| **CPU** | Chrome DevTools, Node Clinic, pprof, cProfile |
| **Memory** | Heap snapshots, allocation tracking, memory timelines |
| **I/O** | Disk read/write, network calls, database queries |
| **Rendering** | Paint times, layout shifts, script execution time |

### Phase 3: Optimize

#### Algorithmic
- Reduce complexity: O(n²) → O(n log n) → O(n) → O(1)
- Cache expensive computations (memoization, lazy evaluation)
- Eliminate redundant work

#### Data Structures
- Choose right structure: Array vs Set vs Map vs Object
- Minimize copies: use references, views, slices
- Batch operations to reduce allocations

#### I/O
- Async everything — don't block on I/O
- Batch requests to reduce round trips
- Cache results: HTTP cache, Redis, in-memory
- Lazy load — load only when needed

#### Memory
- Fix leaks: remove event listeners, clear timers
- Object pooling for expensive objects
- Weak references to allow garbage collection
- Reuse buffers, avoid closures in hot paths

#### Rendering (UI)
- Virtual scrolling for large lists
- Debounce/throttle event handlers
- Memoize components to prevent re-renders
- Code splitting for on-demand loading

### Phase 4: Validate

1. Run benchmarks — confirm improvement
2. Test correctness — ensure no behavior changes
3. Check regressions — didn't break other paths
4. Monitor in production — real-world validation

---

## Mode 2: Performance Review (Pre-Merge)

Use this mode when reviewing code changes for performance risks before merge.

### Review Phase 1: Impact Assessment (5-10 min)

1. **Identify hot paths** — is this on a critical/user-facing path?
2. **Estimate load** — expected throughput/latency
3. **Check data volume** — how much data will this process?
4. **Review dependencies** — does it call external services?

### Review Phase 2: Static Analysis (15-20 min)

**Algorithmic efficiency:**
- Time complexity: check for O(n²) or worse patterns
- Space complexity: memory-intensive data structures, unnecessary creation
- Redundant work: same computation done multiple times?

**I/O operations:**
- N+1 query patterns?
- Proper indexing utilized?
- Batch operations where possible?
- Async operations for I/O?

**Concurrency:**
- Independent operations that could run concurrently?
- Lock contention or race condition risks?

### Review Phase 3: Dynamic Analysis (15-20 min)

1. Review existing profiles (if available) — flame graphs, heap snapshots
2. Estimate resource usage — memory per request, CPU per operation
3. Identify scaling limits — theoretical max throughput

### Review Phase 4: Recommendations (10-15 min)

1. Identify what to measure — KPIs, acceptable thresholds
2. Suggest benchmark scenarios — load testing, stress testing
3. Monitoring recommendations — metrics to track, alert thresholds

### Review Output Format

```markdown
## Performance Review: [Feature/Branch]

### Impact Assessment
| Aspect | Impact | Risk |
|--------|--------|------|
| Latency | [H/M/L] | [H/M/L] |
| Throughput | [H/M/L] | [H/M/L] |
| Memory | [H/M/L] | [H/M/L] |
| CPU | [H/M/L] | [H/M/L] |

### Bottlenecks Found
- [PERF-001] [Title]: [file:line] — [issue] — [fix] — [effort]

### Recommendations
1. [recommendation]
2. [recommendation]

### Sign-off
- [ ] Performance acceptable for merge
- [ ] Benchmarks recommended before production
```

---

## Common Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| N+1 queries | 1 query + N more | JOIN or batch |
| Synchronous I/O | Blocking event loop | Async/await |
| Unbounded loops | Memory/CPU exhaustion | Pagination/breaks |
| Missing indexes | Full table scans | Add index |
| No caching | Redundant computation | Cache layer |
| Large objects | Memory pressure | Streaming/pagination |

## Examples

### N+1 Query Fix
```python
# Before: N queries
users = User.objects.all()
for user in users:
    orders = Order.objects.filter(user=user)

# After: 1 query
users = User.objects.prefetch_related('orders').all()
```

### Memoization
```javascript
// Before: O(2^n)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// After: O(n)
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
```

## Common Rationalizations

| Excuse | Reality |
|--------|---------|
| "I can see the bottleneck" | Intuition is wrong more often than you think. Measure. |
| "This is obviously slow" | Obviously slow ≠ root cause. Profile to find real bottleneck. |
| "Just add caching" | Cache invalidation is one of the two hard problems. Measure first. |
| "The code looks inefficient" | Looks ≠ is. Profile before changing. |

## Red Flags — STOP and Measure

- About to optimize without profiling
- "I know where the bottleneck is" (without data)
- Adding cache without measuring current performance
- Optimizing code that isn't on the hot path

**All of these mean: STOP. Run the profiler. Get numbers first.**

## Performance Budget

```
Metric                    Target    Current    Status
First Contentful Paint    <1.0s     [measured] [pass/fail]
Time to Interactive       <2.0s     [measured] [pass/fail]
Total Bundle Size         <200KB    [measured] [pass/fail]
Memory Usage              <50MB     [measured] [pass/fail]
API Response Time (p95)   <200ms    [measured] [pass/fail]
```

## Integration

**Related skills:**
- **debug** — If performance issue is a bug, follow systematic debugging
- **validate** — Verify optimizations don't break functionality
- **code-review** — Review code quality alongside performance

**Workflow:**
```
optimize (review mode) → code-review → validate → ship
optimize (active) → validate → ship
```
