import React, { useEffect, useMemo, useState } from "react";

type Flake = {
  id: string;
  left: number;      // vw
  size: number;      // px
  duration: number;  // s
  delay: number;     // s
  opacity: number;
  drift: number;     // px
};

function SnowflakeIcon({ size }: { size: number }) {
  // Minimal “luxury” flake: simple geometry, not a cartoon emoji ❄️
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M12 2v20" />
        <path d="M4 6l16 12" />
        <path d="M20 6L4 18" />
        <path d="M12 2l2 3M12 2l-2 3" />
        <path d="M12 22l2-3M12 22l-2-3" />
        <path d="M4 6l3 .5M4 6l1.5 2.5" />
        <path d="M20 6l-3 .5M20 6l-1.5 2.5" />
        <path d="M4 18l3-.5M4 18l1.5-2.5" />
        <path d="M20 18l-3-.5M20 18l-1.5-2.5" />
      </g>
    </svg>
  );
}

export default function SnowOverlay({
  enabled = true,
  count = 18, // keep it low for “luxury”
}: {
  enabled?: boolean;
  count?: number;
}) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const flakes: Flake[] = useMemo(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    return Array.from({ length: count }).map((_, i) => ({
      id: `flake-${i}-${Math.random().toString(16).slice(2)}`,
      left: rand(0, 100),
      size: rand(10, 22),
      duration: rand(14, 28),
      delay: rand(-20, 0),
      opacity: rand(0.08, 0.22),
      drift: rand(-30, 30),
    }));
  }, [count]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        pointerEvents: "none",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        mixBlendMode: "screen", // subtle lift on dark backgrounds
      }}
    >
      {/* soft overall haze (luxury vibe) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 55%)",
          filter: "blur(8px)",
          opacity: 0.45,
        }}
      />
      {flakes.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            top: "-10vh",
            left: `${f.left}vw`,
            opacity: f.opacity,
            color: "rgba(255,255,255,0.9)",
            filter: "blur(0.2px)",
            transform: `translateX(0px)`,
            animation: reduceMotion
              ? undefined
              : `snow-fall ${f.duration}s linear infinite`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <div
            style={{
              transform: `translateX(${f.drift}px)`,
              animation: reduceMotion
                ? undefined
                : `snow-sway ${Math.max(6, f.duration / 2)}s ease-in-out infinite alternate`,
            }}
          >
            <div
              style={{
                animation: reduceMotion
                  ? undefined
                  : `snow-spin ${Math.max(10, f.duration)}s linear infinite`,
              }}
            >
              <SnowflakeIcon size={f.size} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
