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
