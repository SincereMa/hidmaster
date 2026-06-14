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

  it('should have all 6 core skills', () => {
    const skills = getBuiltInSkills()
    expect(skills.length).toBe(6)
  })
})
