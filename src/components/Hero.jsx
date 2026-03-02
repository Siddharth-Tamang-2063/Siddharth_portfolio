import { useEffect, useRef, useState } from "react";
import Mag from "../ui/Mag";

/* ─── Extra keyframes injected once ─── */
const HeroStyles = () => (
  <style>{`
    @keyframes charUp {
      from { opacity:0; transform: translateY(110%) skewY(4deg); }
      to   { opacity:1; transform: translateY(0%)  skewY(0deg); }
    }
    @keyframes lineExpand {
      from { transform: scaleX(0); transform-origin: left; }
      to   { transform: scaleX(1); transform-origin: left; }
    }
    @keyframes badgePop {
      from { opacity:0; transform: scale(.7) translateY(10px); }
      to   { opacity:1; transform: scale(1)  translateY(0); }
    }
    @keyframes subtleDrift {
      0%,100% { transform: translate(0,0) rotate(0deg); }
      33%      { transform: translate(18px,-12px) rotate(1.5deg); }
      66%      { transform: translate(-10px,8px)  rotate(-.8deg); }
    }
    @keyframes rotateSlowCW  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes rotateSlowCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
    @keyframes glowPulse {
      0%,100% { opacity:.18; transform:scale(1); }
      50%      { opacity:.28; transform:scale(1.08); }
    }
    @keyframes statsReveal {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes cursorBlink {
      0%,100% { opacity:1; } 50% { opacity:0; }
    }
    @keyframes heroScrollHint {
      0%   { opacity:0; transform:translateY(-6px); }
      50%  { opacity:1; transform:translateY(0); }
      100% { opacity:0; transform:translateY(6px); }
    }
    @keyframes fadeIn {
      from { opacity:0; } to { opacity:1; }
    }
    @keyframes fadeUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    .hero-char {
      display: inline-block;
      overflow: hidden;
    }
    .hero-char-inner {
      display: inline-block;
      animation: charUp .85s cubic-bezier(.16,1,.3,1) both;
    }
    .hero-word { display: inline-block; margin-right: .18em; }

    /* ── Mobile fixes ── */
    @media (max-width: 640px) {
      .hero-main-pad   { padding: 0 20px !important; }
      .hero-bottom-row { grid-template-columns: 1fr !important; gap: 24px !important; }
      .hero-ctas       { justify-content: flex-start !important; }
      .hero-stats      { grid-template-columns: repeat(2,1fr) !important; padding: 0 20px !important; }
      .hero-stat-item  { border-right: none !important; padding-left: 0 !important; }
      .hero-stat-item:nth-child(odd)  { border-right: 1px solid var(--border) !important; padding-right: 20px !important; }
      .hero-stat-item:nth-child(even) { padding-left: 20px !important; }
      .hero-scroll-hint { display: none !important; }
      .hero-top-row    { margin-bottom: 28px !important; }
    }
  `}</style>
);

