import { useState } from "react";
import useReveal from "../hooks/useReveal";

/* ─────────────────────────────────────
   SVG Tech Logos (inline, no deps)
───────────────────────────────────── */
const ICONS = {
  React: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <circle cx="24" cy="24" r="4.5" fill="#61DAFB"/>
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#61DAFB" strokeWidth="2" fill="none"/>
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(60 24 24)"/>
      <ellipse cx="24" cy="24" rx="20" ry="7.5" stroke="#61DAFB" strokeWidth="2" fill="none" transform="rotate(120 24 24)"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="48" height="48" rx="6" fill="#F7DF1E"/>
      <path d="M13 36.5c.9 1.5 2.1 2.6 4.2 2.6 2 0 3.2-.9 3.2-2.3 0-1.6-1.3-2.1-3.4-3l-1.2-.5c-3.4-1.4-5.6-3.2-5.6-7 0-3.5 2.6-6.1 6.8-6.1 2.9 0 5 1 6.5 3.6l-3.6 2.3c-.8-1.4-1.6-1.9-2.9-1.9-1.3 0-2.2.8-2.2 1.9 0 1.3.8 1.9 2.7 2.7l1.2.5c4 1.7 6.2 3.4 6.2 7.2 0 4.2-3.3 6.5-7.7 6.5-4.3 0-7.1-2-8.5-4.7l3.3-1.8zM30 20.5h4.3V35c0 5.4-2.6 7.5-6.5 7.5-1.5 0-3.5-.5-4.5-1.5l2.1-3c.6.7 1.4 1.1 2.2 1.1 1.4 0 2.4-.7 2.4-3V20.5z" fill="#333"/>
    </svg>
  ),
  HTML: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M8 4l3.4 38.3L24 46l12.6-3.7L40 4H8z" fill="#E44D26"/>
      <path d="M24 43.4V8.6h-.1L11.5 40.5l12.4 2.9z" fill="#F16529"/>
      <path d="M15.7 30.5h8.2v-4h-4.4l-.3-3.5H24v-4h-8.9l.6 7.5zm-.7-10.5H24v-4h-9.7l.7 4zm1 14l-.3-3.5H24v3.5H16z" fill="#EBEBEB"/>
      <path d="M24 30.5h4l-.4 4.3L24 36v3.5l7.9-2.2.1-.7 1-11.1H24v4zm0-10.5h8.2l.2-2.2.5-5.8H24v4h4.7l-.3 4H24z" fill="#fff"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M8 4l3.4 38.3L24 46l12.6-3.7L40 4H8z" fill="#1572B6"/>
      <path d="M24 43.4V8.6L36.5 40.5 24 43.4z" fill="#33A9DC"/>
      <path d="M15.5 21h8.5v-4H11.3l.7 4zm1.4 9h7.1v-4H13.3l.4 4zm-1.4-5l.3 4h-.3v-4zm1.1 9.5l-.3-3.5H24V34h-7.9l.5 5.5 7.4 2v-3.7l-3.9-1.3z" fill="#fff"/>
      <path d="M24 21h8.5l-.6-4H24v4zm-1 9h9l-.3-4H24v4zm1 3.5v3.7l3.9-1.3.3-3.4H24zm0-16.5v4h8.2l-.2-2.2-.2-1.8H24z" fill="#EBEBEB"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M24 10c-5.3 0-8.7 2.7-10 8 2-2.7 4.3-3.7 7-3 1.5.4 2.6 1.5 3.8 2.7C26.7 19.7 29 22 34 22c5.3 0 8.7-2.7 10-8-2 2.7-4.3 3.7-7 3-1.5-.4-2.6-1.5-3.8-2.7C31.3 12.3 29 10 24 10zM14 22C8.7 22 5.3 24.7 4 30c2-2.7 4.3-3.7 7-3 1.5.4 2.6 1.5 3.8 2.7C16.7 31.7 19 34 24 34c5.3 0 8.7-2.7 10-8-2 2.7-4.3 3.7-7 3-1.5-.4-2.6-1.5-3.8-2.7C21.3 24.3 19 22 14 22z" fill="#38BDF8"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M24 4L7 13.8v20.4L24 44l17-9.8V13.8L24 4z" fill="#339933"/>
      <path d="M24 4L7 13.8v20.4L24 44V4z" fill="#33A933"/>
      <text x="24" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="sans-serif">JS</text>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M24 4C14 4 10 14 10 22c0 10 6 16 13 18l1 4 1-4c7-2 13-8 13-18 0-8-4-18-14-18z" fill="#4DB33D"/>
      <path d="M24 4C14 4 10 14 10 22c0 10 6 16 13 18l1 4V4z" fill="#3FA037"/>
      <rect x="22.5" y="26" width="3" height="12" rx="1.5" fill="white"/>
    </svg>
  ),
  "Express.js": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="48" height="48" rx="8" fill="#111110"/>
      <text x="24" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="sans-serif" letterSpacing="-.5">EX</text>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M44.5 21.9L26.1 3.5c-1.9-1.9-5-1.9-6.9 0l-4.9 4.9 4.2 4.2c.9-.4 2-.2 2.7.5.7.7.9 1.8.5 2.7l4.1 4.1c.9-.4 2-.2 2.7.5 1.1 1.1 1.1 2.8 0 3.9-1.1 1.1-2.8 1.1-3.9 0-.8-.8-.9-1.9-.5-2.8l-3.8-3.8v10c.3.1.5.3.7.5 1.1 1.1 1.1 2.8 0 3.9-1.1 1.1-2.8 1.1-3.9 0-1.1-1.1-1.1-2.8 0-3.9.3-.3.6-.5.9-.6v-10c-.3-.1-.6-.3-.9-.6-.8-.8-.9-2-.5-2.8L12.9 10 3.5 19.4c-1.9 1.9-1.9 5 0 6.9l18.4 18.4c1.9 1.9 5 1.9 6.9 0l15.7-15.7c1.9-1.9 1.9-5.1 0-7.1z" fill="#F34F29"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect x="14" y="4" width="10" height="10" rx="5" fill="#F24E1E"/>
      <rect x="24" y="4" width="10" height="10" rx="5" fill="#FF7262"/>
      <rect x="14" y="14" width="10" height="10" rx="0" fill="#A259FF"/>
      <circle cx="29" cy="24" r="5" fill="#1ABCFE"/>
      <rect x="14" y="24" width="10" height="10" rx="0" fill="#0ACF83"/>
      <rect x="14" y="34" width="10" height="10" rx="5" fill="#0ACF83"/>
    </svg>
  ),
  Vite: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M43 8L25.4 40.5c-.4.7-1.4.7-1.8 0L5 8h10.7l8.3 15 8.3-15H43z" fill="#BD34FE"/>
      <path d="M25.4 40.5L43 8H32.3L24 23l-8.3-15H5l18.6 32.5c.4.7 1.4.7 1.8 0z" fill="url(#vite-grad)"/>
      <defs>
        <linearGradient id="vite-grad" x1="5" y1="8" x2="43" y2="40.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#41D1FF"/>
          <stop offset="1" stopColor="#BD34FE"/>
        </linearGradient>
      </defs>
    </svg>
  ),
  "VS Code": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M34 6L18 22 9 14 6 16.5l9 8.5-9 8.5L9 36l9-8 16 16 7-3V9l-7-3z" fill="#007ACC"/>
      <path d="M34 6L18 22l-9-8-3 2.5 9 8.5-9 8.5L9 36l9-8 16 16 7-3V9l-7-3zM34 14.5l-11.5 9.5L34 33.5v-19z" fill="#1BA1E2"/>
    </svg>
  ),
  GSAP: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="48" height="48" rx="8" fill="#0AE448"/>
      <text x="24" y="31" textAnchor="middle" fontSize="14" fontWeight="900" fill="#111" fontFamily="sans-serif">GSAP</text>
    </svg>
  ),
  "REST APIs": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="48" height="48" rx="8" fill="#111110"/>
      <path d="M12 24h24M28 18l6 6-6 6" stroke="#CBFF5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 18h8M14 30h8" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  Linux: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M24 4C16 4 13 14 13 22c0 4 1 7 3 10-2 2-4 4-4 6 0 3 4 4 12 4s12-1 12-4c0-2-2-4-4-6 2-3 3-6 3-10 0-8-3-18-11-18z" fill="#FFD700"/>
      <ellipse cx="20" cy="20" rx="2" ry="2.5" fill="#333"/>
      <ellipse cx="28" cy="20" rx="2" ry="2.5" fill="#333"/>
      <path d="M21 26c1 1.5 5 1.5 6 0" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Claude: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="48" height="48" rx="10" fill="#D97757"/>
      {/* Anthropic-style minimal face / wave mark */}
      <path d="M14 30 Q19 18 24 24 Q29 30 34 18" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="24" cy="34" r="2" fill="white" opacity="0.6"/>
    </svg>
  ),
  "AI Agents": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="48" height="48" rx="10" fill="#1a1a2e"/>
      <path d="M24 10c-5 0-9 3.5-9 8 0 2 .7 3.8 2 5.2C15.7 24.5 15 26.2 15 28c0 4 3.6 7 8 7h2c4.4 0 8-3 8-7 0-1.8-.7-3.5-2-4.8 1.3-1.4 2-3.2 2-5.2 0-4.5-4-8-9-8z" stroke="#a78bfa" strokeWidth="1.8" fill="none"/>
      <circle cx="20" cy="20" r="1.5" fill="#a78bfa"/>
      <circle cx="28" cy="20" r="1.5" fill="#a78bfa"/>
      <circle cx="24" cy="26" r="1.5" fill="#CBFF5E"/>
      <path d="M20 20h4M24 20h4M24 20v6" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M24 10V6M21 7l3-1 3 1" stroke="#CBFF5E" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

