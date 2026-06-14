// src/cli.ts
import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { homedir } from 'os'
import { detectAgents, AGENT_MARKERS } from './core/detector'
import * as readline from 'readline'

const HIDMASTER_DIR = join(homedir(), '.hidmaster')

const AGENT_DISPLAY_NAMES: Record<string, string> = {
  'opencode': 'OpenCode',
  'mimocode': 'MiMo-Code',
  'claude-code': 'Claude Code',
  'codex': 'Codex',
}

export interface CliOptions {
  command: string
  force?: boolean
  agent?: string
}

export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    command: 'setup',
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === 'setup' || arg === 'detect' || arg === 'help') {
      options.command = arg
    } else if (arg === '--force' || arg === '-f') {
      options.force = true
    } else if (arg === '--agent' || arg === '-a') {
      options.agent = args[++i]
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

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise(resolve => rl.question(query, ans => {
    rl.close()
    resolve(ans.trim())
  }))
}

async function selectAgents(detectedAgents: string[], cliAgent?: string): Promise<string[]> {
  const allAgents = Object.keys(AGENT_MARKERS)
  const agentList = allAgents.map((name, i) => ({
    name,
    display: AGENT_DISPLAY_NAMES[name] || name,
    detected: detectedAgents.includes(name),
  }))

  if (cliAgent) {
    const selected = cliAgent.toLowerCase()
    if (!allAgents.includes(selected)) {
      console.error(`Unknown agent: ${selected}`)
      console.error(`Supported agents: ${allAgents.join(', ')}`)
      process.exit(1)
    }
    return [selected]
  }

  if (detectedAgents.length > 0) {
    console.log('Detected agents:')
    for (const agent of agentList) {
      if (agent.detected) {
        console.log(`  ✓ ${agent.display} (${AGENT_MARKERS[agent.name]})`)
      }
    }
    console.log('')

    const answer = await askQuestion('Install skills to detected agents? [Y/n] ')
    if (answer === '' || answer.toLowerCase() === 'y') {
      return detectedAgents
    }
  }

  console.log('\nSelect agents to install skills to:\n')
  for (let i = 0; i < agentList.length; i++) {
    const agent = agentList[i]
    const marker = agent.detected ? ' (detected)' : ''
    console.log(`  ${i + 1}. ${agent.display} [${AGENT_MARKERS[agent.name]}]${marker}`)
  }
  console.log(`  a. All agents`)
  console.log('')

  const answer = await askQuestion('Enter numbers separated by commas (e.g. 1,2) or "a" for all: ')

  if (answer.toLowerCase() === 'a') {
    return allAgents
  }

  const selected: string[] = []
  for (const num of answer.split(',')) {
    const idx = parseInt(num.trim()) - 1
    if (idx >= 0 && idx < agentList.length) {
      selected.push(agentList[idx].name)
    }
  }

  if (selected.length === 0) {
    console.error('No valid agents selected.')
    process.exit(1)
  }

  return selected
}

function getAgentDirs(agentName: string): { skills: string; instructions: string } | null {
  const map: Record<string, { skills: string; instructions: string }> = {
    'opencode': { skills: '.opencode/skills', instructions: '.opencode/AGENTS.md' },
    'mimocode': { skills: '.mimocode/skills', instructions: '.mimocode/AGENTS.md' },
    'claude-code': { skills: '.claude/skills', instructions: 'CLAUDE.md' },
    'codex': { skills: '.codex/skills', instructions: 'AGENTS.md' },
  }
  return map[agentName] || null
}

function getInstructionFile(agentName: string): string {
  const map: Record<string, string> = {
    'opencode': 'opencode.md',
    'mimocode': 'mimocode.md',
    'claude-code': 'claude.md',
    'codex': 'codex.md',
  }
  return map[agentName] || 'opencode.md'
}

async function setup(projectRoot: string, force: boolean = false, cliAgent?: string) {
  console.log('\nhidmaster - AI Agent Workflow Enhancer\n')

  if (!existsSync(HIDMASTER_DIR)) {
    console.error('Error: hidmaster not installed. Run install.sh first.')
    process.exit(1)
  }

  if (!existsSync(join(HIDMASTER_DIR, 'skills')) || !existsSync(join(HIDMASTER_DIR, 'instructions'))) {
    console.error('Error: hidmaster skills or instructions not found.')
    console.error('Try reinstalling: bash install.sh')
    process.exit(1)
  }

  const detected = await detectAgents(projectRoot)
  const detectedNames = detected.map(a => a.name)

  const selectedAgents = await selectAgents(detectedNames, cliAgent)

  console.log('')
  for (const agentName of selectedAgents) {
    const dirs = getAgentDirs(agentName)
    if (!dirs) {
      console.log(`Skipping ${agentName} (unknown agent)`)
      continue
    }

    const agentBaseDir = join(projectRoot, dirname(dirs.skills))
    const skillsDir = join(projectRoot, dirs.skills)
    const instructionsPath = join(projectRoot, dirs.instructions)

    const displayName = AGENT_DISPLAY_NAMES[agentName] || agentName
    console.log(`Setting up ${displayName}...`)

    const srcSkillsDir = join(HIDMASTER_DIR, 'skills')
    if (existsSync(srcSkillsDir)) {
      copyDirSync(srcSkillsDir, skillsDir)
      console.log(`  Skills  → ${dirs.skills}`)
    }

    const srcInstruction = join(HIDMASTER_DIR, 'instructions', getInstructionFile(agentName))
    if (existsSync(srcInstruction)) {
      mkdirSync(dirname(instructionsPath), { recursive: true })
      copyFileSync(srcInstruction, instructionsPath)
      console.log(`  Instructions  → ${dirs.instructions}`)
    }

    console.log(`  Done\n`)
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
    console.log('No agents detected in this project.')
    console.log('')
    console.log('Supported agents:')
    for (const [name, marker] of Object.entries(AGENT_MARKERS)) {
      console.log(`  - ${AGENT_DISPLAY_NAMES[name] || name} [${marker}]`)
    }
    console.log('')
    console.log('Run "hidmaster" to install skills (you can choose an agent).')
  } else {
    console.log('Detected agents:')
    for (const agent of agents) {
      console.log(`  ✓ ${AGENT_DISPLAY_NAMES[agent.name] || agent.name} [${AGENT_MARKERS[agent.name]}]`)
    }
  }

  console.log('')
}

function showHelp() {
  console.log(`
hidmaster - AI Agent Workflow Enhancer

Usage:
  hidmaster [command] [options]

Commands:
  setup     Install skills and instructions (default)
  detect    Detect installed agents
  help      Show this help message

Options:
  --agent, -a <name>   Specify agent (opencode, mimocode, claude-code, codex)
  --force, -f          Force reinstall even if already configured

Examples:
  hidmaster                    # Interactive agent selection
  hidmaster --agent opencode   # Install for OpenCode directly
  hidmaster detect             # Check which agents are installed
  hidmaster setup -f           # Force reinstall
`)
}

export async function main() {
  const args = process.argv.slice(2)
  const options = parseArgs(args)
  const projectRoot = process.cwd()

  switch (options.command) {
    case 'setup':
      await setup(projectRoot, options.force, options.agent)
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
