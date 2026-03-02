import { useState, useEffect, useRef } from "react";

const LoaderStyles = () => (
  <style>{`
    @keyframes loaderCharUp {
      from { opacity:0; transform:translateY(120%) skewY(6deg); }
      to   { opacity:1; transform:translateY(0%)   skewY(0deg); }
    }
    @keyframes loaderLineGrow {
      from { transform:scaleX(0); }
      to   { transform:scaleX(1); }
    }
    @keyframes loaderFadeSlide {
      from { opacity:0; transform:translateY(12px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes loaderSpinRing {
      from { transform:rotate(0deg); }
      to   { transform:rotate(360deg); }
    }
    @keyframes loaderPulseOrb {
      0%,100% { transform:scale(1);   opacity:.6; }
      50%      { transform:scale(1.3); opacity:1;  }
    }
    @keyframes loaderGlitch {
      0%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0);  }
      10%      { clip-path:inset(20% 0 40% 0); transform:translateX(-4px); }
      20%      { clip-path:inset(60% 0 20% 0); transform:translateX(4px);  }
      30%      { clip-path:inset(0 0 0 0);    transform:translateX(0);    }
    }
    @keyframes loaderCountUp {
      from { opacity:0; transform:translateY(8px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes loaderSlideUp {
      0%   { opacity:1; transform:translateY(0); }
      100% { opacity:0; transform:translateY(-100vh); }
    }
    @keyframes loaderBgReveal {
      from { clip-path:inset(0 0 100% 0); }
      to   { clip-path:inset(0 0 0% 0); }
    }
    @keyframes loaderDotBounce {
      0%,100% { transform:scaleY(1); }
      50%      { transform:scaleY(.4); }
    }
    @keyframes loaderNoise {
      0%  { transform:translate(0,0); }
      10% { transform:translate(-2px,2px); }
      20% { transform:translate(2px,-2px); }
      30% { transform:translate(-2px,0); }
      40% { transform:translate(2px,2px); }
      50% { transform:translate(0,-2px); }
      60% { transform:translate(-2px,2px); }
      70% { transform:translate(2px,-2px); }
      80% { transform:translate(0,2px); }
      90% { transform:translate(-2px,0); }
     100% { transform:translate(0,0); }
    }

    .loader-wrap {
      position: fixed; inset: 0; z-index: 99999;
      background: var(--ink);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      overflow: hidden;
    }
    .loader-wrap.exit {
      animation: loaderSlideUp .9s cubic-bezier(.76,0,.24,1) .1s forwards;
      pointer-events: none;
    }

    /* Char split */
    .lc-wrap { display:inline-block; overflow:hidden; }
    .lc-inner {
      display: inline-block;
      animation: loaderCharUp .9s cubic-bezier(.16,1,.3,1) both;
    }

    /* Progress dots */
    .ldot-bar { display:flex; gap:6px; align-items:center; }
    .ldot-item {
      width:3px; border-radius:2px; background:rgba(255,255,255,.15);
      animation: loaderDotBounce .8s ease-in-out infinite;
    }
    .ldot-item.active { background:var(--lime); }
  `}</style>
);

/* Split name into animated chars */
const SplitName = ({ text, delay = 0 }) => (
  <span style={{ display:"inline-block" }}>
    {text.split("").map((ch, i) => (
      <span key={i} className="lc-wrap">
        <span
          className="lc-inner"
          style={{ animationDelay:`${delay + i * 0.045}s` }}
        >
          {ch}
        </span>
      </span>
    ))}
  </span>
);

