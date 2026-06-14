// src/core/config.ts
import yaml from 'js-yaml'
import { readFileSync } from 'fs'

export interface SkillSource {
  path?: string
  url?: string
}

export interface AgentConfig {
  enabled: boolean
}

export interface Settings {
  auto_sync: boolean
  symlink: boolean
  conflict_resolution: 'skip' | 'overwrite' | 'rename'
}

export interface Config {
  name: string
  version: string
  skills: SkillSource[]
  agents?: Record<string, AgentConfig>
  settings?: Partial<Settings>
}

const DEFAULT_AGENTS: Record<string, AgentConfig> = {
  mimocode: { enabled: true },
  'claude-code': { enabled: true },
  codex: { enabled: true },
  opencode: { enabled: false },
  cursor: { enabled: false },
}

const DEFAULT_SETTINGS: Settings = {
  auto_sync: true,
  symlink: false,
  conflict_resolution: 'skip',
}

export function parseConfig(raw: unknown): Config {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Invalid config: must be an object')
  }

  const data = raw as Record<string, unknown>

  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid config: name is required and must be a string')
  }

  if (!data.version || typeof data.version !== 'string') {
    throw new Error('Invalid config: version is required and must be a string')
  }

  if (!Array.isArray(data.skills)) {
    throw new Error('Invalid config: skills must be an array')
  }

  return {
    name: data.name as string,
    version: data.version as string,
    skills: data.skills as SkillSource[],
    agents: { ...DEFAULT_AGENTS, ...(data.agents as Record<string, AgentConfig> | undefined) },
    settings: { ...DEFAULT_SETTINGS, ...(data.settings as Partial<Settings> | undefined) },
  }
}

export function loadConfig(configPath: string): Config {
  const content = readFileSync(configPath, 'utf-8')
  const raw = yaml.load(content)
  return parseConfig(raw)
}
