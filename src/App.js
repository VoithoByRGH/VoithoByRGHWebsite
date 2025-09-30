// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

/* ========== Shared UI ========== */
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

/* ========== Data ========== */
const NAV = [
  { href: "#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio", comingSoon: false }, // now LIVE
  { href: "#packages", label: "Packages" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: "",
    title: "Aerial / Drone",
    desc: "Beautiful, stable aerials for property, tourism, and social assets.",
    bullets: ["3–5 hero shots", "Reels-ready clips", "Construction progress"],
    tag: "Aerial",
  },
  {
    icon: "",
    title: "Real Estate",
    desc: "Fast-turnaround property walk-throughs and reels that convert viewings.",
    bullets: ["1–2 minute showcase", "Drone add-on", "Photo bundles"],
    tag: "Property",
  },
  {
    icon: "",
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
    icon: "",
    title: "Local Business Promos",
    desc: "Snackable promos for cafes, gyms, schools, and brands — designed for social impact.",
    bullets: ["30–60s edits", "9:16 + 16:9 delivery", "On-brand music"],
    tag: "Social",
  },
  {
    icon: "",
    title: "Custom Projects",
    desc: "Not seeing your project listed? From events to brand storytelling and beyond — I can tailor a film to match your exact vision.",
    bullets: [
      "Flexible scope",
      "Tailored deliverables",
      "Email to arrange details",
    ],
    tag: "Custom",
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
  {
    name: "Custom Projects",
    price: "Email for quote",
    points: [
      "Tailored to your vision",
      "Flexible scope and style",
      "Available for brands, events & more",
    ],
    note: "Get in touch with your ideas and we’ll create a package that fits.",
  },
];

const FAQ = [
  {
    q: "Where are you based?",
    a: "Paphos / Cyprus, available island-wide and for travel.",
  },
  { q: "What do you deliver?", a: "Reels-ready cuts (9:16 + 16:9)." },
  { q: "Do you fly drones?", a: "Yes — subject to weather and permissions." },
  {
    q: "How do bookings work?",
    a: "Simple agreement + deposit to secure your date; balance on delivery.",
  },
  { q: "Turnaround times?", a: "Promos 7–10 days; real estate 2–3 days." },
  {
    q: "Can you work with agencies?",
    a: "Absolutely. White-label or subcontract with clear deliverables.",
  },
];

/* ========== Home Page ========== */
function Home() {
  // --- Netlify AJAX helpers ---
  const encode = (data) => new URLSearchParams(data).toString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      "form-name": form.getAttribute("name"),
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (res.ok) {
        form.reset();
        alert("Thank you! Your enquiry has been sent.");
      } else {
        alert("Oops! There was a problem submitting your enquiry.");
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };
  // ----------------------------

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
            {NAV.map((item) => {
              const isRoute = item.href.startsWith("/");
              return (
                <div key={item.href} className="flex items-center gap-1">
                  {isRoute ? (
                    <Link to={item.href} className="text-sm hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className="text-sm hover:underline">
                      {item.label}
                    </a>
                  )}
                  {item.comingSoon && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black text-white border border-white/60 select-none">
                      ★ Coming Soon
                    </span>
                  )}
                </div>
              );
            })}
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
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            title="vimeo-background"
            src="https://player.vimeo.com/video/1120984476?h=9a5b713a23&background=1&autoplay=1&muted=1&loop=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="vimeo-cover"
            style={{ pointerEvents: "none" }}
          />
        </div>

        {/* Light overlay */}
        <div className="absolute inset-0 z-10 bg-black/30" />

        {/* Content */}
        <Section className="relative z-20 py-16 sm:py-24 !max-w-none !mx-0">
          <div className="max-w-3xl text-center sm:text-left px-6 sm:pl-12 mt-10 sm:mt-20">
            <h1 className="font-display text-4xl sm:text-6xl leading-[1.1]">
              Cinematic films for brands & beautiful spaces.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85">
              Calm presence. Clean sound. Elegant color. Deliverables that
              perform on social.
            </p>
            <div className="mt-10 flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
              >
                Check availability
              </a>
            </div>
          </div>
        </Section>
      </section>

      {/* SERVICES */}
      <Section id="services" className="py-16">
        <h2 className="sr-only">Cyprus Videographer Services</h2>
        <Heading
          eyebrow="What I Do"
          title="Full-service freelance videography"
          subtitle="From dynamic brand stories to property showcases — tailored films with a calm, professional touch."
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
                    {b}
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
                      {pt}
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
      <div className="bg-black-900 border-y border-gray-800">
        <Section id="contact" className="py-16">
          <Heading
            eyebrow="Let’s talk"
            title="Check my availability"
            subtitle="Tell me a little about your project and preferred date(s). I’ll reply with a tailored quote."
          />
          <div className="grid lg:grid-cols-2 gap-6">
            <ContactForm />
            <div className="rounded-2xl border border-gray-700 p-6 bg-black space-y-4 text-sm">
              <div>📍 Paphos, Cyprus</div>
              <div>✉️ info@voithobyrgh.com</div>
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

function ContactForm() {
  // extracted to keep Home lean; uses same handler as above via HTML form submit
  const encode = (data) => new URLSearchParams(data).toString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      "form-name": form.getAttribute("name"),
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload),
      });
      if (res.ok) {
        form.reset();
        alert("Thank you! Your enquiry has been sent.");
      } else {
        alert("Oops! There was a problem submitting your enquiry.");
      }
    } catch (err) {
      alert("Error: " + err);
    }
  };

  return (
    <form
      name="enquiry"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="rounded-2xl border border-gray-700 p-6 bg-black space-y-4"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="enquiry" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          className="w-full border rounded-lg px-3 py-2 text-black"
          placeholder="Your name"
          required
        />
        <input
          name="email"
          className="w-full border rounded-lg px-3 py-2 text-black"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <textarea
        name="message"
        className="w-full border rounded-lg px-3 py-2 text-black"
        rows={5}
        placeholder="Tell me about your vision…"
        required
      />
      <button
        className="w-full px-4 py-2 rounded-lg bg-white text-black text-sm hover:bg-gray-200"
        type="submit"
      >
        Send enquiry
      </button>
    </form>
  );
}

