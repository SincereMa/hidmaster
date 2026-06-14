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

  it('should have all skill categories', () => {
    const skills = getBuiltInSkills()
    const categories = new Set(skills.map(s => s.category))
    expect(categories.has('core')).toBe(true)
    expect(categories.has('development')).toBe(true)
    expect(categories.has('documentation')).toBe(true)
    expect(categories.has('review')).toBe(true)
    expect(categories.has('planning')).toBe(true)
    expect(categories.has('collaboration')).toBe(true)
  })

  it('should have at least 20 skills', () => {
    const skills = getBuiltInSkills()
    expect(skills.length).toBeGreaterThanOrEqual(20)
  })
})
