// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  { href: "/portfolio", label: "Portfolio", comingSoon: false },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <header
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/95 text-black shadow-[0_6px_20px_rgba(0,0,0,0.10)] backdrop-blur"
            : "bg-white text-black"
        }`}
      >
        <Section
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
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
              Check availability
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

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

        {/* Content */}
        <Section className="relative z-20 py-16 sm:py-24 !max-w-none !mx-0">
          <motion.div
            className="max-w-3xl text-center sm:text-left px-6 sm:pl-12 mt-10 sm:mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
              Cinematic films for brands & beautiful spaces.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85">
              Calm presence. Clean sound. Elegant color. Deliverables that
              perform on social.
            </p>
            <motion.div
              className="mt-10 flex flex-wrap justify-center sm:justify-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
              >
                Check availability
              </a>
            </motion.div>
          </motion.div>
        </Section>
      </section>

      {/* SERVICES */}
      <Section id="services" className="py-16">
        <h2 className="sr-only">Cyprus Videographer Services</h2>

        {/* Animated heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            eyebrow="What I Do"
            title="Full-service freelance videography"
            subtitle="From dynamic brand stories to property showcases — tailored films with a calm, professional touch."
          />
        </motion.div>

        {/* Animated cards with stagger */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.02 }}
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
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-16">
        {/* Animated heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading eyebrow="Good to know" title="FAQs" />
        </motion.div>

        {/* Animated FAQ cards with stagger */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {FAQ.map((f, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="rounded-2xl border border-gray-800 p-5 bg-black"
            >
              <h3 className="font-medium">{f.q}</h3>
              <p className="text-sm text-gray-300 mt-2">{f.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CONTACT */}
      <div className="bg-white text-black border-y border-gray-200">
        <Section id="contact" className="py-16">
          {/* Animated heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Heading
              eyebrow="Let’s talk"
              title="Check availability"
              subtitle="Tell me a little about your project and preferred date(s). I’ll reply with a tailored quote."
            />
          </motion.div>

          {/* Grid with staggered children */}
          <motion.div
            className="grid lg:grid-cols-2 gap-6 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {/* FORM card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{
                y: -4,
                scale: 1.01,
                boxShadow: "0 0 28px rgba(0,0,0,0.3)",
              }}
              className="
                rounded-2xl
                border border-gray-700
                bg-black
                text-white
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                ring-1 ring-black/20
                p-6
              "
            >
              <ContactForm />
            </motion.div>

            {/* INFO card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              whileHover={{
                y: -3,
                scale: 1.01,
                boxShadow: "0 0 24px rgba(0,0,0,0.28)",
              }}
              className="
                rounded-2xl
                border border-gray-700
                bg-black
                text-white
                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                ring-1 ring-black/20
                p-6
                space-y-4
                text-sm
              "
            >
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
            </motion.div>
          </motion.div>
        </Section>
      </div>

      {/* FOOTER */}
      <footer className="py-10 bg-gradient-to-t from-black via-black to-black/90">
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
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </Section>
      </footer>
    </div>
  );
}

/* ========== Contact Form ========== */
function ContactForm() {
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
      className="space-y-4"
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
      logo: "/Pizellogo.png",
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
              Check availability
            </a>
          </nav>
        </Section>
      </header>

      {/* Portfolio content */}
      <section className="relative flex-1 flex flex-col py-16">
        <Section>
          {/* Animated heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Heading eyebrow="Work" title="Portfolio" />
          </motion.div>

          {/* Animated grid */}
          <motion.div
            className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -3, scale: 1.005 }}
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
              </motion.div>
            ))}
          </motion.div>
        </Section>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gradient-to-t from-black via-black to-black/90">
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
