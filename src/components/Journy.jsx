import useReveal from "../hooks/useReveal";

const MILESTONES = [
  {
    n:    "01",
    year: "2022",
    h:    "Hello, World.",
    b:    "First C program. The moment code obeyed my thoughts — I was hooked.",
    t:    "C Programming",
  },
  {
    n:    "02",
    year: "2023",
    h:    "The Web Calls.",
    b:    "Mastered HTML, CSS, vanilla JS. Built first real websites from scratch.",
    t:    "HTML · CSS · JS",
  },
  {
    n:    "03",
    year: "2024",
    h:    "React Thinking.",
    b:    "Components, hooks, state. Shipped weather apps, e-commerce UIs, games.",
    t:    "React · Vite · Tailwind",
  },
  {
    n:    "04",
    year: "2025",
    h:    "Full Stack Horizon.",
    b:    "Node, Express, MongoDB in progress. MERN ownership coming soon.",
    t:    "Node · MongoDB",
  },
];

/**
 * Journey — Scroll-triggered timeline section
 * Each card supports 3D tilt on mouse move.
 */
const Journy = () => {
  useReveal();

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width  - 0.5;
    const y    = (e.clientY - rect.top)  / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${y * -10}deg) rotateY(${x * 10}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section id="journey" style={{ padding: "140px 40px", background: "var(--white)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Heading */}
        <div className="sr" style={{ marginBottom: "80px" }}>
          <span className="slabel">The Story</span>
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
            From Zero
            <br />
            <span style={{ color: "var(--muted)", fontStyle: "italic", fontWeight: 400 }}>
              to Production.
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display:               "grid",
            gridTemplateColumns:   "repeat(auto-fit, minmax(240px, 1fr))",
            gap:                   "20px",
          }}
        >
          {MILESTONES.map((step, i) => (
            <div
              key={i}
              className="fcard sr tilt"
              data-d={i * 0.09}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ padding: "36px", cursor: "default" }}
            >
              {/* Number + year */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <span
                  className="syne"
                  style={{ fontSize: "clamp(52px, 6vw, 72px)", fontWeight: 800, color: "var(--cream2)", lineHeight: 1 }}
                >
                  {step.n}
                </span>
                <span
                  className="dmono"
                  style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: ".1em", paddingTop: "8px" }}
                >
                  {step.year}
                </span>
              </div>

              {/* Content */}
              <h3
                className="syne"
                style={{ fontSize: "clamp(17px, 1.8vw, 21px)", fontWeight: 700, marginBottom: "10px" }}
              >
                {step.h}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.75, marginBottom: "20px" }}>
                {step.b}
              </p>

              {/* Tag */}
              <span
                style={{
                  display:     "inline-block",
                  padding:     "5px 12px",
                  borderRadius: 100,
                  background:  "var(--cream)",
                  fontFamily:  "'DM Mono', monospace",
                  fontSize:    "11px",
                  color:       "var(--ink2)",
                }}
              >
                {step.t}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journy;