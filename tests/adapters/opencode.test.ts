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
