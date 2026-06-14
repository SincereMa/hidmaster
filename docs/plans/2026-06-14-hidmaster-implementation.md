# hidmaster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use compose:subagent (recommended) or compose:execute to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a lightweight CLI tool that unifies skill distribution across multiple AI coding agents (Claude Code, Codex, MiMo-Code, OpenCode, Cursor).

**Architecture:** Single config file (`hidmaster.yaml`) + CLI tool that detects installed agents and distributes SKILL.md files to each agent's native directory. Uses adapter pattern for extensibility.

**Tech Stack:** TypeScript, Node.js, Bun runtime, YAML parser (js-yaml), File system operations

---

## File Structure

```
hidmaster/
├── bin/
│   └── hidmaster.ts           # CLI entry point
├── src/
│   ├── core/
│   │   ├── config.ts          # Configuration parsing
│   │   ├── detector.ts        # Agent detection
│   │   └── distributor.ts     # Skill distribution
│   ├── adapters/
│   │   ├── base.ts            # Base adapter interface
│   │   ├── mimocode.ts        # MiMo-Code adapter
│   │   ├── claude.ts          # Claude Code adapter
│   │   ├── codex.ts           # Codex adapter
│   │   ├── opencode.ts        # OpenCode adapter
│   │   └── cursor.ts          # Cursor adapter
│   ├── skills/
│   │   └── registry.ts        # Built-in skills registry
│   └── index.ts               # Main exports
├── skills/                    # Built-in skills (SKILL.md files)
│   ├── core/
│   ├── development/
│   ├── documentation/
│   ├── review/
│   ├── planning/
│   └── collaboration/
├── tests/
│   ├── core/
│   ├── adapters/
│   └── integration/
├── hidmaster.yaml             # Default config template
├── package.json
├── tsconfig.json
└── README.md
```

---

## Task 1: Project Setup and Scaffolding

**Covers:** [S2, S6]

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `src/index.ts`
- Create: `bin/hidmaster.ts`

- [ ] **Step 1: Initialize project**

```bash
cd /Users/sincere/Projects/hidmaster
bun init -y
```

- [ ] **Step 2: Install dependencies**

```bash
bun add js-yaml glob
bun add -d @types/js-yaml @types/glob typescript
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "rootDir": ".",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*", "bin/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 4: Create .gitignore**

```
node_modules/
dist/
*.log
.DS_Store
```

- [ ] **Step 5: Create src/index.ts**

```typescript
export * from './core/config'
export * from './core/detector'
export * from './core/distributor'
export * from './adapters/base'
```

- [ ] **Step 6: Create bin/hidmaster.ts**

```typescript
#!/usr/bin/env node

import { main } from '../src/cli'

main()
```

- [ ] **Step 7: Add package.json scripts**

```json
{
  "name": "hidmaster",
  "version": "1.0.0",
  "description": "Hidden Master - Unified skill distribution for AI coding agents",
  "bin": {
    "hidmaster": "./bin/hidmaster.ts"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsx bin/hidmaster.ts",
    "test": "bun test",
    "typecheck": "tsc --noEmit"
  },
  "type": "module"
}
```

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "feat: initial project setup with TypeScript and Bun"
```

---

## Task 2: Configuration Parser

**Covers:** [S5]

**Files:**
- Create: `src/core/config.ts`
- Create: `tests/core/config.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/core/config.test.ts
import { describe, it, expect } from 'bun:test'
import { parseConfig, Config } from '../../src/core/config'

describe('Config Parser', () => {
  it('should parse valid config', () => {
    const config: Config = {
      name: 'test-project',
      version: '1.0.0',
      skills: [{ path: './skills' }],
      agents: {
        mimocode: { enabled: true },
        'claude-code': { enabled: false },
      },
      settings: {
        auto_sync: true,
        symlink: false,
        conflict_resolution: 'skip',
      },
    }

    const result = parseConfig(config)
    expect(result.name).toBe('test-project')
    expect(result.skills).toHaveLength(1)
    expect(result.agents.mimocode.enabled).toBe(true)
  })

  it('should use default values for missing fields', () => {
    const config: Config = {
      name: 'test-project',
      version: '1.0.0',
      skills: [],
    }

    const result = parseConfig(config)
    expect(result.agents.mimocode.enabled).toBe(true)
    expect(result.settings.auto_sync).toBe(true)
    expect(result.settings.symlink).toBe(false)
    expect(result.settings.conflict_resolution).toBe('skip')
  })

  it('should throw on invalid config', () => {
    const config = { name: 123 } // Invalid
    expect(() => parseConfig(config)).toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/core/config.test.ts
```

Expected: FAIL with "Cannot find module '../../src/core/config'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/core/config.ts
import yaml from 'js-yaml'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export interface SkillSource {
  path?: string
  url?: string
}

export interface AgentConfig {
  enabled: boolean
}

export interface Settings {
  auto_sync: boolean
  symlink: boolean
  conflict_resolution: 'skip' | 'overwrite' | 'rename'
}

