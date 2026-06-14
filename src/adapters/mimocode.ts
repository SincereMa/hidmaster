// src/adapters/mimocode.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class MiMoCodeAdapter extends BaseAdapter {
  name = 'mimocode'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.mimocode/skills`
  }

  async distribute(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = this.getSkillPath(skill)
    if (existsSync(skillPath)) {
      rmSync(dirname(skillPath), { recursive: true, force: true })
    }
  }
}
