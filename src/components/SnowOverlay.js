import React, { useEffect, useMemo, useState } from "react";

function FlakeSVG({ size }) {
  // Simple, “luxury” geometry (not cartoon ❄️)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <path d="M12 2v20" />
        <path d="M4 6l16 12" />
        <path d="M20 6L4 18" />
        <path d="M12 2l2 3M12 2l-2 3" />
        <path d="M12 22l2-3M12 22l-2-3" />
      </g>
    </svg>
  );
}

export default function SnowOverlay({
  enabled = true,
  count = 22, // sane default (don’t go stupid)
  mobileCount = 10, // keep Vimeo smooth on phones
  maxWidthForMobile = 768,
}) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mm = window.matchMedia(`(max-width: ${maxWidthForMobile}px)`);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setIsMobile(!!mm.matches);
      setReduceMotion(!!rm.matches);
    };

    update();
    mm.addEventListener?.("change", update);
    rm.addEventListener?.("change", update);

    return () => {
      mm.removeEventListener?.("change", update);
      rm.removeEventListener?.("change", update);
    };
  }, [maxWidthForMobile]);

  const finalCount = isMobile ? mobileCount : count;

  const flakes = useMemo(() => {
    const rand = (min, max) => Math.random() * (max - min) + min;
    return Array.from({ length: finalCount }).map((_, i) => ({
      id: `flake-${i}-${Math.random().toString(16).slice(2)}`,
      left: rand(0, 100), // vw
      top: rand(-10, 100), // vh (start distributed so it never “disappears”)
      size: rand(14, 28), // more visible
      opacity: rand(0.18, 0.36), // more visible without looking cheap
      duration: rand(26, 52), // slower = luxury
      delay: rand(-80, 0), // pre-populated instantly
      sway: rand(6, 14), // px
      swayDur: rand(4.5, 9), // s
      spinDur: rand(10, 22), // s
    }));
  }, [finalCount]);

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

        // Important: keep compositor-friendly.
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {flakes.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.left}vw`,
            top: `${f.top}vh`,
            opacity: f.opacity,
            color: "rgba(255,255,255,1)",

            // GPU-friendly movement
            transform: "translate3d(0,0,0)",
            willChange: "transform",

            animation: reduceMotion
              ? "none"
              : `snow-fall ${f.duration}s linear infinite`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <div
            style={{
              transform: "translate3d(0,0,0)",
              willChange: "transform",
              animation: reduceMotion
                ? "none"
                : `snow-sway ${f.swayDur}s ease-in-out infinite alternate`,
              // Use translateX via CSS keyframes; amplitude is via scale trick below
            }}
          >
            <div
              style={{
                transform: `translate3d(${f.sway}px,0,0)`,
                animation: reduceMotion
                  ? "none"
                  : `snow-spin ${f.spinDur}s linear infinite`,
              }}
            >
              <FlakeSVG size={f.size} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
