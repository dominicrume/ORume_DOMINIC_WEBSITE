import 'dotenv/config';
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
    console.warn('⚠️ No ANTHROPIC_API_KEY found. Generating a fallback placeholder draft...');
    const fallbacks = [
      "90% will fail.\n\nRight now, 9 out of 10 AI apps are breaking in real businesses. Why? Because people let AI write code without checking the rules. When the computer makes a mistake, no one knows who did it or how to fix it.\n\nAs Leonardo da Vinci said: \"Simplicity is the ultimate sophistication.\" True engineering is not about writing more code. It is about understanding what you build.\n\nFor 7 years, I sat in dark rooms debugging AI systems. I saw companies lose millions because they built toys instead of tools. That is why we built a new UK Patent-Filed standard called KYA. It proves every AI action is safe, tested, and accountable.\n\nWe want you to build safe AI without fear. We open-sourced our entire 51,000-hour playbook so you can learn for free:\n\n→ Read the open-sourced book & 9-Day Masterclass ($0 today): https://rumedominic.com/free\n→ Explore our full AI architecture resources & Substack: https://rumedominic.com\n\nZero syntax memorization. 100% auditable systems. No credit card required.",
      "Trust is broken.\n\nThe market is flooded with AI agents that hallucinate, leak credentials, and fail in production. Companies are burning cash on 'vibe coding' experiments that never scale.\n\nAs Marcus Aurelius wrote: \"What is not good for the swarm is not good for the bee.\" If your AI architecture is fundamentally unsafe, your entire business is at risk.\n\nAfter 51,000 hours of development, we realized the only path forward is Provable AI. That's why we engineered the KYA standard (UK Patent Filed GB2611754.9). Every agent action is audited, verified, and accountable.\n\nStop building toys. Start building production-grade intelligence.\n\n→ Read the open-sourced book & 9-Day Masterclass ($0 today): https://rumedominic.com/free\n→ Explore our full AI architecture resources: https://rumedominic.com",
      "Consciousness over code.\n\nSyntax memorization is dead. The future belongs to those who understand systems, not just lines of code. But with 90% of AI wrappers failing, the market is confused.\n\nSocrates taught us that \"Understanding a question is half an answer.\" True AI engineering is about asking the right questions and building secure, bounded systems to answer them.\n\nWe spent 7 years in dark rooms so you don't have to. Our UK Patent-Filed KYA standard ensures you Know Your Agentic AI.\n\nMaster the Warm Engine architecture today.\n\n→ Get the free 9-Day Masterclass ($0 today): https://rumedominic.com/free"
    ];
    
    // Attempt to read logs to prevent immediate repetition of the exact same fallback
    let lastPostText = "";
    if (fs.existsSync(LOG_PATH)) {
      try {
        const logs = fs.readFileSync(LOG_PATH, 'utf-8').trim().split('\n').filter(l => l);
        if (logs.length > 0) {
           const lastLog = JSON.parse(logs[logs.length - 1]);
           lastPostText = lastLog.text;
        }
      } catch (e) {}
    }
    
    let selectedFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    // Ensure we don't repeat the exact last post
    while (selectedFallback === lastPostText && fallbacks.length > 1) {
      selectedFallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    
    return selectedFallback;
  }

  try {
    let memoryContext = "";
    if (fs.existsSync(LOG_PATH)) {
      try {
        const logs = fs.readFileSync(LOG_PATH, 'utf-8').trim().split('\n').filter(l => l);
        const lastPosts = logs.slice(-5).map(l => JSON.parse(l).text);
        if (lastPosts.length > 0) {
          memoryContext = "\n\nCRITICAL ANTI-REPETITION RULE: DO NOT REPEAT, REPHRASE, OR USE SIMILAR HOOKS FROM ANY OF THESE RECENT POSTS:\n" + lastPosts.map(p => `--- PREVIOUS POST ---\n${p}`).join("\n");
        }
      } catch (e) {
        console.error("Failed to read log for memory injection:", e.message);
      }
    }

    const { Anthropic } = await import('@anthropic-ai/sdk');
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 500,
      system: "You are the autonomous X (Twitter) posting agent. Follow instructions strictly.",
      messages: [{ role: 'user', content: prompt + memoryContext }]
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
          title: "Why 90% Fail: The Warm Engine 4-Part Architecture — Rume Dominic",
          text,
          caption: `${text}\n\n👉 Master Agentic AI & Get the Free Book: https://rumedominic.com/free\n🌐 Explore our full AI architecture resources: https://rumedominic.com\n\n#Consciousness #AgenticAI #Vorem #RumeDominic #Web3 #AI #100MOffers #Simplicity`,
          image_url: "https://rumedominic.com/kya-logo.png",
          tags: ["AgenticAI", "VibeCoding", "Vorem", "RumeDominic", "Web3", "AI", "100MOffers", "Simplicity"],
          timestamp: new Date().toISOString(),
          author: "Rume Dominic (Personal)",
          style: "Warm Engine 4-Part Narrative (Ruben x Rume x Hormozi x Da Vinci Wisdom)",
          channel_target: "Personal Accounts Only (Twitter/X, LinkedIn Personal Profile). STRICTLY EXCLUDE Vorem / VM Company Page."
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
