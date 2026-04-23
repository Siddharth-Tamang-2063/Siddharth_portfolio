import { useState } from "react";
import useReveal from "../hooks/useReveal";

/* ─────────────────────────────────────
   Real logo images via devicons CDN
───────────────────────────────────── */
const ICONS = {
  React:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  JavaScript:   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  HTML:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Tailwind:     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  GSAP:         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gsap/gsap-original.svg",
  "Node.js":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  MongoDB:      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Git:          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  Figma:        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "VS Code":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  Claude:       "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/claude-color.png",
 
};

/* ─────────────────────────────────────
   Skill Data
───────────────────────────────────── */
const CATEGORIES = [
  {
    label: "Skills",
    color: "#60a5fa",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "GSAP"],
  },
  
  {
    label: "Tools",
    color: "#f97316",
    skills: ["Git", "Figma", "VS Code",  "Claude"],
  },

];

/* ─────────────────────────────────────
   Skill Card
───────────────────────────────────── */
const SkillCard = ({ name, delay }) => {
  const [hov, setHov] = useState(false);
  const src = ICONS[name];

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
        {src ? (
          <img
            src={src}
            alt={name}
            width={48}
            height={48}
            style={{
              width:        "100%",
              height:       "100%",
              objectFit:    "contain",
              borderRadius: name === "Express.js" || name === "Claude" ? "10px" : "0",
              /* invert Express logo on dark hover so it stays visible */
              filter:       hov && name === "Express.js" ? "invert(1)" : "none",
              transition:   "filter .3s",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%", height: "100%", borderRadius: 12,
              background: "var(--cream2)", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}
          >
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
              MERN Stack
            </div>
          </div>

          {/* Milestone chips */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { label: "React",   done: true },
              { label: "Node",    done: true },
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