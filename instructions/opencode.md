# Auto-Orchestration Instructions for OpenCode

## Overview
OpenCode automatically selects and chains skills based on task analysis. These instructions define how OpenCode orchestrates collaboration skills for optimal workflow execution.

## Skill Selection Rules

### Decision Matrix
```
Task Type → Primary Skill → Secondary Skill → Workflow Pattern

Feature Development → subagent → subagent → fan-out/fan-in
Bug Fixing → subagent → handoff → linear chain
Code Review → subagent → subagent → merge
Documentation → subagent → handoff → sequential
Refactoring → subagent → subagent → fan-out
Optimization → subagent → subagent → iterative
```

### Automatic Triggers

#### Parallel Execution
```yaml
trigger: "Multiple independent operations detected"
pattern: "Read A, B, C simultaneously"
skill: subagent
config:
  max_concurrent: 5
  timeout: 30s
```

#### Subagent Delegation
```yaml
trigger: "Task requires focused implementation"
pattern: "Complex, multi-file changes needed"
skill: subagent
config:
  agent_type: general
  context_window: minimal
  background: true
```

#### Handoff
```yaml
trigger: "Phase transition or capability boundary"
pattern: "Exploration → Implementation → Review"
skill: handoff
config:
  checkpoint_frequency: 3 steps
  state_format: json
```

## Workflow Patterns

### 1. Feature Development Workflow

```
User: "Add dark mode support to the application"

OpenCode Analysis:
├─ Identify affected systems (styles, components, state)
├─ Determine independent work streams
└─ Select pattern: Fan-out/Fan-in

Orchestration:
1. PARALLEL: Spawn 3 explore agents
   ├─ Agent 1: Analyze existing theme system
   ├─ Agent 2: Find all style-related components
   └─ Agent 3: Check state management patterns
   
2. WAIT: Collect exploration results

3. SUBAGENT: Spawn implementation agents (parallel)
   ├─ Agent 4: Create ThemeContext provider
   ├─ Agent 5: Build toggle component
   └─ Agent 6: Update CSS variables
   
4. WAIT: All implementations complete

5. HANDOFF: Transfer to integration agent
   └─ Merge changes, resolve conflicts, test

6. FINAL: Main agent reviews and commits
```

### 2. Bug Fixing Workflow

```
User: "Fix authentication timeout bug"

OpenCode Analysis:
├─ Identify root cause investigation needed
├─ Determine fix scope
└─ Select pattern: Linear Chain with Handoff

Orchestration:
1. SUBAGENT: Spawn explore agent
   └─ Investigate timeout logic, find failure points

2. WAIT: Get investigation results

3. HANDOFF: Transfer findings to implementation agent
   └─ Include: files, line numbers, root cause hypothesis

4. SUBAGENT: Spawn general agent
   └─ Implement fix, write regression test

5. WAIT: Fix implementation complete

6. HANDOFF: Transfer to testing agent
   └─ Run full test suite, verify fix

7. FINAL: Main agent commits fix
```

### 3. Code Review Workflow

```
User: "Review PR #42 for security issues"

OpenCode Analysis:
├─ Multiple review aspects (security, style, tests)
├─ Independent review streams possible
└─ Select pattern: Parallel Review

Orchestration:
1. PARALLEL: Spawn 3 review agents
   ├─ Agent 1: Security audit (secrets, auth, input validation)
   ├─ Agent 2: Code quality (patterns, complexity, naming)
   └─ Agent 3: Test coverage (missing tests, edge cases)
   
2. WAIT: Collect all review findings

3. SUBAGENT: Spawn synthesis agent
   └─ Merge reviews, prioritize issues, generate report

4. FINAL: Present consolidated review to user
```

### 4. Documentation Workflow

```
User: "Document the new API endpoints"

OpenCode Analysis:
├─ Multiple endpoints to document
├─ Similar structure per endpoint
└─ Select pattern: Parallel Generation

Orchestration:
1. PARALLEL: Spawn documentation agents per endpoint
   ├─ Agent 1: Document /api/users
   ├─ Agent 2: Document /api/auth
   ├─ Agent 3: Document /api/data
   └─ Agent 4: Create overview/index
   
2. WAIT: All documentation generated

3. HANDOFF: Transfer to formatting agent
   └─ Ensure consistent style, cross-references

4. FINAL: Main agent reviews and publishes
```

### 5. Refactoring Workflow

```
User: "Refactor database layer to use connection pooling"

OpenCode Analysis:
├─ Identify all database access points
├─ Determine refactoring strategy
└─ Select pattern: Systematic Fan-out

Orchestration:
1. SUBAGENT: Spawn analysis agent
   └─ Map all DB access patterns, identify pooling opportunities

2. WAIT: Get analysis with affected files list

3. PARALLEL: Spawn refactoring agents per module
   ├─ Agent 1: Refactor user module
   ├─ Agent 2: Refactor auth module
   ├─ Agent 3: Refactor data module
   └─ Agent 4: Update tests
   
4. WAIT: All modules refactored

5. SUBAGENT: Spawn integration agent
   └─ Verify consistency, run full test suite

6. FINAL: Main agent commits refactoring
```

### 6. Optimization Workflow

```
User: "Optimize page load performance"

OpenCode Analysis:
├─ Multiple optimization targets
├─ Independent improvements possible
└─ Select pattern: Parallel Optimization

Orchestration:
1. PARALLEL: Spawn optimization agents
   ├─ Agent 1: Bundle analysis & code splitting
   ├─ Agent 2: Image optimization
   ├─ Agent 3: Caching strategy
   └─ Agent 4: Lazy loading implementation
   
2. WAIT: All optimizations implemented

3. SUBAGENT: Spawn benchmarking agent
   └─ Measure before/after, validate improvements

4. HANDOFF: Transfer results to main agent
   └─ Summary of improvements, metrics

5. FINAL: Main agent commits optimizations
```

## Configuration

### Global Settings
```yaml
orchestration:
  max_parallel_agents: 10
  default_timeout: 60s
  checkpoint_frequency: 5
  
  agent_defaults:
    explore:
      timeout: 30s
      context: minimal
    general:
      timeout: 120s
      context: state
      
  skill_preferences:
    subagent:
      preferred_for: [implementation, complex logic, reads, searches, analysis]
    handoff:
      preferred_for: [phase transitions, capability switches]
    tdd:
      preferred_for: [test_driven, validation, regression]
    verify:
      preferred_for: [validation, quality_checks, integration]
    feedback:
      preferred_for: [iteration, refinement, optimization]
```

### Task-Specific Overrides
```yaml
# High-priority tasks
- pattern: "production bug"
  overrides:
    max_parallel: 3
    timeout: 180s
    require_checkpoint: true
    
# Quick tasks
- pattern: "simple rename"
  overrides:
    skip_orchestration: true
    direct_execution: true
```

## Error Handling

### Agent Failures
```yaml
on_agent_failure:
  retry:
    max_attempts: 2
    backoff: exponential
  fallback:
    - switch_agent_type
    - reduce_scope
    - escalate_to_user
```

### Timeout Handling
```yaml
on_timeout:
  actions:
    - log_progress
    - checkpoint_state
    - notify_user
    - offer_resume
```

## Monitoring

### Metrics Collection
```yaml
metrics:
  - agent_utilization
  - task_completion_time
  - parallel_efficiency
  - handoff_success_rate
  - error_frequency
```

### Logging
```yaml
logging:
  level: info
  format: structured
  destinations:
    - console
    - file: .opencode/orchestration.log
```