# hidmaster

**One-click AI agent workflow enhancer** — give any AI coding agent 21 production-ready skills and auto-orchestration with a single command.

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

1. **Detect** which AI agent you're using (Claude Code, MiMo-Code, Codex, OpenCode)
2. **Install** 21 production skills to the agent's native directory
3. **Configure** auto-orchestration instructions so the agent knows how to use them

### Commands

```bash
hidmaster                         # interactive agent selection
hidmaster --agent opencode        # install for OpenCode directly
hidmaster --agent claude-code     # install for Claude Code directly
hidmaster detect                  # list detected agents only
hidmaster --force                 # force reinstall
```

## Supported Agents

| Agent | Skills Directory | Instructions |
|-------|-----------------|--------------|
| Claude Code | `.claude/skills/` | `CLAUDE.md` |
| MiMo-Code | `.mimocode/skills/` | `.mimocode/AGENTS.md` |
| Codex | `.codex/skills/` | `AGENTS.md` |
| OpenCode | `.opencode/skills/` | `.opencode/AGENTS.md` |

## Skills

21 skills across 6 categories:

| Category | Skills | Purpose |
|----------|--------|---------|
| **Core** | `explore` `architect` `implement` `validate` `ship` `iterate` `verify` | Full development lifecycle |
| **Development** | `debug` `refactor` `optimize` `tdd` | Code quality, performance, testing |
| **Planning** | `brainstorm` `estimate` `roadmap` | Feature planning and scoping |
| **Review** | `code-review` `security-review` `feedback` | Quality assurance |
| **Documentation** | `docs` `changelog` | Documentation generation |
| **Collaboration** | `subagent` `handoff` | Multi-agent coordination |

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
Agent: code-review → security-review → feedback
```

## How It Works

```
~/.hidmaster/
├── bin/hidmaster              # CLI entry point (Bun)
├── skills/                    # 21 production skills
│   ├── core/                  # explore, architect, implement, validate, ship, iterate, verify
│   ├── development/           # debug, refactor, optimize, tdd
│   ├── planning/              # brainstorm, estimate, roadmap
│   ├── review/                # code-review, security-review, feedback
│   ├── documentation/         # docs, changelog
│   └── collaboration/         # subagent, handoff
└── instructions/              # per-agent orchestration instructions
    ├── claude.md
    ├── mimocode.md
    ├── codex.md
    └── opencode.md
```

### Architecture

- **CLI** (`bin/hidmaster.ts` → `src/cli.ts`) — entry point, parses commands
- **Detector** (`src/core/detector.ts`) — scans for agent marker directories (`.claude`, `.mimocode`, etc.)
- **Skills** (`skills/`) — 21 SKILL.md files with YAML frontmatter and detailed workflows
- **Instructions** (`instructions/`) — per-agent orchestration instructions that teach agents how to use skills automatically

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
