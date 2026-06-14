// src/core/distributor.ts
import { AgentAdapter, Skill } from '../adapters/base'

export interface DistributionResult {
  success: { adapter: string; skill: string }[]
  failed: { adapter: string; skill: string; error: Error }[]
}

export class SkillDistributor {
  private adapters: AgentAdapter[]

  constructor(adapters: AgentAdapter[]) {
    this.adapters = adapters
  }

  async distributeAll(skills: Skill[]): Promise<DistributionResult> {
    const result: DistributionResult = {
      success: [],
      failed: [],
    }

    for (const adapter of this.adapters) {
      for (const skill of skills) {
        try {
          await adapter.distribute(skill)
          result.success.push({ adapter: adapter.name, skill: skill.name })
        } catch (error) {
          result.failed.push({
            adapter: adapter.name,
            skill: skill.name,
            error: error instanceof Error ? error : new Error(String(error)),
          })
        }
      }
    }

    return result
  }

  async removeAll(skills: Skill[]): Promise<void> {
    for (const adapter of this.adapters) {
      for (const skill of skills) {
        try {
          await adapter.remove(skill)
        } catch {
          // Ignore removal errors
        }
      }
    }
  }
}
