// tests/adapters/claude.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { ClaudeAdapter } from '../../src/adapters/claude'
import { Skill } from '../../src/adapters/base'
import { mkdirSync, rmSync, existsSync } from 'fs'
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
