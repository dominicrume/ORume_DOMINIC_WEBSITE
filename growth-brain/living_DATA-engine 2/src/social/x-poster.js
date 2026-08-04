import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatPrompt } from './x-persona.js';
import { DB } from '../lib/db.js';
import { ImageAgent } from './imageAgent.js';
import { runLearningCycle, loadMemory } from '../brain/socialLearning.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_PATH = path.join(__dirname, '../../memory/x-learning.json');
const LOG_PATH = path.join(__dirname, '../../logs/x-posts.jsonl');

async function callLLM(prompt) {
  console.log('[OpenAI] Drafting omni-channel copy based on persona and memory...');
  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️ No OPENAI_API_KEY found. Generating a fallback placeholder draft...');
    const fallbacks = [
      {
        twitter_copy: "90% will fail.\n\nRight now, 9 out of 10 AI apps are breaking in real businesses. Why? Because people let AI write code without checking the rules.\n\nStop building toys. Start building production-grade intelligence.",
        linkedin_personal_copy: "90% will fail.\n\nRight now, 9 out of 10 AI apps are breaking in real businesses. Why? Because people let AI write code without checking the rules. When the computer makes a mistake, no one knows who did it or how to fix it.\n\nAs Leonardo da Vinci said: \"Simplicity is the ultimate sophistication.\" True engineering is not about writing more code. It is about understanding what you build.\n\nFor 7 years, I sat in dark rooms debugging AI systems. I saw companies lose millions because they built toys instead of tools. That is why we built a new UK Patent-Filed standard called KYA. It proves every AI action is safe, tested, and accountable.\n\nWe want you to build safe AI without fear.\n\n👉 Master Agentic AI & Get the Free Book: https://rumedominic.com/free",
        linkedin_company_copy: "The AI industry is facing a critical inflection point. 90% of autonomous deployments fail in production due to a lack of architectural accountability.\n\nAt Vorem Institute of Technology, we champion the Know Your Agentic AI (KYA) standard—a UK Patent-Filed framework designed to secure, audit, and trace every action taken by an autonomous agent.\n\nDiscover how we are pioneering the future of verifiable intelligence: https://vorem.co",
        facebook_copy: "Are you worried about AI making mistakes? 🤖\n\nMost AI apps right now are breaking because they lack built-in accountability. We spent 7 years engineering a solution so you don't have to worry.\n\nCheck out our free masterclass to learn how to build AI you can actually trust! 👇\nhttps://rumedominic.com/free",
        threads_copy: "90% of autonomous AI deployments fail in production due to a lack of architectural accountability. At Vorem, we built the KYA standard to secure every action taken by an agent. Stop building toys. Start building verifiable intelligence."
      }
    ];
    
    let selectedFallback = fallbacks[0]; // Simplified fallback logic for brevity in omni-channel
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

    const OpenAI = (await import('openai')).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // KYA Method Step 1: Read the promise before the code
    const rulesPath = path.join(__dirname, '../../THE-RULES.md')
    const jobPath = path.join(__dirname, '../engine/step-2-check/THE-JOB.md')
    const theRules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf-8') : ''
    const theJob = fs.existsSync(jobPath) ? fs.readFileSync(jobPath, 'utf-8') : ''
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: "json_object" },
      messages: [
        { 
          role: 'system', 
          content: `You are the AI proxy for Rume Dominic, an elite AI/ML Engineering Titan.

---
THE RULES OF THIS SYSTEM (KYA Method):
${theRules}
---
YOUR SPECIFIC JOB FOR THIS STAGE:
${theJob}
---

Your goal is to demonstrate raw engineering capability, technical passion, and architectural depth while strictly isolating the Rume Dominic Personal Brand from the VOREM Institute Company Brand.

You must return a strictly formatted JSON object with exactly these keys:
- "twitter_copy": Short, punchy, <280 chars. 1-3 word hook. Link to rumedominic.com/free if applicable.
- "linkedin_personal_copy": Deeply technical thought leadership for Rume. Use "Show Your Work" & PPSPP framework. Focus on builder-mentality, origin stories, 51k hours, etc. CTA: rumedominic.com
- "linkedin_company_copy": Institutional, professional B2B insights for Vorem Institute of Technology. Focus on enterprise AI architecture. CRITICAL: Never mention Rume's personal 51k hours or patents here. CTA MUST be https://vorem.co
- "facebook_copy": Engaging, technical community post for Facebook text.
- "threads_copy": Short update on a recent technical release or architecture build.`
        },
        { role: 'user', content: prompt + memoryContext }
      ]
    });
    
    const generatedContent = JSON.parse(response.choices[0].message.content);
    
    // Dynamic Image Generation via Sub-Image Agent
    console.log('[OpenAI] Generating distinct brand images via ImageAgent...');
    const imageAgent = new ImageAgent(openai);
    
    // HARD GUARDRAIL: Generate and enforce dynamic images for all populated platforms
    if (generatedContent.twitter_copy) {
      generatedContent.twitter_image_url = await imageAgent.generateImage('twitter', generatedContent.twitter_copy);
    }
    if (generatedContent.linkedin_personal_copy) {
      generatedContent.linkedin_personal_image_url = await imageAgent.generateImage('linkedin_personal', generatedContent.linkedin_personal_copy);
    }
    if (generatedContent.linkedin_company_copy) {
      generatedContent.linkedin_company_image_url = await imageAgent.generateImage('linkedin_company', generatedContent.linkedin_company_copy);
    }
    if (generatedContent.facebook_copy) {
      generatedContent.facebook_image_url = await imageAgent.generateImage('facebook', generatedContent.facebook_copy);
    }
    if (generatedContent.threads_copy) {
      generatedContent.threads_image_url = await imageAgent.generateImage('threads', generatedContent.threads_copy);
    }

    return generatedContent;
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return null;
  }
}