const Loader = ({ onDone }) => {
  const [pct, setPct]       = useState(0);
  const [phase, setPhase]   = useState(0); // 0=counting 1=done 2=exit
  const [dots, setDots]     = useState(0);
  const rafRef              = useRef(null);
  const startRef            = useRef(null);
  const DURATION            = 2400; // ms to fill bar

  /* Smooth RAF-based progress */
  useEffect(() => {
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed  = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 3);
      setPct(Math.floor(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPct(100);
        setPhase(1);
        setTimeout(() => {
          setPhase(2);
          setTimeout(onDone, 950);
        }, 500);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* Animate active dot */
  useEffect(() => {
    const id = setInterval(() => setDots(d => (d + 1) % 5), 180);
    return () => clearInterval(id);
  }, []);

  const barW = `${pct}%`;

  return (
    <>
      <LoaderStyles />
      <div className={`loader-wrap${phase === 2 ? " exit" : ""}`}>

        {/* ── Corner decorations ── */}
        <div style={{ position:"absolute", top:32, left:40, opacity:.3 }}>
          <div style={{ width:24, height:2, background:"var(--lime)", marginBottom:4 }} />
          <div style={{ width:2, height:24, background:"var(--lime)" }} />
        </div>
        <div style={{ position:"absolute", top:32, right:40, opacity:.3 }}>
          <div style={{ width:24, height:2, background:"var(--lime)", marginBottom:4, marginLeft:"auto" }} />
          <div style={{ width:2, height:24, background:"var(--lime)", marginLeft:"auto" }} />
        </div>
        <div style={{ position:"absolute", bottom:32, left:40, opacity:.3 }}>
          <div style={{ width:2, height:24, background:"var(--lime)", marginBottom:4 }} />
          <div style={{ width:24, height:2, background:"var(--lime)" }} />
        </div>
        <div style={{ position:"absolute", bottom:32, right:40, opacity:.3 }}>
          <div style={{ width:2, height:24, background:"var(--lime)", marginBottom:4, marginLeft:"auto" }} />
          <div style={{ width:24, height:2, background:"var(--lime)", marginLeft:"auto" }} />
        </div>

        {/* ── Spinning ring ── */}
        <div style={{
          position:"absolute",
          width:320, height:320,
          borderRadius:"50%",
          border:"1px solid rgba(203,255,94,.06)",
          animation:"loaderSpinRing 12s linear infinite",
        }}>
          {/* Lime arc */}
          <div style={{
            position:"absolute", top:-1, left:"50%",
            width:40, height:40, marginLeft:-20,
            borderRadius:"50%",
            background:"var(--lime)",
            boxShadow:"0 0 20px rgba(203,255,94,.8)",
            animation:"loaderPulseOrb 2s ease-in-out infinite",
          }} />
        </div>
        <div style={{
          position:"absolute",
          width:200, height:200,
          borderRadius:"50%",
          border:"1px solid rgba(255,255,255,.04)",
          animation:"loaderSpinRing 8s linear infinite reverse",
        }} />

        {/* ── Background watermark ── */}
        <div style={{
          position:"absolute",
          fontSize:"clamp(80px,15vw,180px)",
          fontFamily:"'Syne',sans-serif",
          fontWeight:800,
          color:"transparent",
          WebkitTextStroke:"1px rgba(255,255,255,.03)",
          letterSpacing:"-.04em",
          userSelect:"none",
          pointerEvents:"none",
          animation:"loaderNoise 2s steps(1) infinite",
        }}>
          ST
        </div>

        {/* ── Center content ── */}
        <div style={{ position:"relative", zIndex:1, textAlign:"center" }}>

          {/* Eyebrow */}
          <div
            className="dmono"
            style={{
              fontSize:"10px", letterSpacing:".35em",
              color:"rgba(255,255,255,.2)", textTransform:"uppercase",
              marginBottom:"20px",
              animation:"loaderFadeSlide .6s ease .2s both",
            }}
          >
            Portfolio · 2025
          </div>

          {/* Name */}
          <div
            className="syne"
            style={{
              fontSize:"clamp(42px,8vw,88px)",
              fontWeight:800, lineHeight:.95,
              letterSpacing:"-.045em",
              color:"#FAFAF8",
              marginBottom:"6px",
            }}
          >
            <SplitName text="Siddharth" delay={0.3} />
          </div>
          <div
            className="syne"
            style={{
              fontSize:"clamp(42px,8vw,88px)",
              fontWeight:800, lineHeight:.95,
              letterSpacing:"-.045em",
              fontStyle:"italic",
              color:"rgba(255,255,255,.25)",
              marginBottom:"48px",
            }}
          >
           
            <span style={{ color:"var(--lime)", fontStyle:"normal", filter:"drop-shadow(0 0 12px rgba(203,255,94,.7))" }}>.</span>
          </div>

          {/* Progress bar track */}
          <div style={{
            width:"clamp(220px,30vw,360px)",
            margin:"0 auto",
          }}>
            {/* Top row: label + pct */}
            <div style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              marginBottom:"10px",
              animation:"loaderFadeSlide .6s ease .8s both", opacity:0,
            }}>
              <div className="ldot-bar">
                {[0,1,2,3,4].map(i => (
                  <div
                    key={i}
                    className={`ldot-item${dots === i ? " active" : ""}`}
                    style={{
                      height: dots === i ? "14px" : "6px",
                      animationDelay:`${i * .1}s`,
                      transition:"height .15s ease, background .15s",
                    }}
                  />
                ))}
              </div>
              <span
                className="syne"
                style={{
                  fontSize:"13px", fontWeight:800,
                  color: pct === 100 ? "var(--lime)" : "rgba(255,255,255,.5)",
                  letterSpacing:"-.02em",
                  transition:"color .4s",
                  fontVariantNumeric:"tabular-nums",
                }}
              >
                {pct}%
              </span>
            </div>

            {/* Bar */}
            <div style={{
              height:"2px",
              background:"rgba(255,255,255,.08)",
              borderRadius:2, overflow:"hidden",
            }}>
              <div style={{
                height:"100%", width:barW,
                background:"linear-gradient(90deg, rgba(203,255,94,.5), var(--lime))",
                borderRadius:2,
                boxShadow:"0 0 16px rgba(203,255,94,.6)",
                transition:"width .06s linear",
              }} />
            </div>

            {/* Done message */}
            {phase >= 1 && (
              <div
                className="dmono"
                style={{
                  marginTop:"16px",
                  fontSize:"11px",
                  color:"rgba(255,255,255,.3)",
                  letterSpacing:".2em",
                  textTransform:"uppercase",
                  animation:"loaderFadeSlide .5s ease both",
                }}
              >
                ✦ &nbsp; Ready
              </div>
            )}
          </div>
        </div>

        {/* ── Bottom role text ── */}
        <div style={{
          position:"absolute", bottom:44,
          display:"flex", gap:"24px", alignItems:"center",
          animation:"loaderFadeSlide .6s ease 1s both", opacity:0,
        }}>
          {["FullStack Developer","Nepal","MERN Stack"].map((t, i) => (
            <span key={t} style={{ display:"flex", alignItems:"center", gap:"24px" }}>
              <span className="dmono" style={{ fontSize:"10px", letterSpacing:".18em", color:"rgba(255,255,255,.18)", textTransform:"uppercase" }}>
                {t}
              </span>
              {i < 2 && <span style={{ width:3, height:3, borderRadius:"50%", background:"rgba(255,255,255,.15)", display:"block" }} />}
            </span>
          ))}
        </div>

      </div>
    </>
  );
};

export default Loader;