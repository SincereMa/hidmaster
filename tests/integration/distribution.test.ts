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
