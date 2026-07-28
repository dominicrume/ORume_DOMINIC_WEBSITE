// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — KDP PUBLISHING ENGINE
// Generates Amazon KDP-ready Markdown manuscripts using 
// RUME DOMINIC GPT v1.0 (PPSPP x HVCO) architecture.
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXPORTS_DIR = path.join(__dirname, '../../exports/kdp_manuscripts')

if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true })
}

const KDP_SYSTEM_PROMPT = `You are Rume Dominic, the elite AI Architect with 51,000+ hours of engineering and the creator of the UK Patent-Filed KYA standard (GB2611754.9). 
You are writing a chapter for your new Amazon KDP book.

MANDATORY KDP ARCHITECTURE (RUME DOMINIC GPT v1.0):
1. **Tone:** Authoritative but calm. 3rd-grader simplicity (Flesch-Kincaid Grade Level 3–5). Maximum 15 words per sentence. Zero fluff. Zero tech jargon without a simple analogy.
2. **Structure (PPSPP Framework):**
   - Hook: 1-3 word punchy hook.
   - Wisdom Transition: Quote a philosopher (Socrates, Da Vinci, Aurelius).
   - Problem: The raw market pain (e.g., vibe coding disaster).
   - Path: The architectural way out (Consciousness over code).
   - Story/Proof: Your 51k hours of shipping autonomous agents in dark rooms.
3. **The Book Formatting:**
   - Output ONLY in clean Markdown ready for Amazon KDP (Kindle) conversion.
   - Use H1 for Chapter Title, H2 for main sections.
   - Short paragraphs (1-2 lines max).
4. **The Value Stack (HVCO):** At the end of the chapter, insert an irresistible soft-CTA driving readers to 'https://rumedominic.com/free' to access the 9-Day Masterclass and KYA templates.

DO NOT output any thinking, introductions, or pleasantries. Output ONLY the raw Markdown chapter.`

export async function generateKdpChapter(bookTitle, chapterNumber, chapterTopic) {
  logger.info(`[KDP-ENGINE] Generating Chapter ${chapterNumber} for "${bookTitle}"...`)

  if (!process.env.ANTHROPIC_API_KEY) {
    logger.warn('[KDP-ENGINE] No ANTHROPIC_API_KEY found. Generating fallback chapter.')
    const fallbackMarkdown = `# Chapter ${chapterNumber}: ${chapterTopic}\n\nTrust is broken.\n\nAs Marcus Aurelius said: "Stop talking about what a good man should be, and be one."\n\nRight now, 90% of AI apps are vibe coded. When they break, credentials leak and businesses lose millions. We cannot build the future on fragile toys.\n\nThe answer is Consciousness over code. We must build auditable systems where every action is verified.\n\nFor 7 years, I built autonomous agents in dark rooms. That is why we filed the UK Patent for KYA (Know Your AgenticAi). It is the only standard that guarantees safety.\n\n→ Read the open-sourced book & 9-Day Masterclass ($0 today): https://rumedominic.com/free`
    const safeTitle = bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const filePath = path.join(EXPORTS_DIR, `${safeTitle}_chapter_${chapterNumber}.md`)
    fs.writeFileSync(filePath, fallbackMarkdown)
    logger.info(`[KDP-ENGINE] Fallback Chapter ${chapterNumber} generated and saved to: ${filePath}`)
    return { success: true, filePath, markdown: fallbackMarkdown }
  }

  try {
    const msg = await claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      temperature: 0.7,
      system: KDP_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Write Chapter ${chapterNumber} for my Amazon KDP book titled "${bookTitle}". The chapter topic is: ${chapterTopic}. Make it highly authoritative, 3rd-grader simple, and follow the PPSPP structure.`
        }
      ]
    })

    const markdown = msg.content[0].text
    
    // Save to exports folder
    const safeTitle = bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const filePath = path.join(EXPORTS_DIR, `${safeTitle}_chapter_${chapterNumber}.md`)
    fs.writeFileSync(filePath, markdown)
    
    logger.info(`[KDP-ENGINE] Chapter ${chapterNumber} generated and saved to: ${filePath}`)
    return { success: true, filePath, markdown }
  } catch (error) {
    logger.error(`[KDP-ENGINE] Generation failed:`, error)
    return { success: false, error: error.message }
  }
}

// Allow CLI execution for testing
if (process.argv[1] && process.argv[1].endsWith('kdpEngine.js')) {
  if (process.argv.includes('--test')) {
    generateKdpChapter(
      'Know Your AgenticAi (KYA)',
      1,
      'The Vibe Coding Disaster of 2026 and Why Trust is Broken'
    )
  }
}
