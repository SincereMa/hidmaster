---
name: optimize
description: Performance optimization techniques for improving speed, memory, and resource efficiency
category: development
triggers:
  - slow
  - performance
  - optimize
  - bottleneck
  - memory leak
  - high cpu
  - latency
  - throughput
  - cache
  - scale
prerequisites:
  - Performance requirements defined
  - Baseline metrics established
  - Profiling tools available
output:
  - Performance improvements
  - Optimized algorithms
  - Resource efficiency gains
---

# Optimize Skill

## Purpose

Systematically identify and resolve performance bottlenecks to improve application speed, memory usage, and resource efficiency while maintaining correctness.

## When to Use

- Application feels slow or unresponsive
- Memory usage grows over time
- CPU utilization is high
- Database queries are slow
- API response times exceed SLA
- User experience degrades under load
- Resource costs are too high

## Workflow

### Phase 1: Measure

1. **Establish baseline** - Current performance metrics
2. **Define targets** - What "fast enough" means
3. **Set up monitoring** - Tools for ongoing measurement
4. **Profile the application** - Find actual bottlenecks

### Phase 2: Identify Bottlenecks

1. **Profile CPU usage** - Find hot paths
   - JavaScript: Chrome DevTools, Node Clinic
   - Python: cProfile, py-spy
   - Go: pprof
   - Java: VisualVM, JProfiler
2. **Profile memory** - Find leaks and high allocation
   - Heap snapshots
   - Allocation tracking
   - Memory timelines
3. **Profile I/O** - Find blocking operations
   - Disk read/write
   - Network calls
   - Database queries
4. **Profile rendering** - UI performance
   - Paint times
   - Layout shifts
   - Script execution time

### Phase 3: Optimize

#### Algorithmic Optimizations
1. **Reduce complexity** - O(n²) → O(n log n) → O(n) → O(1)
2. **Cache expensive computations** - Memoization, lazy evaluation
3. **Eliminate redundant work** - Don't compute twice

#### Data Structure Optimizations
1. **Choose right structure** - Array vs Set vs Map vs Object
2. **Minimize copies** - Use references, views, slices
3. **Batch operations** - Reduce individual allocations

#### I/O Optimizations
1. **Async everything** - Don't block on I/O
2. **Batch requests** - Reduce round trips
3. **Cache results** - HTTP cache, Redis, in-memory
4. **Lazy load** - Load only when needed

#### Memory Optimizations
1. **Fix leaks** - Remove event listeners, clear timers
2. **Object pooling** - Reuse expensive objects
3. **Weak references** - Allow garbage collection
4. **Reduce allocations** - Reuse buffers, avoid closures in hot paths

#### Rendering Optimizations (UI)
1. **Virtual scrolling** - Render only visible items
2. **Debounce/throttle** - Limit event handlers
3. **Memoize components** - Prevent unnecessary re-renders
4. **Code splitting** - Load code on demand

### Phase 4: Validate

1. **Run benchmarks** - Confirm improvement
2. **Test correctness** - Ensure no behavior changes
3. **Check regressions** - Didn't break other paths
4. **Monitor in production** - Real-world validation

## Output Format

```
## Performance Report

### Problem
[What was slow]

### Analysis
[Profiling results, bottleneck identification]

### Solution
[What was optimized and how]

### Results
- Before: [metric]
- After: [metric]
- Improvement: [percentage/amount]

### Trade-offs
[Any downsides of the optimization]

### Files Modified
- [list]
```

## Examples

### Example 1: N+1 Query Problem

**Before**:
```python
users = User.objects.all()
for user in users:
    orders = Order.objects.filter(user=user)  # N queries
```

**After**:
```python
users = User.objects.prefetch_related('orders').all()  # 1 query
for user in users:
    orders = user.orders.all()  # Already loaded
```

**Result**: 100 users → 101 queries → 2 queries

### Example 2: Memoization

**Before**:
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // O(2^n)
}
```

**After**:
```javascript
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}
```

**Result**: O(2^n) → O(n)

### Example 3: Virtual Scrolling

**Before**: Rendering 10,000 list items → 500ms, 500MB memory

**After**: Render only visible 20 items → 16ms, 5MB memory

## Optimization Categories Quick Reference

| Category | Technique | Impact |
|----------|-----------|--------|
| CPU | Memoization | High for expensive computations |
| CPU | Reduce algorithm complexity | Critical for large data |
| Memory | Fix leaks | Prevents crashes, improves stability |
| Memory | Object pooling | Reduces GC pressure |
| I/O | Caching | Reduces latency, bandwidth |
| I/O | Batching | Reduces overhead, round trips |
| I/O | Async/parallel | Improves throughput |
| Rendering | Virtualization | Critical for large lists |
| Rendering | Lazy loading | Faster initial load |

## Error Handling

| Situation | Action |
|-----------|--------|
| Optimization breaks tests | Revert, ensure optimization preserves semantics |
| Improvement is marginal | Move on, focus on bigger bottlenecks |
| Memory usage still high | Look for leaks, check third-party libraries |
| Cache invalidation issues | Implement proper invalidation strategy |
| Complexity increases significantly | Consider if optimization is worth it |

## Anti-Patterns

- **Premature optimization** - Measure first, optimize what matters
- **Micro-optimizations** - Fix big problems, not nanoseconds
- **Caching everything** - Cache invalidation is hard; cache strategically
- **Ignoring correctness** - Fast but wrong is worse than slow and right
- **Not measuring** - Can't improve what you don't measure
- **Over-optimization** - Stop when it's fast enough

## Tools by Language

### JavaScript/TypeScript
- Chrome DevTools Performance tab
- Node.js Clinic.js
- 0x for flame graphs
- Bundlephobia for bundle size

### Python
- cProfile, line_profiler
- memory_profiler
- py-spy
- Scalene

### Go
- pprof
- benchstat
- go test -bench
- trace tool

### Java/JVM
- JProfiler, VisualVM
- JMH for micro-benchmarks
- GC logs
- Flight Recorder

## Performance Budget Template

```
Metric                    Target    Current    Status
First Contentful Paint    <1.0s     [measured] [pass/fail]
Time to Interactive       <2.0s     [measured] [pass/fail]
Total Bundle Size         <200KB    [measured] [pass/fail]
Memory Usage              <50MB     [measured] [pass/fail]
API Response Time (p95)   <200ms    [measured] [pass/fail]
```
