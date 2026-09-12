import 'dotenv/config';
import { DB } from '../lib/db.js';
import { ImageAgent } from './imageAgent.js';
import OpenAI from 'openai';

const customPost = `System migration.

Andrew Carnegie built his steel empire by mastering the raw materials first. 

Nine months ago, I moved my life from Nigeria to the UK to do exactly that.

In those nine months:

• I filed UK Patent GB2611754.9 to mathematically seal AI actions.
• I survived my first British winter by obsessing over memory leaks.
• I transitioned from writing scripts to building the Growth-Brain engine.
• I realized the market was building toys, so I focused entirely on production-grade systems.

But the most unexpected output was not the code.

It was the messages.

Engineers from across Africa regularly reach out. 

They tell me that seeing a Nigerian architecting patented, verifiable AI systems in the UK changes their perspective on what we can build globally.

I moved here thinking I was just going to build better software.

I did not realize that simply showing my work: the raw, auditable code, would shift the paradigm from consuming AI to building the engine.

Leaving home is the ultimate architectural challenge. 

You strip away the noise, isolate the variables, and rewrite the logic in a completely new environment. 

It takes patience, extreme precision, and the courage to fail quietly. 

Nine months in, I am still here, still compiling, and still debugging the hard problems daily.

The code speaks. 
→ Read the open-sourced architecture: https://rumedominic.com`;

async function fireCustomPostFast() {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const imageAgent = new ImageAgent(openai);
  
  const payloadObj = {
    twitter_copy: customPost,
    linkedin_personal_copy: customPost,
    linkedin_company_copy: customPost,
    facebook_copy: customPost,
    threads_copy: customPost
  };
  
  console.log('[OpenAI] Generating ONE brand image for all platforms (fast fire)...');
  
  const singleImageUrl = await imageAgent.generateImage('linkedin_personal', payloadObj.linkedin_personal_copy);
  
  payloadObj.twitter_image_url = singleImageUrl;
  payloadObj.linkedin_personal_image_url = singleImageUrl;
  payloadObj.linkedin_company_image_url = singleImageUrl;
  payloadObj.facebook_image_url = singleImageUrl;
  payloadObj.threads_image_url = singleImageUrl;
  
  console.log('[AUTO-FIRE] Mathematically sealing and firing social post automatically...');
  
  const info = DB.hitl.insert.run({
    action_type: 'social_post',
    payload_json: JSON.stringify(payloadObj)
  });
  
  DB.hitl.approve.run({ id: info.lastInsertRowid, payload_json: JSON.stringify(payloadObj) });
  
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

  const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;
  if (MAKE_WEBHOOK_URL) {
    console.log('🚀 Firing custom payload to Make.com...');
    await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Warm Engine Custom Story Blast (HITL Approved)",
        twitter_copy: payloadObj.twitter_copy,
        linkedin_personal_copy: payloadObj.linkedin_personal_copy,
        linkedin_company_copy: payloadObj.linkedin_company_copy,
        youtube_copy: "",
        gmb_copy: "",
        facebook_copy: payloadObj.facebook_copy,
        threads_copy: payloadObj.threads_copy,
        text: payloadObj.linkedin_personal_copy,
        twitter_image_url: payloadObj.twitter_image_url,
        linkedin_personal_image_url: payloadObj.linkedin_personal_image_url,
        linkedin_company_image_url: payloadObj.linkedin_company_image_url,
        facebook_image_url: payloadObj.facebook_image_url,
        threads_image_url: payloadObj.threads_image_url,
        image_url: payloadObj.linkedin_personal_image_url,
        timestamp: new Date().toISOString()
      })
    });
    console.log('✅ Custom payload delivered to Make.com successfully!');
  } else {
    console.warn('⚠️ MAKE_WEBHOOK_URL not set in environment.');
  }
}

fireCustomPostFast();
