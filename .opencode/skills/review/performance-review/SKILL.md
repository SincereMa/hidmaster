---
name: performance-review
description: Performance bottleneck identification and optimization recommendations
category: review
triggers:
  - performance review
  - performance audit
  - slow code
  - bottleneck analysis
  - performance optimization
  - latency review
  - efficiency check
prerequisites:
  - Code changes identified for review
  - Performance requirements and SLAs defined
  - Baseline metrics available
  - Profiling tools accessible
output:
  type: performance_report
  format: markdown
  sections:
    - performance_assessment
    - bottlenecks_identified
    - optimization_opportunities
    - recommendations
    - benchmarks
---

# Performance Review Skill

## Purpose

Identify performance bottlenecks, inefficiencies, and optimization opportunities in code changes before they impact production performance.

## When to Use

- Before merging code with performance implications
- When adding new API endpoints or services
- When processing large datasets or high throughput
- After performance regression reports
- Before scaling decisions
- When reviewing database queries or I/O operations

## Prerequisites

- Code changes identified for review
- Performance requirements and SLAs documented
- Baseline metrics available for comparison
- Profiling tools configured (if applicable)

## Detailed Workflow

### Phase 1: Impact Assessment (5-10 minutes)

1. **Identify hot paths** - Is this code on a critical/user-facing path?
2. **Estimate load** - What throughput/latency is expected?
3. **Check data volume** - How much data will this process?
4. **Review dependencies** - Does it call external services?

### Phase 2: Static Analysis (15-20 minutes)

#### Algorithmic Efficiency

1. **Time complexity**
   - Identify loops and nested operations
   - Check for O(n²) or worse patterns
   - Look for unnecessary iterations
   - Verify recursive calls have proper base cases

2. **Space complexity**
   - Check for memory-intensive data structures
   - Identify unnecessary object creation
   - Look for memory leak patterns

3. **Redundant work**
   - Same computation done multiple times?
   - Results cached where appropriate?
   - Lazy evaluation where possible?

#### I/O Operations

1. **Database queries**
   - N+1 query patterns?
   - Proper indexing utilized?
   - Batch operations where possible?
   - Connection pooling configured?

2. **Network calls**
   - Request batching opportunities?
   - Connection reuse?
   - Timeout handling?
   - Retry logic with backoff?

3. **File system**
   - Streaming for large files?
   - Buffered I/O?
   - Async operations?

#### Concurrency & Parallelism

1. **Parallelization opportunities**
   - Independent operations that could run concurrently?
   - CPU-bound work that could use worker threads?

2. **Synchronization**
   - Lock contention risks?
   - Race conditions?
   - Deadlock potential?

### Phase 3: Dynamic Analysis (15-20 minutes)

1. **Review existing profiles** (if available)
   - CPU flame graphs
   - Memory heap snapshots
   - I/O traces

2. **Estimate resource usage**
   - Memory footprint per request
   - CPU time per operation
   - Database connections needed

3. **Identify scaling limits**
   - What's the theoretical max throughput?
   - Where will it break first?

### Phase 4: Benchmark Recommendations (10-15 minutes)

1. **Identify what to measure**
   - Key performance indicators
   - Acceptable thresholds

2. **Suggest benchmark scenarios**
   - Load testing parameters
   - Stress testing limits

3. **Monitoring recommendations**
   - Metrics to track
   - Alert thresholds

## Output Format

