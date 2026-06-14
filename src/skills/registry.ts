// src/skills/registry.ts
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { Skill } from '../adapters/base'

export interface SkillInfo extends Skill {
  version?: string
  agents?: string[]
  tools?: string[]
}

function parseSkillFile(filePath: string): SkillInfo | null {
  try {
    const content = readFileSync(filePath, 'utf-8')
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)

    if (!frontmatterMatch) return null

    const [, frontmatter] = frontmatterMatch
    const metadata: Record<string, unknown> = {}

    for (const line of frontmatter.split('\n')) {
      const [key, ...valueParts] = line.split(':')
      if (key && valueParts.length > 0) {
        metadata[key.trim()] = valueParts.join(':').trim()
      }
    }

    // Parse category from path
    const pathParts = filePath.split('/')
    const categoryIndex = pathParts.findIndex(p => p === 'skills') + 1
    const category = pathParts[categoryIndex] || 'unknown'

    return {
      name: metadata.name as string,
      description: metadata.description as string,
      category,
      content,
      filePath,
      version: metadata.version as string | undefined,
    }
  } catch {
    return null
  }
}

function scanSkillsDir(dir: string): SkillInfo[] {
  const skills: SkillInfo[] = []

  try {
    const entries = readdirSync(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        // Recurse into subdirectories
        skills.push(...scanSkillsDir(fullPath))
      } else if (entry === 'SKILL.md') {
        // Parse SKILL.md files
        const skill = parseSkillFile(fullPath)
        if (skill) skills.push(skill)
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }

  return skills
}

export function getBuiltInSkills(): SkillInfo[] {
  // Use process.cwd() which is the project root when running tests
  const skillsDir = join(process.cwd(), 'skills')
  return scanSkillsDir(skillsDir)
}

export class SkillRegistry {
  private skills: Map<string, SkillInfo> = new Map()

  constructor() {
    const builtIn = getBuiltInSkills()
    for (const skill of builtIn) {
      this.skills.set(skill.name, skill)
    }
  }

  get(name: string): SkillInfo | undefined {
    return this.skills.get(name)
  }

  getAll(): SkillInfo[] {
    return Array.from(this.skills.values())
  }

  getByCategory(category: string): SkillInfo[] {
    return this.getAll().filter(s => s.category === category)
  }
}
