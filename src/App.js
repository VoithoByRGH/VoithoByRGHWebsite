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

/**
 * Typography rules:
 * - font-display (Cormorant Garamond): hero + section titles + featured titles
 * - font-sans (Inter): everything else (readability)
 */
function Heading({ eyebrow, title, subtitle, align = "center" }) {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";

  return (
    <div className={`max-w-3xl mx-auto mb-10 flex flex-col ${alignment}`}>
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-black">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-4 text-sm sm:text-base text-white/75">{subtitle}</p>
      ) : null}
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.65, ease: "easeOut" },
};

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
    bullets: ["Web, social & print-ready delivery"],
    tag: "Editorial",
  },
  {
    title: "Custom Projects",
    desc: "Not seeing your project listed? From events to brand storytelling and beyond — tailored to your exact vision.",
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
      return;
    }
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = target;
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
    }, 60);
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(
    () => [
      { type: "route", to: "/photography", label: "Photography" },
      { type: "route", to: "/portfolio", label: "Portfolio" },
      { type: "anchor", hash: "#faq", label: "FAQ" },
      { type: "anchor", hash: "#contact", label: "Contact" },
    ],
    []
  );

  const closeMenu = () => setMenuOpen(false);

  const handleAnchor = (hash) => {
    closeMenu();
    goToAnchor(hash);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Keep it OFF unless you’ve rebuilt it to not tank performance */}
      <SnowOverlay enabled={false} count={28} />

      <header
        className={`sticky top-0 z-30 border-b transition-all duration-300 ${
          scrolled
            ? "bg-white/95 text-black shadow-[0_6px_20px_rgba(0,0,0,0.10)] backdrop-blur"
            : "bg-white text-black"
        }`}
      >
        <Section
          className={`flex items-center justify-between ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img
              src="/VoithoLOGOv2blk.png"
              alt="Voithó by RGH"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.type === "route" ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm hover:underline ${isActive ? "underline" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <button
                  key={item.hash}
                  type="button"
                  className="text-sm hover:underline"
                  onClick={() => handleAnchor(item.hash)}
                >
                  {item.label}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => handleAnchor("#contact")}
              className="px-4 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800"
            >
              Check availability
            </button>
          </nav>

          {/* Mobile toggle */}
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

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden border-t border-black/10 bg-white/95 transition-all duration-300 ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-3 pb-4 flex flex-col gap-3 text-sm">
            {navItems.map((item) =>
              item.type === "route" ? (
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
              ) : (
                <button
                  key={item.hash}
                  type="button"
                  className="py-1 text-left"
                  onClick={() => handleAnchor(item.hash)}
                >
                  {item.label}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() => handleAnchor("#contact")}
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
            <span className="text-white/55">
              © {new Date().getFullYear()} VoithóByRGH. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/70">
            <button
              type="button"
              onClick={() => handleAnchor("#services")}
              className="hover:underline"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => handleAnchor("#contact")}
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

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

        <Section className="relative z-20 py-16 sm:py-24 !max-w-none !mx-0">
          <motion.div
            className="max-w-3xl text-center sm:text-left px-6 sm:pl-12 mt-12 sm:mt-20"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.02]">
              Timeless Photography
              <span className="block"> & Cinematic Films.</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-white/80 max-w-xl">
              A visual storytelling studio for brands, people, and beautiful
              spaces — built for modern web and social.
            </p>

            <div className="mt-10 flex flex-wrap justify-center sm:justify-start gap-3">
              <a
                href="#contact"
                className="px-5 py-3 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
              >
                Check availability
              </a>
              <Link
                to="/portfolio"
                className="px-5 py-3 rounded-full border border-white/25 text-white text-sm hover:bg-white/10 transition"
              >
                View portfolio
              </Link>
            </div>
          </motion.div>
        </Section>
      </section>

      {/* SERVICES */}
      <Section id="services" className="py-16">
        <h2 className="sr-only">Services</h2>

        <motion.div {...fadeUp}>
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
                hidden: { opacity: 0, y: 26 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.07] transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-display text-xl tracking-tight leading-tight">
                  {s.title}
                </h3>
                <span className="ml-auto text-[11px] rounded-full bg-white/10 border border-white/10 px-2 py-1 text-white/80">
                  {s.tag}
                </span>
              </div>

              <p className="text-sm text-white/70 mb-4">{s.desc}</p>

              <ul className="space-y-2 text-sm text-white/80">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="py-16">
        <motion.div {...fadeUp}>
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
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="font-display text-xl tracking-tight">{f.q}</h3>
              <p className="text-sm text-white/70 mt-2">{f.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* CONTACT */}
      <div className="bg-white text-black border-y border-gray-200">
        <Section id="contact" className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <div className="text-center max-w-3xl mx-auto mb-10">
              <div className="mb-3 inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[11px] font-semibold tracking-wide text-black">
                Let’s talk
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
                Check availability
              </h2>
              <p className="mt-4 text-sm sm:text-base text-black/70">
                Tell me a little about your project and preferred date(s). I’ll
                reply with a tailored quote.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-6 mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="rounded-2xl border border-black/10 bg-black text-white shadow-[0_12px_40px_rgba(0,0,0,0.22)] p-6"
            >
              <ContactForm />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="rounded-2xl border border-black/10 bg-black text-white shadow-[0_12px_40px_rgba(0,0,0,0.22)] p-6 space-y-4 text-sm"
            >
              <div className="font-display text-2xl tracking-tight">
                VoithóByRGH
              </div>
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
        <motion.div {...fadeUp}>
          <Heading eyebrow="Work" title="Portfolio" />
        </motion.div>

        <motion.div
          className="grid gap-12 lg:grid-cols-2 mt-12"
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
                hidden: { opacity: 0, y: 26 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.005 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition p-6 flex flex-col items-center"
            >
              {p.logo ? (
                <div className="mb-6">
                  <img
                    src={p.logo}
                    alt={`${p.title} logo`}
                    className="h-20 w-auto mx-auto"
                  />
                </div>
              ) : null}

              {p.kind === "video" ? (
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
              ) : null}

              <h3 className="font-display text-3xl tracking-tight mb-2 text-center">
                {p.title}
              </h3>
              {p.description ? (
                <p className="text-white/70 text-center">{p.description}</p>
              ) : null}
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
          className="w-full border border-white/15 bg-white text-black rounded-lg px-3 py-2"
          placeholder="Your name"
          required
        />
        <input
          name="email"
          className="w-full border border-white/15 bg-white text-black rounded-lg px-3 py-2"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <textarea
        name="message"
        className="w-full border border-white/15 bg-white text-black rounded-lg px-3 py-2"
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