/* ─── Split text into animated chars ─── */
const SplitText = ({ text, baseDelay = 0, style = {} }) => {
  const chars = text.split("");
  return (
    <span style={{ display: "inline-block", ...style }}>
      {chars.map((ch, i) => (
        <span key={i} className="hero-char">
          <span
            className="hero-char-inner"
            style={{ animationDelay: `${baseDelay + i * 0.032}s` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
};

/* ─── Rotating badge ─── */
const RotatingBadge = () => (
  <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
    <svg
      viewBox="0 0 120 120"
      style={{
        position: "absolute", inset: 0,
        animation: "rotateSlowCW 18s linear infinite",
      }}
    >
      <defs>
        <path id="circle-path" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
      </defs>
      <text
        fill="var(--muted)"
        fontSize="10.5"
        fontFamily="'DM Mono',monospace"
        letterSpacing="3.2"
        fontWeight="500"
      >
        <textPath href="#circle-path">
          AVAILABLE FOR WORK • NEPAL • 2025 •{" "}
        </textPath>
      </text>
    </svg>
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: "var(--lime)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 0 28px rgba(203,255,94,.5)",
        animation: "rotateSlowCCW 18s linear infinite",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      </div>
    </div>
  </div>
);

/* ─── Animated counter ─── */
const Counter = ({ target, suffix = "", delay = 0 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(Math.floor(start));
        }, 35);
        obs.disconnect();
      }
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, delay]);

  return (
    <span ref={ref} className="syne" style={{ fontVariantNumeric: "tabular-nums" }}>
      {val}{suffix}
    </span>
  );
};

/* ─── Hero ─── */
const Hero = () => {
  return (
    <>
      <HeroStyles />
      <section
        id="home"
        style={{
          minHeight:     "100vh",
          background:    "var(--cream)",
          position:      "relative",
          overflow:      "hidden",
          display:       "flex",
          flexDirection: "column",
          justifyContent:"center",
          padding:       "120px 0 0",
        }}
      >

        {/* ── Background watermark ── */}
        <div style={{
          position:         "absolute",
          top:              "50%",
          left:             "50%",
          transform:        "translate(-50%,-50%)",
          fontSize:         "clamp(80px,20vw,260px)",
          fontFamily:       "'Syne',sans-serif",
          fontWeight:       800,
          color:            "transparent",
          WebkitTextStroke: "1px rgba(17,17,16,.055)",
          letterSpacing:    "-.05em",
          whiteSpace:       "nowrap",
          pointerEvents:    "none",
          userSelect:       "none",
          zIndex:           0,
          animation:        "glowPulse 8s ease-in-out infinite",
          lineHeight:       1,
        }}>
          DEV
        </div>

        {/* ── Decorative grid lines ── */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:0 }}>
          <div style={{ position:"absolute", left:"7%", top:0, bottom:0, width:"1px", background:"var(--border)" }} />
          <div style={{ position:"absolute", right:"7%", top:0, bottom:0, width:"1px", background:"var(--border)" }} />
          <div style={{ position:"absolute", top:"18%", left:"7%", right:"7%", height:"1px", background:"var(--border)" }} />
        </div>

        {/* ── Ambient blobs ── */}
        <div style={{
          position:"absolute", top:"-20%", right:"-12%",
          width:"70vmin", height:"70vmin", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(203,255,94,.16) 0%,transparent 68%)",
          pointerEvents:"none", zIndex:0,
          animation:"subtleDrift 20s ease-in-out infinite",
        }} />
        <div style={{
          position:"absolute", bottom:"-15%", left:"-8%",
          width:"55vmin", height:"55vmin", borderRadius:"50%",
          background:"radial-gradient(circle,rgba(96,165,250,.08) 0%,transparent 68%)",
          pointerEvents:"none", zIndex:0,
          animation:"subtleDrift 25s ease-in-out infinite reverse",
        }} />

        {/* ── Main content ── */}
        <div
          className="hero-main-pad"
          style={{
            maxWidth:"1280px", margin:"0 auto", width:"100%",
            padding:"0 60px", position:"relative", zIndex:1,
          }}
        >

          {/* Top row: badge + rotating badge */}
          <div
            className="hero-top-row"
            style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              marginBottom:"48px",
            }}
          >
            <div style={{ animation:"badgePop .7s cubic-bezier(.34,1.56,.64,1) .2s both" }}>
              <span className="lbadge">
                <span className="ldot" />
                Open for Freelance
              </span>
            </div>
            <div
              className="hmob"
              style={{ animation:"badgePop .7s cubic-bezier(.34,1.56,.64,1) .35s both" }}
            >
              <RotatingBadge />
            </div>
          </div>

          {/* ── Giant headline ── */}
          <div style={{ marginBottom:"40px" }}>
            <div style={{
              height:"1px", background:"var(--ink)", marginBottom:"20px",
              animation:"lineExpand 1s cubic-bezier(.16,1,.3,1) .3s both",
            }} />

            {/* Line 1 */}
            <div style={{ overflow:"hidden", lineHeight:.9 }}>
             <div className="syne" style={{
  fontSize: "clamp(38px,10.5vw,148px)",
  fontWeight: 800,
  letterSpacing: "-.045em",
  lineHeight: 0.9,
  whiteSpace: "nowrap",    // ← forces one line
}}>
  <SplitText text="Full Stack" baseDelay={0.5} />
                <span style={{
                  fontSize:      "clamp(12px,1.4vw,18px)",
                  fontWeight:    400,
                  color:         "var(--muted)",
                  fontFamily:    "'DM Mono',monospace",
                  letterSpacing: ".08em",
                  alignSelf:     "center",
                  animation:     "fadeIn .6s ease 1.2s both",
                  opacity:       0,
                }}>
                  / Nepal
                </span>
              </div>
            </div>

            {/* Line 2 */}
            <div style={{ overflow:"hidden", lineHeight:.9 }}>
            <div className="syne" style={{
  fontSize: "clamp(38px,10.5vw,148px)",
  fontWeight: 800,
  letterSpacing: "-.045em",
  fontStyle: "italic",
  lineHeight: 0.9,
  whiteSpace: "nowrap",    // ← forces one line
}}>
  <SplitText text="Developer" baseDelay={0.65} style={{ color:"var(--ink2)" }} />
  <span style={{
    color: "var(--lime)",
    animation: "charUp .6s cubic-bezier(.16,1,.3,1) 1.35s both",
    display: "inline-block",
    marginLeft: "4px",
    filter: "drop-shadow(0 0 16px rgba(203,255,94,.7))",
  }}>.</span>
