# hidmaster

**One-click AI agent workflow enhancer** — give any AI coding agent 22 production-ready skills and auto-orchestration with a single command.

## Why hidmaster?

AI coding agents have raw capabilities but lack structured workflows. You shouldn't have to manually orchestrate `explore → design → implement → test → ship` every time. hidmaster teaches your agent **how** to use skills automatically.

```
User: "Add dark mode support"
                    ↓
Agent automatically:
  1. explore   → understands codebase
  2. architect → designs the solution
  3. implement → writes the code
  4. validate  → tests and verifies
  5. ship      → finalizes and commits
```

## Install

### One-click install (recommended)

```bash
curl -fsSL https://raw.githubusercontent.com/SincereMa/hidmaster/master/install.sh | bash
```

This installs hidmaster to `~/.hidmaster/` and adds it to your PATH.

### Manual install

```bash
git clone https://github.com/SincereMa/hidmaster.git
cd hidmaster
bash install.sh
```

### Requirements

- [Bun](https://bun.sh) runtime

## Usage

```bash
cd your-project
hidmaster
```

That's it. hidmaster will:

1. **Detect** which AI agent you're using (Claude Code, MiMo-Code, Codex, OpenCode, Cursor)
2. **Install** 22 production skills to the agent's native directory
3. **Configure** auto-orchestration instructions so the agent knows how to use them

### Commands

```bash
hidmaster          # detect agents and distribute skills
hidmaster detect   # list detected agents only
hidmaster --force  # force reinstall, overwrite existing skills
```

## Supported Agents

| Agent | Skills Directory | Instructions |
|-------|-----------------|--------------|
| Claude Code | `.claude/skills/` | `CLAUDE.md` |
| MiMo-Code | `.mimocode/skills/` | `.mimocode/AGENTS.md` |
| Codex | `.codex/skills/` | `AGENTS.md` |
| OpenCode | `.opencode/skills/` | `.opencode/AGENTS.md` |
| Cursor | `.cursor/rules/` | `.cursor/AGENTS.md` |

## Skills

22 skills across 6 categories:

| Category | Skills | Purpose |
|----------|--------|---------|
| **Core** | `explore` `architect` `implement` `validate` `ship` `iterate` | Full development lifecycle |
| **Development** | `debug` `refactor` `optimize` | Code quality and performance |
| **Planning** | `brainstorm` `estimate` `roadmap` | Feature planning and scoping |
| **Review** | `code-review` `security-review` `performance-review` | Quality assurance |
| **Documentation** | `generate-docs` `api-docs` `changelog` | Documentation generation |
| **Collaboration** | `parallel` `subagent` `handoff` | Multi-agent coordination |

Each skill is a `SKILL.md` file with:
- **Trigger conditions** — when to use it
- **Prerequisites** — what to run first
- **Workflow steps** — detailed step-by-step instructions
- **Output format** — what to produce
- **Examples** — real-world usage

## Auto-Orchestration

The key innovation: hidmaster doesn't just install skills — it teaches your agent **how and when** to use them.

Each agent gets tailored orchestration instructions that define:

- **Task classification** — how to determine complexity, parallelization needs, and scope
- **Automatic triggers** — when to use each skill without user prompting
- **Workflow patterns** — standard sequences for features, bug fixes, code reviews, and refactoring
- **Parallel execution** — how to delegate independent tasks to subagents

### Example workflow (auto-triggered)

```
User: "Fix the login bug"
  ↓
Agent: explore → debug → implement → validate
  ↓
User: "Add user authentication"
  ↓
Agent: explore → architect → implement → validate → ship
  ↓
User: "Review the PR"
  ↓
Agent: code-review → security-review → performance-review
```

## Configuration

hidmaster works out of the box with zero configuration. Optionally, create `hidmaster.yaml` to customize:

```yaml
name: my-project
version: 1.0.0

skills:
  - path: ./skills              # local skills directory

agents:
  claude-code: { enabled: true }
  mimocode: { enabled: true }
  codex: { enabled: true }
  opencode: { enabled: false }  # disable agents you don't use
  cursor: { enabled: false }

settings:
  auto_sync: true               # auto-sync on file changes
  symlink: false                # use symlinks instead of copies
  conflict_resolution: skip     # skip | overwrite | rename
```

## How It Works

```
~/.hidmaster/
├── bin/
│   └── hidmaster              # CLI entry point (Bun)
├── skills/                    # 22 production skills
│   ├── core/
│   │   ├── explore/SKILL.md
│   │   ├── architect/SKILL.md
│   │   ├── implement/SKILL.md
│   │   ├── validate/SKILL.md
│   │   ├── ship/SKILL.md
│   │   └── iterate/SKILL.md
│   ├── development/           # debug, refactor, optimize
│   ├── planning/              # brainstorm, estimate, roadmap
│   ├── review/                # code-review, security-review, performance-review
│   ├── documentation/         # generate-docs, api-docs, changelog
│   └── collaboration/         # parallel, subagent, handoff
├── instructions/              # per-agent orchestration instructions
│   ├── claude.md
│   ├── mimocode.md
│   ├── codex.md
│   └── opencode.md
└── src/
    ├── core/                  # detector, config, distributor
    ├── adapters/              # per-agent adapters
    └── skills/                # skill registry
```

### Architecture

- **Detector** — scans for agent marker directories (`.claude`, `.mimocode`, etc.)
- **Adapters** — per-agent adapters that know where to write skills and instructions
- **Skill Registry** — parses `SKILL.md` frontmatter and builds a skill catalog
- **Distributor** — orchestrates pushing skills to all enabled agents

## Development

```bash
git clone https://github.com/SincereMa/hidmaster.git
cd hidmaster
bun install

bun run dev        # run CLI in development
bun test           # run tests
bun run typecheck  # type check
```

## License

MIT