```markdown
## Performance Review: [Feature/Branch Name]

### Performance Impact Assessment
| Aspect | Impact | Risk Level |
|--------|--------|------------|
| Latency | [High/Med/Low] | [High/Med/Low] |
| Throughput | [High/Med/Low] | [High/Med/Low] |
| Memory | [High/Med/Low] | [High/Med/Low] |
| CPU | [High/Med/Low] | [High/Med/Low] |

### Overall Performance Risk: [HIGH/MEDIUM/LOW]

### Bottlenecks Identified

#### Critical (blocks scale)
1. **[PERF-001] [Title]**
   - **Location**: file:line
   - **Issue**: [description of bottleneck]
   - **Impact**: [estimated performance impact]
   - **Current**: [metric if known]
   - **Expected**: [estimated metric]
   - **Fix**: [specific optimization]
   - **Effort**: [hours/days]

#### High (affects performance)
1. **[PERF-002] [Title]**
   - [same structure]

#### Medium (optimization opportunity)
1. **[PERF-003] [Title]**
   - [same structure]

### Optimization Opportunities
1. **[file:line]** - [Quick win that improves performance]
2. **[file:line]** - [Another improvement]

### Database Query Analysis
| Query | Issue | Recommendation |
|-------|-------|----------------|
| [query] | [N+1 / missing index] | [fix] |

### Memory Analysis
- **Estimated per-request**: [X MB]
- **Potential leak**: [yes/no, location]
- **Optimization opportunity**: [description]

### Scaling Considerations
- **Current limit**: [estimated requests/sec]
- **Bottleneck**: [what limits scale]
- **Improvement**: [how to increase limit]

### Recommended Benchmarks
1. [benchmark scenario 1]
2. [benchmark scenario 2]

### Monitoring Recommendations
| Metric | Threshold | Alert |
|--------|-----------|-------|
| Response Time (p95) | [Xms] | [yes/no] |
| Memory Usage | [X MB] | [yes/no] |
| CPU Usage | [X%] | [yes/no] |

### Files Reviewed
- [list of files with performance notes]

### Sign-off
- [ ] Performance acceptable for merge
- [ ] Benchmarks recommended before production
- [ ] Monitoring configured
```

## Common Performance Patterns

### Anti-Patterns to Watch For

| Pattern | Problem | Fix |
|---------|---------|-----|
| N+1 queries | 1 query + N more | JOIN or batch |
| Synchronous I/O | Blocking event loop | Async/await |
| Unbounded loops | Memory/CPU exhaustion | Pagination/breaks |
| Missing indexes | Full table scans | Add index |
| No caching | Redundant computation | Cache layer |
| Large objects | Memory pressure | Streaming/pagination |
| Tight coupling | Cascade failures | Circuit breaker |

### Optimization Quick Reference

| Situation | Optimization |
|-----------|--------------|
| Slow database queries | Add indexes, optimize queries, use connection pooling |
| High memory usage | Stream large data, fix leaks, use generators |
| CPU bottleneck | Cache results, parallelize, optimize algorithms |
| Network latency | Batch requests, use CDN, connection reuse |
| High latency | Async operations, lazy loading, code splitting |

## Examples

### Example 1: N+1 Query Problem

**Code**:
```javascript
const orders = await Order.findAll();
for (const order of orders) {
  order.user = await User.findById(order.userId); // N queries
}
```

**Finding**: N+1 query pattern
**Impact**: 1000 orders = 1001 queries (~5 seconds)
**Fix**:
```javascript
const orders = await Order.findAll({ include: ['user'] }); // 1 query
```
**Expected**: ~50ms (100x improvement)

### Example 2: Synchronous File Processing

**Code**:
```javascript
for (const file of files) {
  const data = fs.readFileSync(file); // Blocks event loop
  process(data);
}
```

**Finding**: Synchronous I/O blocking
**Impact**: Server unresponsive during processing
**Fix**:
```javascript
for (const file of files) {
  const data = await fs.promises.readFile(file);
  await process(data);
}
```
**Expected**: Non-blocking, responsive server

## Error Handling

| Situation | Action |
|-----------|--------|
| Performance impact unclear | Recommend profiling before merge |
| Bottleneck in third-party code | Document limitation, suggest workaround |
| Optimization breaks tests | Revert, optimize while maintaining correctness |
| Micro-optimization suggested | Focus on bigger wins first |
| Requires architectural change | Flag for discussion, estimate effort |

## Performance Review Checklist

- [ ] Algorithms have acceptable complexity
- [ ] No N+1 query patterns
- [ ] Database queries optimized with indexes
- [ ] I/O operations are asynchronous
- [ ] Large data streams instead of loading entirely
- [ ] Caching used for expensive computations
- [ ] Connection pooling configured
- [ ] Memory usage bounded
- [ ] No memory leak patterns
- [ ] Timeouts configured for external calls

## Metrics for Success

- Performance regressions caught before merge
- Latency improvements measured and documented
- Memory leaks identified before production
- Scalability limits understood
