import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Me from "../assets/me.png";

gsap.registerPlugin(ScrollTrigger);

const stickers = [
  {
    id: 1,
    label: "REACT &\nNEXT.JS",
    sub: "BUILDING → FAST & SCALABLE APPS",
    bg: "#5ecfcf",
    color: "#000",
    shape: "circle",
    style: { top: "12%", left: "8%" },
    mobileStyle: { top: "6%", left: "2%", transform: "scale(0.7)" },
    rotate: -8,
  },
  {
    id: 2,
    label: "UI/UX\nDESIGN©",
    bg: "#f06292",
    color: "#fff",
    shape: "rect",
    style: { top: "10%", right: "30%" },
    mobileStyle: { top: "4%", right: "2%" },
    rotate: 4,
  },
  {
    id: 3,
    label: "DESIGN\nSYSTEMS\n©'24",
    bg: "#5ecfcf",
    color: "#000",
    shape: "rect",
    style: { top: "12%", right: "4%" },
    mobileStyle: null,
    rotate: -3,
  },
  {
    id: 4,
    label: "FIGMA &\nⓔ PROTOTYPING",
    sub: "WWW. ↗",
    bg: "#f5e642",
    color: "#000",
    shape: "rect",
    style: { top: "44%", left: "4%" },
    mobileStyle: { bottom: "28%", left: "2%" },
    rotate: -5,
  },
  {
    id: 5,
    label: "CSS &\nTAILWIND\n→ STYLING",
    bg: "#f4833d",
    color: "#fff",
    shape: "rect",
    style: { bottom: "18%", left: "8%" },
    mobileStyle: null,
    rotate: 3,
  },
  {
    id: 6,
    label: "WEB\nPERFORMANCE",
    bg: "#b5e550",
    color: "#000",
    shape: "circle",
    style: { bottom: "10%", right: "14%" },
    mobileStyle: { bottom: "22%", right: "2%", transform: "scale(0.72)" },
    rotate: -15,
  },
];

