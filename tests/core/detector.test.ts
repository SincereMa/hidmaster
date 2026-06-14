// tests/core/detector.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'bun:test'
import { detectAgents, AgentInfo } from '../../src/core/detector'
import { mkdirSync, rmSync } from 'fs'
import { join } from 'path'

const TEST_DIR = join(import.meta.dir, '../tmp')

describe('Agent Detector', () => {
  beforeEach(() => {
    mkdirSync(TEST_DIR, { recursive: true })
  })

  afterEach(() => {
    rmSync(TEST_DIR, { recursive: true, force: true })
  })

  it('should detect MiMo-Code when .mimocode exists', async () => {
    mkdirSync(join(TEST_DIR, '.mimocode'), { recursive: true })
    const agents = await detectAgents(TEST_DIR)
    expect(agents.some(a => a.name === 'mimocode')).toBe(true)
  })

  it('should detect Claude Code when .claude exists', async () => {
    mkdirSync(join(TEST_DIR, '.claude'), { recursive: true })
    const agents = await detectAgents(TEST_DIR)
    expect(agents.some(a => a.name === 'claude-code')).toBe(true)
  })

  it('should detect multiple agents', async () => {
    mkdirSync(join(TEST_DIR, '.mimocode'), { recursive: true })
    mkdirSync(join(TEST_DIR, '.codex'), { recursive: true })
    const agents = await detectAgents(TEST_DIR)
    expect(agents.length).toBe(2)
  })

  it('should return empty array when no agents detected', async () => {
    const agents = await detectAgents(TEST_DIR)
    expect(agents).toHaveLength(0)
  })
})
