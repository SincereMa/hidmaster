# hidmaster Design Specification

## [S1] Problem Statement

### Current Pain Points

1. **Fragmented Ecosystem**: Each AI coding agent (Claude Code, Codex, MiMo-Code, OpenCode, Cursor) has its own configuration format and skill discovery mechanism
2. **Redundant Workflows**: The same workflow skills need to be rewritten for each agent
3. **Context Loss**: Switching between agents loses custom workflows and configurations
4. **No Standardization**: No universal format for sharing development workflows across agents

### Target Users

- Developers using multiple AI coding agents
- Teams wanting to standardize development workflows
- Contributors creating reusable workflow skills

## [S2] Solution Overview

**hidmaster** (Hidden Master) is a lightweight CLI tool and skill framework that:

1. **Unified Skill Format**: Uses SKILL.md format (compatible with MiMo-Code's existing mechanism)
2. **Auto-Detection**: Automatically detects installed agents
3. **Smart Distribution**: Distributes skills to each agent's native directory
4. **Single Config**: One `hidmaster.yaml` file manages all configuration

### Key Design Principles

- **Zero Invasion**: Never modifies agent internals, only uses native discovery mechanisms
- **Agent-Agnostic**: Skills work across all supported agents
- **Minimal Configuration**: Single file, sensible defaults
- **Extensible**: Easy to add support for new agents

## [S3] Architecture

### Directory Structure

```
hidmaster/
├── bin/
│   └── hidmaster              # CLI entry point
├── src/
│   ├── core/
│   │   ├── detector.ts        # Agent detection
│   │   ├── distributor.ts     # Skill distribution
│   │   └── config.ts          # Configuration parsing
│   ├── adapters/
│   │   ├── base.ts            # Base adapter interface
│   │   ├── mimocode.ts        # MiMo-Code adapter
│   │   ├── claude.ts          # Claude Code adapter
│   │   ├── codex.ts           # Codex adapter
│   │   ├── opencode.ts        # OpenCode adapter
│   │   └── cursor.ts          # Cursor adapter
│   └── index.ts
├── skills/                    # Built-in skills
│   ├── core/
│   ├── development/
│   ├── documentation/
│   ├── review/
│   ├── planning/
│   └── collaboration/
├── hidmaster.yaml             # Default config template
├── package.json
└── README.md
```

### Agent Detection Logic

```typescript
// Simplified detection logic
const AGENT_MARKERS = {
  mimocode: '.mimocode',
  'claude-code': '.claude',
  codex: '.codex',
  opencode: '.opencode',
  cursor: '.cursor',
}

async function detectAgents(): Promise<AgentInfo[]> {
  const agents = []
  for (const [name, marker] of Object.entries(AGENT_MARKERS)) {
    if (await fileExists(marker)) {
      agents.push({ name, detected: true })
    }
  }
  return agents
}
```

### Skill Distribution Mechanism

Each agent adapter implements:

```typescript
interface AgentAdapter {
  name: string
  skillsDir: string
  distribute(skill: Skill): Promise<void>
  remove(skill: Skill): Promise<void>
}
```

Distribution targets:
- **MiMo-Code**: `.mimocode/skills/`
- **Claude Code**: `.claude/skills/` or `.claude/commands/`
- **Codex**: `.codex/skills/`
- **OpenCode**: `.opencode/skills/`
- **Cursor**: `.cursor/rules/`

## [S4] Skill Format Specification

### SKILL.md Structure

```yaml
---
name: skill-name
description: Brief description of what this skill does
version: 1.0.0
category: core|development|documentation|review|planning|collaboration
agents:                    # Optional: supported agents
  - mimocode
  - claude-code
  - codex
tools:                     # Optional: required tools
  - read
  - write
  - edit
  - bash
  - grep
  - glob
---

## Overview

What this skill does and when to use it.

## Workflow Steps

1. Step one
2. Step two
3. Step three

## Examples

Usage examples...

## Notes

Additional notes...
```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique skill identifier |
| `description` | Yes | Brief description (shown in skill list) |
| `version` | No | Semantic version |
| `category` | No | Skill category |
| `agents` | No | Supported agents (default: all) |
| `tools` | No | Required tools (for capability filtering) |

## [S5] Configuration Format

### hidmaster.yaml

```yaml
# Project identifier
name: my-project
version: 1.0.0

# Skill sources
skills:
  - path: ./skills           # Local skills directory
  - url: https://github.com/hidmaster/skills-pack  # Remote skill pack

# Agent configuration
agents:
  mimocode:
    enabled: true
  claude-code:
    enabled: true
  codex:
    enabled: true
  opencode:
    enabled: false
  cursor:
    enabled: false

# Distribution settings
settings:
  auto_sync: true            # Auto-sync on file changes
  symlink: false             # Use symlinks instead of copies
  conflict_resolution: skip  # skip|overwrite|rename
```

## [S6] Built-in Skills (22 Skills)

### Core Skills (6)

| Skill | Description |
|-------|-------------|
| `explore` | Deep codebase understanding, requirements analysis |
| `architect` | Technical design and architecture decisions |
| `implement` | Code implementation following design |
| `validate` | Testing, type checking, functional verification |
| `ship` | Merging, releases, documentation updates |
| `iterate` | Feedback collection, continuous improvement |

### Development Skills (3)

| Skill | Description |
|-------|-------------|
| `debug` | Systematic debugging methodology |
| `refactor` | Code refactoring best practices |
| `optimize` | Performance analysis and optimization |

### Documentation Skills (3)

| Skill | Description |
|-------|-------------|
| `generate-docs` | Automatic project documentation generation |
| `api-docs` | API documentation generation |
| `changelog` | Automatic changelog generation |

### Review Skills (3)

| Skill | Description |
|-------|-------------|
| `code-review` | Code quality review |
| `security-review` | Security vulnerability review |
| `performance-review` | Performance bottleneck review |

### Planning Skills (3)

| Skill | Description |
|-------|-------------|
| `brainstorm` | User brainstorming for requirements |
| `estimate` | Workload and complexity estimation |
| `roadmap` | Project roadmap planning |

### Collaboration Skills (3)

| Skill | Description |
|-------|-------------|
| `parallel` | Parallel task execution |
| `subagent` | Subtask management and delegation |
| `handoff` | Task handoff and state synchronization |

## [S7] Error Handling

### Detection Errors

- If agent detection fails, log warning and continue with other agents
- If agent directory doesn't exist, create it before distribution

### Distribution Errors

- If skill distribution fails for one agent, continue with others
- Log all errors but don't block the overall process
- Provide clear error messages for debugging

### Conflict Resolution

- `skip`: Keep existing skill, don't overwrite
- `overwrite`: Replace existing skill with new version
- `rename`: Rename conflicting skill with version suffix

## [S8] Testing Strategy

### Unit Tests

- Agent detection logic
- Configuration parsing
- Skill format validation

### Integration Tests

- Full distribution pipeline
- Multi-agent distribution
- Error recovery scenarios

### Manual Testing

- Test with each supported agent
- Verify skills work correctly in each agent
- Test edge cases (missing directories, permission issues)

## [S9] Implementation Phases

### Phase 1: Core Framework

- [ ] Project setup and scaffolding
- [ ] Configuration parser
- [ ] Agent detector
- [ ] Base adapter interface
- [ ] CLI entry point

### Phase 2: Agent Adapters

- [ ] MiMo-Code adapter
- [ ] Claude Code adapter
- [ ] Codex adapter
- [ ] OpenCode adapter
- [ ] Cursor adapter

### Phase 3: Built-in Skills

- [ ] Core skills (6)
- [ ] Development skills (3)
- [ ] Documentation skills (3)
- [ ] Review skills (3)
- [ ] Planning skills (3)
- [ ] Collaboration skills (3)

### Phase 4: Polish

- [ ] Error handling improvements
- [ ] Documentation
- [ ] Tests
- [ ] Release preparation

## [S10] Success Criteria

1. **Functional**: All 22 skills work across supported agents
2. **Usable**: Single `hidmaster.yaml` config file
3. **Reliable**: Graceful error handling, no data loss
4. **Extensible**: Easy to add new agents (adapter pattern)
5. **Performant**: Distribution completes in < 1 second for typical projects
