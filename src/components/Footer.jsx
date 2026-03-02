const LINKS = [
  { label: "Work",    href: "#work"    },
  { label: "Journey", href: "#journey" },
  { label: "Skills",  href: "#skills"  },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/",   icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )},
  { label: "LinkedIn", href: "https://linkedin.com/",  icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )},
  { label: "Twitter",  href: "https://twitter.com/",   icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )},
];

const Footer = () => {
  return (
    <footer style={{ background: "var(--ink)", position: "relative", overflow: "hidden" }}>
      <style>{`
        /* ── CTA band ── */
        .footer-cta-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: center;
        }

        /* ── Middle grid ── */
        .footer-mid-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 48px;
        }

        /* ── Bottom bar ── */
        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 36px;
          border-radius: 100px;
          background: var(--lime);
          color: var(--ink);
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: -.01em;
          transition: transform .35s cubic-bezier(.34,1.56,.64,1), box-shadow .35s;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .footer-cta-band  { padding: 60px 24px !important; }
          .footer-mid-band  { padding: 40px 24px !important; }
          .footer-bot-band  { padding: 24px 24px !important; }

          .footer-cta-inner {
            grid-template-columns: 1fr;
          }

          .footer-cta-btn {
            width: 100%;
            justify-content: center;
            padding: 16px 24px;
          }

          .footer-mid-inner {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }

          .footer-brand-col {
            grid-column: span 2;
          }

          .footer-bottom-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .footer-built {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .footer-mid-inner {
            grid-template-columns: 1fr;
          }

          .footer-brand-col {
            grid-column: span 1;
          }
        }
      `}</style>

      {/* Decorative watermark */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "50%",
        transform: "translateX(-50%)",
        fontSize: "clamp(100px,18vw,220px)",
        fontFamily: "'Syne',sans-serif", fontWeight: 800,
        color: "transparent",
        WebkitTextStroke: "1px rgba(255,255,255,.04)",
        letterSpacing: "-.04em", whiteSpace: "nowrap",
        pointerEvents: "none", userSelect: "none", lineHeight: 1,
      }}>
        SIDDHARTH
      </div>

      {/* ── Top CTA band ── */}
      <div className="footer-cta-band" style={{
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "80px 60px",
        position: "relative", zIndex: 1,
      }}>
        <div className="footer-cta-inner">
          <div>
            <div className="dmono" style={{ fontSize: "11px", color: "rgba(255,255,255,.3)", letterSpacing: ".22em", textTransform: "uppercase", marginBottom: "20px" }}>
              Ready to build something?
            </div>
            <h2 className="syne" style={{
              fontSize: "clamp(32px,5vw,72px)", fontWeight: 800,
              color: "#FAFAF8", letterSpacing: "-.04em", lineHeight: 0.95,
            }}>
              Let's make your<br />
              <span style={{ color: "var(--lime)", fontStyle: "italic" }}>vision real.</span>
            </h2>
          </div>

          <div>
            <a
              href="#contact"
              className="footer-cta-btn"
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(203,255,94,.35)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Middle: nav + contact info ── */}
      <div className="footer-mid-band" style={{
        borderBottom: "1px solid rgba(255,255,255,.07)",
        padding: "48px 60px",
        position: "relative", zIndex: 1,
      }}>
        <div className="footer-mid-inner">

          {/* Brand column */}
          <div className="footer-brand-col">
            <div className="syne" style={{ fontSize: "28px", fontWeight: 800, color: "#FAFAF8", letterSpacing: "-.03em", marginBottom: "16px" }}>
              ST<span style={{ color: "var(--lime)" }}>.</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,.35)", lineHeight: 1.75, maxWidth: "280px" }}>
              Frontend Developer from Nepal. Building fast, beautiful web experiences for global clients.
            </p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              marginTop: "20px", padding: "7px 14px", borderRadius: 100,
              background: "rgba(203,255,94,.1)", border: "1px solid rgba(203,255,94,.2)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--lime)", display: "block", animation: "pulse 2s ease infinite" }} />
              <span className="dmono" style={{ fontSize: "10px", color: "rgba(203,255,94,.85)", letterSpacing: ".1em" }}>
                Available for work
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div>
            <div className="dmono" style={{ fontSize: "10px", color: "rgba(255,255,255,.25)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "20px" }}>
              Navigation
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {LINKS.map(link => (
                <a key={link.label} href={link.href} className="syne"
                  style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,.45)", textDecoration: "none", transition: "color .25s, transform .25s", display: "inline-block" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#FAFAF8"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.transform = ""; }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div className="dmono" style={{ fontSize: "10px", color: "rgba(255,255,255,.25)", letterSpacing: ".2em", textTransform: "uppercase", marginBottom: "20px" }}>
              Contact
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a href="mailto:siddharth@example.com" className="syne"
                style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,.45)", textDecoration: "none", transition: "color .25s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--lime)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = ""; }}
              >
                siddharth20630901@gmail.com
              </a>
              <span className="syne" style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,.25)" }}>Nepal 🌏</span>
              <span className="syne" style={{ fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,.25)" }}>UTC +5:45</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bot-band" style={{ padding: "24px 60px", position: "relative", zIndex: 1 }}>
        <div className="footer-bottom-inner">
          <div className="dmono" style={{ fontSize: "11px", color: "rgba(255,255,255,.2)", letterSpacing: ".06em" }}>
            © 2025 Siddharth Tamang. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} title={s.label}
                style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,.35)", textDecoration: "none",
                  transition: "all .3s cubic-bezier(.34,1.56,.64,1)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--lime)"; e.currentTarget.style.borderColor = "var(--lime)"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.transform = "translateY(-3px) scale(1.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; e.currentTarget.style.transform = ""; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="footer-built dmono" style={{ fontSize: "11px", color: "rgba(255,255,255,.15)", letterSpacing: ".06em" }}>
            Built with React + Tailwind + Express + Node.js
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;