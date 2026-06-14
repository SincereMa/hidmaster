# hidmaster

One-click AI agent workflow enhancer — distribute 22 production skills and auto-orchestration instructions to multiple AI coding agents simultaneously.

## What it does

`hidmaster` detects which AI coding agents are configured in your project and distributes a curated library of skills (workflow instructions) to each one. One command, all agents enhanced.

**Supported agents:**

| Agent | Marker Dir |
|-------|-----------|
| Claude Code | `.claude` |
| MiMo-Code | `.mimocode` |
| Codex | `.codex` |
| OpenCode | `.opencode` |
| Cursor | `.cursor` |

## Quick start

### Install

```bash
git clone https://github.com/SincereMa/hidmaster.git
cd hidmaster
bun install
```

### Global install (recommended)

```bash
bash install.sh
```

This adds `hidmaster` to your PATH.

### Use

```bash
# In any project with an AI agent configured:
hidmaster

# Or just detect which agents are present:
hidmaster detect
```

## Skills

22 skills across 6 categories:

| Category | Skills |
|----------|--------|
| Core | `explore`, `architect`, `implement`, `validate`, `ship`, `iterate` |
| Development | `debug`, `refactor`, `optimize` |
| Planning | `brainstorm`, `estimate`, `roadmap` |
| Review | `code-review`, `security-review`, `performance-review` |
| Documentation | `api-docs`, `generate-docs`, `changelog` |
| Collaboration | `handoff`, `subagent`, `parallel` |

## Configuration

Edit `hidmaster.yaml` to customize behavior:

```yaml
name: my-project
skills:
  - path: ./skills
agents:
  claude-code: { enabled: true }
  mimocode: { enabled: true }
  codex: { enabled: true }
settings:
  auto_sync: true
  conflict_resolution: skip  # skip|overwrite|rename
```

## Development

```bash
bun install        # install dependencies
bun run dev        # run CLI in development
bun test           # run tests
bun run typecheck  # type check
```

## Project structure

```
hidmaster/
├── bin/              # CLI entry point
├── src/
│   ├── core/         # detector, config, distributor
│   ├── adapters/     # per-agent adapters
│   └── skills/       # skill registry
├── skills/           # 22 SKILL.md files
├── instructions/     # auto-orchestration instructions
└── tests/
```

## License

MIT