/* ─────────────────────────────────────
   Skill Data
───────────────────────────────────── */
const CATEGORIES = [
  {
    label: "Frontend",
    color: "#60a5fa",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "Vite", "GSAP"],
  },
  {
    label: "Backend",
    color: "#34d399",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    label: "Tools",
    color: "#f97316",
    skills: ["Git", "Figma", "VS Code", "Linux", "Claude"],
  },
  {
    label: "AI",
    color: "#a78bfa",
    skills: ["AI Agents"],
  },
];

/* ─────────────────────────────────────
   Skill Card
───────────────────────────────────── */
const SkillCard = ({ name, delay }) => {
  const [hov, setHov] = useState(false);
  const icon = ICONS[name];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        gap:            "12px",
        padding:        "24px 16px",
        borderRadius:   "20px",
        background:     hov ? "var(--ink)" : "var(--white)",
        border:         `1px solid ${hov ? "var(--ink)" : "var(--border)"}`,
        cursor:         "default",
        transition:     "all .35s cubic-bezier(.34,1.56,.64,1)",
        transform:      hov ? "translateY(-6px) scale(1.04)" : "translateY(0) scale(1)",
        boxShadow:      hov ? "0 20px 48px rgba(17,17,16,.2)" : "0 2px 12px rgba(17,17,16,.04)",
        animation:      `fadeUp .7s cubic-bezier(.16,1,.3,1) ${delay}s both`,
        minWidth:       "100px",
      }}
    >
      <div style={{ width: 48, height: 48, flexShrink: 0 }}>
        {icon || (
          <div style={{
            width: "100%", height: "100%", borderRadius: 12,
            background: "var(--cream2)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 20 }}>⚡</span>
          </div>
        )}
      </div>

      <span
        className="syne"
        style={{
          fontSize:      "12px",
          fontWeight:    700,
          color:         hov ? "var(--white)" : "var(--ink)",
          letterSpacing: "-.01em",
          textAlign:     "center",
          transition:    "color .3s",
          lineHeight:    1.2,
        }}
      >
        {name}
      </span>
    </div>
  );
};

