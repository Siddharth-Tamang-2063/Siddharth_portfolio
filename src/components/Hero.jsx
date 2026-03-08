import { useEffect, useRef, useState, useCallback } from "react";

/* ─── CSS Variables + Global Styles ─── */
const GlobalStyles = () => (
  <style>{`
    :root {
      --cream:  #f5f2eb;
      --white:  #ffffff;
      --ink:    #111110;
      --ink2:   #3a3a38;
      --lime:   #cbff5e;
      --muted:  #888880;
      --border: rgba(17,17,16,.1);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { overflow-x: hidden; }

    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&display=swap');

    .syne { font-family: 'Syne', sans-serif; }
    .mono { font-family: 'DM Mono', monospace; }

    .lbadge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: 1px solid var(--border);
      border-radius: 100px;
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--ink2);
      background: var(--white);
    }
    .ldot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--lime);
      box-shadow: 0 0 8px rgba(203,255,94,.8);
      animation: ldotPulse 2s ease-in-out infinite;
    }
    @keyframes ldotPulse {
      0%,100% { box-shadow: 0 0 8px rgba(203,255,94,.8); }
      50%      { box-shadow: 0 0 18px rgba(203,255,94,1); }
    }

    .bink {
      display: inline-flex; align-items: center;
      padding: 14px 28px;
      background: var(--ink);
      color: var(--cream);
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      letter-spacing: .06em;
      text-decoration: none;
      border-radius: 4px;
      transition: background .2s, transform .2s;
      white-space: nowrap;
    }
    .bink:hover { background: #2a2a28; transform: translateY(-2px); }

    .bghost {
      display: inline-flex; align-items: center;
      padding: 14px 28px;
      background: transparent;
      color: var(--ink);
      font-family: 'DM Mono', monospace;
      font-size: 13px;
      letter-spacing: .06em;
      text-decoration: none;
      border-radius: 4px;
      border: 1px solid var(--ink);
      transition: background .2s, color .2s, transform .2s;
      white-space: nowrap;
    }
    .bghost:hover { background: var(--ink); color: var(--cream); transform: translateY(-2px); }

    /* ── Keyframes ── */
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
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes fadeUp  {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes heroScrollHint {
      0%   { opacity:0; transform:translateY(-6px); }
      50%  { opacity:1; transform:translateY(0); }
      100% { opacity:0; transform:translateY(6px); }
    }

    .hero-char       { display: inline-block; overflow: hidden; }
    .hero-char-inner {
      display: inline-block;
      animation: charUp .85s cubic-bezier(.16,1,.3,1) both;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .hero-main-pad   { padding: 0 24px !important; }
      .hero-bottom-row { grid-template-columns: 1fr !important; gap: 24px !important; }
      .hero-ctas       { justify-content: flex-start !important; flex-wrap: wrap !important; }
      .hero-ctas a     { flex: 1 1 auto; text-align: center; justify-content: center; }
      .hero-stats      { grid-template-columns: repeat(2,1fr) !important; padding: 0 24px !important; }
      .hero-stat-item  { border-right: none !important; padding-left: 0 !important; padding-right: 0 !important; }
      .hero-stat-item:nth-child(odd)  { border-right: 1px solid var(--border) !important; padding-right: 16px !important; }
      .hero-stat-item:nth-child(even) { padding-left: 16px !important; }
      .hero-scroll-hint { display: none !important; }
      .hero-top-row    { margin-bottom: 28px !important; }
      .hero-rotating-badge { display: none !important; }
      .hero-desc       { max-width: 100% !important; }
      .hero-nepal-tag  { display: none !important; }
    }

    @media (max-width: 480px) {
      .hero-main-pad { padding: 0 16px !important; }
      .hero-stats    { padding: 0 16px !important; }
      .bink, .bghost { padding: 13px 20px; font-size: 12px; width: 100%; justify-content: center; }
    }
  `}</style>
);

