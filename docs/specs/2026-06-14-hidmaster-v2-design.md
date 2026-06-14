# hidmaster v2 Design Specification

## [S1] Problem Statement

### Current Pain Points

1. AI coding agents have raw capabilities but lack structured workflows
2. Users need to manually orchestrate tasks (explore → design → implement → test)
3. No standard way to add production-ready workflows to any agent
4. Each agent has different configuration mechanisms

### Target Users

- Developers using AI coding agents (OpenCode, MiMo-Code, Claude Code, Codex)
- Want production-ready workflows out of the box
- Zero configuration required

## [S2] Solution Overview

**hidmaster** is a one-click installer that enhances any AI coding agent with:

1. **Production-ready skills** - 22 carefully crafted workflow skills
2. **Auto-orchestration instructions** - Teaches the agent how to use skills automatically
3. **Zero configuration** - Install and use immediately

### Key Design Principles

- **One-click install** - Single shell script
- **Zero config** - No YAML, no setup
- **Auto-orchestration** - Agent learns to use skills automatically
- **Production-ready** - Skills work for real development tasks

## [S3] Architecture

### Installation Flow

```
User runs: curl -fsSL https://hidmaster.dev/install.sh | bash
    ↓
1. Downloads hidmaster to ~/.hidmaster/
2. Adds to PATH (or creates alias)
3. Done!
```

### Usage Flow

```
User runs: hidmaster (in project directory)
    ↓
1. Detects agent (opencode, mimocode, claude-code, codex)
2. Creates agent config directory if not exists
3. Copies skills to agent's native directory
4. Copies orchestration instructions
    ↓
Agent now has:
- .opencode/skills/        # 22 production skills
- .opencode/AGENTS.md      # Auto-orchestration instructions
    ↓
Agent automatically:
- Sees available skills
- Knows when to use each skill
- Orchestrates multi-step workflows
```

### Directory Structure

```
~/.hidmaster/
├── bin/
│   └── hidmaster           # CLI entry point
├── skills/                 # 22 production skills
│   ├── core/
│   │   ├── explore/SKILL.md
│   │   ├── architect/SKILL.md
│   │   ├── implement/SKILL.md
│   │   ├── validate/SKILL.md
│   │   ├── ship/SKILL.md
│   │   └── iterate/SKILL.md
│   ├── development/
│   │   ├── debug/SKILL.md
│   │   ├── refactor/SKILL.md
│   │   └── optimize/SKILL.md
│   ├── documentation/
│   │   ├── generate-docs/SKILL.md
│   │   ├── api-docs/SKILL.md
│   │   └── changelog/SKILL.md
│   ├── review/
│   │   ├── code-review/SKILL.md
│   │   ├── security-review/SKILL.md
│   │   └── performance-review/SKILL.md
│   ├── planning/
│   │   ├── brainstorm/SKILL.md
│   │   ├── estimate/SKILL.md
│   │   └── roadmap/SKILL.md
│   └── collaboration/
│       ├── parallel/SKILL.md
│       ├── subagent/SKILL.md
│       └── handoff/SKILL.md
├── instructions/           # Agent orchestration instructions
│   ├── opencode.md         # For OpenCode
│   ├── mimocode.md         # For MiMo-Code
│   ├── claude.md           # For Claude Code
│   └── codex.md            # For Codex
└── install.sh              # Installation script
```

## [S4] Auto-Orchestration Instructions

The key innovation: instructions that teach the agent HOW to use skills.

### Example: opencode.md

```markdown
# hidmaster Workflow Instructions

You have access to 22 production-ready skills. Use them automatically.

## Automatic Workflow Detection

When a user asks you to do something, automatically determine the workflow:

### Feature Development
1. Use `explore` skill to understand the codebase
2. Use `architect` skill to design the solution
3. Use `implement` skill to write the code
4. Use `validate` skill to test and verify
5. Use `ship` skill to finalize and commit

### Bug Fix
1. Use `explore` skill to understand the issue
2. Use `debug` skill to find the root cause
3. Use `implement` skill to fix the bug
4. Use `validate` skill to verify the fix

### Code Review
1. Use `code-review` skill to analyze changes
2. Use `security-review` skill to check for vulnerabilities
3. Use `performance-review` skill to optimize

## Skill Loading

When you need a skill, call:
`skill({ name: "skill-name" })`

## Multi-Step Execution

For complex tasks, execute skills in sequence:
1. Load skill
2. Follow its workflow
3. Move to next skill
4. Continue until task complete

## Important

- Always start with `explore` for unfamiliar code
- Always end with `validate` before marking complete
- Use `brainstorm` when requirements are unclear
- Use `parallel` for independent subtasks
```

## [S5] Production Skills Design

