---
name: parallel
description: Execute independent tasks concurrently to optimize workflow speed
category: collaboration
triggers:
  - parallel
  - concurrent
  - simultaneous
  - batch
prerequisites:
  - Tasks must be independent (no shared mutable state)
  - Tasks must be isolatable (each can run in its own context)
output:
  type: results
  format: array of task outcomes
---

# Parallel Task Execution

## Purpose
Execute multiple independent tasks simultaneously to reduce total execution time. Ideal for operations that don't depend on each other's outputs.

## When to Use
- Multiple file reads/writes with no dependencies
- Running independent searches or analyses
- Processing collections of similar items
- Parallel testing or validation steps

## Workflow

### 1. Identify Parallelizable Tasks
```
Task A: Read file X
Task B: Read file Y  
Task C: Search for pattern Z
→ All three can run concurrently
```

### 2. Spawn Parallel Subagents
```javascript
// Spawn all tasks simultaneously
const results = await Promise.all([
  spawnSubagent({ task: "Read file X", type: "explore" }),
  spawnSubagent({ task: "Read file Y", type: "explore" }),
  spawnSubagent({ task: "Search for pattern Z", type: "explore" })
]);
```

### 3. Collect and Merge Results
```javascript
// Results arrive in arbitrary order
const merged = mergeResults(results);
// Process consolidated output
```

## Anti-Patterns

### Serial When Parallel
```
❌ BAD: Read file A → Read file B → Read file C
✅ GOOD: Read A, B, C in parallel
```

### Shared State Violation
```
❌ BAD: Task A writes to file, Task B reads same file
✅ GOOD: Task A writes to file1, Task B reads file2
```

## Example: Codebase Analysis

**Goal:** Understand project structure, dependencies, and test coverage

**Parallel approach:**
1. Spawn explore agent: "List all source files"
2. Spawn explore agent: "Parse package.json dependencies"  
3. Spawn explore agent: "Find all test files"
4. Wait for all results
5. Synthesize findings

## Metrics
- Track: tasks_spawned, tasks_completed, total_wall_time
- Compare against serial execution time
- Target: 3-5x speedup for typical workloads