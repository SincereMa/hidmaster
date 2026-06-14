# Auto-Orchestration Instructions for MiMo-Code

## Overview
MiMo-Code orchestrates collaboration skills through intelligent task decomposition and agent selection. These instructions define automatic skill usage patterns for optimal code assistance.

## Skill Selection Intelligence

### Task Analysis Engine
```yaml
analysis_steps:
  1. Parse user intent
  2. Identify task complexity
  3. Detect dependencies
  4. Determine parallelization potential
  5. Select optimal skill chain
```

### Automatic Skill Triggers

#### Parallel Processing
```yaml
triggers:
  - "multiple independent reads"
  - "batch operations"
  - "search and analyze"
pattern: fan_out
max_concurrent: 8
timeout: 45s
```

#### Subagent Delegation
```yaml
triggers:
  - "complex implementation"
  - "multi-file changes"
  - "background processing"
pattern: delegate
agent_selection:
  explore: [search, read, analysis]
  general: [write, implement, refactor]
```

#### Context Handoff
```yaml
triggers:
  - "phase completion"
  - "capability boundary"
  - "session resumption"
pattern: transfer
checkpoint: auto
state_format: structured
```

## Orchestration Workflows

### 1. Feature Development

**User Request:** "Implement user profile page with avatar upload"

**MiMo-Code Orchestration:**
```
Phase 1: Analysis (Parallel)
├─ Spawn explore agent: "Analyze auth system and user model"
├─ Spawn explore agent: "Find existing profile components"
└─ Spawn explore agent: "Check file upload patterns"

Phase 2: Design (Subagent)
└─ Spawn general agent: "Design profile page architecture"
    ├─ Component hierarchy
    ├─ State management
    └─ API endpoints needed

Phase 3: Implementation (Parallel Fan-out)
├─ Spawn general agent: "Create profile components"
├─ Spawn general agent: "Implement avatar upload service"
├─ Spawn general agent: "Add profile API endpoints"
└─ Spawn general agent: "Write integration tests"

Phase 4: Integration (Handoff)
└─ Transfer all outputs to integration agent
    ├─ Merge components
    ├─ Wire up services
    └─ Run full test suite

Phase 5: Finalize (Main)
└─ Review, optimize, commit
```

### 2. Bug Investigation & Fix

**User Request:** "Users report intermittent 500 errors on login"

**MiMo-Code Orchestration:**
```
Phase 1: Investigation (Subagent - Deep Focus)
└─ Spawn general agent: "Investigate login 500 errors"
    ├─ Analyze error logs
    ├─ Trace request flow
    ├─ Identify failure points
    └─ Document findings with file:line references

Phase 2: Analysis (Parallel)
├─ Spawn explore agent: "Check related test coverage"
└─ Spawn explore agent: "Find similar error patterns"

Phase 3: Fix Implementation (Subagent)
└─ Spawn general agent: "Implement login error fix"
    ├─ Apply root cause fix
    ├─ Add defensive checks
    └─ Write regression test

Phase 4: Validation (Handoff)
└─ Transfer to validation agent
    ├─ Run affected tests
    ├─ Verify fix in isolation
    └─ Check for side effects

Phase 5: Deployment (Main)
└─ Commit fix, update documentation
```

### 3. Code Review

**User Request:** "Review this PR for security and performance"

**MiMo-Code Orchestration:**
```
Phase 1: Parallel Analysis
├─ Spawn explore agent: "Security review - check for vulnerabilities"
├─ Spawn explore agent: "Performance review - identify bottlenecks"
├─ Spawn explore agent: "Code quality review - patterns and style"
└─ Spawn explore agent: "Test coverage review - missing tests"

Phase 2: Synthesis (Subagent)
└─ Spawn general agent: "Synthesize review findings"
    ├─ Merge all review aspects
    ├─ Prioritize issues by severity
    ├─ Generate actionable recommendations
    └─ Create structured review report

Phase 3: Follow-up (Conditional)
if (critical_issues_found):
    Spawn general agent: "Implement critical fixes"
else:
    Present review to user

Phase 4: Final Review (Main)
└─ Verify fixes, approve PR
```

### 4. Documentation Generation

**User Request:** "Document the authentication module"