Each skill includes:
1. **Trigger conditions** - When to use this skill
2. **Prerequisites** - What information is needed
3. **Workflow steps** - Detailed step-by-step instructions
4. **Output format** - What to produce
5. **Examples** - Real-world usage examples
6. **Error handling** - What to do when things go wrong

### Example: explore/SKILL.md

```markdown
---
name: explore
description: Deep codebase understanding and requirements analysis
category: core
triggers:
  - "understand this codebase"
  - "what does this project do"
  - "how is this structured"
  - "analyze this code"
prerequisites: []
output: mental_model
---

# Explore Skill

## Purpose
Systematically explore and understand codebases, requirements, and constraints.

## When to Use
- Starting work on unfamiliar code
- Understanding complex systems
- Before making significant changes
- When onboarding to a new project

## Workflow

### Phase 1: High-Level Understanding (2-3 minutes)
1. Read README.md, package.json, or equivalent
2. Identify project type (library, app, service, etc.)
3. Note key dependencies and technologies
4. Understand the project's purpose

### Phase 2: Structure Mapping (5-10 minutes)
1. List top-level directories and their purposes
2. Identify entry points (main files, index files)
3. Map the dependency graph between modules
4. Find configuration files

### Phase 3: Pattern Recognition (3-5 minutes)
1. Look at 3-5 representative files
2. Identify coding patterns (functional, OOP, etc.)
3. Note naming conventions
4. Understand error handling approach

### Phase 4: Test Analysis (2-3 minutes)
1. Find test files
2. Understand testing framework
3. Note test patterns and coverage

## Output Format

Create a mental model with:
```
## Project Overview
- Type: [library/app/service]
- Language: [typescript/python/etc]
- Framework: [react/express/etc]
- Purpose: [one sentence]

## Key Components
- [Component 1]: [purpose]
- [Component 2]: [purpose]

## Architecture
- [Pattern]: [description]
- [Flow]: [data flow]

## Conventions
- Naming: [convention]
- Error handling: [approach]
- Testing: [framework/pattern]

## Areas of Concern
- [Potential issue 1]
- [Potential issue 2]
```

## Examples

### Example 1: New Project Onboarding
User: "Help me understand this codebase"
Agent: Uses explore skill, produces mental model, then offers to help with specific areas

### Example 2: Before Bug Fix
User: "Fix the login bug"
Agent: First uses explore to understand auth system, then uses debug to find the bug

## Error Handling

- If README is missing, note it and proceed with code analysis
- If project structure is unclear, ask user for clarification
- If too many files, focus on entry points first
```

## [S6] Agent-Specific Instructions

Each agent has different capabilities. Instructions adapt:

### OpenCode
- Uses `.opencode/skills/` for skills
- Uses `.opencode/AGENTS.md` for instructions
- Supports `skill()` tool for loading

### MiMo-Code
- Uses `.mimocode/skills/` for skills
- Uses `.mimocode/AGENTS.md` for instructions
- Has native compose mode support

### Claude Code
- Uses `.claude/skills/` for skills
- Uses `CLAUDE.md` for instructions
- Has different tool naming

### Codex
- Uses `.codex/skills/` for skills
- Uses `AGENTS.md` for instructions
- Limited skill support

## [S7] Installation Script

```bash
#!/bin/bash
# install.sh - One-click hidmaster installation

set -e

HIDMASTER_DIR="$HOME/.hidmaster"
INSTALL_URL="https://github.com/hidmaster/hidmaster/releases/latest/download"

echo "Installing hidmaster..."

# Create directory
mkdir -p "$HIDMASTER_DIR"

# Download latest release
curl -fsSL "$INSTALL_URL/hidmaster.tar.gz" | tar -xz -C "$HIDMASTER_DIR"

# Add to PATH (different methods for different shells)
if [[ "$SHELL" == */zsh ]]; then
    echo 'export PATH="$HOME/.hidmaster/bin:$PATH"' >> ~/.zshrc
    echo "Added to ~/.zshrc"
elif [[ "$SHELL" == */bash ]]; then
    echo 'export PATH="$HOME/.hidmaster/bin:$PATH"' >> ~/.bashrc
    echo "Added to ~/.bashrc"
fi

echo ""
echo "Installation complete!"
echo ""
echo "Usage:"
echo "  cd your-project"
echo "  hidmaster"
echo ""
echo "This will automatically:"
echo "  1. Detect your AI agent"
echo "  2. Install production skills"
echo "  3. Configure auto-orchestration"
```

## [S8] Success Criteria

1. **One-click install** - Single command to install
2. **Zero config** - No YAML, no setup
3. **Auto-orchestration** - Agent automatically uses skills
4. **Production-ready** - Skills work for real development
5. **Multi-agent** - Works with OpenCode, MiMo-Code, Claude Code, Codex
