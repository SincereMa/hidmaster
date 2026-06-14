// src/cli.ts
import { loadConfig, Config } from './core/config'
import { detectAgents, AgentInfo } from './core/detector'
import { SkillDistributor, DistributionResult } from './core/distributor'
import { MiMoCodeAdapter } from './adapters/mimocode'
import { ClaudeAdapter } from './adapters/claude'
import { CodexAdapter } from './adapters/codex'
import { OpenCodeAdapter } from './adapters/opencode'
import { CursorAdapter } from './adapters/cursor'
import { AgentAdapter, Skill } from './adapters/base'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

export interface CliOptions {
  command: string
  config?: string
  verbose?: boolean
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    command: 'distribute',
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === 'distribute' || arg === 'detect' || arg === 'list') {
      options.command = arg
    } else if (arg === '--config' && args[i + 1]) {
      options.config = args[++i]
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true
    }
  }

  return options
}

function createAdapters(config: Config, projectRoot: string): AgentAdapter[] {
  const adapters: AgentAdapter[] = []

  if (config.agents?.mimocode?.enabled) {
    adapters.push(new MiMoCodeAdapter(projectRoot))
  }
  if (config.agents?.['claude-code']?.enabled) {
    adapters.push(new ClaudeAdapter(projectRoot))
  }
  if (config.agents?.codex?.enabled) {
    adapters.push(new CodexAdapter(projectRoot))
  }
  if (config.agents?.opencode?.enabled) {
    adapters.push(new OpenCodeAdapter(projectRoot))
  }
  if (config.agents?.cursor?.enabled) {
    adapters.push(new CursorAdapter(projectRoot))
  }

  return adapters
}

function loadSkillsFromPath(skillPath: string): Skill[] {
  const skills: Skill[] = []

  try {
    const stat = statSync(skillPath)
    if (stat.isDirectory()) {
      const entries = readdirSync(skillPath)
      for (const entry of entries) {
        skills.push(...loadSkillsFromPath(join(skillPath, entry)))
      }
    } else if (skillPath.endsWith('SKILL.md')) {
      const content = readFileSync(skillPath, 'utf-8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)

      if (frontmatterMatch) {
        const [, frontmatter] = frontmatterMatch
        const metadata: Record<string, string> = {}

        for (const line of frontmatter.split('\n')) {
          const [key, ...valueParts] = line.split(':')
          if (key && valueParts.length > 0) {
            metadata[key.trim()] = valueParts.join(':').trim()
          }
        }

        if (metadata.name) {
          skills.push({
            name: metadata.name,
            description: metadata.description || '',
            category: 'custom',
            content,
            filePath: skillPath,
          })
        }
      }
    }
  } catch {
    // Path doesn't exist
  }

  return skills
}

async function distribute(configPath: string, projectRoot: string): Promise<void> {
  const config = loadConfig(configPath)
  const agents = await detectAgents(projectRoot)

  console.log(`\nhidmaster - Distributing skills for: ${config.name}\n`)

  console.log('Detected agents:')
  for (const agent of agents) {
    console.log(`  ✓ ${agent.name}`)
  }
  console.log('')

  const adapters = createAdapters(config, projectRoot)
  const distributor = new SkillDistributor(adapters)

  // Load skills from configured paths
  const allSkills: Skill[] = []
  for (const source of config.skills) {
    if (source.path) {
      const fullPath = resolve(projectRoot, source.path)
      allSkills.push(...loadSkillsFromPath(fullPath))
    }
  }

  console.log(`Distributing ${allSkills.length} skills to ${adapters.length} agents...\n`)

  const result = await distributor.distributeAll(allSkills)

  console.log('Results:')
  console.log(`  ✓ Success: ${result.success.length}`)
  console.log(`  ✗ Failed: ${result.failed.length}`)

  if (result.failed.length > 0) {
    console.log('\nFailed distributions:')
    for (const failure of result.failed) {
      console.log(`  - ${failure.skill} to ${failure.adapter}: ${failure.error.message}`)
    }
  }

  console.log('\nDone!')
}

async function detect(projectRoot: string): Promise<void> {
  const agents = await detectAgents(projectRoot)

  console.log('\nhidmaster - Agent Detection\n')

  if (agents.length === 0) {
    console.log('No agents detected in current directory.')
    console.log('\nSupported agents:')
    console.log('  - MiMo-Code (.mimocode)')
    console.log('  - Claude Code (.claude)')
    console.log('  - Codex (.codex)')
    console.log('  - OpenCode (.opencode)')
    console.log('  - Cursor (.cursor)')
  } else {
    console.log('Detected agents:')
    for (const agent of agents) {
      console.log(`  ✓ ${agent.name} (${agent.configDir})`)
    }
  }

  console.log('')
}

export async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const options = parseArgs(args)

  const projectRoot = process.cwd()
  const configPath = options.config || join(projectRoot, 'hidmaster.yaml')

  try {
    switch (options.command) {
      case 'distribute':
        await distribute(configPath, projectRoot)
        break
      case 'detect':
        await detect(projectRoot)
        break
      case 'list':
        console.log('List command not yet implemented')
        break
      default:
        console.log(`Unknown command: ${options.command}`)
        process.exit(1)
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}