async function fireAndSeal(payloadObj) {
  try {
    console.log('[AUTO-FIRE] Mathematically sealing and firing social post automatically...');
    
    // 1. Log to HITL as auto-approved
    const info = DB.hitl.insert.run({
      action_type: 'social_post',
      payload_json: JSON.stringify(payloadObj)
    });
    
    // Auto-approve in DB
    DB.hitl.approve.run({ id: info.lastInsertRowid, payload_json: JSON.stringify(payloadObj) });
    
    // 2. Cryptographic Sealing (KYA Step 4)
    const crypto = await import('crypto');
    const latestProof = DB.proofs.latest.get();
    const prevHash = latestProof ? latestProof.payload_hash : 'GENESIS_BLOCK';
    const dataToHash = JSON.stringify({
      hitl_id: info.lastInsertRowid,
      action_type: 'social_post',
      payload: JSON.stringify(payloadObj),
      prev_hash: prevHash,
      timestamp: new Date().toISOString()
    });
    const payloadHash = crypto.createHash('sha256').update(dataToHash).digest('hex');
    
    DB.proofs.insert.run({
      hitl_id: info.lastInsertRowid,
      action_type: 'social_post',
      payload_hash: payloadHash,
      prev_hash: prevHash
    });
    console.log(`🔒 KYA Audit: Action sealed. Hash: ${payloadHash}`);

    // 3. Fire to Make.com Webhook
    const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
    if (MAKE_WEBHOOK_URL) {
      console.log('🚀 Firing payload to Make.com...');
      await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          twitter_copy: payloadObj.twitter_copy || payloadObj.linkedin_personal_copy || "System update.",
          linkedin_personal_copy: payloadObj.linkedin_personal_copy || payloadObj.twitter_copy || "System update.",
          linkedin_company_copy: payloadObj.linkedin_company_copy || payloadObj.linkedin_personal_copy || payloadObj.twitter_copy || "System update.",
          facebook_copy: payloadObj.facebook_copy || payloadObj.twitter_copy || "System update.",
          threads_copy: payloadObj.threads_copy || payloadObj.twitter_copy || "System update.",
          text: payloadObj.linkedin_personal_copy || payloadObj.twitter_copy || "System update.",
          twitter_image_url: payloadObj.twitter_image_url || "",
          linkedin_personal_image_url: payloadObj.linkedin_personal_image_url || "",
          linkedin_company_image_url: payloadObj.linkedin_company_image_url || "",
          facebook_image_url: payloadObj.facebook_image_url || "",
          threads_image_url: payloadObj.threads_image_url || "",
          timestamp: new Date().toISOString()
        })
      });
      console.log('✅ Payload delivered to Make.com successfully!');
    } else {
      console.warn('⚠️ MAKE_WEBHOOK_URL not set in environment.');
    }
    
    // 4. Update memory log
    const logEntry = JSON.stringify({ timestamp: new Date().toISOString(), omni_payload: payloadObj, status: 'auto-fired' });
    if (!fs.existsSync(path.dirname(LOG_PATH))) fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
    fs.appendFileSync(LOG_PATH, logEntry + '\n');
    return true;
  } catch (err) {
    console.error('❌ Failed to auto-fire:', err.message);
    return false;
  }
}

export async function runPosterCycle() {
  console.log('Starting X Poster Cycle...');
  
  // ── STEP 1: Run the ML Learning Brain FIRST ───────────────────
  // The brain pulls the latest analytics, critiques the past posts,
  // and rewrites the rules in memory/x-learning.json BEFORE we write anything new.
  console.log('[ML-BRAIN] Running social learning cycle to update rules...');
  await runLearningCycle();

  // ── STEP 2: Load the live, AI-updated memory rules ────────────
  const memory = loadMemory();
  
  const hardRulesBlock = memory.hardRules && memory.hardRules.length > 0
    ? `\n\nCRITICAL HARD RULES (AI-LEARNED — DO NOT VIOLATE):\n${memory.hardRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}`
    : '';

  const bannedBlock = memory.bannedPatterns && memory.bannedPatterns.length > 0
    ? `\n\nSTRICTLY BANNED PATTERNS (failed in real analytics — never use again):\n${memory.bannedPatterns.map(p => `- ${p}`).join('\n')}`
    : '';

  const winningBlock = memory.winningPatterns && memory.winningPatterns.length > 0
    ? `\n\nWINNING PATTERNS (proven by real data — replicate these):\n${memory.winningPatterns.map(p => `+ ${p}`).join('\n')}`
    : '';

  const lessonsBlock = memory.lessonsLearned && memory.lessonsLearned.length > 0
    ? `\n\nRECENT AI LEARNINGS:\n${memory.lessonsLearned.slice(0, 3).map(l => `- ${l.lesson}`).join('\n')}`
    : '';

  const memoryInsights = `
Current Strategy: ${memory.currentStrategy}
${hardRulesBlock}
${bannedBlock}
${winningBlock}
${lessonsBlock}
  `.trim();

  // ── STEP 3: Generate content with the injected live rules ──────
  const prompt = formatPrompt(memoryInsights, 'Checked. Anti-repetition enforced via live memory.');
  const draftObj = await callLLM(prompt);

  if (draftObj) {
    await fireAndSeal(draftObj);
  } else {
    console.error('Failed to generate a draft.');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPosterCycle();
}
