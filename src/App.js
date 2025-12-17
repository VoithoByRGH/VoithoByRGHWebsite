// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import SnowOverlay from "./components/SnowOverlay";
import Photography from "./pages/Photography";

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
const SERVICES = [
  {
    title: "Aerial / Drone",
    desc: "Beautiful, stable aerials for property, tourism, and social assets.",
    bullets: ["3–5 hero shots", "Reels-ready clips", "Construction progress"],
    tag: "Aerial",
  },
  {
    title: "Real Estate",
    desc: "Fast-turnaround property walk-throughs and reels that convert viewings.",
    bullets: ["1–2 minute showcase", "Drone add-on", "Photo bundles"],
    tag: "Property",
  },
  {
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
    title: "Local Business Promos",
    desc: "Snackable promos for cafes, gyms, schools, and brands — designed for social impact.",
    bullets: ["30–60s edits", "9:16 + 16:9 delivery", "On-brand music"],
    tag: "Social",
  },
  {
    title: "Photography",
    desc: "Editorial-style photography for brands, people, and automotive — composed with intent and finished with restraint.",
    bullets: [
      "20–40 carefully edited images",
      "Web, social & print-ready delivery",
    ],
    tag: "Editorial",
  },
  {
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

/* ========== Anchor Routing Helpers ========== */
function useAnchorNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToAnchor = (hash) => {
    const target = hash?.startsWith("#") ? hash : `#${hash}`;
    if (location.pathname !== "/") {
      navigate(`/${target}`);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = target;
    }
  };

  return { goToAnchor };
}

function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, [hash]);

  return null;
}

/* ========== Layout (Shared Navbar + Footer) ========== */
function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { goToAnchor } = useAnchorNavigation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navItems = useMemo(
    () => [
      { type: "route", to: "/photography", label: "Photography" },
      { type: "route", to: "/portfolio", label: "Portfolio" },
      { type: "anchor", hash: "#faq", label: "FAQ" },
      { type: "anchor", hash: "#contact", label: "Contact" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <SnowOverlay enabled={false} count={28} />
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
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img
              src="/VoithoLOGOv2blk.png"
              alt="Voithó by RGH"
              className="h-45 w-40"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              if (item.type === "route") {
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `text-sm hover:underline ${isActive ? "underline" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }
              return (
                <button
                  key={item.hash}
                  type="button"
                  className="text-sm hover:underline"
                  onClick={() => {
                    closeMenu();
                    goToAnchor(item.hash);
                  }}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => goToAnchor("#contact")}
              className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800"
            >
              Check availability
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-between w-7 h-5"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span
              className={`h-[2px] w-full bg-black rounded transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full bg-black rounded transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-[2px] w-full bg-black rounded transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </Section>

        {/* Mobile dropdown */}
        <div
          className={`
            md:hidden overflow-hidden border-t border-black/10 bg-white/95
            transition-all duration-300
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-4 pt-3 pb-4 flex flex-col gap-3 text-sm">
            {navItems.map((item) => {
              if (item.type === "route") {
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `py-1 ${isActive ? "underline" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                );
              }
              return (
                <button
                  key={item.hash}
                  type="button"
                  className="py-1 text-left"
                  onClick={() => {
                    closeMenu();
                    goToAnchor(item.hash);
                  }}
                >
                  {item.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                closeMenu();
                goToAnchor("#contact");
              }}
              className="mt-2 inline-flex justify-center px-4 py-2 rounded-full border border-black/30 text-sm"
            >
              Check availability
            </button>
          </div>
        </div>
      </header>

      {children}

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
            <button
              type="button"
              onClick={() => goToAnchor("#services")}
              className="hover:underline"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => goToAnchor("#contact")}
              className="hover:underline"
            >
              Contact
            </button>
          </div>
        </Section>
      </footer>
    </div>
  );
}

/* ========== Pages ========== */
function Home() {
  return (
    <>
      {/* HERO */}
      <section
        id="top"
        className="relative min-h-screen flex items-center overflow-hidden"
      >
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

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

        <Section className="relative z-20 py-16 sm:py-24 !max-w-none !mx-0">
          <motion.div
            className="max-w-3xl text-center sm:text-left px-6 sm:pl-12 mt-10 sm:mt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
              Timeless Photography & Cinematic films.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/85">
              A visual storytelling studio for brands, people, and beautiful
              spaces.
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
              <Link
                to="/portfolio"
                className="px-5 py-3 rounded-full border border-white/30 text-white text-sm hover:bg-white/10 transition"
              >
                View portfolio
              </Link>
            </motion.div>
          </motion.div>
        </Section>
      </section>

      {/* SERVICES */}
      <Section id="services" className="py-16">
        <h2 className="sr-only">Services</h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading
            eyebrow="What we do"
            title="Photography & Videography — built to perform"
            subtitle="Clean visuals, calm direction, and deliverables designed for web and social."
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading eyebrow="Good to know" title="FAQs" />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
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

          <motion.div
            className="grid lg:grid-cols-2 gap-6 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
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
              className="rounded-2xl border border-gray-700 bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/20 p-6"
            >
              <ContactForm />
            </motion.div>

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
              className="rounded-2xl border border-gray-700 bg-black text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/20 p-6 space-y-4 text-sm"
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
    </>
  );
}

function Portfolio() {
  const projects = [
    {
      kind: "video",
      title: "Pizel DJ — Promo",
      description:
        "6:19 Promo featuring Pizel. Perfect for Instagram, TikTok & Reels",
      embedUrl:
        "https://player.vimeo.com/video/1123116001?title=0&byline=0&portrait=0&playsinline=1",
      logo: "/Pizellogo.png",
    },
    {
      kind: "placeholder",
      title: "More projects coming soon",
      description:
        "I’m curating a tight selection of work — check back shortly.",
    },
  ];

  return (
    <main className="py-16">
      <Section>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Heading eyebrow="Work" title="Portfolio" />
        </motion.div>

        <motion.div
          className="grid gap-12 sm:grid-cols-1 lg:grid-cols-2 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
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
              {p.logo && (
                <div className="mb-6">
                  <img
                    src={p.logo}
                    alt={`${p.title} logo`}
                    className="h-20 w-auto mx-auto"
                  />
                </div>
              )}

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
    </main>
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

/* ========== Router Shell ========== */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
