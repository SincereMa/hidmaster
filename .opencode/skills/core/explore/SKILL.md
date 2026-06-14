---
name: explore
description: Deep codebase understanding and requirements analysis
category: core
triggers:
  - "explore codebase"
  - "understand system"
  - "analyze requirements"
  - "map architecture"
  - "investigate code"
prerequisites:
  - Access to project files
  - Basic understanding of programming concepts
  - Clear exploration objectives
output:
  type: structured_report
  format: markdown
  sections:
    - system_overview
    - architecture_map
    - component_analysis
    - patterns_conventions
    - dependencies
    - recommendations
---

# Explore Skill

## Overview

Systematically explore and understand codebases, requirements, and constraints before making changes. This skill provides a structured approach to codebase comprehension, ensuring thorough understanding before any modifications.

## When to Use

- Starting work on an unfamiliar codebase
- Understanding complex systems or modules
- Analyzing requirements before implementation
- Debugging mysterious issues
- Planning refactoring efforts
- Onboarding new team members
- Preparing for code reviews

## Prerequisites

- Access to project files and documentation
- Basic understanding of programming concepts
- Clear exploration objectives defined
- Tool access (code search, file reading, dependency analysis)

## Detailed Workflow

### Phase 1: Initial Orientation (5-10 minutes)

**Step 1.1: Documentation Review**
- Read README.md, CONTRIBUTING.md, and any docs/ directory
- Examine package.json, Cargo.toml, or equivalent dependency files
- Review configuration files (.env.example, docker-compose.yml, etc.)
- Look for architecture decision records (ADRs)

**Step 1.2: Entry Point Identification**
- Find main entry points (index.ts, main.go, app.py, etc.)
- Identify configuration entry points
- Locate build scripts and deployment configurations
- Check for CLI interfaces or API endpoints

**Step 1.3: Project Structure Mapping**
- Create mental map of directory hierarchy
- Identify module boundaries and separation of concerns
- Note naming conventions and file organization patterns
- Look for monorepo or workspace configurations

### Phase 2: Deep Dive Analysis (15-30 minutes)

**Step 2.1: Component Analysis**
- For each major component/module:
  - Identify public API/interface
  - Understand internal implementation
  - Map dependencies (imports/requires)
  - Note side effects and state management

**Step 2.2: Dependency Mapping**
- Create dependency graph (mental or visual)
- Identify external libraries and their purposes
- Understand version constraints and compatibility
- Look for circular dependencies or tight coupling

**Step 2.3: Pattern Recognition**
- Identify design patterns used (MVC, Repository, Factory, etc.)
- Note coding conventions (naming, formatting, structure)
- Understand error handling patterns
- Recognize testing patterns and strategies

**Step 2.4: Data Flow Analysis**
- Trace data through the system
- Identify data transformations and validations
- Map state management approaches
- Understand persistence mechanisms

### Phase 3: Validation and Synthesis (5-10 minutes)

**Step 3.1: Assumption Verification**
- Test key assumptions with targeted exploration
- Verify understanding against documentation
- Cross-reference with tests (what they test reveals behavior)
- Check for edge cases and error conditions

**Step 3.2: Knowledge Synthesis**
- Create consolidated understanding document
- Identify knowledge gaps requiring further investigation
- Prioritize areas for deep focus based on task requirements
- Document findings for future reference

## Techniques and Tools

### Code Exploration Patterns
```
// Start with imports to understand dependencies
import { ComponentA } from './a';
import { utility } from '../shared/utils';

// Follow the data flow
function processData(input) {
  const validated = validate(input);      // Step 1
  const transformed = transform(validated); // Step 2
  return persist(transformed);             // Step 3
}
```

### Static Analysis Commands
```bash
# For TypeScript/JavaScript
grep -r "export" --include="*.ts" | head -20
find . -name "*.test.ts" | wc -l

# For dependency analysis
npm ls --depth=1
madge --circular src/

# For code metrics
cloc .
sloccount .
```