/* ─────────────────────────────────────
   Skills Section
───────────────────────────────────── */
const Skills = () => {
  useReveal();

  return (
    <section id="skills" style={{ padding: "140px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Heading */}
        <div className="sr" style={{ marginBottom: "80px" }}>
          <span className="slabel">Expertise</span>
          <h2
            className="syne"
            style={{
              fontSize:      "clamp(36px, 5vw, 72px)",
              fontWeight:    800,
              letterSpacing: "-.03em",
              lineHeight:    0.93,
              marginTop:     "16px",
            }}
          >
            Skills &amp;
            <br />
            <span style={{ color: "var(--muted)", fontStyle: "italic", fontWeight: 400 }}>
              Capabilities.
            </span>
          </h2>
        </div>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          {CATEGORIES.map((cat, ci) => (
            <div key={cat.label} className="sr" data-d={ci * 0.08}>

              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
                <span
                  style={{
                    width:        8,
                    height:       8,
                    borderRadius: "50%",
                    background:   cat.color,
                    display:      "block",
                    boxShadow:    `0 0 10px ${cat.color}`,
                    flexShrink:   0,
                  }}
                />
                <span
                  className="dmono"
                  style={{ fontSize: "11px", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)" }}
                >
                  {cat.label}
                </span>
                <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              </div>

              {/* Skill cards grid */}
              <div
                style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                  gap:                 "12px",
                }}
              >
                {cat.skills.map((skill, si) => (
                  <SkillCard
                    key={skill}
                    name={skill}
                    delay={ci * 0.1 + si * 0.06}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Currently learning banner */}
        <div
          className="fcard sr"
          data-d=".25"
          style={{
            marginTop:      "64px",
            padding:        "36px 40px",
            background:     "var(--ink)",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            flexWrap:       "wrap",
            gap:            "24px",
            animation:      "floatB 9s ease-in-out infinite 2s",
          }}
        >
          <div>
            <div
              className="dmono"
              style={{ fontSize: "10px", color: "rgba(255,255,255,.3)", letterSpacing: ".2em", marginBottom: "10px" }}
            >
              Currently Learning
            </div>
            <div
              className="syne"
              style={{
                color:         "var(--lime)",
                fontSize:      "clamp(20px, 2.5vw, 32px)",
                fontWeight:    800,
                lineHeight:    1.05,
                letterSpacing: "-.03em",
              }}
            >
              MERN Stack — Full Ownership
            </div>
          </div>

          {/* Milestone chips */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { label: "React",   done: true  },
              { label: "Node",    done: true  },
              { label: "Express", done: true },
              { label: "MongoDB", done: true },
            ].map(({ label, done }) => (
              <div
                key={label}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "6px",
                  padding:      "7px 14px",
                  borderRadius: 100,
                  background:   done ? "rgba(203,255,94,.12)" : "rgba(255,255,255,.05)",
                  border:       `1px solid ${done ? "rgba(203,255,94,.3)" : "rgba(255,255,255,.1)"}`,
                }}
              >
                {done ? (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#CBFF5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,.2)", display: "block" }} />
                )}
                <span
                  className="dmono"
                  style={{ fontSize: "11px", letterSpacing: ".05em", color: done ? "rgba(203,255,94,.85)" : "rgba(255,255,255,.3)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;