**MiMo-Code Orchestration:**
```
Phase 1: Discovery (Parallel)
├─ Spawn explore agent: "Map auth module structure"
├─ Spawn explore agent: "Find all public APIs"
└─ Spawn explore agent: "Identify usage examples in codebase"

Phase 2: Content Generation (Parallel Fan-out)
├─ Spawn general agent: "Write API reference docs"
├─ Spawn general agent: "Create usage guide"
├─ Spawn general agent: "Write architecture overview"
└─ Spawn general agent: "Generate code examples"

Phase 3: Consolidation (Handoff)
└─ Transfer to formatting agent
    ├─ Ensure consistent style
    ├─ Add cross-references
    ├─ Validate code examples
    └─ Generate table of contents

Phase 4: Publication (Main)
└─ Review, commit documentation
```

### 5. Refactoring

**User Request:** "Refactor legacy callbacks to async/await"

**MiMo-Code Orchestration:**
```
Phase 1: Assessment (Subagent)
└─ Spawn general agent: "Assess refactoring scope"
    ├─ Identify all callback patterns
    ├─ Map dependency chains
    ├─ Estimate complexity per function
    └─ Create refactoring plan

Phase 2: Parallel Refactoring (Fan-out)
├─ Spawn general agent: "Refactor module A callbacks"
├─ Spawn general agent: "Refactor module B callbacks"
├─ Spawn general agent: "Refactor module C callbacks"
└─ Spawn general agent: "Update related tests"

Phase 3: Integration (Handoff)
└─ Transfer to integration agent
    ├─ Resolve merge conflicts
    ├─ Ensure consistent patterns
    └─ Run full test suite

Phase 4: Cleanup (Main)
└─ Remove dead code, update docs, commit
```

### 6. Performance Optimization

**User Request:** "Optimize database query performance"

**MiMo-Code Orchestration:**
```
Phase 1: Analysis (Parallel)
├─ Spawn explore agent: "Identify slow queries"
├─ Spawn explore agent: "Analyze current indexes"
└─ Spawn explore agent: "Check query patterns"

Phase 2: Optimization (Subagent - Deep Focus)
└─ Spawn general agent: "Implement query optimizations"
    ├─ Add missing indexes
    ├─ Rewrite inefficient queries
    ├─ Implement query caching
    └─ Add connection pooling

Phase 3: Validation (Parallel)
├─ Spawn general agent: "Run performance benchmarks"
├─ Spawn general agent: "Verify data integrity"
└─ Spawn general agent: "Check for regressions"

Phase 4: Deployment (Handoff)
└─ Transfer results to deployment agent
    ├─ Document performance gains
    ├─ Create rollback plan
    └─ Update monitoring

Phase 5: Monitoring (Main)
└─ Commit changes, monitor production
```

## Configuration

### MiMo-Code Settings
```yaml
mimocode:
  orchestration:
    mode: intelligent  # intelligent | manual | disabled
    max_agents: 12
    default_timeout: 90s
    
  agent_selection:
    strategy: task_match  # task_match | round_robin | least_loaded
    preferences:
      explore: [speed, read_only]
      general: [capability, flexibility]
      
  skill_chaining:
    auto_chain: true
    max_chain_depth: 5
    checkpoint_interval: 3
    
  error_handling:
    retry_policy:
      max_retries: 3
      backoff: exponential
    fallback_strategy:
      - reduce_parallelism
      - switch_agent_type
      - escalate_to_user
```

### Task Complexity Thresholds
```yaml
complexity:
  simple:
    parallel_limit: 3
    timeout: 30s
    skills: [parallel]
    
  moderate:
    parallel_limit: 6
    timeout: 60s
    skills: [parallel, subagent]
    
  complex:
    parallel_limit: 10
    timeout: 120s
    skills: [parallel, subagent, handoff]
    
  expert:
    parallel_limit: 15
    timeout: 300s
    skills: [all]
    require_checkpoints: true
```

## Monitoring & Metrics

### Orchestration Metrics
```yaml
metrics:
  tracking:
    - task_completion_time
    - parallel_efficiency
    - agent_utilization
    - skill_usage_distribution
    - error_rates
    
  reporting:
    frequency: per_session
    format: summary
    destinations: [console, log_file]
```

### Performance Optimization
```yaml
optimization:
  auto_tune: true
  thresholds:
    parallel_efficiency_min: 0.7
    agent_utilization_max: 0.9
    error_rate_max: 0.05
    
  actions:
    - adjust_parallelism
    - switch_strategies
    - notify_user
```