// ═══════════════════════════════════════════════════════════════
// LIVING ENGINE — WhatsApp Sales Converter (Law 13)
// Converts social traction and Amazon KDP readers into high-ticket 
// consulting and cohort enrollments using a zero-pressure, 
// 3rd-grader simple, "Help them win first" conversation architecture.
// ═══════════════════════════════════════════════════════════════
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { logger } from '../lib/logger.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const WHATSAPP_PERSONA = `You are Rume Dominic. You are chatting on WhatsApp with a founder or executive who just downloaded your book or replied 'KYA' to your Amazon KDP viral post.

MANDATORY WHATSAPP ARCHITECTURE (LAW 13):
1. **Law 13 Application:** Help them win first. Appeal strictly to their self-interest. Never pressure sell.
2. **Tone:** Warm, direct, and ultra-simple. 3rd-grader language. No corporate jargon. No long paragraphs. Use simple line breaks.
3. **The 3-Step WhatsApp Flow:**
   - **Step 1 (Delivery):** Deliver what they asked for warmly. "Hey [Name], Rume here. Here is the KYA publishing guide you asked for. Dive in."
   - **Step 2 (Diagnostic Question):** Ask ONE simple, 2nd-grader diagnostic question about their current AI state. "Are you guys building your own AI agents yet, or just playing around with ChatGPT?"
   - **Step 3 (The Risk-Reversed Offer):** Once they reply, offer the £10k-£50k Corporate AI Audit or the Vorem Cohort as the logical next step. "Sounds like you need an auditable system before things break. We do Corporate AI Audits. Let's jump on a quick 15-min call to see if it makes sense. No pressure."

IMPORTANT: You are simulating the conversation. Generate the response for the CURRENT stage of the conversation.`

export async function generateWhatsAppResponse(leadName, conversationHistory, currentStage) {
  logger.info(`[WHATSAPP-CONVERTER] Generating response for ${leadName} at Stage ${currentStage}...`)

  if (!process.env.ANTHROPIC_API_KEY) {
    logger.warn('[WHATSAPP-CONVERTER] No ANTHROPIC_API_KEY found. Generating fallback response.')
    let fallbackText = ''
    if (currentStage.includes('Step 1')) fallbackText = `Hey ${leadName.split(' ')[0]}, Rume here. Here is the £1M KDP publishing guide you asked for. Dive in.`
    else if (currentStage.includes('Step 2')) fallbackText = `Are you guys building your own auditable AI agents yet, or just playing around with ChatGPT?`
    else fallbackText = `Sounds like you need an auditable system before things break. We do Corporate AI Audits. Let's jump on a quick 15-min call to see if it makes sense. No pressure.`
    
    logger.info(`[WHATSAPP-CONVERTER] Generated: ${fallbackText}`)
    return { success: true, message: fallbackText }
  }

  try {
    const msg = await claude.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      temperature: 0.7,
      system: WHATSAPP_PERSONA,
      messages: [
        {
          role: 'user',
          content: `Lead Name: ${leadName}\nCurrent Stage: ${currentStage}\nConversation History: ${conversationHistory}\n\nDraft the exact next WhatsApp message Rume should send.`
        }
      ]
    })

    const responseText = msg.content[0].text
    logger.info(`[WHATSAPP-CONVERTER] Generated: ${responseText}`)
    return { success: true, message: responseText }
  } catch (error) {
    logger.error(`[WHATSAPP-CONVERTER] Generation failed:`, error)
    return { success: false, error: error.message }
  }
}

// Allow CLI execution for testing
if (process.argv[1] && process.argv[1].endsWith('whatsappConverter.js')) {
  if (process.argv.includes('--test')) {
    generateWhatsAppResponse(
      'Alex (CEO of TechFlow)',
      'Lead just opted in via X post for the £1M Amazon KDP guide.',
      'Step 1 (Delivery)'
    ).then(() => {
      console.log('\n--- Simulating Step 2 ---')
      generateWhatsAppResponse(
        'Alex (CEO of TechFlow)',
        'Rume: Hey Alex, Rume here. Here is the KYA publishing guide you asked for. Dive in.\nAlex: Thanks Rume! Looking forward to reading it.',
        'Step 2 (Diagnostic Question)'
      )
    })
  }
}
