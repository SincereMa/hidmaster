// src/adapters/base.ts
export interface Skill {
  name: string
  description: string
  category: string
  content: string
  filePath: string
}

export interface AgentAdapter {
  name: string
  skillsDir: string
  distribute(skill: Skill): Promise<void>
  remove(skill: Skill): Promise<void>
}

export abstract class BaseAdapter implements AgentAdapter {
  abstract name: string
  abstract skillsDir: string

  abstract distribute(skill: Skill): Promise<void>
  abstract remove(skill: Skill): Promise<void>

  protected getSkillPath(skill: Skill): string {
    const dir = skill.category ? `${skill.category}/${skill.name}` : skill.name
    return `${this.skillsDir}/${dir}/SKILL.md`
  }
}
