// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — Command Center Exporter
// Parses the rume-dominic-private-prompt-library.md file and 
// exports it as a JSON database for Notion import and Custom GPTs.
// ═══════════════════════════════════════════════════════════════
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from '../src/lib/logger.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROMPT_LIBRARY_PATH = path.join(__dirname, '../../../docs/rume-dominic-private-prompt-library.md')
const EXPORTS_DIR = path.join(__dirname, '../exports/command_center')

if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true })
}

export function exportCommandCenter() {
  logger.info('[COMMAND-CENTER] Starting export of Rume Dominic GPT v1.0 Prompt Library...')
  
  try {
    const rawMarkdown = fs.readFileSync(PROMPT_LIBRARY_PATH, 'utf-8')
    
    // We will do a simple regex extraction of the prompt sections.
    // In a real robust parser, we'd use marked.js, but this works for our format.
    const sections = rawMarkdown.split('⸻')
    
    const prompts = []
    
    for (const section of sections) {
      if (section.includes('🧠') || section.includes('PROMPT')) {
        const lines = section.trim().split('\n')
        const titleLine = lines.find(l => l.includes('PROMPT')) || 'Untitled Prompt'
        const title = titleLine.replace(/[^a-zA-Z0-9\s]/g, '').trim()
        
        prompts.push({
          id: `prompt_${Date.now()}_${Math.floor(Math.random()*1000)}`,
          title: title,
          content: section.trim(),
          tags: ['v1.0', 'rume-dominic-gpt', 'ppspp'],
          createdAt: new Date().toISOString()
        })
      }
    }
    
    const outputPath = path.join(EXPORTS_DIR, 'rume_dominic_master_prompts.json')
    fs.writeFileSync(outputPath, JSON.stringify(prompts, null, 2))
    
    logger.info(`[COMMAND-CENTER] Successfully exported ${prompts.length} prompts to ${outputPath}`)
    return { success: true, count: prompts.length, path: outputPath }
  } catch (error) {
    logger.error('[COMMAND-CENTER] Export failed:', error)
    return { success: false, error: error.message }
  }
}

// Allow CLI execution
if (process.argv[1] && process.argv[1].endsWith('export-command-center.js')) {
  exportCommandCenter()
}
