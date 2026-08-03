import { logger } from '../lib/logger.js';

/**
 * Sub-Image Generating Agent
 * Dynamically constructs highly optimized DALL-E 3 prompts for each platform 
 * and enforces strict dimensional constraints.
 */
export class ImageAgent {
  constructor(openaiClient) {
    this.openai = openaiClient;
  }

  async generateImage(platform, copy) {
    logger.info(`[ImageAgent] Initiating image generation for platform: ${platform}`);

    // 1. Determine optimal dimensions for the platform
    let size = '1024x1024'; // Default square
    if (['twitter', 'linkedin_personal', 'linkedin_company'].includes(platform)) {
      size = '1792x1024'; // Landscape for optimal feed real estate
    }

    // 2. Determine brand context
    let brandContext = '';
    if (platform === 'linkedin_company') {
      brandContext = `The brand is VOREM Institute of Technology. The aesthetic must be sleek, institutional, B2B enterprise AI, and highly professional. No human faces, focus on systems, architecture, servers, data pipelines, or abstract intelligence.`;
    } else {
      brandContext = `The brand is Rume Dominic. The aesthetic must be raw, gritty, engineering-focused, 'dark room hacker' meets 'senior AI architect'. Show code, terminal screens, AI consciousness, or visionary engineering.`;
    }

    // 3. Ask the LLM to generate the perfect DALL-E 3 prompt
    const promptResponse = await this.openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a world-class prompt engineer. Your job is to read the provided social media copy and generate a highly detailed, visually stunning DALL-E 3 image prompt that perfectly captures the essence of the post. Output ONLY the raw prompt text, no pleasantries."
        },
        {
          role: "user",
          content: `${brandContext}\n\nHere is the post copy:\n"${copy}"\n\nGenerate the DALL-E 3 image prompt now:`
        }
      ],
      max_tokens: 250,
      temperature: 0.7,
    });

    const dallePrompt = promptResponse.choices[0].message.content.trim();
    logger.info(`[ImageAgent] Generated DALL-E 3 prompt for ${platform}`);

    // 4. Generate the image
    // HARD GUARDRAIL: If this fails, the error propagates up and aborts the entire post run.
    const imageResponse = await this.openai.images.generate({
      model: "gpt-image-2",
      prompt: dallePrompt,
      n: 1,
      size: size
    });

    logger.info(`[ImageAgent] Image successfully generated for ${platform}`);
    return imageResponse.data[0].url;
  }
}
