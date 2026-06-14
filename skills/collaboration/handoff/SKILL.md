---
name: handoff
description: Transfer task context and control between agents seamlessly
category: collaboration
triggers:
  - handoff
  - transfer
  - continue
  - resume
prerequisites:
  - Source agent must document current state
  - Target agent must understand task context
  - Clear boundary between source/target responsibilities
output:
  type: handoff_package
  format: context + state + next_actions
---

# Task Handoff

## Purpose
Transfer in-progress work from one agent to another, preserving context and maintaining momentum. Critical for long-running tasks or when specialized expertise is needed.

## When to Use
- Task complexity exceeds current agent's capabilities
- Need to switch between exploration and implementation
- Handing off from background agent to main agent
- Resuming interrupted work in new session

## Handoff Package

### Required Components
```yaml
handoff:
  task_id: "feature-dark-mode"
  source_agent: "explore-1"
  target_agent: "general-2"
  
  context:
    summary: "Analyzed theme system, identified integration points"
    files_read: ["src/theme.ts", "src/styles.css"]
    files_modified: []
    
  state:
    completed: ["dependency analysis", "pattern identification"]
    in_progress: []
    blocked: []
    
  next_actions:
    - "Create ThemeContext provider"
    - "Implement toggle component"
    - "Update existing styles"
    
  constraints:
    - "Maintain API compatibility"
    - "Follow existing code patterns"
    
  artifacts:
    - path: "docs/theme-analysis.md"
      description: "Analysis of current theme implementation"
```

## Workflow

### 1. Prepare Handoff (Source Agent)
```javascript
// Document current state
const handoff = {
  context: summarizeWork(),
  state: getCurrentState(),
  next: identifyNextActions(),
  constraints: getConstraints()
};

// Save artifacts if needed
await saveArtifacts(handoff.artifacts);
```

### 2. Execute Transfer
```javascript
// Method 1: Spawn new agent with handoff context
const newAgent = await spawn({
  type: "general",
  task: "Continue dark mode implementation",
  context: handoff
});

// Method 2: Send to existing agent
await existingAgent.send({
  type: "handoff",
  content: handoff
});
```

### 3. Receive and Resume (Target Agent)
```javascript
// Parse handoff package
const { context, state, next } = parseHandoff(message);

// Verify understanding
validateContext(context);

// Resume from last checkpoint
for (const action of state.completed) {
  markComplete(action);
}

// Execute remaining actions
for (const action of next) {
  await execute(action);
}
```

## State Serialization

### Checkpoint Format
```json
{
  "version": "1.0",
  "timestamp": "2024-01-15T10:30:00Z",
  "task": {
    "id": "T1",
    "summary": "Implement user authentication",
    "status": "in_progress"
  },
  "progress": {
    "completed": ["schema design", "API endpoints"],
    "current": "JWT integration",
    "remaining": ["middleware", "tests"]
  },
  "files": {
    "created": ["src/auth/jwt.ts"],
    "modified": ["src/routes/auth.ts"],
    "read": ["src/config.ts"]
  },
  "decisions": [
    "Using RS256 for JWT signing",
    "Token expiry: 24 hours"
  ]
}
```

## Error Recovery

### Failed Handoff
```
Source agent crashes → Handoff package incomplete
Solution: Checkpoint regularly, store state externally
```

### Context Mismatch
```
Target agent doesn't understand context
Solution: Include explicit summary, provide file references
```

### State Conflict
```
Both agents modified same file
Solution: Use file-level locking, detect conflicts early
```

## Example: Multi-Phase Feature

**Phase 1: Exploration (explore agent)**
- Analyze requirements
- Identify affected files
- Document integration points
- → Handoff to implementation

**Phase 2: Implementation (general agent)**
- Create new modules
- Update existing code
- Write tests
- → Handoff to review

**Phase 3: Review (general agent)**
- Run tests
- Check code quality
- Verify requirements
- → Handoff to main agent

**Phase 4: Integration (main agent)**
- Merge changes
- Update documentation
- Deploy/update