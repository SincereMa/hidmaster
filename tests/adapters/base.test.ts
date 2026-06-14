// tests/adapters/base.test.ts
import { describe, it, expect } from 'bun:test'
import { AgentAdapter, Skill } from '../../src/adapters/base'

describe('Base Adapter Interface', () => {
  it('should define correct interface', () => {
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
