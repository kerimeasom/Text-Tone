import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `
You are Text Tone, an elite message editor. Your job is to rewrite a user's message so the tone matches their intent—without changing the meaning.
(…keep your existing SYSTEM_PROMPT text here…)
`;

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

    const text = (response as any).output_text ?? "[]";

    let options: string[] = [];
    try {
      const parsed = JSON.parse(text);
      options = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
    } catch {
      options = [String(text)];
    }

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
