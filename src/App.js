import React from "react";

function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

function Heading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      {eyebrow && (
        <div className="mb-2 inline-block text-xs font-semibold tracking-wide bg-gray-100 border rounded-full px-3 py-1 text-black">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-gray-300 mt-3">{subtitle}</p>}
    </div>
  );
}

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#packages", label: "Packages" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: "🛩️",
    title: "Aerial / Drone",
    desc: "Beautiful, stable aerials for property, tourism, and social assets. Fully insured with local compliance.",
    bullets: ["3–5 hero shots", "Reels-ready clips", "Construction progress"],
    tag: "Aerial",
  },
  {
    icon: "🏠",
    title: "Real Estate",
    desc: "Fast-turnaround property walk-throughs and reels that convert viewings.",
    bullets: ["1–2 minute showcase", "Drone add-on", "Photo bundles"],
    tag: "Property",
  },
  {
    icon: "🏗️",
    title: "Construction Updates",
    desc: "Monthly visual progress for developers and clients — the simplest way to document milestones.",
    bullets: [
      "5–10 shots monthly",
      "Optional short edit",
      "Consistent framing",
    ],
    tag: "Progress",
  },
  {
    icon: "🏪",
    title: "Local Business Promos",
    desc: "Snackable promos for cafes, gyms, schools, and brands — designed for social impact.",
    bullets: ["30–60s edits", "9:16 + 16:9 delivery", "On-brand music"],
    tag: "Social",
  },
];

const PACKAGES = [
  {
    name: "Real Estate Showcase",
    price: "€250 flat",
    points: ["1–2 min property film", "3–5 aerials included (if permitted)"],
    note: "Perfect for listings, Airbnbs and developer reveals.",
  },
  {
    name: "Local Business Promo",
    price: "€150–180",
    points: ["30–60s edit", "9:16 + 16:9 deliverables", "1x revision"],
    note: "Designed to perform on Instagram & TikTok.",
  },
  {
    name: "Construction Progress",
    price: "from €100 / month",
    points: [
      "5–10 consistent angles",
      "Optional 15–30s monthly edit",
      "Shareable update link",
      "Quarterly recap",
    ],
    note: "Keep stakeholders aligned with zero friction.",
  },
];

const FAQ = [
  {
    q: "Where are you based?",
    a: "Paphos / Cyprus, available island-wide and for travel.",
  },
  {
    q: "What do you deliver?",
    a: "Reels-ready cuts (9:16 + 16:9).",
  },
  { q: "Do you fly drones?", a: "Yes — subject to weather and permissions." },
  {
    q: "How do bookings work?",
    a: "Simple agreement + deposit to secure your date; balance on delivery.",
  },
  {
    q: "Turnaround times?",
    a: "Promos 7–10 days; real estate 2–3 days.",
  },
  {
    q: "Can you work with agencies?",
    a: "Absolutely. White-label or subcontract with clear deliverables.",
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 bg-white text-black backdrop-blur border-b">
        <Section className="flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-2">
            <img
              src="/VoithoLOGOv2blk.png"
              alt="Voithó by RGH"
              className="h-45 w-40"
            />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm hover:underline"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
            >
              Get a Quote
            </a>
          </nav>
        </Section>
      </header>

      {/* HERO */}
      <section
        id="top"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Video (bottom layer) */}
        <iframe
          src="https://player.vimeo.com/video/1120673066?autoplay=1&muted=1&loop=1&background=1"
          className="absolute inset-0 w-full h-full scale-125 z-0"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          title="Voithó Showreel"
        ></iframe>

        {/* One LIGHT overlay for readability (middle layer) */}
        <div className="absolute inset-0 z-10 bg-black/30"></div>

        {/* Content (top layer) */}
        <Section className="relative z-20 py-16 sm:py-24">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.1]">
              Cinematic films for{" "}
              <span className="underline decoration-white/40 decoration-4 underline-offset-8"></span>
              ,brands & beautiful spaces.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85">
              Calm presence. Clean sound. Elegant color. Deliverables that
              perform on social.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
              >
                Check availability
              </a>
              <a
                href="#portfolio"
                className="px-5 py-3 rounded-full border border-white/40 text-sm hover:border-white/70 transition"
              >
                Watch portfolio
              </a>
            </div>
          </div>
        </Section>
      </section>

      {/* SERVICES */}
      <Section id="services" className="py-16">
        <Heading
          eyebrow="What I Do"
          title="Full-service freelance videography"
          subtitle="From intimate vows to aerial reveals — tailored films with a calm, professional approach."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-800 p-5 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{s.icon}</span>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <span className="ml-auto text-xs rounded-full bg-gray-800 border border-gray-700 px-2 py-1">
                  {s.tag}
                </span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{s.desc}</p>
              <ul className="space-y-2 text-sm">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    ✅ {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* PACKAGES */}
      <div className="bg-gray-100 border-y border-gray-800 text-black">
        <Section id="packages" className="py-16">
          <Heading
            eyebrow="Rates"
            title="Simple, transparent packages"
            subtitle="Every project is scoped clearly with deliverables, timelines, and licensing."
          />
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
            {PACKAGES.map((pkg, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-300 p-5 bg-white text-black"
              >
                <div className="text-xl font-semibold">{pkg.name}</div>
                <div className="font-semibold mt-1">{pkg.price}</div>
                <ul className="space-y-2 text-sm my-4">
                  {pkg.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2">
                      ✅ {pt}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-600">{pkg.note}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* FAQ */}
      <Section id="faq" className="py-16">
        <Heading eyebrow="Good to know" title="FAQs" />
        <div className="grid md:grid-cols-2 gap-6">
          {FAQ.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-800 p-5 bg-black"
            >
              <h3 className="font-medium">{f.q}</h3>
              <p className="text-sm text-gray-300 mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <div className="bg-gray-900 border-y border-gray-800">
        <Section id="contact" className="py-16">
          <Heading
            eyebrow="Let’s talk"
            title="Check my availability"
            subtitle="Tell me a little about your project and preferred date(s). I’ll reply with a tailored quote."
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <form className="rounded-2xl border border-gray-700 p-6 bg-black space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  placeholder="Your name"
                />
                <input
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <textarea
                className="w-full border rounded-lg px-3 py-2 text-black"
                rows="5"
                placeholder="Tell me about your vision…"
              />
              <button
                className="w-full px-4 py-2 rounded-lg bg-white text-black text-sm hover:bg-gray-200"
                type="button"
              >
                Send enquiry
              </button>
            </form>
            <div className="rounded-2xl border border-gray-700 p-6 bg-black space-y-4 text-sm">
              <div>📍 Paphos, Cyprus</div>
              <div>✉️ info@voithobyrgh</div>
              <a
                className="underline"
                href="https://instagram.com/voithobyrgh"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </Section>
      </div>

      {/* FOOTER */}
      <footer className="py-10">
        <Section className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Left: Logo + copyright */}
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

          {/* Right: Quick links */}
          <div className="flex items-center gap-3 text-gray-300">
            <a href="#services" className="hover:underline">
              Services
            </a>
            <a href="#packages" className="hover:underline">
              Packages
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </Section>
      </footer>
    </div>
  );
}
