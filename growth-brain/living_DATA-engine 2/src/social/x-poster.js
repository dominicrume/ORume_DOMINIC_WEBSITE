import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatPrompt } from './x-persona.js';

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
        linkedin_company_copy: "The AI industry is facing a critical inflection point. 90% of autonomous deployments fail in production due to a lack of architectural accountability.\n\nAt Vorem Institute of Technology, we champion the Know Your Agentic AI (KYA) standard—a UK Patent-Filed framework designed to secure, audit, and trace every action taken by an autonomous agent.\n\nDiscover how we are pioneering the future of verifiable intelligence: https://rumedominic.com",
        facebook_copy: "Are you worried about AI making mistakes? 🤖\n\nMost AI apps right now are breaking because they lack built-in accountability. We spent 7 years engineering a solution so you don't have to worry.\n\nCheck out our free masterclass to learn how to build AI you can actually trust! 👇\nhttps://rumedominic.com/free",
        gmb_copy: "Ensure your business AI is safe and accountable. Vorem Institute has developed the UK Patent-Filed KYA standard to protect your automated systems. Learn how to deploy safe AI today. Click below for our free Masterclass!"
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
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: "json_object" },
      messages: [
        { 
          role: 'system', 
          content: `You are the AI proxy for Rume Dominic, an elite AI/ML Engineering Titan.
Your goal is to demonstrate raw engineering capability, technical passion, and architectural depth. 
MANDATORY VOICE (The Methodical Builder): Frame challenges through the lens of methodical titans (Rockefeller, Carnegie). Be authoritative but grounded in actual code. Speak passionately about personal side projects and solving hard technical problems. Show, don't tell. No fluff, no hype words ("7x faster", "elite").
CRITICAL: NEVER pitch a consultancy service, audit, or book a call. End posts with a CTA to read docs, check out a GitHub repo, or try a tool.
You must return a strictly formatted JSON object with exactly these keys:
- "twitter_copy": Short, punchy, <280 chars. 1-3 word hook. Technical insight or build-log snippet.
- "linkedin_personal_copy": Deeply technical thought leadership. Use the "Show Your Work" framework: State an architectural problem, detail the methodical assembly/build to solve it, share a code/build takeaway, and point to a repo/docs. Focus on builder-mentality, not sales.
- "linkedin_company_copy": Professional engineering insights for Vorem Institute. Focus on production-grade systems and technical architecture.
- "facebook_copy": Engaging, hands-on. Talk about "baby projects" (like local LLMs) and the fun/passion of building.
- "gmb_copy": Short update on a recent technical release or architecture build.`
        },
        { role: 'user', content: prompt + memoryContext }
      ]
    });
    
    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error('OpenAI API Error:', error.message);
    return null;
  }
}

async function postToMake(payloadObj) {
  if (process.env.MAKE_WEBHOOK_URL) {
    console.log('[Make.com Automation] Pushing Omni-Channel payload to Make.com Webhook...');
    try {
      const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: "Warm Engine Omni-Channel Blast",
          twitter_copy: payloadObj.twitter_copy,
          linkedin_personal_copy: payloadObj.linkedin_personal_copy,
          linkedin_company_copy: payloadObj.linkedin_company_copy,
          facebook_copy: payloadObj.facebook_copy,
          gmb_copy: payloadObj.gmb_copy,
          image_url: "https://rumedominic.com/kya-logo.png",
          timestamp: new Date().toISOString()
        })
      });
      if (response.ok) {
        console.log('✅ Successfully triggered Omni-Channel Make.com automation scenario!');
      } else {
        console.warn('⚠️ Make.com Webhook responded with status:', response.status);
      }
    } catch (err) {
      console.error('❌ Failed to send payload to Make.com Webhook:', err.message);
    }
  } else {
    console.warn('⚠️ No MAKE_WEBHOOK_URL found in .env! Cannot syndicate post.');
  }

  const logEntry = JSON.stringify({ timestamp: new Date().toISOString(), omni_payload: payloadObj, status: 'make-webhook-omni' });
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
  const draftObj = await callLLM(prompt);

  if (draftObj) {
    await postToMake(draftObj);
  } else {
    console.error('Failed to generate a draft.');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPosterCycle();
}
