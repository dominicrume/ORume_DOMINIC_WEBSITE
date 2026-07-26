import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatPrompt } from './x-persona.js';
import { TwitterApi } from 'twitter-api-v2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_PATH = path.join(__dirname, '../../memory/x-learning.json');
const LOG_PATH = path.join(__dirname, '../../logs/x-posts.jsonl');

async function callClaude(prompt) {
  console.log('[Claude] Drafting tweet based on persona and memory...');
  
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('⚠️ No ANTHROPIC_API_KEY found. Generating a fallback placeholder draft in Ruben Hassid style.');
    return "Vibecoding.\n\nAfter 51,000+ hours of development, I admit most AI advice is wrong:\n\nStop collecting prompts and building toys. Build auditable, production-grade AI agents today.\n\n→ Know Your AgenticAi: https://rumedominic.com";
  }

  try {
    const { Anthropic } = await import('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 300,
      system: "You are the autonomous X (Twitter) posting agent. Follow instructions strictly.",
      messages: [{ role: 'user', content: prompt }]
    });
    return msg.content[0].text.trim();
  } catch (error) {
    console.error('Claude API Error:', error.message);
    return null;
  }
}

async function postToX(text) {
  const isLive = process.env.X_API_KEY && process.env.X_API_SECRET && process.env.X_ACCESS_TOKEN && process.env.X_ACCESS_SECRET;
  
  if (process.env.MAKE_WEBHOOK_URL) {
    console.log('[Make.com Automation] Pushing generated Ruben Hassid copy to Make.com Webhook...');
    try {
      const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Vibecoding vs. Production AI Architecture — Rume Dominic",
          text,
          caption: `${text}\n\n👉 Master Agentic AI & Get the Book: https://rumedominic.com\n\n#AgenticAI #Vorem #RumeDominic #Web3 #AI`,
          image_url: "https://rumedominic.com/rume-portrait.jpg",
          tags: ["AgenticAI", "Vorem", "RumeDominic", "Web3", "AI"],
          timestamp: new Date().toISOString(),
          author: "Rume Dominic x Vorem AI",
          style: "Ruben Hassid High-Traction",
          channel_target: "Multi-Channel (Twitter/X, LinkedIn, Facebook, Instagram, Medium, Substack)"
        })
      });
      if (response.ok) {
        console.log('✅ Successfully triggered Make.com automation scenario!');
      } else {
        console.warn('⚠️ Make.com Webhook responded with status:', response.status);
      }
    } catch (err) {
      console.error('❌ Failed to send payload to Make.com Webhook:', err.message);
    }
  }

  if (isLive) {
    console.log('[X Poster] Live credentials found. Pushing to Twitter timeline...');
    try {
      const client = new TwitterApi({
        appKey: process.env.X_API_KEY,
        appSecret: process.env.X_API_SECRET,
        accessToken: process.env.X_ACCESS_TOKEN,
        accessSecret: process.env.X_ACCESS_SECRET,
      });
      await client.v2.tweet(text);
      console.log('✅ Successfully posted to Twitter.');
    } catch (e) {
      console.error('❌ Failed to post to Twitter:', e);
      return false;
    }
  } else {
    console.log('\n========================================');
    console.log('🐦 [DRY RUN] NO X API KEYS FOUND. LOGGING TWEET INSTEAD:');
    console.log('========================================');
    console.log(text);
    console.log('========================================\n');
  }
  
  const logEntry = JSON.stringify({ timestamp: new Date().toISOString(), text, status: isLive ? 'live' : (process.env.MAKE_WEBHOOK_URL ? 'make-webhook' : 'dry-run') });
  if (!fs.existsSync(path.dirname(LOG_PATH))) fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
  fs.appendFileSync(LOG_PATH, logEntry + '\n');
  
  return true;
}

export async function runPosterCycle() {
  console.log('Starting X Poster Cycle...');
  
  let memory = { currentStrategy: 'Focus on high-signal tech truths', lessonsLearned: [] };
  if (fs.existsSync(MEMORY_PATH)) {
    memory = JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));
  }
  
  const memoryInsights = `
  Current Strategy: ${memory.currentStrategy}
  Lessons Learned: ${memory.lessonsLearned.join(' | ')}
  `;

  const prompt = formatPrompt(memoryInsights, "None currently available in local log.");
  const draft = await callClaude(prompt);

  if (draft) {
    await postToX(draft);
  } else {
    console.error('Failed to generate a draft.');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPosterCycle();
}
