import 'dotenv/config';
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

async function post() {
  try {
    const text = "Code Jailbreak. Many rely on code blindly. Break free by questioning assumptions and examining every logic. 'Consciousness over code.'";
    console.log("Attempting to post to X...");
    const { data: createdTweet } = await client.v2.tweet(text);
    console.log("Success! Tweet ID:", createdTweet.id);
  } catch (e) {
    console.error("Failed to post:", e);
  }
}

post();
