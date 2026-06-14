# Auto-Orchestration Instructions for Codex

## Overview
Codex orchestrates collaboration skills through structured task decomposition and intelligent agent coordination. These instructions define automatic skill usage patterns for optimal code generation and development workflows.

## Skill Selection Intelligence

### Task Analysis Framework
```yaml
analysis:
  dimensions:
    - scope: [file, module, system, codebase]
    - complexity: [simple, moderate, complex, expert]
    - parallelization: [none, low, medium, high]
    - phase: [planning, implementation, testing, review]
```

### Automatic Triggers

#### Parallel Execution
```yaml
triggers:
  - "Multiple independent code generations"
  - "Batch file operations"
  - "Concurrent analysis tasks"
pattern: parallel_generation
config:
  max_concurrent: 8
  timeout: 90s
  aggregation: merge
```

#### Subagent Delegation
```yaml
triggers:
  - "Complex multi-file implementation"
  - "Background code generation"
  - "Specialized language expertise"
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

## Orchestration Workflows

### 1. Feature Generation Pattern

**User Request:** "Generate a complete authentication system"

**Codex Orchestration:**
```
Step 1: Planning Phase (Subagent)
└─ Spawn planning agent: "Design authentication architecture"
    ├─ Identify required components
    ├─ Define API contracts
    ├─ Plan database schema
    └─ Create implementation roadmap

Step 2: Parallel Generation (Fan-out)
├─ Agent A: "Generate user model and database schema"
├─ Agent B: "Generate authentication endpoints"
├─ Agent C: "Generate JWT token service"
├─ Agent D: "Generate middleware and guards"
└─ Agent E: "Generate test suite"

Step 3: Integration Phase (Handoff)
└─ Transfer to integration agent
    ├─ Resolve imports and dependencies
    ├─ Ensure consistent interfaces
    ├─ Fix compilation errors
    └─ Run test suite

Step 4: Finalization (Main)
└─ Review generated code, optimize, commit
```

### 2. Code Generation Pattern

**User Request:** "Generate CRUD operations for all entities"

**Codex Orchestration:**
```
Step 1: Discovery Phase (Parallel)
├─ Agent A: "Identify all entities in schema"
├─ Agent B: "Analyze existing patterns"
└─ Agent C: "Map relationships and dependencies"

Step 2: Parallel Generation (Fan-out)
├─ Agent D: "Generate User CRUD operations"
├─ Agent E: "Generate Product CRUD operations"
├─ Agent F: "Generate Order CRUD operations"
└─ Agent G: "Generate shared utilities"

Step 3: Validation Phase (Handoff)
└─ Transfer to validation agent
    ├─ Verify generated code compiles
    ├─ Run generated tests
    ├─ Check for consistency
    └─ Fix any issues

Step 4: Documentation (Parallel)
├─ Agent H: "Generate API documentation"
└─ Agent I: "Generate usage examples"

Step 5: Finalization (Main)
└─ Review, optimize, commit
```

### 3. Refactoring Generation Pattern

**User Request:** "Generate refactored code with design patterns"

**Codex Orchestration:**
```
Step 1: Analysis Phase (Subagent)
└─ Spawn analysis agent: "Analyze refactoring requirements"
    ├─ Identify code smells
    ├─ Map to appropriate patterns
    ├─ Plan transformation strategy
    └─ Create refactoring roadmap

Step 2: Parallel Refactoring (Fan-out)
├─ Agent A: "Generate Strategy pattern implementation"
├─ Agent B: "Generate Observer pattern implementation"
├─ Agent C: "Generate Factory pattern implementation"
└─ Agent D: "Generate updated tests"

Step 3: Integration Phase (Handoff)
└─ Transfer to integration agent
    ├─ Merge refactored components
    ├─ Update imports and dependencies
    ├─ Verify compilation
    └─ Run full test suite

Step 4: Finalization (Main)
└─ Review generated refactoring, commit
```

### 4. Test Generation Pattern

**User Request:** "Generate comprehensive test suite"

**Codex Orchestration:**
```
Step 1: Analysis Phase (Parallel)
├─ Agent A: "Analyze existing code coverage"
├─ Agent B: "Identify test patterns in codebase"
└─ Agent C: "Map critical paths and edge cases"

Step 2: Parallel Test Generation (Fan-out)
├─ Agent D: "Generate unit tests for services"
├─ Agent E: "Generate integration tests for APIs"
├─ Agent F: "Generate edge case tests"
└─ Agent G: "Generate performance tests"

Step 3: Validation Phase (Handoff)
└─ Transfer to validation agent
    ├─ Verify tests compile
    ├─ Run test suite
    ├─ Check coverage metrics
    └─ Fix failing tests

