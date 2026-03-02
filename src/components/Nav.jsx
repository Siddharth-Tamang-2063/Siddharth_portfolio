import { useState, useEffect } from "react";

const NAV_LINKS = [
  ["Work",    "#work"],
  ["Journey", "#journey"],
  ["Skills",  "#skills"],
  ["Contact", "#contact"],
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

  :root {
    --lime:   #c8f135;
    --ink:    #111110;
    --muted:  #6b6b65;
    --border: rgba(17,17,16,.10);
    --glass:  rgba(245,243,238,.88);
  }

  .nav-root {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    transition: padding .45s cubic-bezier(.16,1,.3,1),
                background .45s cubic-bezier(.16,1,.3,1),
                box-shadow .45s cubic-bezier(.16,1,.3,1);
  }
  .nav-root.scrolled {
    background: var(--glass);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    box-shadow: 0 1px 0 var(--border), 0 4px 24px rgba(17,17,16,.06);
  }

  .nav-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  /* — Logo — */
  .nav-logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 20px;
    letter-spacing: -.04em;
    color: var(--ink);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1px;
    user-select: none;
  }
  .nav-logo-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--lime);
    margin-left: 2px;
    margin-bottom: 10px;
    transition: transform .3s cubic-bezier(.34,1.56,.64,1);
  }
  .nav-logo:hover .nav-logo-dot {
    transform: scale(1.5);
  }

  /* — Links (desktop) — */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .nav-link {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 13.5px;
    letter-spacing: -.01em;
    color: var(--muted);
    text-decoration: none;
    padding: 7px 14px;
    border-radius: 100px;
    position: relative;
    transition: color .2s, background .2s;
  }
  .nav-link:hover {
    color: var(--ink);
    background: rgba(17,17,16,.06);
  }

  /* — CTA — */
  .nav-cta {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: -.01em;
    color: var(--ink);
    text-decoration: none;
    background: var(--lime);
    padding: 9px 20px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    transition: transform .25s cubic-bezier(.34,1.56,.64,1),
                box-shadow .25s ease,
                background .2s;
  }
  .nav-cta:hover {
    transform: translateY(-1px) scale(1.03);
    box-shadow: 0 6px 20px rgba(200,241,53,.45);
    background: #d4f94a;
  }
  .nav-cta:active { transform: scale(.97); }

  .nav-cta-arrow {
    display: inline-block;
    transition: transform .2s cubic-bezier(.34,1.56,.64,1);
  }
  .nav-cta:hover .nav-cta-arrow {
    transform: translate(2px, -1px);
  }

  /* — Hamburger — */
  .nav-hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 1100;
  }
  .nav-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--ink);
    border-radius: 2px;
    transition: all .3s cubic-bezier(.16,1,.3,1);
  }
  .nav-hamburger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .nav-hamburger.open span:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .nav-hamburger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* — Mobile drawer — */
  .nav-drawer {
    display: none;
    position: fixed;
    top: 68px;
    left: 0; right: 0;
    background: var(--glass);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border-bottom: 1px solid var(--border);
    padding: 16px 20px 24px;
    flex-direction: column;
    gap: 4px;
    z-index: 999;
    transform: translateY(-10px);
    opacity: 0;
    transition: opacity .3s ease, transform .3s cubic-bezier(.16,1,.3,1);
    pointer-events: none;
  }
  .nav-drawer.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
  .nav-drawer-link {
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: var(--muted);
    text-decoration: none;
    padding: 12px 16px;
    border-radius: 12px;
    transition: color .2s, background .2s;
  }
  .nav-drawer-link:hover {
    color: var(--ink);
    background: rgba(17,17,16,.06);
  }
  .nav-drawer-cta {
    margin-top: 8px;
    text-align: center;
    background: var(--lime);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    padding: 13px;
    border-radius: 100px;
    text-decoration: none;
    display: block;
    transition: background .2s;
  }
  .nav-drawer-cta:hover {
    background: #d4f94a;
  }

  @media (max-width: 640px) {
    .nav-links  { display: none; }
    .nav-cta    { display: none; }
    .nav-inner  { padding: 0 20px; }
    .nav-hamburger { display: flex; }
    .nav-drawer    { display: flex; }
  }
`;

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <style>{styles}</style>

      <nav className={`nav-root${scrolled || open ? " scrolled" : ""}`}>
        <div className="nav-inner">

          {/* Logo */}
          <a href="#" className="nav-logo">
            ST
            <span className="nav-logo-dot" />
          </a>

          {/* Desktop links */}
          <div className="nav-links">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="nav-link">{label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href="#contact" className="nav-cta">
            Let's Talk
            <span className="nav-cta-arrow">↗</span>
          </a>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${open ? " open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`nav-drawer${open ? " open" : ""}`}>
        {NAV_LINKS.map(([label, href]) => (
          <a key={label} href={href} className="nav-drawer-link" onClick={close}>
            {label}
          </a>
        ))}
        <a href="#contact" className="nav-drawer-cta" onClick={close}>
          Let's Talk ↗
        </a>
      </div>
    </>
  );
};

export default Nav;