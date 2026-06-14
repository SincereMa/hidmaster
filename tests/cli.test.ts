// tests/cli.test.ts
import { describe, it, expect } from 'bun:test'
import { parseArgs } from '../src/cli'

describe('CLI', () => {
  it('should parse setup command', () => {
    const options = parseArgs(['setup', '--force'])
    expect(options.command).toBe('setup')
    expect(options.force).toBe(true)
  })

  it('should parse detect command', () => {
    const options = parseArgs(['detect'])
    expect(options.command).toBe('detect')
  })

  it('should parse help command', () => {
    const options = parseArgs(['help'])
    expect(options.command).toBe('help')
  })

  it('should default to setup command', () => {
    const options = parseArgs([])
    expect(options.command).toBe('setup')
  })

  it('should parse --agent flag', () => {
    const options = parseArgs(['--agent', 'opencode'])
    expect(options.command).toBe('setup')
    expect(options.agent).toBe('opencode')
  })

  it('should parse -a shorthand', () => {
    const options = parseArgs(['-a', 'claude-code'])
    expect(options.agent).toBe('claude-code')
  })

  it('should parse agent with force', () => {
    const options = parseArgs(['--agent', 'mimocode', '--force'])
    expect(options.agent).toBe('mimocode')
    expect(options.force).toBe(true)
  })
})
