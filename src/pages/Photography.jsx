// src/pages/Photography.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

/* ========== Auto-import Objects (CRA / react-scripts) ========== */
/**
 * Put files here:
 *   src/assets/objects/ROB05814.jpg
 *   src/assets/objects/...
 *
 * NOTE: Works in CRA because Webpack supports require.context.
 */
function importAll(ctx) {
  return ctx
    .keys()
    .sort()
    .map((k) => {
      const mod = ctx(k);
      return mod?.default ?? mod; // support both module formats
    });
}

const OBJECTS_IMAGES = importAll(
  require.context("../assets/objects", false, /\.(jpe?g|png|webp)$/)
);

/* ========== Local Shared UI (standalone) ========== */
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
    <div className="text-center max-w-3xl mx-auto">
      {eyebrow && (
        <div className="mb-2 inline-block text-xs font-semibold tracking-wide bg-gray-100 border rounded-full px-3 py-1 text-black">
          {eyebrow}
        </div>
      )}
      <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-gray-300 mt-4 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

/* ========== Content Data ========== */
const PLACEHOLDER_COUNT = 8;

const PEOPLE_IMAGES = [
  "/photos/people/ROB00675.jpg",
  "/photos/people/ROB09388.jpg",
  "/photos/people/ROB00688.jpg",
  "/photos/people/ROB04863.jpg",
];

const SPACES_IMAGES = [
  "/photos/spaces/lchateau-drone-01.png",
  "/photos/spaces/lchateau-drone-02.png",
];

const PHOTO_SECTIONS = [
  {
    id: "people",
    title: "People",
    subtitle:
      "Portraits that feel cinematic, natural, and considered — never stiff or overworked.",
    description:
      "For founders, creatives, and couples who want to look confident without looking posed. I direct just enough to keep everything clean and intentional, then let real moments do the work. The focus is expression, posture, and light — so the result feels effortless, not engineered.",
    bullets: [
      "Subtle direction that removes awkwardness fast",
      "Clean, flattering light with an editorial finish",
      "Personal branding, lifestyle, events, and couples",
      "Curated delivery — quality over quantity",
    ],
    deliverables:
      "A refined set ready for websites, press, social media, and print — built to elevate how you’re perceived.",
    images: PEOPLE_IMAGES,
  },
  {
    id: "spaces",
    title: "Spaces",
    subtitle:
      "Architecture and interiors photographed to communicate atmosphere and value.",
    description:
      "For venues, hospitality, and property brands that need images that feel calm, premium, and intentional. I focus on how light shapes the space, how materials read on camera, and how composition communicates scale — with clean lines and minimal distortion.",
    bullets: [
      "Straight verticals and balanced compositions",
      "Detail frames that sell texture and finish",
      "Consistent colour and tone across the full set",
      "Built for websites, listings, brochures, and press",
    ],
    deliverables:
      "A cohesive gallery that makes the space feel worth the price before anyone steps inside.",
    images: SPACES_IMAGES,
  },
  {
    id: "objects",
    title: "Objects",
    subtitle:
      "Product and automotive photography built around form, material, and desire.",
    description:
      "For brands, makers, and collectors who care about perception. This is controlled, detail-driven photography — shaping reflections, isolating form, and highlighting finish so quality is immediately understood. Especially suited to automotive details and crafted products.",
    bullets: [
      "Controlled highlights and clean reflections",
      "Detail-led frames that signal craftsmanship",
      "Consistent angles for collections and campaigns",
      "Ideal for product launches and premium brands",
    ],
    deliverables:
      "Images that make the object feel premium and remove hesitation from the buyer.",
    images: OBJECTS_IMAGES,
  },
];

/* ========== Motion Variants ========== */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const sectionStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const overlayMotion = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalMotion = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: 10 },
};

/* ========== Cards ========== */
function PlaceholderCard({ label }) {
  return (
    <motion.div
      variants={cardItem}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
    >
      <div className="aspect-[4/5] w-full" />
      <motion.div
        className="absolute inset-0 opacity-40"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-3 right-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="truncate">{label}</span>
        </div>
      </div>
    </motion.div>
  );
}