export default function PortfolioHero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const heroTextRef = useRef(null);
  const stickersRef = useRef([]);
  const ctaRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const photoRef = useRef(null);

  const bottomPanelStyle = {
    background: "#e8e4dc",
    position: "relative",
    minHeight: 480,
    overflow: "hidden",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px)," +
      "linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  };

  const isMobile = () => window.innerWidth <= 768;

  useEffect(() => {
    const ctx = gsap.context(() => {
      try {
        // ── TITLE: character split ──
        const titleEl = titleRef.current;
        if (!titleEl) return;

        const rawText = titleEl.innerText;
        const lines = rawText.split("\n");
        titleEl.innerHTML = lines
          .map(
            (line) =>
              `<span style="display:block;overflow:hidden;"><span class="line-inner" style="display:block;">${[
                ...line,
              ]
                .map(
                  (ch) =>
                    `<span class="char" style="display:inline-block;">${
                      ch === " " ? "&nbsp;" : ch
                    }</span>`,
                )
                .join("")}</span></span>`,
          )
          .join("");

        const chars = titleEl.querySelectorAll(".char");
        gsap.from(chars, {
          y: 120,
          rotateX: -90,
          opacity: 0,
          duration: 0.9,
          ease: "expo.out",
          stagger: { each: 0.03, from: "start" },
          delay: 0.1,
        });

        // ── SUBTEXT ──
        if (heroTextRef.current?.children) {
          gsap.from(heroTextRef.current.children, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.7,
          });
        }

        // ── CTA ──
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            opacity: 0,
            x: 30,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.9,
          });
        }

        // ── BOTTOM PANEL ──
        if (bottomPanelRef.current) {
          gsap.from(bottomPanelRef.current, {
            y: 80,
            opacity: 0,
            duration: 1,
            ease: "expo.out",
            delay: 0.4,
          });
        }

        // ── PHOTO ──
        if (photoRef.current) {
          gsap.from(photoRef.current, {
            scale: 0.85,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.5,
          });
        }

        // ── STICKERS: elastic pop-in ──
        const visibleStickers = stickersRef.current.filter(Boolean);
        gsap.from(visibleStickers, {
          opacity: 0,
          scale: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
          stagger: { each: 0.1, from: "random" },
          delay: 1.0,
        });

        // ── STICKERS: continuous float ──
        visibleStickers.forEach((el, i) => {
          gsap.to(el, {
            y: `${i % 2 === 0 ? -12 : 12}`,
            x: `${i % 3 === 0 ? -4 : 4}`,
            rotation: `+=${i % 2 === 0 ? 2 : -2}`,
            duration: 2.2 + i * 0.35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.18,
          });
        });

        // ── MAGNETIC STICKERS (desktop) ──
        if (!isMobile()) {
          visibleStickers.forEach((el) => {
            el.addEventListener("mousemove", (e) => {
              const rect = el.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              gsap.to(el, {
                x: (e.clientX - cx) * 0.35,
                y: (e.clientY - cy) * 0.35,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
            el.addEventListener("mouseleave", () => {
              gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.4)",
                overwrite: "auto",
              });
            });
          });
        }

        // ── PARALLAX on mouse (desktop) ──
        if (!isMobile()) {
          const onMouseMove = (e) => {
            const { innerWidth: W, innerHeight: H } = window;
            const nx = (e.clientX / W - 0.5) * 2;
            const ny = (e.clientY / H - 0.5) * 2;
            visibleStickers.forEach((el, i) => {
              gsap.to(el, {
                x: nx * (8 + i * 3),
                y: ny * (8 + i * 3),
                duration: 1,
                ease: "power2.out",
                overwrite: false,
              });
            });
            if (photoRef.current) {
              gsap.to(photoRef.current, {
                x: nx * 6,
                y: ny * 4,
                duration: 1.2,
                ease: "power2.out",
              });
            }
          };
          window.addEventListener("mousemove", onMouseMove);
          return () => window.removeEventListener("mousemove", onMouseMove);
        }

        // ── SCROLL: title parallax ──
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => {
            if (titleRef.current) {
              gsap.to(titleRef.current, {
                y: -self.progress * 60,
                opacity: 1 - self.progress * 0.6,
                duration: 0.1,
                overwrite: true,
              });
            }
          },
        });
      } catch (err) {
        console.error("GSAP animation error:", err);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes spinSlow {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        * { box-sizing: border-box; }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 24px;
          padding: 24px 40px 30px;
          align-items: end;
        }
        .hero-cta { white-space: nowrap; }

        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 20px 20px 24px;
          }
          .hero-cta { justify-self: start; }
          .hero-title-wrap { padding: 28px 20px 0 !important; }
          .bottom-panel { min-height: 380px !important; }
          .photo-wrap {
            width: 200px !important;
            height: 300px !important;
            border-radius: 100px 100px 0 0 !important;
          }
          .circle-cutout {
            width: 340px !important;
            height: 340px !important;
            top: -30px !important;
            right: -60px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-grid { padding: 16px 16px 20px; gap: 12px; }
          .hero-title-wrap { padding: 20px 16px 0 !important; }
          .bottom-panel { min-height: 320px !important; }
          .photo-wrap {
            width: 160px !important;
            height: 240px !important;
            border-radius: 80px 80px 0 0 !important;
          }
          .circle-cutout {
            width: 260px !important;
            height: 260px !important;
            top: -20px !important;
            right: -40px !important;
          }
        }

        @media (max-width: 768px) {
          .sticker-desktop-only { display: none !important; }
        }
      `}</style>

      <div
        ref={containerRef}
        style={{
          fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
          background: "#0a0a0a",
          minHeight: "100vh",
          overflow: "hidden",
          userSelect: "none",
        }}
      >
        {/* ── HERO TITLE ── */}
        <div className="hero-title-wrap" style={{ padding: "40px 40px 0" }}>
          <h1
            ref={titleRef}
            style={{
              color: "#F4F1EC",
              fontSize: "clamp(38px, 10vw, 120px)",
              paddingTop: 20,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              margin: 0,
              textTransform: "uppercase",
              perspective: "600px",
            }}
          >
            FRONTEND <br/>DEVELOPER
          </h1>
        </div>

        {/* ── HERO SUBTEXT ── */}
        <div ref={heroTextRef} className="hero-grid">
          <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 360 }}>
            I craft pixel-perfect interfaces and intuitive user experiences
            using React, Tawilwind CSSS and GSAP — bridging the gap between
            design and engineering with precision.
          </p>
          <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 360 }}>
            I'm frontend developer who turns Figma concepts
            into fast, accessible, and beautifully animated web products that
            users love.
          </p>

          {/* ✅ FIXED: restored missing opening <a tag */}
          <a
            ref={ctaRef}
            href="#"
            className="hero-cta"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              borderBottom: "1px solid #fff",
              paddingBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
          >
            GET IN TOUCH <span style={{ fontSize: 16 }}>→</span>
          </a>
        </div>

        {/* ── BOTTOM PANEL ── */}
        <div ref={bottomPanelRef} className="bottom-panel" style={bottomPanelStyle}>
          <div
            className="circle-cutout"
            style={{
              position: "absolute",
              top: -60,
              right: -100,
              width: 560,
              height: 560,
              borderRadius: "50%",
              background: "#0a0a0a",
              zIndex: 0,
            }}
          />

          <div
            ref={photoRef}
            className="photo-wrap"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              bottom: 0,
              width: 280,
              height: 420,
              zIndex: 1,
              overflow: "hidden",
              borderRadius: "140px 140px 0 0",
              border: "3px solid rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={Me}
              alt="Profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "grayscale(20%) contrast(1.05)",
              }}
            />
          </div>

          {stickers.map((s, i) => {
            const isHidden = s.mobileStyle === null;
            return (
              <div
                key={s.id}
                ref={(el) => (stickersRef.current[i] = el)}
                className={isHidden ? "sticker-desktop-only" : ""}
                style={{
                  position: "absolute",
                  ...s.style,
                  background: s.bg,
                  color: s.color,
                  padding: s.shape === "circle" ? "30px 20px" : "14px 18px",
                  borderRadius: s.shape === "circle" ? "50%" : "6px",
                  width: s.shape === "circle" ? 120 : "auto",
                  height: s.shape === "circle" ? 120 : "auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transform: `rotate(${s.rotate}deg)`,
                  zIndex: 2,
                  cursor: "pointer",
                  boxShadow: "3px 4px 0 rgba(0,0,0,0.25)",
                  transition: "box-shadow 0.2s",
                  minWidth: s.shape === "rect" ? 130 : 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "5px 7px 0 rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "3px 4px 0 rgba(0,0,0,0.25)";
                }}
              >
                {s.shape === "circle" && (
                  <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", fontSize: 18, opacity: 0.7 }}>
                    ◑
                  </div>
                )}
                <div
                  style={{
                    fontSize: s.shape === "circle" ? 13 : 14,
                    fontWeight: 900,
                    lineHeight: 1.25,
                    letterSpacing: "0.02em",
                    whiteSpace: "pre-line",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
                {s.sub && (
                  <div style={{ fontSize: 9, fontWeight: 600, marginTop: 4, opacity: 0.75, letterSpacing: "0.04em", whiteSpace: "pre-line", textTransform: "uppercase" }}>
                    {s.sub}
                  </div>
                )}
                {s.shape === "circle" && (
                  <svg viewBox="0 0 100 100" width="116" height="116"
                    style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: 0.18, animation: "spinSlow 12s linear infinite" }}
                  >
                    <path id={`cp-${s.id}`} d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                    <text fontSize="11" fontWeight="700" fill={s.color} letterSpacing="3">
                      <textPath href={`#cp-${s.id}`}>
                        {s.id === 1 ? "★ REACT ★ NEXT.JS ★ FRONTEND" : "★ SPEED ★ PERF ★ LIGHTHOUSE"}
                      </textPath>
                    </text>
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}