</div>
            </div>

            <div style={{
              height:"1px", background:"var(--border)", marginTop:"20px",
              animation:"lineExpand 1s cubic-bezier(.16,1,.3,1) .9s both",
            }} />
          </div>

          {/* ── Bottom row: description + CTAs ── */}
          <div
            className="hero-bottom-row"
            style={{
              display:"grid", gridTemplateColumns:"1fr 1fr",
              gap:"40px", alignItems:"center",
            }}
          >
            <p style={{
              fontSize:   "clamp(14px,1.3vw,17px)",
              lineHeight: 1.8,
              color:      "var(--muted)",
              animation:  "fadeUp .9s ease 1.1s both",
              opacity:    0,
              maxWidth:   "420px",
            }}>
              Building fast, beautiful digital products that convert visitors into clients.
              Currently mastering the full MERN stack to deliver end-to-end solutions.
            </p>

            <div
              className="hero-ctas"
              style={{
                display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"flex-end",
                animation:"fadeUp .9s ease 1.25s both", opacity:0,
              }}
            >
              <Mag><a href="#work"    className="bink">View Work →</a></Mag>
              <Mag><a href="#contact" className="bghost">Hire Me</a></Mag>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          marginTop:  "auto",
          borderTop:  "1px solid var(--border)",
          background: "var(--white)",
          position:   "relative",
          zIndex:     1,
        }}>
          <div
            className="hero-stats"
            style={{
              maxWidth:            "1280px",
              margin:              "0 auto",
              display:             "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              padding:             "0 60px",
            }}
          >
            {[
              { num:5, suffix:"+", label:"Projects Shipped" },
              { num:1.5,  suffix:"+", label:"Years Building"   },
              { num:5,  suffix:"+", label:"Happy Clients"    },
              { num:100,suffix:"%", label:"Client Focused"   },
            ].map(({ num, suffix, label }, i) => (
              <div
                key={label}
                className="hero-stat-item"
                style={{
                  padding:     "28px 0",
                  borderRight: i < 3 ? "1px solid var(--border)" : "none",
                  paddingLeft: i > 0 ? "40px" : "0",
                  animation:   `statsReveal .7s cubic-bezier(.16,1,.3,1) ${1.4 + i*.1}s both`,
                  opacity:     0,
                }}
              >
                <div
                  className="syne"
                  style={{ fontSize:"clamp(24px,3vw,42px)", fontWeight:800, letterSpacing:"-.03em", lineHeight:1 }}
                >
                  <Counter target={num} suffix={suffix} delay={i * 0.1} />
                </div>
                <div style={{ fontSize:"12px", color:"var(--muted)", marginTop:"6px", letterSpacing:".02em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div
          className="hero-scroll-hint"
          style={{
            position:      "absolute",
            bottom:        "100px",
            right:         "60px",
            display:       "flex",
            flexDirection: "column",
            alignItems:    "center",
            gap:           "8px",
            animation:     "fadeIn .6s ease 2s both",
            opacity:       0,
            zIndex:        1,
          }}
        >
          <div style={{
            writingMode:   "vertical-rl",
            fontSize:      "10px",
            fontFamily:    "'DM Mono',monospace",
            letterSpacing: ".22em",
            color:         "var(--muted)",
            textTransform: "uppercase",
          }}>
            Scroll
          </div>
          <div style={{ width:"1px", height:"48px", background:"var(--border)", position:"relative", overflow:"hidden" }}>
            <div style={{
              position:   "absolute",
              top:        0,
              width:      "100%",
              height:     "40%",
              background: "var(--ink)",
              animation:  "heroScrollHint 1.8s ease-in-out infinite",
            }} />
          </div>
        </div>

      </section>
    </>
  );
};

export default Hero;