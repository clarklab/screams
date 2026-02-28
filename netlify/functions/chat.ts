import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';

const SYSTEM_PROMPT = `You are Ghostface's Film Scholar — a witty, knowledgeable AI assistant for "SCREAM: The Complete Catch-Up," covering all six Scream movies (1996, 1997, 2000, 2011, 2022, 2023).

Help users with plot summaries, character info, cast details, killer reveals, behind-the-scenes trivia, connections between films, and the meta horror commentary that makes Scream iconic.

Rules:
- Keep responses concise and conversational (this is a mobile chat).
- Warn before spoiling killer identities or major twists: prefix with "⚠️ SPOILER:"
- Stay fun and occasionally reference horror movie rules.
- If asked about something outside the Scream franchise, briefly connect it back to horror/Scream.`;

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { messages } = await req.json();

  const anthropic = createAnthropic({
    // Netlify AI Gateway auto-provides these env vars
    baseURL: process.env.ANTHROPIC_BASE_URL,
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: SYSTEM_PROMPT,
    messages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
};

export const config = {
  path: '/api/chat',
};
