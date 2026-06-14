// src/cli.ts
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { homedir } from 'os'
import { detectAgents } from './core/detector'

const HIDMASTER_DIR = join(homedir(), '.hidmaster')

export interface CliOptions {
  command: string
  force?: boolean
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    command: 'setup',
  }

  for (const arg of args) {
    if (arg === 'setup' || arg === 'detect' || arg === 'help') {
      options.command = arg
    } else if (arg === '--force' || arg === '-f') {
      options.force = true
    }
  }

  return options
}

function copyDirSync(src: string, dest: string) {
  mkdirSync(dest, { recursive: true })
  const entries = readdirSync(src)
  for (const entry of entries) {
    const srcPath = join(src, entry)
    const destPath = join(dest, entry)
    const stat = statSync(srcPath)
    if (stat.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      copyFileSync(srcPath, destPath)
    }
  }
}

async function setup(projectRoot: string, force: boolean = false) {
  console.log('\nhidmaster - Setting up workflow skills\n')

  // Check if hidmaster is installed
  if (!existsSync(HIDMASTER_DIR)) {
    console.error('Error: hidmaster not installed. Run install.sh first.')
    process.exit(1)
  }

  // Detect agents
  const agents = await detectAgents(projectRoot)

  if (agents.length === 0) {
    console.log('No agents detected. Creating .opencode directory...')
    mkdirSync(join(projectRoot, '.opencode'), { recursive: true })
    agents.push({ name: 'opencode', detected: true, configDir: join(projectRoot, '.opencode') })
  }

  console.log('Detected agents:')
  for (const agent of agents) {
    console.log(`  ✓ ${agent.name}`)
  }
  console.log('')

  // Agent directory mapping
  const agentDirs: Record<string, { skills: string; instructions: string }> = {
    'opencode': { skills: '.opencode/skills', instructions: '.opencode/AGENTS.md' },
    'mimocode': { skills: '.mimocode/skills', instructions: '.mimocode/AGENTS.md' },
    'claude-code': { skills: '.claude/skills', instructions: 'CLAUDE.md' },
    'codex': { skills: '.codex/skills', instructions: 'AGENTS.md' },
    'cursor': { skills: '.cursor/rules', instructions: '.cursor/AGENTS.md' },
  }

  // Copy skills and instructions to each agent
  for (const agent of agents) {
    const dirs = agentDirs[agent.name]
    if (!dirs) {
      console.log(`  Skipping ${agent.name} (no mapping configured)`)
      continue
    }

    const agentBaseDir = dirname(agent.configDir)
    const skillsDir = join(agentBaseDir, dirs.skills)
    const instructionsPath = join(agentBaseDir, dirs.instructions)

    // Copy skills
    console.log(`Installing skills to ${dirs.skills}...`)
    const srcSkillsDir = join(HIDMASTER_DIR, 'skills')
    if (existsSync(srcSkillsDir)) {
      copyDirSync(srcSkillsDir, skillsDir)
      console.log(`  ✓ Skills copied`)
    }

    // Copy instructions
    console.log(`Installing instructions to ${dirs.instructions}...`)
    const instructionsDir = join(HIDMASTER_DIR, 'instructions')
    let instructionFile = 'opencode.md'
    if (agent.name === 'mimocode') instructionFile = 'mimocode.md'
    else if (agent.name === 'claude-code') instructionFile = 'claude.md'
    else if (agent.name === 'codex') instructionFile = 'codex.md'

    const srcInstruction = join(instructionsDir, instructionFile)
    if (existsSync(srcInstruction)) {
      mkdirSync(dirname(instructionsPath), { recursive: true })
      copyFileSync(srcInstruction, instructionsPath)
      console.log(`  ✓ Instructions copied`)
    }

    console.log(`  ✓ ${agent.name} configured\n`)
  }

  console.log('Setup complete!')
  console.log('')
  console.log('Your agent now has:')
  console.log('  - 22 production-ready skills')
  console.log('  - Auto-orchestration instructions')
  console.log('')
  console.log('Just start coding - your agent will automatically:')
  console.log('  - Use the right skills for each task')
  console.log('  - Orchestrate multi-step workflows')
  console.log('  - Produce high-quality results')
}

async function detect(projectRoot: string) {
  const agents = await detectAgents(projectRoot)

  console.log('\nhidmaster - Agent Detection\n')

  if (agents.length === 0) {
    console.log('No agents detected.')
    console.log('\nSupported agents:')
    console.log('  - OpenCode (.opencode)')
    console.log('  - MiMo-Code (.mimocode)')
    console.log('  - Claude Code (.claude)')
    console.log('  - Codex (.codex)')
  } else {
    console.log('Detected agents:')
    for (const agent of agents) {
      console.log(`  ✓ ${agent.name}`)
    }
  }

  console.log('')
}

function showHelp() {
  console.log(`
hidmaster - AI Agent Workflow Enhancer

Usage:
  hidmaster [command]

Commands:
  setup     Install skills and instructions (default)
  detect    Detect installed agents
  help      Show this help message

Options:
  --force   Force reinstall even if already configured

Examples:
  hidmaster           # Setup skills for detected agents
  hidmaster detect    # Check which agents are installed
  hidmaster setup -f  # Force reinstall
`)
}

export async function main() {
  const args = process.argv.slice(2)
  const options = parseArgs(args)
  const projectRoot = process.cwd()

  switch (options.command) {
    case 'setup':
      await setup(projectRoot, options.force)
      break
    case 'detect':
      await detect(projectRoot)
      break
    case 'help':
      showHelp()
      break
    default:
      console.error(`Unknown command: ${options.command}`)
      showHelp()
      process.exit(1)
  }
}
