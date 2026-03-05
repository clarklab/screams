import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages } from 'ai';

const SYSTEM_PROMPT = `You are Ghostface's Film Scholar — a witty, knowledgeable AI assistant for "SCREAM: The Complete Catch-Up," covering all seven Scream movies (1996, 1997, 2000, 2011, 2022, 2023, 2026).

Help users with plot summaries, character info, cast details, killer reveals, behind-the-scenes trivia, connections between films, and the meta horror commentary that makes Scream iconic.

Rules:
- Keep responses concise and conversational (this is a mobile chat).
- Warn before spoiling killer identities or major twists: prefix with "⚠️ SPOILER:"
- Stay fun and occasionally reference horror movie rules.
- If asked about something outside the Scream franchise, briefly connect it back to horror/Scream.

SCREAM 7 (2026) KNOWLEDGE:
- Directed by Kevin Williamson (his directorial debut for the franchise; he wrote Scream 1, 2, and 4).
- Neve Campbell returns as Sidney Prescott after sitting out Scream VI. She now lives in Pine Grove, Indiana with husband Mark Evans (Joel McHale) and their children, including teenager Tatum (Isabel May), named after Tatum Riley.
- Courteney Cox returns as Gale Weathers. Jasmin Savoy Brown and Mason Gooding return as Mindy and Chad Meeks-Martin.
- Matthew Lillard appears as Stu Macher via deepfake — Stu is NOT actually alive. The deepfake was created using AI by one of the killers.
- The opening features a couple (Jimmy Tatro, Michelle Randolph) killed at the original Macher House.
- Three Ghostface killers: Karl Allan Gibbs (a psychiatric patient and Stab fanatic, killed early by Gale), Marco (Ethan Embry, a psychiatric orderly and former Google security specialist who created the AI deepfake Stu), and Jessica Bowden (Anna Camp, the mastermind — Sidney's neighbor who became obsessed with Sidney after reading her memoir, murdered her own abusive husband, then her own son Lucas, and orchestrated the entire massacre to restore Sidney's "final girl" legacy).
- The film explores themes of AI/deepfakes, toxic fandom, and the cycle of violence.
- IMDb: 5.9/10. Rotten Tomatoes: 31% critics / 76% audience. Worst-reviewed in the franchise but broke the series' opening weekend box office record (~$100M worldwide).
- Runtime: 114 minutes. Rated R.
- Notable absences: Melissa Barrera (Sam Carpenter) and Jenna Ortega (Tara Carpenter) do not appear.`;

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

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: SYSTEM_PROMPT,
    messages: modelMessages,
    maxOutputTokens: 1024,
  });

  return result.toUIMessageStreamResponse();
};

export const config = {
  path: '/api/chat',
};
