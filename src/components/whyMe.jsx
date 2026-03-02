import useReveal from "../hooks/useReveal";

const CARDS = [
  {
    span:  2,
    bg:    "var(--ink)",
    title: "Performance First",
    sub:   "Sub-2s loads. Real Lighthouse scores. Clean bundles.",
    icon:  "⚡",
    light: true,
  },
  {
    span:  1,
    bg:    "var(--lime)",
    title: "Clean Code",
    sub:   "Readable, scalable, maintainable.",
    icon:  "✦",
    light: false,
  },
  {
    span:  1,
    bg:    "var(--white)",
    title: "UI/UX Sense",
    sub:   "Design literacy meets dev precision.",
    icon:  "◉",
    light: false,
  },
  {
    span:  1,
    bg:    "var(--white)",
    title: "Communication",
    sub:   "Clear. On time. No surprises.",
    icon:  "◎",
    light: false,
  },
  {
    span:  2,
    bg:    "var(--cream2)",
    title: "Global Ready",
    sub:   "Remote-friendly. Async fluent. Clear English.",
    icon:  "🌏",
    light: false,
  },
];

const WhyMe = () => {
  useReveal();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section style={{ padding: "140px 40px", background: "var(--cream)" }}>
      <style>{`
        .whyme-section {
          padding: 140px 40px;
        }

        .whyme-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .whyme-card-span-2 { grid-column: span 2; }
        .whyme-card-span-1 { grid-column: span 1; }

        @media (max-width: 768px) {
          .whyme-section {
            padding: 80px 20px;
          }

          .whyme-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .whyme-card-span-2 {
            grid-column: span 2;
          }

          .whyme-card-span-1 {
            grid-column: span 1;
          }
        }

        @media (max-width: 480px) {
          .whyme-grid {
            grid-template-columns: 1fr;
          }

          .whyme-card-span-2,
          .whyme-card-span-1 {
            grid-column: span 1;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Heading */}
        <div className="sr" style={{ marginBottom: "80px" }}>
          <span className="slabel">Why Siddharth</span>
          <h2
            className="syne"
            style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 800, letterSpacing: "-.03em", lineHeight: 0.93, marginTop: "16px" }}
          >
            What You
            <br />
            <span style={{ color: "var(--muted)", fontStyle: "italic", fontWeight: 400 }}>Actually Get.</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="whyme-grid">
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={`fcard sr tilt whyme-card-span-${card.span}`}
              data-d={i * 0.08}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                padding:        "40px",
                background:     card.bg,
                cursor:         "default",
                minHeight:      "175px",
                display:        "flex",
                flexDirection:  "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ fontSize: "26px" }}>{card.icon}</div>
              <div>
                <h3
                  className="syne"
                  style={{
                    fontSize:     "clamp(16px, 1.8vw, 22px)",
                    fontWeight:   800,
                    color:        card.light ? "var(--lime)" : "var(--ink)",
                    marginBottom: "7px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize:   "14px",
                    color:      card.light ? "rgba(250,250,248,.45)" : "var(--muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {card.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMe;