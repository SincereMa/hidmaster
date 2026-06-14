# Auto-Orchestration Instructions for Claude Code

## Overview
Claude Code orchestrates collaboration skills through structured task decomposition and intelligent agent management. These instructions define automatic skill usage patterns for optimal development workflows.

## Skill Selection Framework

### Task Classification
```yaml
classification:
  dimensions:
    - complexity: [simple, moderate, complex, expert]
    - parallelization: [none, low, medium, high]
    - scope: [file, module, system, codebase]
    - phase: [analysis, implementation, testing, review]
```

### Automatic Triggers

#### Parallel Execution
```yaml
triggers:
  - "Multiple independent reads/writes"
  - "Batch processing operations"
  - "Concurrent analysis tasks"
pattern: parallel_batch
config:
  max_concurrent: 8
  timeout: 60s
  aggregation: merge
```

#### Subagent Delegation
```yaml
triggers:
  - "Complex multi-step implementation"
  - "Background processing needed"
  - "Specialized expertise required"
pattern: delegate
config:
  agent_type: auto
  context: minimal
  background: true
```

#### Context Transfer
```yaml
triggers:
  - "Phase transition"
  - "Capability boundary"
  - "Session interruption"
pattern: handoff
config:
  checkpoint: auto
  state_format: structured
  resume_point: enabled
```

## Orchestration Patterns

### 1. Feature Development Pattern

**User Request:** "Add real-time notifications system"

**Claude Code Orchestration:**
```
Step 1: Analysis Phase (Parallel)
├─ Agent A: "Analyze existing notification infrastructure"
├─ Agent B: "Research WebSocket patterns in codebase"
└─ Agent C: "Identify affected components"

Step 2: Design Phase (Subagent)
└─ Spawn design agent: "Create notification system architecture"
    ├─ WebSocket server design
    ├─ Client subscription model
    ├─ State management approach
    └─ API contract definition

Step 3: Implementation Phase (Parallel Fan-out)
├─ Agent D: "Implement WebSocket server"
├─ Agent E: "Create notification client library"
├─ Agent F: "Build notification UI components"
└─ Agent G: "Write integration tests"

Step 4: Integration Phase (Handoff)
└─ Transfer to integration agent
    ├─ Connect all components
    ├─ Resolve dependencies
    └─ Run full test suite

Step 5: Finalization (Main)
└─ Code review, optimization, commit
```

### 2. Bug Resolution Pattern

**User Request:** "Fix memory leak in data processing pipeline"

**Claude Code Orchestration:**
```
Step 1: Investigation Phase (Subagent - Focused)
└─ Spawn investigation agent: "Analyze memory leak"
    ├─ Profile memory usage patterns
    ├─ Identify leak sources
    ├─ Map resource lifecycle
    └─ Document root cause

Step 2: Analysis Phase (Parallel)
├─ Agent A: "Check related error logs"
└─ Agent B: "Find similar patterns elsewhere"

Step 3: Fix Phase (Subagent)
└─ Spawn implementation agent: "Implement memory leak fix"
    ├─ Fix identified leak sources
    ├─ Add resource cleanup
    ├─ Implement monitoring
    └─ Write regression test

Step 4: Validation Phase (Handoff)
└─ Transfer to validation agent
    ├─ Run memory profiling tests
    ├─ Verify leak is fixed
    └─ Check for side effects

Step 5: Deployment (Main)
└─ Commit fix, update monitoring, document
```

### 3. Code Review Pattern

**User Request:** "Review this code for scalability issues"

**Claude Code Orchestration:**
```
Step 1: Parallel Review Analysis
├─ Agent A: "Analyze database query patterns"
├─ Agent B: "Review caching strategies"
├─ Agent C: "Check concurrent access patterns"
└─ Agent D: "Evaluate resource utilization"

Step 2: Synthesis Phase (Subagent)
└─ Spawn synthesis agent: "Compile scalability review"
    ├─ Merge all review findings
    ├─ Prioritize by impact
    ├─ Create actionable recommendations
    └─ Generate improvement roadmap

Step 3: Implementation Phase (Conditional)
if (critical_scalability_issues):
    Spawn implementation agent: "Address critical issues"
else:
    Present review to user

Step 4: Final Review (Main)
└─ Verify improvements, approve changes
```

### 4. Documentation Pattern

**User Request:** "Document the entire API layer"

**Claude Code Orchestration:**
```
Step 1: Discovery Phase (Parallel)
├─ Agent A: "Map all API endpoints"
├─ Agent B: "Find request/response patterns"
└─ Agent C: "Identify authentication flows"

Step 2: Content Generation (Parallel Fan-out)
├─ Agent D: "Generate endpoint reference docs"
├─ Agent E: "Create usage examples"
├─ Agent F: "Write authentication guide"
└─ Agent G: "Document error handling"

Step 3: Consolidation Phase (Handoff)
└─ Transfer to consolidation agent
    ├─ Ensure consistent formatting
    ├─ Add cross-references
    ├─ Validate code examples
    └─ Generate navigation structure

Step 4: Publication (Main)
└─ Review, publish, update README
```

### 5. Refactoring Pattern

**User Request:** "Refactor monolithic service into microservices"

**Claude Code Orchestration:**
```
Step 1: Assessment Phase (Subagent)
└─ Spawn assessment agent: "Analyze refactoring scope"
    ├─ Identify service boundaries
    ├─ Map dependencies
    ├─ Estimate effort per service
    └─ Create migration plan

Step 2: Parallel Refactoring (Fan-out)
├─ Agent A: "Extract authentication service"
├─ Agent B: "Extract user management service"
├─ Agent C: "Extract data processing service"
└─ Agent D: "Update shared interfaces"

Step 3: Integration Phase (Handoff)
└─ Transfer to integration agent
    ├─ Set up service communication
    ├─ Resolve inter-service dependencies
    └─ Update deployment configuration

Step 4: Validation Phase (Parallel)
├─ Agent E: "Run integration tests"
├─ Agent F: "Perform load testing"
└─ Agent G: "Verify data consistency"

Step 5: Deployment (Main)
└─ Gradual rollout, monitoring, documentation
```

### 6. Optimization Pattern

**User Request:** "Optimize application startup time"

**Claude Code Orchestration:**
```
Step 1: Analysis Phase (Parallel)
├─ Agent A: "Profile startup sequence"
├─ Agent B: "Identify blocking operations"
└─ Agent C: "Check resource initialization"

Step 2: Optimization Phase (Subagent)
└─ Spawn optimization agent: "Implement startup optimizations"
    ├─ Lazy loading implementation
    ├─ Parallel initialization
    ├─ Resource caching
    └─ Deferred startup tasks

Step 3: Validation Phase (Parallel)
├─ Agent D: "Measure startup time improvements"
├─ Agent E: "Verify functionality preserved"
└─ Agent F: "Check memory impact"

Step 4: Deployment (Handoff)
└─ Transfer to deployment agent
    ├─ Create deployment plan
    ├─ Set up A/B testing
    └─ Configure monitoring

Step 5: Monitoring (Main)
└─ Deploy, monitor, iterate
```

## Configuration

### Claude Code Settings
```yaml
claude_code:
  orchestration:
    mode: automatic
    max_parallel: 10
    default_timeout: 120s
    
  agent_management:
    strategy: adaptive
    scaling:
      min_agents: 1
      max_agents: 15
      scale_up_threshold: 0.8
      scale_down_threshold: 0.3
      
  skill_preferences:
    parallel:
      preferred_for: [analysis, search, batch]
      avoid_for: [sequential_logic, shared_state]
    subagent:
      preferred_for: [implementation, complex_logic]
      avoid_for: [simple_tasks, quick fixes]
    handoff:
      preferred_for: [phase_transitions, capability_switches]
      avoid_for: [single_phase_tasks]
      
  checkpointing:
    auto_checkpoint: true
    interval: 5_steps
    format: structured_json
```

### Task Complexity Rules
```yaml
complexity_rules:
  simple:
    parallel_limit: 3
    timeout: 30s
    skills: [parallel]
    agent_type: explore
    
  moderate:
    parallel_limit: 6
    timeout: 60s
    skills: [parallel, subagent]
    agent_type: auto
    
  complex:
    parallel_limit: 10
    timeout: 180s
    skills: [parallel, subagent, handoff]
    agent_type: general
    require_checkpoints: true
    
  expert:
    parallel_limit: 15
    timeout: 300s
    skills: [all]
    agent_type: general
    require_checkpoints: true
    human_oversight: recommended
```

## Error Handling

### Failure Recovery
```yaml
error_handling:
  agent_failure:
    retry:
      max_attempts: 3
      backoff: exponential
      initial_delay: 1s
    fallback:
      - switch_agent_type
      - reduce_parallelism
      - escalate_to_user
      
  timeout_handling:
    actions:
      - checkpoint_progress
      - notify_user
      - offer_resume
    resume_strategy: from_last_checkpoint
      
  conflict_resolution:
    strategy: merge_with_review
    auto_resolve: false
    escalation: user_for_conflicts
```

## Monitoring

### Metrics Collection
```yaml
monitoring:
  metrics:
    - task_completion_rate
    - parallel_efficiency
    - agent_utilization
    - error_frequency
    - user_satisfaction
    
  logging:
    level: info
    format: structured
    destinations:
      - console
      - file: .claude/orchestration.log
      
  alerting:
    thresholds:
      error_rate: 0.1
      timeout_rate: 0.05
      parallel_efficiency: 0.6
    actions:
      - log_warning
      - notify_user
      - adjust_strategy
```