---
name: subagent
description: Delegate subtasks to specialized agents with clear boundaries
category: collaboration
triggers:
  - subagent
  - delegate
  - subtask
  - background
prerequisites:
  - Task must be well-defined with clear success criteria
  - Task must be isolatable from main context
  - Agent type must match task complexity
output:
  type: delegated_result
  format: agent-specific output with status
---

# Subtask Management

## Purpose
Delegate complex subtasks to specialized background agents while maintaining orchestration control. Each subagent operates independently with its own context.

## When to Use
- Complex tasks requiring deep focus
- Long-running operations that shouldn't block main flow
- Tasks needing specialized expertise (explore, general, etc.)
- Work that can proceed while main agent handles other tasks

## Agent Types

### Explore Agent
- **Use for:** Code discovery, file searches, pattern matching
- **Strengths:** Fast reads, glob/grep operations
- **Limitations:** Cannot modify files

### General Agent  
- **Use for:** Multi-step implementation, analysis with decisions
- **Strengths:** Full tool access, can read/write files
- **Limitations:** Higher latency, more resource usage

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
  - Code coverage maintained
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
    // Pass relevant context, not entire history
  }
});
```

### 4. Monitor and Collect
```javascript
// Check status periodically
const status = await agent.status();

// Wait for completion
const result = await agent.wait();

// Handle result
if (result.status === "success") {
  integrate(result.output);
}
```

## Task Chaining

### Linear Chain
```
Task A → Task B → Task C
Each task's output feeds next task's input
```

### Parallel Fan-out
```
        ┌→ Task B1 →┐
Task A →├→ Task B2 →├→ Task C
        └→ Task B3 →┘
```

### Conditional Branch
```
Task A → if (result.x > threshold) → Task B
                else → Task C
```

## Best Practices

1. **Minimize context passing** - Only include what subagent needs
2. **Clear success criteria** - Subagent must know when task is complete
3. **Appropriate scope** - Don't give subagent too much or too little
4. **Error handling** - Plan for subagent failure/retry
5. **Resource limits** - Set timeouts, avoid infinite loops

## Example: Feature Implementation

**Goal:** Add dark mode toggle

**Orchestration:**
1. Main agent: Analyze existing theme system
2. Spawn subagent-1: "Implement ThemeContext provider"
3. Spawn subagent-2: "Create toggle component"  
4. Spawn subagent-3: "Update styles for dark mode"
5. Wait for all three
6. Main agent: Integration testing, fix conflicts