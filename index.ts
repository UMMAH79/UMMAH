import { streamText } from 'ai';
import 'dotenv/config';
import { google } from '@ai-sdk/google';

// Map platform key to what the SDK expects
if (process.env.GEMINI_API_KEY) {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY;
} else if (process.env.GEMINI_API_KEY1) {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GEMINI_API_KEY1;
} else if (process.env.API_KEY) {
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.API_KEY;
}

async function main() {
  const result = streamText({
    model: google('gemini-3-flash-preview'), 
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
}

main().catch(console.error);
