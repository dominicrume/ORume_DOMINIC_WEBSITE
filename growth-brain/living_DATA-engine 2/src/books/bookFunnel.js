// LIVING ENGINE — Book Funnel · Rume Dominic's 5 books → email list → revenue
import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { DB } from '../lib/db.js'
import { logger } from '../lib/logger.js'
import { delay } from '../lib/rateLimiter.js'

const claude = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const AUTHOR = process.env.BOOK_AUTHOR_NAME || 'Rume Dominic'
const OPTIN  = process.env.BOOK_OPTIN_URL   || 'https://vorem.co/free'

export const BOOKS = [
  { id:'b1', title:'AI for African Entrepreneurs',    magnet:'50 AI Tools for African Businesses',    upsell:'Vorem AI Foundations Course — £97',       url:`${OPTIN}/ai-course`  },
  { id:'b2', title:'Blockchain Beyond Bitcoin',        magnet:'Web3 Business Glossary (150 terms)',    upsell:'Blockchain for Business Workshop — £197', url:`${OPTIN}/web3`       },
  { id:'b3', title:"The Entrepreneur's AI Playbook",  magnet:'90-Day AI Business Blueprint PDF',      upsell:'Vorem 90-Day Cohort — £497',              url:`${OPTIN}/cohort`     },
  { id:'b4', title:'Decoding Web3 Leadership',        magnet:'Leadership in Digital Age Assessment',  upsell:'Executive Coaching 6 sessions — £2,400', url:`${OPTIN}/coaching`   },
  { id:'b5', title:'The African Digital Revolution',  magnet:'African Digital Economy Report 2025',   upsell:'Keynote Speaking — £5,000+',              url:`${OPTIN}/speaking`   },
]

const STEP_INTENTS = [
  'welcome + deliver lead magnet warmly',
  'share one insight they probably missed in the book — open a curiosity loop',
  'tell a real transformation story from a student or client',
  'pitch the paid course/workshop with a specific before/after outcome',
  'introduce consulting or speaking — bigger transformation available',
  'preview next book or community/mastermind invite',
]

export function addBookSubscriber({ email, firstName, bookId, source }) {
  DB.bookLeads.insert.run({ email, first_name: firstName, source, book_id: bookId })
  logger.info('[BOOK-FUNNEL] New subscriber', { email, bookId })
}

export async function runBookFunnel({ step = 0, limit = 50 } = {}) {
  const subs = DB.bookLeads.forStep.all(step, limit)
  logger.info(`[BOOK-FUNNEL] Step ${step} — ${subs.length} subscribers`)
  let sent = 0

  for (const sub of subs) {
    try {
      const book   = BOOKS.find(b => b.id === sub.book_id) || BOOKS[0]
      const intent = STEP_INTENTS[step] || STEP_INTENTS[5]
      const msg    = await claude.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        system: `You write warm, personal emails for ${AUTHOR}, author of "${book.title}" (Vorem Nigeria). Voice: confident, Africa-forward, practical, no hype. Sign as ${AUTHOR}. Include PS line. End with: "Unsubscribe: {{unsubscribe_link}}" Return ONLY valid JSON.`,
        messages: [{ role: 'user', content: `Write email ${step + 1} of 6 for subscriber ${sub.first_name || 'there'} who bought "${book.title}". Lead magnet delivered: "${book.magnet}". Intent: ${intent}. Upsell available: ${book.upsell} (${book.url}). Return JSON: { "subject": "<subject>", "body": "<120 words, warm, PS line, unsubscribe footer>" }` }],
      })
      const data = JSON.parse(msg.content[0].text.replace(/```json|```/g,'').trim())
      logger.info(`[BOOK-FUNNEL] Email ready for ${sub.email}`, { subject: data.subject, step })
      DB.bookLeads.nextStep.run(sub.email)
      sent++
    } catch (err) { logger.error(`[BOOK-FUNNEL] Failed: ${sub.email}`, { error: err.message }) }
    await delay(500)
  }

  logger.info(`[BOOK-FUNNEL] Step ${step} complete`, { sent })
  return sent
}

if (process.argv[1]?.endsWith('bookFunnel.js')) { runBookFunnel({ step: 0, limit: 5 }).catch(console.error) }
