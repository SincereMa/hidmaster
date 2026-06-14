// src/adapters/cursor.ts
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs'
import { dirname } from 'path'
import { BaseAdapter, Skill } from './base'

export class CursorAdapter extends BaseAdapter {
  name = 'cursor'
  skillsDir: string

  constructor(projectRoot: string) {
    super()
    this.skillsDir = `${projectRoot}/.cursor/rules`
  }

  async distribute(skill: Skill): Promise<void> {
    // Cursor uses .mdc format
    const skillPath = `${this.skillsDir}/${skill.name}.mdc`
    mkdirSync(dirname(skillPath), { recursive: true })
    writeFileSync(skillPath, skill.content, 'utf-8')
  }

  async remove(skill: Skill): Promise<void> {
    const skillPath = `${this.skillsDir}/${skill.name}.mdc`
    if (existsSync(skillPath)) {
      rmSync(skillPath, { force: true })
    }
  }
}