### Visualization Techniques
- Mermaid diagrams for architecture
- ASCII diagrams for data flow
- Dependency graphs (graphviz, mermaid)
- Call stack traces for execution flow

## Output Format

### Structured Report Template
```markdown
# Codebase Exploration Report

## System Overview
- **Purpose**: [What the system does]
- **Tech Stack**: [Languages, frameworks, databases]
- **Architecture**: [Overall architectural style]

## Architecture Map
[Visual or textual representation of system components]

## Component Analysis
### [Component 1]
- **Responsibility**: [What it does]
- **Public API**: [Key interfaces]
- **Dependencies**: [What it depends on]
- **Key Files**: [Important files]

## Patterns & Conventions
- **Design Patterns**: [Patterns observed]
- **Naming Conventions**: [How things are named]
- **Error Handling**: [Approach used]
- **Testing Strategy**: [How tests are structured]

## Dependencies
### External
[List major external dependencies]

### Internal
[Component dependency graph]

## Recommendations
- **Quick Wins**: [Easy improvements]
- **Risks**: [Potential issues]
- **Next Steps**: [Suggested actions]
```

## Examples

### Example 1: New Feature Exploration
**Objective**: Add user authentication to existing API

**Exploration Steps**:
1. Review existing API structure in `/src/api/`
2. Examine user models in `/src/models/user.ts`
3. Check for existing auth middleware
4. Review test patterns in `/tests/api/`
5. Analyze dependency injection patterns

**Output**: Understanding of where auth fits, what patterns to follow, and potential integration points.

### Example 2: Bug Investigation
**Objective**: Fix intermittent database connection failures

**Exploration Steps**:
1. Trace database connection setup in `/src/db/`
2. Examine connection pooling configuration
3. Review error handling in database queries
4. Check monitoring and logging setup
5. Analyze deployment configuration

**Output**: Root cause analysis and fix recommendations.

## Error Handling

### Common Exploration Pitfalls

1. **Analysis Paralysis**
   - **Symptom**: Endless exploration without actionable insights
   - **Solution**: Time-box exploration (30 minutes max), focus on task-specific areas

2. **Shallow Understanding**
   - **Symptom**: Surface-level knowledge leading to incorrect assumptions
   - **Solution**: Verify understanding by tracing actual code execution

3. **Missing Context**
   - **Symptom**: Ignoring business logic or domain constraints
   - **Solution**: Consult domain experts, review business requirements

4. **Tool Limitations**
   - **Symptom**: Incomplete analysis due to tool constraints
   - **Solution**: Combine multiple tools, manual verification

### Recovery Strategies

- **Stuck on Architecture**: Create simplified diagrams, break into smaller components
- **Unclear Data Flow**: Add logging/tracing, run with test data
- **Missing Documentation**: Interview developers, examine git history
- **Complex Dependencies**: Use dependency analysis tools, create isolation boundaries

## Best Practices

1. **Start Broad, Then Deep**: Understand overall structure before diving into details
2. **Follow the Data**: Trace how data moves through the system
3. **Verify Assumptions**: Don't assume - verify with code/tests
4. **Document As You Go**: Record findings immediately
5. **Time-Box Exploration**: Set limits to prevent analysis paralysis
6. **Focus on Task**: Tailor exploration to specific objectives
7. **Use Multiple Angles**: Combine static analysis, dynamic tracing, and documentation

## Integration Points

This skill integrates with:
- **architect**: For design decisions based on exploration findings
- **implement**: For informed code implementation
- **validate**: For understanding testing requirements
- **iterate**: For continuous improvement based on exploration insights

## Metrics for Success

- **Comprehension Score**: Can explain system to another developer
- **Confidence Level**: High confidence in understanding key components
- **Actionability**: Clear next steps identified
- **Documentation Quality**: Findings are well-documented and reusable