/* ─── Magnetic wrapper (inlined, no external dep) ─── */
const Mag = ({ children, strength = 28 }) => {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top  + r.height / 2);
    el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
  }, []);

  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transition: "transform .35s cubic-bezier(.25,1,.5,1)", display:"inline-block" }}
    >
      {children}
    </div>
  );
};

/* ─── Split text into animated chars ─── */
const SplitText = ({ text, baseDelay = 0, style = {} }) => (
  <span style={{ display: "inline-block", ...style }}>
    {text.split("").map((ch, i) => (
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

/* ─── Rotating badge ─── */
const RotatingBadge = () => (
  <div
    className="hero-rotating-badge"
    style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}
  >
    <svg
      viewBox="0 0 120 120"
      style={{
        position: "absolute", inset: 0,
        animation: "rotateSlowCW 18s linear infinite",
      }}
    >
      <defs>
        <path id="badge-circle" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
      </defs>
      <text fill="var(--muted)" fontSize="10.5" fontFamily="'DM Mono',monospace" letterSpacing="3.2" fontWeight="500">
        <textPath href="#badge-circle">AVAILABLE FOR WORK • NEPAL • 2025 • </textPath>
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

/* ─── Animated counter — supports decimals ─── */
const Counter = ({ target, suffix = "", delay = 0 }) => {
  const [val, setVal]   = useState(0);
  const ref             = useRef(null);
  const isDecimal       = !Number.isInteger(target);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let frame = 0;
      const total = 45;
      const timer = setInterval(() => {
        frame++;
        const progress = frame / total;
        const eased    = 1 - Math.pow(1 - progress, 3);
        const current  = target * eased;
        if (frame >= total) { setVal(target); clearInterval(timer); }
        else setVal(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }, 30);
      obs.disconnect();
    }, { threshold: .5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, delay, isDecimal]);

  return (
    <span ref={ref} className="syne" style={{ fontVariantNumeric: "tabular-nums" }}>
      {isDecimal ? val.toFixed(1) : val}{suffix}
    </span>
  );
};

/* ─── Hero ─── */
const Hero = () => (
  <>
    <GlobalStyles />
    <section
      id="home"
      style={{
        minHeight:      "100vh",
        background:     "var(--cream)",
        position:       "relative",
        overflow:       "hidden",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        padding:        "120px 0 0",
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
        <div style={{ position:"absolute", left:"7%",  top:0, bottom:0, width:"1px", background:"var(--border)" }} />
        <div style={{ position:"absolute", right:"7%", top:0, bottom:0, width:"1px", background:"var(--border)" }} />
        <div style={{ position:"absolute", top:"18%",  left:"7%", right:"7%", height:"1px", background:"var(--border)" }} />
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
        style={{ maxWidth:"1280px", margin:"0 auto", width:"100%", padding:"0 60px", position:"relative", zIndex:1 }}
      >

        {/* Top row */}
        <div
          className="hero-top-row"
          style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"48px" }}
        >
          <div style={{ animation:"badgePop .7s cubic-bezier(.34,1.56,.64,1) .2s both" }}>
            <span className="lbadge">
              <span className="ldot" />
              Open for Freelance
            </span>
          </div>
          <div style={{ animation:"badgePop .7s cubic-bezier(.34,1.56,.64,1) .35s both" }}>
            <RotatingBadge />
          </div>
        </div>

        {/* ── Giant headline ── */}
        <div style={{ marginBottom:"40px" }}>
          <div style={{
            height:"1px", background:"var(--ink)", marginBottom:"20px",
            animation:"lineExpand 1s cubic-bezier(.16,1,.3,1) .3s both",
          }} />

          {/* Line 1 — Web Developer */}
          <div style={{ overflow:"hidden", lineHeight:.88, marginBottom:"0.06em" }}>
            <div
              className="syne"
              style={{
                fontSize:"min(5.8vw, 148px)",
                fontWeight:800, letterSpacing:"-.045em", lineHeight:.88,
                whiteSpace:"nowrap",
              }}
            >
              <SplitText text="Web Developer" baseDelay={0.5} />
              <span
                className="mono hero-nepal-tag"
                style={{
                  fontSize:"clamp(10px, 1vw, 16px)", fontWeight:400,
                  color:"var(--muted)", letterSpacing:".08em",
                  marginLeft:"0.5em",
                  animation:"fadeIn .6s ease 1.2s both", opacity:0,
                }}
              >
                / Nepal
              </span>
            </div>
          </div>

          {/* Line 2 — & UI/UX Designer */}
          <div style={{ overflow:"hidden", lineHeight:.88 }}>
            <div
              className="syne"
              style={{
                fontSize:"min(5.8vw, 148px)",
                fontWeight:800, letterSpacing:"-.045em",
                fontStyle:"italic", lineHeight:.88,
                whiteSpace:"nowrap",
              }}
            >
              <SplitText text="& UI/UX Designer" baseDelay={0.65} style={{ color:"var(--ink2)" }} />
              <span style={{
                color:"var(--lime)",
                animation:"charUp .6s cubic-bezier(.16,1,.3,1) 1.35s both",
                display:"inline-block", marginLeft:"4px",
                filter:"drop-shadow(0 0 16px rgba(203,255,94,.7))",
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
          style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"40px", alignItems:"center", marginBottom:"48px" }}
        >
          <p
            className="hero-desc"
            style={{
              fontSize:"clamp(14px,1.2vw,17px)", lineHeight:1.8,
              color:"var(--muted)",
              animation:"fadeUp .9s ease 1.1s both", opacity:0,
              maxWidth:"420px",
            }}
          >
            I build websites that look stunning and work perfectly — from the design
            you see to the code that runs it. Whether you need a brand new site or a
            fresh look, I've got you covered.
          </p>

          <div
            className="hero-ctas"
            style={{
              display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"flex-end",
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
        marginTop:"auto", borderTop:"1px solid var(--border)",
        background:"var(--white)", position:"relative", zIndex:1,
      }}>
        <div
          className="hero-stats"
          style={{
            maxWidth:"1280px", margin:"0 auto",
            display:"grid", gridTemplateColumns:"repeat(4,1fr)",
            padding:"0 60px",
          }}
        >
          {[
            { num:5,   suffix:"+", label:"Projects Shipped" },
            { num:1.5, suffix:"+", label:"Years Building"   },
            { num:5,   suffix:"+", label:"Happy Clients"    },
            { num:100, suffix:"%", label:"Client Focused"   },
          ].map(({ num, suffix, label }, i) => (
            <div
              key={label}
              className="hero-stat-item"
              style={{
                padding:"28px 0",
                borderRight: i < 3 ? "1px solid var(--border)" : "none",
                paddingLeft:  i > 0 ? "40px" : "0",
                animation:`statsReveal .7s cubic-bezier(.16,1,.3,1) ${1.4 + i * .1}s both`,
                opacity:0,
              }}
            >
              <div
                className="syne"
                style={{ fontSize:"clamp(22px,2.8vw,42px)", fontWeight:800, letterSpacing:"-.03em", lineHeight:1 }}
              >
                <Counter target={num} suffix={suffix} delay={i * 0.1} />
              </div>
              <div className="mono" style={{ fontSize:"11px", color:"var(--muted)", marginTop:"6px", letterSpacing:".04em", textTransform:"uppercase" }}>
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
          position:"absolute", bottom:"100px", right:"60px",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"8px",
          animation:"fadeIn .6s ease 2s both", opacity:0, zIndex:1,
        }}
      >
        <div
          className="mono"
          style={{
            writingMode:"vertical-rl", fontSize:"10px",
            letterSpacing:".22em", color:"var(--muted)", textTransform:"uppercase",
          }}
        >
          Scroll
        </div>
        <div style={{ width:"1px", height:"48px", background:"var(--border)", position:"relative", overflow:"hidden" }}>
          <div style={{
            position:"absolute", top:0, width:"100%", height:"40%",
            background:"var(--ink)",
            animation:"heroScrollHint 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

    </section>
  </>
);

export default Hero;