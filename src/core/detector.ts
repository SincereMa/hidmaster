// src/core/detector.ts
import { existsSync } from 'fs'
import { join } from 'path'

export interface AgentInfo {
  name: string
  detected: boolean
  configDir: string
}

export const AGENT_MARKERS: Record<string, string> = {
  mimocode: '.mimocode',
  'claude-code': '.claude',
  codex: '.codex',
  opencode: '.opencode',
}

export async function detectAgents(directory: string): Promise<AgentInfo[]> {
  const agents: AgentInfo[] = []

  for (const [name, marker] of Object.entries(AGENT_MARKERS)) {
    const markerPath = join(directory, marker)
    if (existsSync(markerPath)) {
      agents.push({
        name,
        detected: true,
        configDir: markerPath,
      })
    }
  }

  return agents
}

export function getAgentMarker(agentName: string): string | undefined {
  return AGENT_MARKERS[agentName]
}
