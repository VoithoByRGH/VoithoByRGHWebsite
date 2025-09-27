import React from "react";
import Section from "../components/Section";
import Heading from "../components/Heading";

export default function Portfolio() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Header (solid so nav stays readable) */}
      <header className="bg-white text-black border-b relative z-20">
        <Section className="flex items-center justify-between py-3">
          <a
            href="/"
            className="flex items-center gap-2"
            aria-label="Go to Home"
          >
            <img
              src="/VoithoLOGOv2blk.png"
              alt="Voithó by RGH"
              className="h-45 w-40"
            />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm hover:underline">
              Home
            </a>
            <a href="/portfolio" className="text-sm underline">
              Portfolio
            </a>
            <a
              href="/#contact"
              className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
            >
              Get a Quote
            </a>
          </nav>
        </Section>
      </header>

      {/* Hero with the SAME background markup as Home */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video (bottom layer) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            title="vimeo-background"
            src="https://player.vimeo.com/video/1120984476?h=9a5b713a23&background=1&autoplay=1&muted=1&loop=1&playsinline=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="vimeo-cover"
            style={{ pointerEvents: "none" }}
          />
        </div>

        {/* Light overlay */}
        <div className="absolute inset-0 z-10 bg-black/30" />

        {/* Content */}
        <Section className="relative z-20 py-24">
          <Heading
            eyebrow="Work"
            title="Portfolio"
            subtitle="🚧 This page is under construction. Check back soon for recent projects."
          />
          <div className="mx-auto max-w-2xl rounded-2xl border border-gray-800 bg-black/60 backdrop-blur p-8 text-center">
            <p className="text-gray-200">
              I’m curating a tight selection of films right now.
            </p>
            <p className="text-gray-300 mt-2">
              In the meantime, see snippets on{" "}
              <a
                className="underline"
                href="https://instagram.com/voithobyrgh"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              .
            </p>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="py-10 relative z-20">
        <Section className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3">
            <img
              src="/VoithoLOGOv2.png"
              alt="Voithó by RGH"
              className="h-8 w-auto"
            />
            <span className="text-gray-400">
              © {new Date().getFullYear()} VoithóByRGH. All rights reserved.
            </span>
          </div>
        </Section>
      </footer>
    </main>
  );
}
