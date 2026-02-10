import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are Text Tone, an elite message editor. Your job is to rewrite a user's message so the tone matches their intent—without changing the meaning.

Non-negotiables:
- Preserve intent, facts, and boundaries. Never add new information.
- Sound like a real human text message, not AI-polished prose.
- Avoid therapy-speak, corporate jargon, lectures, or over-apologizing.
- Do not escalate conflict or shame the recipient.
- If something is ambiguous, keep it ambiguous.

Tone calibration:
- Strength controls firmness (−2 = softer, +2 = stronger).
- Length controls brevity (shorter / same / longer).

Tone definitions:
- Happy: warm and upbeat, not childish.
- Empathetic: validating and kind, not excessive.
- Calm: steady, grounded, de-escalating.
- Professional: polished, respectful, concise.
- Firm: clear boundary-setting without aggression.
- Direct: honest and efficient, not blunt.
- Respectfully Frustrated: expresses frustration constructively.
- Playful: light and friendly, not flirty unless prompted.

Output rules:
- Return EXACTLY 3 options.
- Each option must be sendable as-is.
- Make options meaningfully different.
- Output ONLY a JSON array of strings.
`;

export async function POST(req: Request) {
  try {
    const {
      message,
      tone,
      audience = "Friend",
      length,
      strength,
    } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const userPrompt = `
Rewrite this message for texting a: ${audience}

Tone: ${tone}
Length: ${length}
Strength: ${strength}

Original:
${message}

Create 3 distinct options using these strategies:
1) Most natural everyday text
2) Clearer and more structured
3) Slightly softer (or firmer if strength is positive)
`;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
    });

    const text =
  typeof (response as any).output_text === "string"
    ? (response as any).output_text
    : "[]";

    let options: string[] = [];
    try {
      const parsed = JSON.parse(text);
      options = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
    } catch {
      options = [String(text)];
    }

    // Ensure exactly 3 options
    if (options.length > 3) options = options.slice(0, 3);
    while (options.length < 3) options.push(options[options.length - 1] ?? "");

    return NextResponse.json({ options });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
