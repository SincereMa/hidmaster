---
name: subagent
description: Use when delegating tasks to specialized agents, running independent tasks in parallel, or orchestrating multi-agent workflows
category: collaboration
prerequisites:
  - Task must be well-defined with clear success criteria
  - Task must be isolatable from main context
  - Agent type must match task complexity
output:
  - Delegated results with status
  - Parallel task outcomes (when fan-out used)
---

# Subagent Orchestration

## Overview

Delegate complex subtasks to specialized background agents. Supports sequential delegation, parallel fan-out, and conditional branching.

**Core principle:** Minimize context passing, maximize task independence.

## When to Use

- Complex tasks requiring deep focus
- Long-running operations that shouldn't block main flow
- Multiple independent tasks that can run concurrently
- Tasks needing specialized expertise (explore, general)
- Work that can proceed while main agent handles other tasks

## Agent Types

| Type | Use For | Strengths | Limitations |
|------|---------|-----------|-------------|
| **Explore** | Code discovery, file searches, pattern matching | Fast reads, glob/grep | Cannot modify files |
| **General** | Multi-step implementation, analysis with decisions | Full tool access | Higher latency |

## Workflow

### 1. Define Task Boundary

```yaml
task: "Refactor authentication module"
scope:
  - files: ["src/auth/*.ts"]
  - constraints: ["maintain API compatibility"]
success_criteria:
  - All tests pass
  - No breaking changes
```

### 2. Select Agent Type

```
Simple search → explore
Complex implementation → general
Analysis + report → explore (with output_schema)
```

### 3. Spawn with Context

```javascript
const agent = await spawn({
  type: "general",
  task: "Refactor auth module to use JWT",
  context: {
    files: ["src/auth.ts", "src/auth.test.ts"],
    constraints: ["Keep existing API"],
  }
});
```

### 4. Monitor and Collect

```javascript
const status = await agent.status();
const result = await agent.wait();
if (result.status === "success") {
  integrate(result.output);
}
```

---

## Parallel Execution

When you have multiple independent tasks, run them concurrently instead of sequentially.

### When to Parallelize

- Multiple file reads/writes with no dependencies
- Running independent searches or analyses
- Processing collections of similar items
- Parallel testing or validation steps

### When NOT to Parallelize

- Tasks share mutable state
- Task B depends on Task A's output
- Agents would edit the same files
- You need full system context to understand the problem

### Parallel Fan-out Pattern

```
        ┌→ Task B1 →┐
Task A →├→ Task B2 →├→ Task C
        └→ Task B3 →┘
```

**Example:**
```javascript
// Spawn all tasks simultaneously
const results = await Promise.all([
  spawnSubagent({ task: "Fix test-file-A", type: "general" }),
  spawnSubagent({ task: "Fix test-file-B", type: "general" }),
  spawnSubagent({ task: "Fix test-file-C", type: "general" })
]);

// Results arrive in arbitrary order
const merged = mergeResults(results);
```

### Anti-Patterns

| Pattern | Problem | Fix |
|---------|---------|-----|
| Serial when parallel | Wastes time on independent tasks | Use Promise.all or concurrent dispatch |
| Shared state violation | Task A writes file, Task B reads same file | Ensure task isolation |
| No result merging | Results arrive but never combined | Collect and synthesize |

---

## Task Chaining Patterns

### Linear Chain
```
Task A → Task B → Task C
Each task's output feeds next task's input
```

### Conditional Branch
```
Task A → if (result.x > threshold) → Task B
                else → Task C
```

---

## Best Practices

1. **Minimize context passing** — Only include what subagent needs
2. **Clear success criteria** — Subagent must know when task is complete
3. **Appropriate scope** — Don't give subagent too much or too little
4. **Error handling** — Plan for subagent failure/retry
5. **Resource limits** — Set timeouts, avoid infinite loops
6. **Verify isolation** — Parallel tasks must not share mutable state

## Example: Feature Implementation

**Goal:** Add dark mode toggle

**Orchestration:**
1. Main agent: Analyze existing theme system
2. Spawn subagent-1: "Implement ThemeContext provider"
3. Spawn subagent-2: "Create toggle component"
4. Spawn subagent-3: "Update styles for dark mode"
5. Wait for all three
6. Main agent: Integration testing, fix conflicts

## Integration

**Related skills:**
- **handoff** — Transfer task context between agents
- **tdd** — Subagents should follow TDD for each task
- **verify** — Verify subagent results before claiming completion

**Workflow:**
```
subagent (parallel) → verify → ship
```
