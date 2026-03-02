import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  { year: '2018', event: 'Founded in London', desc: 'Started from a bedroom, sourcing deadstock from estate sales and factory closures.' },
  { year: '2019', event: 'First Online Store', desc: 'Launched online, sold out first 50-piece archive drop in under 4 hours.' },
  { year: '2021', event: 'Authentication Lab', desc: 'Opened in-house authentication and garment restoration studio in East London.' },
  { year: '2023', event: 'Global Reach', desc: 'Shipping to 40+ countries. 1,200+ authenticated pieces sold.' },
  { year: '2025', event: 'Physical Flagship', desc: 'First brick-and-mortar space opening in Shoreditch, London.' },
]

export default function About() {
  useScrollReveal()
  const heroRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(heroRef.current.querySelectorAll('.anim'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 }
    )

    // Parallax on large image
    gsap.to('.parallax-img', {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: { trigger: '.parallax-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{
        minHeight: '70vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        borderBottom: '1px solid rgba(247,245,242,0.07)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Hero Right: Editorial image stack */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '42%',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
            alt="About hero"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
              opacity: 0.18,
            }}
          />
          {/* fade left */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--black) 0%, transparent 60%)',
          }} />
        </div>

        <p className="anim" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '24px', opacity: 0 }}>
          Our Story
        </p>
        <h1 className="anim" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 10vw, 140px)',
          lineHeight: 0.9, letterSpacing: '0.02em',
          maxWidth: '700px',
          opacity: 0,
        }}>
          BUILT ON<br />DEAD<br />STOCK.
        </h1>
        <div className="anim" style={{ width: '60px', height: '1px', background: 'var(--white)', margin: '40px 0', opacity: 0 }} />
        <p className="anim" style={{
          fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.75,
          color: 'rgba(247,245,242,0.5)', maxWidth: '480px',
          fontWeight: 300, opacity: 0,
        }}>
          We didn't set out to build a brand. We set out to preserve the garments that the industry forgot —
          and connect them with the people who understand their worth.
        </p>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px', alignItems: 'center',
      }}>
        <div className="parallax-section reveal-left" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/5' }}>
          <img
            className="parallax-img"
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
            alt="Deadstock"
            style={{ width: '100%', height: '120%', objectFit: 'cover', filter: 'grayscale(100%)' }}
          />
          {/* Overlay text */}
          <div style={{
            position: 'absolute', bottom: '24px', left: '24px', right: '24px',
            background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(10px)',
            padding: '20px',
          }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '14px', fontStyle: 'italic', color: 'rgba(247,245,242,0.7)', lineHeight: 1.5 }}>
              "The rarest pieces aren't in stores. They're in the places people stopped looking."
            </p>
          </div>
        </div>

        <div className="reveal-right">
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '24px' }}>
            The Philosophy
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '28px' }}>
            Every garment<br />has a <em>second life.</em>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(247,245,242,0.5)', fontWeight: 300, marginBottom: '20px' }}>
            Fast fashion has trained us to think clothing is disposable. We believe the opposite. A Carhartt
            jacket from 1998 was built to outlast three lifetimes. Archive Helmut Lang from 2001 is more relevant
            today than when it was first made.
          </p>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(247,245,242,0.5)', fontWeight: 300, marginBottom: '40px' }}>
            We find these pieces. We authenticate them. We restore them. And we put them in the hands of
            people who will wear them with the respect they deserve.
          </p>
          <Link to="/shop" className="btn btn-outline">Shop the Archive</Link>
        </div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        background: '#080808',
        borderTop: '1px solid rgba(247,245,242,0.05)',
        borderBottom: '1px solid rgba(247,245,242,0.05)',
      }}>
        <p className="reveal" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '16px' }}>
          History
        </p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 7vw, 80px)', letterSpacing: '0.03em', marginBottom: '72px', lineHeight: 0.9 }}>
          THE JOURNEY
        </h2>

        <div style={{ position: 'relative' }}>
          {/* Line */}
          <div style={{
            position: 'absolute', left: '80px', top: 0, bottom: 0,
            width: '1px', background: 'rgba(247,245,242,0.08)',
          }} className="hide-mobile" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {timeline.map((item, i) => (
              <div key={i} className="reveal" data-delay={i * 80} style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '40px',
                padding: '32px 0',
                borderBottom: '1px solid rgba(247,245,242,0.05)',
                alignItems: 'start',
              }}>
                <div style={{ width: '80px', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '20px', letterSpacing: '0.05em', color: 'rgba(247,245,242,0.4)' }}>
                    {item.year}
                  </p>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '8px' }}>{item.event}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(247,245,242,0.4)', fontWeight: 300 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES GRID ─── */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '12px' }}>What We Stand For</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '0.03em' }}>OUR VALUES</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', background: 'rgba(247,245,242,0.08)' }}>
          {[
            { n: '01', title: 'Authenticity', text: 'We stake our reputation on every piece. If we can\'t verify it, we don\'t sell it.' },
            { n: '02', title: 'Preservation', text: 'Garments are cultural artifacts. We treat them that way — restored, not destroyed.' },
            { n: '03', title: 'Transparency', text: 'Every flaw is documented. No surprises, no misleading photography. Just honesty.' },
            { n: '04', title: 'Sustainability', text: 'The most sustainable garment is the one already made. We\'re proof of that.' },
            { n: '05', title: 'Education', text: 'We believe knowing the history of a piece changes how you wear it.' },
            { n: '06', title: 'Community', text: 'Built by thrifters, collectors, and obsessives. For the same.' },
          ].map((val, i) => (
            <div key={i} className="reveal" data-delay={i * 80} style={{
              padding: '40px 32px',
              background: '#050505',
              transition: 'background 0.3s',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#0e0e0e'}
              onMouseLeave={e => e.currentTarget.style.background = '#050505'}
            >
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '13px', letterSpacing: '0.2em', color: 'rgba(247,245,242,0.2)', marginBottom: '20px' }}>{val.n}</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '12px' }}>{val.title}</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(247,245,242,0.4)', fontWeight: 300 }}>{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid rgba(247,245,242,0.07)',
        textAlign: 'center',
      }}>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 100px)', letterSpacing: '0.03em', marginBottom: '32px', lineHeight: 0.9 }}>
          READY TO<br />SHOP THE<br />ARCHIVE?
        </h2>
        <div className="reveal" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-white">Browse Collection</Link>
          <Link to="/contact" className="btn btn-outline">Sell to Us</Link>
        </div>
      </section>
    </div>
  )
}
