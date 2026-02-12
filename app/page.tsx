export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Top bar */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-neutral-700">
              Text Tone
            </span>
            <span className="text-xs text-neutral-500">
              Because tone changes everything
            </span>
          </div>

          <a
            href="/tool"
            className="rounded-full border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            Open the app
          </a>
        </header>

        {/* Hero */}
        <section className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="text-sm text-neutral-600">Text Tone</p>

            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Say what you mean—
              <br />
              without overthinking the tone.
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-neutral-700">
              Rewrite your message in the tone you choose, so it sounds clear,
              natural, and exactly how you intended.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="/tool"
                className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-900"
              >
                Try Text Tone
              </a>

              <a
                href="#how"
                className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold hover:bg-neutral-50"
              >
                See how it works
              </a>
            </div>

            <p className="mt-3 text-xs text-neutral-500">
              No sign-up. Just rewrite and send.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {[
                "Work messages",
                "Family conversations",
                "Boundaries",
                "Relationships",
                "Hard topics",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border bg-white px-3 py-1 text-xs text-neutral-700"
                >
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {/* Right: proof card */}
          <div className="lg:pl-4">
            <div className="rounded-2xl border bg-neutral-50 p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold">A quick example</p>
                <span className="text-xs text-neutral-500">Tap to try →</span>
              </div>

              <div className="mt-4 rounded-xl bg-white border p-4">
                <p className="text-xs text-neutral-500 mb-2">
                  Original message
                </p>
                <p className="text-sm font-medium">
                  “Can you send that today?”
                </p>
              </div>

              <div className="my-4 h-px bg-neutral-200" />

              <div className="grid gap-3">
                <div className="rounded-xl bg-white border p-4">
                  <p className="text-xs text-neutral-500 mb-2">
                    Rewritten — Friendly
                  </p>
                  <p className="text-sm">
                    Hey! When you have a minute, could you send that today? 😊
                  </p>
                </div>

                <div className="rounded-xl bg-white border p-4">
                  <p className="text-xs text-neutral-500 mb-2">
                    Rewritten — Professional
                  </p>
                  <p className="text-sm">
                    Could you send that over today when you get a chance?
                  </p>
                </div>

                <div className="rounded-xl bg-white border p-4">
                  <p className="text-xs text-neutral-500 mb-2">
                    Rewritten — Firm
                  </p>
                  <p className="text-sm">
                    I need this sent today. Please let me know when it’s done.
                  </p>
                </div>
              </div>

              <a
                href="/tool"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-neutral-900"
              >
                Try it now
              </a>

              <p className="mt-3 text-xs text-neutral-500">
                Same meaning. Better delivery.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            How it works
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Three steps. Three options. Send with confidence.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border p-6">
              <p className="text-sm font-semibold mb-2">1) Paste your message</p>
              <p className="text-sm text-neutral-700">
                Start messy. We’ll help refine it without changing what you
                mean.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <p className="text-sm font-semibold mb-2">2) Choose a tone</p>
              <p className="text-sm text-neutral-700">
                Happy, calm, direct, firm, professional—whatever the moment
                needs.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <p className="text-sm font-semibold mb-2">3) Copy and send</p>
              <p className="text-sm text-neutral-700">
                Pick your favorite option, tap to copy, and hit send.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-16 rounded-2xl bg-black p-8 text-white">
          <h2 className="text-2xl font-semibold tracking-tight">
            Stop rewriting the same message in your head.
          </h2>
          <p className="mt-2 text-white/80">
            Try Text Tone and send your next message with confidence.
          </p>
          <div className="mt-5">
            <a
              href="/tool"
              className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-neutral-100"
            >
              Try Text Tone
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 text-xs text-neutral-500">
          © {new Date().getFullYear()} Text Tone. Because tone changes everything.
        </footer>
      </div>
    </main>
  );
}
