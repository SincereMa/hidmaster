// tests/core/distributor.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { SkillDistributor } from '../../src/core/distributor'
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
