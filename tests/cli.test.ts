// tests/cli.test.ts
import { describe, it, expect } from 'bun:test'
import { parseArgs, CliOptions } from '../src/cli'

describe('CLI', () => {
  it('should parse distribute command', () => {
    const args = ['distribute', '--config', 'hidmaster.yaml']
    const options = parseArgs(args)
    expect(options.command).toBe('distribute')
    expect(options.config).toBe('hidmaster.yaml')
  })

  it('should parse detect command', () => {
    const args = ['detect']
    const options = parseArgs(args)
    expect(options.command).toBe('detect')
  })

  it('should parse list command', () => {
    const args = ['list']
    const options = parseArgs(args)
    expect(options.command).toBe('list')
  })

  it('should default to distribute command', () => {
    const args: string[] = []
    const options = parseArgs(args)
    expect(options.command).toBe('distribute')
  })
})
