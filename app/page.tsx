"use client";

import { useMemo, useState } from "react";

type LengthMode = "shorter" | "same" | "longer";

const TONES = [
  { label: "Happy", emoji: "😊" },
  { label: "Empathetic", emoji: "🤍" },
  { label: "Calm", emoji: "😌" },
  { label: "Professional", emoji: "💼" },
  { label: "Firm", emoji: "✋" },
  { label: "Direct", emoji: "🎯" },
  { label: "Respectfully Frustrated", emoji: "😤" },
  { label: "Playful", emoji: "✨" },
];

export default function Page() {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("Happy");
  const [audience, setAudience] = useState("Friend");
  const [length, setLength] = useState<LengthMode>("same");
  const [strength, setStrength] = useState(0);
  const [showRefine, setShowRefine] = useState(false);

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => message.trim().length > 0 && !loading,
    [message, loading]
  );

  async function handleRewrite() {
    setLoading(true);
    setError(null);
    setOptions([]);

    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, tone, audience, length, strength }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setOptions(Array.isArray(data.options) ? data.options : []);
    } catch (err: any) {
      setError(err?.message || "Server error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-semibold">Text Tone</h1>
        <p className="text-sm text-neutral-600 mb-6">
          Because tone changes everything
        </p>

        <textarea
          className="w-full rounded-xl border p-3 mb-3"
          rows={6}
          placeholder="Type or paste your message here…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <p className="text-xs text-neutral-500 mb-4">
          Your meaning stays. Your tone works.
        </p>

        <h2 className="font-medium mb-2">Who is this for?</h2>
        <select
          className="w-full rounded-xl border p-3 mb-4"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        >
          <option>Friend</option>
          <option>Partner</option>
          <option>Coworker</option>
          <option>Boss</option>
          <option>Client</option>
          <option>Family</option>
          <option>Stranger</option>
        </select>

        <h2 className="font-medium mb-2">Choose a tone</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {TONES.map((t) => (
            <button
              key={t.label}
              onClick={() => setTone(t.label)}
              className={`px-3 py-2 rounded-full border text-sm ${
                tone === t.label ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowRefine(!showRefine)}
          className="text-sm text-neutral-600 mb-3"
        >
          {showRefine ? "Refine tone ▲" : "Refine tone ▼"}
        </button>

        {showRefine && (
          <div className="border rounded-xl p-3 mb-4">
            <div className="mb-3">
              <p className="text-sm font-medium">Length</p>
              <div className="flex gap-2 mt-1">
                {(["shorter", "same", "longer"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setLength(v)}
                    className={`px-3 py-1 rounded border text-sm ${
                      length === v ? "bg-black text-white" : ""
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium">Strength</p>
              <input
                type="range"
                min={-2}
                max={2}
                step={1}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleRewrite}
          disabled={!canSubmit}
          className={`w-full py-3 rounded-xl font-semibold ${
            canSubmit ? "bg-black text-white" : "bg-neutral-200 text-neutral-500"
          }`}
        >
          {loading ? "Rewriting…" : "Rewrite My Message"}
        </button>

        {error && <p className="text-red-600 mt-3">{error}</p>}

        {options.length > 0 && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Options</h2>
            {options.map((opt, i) => (
              <div
                key={i}
                onClick={() => navigator.clipboard.writeText(opt)}
                className="border rounded-xl p-3 mb-2 cursor-pointer"
              >
                <p className="text-sm font-medium mb-1">Option {i + 1}</p>
                <p className="text-sm whitespace-pre-wrap">{opt}</p>
                <p className="text-xs text-neutral-500 mt-1">Tap to copy</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
