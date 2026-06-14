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
