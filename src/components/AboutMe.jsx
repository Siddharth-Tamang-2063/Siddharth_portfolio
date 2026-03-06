import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SKILLS = [
  {
    n: "01",
    icon: "✦",
    h: "UI / UX Visionary",
    b: "Crafting pixel-perfect, soul-stirring interfaces that users don't just use — they feel. Every shadow, every curve is intentional.",
    t: ["Figma", "Design Systems", "UX Research"],
    accent: "#f5f0e8",
  },
  {
    n: "02",
    icon: "◈",
    h: "Frontend Architect",
    b: "React, Tailwind, Vite — blazing-fast, beautifully animated UIs that set the bar. Not just responsive, but jaw-dropping on every screen.",
    t: ["React", "Tailwind", "Vite"],
    accent: "#eef0f5",
  },
  {
    n: "03",
    icon: "⬡",
    h: "Full Stack Force",
    b: "End-to-end ownership. From REST APIs to databases, I engineer solutions that scale, perform, and never break a sweat under pressure.",
    t: ["Node.js", "Express", "MongoDB"],
    accent: "#f0f5ee",
  },
  {
    n: "04",
    icon: "◉",
    h: "Problem Destroyer",
    b: "Gnarly algorithms, impossible deadlines — I ship. Computer Engineering student by day, unstoppable builder every other hour.",
    t: ["C", "JavaScript", "Algorithms"],
    accent: "#f5eef0",
  },
];

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
const AboutMe = () => {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const heading1   = useRef(null);
  const heading2   = useRef(null);
  const lineRef    = useRef(null);
  const bioRef     = useRef(null);
  const cardsRef   = useRef(null);
  const floatRef   = useRef(null);
  const avatarRef  = useRef(null);
  const orbitRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Label badge */
      gsap.from(labelRef.current, {
        scrollTrigger: { trigger: labelRef.current, start: "top 88%", toggleActions: "play none none reverse" },
        y: 20, opacity: 0, duration: 0.7, ease: "power3.out",
      });

      /* Heading lines */
      [heading1, heading2].forEach((ref, i) => {
        gsap.from(ref.current, {
          scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none reverse" },
          y: 90, opacity: 0,
          duration: 1.0 + i * 0.1,
          ease: "expo.out",
          delay: i * 0.1,
        });
      });

      /* Line scale */
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: lineRef.current, start: "top 90%", toggleActions: "play none none reverse" },
        scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out", delay: 0.25,
      });

      /* Bio */
      gsap.from(bioRef.current, {
        scrollTrigger: { trigger: bioRef.current, start: "top 88%", toggleActions: "play none none reverse" },
        y: 36, opacity: 0, duration: 0.9, ease: "power3.out", delay: 0.15,
      });

      /* Avatar entrance */
      gsap.from(avatarRef.current, {
        scrollTrigger: { trigger: avatarRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        scale: 0.65, opacity: 0, duration: 1.3, ease: "back.out(1.8)",
      });

      /* Avatar perpetual float */
      gsap.to(floatRef.current, {
        y: -18, duration: 2.8, ease: "sine.inOut", yoyo: true, repeat: -1,
      });

      /* Orbit ring spin */
      gsap.to(orbitRef.current, {
        rotation: 360, duration: 14, ease: "none", repeat: -1, transformOrigin: "50% 50%",
      });

      /* Cards stagger */
      gsap.from(cardsRef.current.querySelectorAll(".skill-card"), {
        scrollTrigger: { trigger: cardsRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        y: 90, opacity: 0, stagger: 0.12, duration: 1.0, ease: "expo.out",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Card 3D tilt */
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(e.currentTarget, {
      rotateX: y * -14, rotateY: x * 14,
      transformPerspective: 900,
      duration: 0.3, ease: "power2.out",
    });
  };
  const onLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0, rotateY: 0,
      duration: 0.7, ease: "elastic.out(1, 0.6)",
    });
  };

  return (
    <>
      {/* ── Responsive styles ── */}
      <style>{`
        #about-hero {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 64px;
          align-items: center;
          padding: 120px 40px 80px;
        }
        #about-avatar {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        #about-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 16px;
          padding: 64px 40px 100px;
        }

        /* Tablet */
        @media (max-width: 768px) {
          #about-hero {
            grid-template-columns: 1fr;
            padding: 80px 24px 60px;
            gap: 48px;
          }
          #about-avatar {
            order: -1;
          }
          #about-cards {
            grid-template-columns: 1fr 1fr;
            padding: 48px 24px 80px;
            gap: 12px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          #about-hero {
            padding: 64px 20px 48px;
            gap: 36px;
          }
          #about-cards {
            grid-template-columns: 1fr;
            padding: 40px 20px 64px;
          }
          .skill-card {
            padding: 28px 24px !important;
          }
        }

        .skill-card {
          transition: box-shadow 0.3s ease;
        }
        .skill-card:hover {
          box-shadow: 0 28px 72px rgba(0,0,0,0.11);
        }
      `}</style>

      <section
        ref={sectionRef}
        id="about"
        style={{ background: "var(--white, #f9f7f4)", overflow: "hidden", position: "relative" }}
      >
        {/* Grain texture */}
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ══════════ HERO ══════════ */}
        <div
          id="about-hero"
          style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          {/* ── Left: text ── */}
          <div>
            <span
              ref={labelRef}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px", letterSpacing: ".2em",
                color: "var(--muted, #888)", textTransform: "uppercase",
                padding: "7px 16px", borderRadius: 100,
                border: "1px solid rgba(0,0,0,0.14)",
                marginBottom: "30px",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink,#111)", display: "inline-block" }} />
              About Me
            </span>

            <div style={{ overflow: "hidden" }}>
              <h2
                ref={heading1}
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: "clamp(44px, 7vw, 100px)",
                  letterSpacing: "-.045em", lineHeight: 0.88,
                  color: "var(--ink, #111)", margin: 0,
                }}
              >
                Siddharth
              </h2>
            </div>

            <div style={{ overflow: "hidden" }}>
              <h2
                ref={heading2}
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: "clamp(44px, 7vw, 100px)",
                  letterSpacing: "-.045em", lineHeight: 0.88,
                  fontStyle: "italic",
                  color: "transparent",
                  WebkitTextStroke: "2px var(--ink, #111)",
                  margin: "6px 0 0",
                }}
              >
                Tamang.
              </h2>
            </div>

            <div
              ref={lineRef}
              style={{ height: 2, background: "var(--ink,#111)", width: 100, margin: "28px 0" }}
            />

            <p
              ref={bioRef}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontWeight: 400,
                fontSize: "clamp(14px, 1.4vw, 16px)",
                color: "var(--muted, #666)", lineHeight: 1.9,
                maxWidth: 500,
              }}
            >
              A <strong style={{ color: "var(--ink,#111)", fontWeight: 500 }}>Full Stack Developer</strong> &amp;{" "}
              <strong style={{ color: "var(--ink,#111)", fontWeight: 500 }}>UI/UX Designer</strong> pursuing a Diploma
              in Computer Engineering at{" "}
              <strong style={{ color: "var(--ink,#111)", fontWeight: 500 }}>Adarsha Secondary School</strong>.
              I live at the intersection of design and engineering —&nbsp;where beautiful meets bulletproof.
            </p>
          </div>

          {/* ── Right: Avatar ── */}
          <div id="about-avatar" ref={avatarRef}>
            <div
              ref={floatRef}
              style={{
                width: "clamp(160px, 20vw, 280px)",
                height: "clamp(160px, 20vw, 280px)",
                position: "relative",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {/* Blob */}
              <div
                style={{
                  position: "absolute", inset: 0,
                  borderRadius: "62% 38% 54% 46% / 48% 62% 38% 52%",
                  background: "linear-gradient(140deg, #e8e2d8, #cec5b5)",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.13), inset 0 1px 0 rgba(255,255,255,0.55)",
                }}
              />
              {/* Initials */}
              <span
                style={{
                  position: "relative", zIndex: 2,
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: "clamp(40px, 6vw, 72px)",
                  letterSpacing: "-.05em",
                  color: "var(--ink, #111)",
                }}
              >
                ST
              </span>
              {/* Dashed orbit SVG */}
              <svg
                ref={orbitRef}
                viewBox="0 0 300 300"
                style={{
                  position: "absolute",
                  width: "130%", height: "130%",
                  top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  pointerEvents: "none",
                }}
              >
                <circle
                  cx="150" cy="150" r="130"
                  fill="none"
                  stroke="rgba(0,0,0,0.12)"
                  strokeWidth="1.5"
                  strokeDasharray="8 10"
                />
                <circle cx="150" cy="20" r="7" fill="var(--ink,#111)" />
              </svg>
            </div>
          </div>
        </div>

        {/* ══════════ SKILL CARDS ══════════ */}
        <div
          ref={cardsRef}
          id="about-cards"
          style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}
        >
          {SKILLS.map((sk, i) => (
            <div
              key={i}
              className="skill-card"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              style={{
                padding: "40px 36px",
                background: sk.accent,
                borderRadius: "20px",
                cursor: "default",
                willChange: "transform",
                position: "relative", overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Watermark number */}
              <div
                aria-hidden
                style={{
                  position: "absolute", bottom: "-24px", right: "-6px",
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: "128px", color: "rgba(0,0,0,0.045)",
                  lineHeight: 1, userSelect: "none", pointerEvents: "none",
                }}
              >
                {sk.n}
              </div>

              {/* Icon badge */}
              <div
                style={{
                  width: 48, height: 48, borderRadius: "12px",
                  background: "var(--ink, #111)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px", color: "#f9f7f4",
                  marginBottom: "28px",
                  flexShrink: 0,
                }}
              >
                {sk.icon}
              </div>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 700,
                  fontSize: "clamp(16px, 1.8vw, 20px)",
                  letterSpacing: "-.025em",
                  color: "var(--ink, #111)", marginBottom: 10,
                }}
              >
                {sk.h}
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px", color: "var(--muted, #666)",
                  lineHeight: 1.85, marginBottom: 24,
                }}
              >
                {sk.b}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {sk.t.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "9px", letterSpacing: ".12em",
                      padding: "5px 12px", borderRadius: 100,
                      background: "rgba(0,0,0,0.07)",
                      color: "var(--ink, #111)",
                      textTransform: "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutMe;