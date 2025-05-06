import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    // model: 'gemini-2.0-flash',
    model: 'gemini-2.5-pro-preview-03-25',
    contents: 'こんにちは',
  });
  console.log(response.text);
}

import { MastraClient } from '@mastra/client-js';

const client = new MastraClient({
  baseUrl: 'http://localhost:4111',
  // baseUrl: 'https://sparse-howling-football.mastra.cloud',
  headers: {
    Authorization: `Bearer ${process.env.MASTRA_API_KEY}`,
  },
});

async function mastraMain() {
  const a = await client.getAgent('weatherAgent');
  const res = await a.generate({
    messages: [{ role: 'user', content: 'What is the weather like in New York?' }],
  });
  console.log(res);
}
// await main();
await mastraMain();
