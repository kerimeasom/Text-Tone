import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Text Tone — Because tone changes everything",
    template: "%s | Text Tone",
  },
  description:
    "Rewrite your text messages in the tone you choose—happy, calm, firm, professional, playful, and more—while keeping your meaning intact.",
  metadataBase: new URL("https://text-tone.vercel.app"), // ← update if your domain differs
  openGraph: {
    title: "Text Tone — Because tone changes everything",
    description:
      "Rewrite your message in the tone you choose. Get three options. Tap to copy. Send confidently.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Text Tone",
    description:
      "Rewrite your message in the tone you choose. Tap to copy. Send confidently.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
