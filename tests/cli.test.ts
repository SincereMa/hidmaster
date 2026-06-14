// tests/cli.test.ts
import { describe, it, expect } from 'bun:test'
import { parseArgs, CliOptions } from '../src/cli'

describe('CLI', () => {
  it('should parse setup command', () => {
    const args = ['setup', '--force']
    const options = parseArgs(args)
    expect(options.command).toBe('setup')
    expect(options.force).toBe(true)
  })

  it('should parse detect command', () => {
    const args = ['detect']
    const options = parseArgs(args)
    expect(options.command).toBe('detect')
  })

  it('should parse help command', () => {
    const args = ['help']
    const options = parseArgs(args)
    expect(options.command).toBe('help')
  })

  it('should default to setup command', () => {
    const args: string[] = []
    const options = parseArgs(args)
    expect(options.command).toBe('setup')
  })
})