Step 4: Finalization (Main)
└─ Review generated tests, commit
```

### 5. Documentation Generation Pattern

**User Request:** "Generate complete API documentation"

**Codex Orchestration:**
```
Step 1: Discovery Phase (Parallel)
├─ Agent A: "Map all API endpoints"
├─ Agent B: "Analyze request/response schemas"
└─ Agent C: "Identify authentication flows"

Step 2: Parallel Documentation (Fan-out)
├─ Agent D: "Generate endpoint reference docs"
├─ Agent E: "Create request/response examples"
├─ Agent F: "Write authentication guide"
└─ Agent G: "Generate error code documentation"

Step 3: Consolidation Phase (Handoff)
└─ Transfer to consolidation agent
    ├─ Ensure consistent formatting
    ├─ Add cross-references
    ├─ Validate examples
    └─ Generate table of contents

Step 4: Finalization (Main)
└─ Review, publish, commit
```

### 6. Migration Generation Pattern

**User Request:** "Generate migration scripts for database upgrade"

**Codex Orchestration:**
```
Step 1: Analysis Phase (Subagent)
└─ Spawn analysis agent: "Analyze migration requirements"
    ├─ Compare old and new schemas
    ├─ Identify data transformations
    ├─ Plan rollback strategy
    └─ Create migration roadmap

Step 2: Parallel Migration Generation (Fan-out)
├─ Agent A: "Generate schema migration scripts"
├─ Agent B: "Generate data transformation scripts"
├─ Agent C: "Generate validation scripts"
└─ Agent D: "Generate rollback scripts"

Step 3: Testing Phase (Handoff)
└─ Transfer to testing agent
    ├─ Test migration on sample data
    ├─ Verify rollback works
    ├─ Check performance impact
    └─ Document procedures

Step 4: Finalization (Main)
└─ Review generated migrations, commit
```

## Configuration

### Codex Settings
```yaml
codex:
  orchestration:
    mode: automatic
    max_parallel: 10
    default_timeout: 120s
    
  generation_settings:
    quality: high
    style: consistent
    validation: strict
    
  agent_management:
    strategy: adaptive
    scaling:
      min_agents: 1
      max_agents: 15
      scale_up_threshold: 0.8
      scale_down_threshold: 0.3
      
  skill_preferences:
    subagent:
      preferred_for: [complex_generation, planning, batch_generation, analysis, testing]
      avoid_for: [simple_tasks, quick fixes, sequential_logic, shared_state]
    handoff:
      preferred_for: [phase_transitions, integration]
      avoid_for: [single_phase_tasks]
    tdd:
      preferred_for: [test_driven, validation, regression]
      avoid_for: [prototyping, exploratory]
    verify:
      preferred_for: [validation, quality_checks, integration]
      avoid_for: [quick_fixes, simple_edits]
    feedback:
      preferred_for: [iteration, refinement, optimization]
      avoid_for: [one_shot_tasks]
      
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
    skills: [subagent]
    agent_type: explore
    
  moderate:
    parallel_limit: 6
    timeout: 60s
    skills: [subagent, tdd]
    agent_type: auto
    
  complex:
    parallel_limit: 10
    timeout: 180s
    skills: [subagent, handoff, tdd, verify]
    agent_type: general
    require_checkpoints: true
    
  expert:
    parallel_limit: 15
    timeout: 300s
    skills: [subagent, handoff, tdd, verify, feedback]
    agent_type: general
    require_checkpoints: true
    human_oversight: recommended
```

## Error Handling

### Generation Failures
```yaml
error_handling:
  generation_failure:
    retry:
      max_attempts: 3
      backoff: exponential
      initial_delay: 1s
    fallback:
      - simplify_requirements
      - reduce_scope
      - switch_approach
      - escalate_to_user
      
  compilation_error:
    strategy: auto_fix
    max_iterations: 5
    escalation: user_for_complex_errors
    
  timeout_handling:
    actions:
      - checkpoint_progress
      - notify_user
      - offer_resume
    resume_strategy: from_last_checkpoint
```

## Quality Assurance

### Code Quality Checks
```yaml
quality_checks:
  compilation: required
  style_consistency: required
  test_coverage: recommended
  performance: optional
  
  thresholds:
    compilation_success: 1.0
    style_compliance: 0.95
    test_coverage: 0.8
    performance_regression: 0.1
```

### Validation Pipeline
```yaml
validation:
  steps:
    - syntax_check
    - type_check
    - lint_check
    - test_run
    - integration_test
    
  on_failure:
    - log_error
    - notify_user
    - suggest_fix
```

## Monitoring

### Generation Metrics
```yaml
metrics:
  tracking:
    - generation_success_rate
    - parallel_efficiency
    - agent_utilization
    - code_quality_score
    - user_satisfaction
    
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