import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEMORY_PATH = path.join(__dirname, '../../memory/x-learning.json');

async function analyzeEngagement(metrics) {
  console.log('[Learner] Analyzing engagement metrics to update memory...');
  return "Keep tweets short and aggressive against bad engineering practices. High correlation between 'vibe coding' callouts and engagement.";
}

export async function runLearnerCycle() {
  console.log('Starting X Learner Cycle...');
  
  const mockMetrics = [
    { tweet: "Vibe coding is dead.", impressions: 1200, likes: 45, retweets: 5 },
    { tweet: "We just updated our website.", impressions: 100, likes: 2, retweets: 0 }
  ];

  const newLesson = await analyzeEngagement(mockMetrics);

  let memory = { currentStrategy: 'Focus on high-signal tech truths', lessonsLearned: [] };
  if (fs.existsSync(MEMORY_PATH)) {
    memory = JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));
  }
  
  memory.lessonsLearned.unshift(newLesson);
  if (memory.lessonsLearned.length > 10) memory.lessonsLearned.pop();
  
  if (!fs.existsSync(path.dirname(MEMORY_PATH))) fs.mkdirSync(path.dirname(MEMORY_PATH), { recursive: true });
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
  console.log('✅ Memory updated with new insights.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runLearnerCycle();
}
