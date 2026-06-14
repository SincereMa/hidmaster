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
    expect(result.agents?.mimocode.enabled).toBe(true)
  })

  it('should use default values for missing fields', () => {
    const config: Config = {
      name: 'test-project',
      version: '1.0.0',
      skills: [],
    }

    const result = parseConfig(config)
    expect(result.agents?.mimocode.enabled).toBe(true)
    expect(result.settings?.auto_sync).toBe(true)
    expect(result.settings?.symlink).toBe(false)
    expect(result.settings?.conflict_resolution).toBe('skip')
  })

  it('should throw on invalid config', () => {
    const config = { name: 123 } // Invalid
    expect(() => parseConfig(config)).toThrow()
  })
})
