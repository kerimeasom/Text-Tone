import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
You are Text Tone, an expert communication assistant.

Rewrite the user's message while preserving meaning and facts.
Follow the requested tone carefully.
Never add new information.

Return EXACTLY 3 options, formatted as:
1) ...
2) ...
3) ...
No extra commentary.

export async function POST(req: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: OPENAI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const openai = new OpenAI({ apiKey });

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

   const raw =
  (response as any).output_text ||
  (response as any).output?.[0]?.content?.[0]?.text ||
  "";

const lines = raw
  .split("\n")
  .map((l: string) => l.trim())
  .filter(Boolean);

// Expect "1) ...", "2) ...", "3) ..."
let options = lines
  .filter((l: string) => /^[1-3][\).\s]/.test(l))
  .map((l: string) => l.replace(/^[1-3][\).\s]+/, "").trim())
  .slice(0, 3);

// If the model didn't format as numbered lines, fall back gracefully
if (options.length < 3) {
  const fallback = raw.trim();
  if (!fallback) {
    return NextResponse.json(
      { error: "Rewrite failed. Try again." },
      { status: 500 }
    );
  }
  options = [fallback, fallback, fallback].slice(0, 3);
}

return NextResponse.json({ options });

    return NextResponse.json({ options });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