/* ========== Portfolio Page (/portfolio) ========== */
function Portfolio() {
  const projects = [
    {
      kind: "video",
      title: "Pizel DJ — Promo",
      description:
        "6:19 Promo featuring Pizel. Perfect for Instagram,TikTok & Reels",
      embedUrl:
        "https://player.vimeo.com/video/1123116001?title=0&byline=0&portrait=0&playsinline=1",
      logo: "/Pizellogo.png", // 👈 put your Pizellogo.png in /public
    },
    {
      kind: "placeholder",
      title: "More projects coming soon",
      description:
        "I’m curating a tight selection of films — check back shortly.",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="bg-white text-black border-b">
        <Section className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Go Home">
            <img
              src="/VoithoLOGOv2blk.png"
              alt="Voithó by RGH"
              className="h-45 w-40"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:underline">
              Home
            </Link>
            <a
              href="https://instagram.com/voithobyrgh"
              target="_blank"
              rel="noreferrer"
              className="text-sm hover:underline"
            >
              Instagram
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

      {/* Portfolio content */}
      <section className="relative flex-1 flex flex-col py-16">
        <Section>
          <Heading eyebrow="Work" title="Portfolio" />

          <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 mt-12">
            {projects.map((p, i) => (
              <div
                key={i}
                className="bg-white/5 border border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition p-6 flex flex-col items-center"
              >
                {/* LOGO */}
                {p.logo && (
                  <div className="mb-6">
                    <img
                      src={p.logo}
                      alt={`${p.title} logo`}
                      className="h-20 w-auto mx-auto"
                    />
                  </div>
                )}

                {/* VIDEO */}
                {p.kind === "video" && (
                  <div className="relative w-full h-[500px] rounded-lg overflow-hidden mb-6">
                    <iframe
                      title={p.title}
                      src={p.embedUrl}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* TEXT */}
                <h3 className="text-2xl font-semibold mb-2 text-center">
                  {p.title}
                </h3>
                {p.description && (
                  <p className="text-gray-400 text-center">{p.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <Section className="flex items-center justify-between gap-4 text-sm">
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
          <div className="flex items-center gap-3 text-gray-300">
            <Link to="/" className="hover:underline">
              Back to Home
            </Link>
          </div>
        </Section>
      </footer>
    </main>
  );
}

/* ========== Router Shell ========== */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </BrowserRouter>
  );
}
