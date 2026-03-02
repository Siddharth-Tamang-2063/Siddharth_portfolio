import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { gsap } from 'gsap'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 800,
          padding: '0 clamp(20px, 5vw, 60px)',
          height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(247,245,242,0.06)' : 'none',
          transition: 'background 0.4s, border 0.4s, backdrop-filter 0.4s',
          opacity: 0,
        }}
      >
        {/* Left Links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: '36px' }}>
          {[['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About']].map(([path, label]) => (
            <NavLink key={path} to={path} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(18px, 3vw, 24px)',
          letterSpacing: '0.25em',
          color: 'var(--white)',
          whiteSpace: 'nowrap',
        }}>
          DEADSTOCK THRIFT
        </Link>

        {/* Right */}
        <div className="hide-mobile" style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          <NavLink to="/contact" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
            Contact
          </NavLink>
          <Link to="/shop" style={{
            fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--white)',
            padding: '8px 20px',
            border: '1px solid rgba(247,245,242,0.35)',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--black)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)' }}
          >
            Shop Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'transparent', border: 'none',
            display: 'flex', flexDirection: 'column', gap: '5px',
            padding: '4px', cursor: 'pointer',
            marginLeft: 'auto',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--white)', display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ width: '24px', height: '1px', background: 'var(--white)', display: 'block', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
          <span style={{ width: '24px', height: '1px', background: 'var(--white)', display: 'block', transition: 'transform 0.3s', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {[['/','Home'],['/shop','Shop'],['/about','About'],['/contact','Contact']].map(([path, label]) => (
          <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>{label}</NavLink>
        ))}
      </div>
    </>
  )
}