function PhotoCard({ src, onOpen }) {
  return (
    <motion.button
      type="button"
      variants={cardItem}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.01 }}
      onClick={onOpen}
      className="group relative overflow-hidden rounded-2xl border border-gray-800 bg-white/5 text-left w-full"
      aria-label="Open image"
    >
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img
          src={src}
          alt=""
          loading="lazy"
          className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="pointer-events-none absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] text-white/80 backdrop-blur">
          Click to expand
        </div>
      </div>
    </motion.button>
  );
}

/* ========== Lightbox (swipe + keyboard) ========== */
function Lightbox({ isOpen, images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const current = images?.[index];

  return (
    <AnimatePresence>
      {isOpen && current?.src && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-8"
          variants={overlayMotion}
          initial="hidden"
          animate="show"
          exit="exit"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-black/70 text-white/90 px-3 py-2 text-sm hover:bg-black/90 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Left/Right (desktop) */}
          <div className="hidden sm:flex absolute left-4 z-20">
            <button
              type="button"
              onClick={onPrev}
              className="rounded-full border border-white/15 bg-black/60 text-white/90 px-3 py-2 text-sm hover:bg-black/85 transition"
              aria-label="Previous image"
            >
              ←
            </button>
          </div>
          <div className="hidden sm:flex absolute right-4 z-20">
            <button
              type="button"
              onClick={onNext}
              className="rounded-full border border-white/15 bg-black/60 text-white/90 px-3 py-2 text-sm hover:bg-black/85 transition"
              aria-label="Next image"
            >
              →
            </button>
          </div>

          {/* Image */}
          <motion.div
            className="relative z-10 w-full max-w-6xl"
            variants={modalMotion}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
              <motion.div
                key={current.src}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragEnd={(_, info) => {
                  const swipePower = Math.abs(info.offset.x) * info.velocity.x;
                  if (swipePower < -5000) onNext();
                  else if (swipePower > 5000) onPrev();
                }}
                whileTap={{ cursor: "grabbing" }}
                className="cursor-grab"
              >
                <img
                  src={current.src}
                  alt=""
                  className="block w-full h-auto max-h-[85vh] object-contain select-none"
                  draggable="false"
                />
              </motion.div>
            </div>

            <div className="sm:hidden mt-3 text-center text-xs text-white/55">
              Swipe left/right • Tap outside to close
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ========== Page ========== */
export default function Photography() {
  const [showAllObjects, setShowAllObjects] = useState(false);

  const visibleSections = useMemo(() => {
    return PHOTO_SECTIONS.map((sec) => {
      if (sec.id !== "objects") return sec;

      const limit = 16;
      const visible = showAllObjects ? sec.images : sec.images.slice(0, limit);

      return { ...sec, images: visible };
    });
  }, [showAllObjects]);

  const lightboxImages = useMemo(() => {
    const out = [];
    visibleSections.forEach((sec) => {
      (sec.images || []).forEach((src) => out.push({ src }));
    });
    return out;
  }, [visibleSections]);

  const indexMap = useMemo(() => {
    const m = new Map();
    let global = 0;
    visibleSections.forEach((sec) => {
      (sec.images || []).forEach((_, i) => {
        m.set(`${sec.id}:${i}`, global++);
      });
    });
    return m;
  }, [visibleSections]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openFromSection = (sectionId, indexInSection) => {
    const globalIndex = indexMap.get(`${sectionId}:${indexInSection}`);
    if (globalIndex == null) return;
    setActiveIndex(globalIndex);
    setLightboxOpen(true);
  };

  const close = () => setLightboxOpen(false);

  const prev = () => {
    if (!lightboxImages.length) return;
    setActiveIndex(
      (i) => (i - 1 + lightboxImages.length) % lightboxImages.length
    );
  };

  const next = () => {
    if (!lightboxImages.length) return;
    setActiveIndex((i) => (i + 1) % lightboxImages.length);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <Lightbox
        isOpen={lightboxOpen}
        images={lightboxImages}
        index={activeIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-black to-black" />
        <Section className="relative py-16 sm:py-20">
          <motion.div initial="hidden" animate="show" variants={sectionStagger}>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Heading
                eyebrow="Photography"
                title="Editorial Photography"
                subtitle="People, spaces, and objects — composed with intent and finished with restraint."
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              <a
                href="#people"
                className="px-5 py-3 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
              >
                View People
              </a>
              <a
                href="#spaces"
                className="px-5 py-3 rounded-full border border-white/25 text-white text-sm hover:bg-white/10 transition"
              >
                View Spaces
              </a>
              <a
                href="#objects"
                className="px-5 py-3 rounded-full border border-white/25 text-white text-sm hover:bg-white/10 transition"
              >
                View Objects
              </a>
            </motion.div>
          </motion.div>
        </Section>
      </section>

      {/* SECTIONS */}
      <Section className="py-10 sm:py-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionStagger}
          className="space-y-20 sm:space-y-28"
        >
          {visibleSections.map((sec) => (
            <motion.section
              key={sec.id}
              id={sec.id}
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header row (mobile stacks by default) */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
                <div className="max-w-2xl min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                    {sec.title}
                  </h2>

                  <p className="text-gray-300 mt-2 leading-relaxed">
                    {sec.subtitle}
                  </p>

                  {sec.description && (
                    <p className="text-gray-400 mt-4 leading-relaxed">
                      {sec.description}
                    </p>
                  )}

                  {sec.bullets?.length ? (
                    <ul className="mt-4 space-y-2 text-sm text-gray-300">
                      {sec.bullets.map((b, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
                          <span className="text-gray-300 leading-relaxed">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {sec.deliverables && (
                    <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                      <span className="text-gray-200 font-medium">
                        Outcome:
                      </span>{" "}
                      {sec.deliverables}
                    </p>
                  )}
                </div>

                {/* CTA (wrap on mobile; align right on desktop) */}
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <a
                    href="/#contact"
                    className="px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-200 hover:bg-white/10 transition"
                  >
                    Enquire
                  </a>
                  <a
                    href="/#contact"
                    className="px-4 py-2 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
                  >
                    Get a quote
                  </a>
                </div>
              </div>

              {/* Objects toggle */}
              {sec.id === "objects" && (
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="text-sm text-gray-400">
                    Showing{" "}
                    <span className="text-gray-200 font-medium">
                      {showAllObjects
                        ? OBJECTS_IMAGES.length
                        : Math.min(16, OBJECTS_IMAGES.length)}
                    </span>{" "}
                    of{" "}
                    <span className="text-gray-200 font-medium">
                      {OBJECTS_IMAGES.length}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAllObjects((v) => !v)}
                    className="px-4 py-2 rounded-full border border-gray-700 text-sm text-gray-200 hover:bg-white/10 transition w-fit"
                  >
                    {showAllObjects ? "Show less" : "View full set"}
                  </button>
                </div>
              )}

              {/* Grid */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                variants={gridStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
              >
                {sec.images?.length
                  ? sec.images.map((src, i) => (
                      <PhotoCard
                        key={`${sec.id}-${i}`}
                        src={src}
                        onOpen={() => openFromSection(sec.id, i)}
                      />
                    ))
                  : Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                      <PlaceholderCard
                        key={`${sec.id}-${i}`}
                        label={`${sec.title} placeholder ${i + 1}`}
                      />
                    ))}
              </motion.div>

              {/* Bottom helper row (stack on mobile to prevent overflow) */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50">
                <span className="leading-relaxed">
                  Need something specific? Tell me what you’re building.
                </span>
                <Link
                  to="/portfolio"
                  className="hover:text-white transition self-start sm:self-auto whitespace-nowrap"
                >
                  View full portfolio →
                </Link>
              </div>
            </motion.section>
          ))}
        </motion.div>
      </Section>

      {/* CTA */}
      <div className="border-t border-gray-900 bg-white/5">
        <Section className="py-14 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-3xl border border-gray-800 bg-black p-8 sm:p-10 text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Ready to shoot something intentional?
            </h3>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
              Tell me what you’re building and what you want it to feel like.
              I’ll reply with a tight plan and a quote.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="/#contact"
                className="px-6 py-3 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition"
              >
                Check availability
              </a>
              <Link
                to="/"
                className="px-6 py-3 rounded-full border border-white/25 text-white text-sm hover:bg-white/10 transition"
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </Section>
      </div>
    </main>
  );
}
