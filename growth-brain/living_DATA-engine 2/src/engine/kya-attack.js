#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════
// KYA METHOD: STEP 2 - ATTACK
// "Try to break it before you build it."
// Runs a file/plan against the 5 KYA hats to find hidden risks.
// ═══════════════════════════════════════════════════════════════

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import Anthropic from '@anthropic-ai/sdk'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const HATS = [
  { name: 'The Planner', prompt: 'Is the shape right? Are the stages in the right order? Is anything missing from this design/plan?' },
  { name: 'The Builder', prompt: 'Can it be built? Can it actually be made with standard tools and reasonable time? Are there over-engineered parts?' },
  { name: 'The Thief', prompt: 'How do I steal from it? How do I steal data, trick the AI, or misuse this system?' },
  { name: 'The Firefighter', prompt: 'What burns at 3 AM? What fails first under real load, and how would anyone know it broke?' },
  { name: 'The Doubter', prompt: 'What are we assuming? What is taken for granted that might not actually be true in reality?' }
]

async function runHat(hat, content) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      // Mock response for demo purposes when API key is not set
      await new Promise(r => setTimeout(r, 500))
      return { name: hat.name, critique: `(MOCK) Found potential weakness: Ensure this design handles edge cases robustly.` }
    }
    const msg = await claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      system: `You are '${hat.name}'. Your only job is to aggressively but logically attack the provided plan based on your persona. Be extremely concise. Focus ONLY on weaknesses. Do NOT offer compliments.\n\nYour mandate: ${hat.prompt}`,
      messages: [{ role: 'user', content: content }],
    })
    return { name: hat.name, critique: msg.content[0].text }
  } catch (err) {
    return { name: hat.name, critique: `Error: ${err.message}` }
  }
}

async function attackPlan() {
  const targetFile = process.argv[2]
  if (!targetFile) {
    console.error('❌ Error: Please provide a file to attack. (e.g. node kya-attack.js my-plan.md)')
    process.exit(1)
  }

  const filePath = path.resolve(process.cwd(), targetFile)
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`)
    process.exit(1)
  }

  console.log(`\n⚔️  KYA ATTACK INITIATED on: ${targetFile}`)
  console.log('Summoning the 5 hats to break your design...\n')

  const content = fs.readFileSync(filePath, 'utf-8')
  
  // Run hats in parallel for speed
  const results = await Promise.all(HATS.map(hat => runHat(hat, content)))

  for (const res of results) {
    console.log(`\n🎩 [${res.name.toUpperCase()}]`)
    console.log(res.critique)
    console.log('--------------------------------------------------')
  }

  console.log('\n✅ ATTACK COMPLETE.')
  console.log('Review the disagreements above. Fix them on paper before you write code.')
}

attackPlan().catch(console.error)
