import { useRef, useState, useEffect } from "react";

/**
 * Ring — Animated SVG Progress Ring
 * Triggers its fill animation when scrolled into view.
 *
 * Props:
 *   label  — skill name string
 *   pct    — percentage 0–100
 *   color  — stroke color (hex / css variable)
 *   d      — animation delay in seconds (default 0)
 */
const Ring = ({ label, pct, color, d = 0 }) => {
  const ref    = useRef(null);
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), d * 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [d]);

  const strokeDashoffset = animated
    ? circumference * (1 - pct / 100)
    : circumference;

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
    >
      <svg width="96" height="96" className="pring">
        {/* Track */}
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke="var(--cream2)"
          strokeWidth="4"
        />
        {/* Fill */}
        <circle
          className="fill"
          cx="48" cy="48" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transitionDelay: `${d}s` }}
        />
        {/* Label */}
        <text
          x="48" y="53"
          textAnchor="middle"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "15px",
            fontWeight: 800,
            fill: "var(--ink)",
          }}
        >
          {pct}%
        </text>
      </svg>

      <div
        className="syne"
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--ink2)",
          letterSpacing: ".03em",
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default Ring;