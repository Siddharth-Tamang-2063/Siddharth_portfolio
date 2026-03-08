import { useState } from "react";
import useReveal from "../hooks/useReveal";

const PROJECTS = [
  {
    n:      "01",
    name:   "Deadstock Thrift.",
    emoji:  "🛍",
    col:    "#f97316",
    tech:   ["React", "Node", "MongoDB"],
    result: "Full thrift e-commerce. Buy & sell second-hand finds.",
    link:   "https://deadstock-thrift-official.vercel.app",
  },
  {
    n:      "02",
    name:   "Spark Agency.",
    emoji:  "⚡",
    col:    "#a78bfa",
    tech:   ["React", "Tailwind", "Vite"],
    result: "Creative agency landing page. Built to convert.",
    link:   "https://spark-agency-seven.vercel.app/#home",
  },
  {
    n:      "03",
    name:   "Chat Web App.",
    emoji:  "💬",
    col:    "#60a5fa",
    tech:   ["MERN", "Socket.io", "Stream"],
    result: "Real-time messaging with video calls & friend system.",
    link:   "chat-web-app-5w2c.vercel.app",
  },
  {
    n:      "04",
    name:   "Buzz Craft Media.",
    emoji:  "🚀",
    col:    "#CBFF5E",
    tech:   ["React", "Tailwind", "Vite"],
    result: "Media agency website. Services, portfolio & branding.",
    link:   "https://buzzcraft-media.vercel.app/",
  },
];

const Work = () => {
  useReveal();
  const [hovered, setHovered] = useState(null);

  return (
    <section id="work" style={{ padding: "140px 40px", background: "var(--cream)" }}>
      <style>{`
        .work-section {
          padding: 140px 40px;
        }

        .work-row {
          display: grid;
          grid-template-columns: 70px 1fr 1fr 48px;
          gap: 28px;
          align-items: center;
          padding: 28px 32px;
        }

        .work-tech-tags {
          display: flex;
          gap: 7px;
          flex-wrap: wrap;
        }

        .work-number {
          font-size: 12px;
        }

        @media (max-width: 768px) {
          .work-section {
            padding: 80px 20px;
          }

          .work-row {
            grid-template-columns: 1fr 40px;
            grid-template-rows: auto auto;
            gap: 12px;
            padding: 20px 16px;
          }

          .work-number {
            display: none;
          }

          .work-tech-tags {
            grid-column: 1 / 2;
            margin-top: 4px;
          }

          .work-arrow {
            grid-column: 2;
            grid-row: 1;
            align-self: center;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Heading */}
        <div
          className="sr"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "80px", flexWrap: "wrap", gap: "24px" }}
        >
          <div>
            <span className="slabel">Selected Work</span>
            <h2
              className="syne"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 0.93, marginTop: "16px" }}
            >
              Built to
              <br />
              <span style={{ color: "var(--muted)", fontStyle: "italic", fontWeight: 400 }}>Perform.</span>
            </h2>
          </div>
          <p style={{ maxWidth: "300px", color: "var(--muted)", lineHeight: 1.75, fontSize: "15px" }}>
            Every project is a case study in clean architecture, performance, and visual craft.
          </p>
        </div>

        {/* Project rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {PROJECTS.map((project, i) => {
            const isHovered = hovered === i;
            return (
              <a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  className="sr work-row"
                  data-d={i * 0.08}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background:   isHovered ? "var(--white)" : "transparent",
                    borderRadius: "18px",
                    transition:   "background .3s, box-shadow .3s",
                    boxShadow:    isHovered ? "0 8px 48px rgba(17,17,16,.1)" : "none",
                    borderBottom: isHovered ? "none" : "1px solid var(--border)",
                    cursor:       "pointer",
                  }}
                >
                  {/* Number */}
                  <span
                    className="syne work-number"
                    style={{ fontWeight: 700, letterSpacing: ".1em", color: isHovered ? project.col : "var(--muted)", transition: "color .3s" }}
                  >
                    {project.n}
                  </span>

                  {/* Icon + name + tags (stacked on mobile) */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          width:          46,
                          height:         46,
                          borderRadius:   13,
                          background:     isHovered ? project.col + "22" : "var(--cream2)",
                          display:        "flex",
                          alignItems:     "center",
                          justifyContent: "center",
                          fontSize:       "20px",
                          flexShrink:     0,
                          transition:     "background .3s, transform .4s cubic-bezier(.34,1.56,.64,1)",
                          transform:      isHovered ? "rotate(-8deg) scale(1.12)" : "",
                        }}
                      >
                        {project.emoji}
                      </div>
                      <div>
                        <div className="syne" style={{ fontSize: "clamp(15px, 1.8vw, 20px)", fontWeight: 700 }}>
                          {project.name}
                        </div>
                        <div style={{ fontSize: "13px", color: "var(--muted)", marginTop: "2px" }}>
                          {project.result}
                        </div>
                      </div>
                    </div>

                    {/* Tech tags — visible on mobile below name */}
                    <div className="work-tech-tags">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding:      "5px 11px",
                            borderRadius: 100,
                            background:   isHovered ? "var(--cream)" : "var(--cream2)",
                            fontFamily:   "'DM Mono', monospace",
                            fontSize:     "11px",
                            color:        "var(--ink2)",
                            transition:   "background .3s",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech tags — desktop only separate column */}
                  <div className="hmob" style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        style={{
                          padding:      "5px 11px",
                          borderRadius: 100,
                          background:   isHovered ? "var(--cream)" : "var(--cream2)",
                          fontFamily:   "'DM Mono', monospace",
                          fontSize:     "11px",
                          color:        "var(--ink2)",
                          transition:   "background .3s",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div
                    className="work-arrow"
                    style={{
                      width:          44,
                      height:         44,
                      borderRadius:   "50%",
                      background:     isHovered ? project.col : "var(--cream2)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      transition:     "all .4s cubic-bezier(.34,1.56,.64,1)",
                      transform:      isHovered ? "rotate(-45deg)" : "",
                      flexShrink:     0,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isHovered ? "var(--ink)" : "var(--muted)"} strokeWidth="2.5" strokeLinecap="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Work;