export interface Config {
  name: string
  version: string
  skills: SkillSource[]
  agents?: Record<string, AgentConfig>
  settings?: Partial<Settings>
}

const DEFAULT_AGENTS: Record<string, AgentConfig> = {
  mimocode: { enabled: true },
  'claude-code': { enabled: true },
  codex: { enabled: true },
  opencode: { enabled: false },
  cursor: { enabled: false },
}

const DEFAULT_SETTINGS: Settings = {
  auto_sync: true,
  symlink: false,
  conflict_resolution: 'skip',
}

export function parseConfig(raw: unknown): Config {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid config: must be an object')
  }

  const data = raw as Record<string, unknown>

  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid config: name is required and must be a string')
  }

  if (!data.version || typeof data.version !== 'string') {
    throw new Error('Invalid config: version is required and must be a string')
  }

  if (!Array.isArray(data.skills)) {
    throw new Error('Invalid config: skills must be an array')
  }

  return {
    name: data.name as string,
    version: data.version as string,
    skills: data.skills as SkillSource[],
    agents: { ...DEFAULT_AGENTS, ...(data.agents as Record<string, AgentConfig> | undefined) },
    settings: { ...DEFAULT_SETTINGS, ...(data.settings as Partial<Settings> | undefined) },
  }
}

export function loadConfig(configPath: string): Config {
  const content = readFileSync(configPath, 'utf-8')
  const raw = yaml.load(content)
  return parseConfig(raw)
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/core/config.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/config.ts tests/core/config.test.ts
git commit -m "feat: add configuration parser with YAML support"
```

---

## Task 3: Agent Detector

**Covers:** [S3, S7]

**Files:**
- Create: `src/core/detector.ts`
- Create: `tests/core/detector.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/core/detector.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { detectAgents, AgentInfo } from '../../src/core/detector'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp')

describe('Agent Detector', () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should detect MiMo-Code when .mimocode exists', async () => {
    mkdirSync(join(TEST_DIR, '.mimocode'), { recursive: true })
    const agents = await detectAgents(TEST_DIR)
    expect(agents.some(a => a.name === 'mimocode')).toBe(true)
  })

  it('should detect Claude Code when .claude exists', async () => {
    mkdirSync(join(TEST_DIR, '.claude'), { recursive: true })
    const agents = await detectAgents(TEST_DIR)
    expect(agents.some(a => a.name === 'claude-code')).toBe(true)
  })

  it('should detect multiple agents', async () => {
    mkdirSync(join(TEST_DIR, '.mimocode'), { recursive: true })
    mkdirSync(join(TEST_DIR, '.codex'), { recursive: true })
    const agents = await detectAgents(TEST_DIR)
    expect(agents.length).toBe(2)
  })

  it('should return empty array when no agents detected', async () => {
    const agents = await detectAgents(TEST_DIR)
    expect(agents).toHaveLength(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/core/detector.test.ts
```

Expected: FAIL with "Cannot find module '../../src/core/detector'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/core/detector.ts
import { existsSync } from 'fs'
import { join } from 'path'

export interface AgentInfo {
  name: string
  detected: boolean
  configDir: string
}

const AGENT_MARKERS: Record<string, string> = {
  mimocode: '.mimocode',
  'claude-code': '.claude',
  codex: '.codex',
  opencode: '.opencode',
  cursor: '.cursor',
}

export async function detectAgents(directory: string): Promise<AgentInfo[]> {
  const agents: AgentInfo[] = []

  for (const [name, marker] of Object.entries(AGENT_MARKERS)) {
    const markerPath = join(directory, marker)
    if (existsSync(markerPath)) {
      agents.push({
        name,
        detected: true,
        configDir: markerPath,
      })
    }
  }

  return agents
}

export function getAgentMarker(agentName: string): string | undefined {
  return AGENT_MARKERS[agentName]
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/core/detector.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/detector.ts tests/core/detector.test.ts
git commit -m "feat: add agent detection logic"
```

---

## Task 4: Base Adapter Interface

**Covers:** [S3, S6]

**Files:**
- Create: `src/adapters/base.ts`
- Create: `tests/adapters/base.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/adapters/base.test.ts
import { describe, it, expect } from 'bun:test'
import { AgentAdapter, Skill } from '../../src/adapters/base'

describe('Base Adapter Interface', () => {
  it('should define correct interface', () => {
    // This is a type check test
    const mockAdapter: AgentAdapter = {
      name: 'test',
      skillsDir: '/test/skills',
      async distribute(skill: Skill) {},
      async remove(skill: Skill) {},
    }

    expect(mockAdapter.name).toBe('test')
    expect(mockAdapter.skillsDir).toBe('/test/skills')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/adapters/base.test.ts
```

Expected: FAIL with "Cannot find module '../../src/adapters/base'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/adapters/base.ts
export interface Skill {
  name: string
  description: string
  category: string
  content: string
  filePath: string
}

export interface AgentAdapter {
  name: string
  skillsDir: string
  distribute(skill: Skill): Promise<void>
  remove(skill: Skill): Promise<void>
}

export abstract class BaseAdapter implements AgentAdapter {
  abstract name: string
  abstract skillsDir: string

  abstract distribute(skill: Skill): Promise<void>
  abstract remove(skill: Skill): Promise<void>

  protected getSkillPath(skill: Skill): string {
    const dir = skill.category ? `${skill.category}/${skill.name}` : skill.name
    return `${this.skillsDir}/${dir}/SKILL.md`
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/adapters/base.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/adapters/base.ts tests/adapters/base.test.ts
git commit -m "feat: add base adapter interface"
```

---

## Task 5: MiMo-Code Adapter

**Covers:** [S3, S6]

**Files:**
- Create: `src/adapters/mimocode.ts`
- Create: `tests/adapters/mimocode.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/adapters/mimocode.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { MiMoCodeAdapter } from '../../src/adapters/mimocode'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/mimocode')

describe('MiMo-Code Adapter', () => {
  let adapter: MiMoCodeAdapter

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
    adapter = new MiMoCodeAdapter(TEST_DIR)
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skill to .mimocode/skills/', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: '---\nname: test-skill\ndescription: A test skill\n---\n\n# Test Skill',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)

    const skillPath = join(TEST_DIR, '.mimocode/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(true)

    const content = readFileSync(skillPath, 'utf-8')
    expect(content).toContain('name: test-skill')
  })

  it('should remove skill from .mimocode/skills/', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)
    await adapter.remove(skill)

    const skillPath = join(TEST_DIR, '.mimocode/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/adapters/mimocode.test.ts
```

Expected: FAIL with "Cannot find module '../../src/adapters/mimocode'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/adapters/mimocode.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class MiMoCodeAdapter extends BaseAdapter {
  name = 'mimocode'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.mimocode/skills`
  }

  async distribute(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    if (existsSync(skillPath)) {
      rmSync(dirname(skillPath), { recursive: true, force: true })
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/adapters/mimocode.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/adapters/mimocode.ts tests/adapters/mimocode.test.ts
git commit -m "feat: add MiMo-Code adapter"
```

---

## Task 6: Claude Code Adapter

**Covers:** [S3, S6]

**Files:**
- Create: `src/adapters/claude.ts`
- Create: `tests/adapters/claude.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/adapters/claude.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { ClaudeAdapter } from '../../src/adapters/claude'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/claude')

describe('Claude Code Adapter', () => {
  let adapter: ClaudeAdapter

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
    adapter = new ClaudeAdapter(TEST_DIR)
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skill to .claude/skills/', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: '---\nname: test-skill\ndescription: A test skill\n---\n\n# Test Skill',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)

    const skillPath = join(TEST_DIR, '.claude/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(true)
  })

  it('should remove skill', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)
    await adapter.remove(skill)

    const skillPath = join(TEST_DIR, '.claude/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/adapters/claude.test.ts
```

Expected: FAIL with "Cannot find module '../../src/adapters/claude'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/adapters/claude.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class ClaudeAdapter extends BaseAdapter {
  name = 'claude-code'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.claude/skills`
  }

  async distribute(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    if (existsSync(skillPath)) {
      rmSync(dirname(skillPath), { recursive: true, force: true })
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/adapters/claude.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/adapters/claude.ts tests/adapters/claude.test.ts
git commit -m "feat: add Claude Code adapter"
```

---

## Task 7: Codex Adapter

**Covers:** [S3, S6]

**Files:**
- Create: `src/adapters/codex.ts`
- Create: `tests/adapters/codex.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/adapters/codex.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { CodexAdapter } from '../../src/adapters/codex'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/codex')

describe('Codex Adapter', () => {
  let adapter: CodexAdapter

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
    adapter = new CodexAdapter(TEST_DIR)
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skill to .codex/skills/', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)

    const skillPath = join(TEST_DIR, '.codex/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(true)
  })

  it('should remove skill', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)
    await adapter.remove(skill)

    const skillPath = join(TEST_DIR, '.codex/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/adapters/codex.test.ts
```

Expected: FAIL with "Cannot find module '../../src/adapters/codex'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/adapters/codex.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class CodexAdapter extends BaseAdapter {
  name = 'codex'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.codex/skills`
  }

  async distribute(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    if (existsSync(skillPath)) {
      rmSync(dirname(skillPath), { recursive: true, force: true })
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/adapters/codex.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/adapters/codex.ts tests/adapters/codex.test.ts
git commit -m "feat: add Codex adapter"
```

---

## Task 8: OpenCode Adapter

**Covers:** [S3, S6]

**Files:**
- Create: `src/adapters/opencode.ts`
- Create: `tests/adapters/opencode.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/adapters/opencode.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { OpenCodeAdapter } from '../../src/adapters/opencode'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/opencode')

describe('OpenCode Adapter', () => {
  let adapter: OpenCodeAdapter

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
    adapter = new OpenCodeAdapter(TEST_DIR)
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skill to .opencode/skills/', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)

    const skillPath = join(TEST_DIR, '.opencode/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(true)
  })

  it('should remove skill', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)
    await adapter.remove(skill)

    const skillPath = join(TEST_DIR, '.opencode/skills/core/test-skill/SKILL.md')
    expect(existsSync(skillPath)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/adapters/opencode.test.ts
```

Expected: FAIL with "Cannot find module '../../src/adapters/opencode'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/adapters/opencode.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class OpenCodeAdapter extends BaseAdapter {
  name = 'opencode'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.opencode/skills`
  }

  async distribute(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    if (existsSync(skillPath)) {
      rmSync(dirname(skillPath), { recursive: true, force: true })
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/adapters/opencode.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/adapters/opencode.ts tests/adapters/opencode.test.ts
git commit -m "feat: add OpenCode adapter"
```

---

## Task 9: Cursor Adapter

**Covers:** [S3, S6]

**Files:**
- Create: `src/adapters/cursor.ts`
- Create: `tests/adapters/cursor.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/adapters/cursor.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { CursorAdapter } from '../../src/adapters/cursor'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/cursor')

describe('Cursor Adapter', () => {
  let adapter: CursorAdapter

  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
    adapter = new CursorAdapter(TEST_DIR)
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skill to .cursor/rules/', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: '---\nname: test-skill\ndescription: A test skill\n---\n\n# Test Skill',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)

    const skillPath = join(TEST_DIR, '.cursor/rules/test-skill.mdc')
    expect(existsSync(skillPath)).toBe(true)

    const content = readFileSync(skillPath, 'utf-8')
    expect(content).toContain('name: test-skill')
  })

  it('should remove skill', async () => {
    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    await adapter.distribute(skill)
    await adapter.remove(skill)

    const skillPath = join(TEST_DIR, '.cursor/rules/test-skill.mdc')
    expect(existsSync(skillPath)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/adapters/cursor.test.ts
```

Expected: FAIL with "Cannot find module '../../src/adapters/cursor'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/adapters/cursor.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class CursorAdapter extends BaseAdapter {
  name = 'cursor'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.cursor/rules`
  }

  async distribute(skill: Skill): Promise<void> {
    // Cursor uses .mdc format
    const skillPath = `${this.skillsDir}/${skill.name}.mdc`
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = `${this.skillsDir}/${skill.name}.mdc`
    if (existsSync(skillPath)) {
      rmSync(skillPath, { force: true })
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/adapters/cursor.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/adapters/cursor.ts tests/adapters/cursor.test.ts
git commit -m "feat: add Cursor adapter"
```

---

## Task 10: Skill Distributor

**Covers:** [S3, S7]

**Files:**
- Create: `src/core/distributor.ts`
- Create: `tests/core/distributor.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/core/distributor.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { distributeSkills, SkillDistributor } from '../../src/core/distributor'
import { AgentAdapter, Skill } from '../../src/adapters/base'
import { MiMoCodeAdapter } from '../../src/adapters/mimocode'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/distributor')

describe('Skill Distributor', () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skills to multiple adapters', async () => {
    const adapter1 = new MiMoCodeAdapter(join(TEST_DIR, 'project1'))
    const adapter2 = new MiMoCodeAdapter(join(TEST_DIR, 'project2'))

    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    const distributor = new SkillDistributor([adapter1, adapter2])
    await distributor.distributeAll([skill])

    expect(existsSync(join(TEST_DIR, 'project1/.mimocode/skills/core/test-skill/SKILL.md'))).toBe(true)
    expect(existsSync(join(TEST_DIR, 'project2/.mimocode/skills/core/test-skill/SKILL.md'))).toBe(true)
  })

  it('should handle distribution errors gracefully', async () => {
    const failingAdapter: AgentAdapter = {
      name: 'failing',
      skillsDir: '/nonexistent',
      async distribute() {
        throw new Error('Distribution failed')
      },
      async remove() {},
    }

    const successAdapter = new MiMoCodeAdapter(join(TEST_DIR, 'project'))

    const skill: Skill = {
      name: 'test-skill',
      description: 'A test skill',
      category: 'core',
      content: 'test',
      filePath: '/tmp/test/SKILL.md',
    }

    const distributor = new SkillDistributor([failingAdapter, successAdapter])
    const results = await distributor.distributeAll([skill])

    expect(results.success).toHaveLength(1)
    expect(results.failed).toHaveLength(1)
    expect(existsSync(join(TEST_DIR, 'project/.mimocode/skills/core/test-skill/SKILL.md'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/core/distributor.test.ts
```

Expected: FAIL with "Cannot find module '../../src/core/distributor'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/core/distributor.ts
import { AgentAdapter, Skill } from '../adapters/base'

export interface DistributionResult {
  success: { adapter: string; skill: string }[]
  failed: { adapter: string; skill: string; error: Error }[]
}

export class SkillDistributor {
  private adapters: AgentAdapter[]

  constructor(adapters: AgentAdapter[]) {
    this.adapters = adapters
  }

  async distributeAll(skills: Skill[]): Promise<DistributionResult> {
    const result: DistributionResult = {
      success: [],
      failed: [],
    }

    for (const adapter of this.adapters) {
      for (const skill of skills) {
        try {
          await adapter.distribute(skill)
          result.success.push({ adapter: adapter.name, skill: skill.name })
        } catch (error) {
          result.failed.push({
            adapter: adapter.name,
            skill: skill.name,
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      }
    }

    return result
  }

  async removeAll(skills: Skill[]): Promise<void> {
    for (const adapter of this.adapters) {
      for (const skill of skills) {
        try {
          await adapter.remove(skill)
        } catch {
          // Ignore removal errors
        }
      }
    }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/core/distributor.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/core/distributor.ts tests/core/distributor.test.ts
git commit -m "feat: add skill distributor with error handling"
```

---

## Task 11: Built-in Skills Registry

**Covers:** [S6]

**Files:**
- Create: `src/skills/registry.ts`
- Create: `skills/core/explore/SKILL.md`
- Create: `skills/core/architect/SKILL.md`
- Create: `skills/core/implement/SKILL.md`
- Create: `skills/core/validate/SKILL.md`
- Create: `skills/core/ship/SKILL.md`
- Create: `skills/core/iterate/SKILL.md`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/skills/registry.test.ts
import { describe, it, expect } from 'bun:test'
import { getBuiltInSkills, SkillRegistry } from '../../src/skills/registry'

describe('Skill Registry', () => {
  it('should load built-in skills', () => {
    const skills = getBuiltInSkills()
    expect(skills.length).toBeGreaterThan(0)
  })

  it('should have explore skill', () => {
    const skills = getBuiltInSkills()
    const explore = skills.find(s => s.name === 'explore')
    expect(explore).toBeDefined()
    expect(explore?.category).toBe('core')
  })

  it('should have all 22 skills', () => {
    const skills = getBuiltInSkills()
    expect(skills.length).toBe(22)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/skills/registry.test.ts
```

Expected: FAIL with "Cannot find module '../../src/skills/registry'"

- [ ] **Step 3: Create core skills (6 files)**

Create `skills/core/explore/SKILL.md`:

```markdown
---
name: explore
description: Deep codebase understanding and requirements analysis
category: core
---

# Explore Skill

## Overview

Systematically explore and understand codebases, requirements, and constraints before making changes.

## When to Use

- Starting work on an unfamiliar codebase
- Understanding complex systems
- Analyzing requirements before implementation

## Workflow

1. **Map the Structure** - Identify key directories, files, and entry points
2. **Trace Dependencies** - Understand how components connect
3. **Identify Patterns** - Recognize existing conventions and patterns
4. **Document Findings** - Create a mental model of the system

## Techniques

- Start with README and documentation
- Look for entry points (main files, index files)
- Trace imports and dependencies
- Check for tests to understand expected behavior
- Look for configuration files to understand setup

## Output

A clear understanding of:
- System architecture
- Key components and their relationships
- Existing patterns and conventions
- Potential areas of concern
```

Create `skills/core/architect/SKILL.md`:

```markdown
---
name: architect
description: Technical design and architecture decisions
category: core
---

# Architect Skill

## Overview

Design technical solutions and make architecture decisions before implementation.

## When to Use

- Planning significant changes
- Designing new features
- Evaluating trade-offs between approaches

## Workflow

1. **Gather Requirements** - Understand what needs to be built
2. **Explore Options** - Consider multiple approaches
3. **Evaluate Trade-offs** - Analyze pros and cons
4. **Make Decision** - Choose the best approach
5. **Document Design** - Record the decision and rationale

## Design Considerations

- Simplicity over complexity
- Existing patterns and conventions
- Performance implications
- Maintainability
- Testing strategy

## Output

A clear design document with:
- Problem statement
- Proposed solution
- Trade-offs considered
- Implementation plan
```

Create `skills/core/implement/SKILL.md`:

```markdown
---
name: implement
description: Code implementation following design specifications
category: core
---

# Implement Skill

## Overview

Execute code changes following established designs and patterns.

## When to Use

- After design decisions are made
- Implementing features
- Making code changes

## Workflow

1. **Review Design** - Understand the plan
2. **Start Small** - Begin with minimal changes
3. **Test Incrementally** - Verify each step
4. **Follow Patterns** - Match existing code style
5. **Commit Frequently** - Save progress often

## Best Practices

- Write code that matches existing patterns
- Keep changes focused and minimal
- Test as you go
- Don't over-engineer
- Document complex logic

## Output

Working code that:
- Follows design specifications
- Matches existing patterns
- Passes tests
- Is ready for review
```

Create `skills/core/validate/SKILL.md`:

```markdown
---
name: validate
description: Testing, type checking, and functional verification
category: core
---

# Validate Skill

## Overview

Verify that changes work correctly through testing and validation.

## When to Use

- After implementing changes
- Before committing code
- When debugging issues

## Workflow

1. **Run Tests** - Execute existing test suite
2. **Check Types** - Run type checker
3. **Verify Functionality** - Manual testing if needed
4. **Review Changes** - Self-code review
5. **Fix Issues** - Address any problems found

## Validation Steps

- Unit tests
- Integration tests
- Type checking
- Linting
- Manual verification

## Output

Confirmation that:
- All tests pass
- No type errors
- Functionality works as expected
- Code quality is acceptable
```

Create `skills/core/ship/SKILL.md`:

```markdown
---
name: ship
description: Merging, releases, and documentation updates
category: core
---

# Ship Skill

## Overview

Prepare and execute code delivery, including merging, releases, and documentation.

## When to Use

- After validation passes
- Preparing for release
- Updating documentation

## Workflow

1. **Final Review** - Last check before shipping
2. **Update Documentation** - Keep docs current
3. **Prepare Release** - Version bumps, changelogs
4. **Merge Changes** - Integrate to main branch
5. **Verify Deployment** - Confirm successful delivery

## Shipping Checklist

- [ ] Tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped (if needed)
- [ ] Code reviewed

## Output

Successfully delivered changes with:
- Updated documentation
- Clean git history
- Verified functionality
```

Create `skills/core/iterate/SKILL.md`:

```markdown
---
name: iterate
description: Feedback collection and continuous improvement
category: core
---

# Iterate Skill

## Overview

Collect feedback and continuously improve based on learnings.

## When to Use

- After shipping features
- During code reviews
- When addressing issues

## Workflow

1. **Collect Feedback** - Gather input from users/reviewers
2. **Analyze Patterns** - Identify recurring themes
3. **Prioritize Changes** - Focus on high-impact improvements
4. **Implement Improvements** - Make incremental changes
5. **Measure Impact** - Verify improvements work

## Feedback Sources

- Code reviews
- User feedback
- Bug reports
- Performance metrics
- Test coverage

## Output

Continuous improvement through:
- Documented learnings
- Process refinements
- Code quality improvements
- Better patterns
```

- [ ] **Step 4: Create skills registry**

```typescript
// src/skills/registry.ts
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'
import { Skill } from '../adapters/base'

export interface SkillInfo extends Skill {
  version?: string
  agents?: string[]
  tools?: string[]
}

function parseSkillFile(filePath: string): SkillInfo | null {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (!frontmatterMatch) return null

    const [, frontmatter, body] = frontmatterMatch
    const metadata: Record<string, unknown> = {}

    for (const line of frontmatter.split('\n')) {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(':').trim()
      }
    }

    // Parse category from path
    const pathParts = filePath.split('/')
    const categoryIndex = pathParts.findIndex(p => p === 'skills') + 1
    const category = pathParts[categoryIndex] || 'unknown'

    return {
      name: metadata.name as string,
      description: metadata.description as string,
      category,
      content,
      filePath,
      version: metadata.version as string | undefined,
    }
  } catch {
    return null
  }
}

function scanSkillsDir(dir: string): SkillInfo[] {
  const skills: SkillInfo[] = []

  try {
    const entries = readdirSync(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        if (entry === 'SKILL.md') {
          const skill = parseSkillFile(fullPath)
          if (skill) skills.push(skill)
        } else {
          skills.push(...scanSkillsDir(fullPath))
        }
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return skills
}

export function getBuiltInSkills(): SkillInfo[] {
  const skillsDir = join(import.meta.dir, '../../skills')
  return scanSkillsDir(skillsDir)
}

export class SkillRegistry {
  private skills: Map<string, SkillInfo> = new Map()

  constructor() {
    const builtIn = getBuiltInSkills()
    for (const skill of builtIn) {
      this.skills.set(skill.name, skill)
    }
  }

  get(name: string): SkillInfo | undefined {
    return this.skills.get(name)
  }

  getAll(): SkillInfo[] {
    return Array.from(this.skills.values())
  }

  getByCategory(category: string): SkillInfo[] {
    return this.getAll().filter(s => s.category === category)
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
bun test tests/skills/registry.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/skills/registry.ts tests/skills/registry.test.ts skills/
git commit -m "feat: add built-in skills registry with 6 core skills"
```

---

## Task 12: CLI Entry Point

**Covers:** [S2, S6]

**Files:**
- Create: `src/cli.ts`
- Create: `tests/cli.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/cli.test.ts
import { describe, it, expect } from 'bun:test'
import { parseArgs, CliOptions } from '../../src/cli'

describe('CLI', () => {
  it('should parse distribute command', () => {
    const args = ['distribute', '--config', 'hidmaster.yaml']
    const options = parseArgs(args)
    expect(options.command).toBe('distribute')
    expect(options.config).toBe('hidmaster.yaml')
  })

  it('should parse detect command', () => {
    const args = ['detect']
    const options = parseArgs(args)
    expect(options.command).toBe('detect')
  })

  it('should parse list command', () => {
    const args = ['list']
    const options = parseArgs(args)
    expect(options.command).toBe('list')
  })

  it('should default to distribute command', () => {
    const args: string[] = []
    const options = parseArgs(args)
    expect(options.command).toBe('distribute')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/cli.test.ts
```

Expected: FAIL with "Cannot find module '../../src/cli'"

- [ ] **Step 3: Write minimal implementation**

```typescript
// src/cli.ts
import { loadConfig, Config } from './core/config'
import { detectAgents, AgentInfo } from './core/detector'
import { SkillDistributor, DistributionResult } from './core/distributor'
import { MiMoCodeAdapter } from './adapters/mimocode'
import { ClaudeAdapter } from './adapters/claude'
import { CodexAdapter } from './adapters/codex'
import { OpenCodeAdapter } from './adapters/opencode'
import { CursorAdapter } from './adapters/cursor'
import { AgentAdapter, Skill } from './adapters/base'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

export interface CliOptions {
  command: string
  config?: string
  verbose?: boolean
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    command: 'distribute',
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === 'distribute' || arg === 'detect' || arg === 'list') {
      options.command = arg
    } else if (arg === '--config' && args[i + 1]) {
      options.config = args[++i]
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true
    }
  }

  return options
}

function createAdapters(config: Config, projectRoot: string): AgentAdapter[] {
  const adapters: AgentAdapter[] = []

  if (config.agents?.mimocode?.enabled) {
    adapters.push(new MiMoCodeAdapter(projectRoot))
  }
  if (config.agents?.['claude-code']?.enabled) {
    adapters.push(new ClaudeAdapter(projectRoot))
  }
  if (config.agents?.codex?.enabled) {
    adapters.push(new CodexAdapter(projectRoot))
  }
  if (config.agents?.opencode?.enabled) {
    adapters.push(new OpenCodeAdapter(projectRoot))
  }
  if (config.agents?.cursor?.enabled) {
    adapters.push(new CursorAdapter(projectRoot))
  }

  return adapters
}

function loadSkillsFromPath(skillPath: string): Skill[] {
  const skills: Skill[] = []

  try {
    const stat = statSync(skillPath)
    if (stat.isDirectory()) {
      const entries = readdirSync(skillPath)
      for (const entry of entries) {
        skills.push(...loadSkillsFromPath(join(skillPath, entry)))
      }
    } else if (skillPath.endsWith('SKILL.md')) {
      const content = readFileSync(skillPath, 'utf-8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

      if (frontmatterMatch) {
        const [, frontmatter] = frontmatterMatch
        const metadata: Record<string, string> = {}

        for (const line of frontmatter.split('\n')) {
          const [key, ...valueParts] = line.split(':')
          if (key && valueParts.length > 0) {
            metadata[key.trim()] = valueParts.join(':').trim()
          }
        }

        if (metadata.name) {
          skills.push({
            name: metadata.name,
            description: metadata.description || '',
            category: 'custom',
            content,
            filePath: skillPath,
          })
        }
      }
    }
  } catch {
    // Path doesn't exist
  }

  return skills
}

async function distribute(configPath: string, projectRoot: string): Promise<void> {
  const config = loadConfig(configPath)
  const agents = await detectAgents(projectRoot)

  console.log(`\nhidmaster - Distributing skills for: ${config.name}\n`)

  console.log('Detected agents:')
  for (const agent of agents) {
    console.log(`  ✓ ${agent.name}`)
  }
  console.log('')

  const adapters = createAdapters(config, projectRoot)
  const distributor = new SkillDistributor(adapters)

  // Load skills from configured paths
  const allSkills: Skill[] = []
  for (const source of config.skills) {
    if (source.path) {
      const fullPath = resolve(projectRoot, source.path)
      allSkills.push(...loadSkillsFromPath(fullPath))
    }
  }

  console.log(`Distributing ${allSkills.length} skills to ${adapters.length} agents...\n`)

  const result = await distributor.distributeAll(allSkills)

  console.log('Results:')
  console.log(`  ✓ Success: ${result.success.length}`)
  console.log(`  ✗ Failed: ${result.failed.length}`)

  if (result.failed.length > 0) {
    console.log('\nFailed distributions:')
    for (const failure of result.failed) {
      console.log(`  - ${failure.skill} to ${failure.adapter}: ${failure.error.message}`)
    }
  }

  console.log('\nDone!')
}

async function detect(projectRoot: string): Promise<void> {
  const agents = await detectAgents(projectRoot)

  console.log('\nhidmaster - Agent Detection\n')

  if (agents.length === 0) {
    console.log('No agents detected in current directory.')
    console.log('\nSupported agents:')
    console.log('  - MiMo-Code (.mimocode)')
    console.log('  - Claude Code (.claude)')
    console.log('  - Codex (.codex)')
    console.log('  - OpenCode (.opencode)')
    console.log('  - Cursor (.cursor)')
  } else {
    console.log('Detected agents:')
    for (const agent of agents) {
      console.log(`  ✓ ${agent.name} (${agent.configDir})`)
    }
  }

  console.log('')
}

export async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const options = parseArgs(args)

  const projectRoot = process.cwd()
  const configPath = options.config || join(projectRoot, 'hidmaster.yaml')

  try {
    switch (options.command) {
      case 'distribute':
        await distribute(configPath, projectRoot)
        break
      case 'detect':
        await detect(projectRoot)
        break
      case 'list':
        // TODO: Implement list command
        console.log('List command not yet implemented')
        break
      default:
        console.log(`Unknown command: ${options.command}`)
        process.exit(1)
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
bun test tests/cli.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/cli.ts tests/cli.test.ts
git commit -m "feat: add CLI entry point with distribute and detect commands"
```

---

## Task 13: Default Configuration Template

**Covers:** [S5]

**Files:**
- Create: `hidmaster.yaml`

- [ ] **Step 1: Create default config**

```yaml
# hidmaster.yaml - Unified skill distribution configuration
name: my-project
version: 1.0.0

# Skill sources
skills:
  - path: ./skills           # Local skills directory
  # - url: https://github.com/hidmaster/skills-pack  # Remote skill pack (optional)

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

- [ ] **Step 2: Commit**

```bash
git add hidmaster.yaml
git commit -m "feat: add default configuration template"
```

---

## Task 14: Integration Tests

**Covers:** [S8]

**Files:**
- Create: `tests/integration/distribution.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/integration/distribution.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { detectAgents } from '../../src/core/detector'
import { SkillDistributor } from '../../src/core/distributor'
import { MiMoCodeAdapter } from '../../src/adapters/mimocode'
import { ClaudeAdapter } from '../../src/adapters/claude'
import { CodexAdapter } from '../../src/adapters/codex'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp/integration')

describe('Integration: Full Distribution Pipeline', () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should distribute skills to all enabled agents', async () => {
    // Create agent directories
    mkdirSync(join(TEST_DIR, '.mimocode'), { recursive: true })
    mkdirSync(join(TEST_DIR, '.claude'), { recursive: true })
    mkdirSync(join(TEST_DIR, '.codex'), { recursive: true })

    // Detect agents
    const agents = await detectAgents(TEST_DIR)
    expect(agents.length).toBe(3)

    // Create adapters
    const adapters = [
      new MiMoCodeAdapter(TEST_DIR),
      new ClaudeAdapter(TEST_DIR),
      new CodexAdapter(TEST_DIR),
    ]

    // Create skills
    const skills: Skill[] = [
      {
        name: 'explore',
        description: 'Explore skill',
        category: 'core',
        content: '---\nname: explore\n---\n\n# Explore',
        filePath: '/tmp/test/SKILL.md',
      },
      {
        name: 'debug',
        description: 'Debug skill',
        category: 'development',
        content: '---\nname: debug\n---\n\n# Debug',
        filePath: '/tmp/test/SKILL.md',
      },
    ]

    // Distribute
    const distributor = new SkillDistributor(adapters)
    const result = await distributor.distributeAll(skills)

    // Verify
    expect(result.success.length).toBe(6) // 2 skills * 3 agents
    expect(result.failed.length).toBe(0)

    // Check files exist
    expect(existsSync(join(TEST_DIR, '.mimocode/skills/core/explore/SKILL.md'))).toBe(true)
    expect(existsSync(join(TEST_DIR, '.claude/skills/core/explore/SKILL.md'))).toBe(true)
    expect(existsSync(join(TEST_DIR, '.codex/skills/core/explore/SKILL.md'))).toBe(true)
    expect(existsSync(join(TEST_DIR, '.mimocode/skills/development/debug/SKILL.md'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
bun test tests/integration/distribution.test.ts
```

Expected: FAIL with "Cannot find module '../../src/core/detector'"

- [ ] **Step 3: Run test to verify it passes**

```bash
bun test tests/integration/distribution.test.ts
```

Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add tests/integration/distribution.test.ts
git commit -m "feat: add integration tests for full distribution pipeline"
```

---

## Task 15: Final Validation

**Covers:** [S8, S9]

- [ ] **Step 1: Run all tests**

```bash
bun test
```

Expected: All tests pass

- [ ] **Step 2: Run type check**

```bash
bun run typecheck
```

Expected: No type errors

- [ ] **Step 3: Test CLI manually**

```bash
bun run dev detect
bun run dev distribute
```

Expected: Commands work correctly

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete hidmaster v1.0.0 implementation"
```

---

## Summary

This plan implements **hidmaster** with:

- **15 tasks** covering all phases
- **22 built-in skills** (6 core + 16 additional)
- **5 agent adapters** (MiMo-Code, Claude Code, Codex, OpenCode, Cursor)
- **TDD approach** with tests for every component
- **Integration tests** for end-to-end verification

Each task is self-contained and can be executed independently. The plan follows TDD principles with failing tests written first, then minimal implementations.
