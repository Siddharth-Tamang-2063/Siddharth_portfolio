import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../assets/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const MARQUEE_ITEMS = ['DEADSTOCK THRIFT', 'VINTAGE ARCHIVE', 'AUTHENTIC PIECES', 'RARE FINDS', 'EST. 2018', 'CURATED DROPS']

export default function Home() {
  useScrollReveal()

  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const lineRef = useRef(null)
  const parallaxRef = useRef(null)

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.3 })
    tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut' })
      .fromTo(titleRef.current.children, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power4.out' }, '-=0.6')
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.4')

    // Parallax on scroll
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Horizontal scroll text on scroll
    gsap.to('.scroll-text', {
      xPercent: -30,
      ease: 'none',
      scrollTrigger: { trigger: '.scroll-text-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  const featured = products.slice(0, 4)

  return (
    <div>
      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '100px clamp(20px, 5vw, 60px) 60px',
        gap: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Left: Text */}
        <div ref={parallaxRef}>
          <div ref={lineRef} style={{ width: '60px', height: '1px', background: 'var(--white)', marginBottom: '40px', transformOrigin: 'left', transform: 'scaleX(0)' }} />
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.45)', marginBottom: '24px' }}>
            Luxury Pre-Owned — Est. 2018
          </p>

          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(64px, 8vw, 120px)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              marginBottom: '32px',
              overflow: 'hidden',
            }}
          >
            {'DEAD STOCK THRIFT'.split(' ').map((word, i) => (
              <span key={i} style={{ display: 'block', opacity: 0, transform: 'translateY(100px)' }}>{word}</span>
            ))}
          </h1>

          <p ref={subtitleRef} style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            lineHeight: 1.7,
            color: 'rgba(247,245,242,0.5)',
            fontWeight: 300,
            maxWidth: '380px',
            marginBottom: '48px',
            opacity: 0,
          }}>
            Archive pieces. Deadstock finds. Vintage streetwear and designer pre-owned — curated for those who know the history behind the garment.
          </p>

          <div ref={ctaRef} style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', opacity: 0 }}>
            <Link to="/shop" className="btn btn-white">
              Explore Collection
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.2"/></svg>
            </Link>
            <Link to="/about" className="btn btn-outline">Our Story</Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '40px', marginTop: '64px',
            borderTop: '1px solid rgba(247,245,242,0.08)',
            paddingTop: '32px',
          }}>
            {[['1200+', 'Pieces Sold'], ['98%', 'Authentic'], ['7 Yrs', 'Curating']].map(([num, label]) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '0.05em' }}>{num}</p>
                <p style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginTop: '4px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Hero Editorial Image */}
        <div style={{
          position: 'relative',
          height: 'clamp(480px, 80vh, 780px)',
        }}>
          {/* Main large image */}
          <div style={{
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
          }}>
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85"
              alt="Deadstock editorial"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(1.05)',
                transform: `translateY(${typeof window !== 'undefined' ? 0 : 0}px)`,
                transition: 'transform 0.1s linear',
              }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(5,5,5,0.35) 0%, transparent 60%, rgba(5,5,5,0.5) 100%)',
            }} />

            {/* Season badge — top left */}
            <div style={{
              position: 'absolute', top: '24px', left: '24px',
              padding: '8px 16px',
              border: '1px solid rgba(247,245,242,0.4)',
              backdropFilter: 'blur(8px)',
              background: 'rgba(5,5,5,0.55)',
            }}>
              <p style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.7)' }}>
                FW 2025 Archive
              </p>
            </div>

            {/* Piece counter — bottom left */}
            <div style={{
              position: 'absolute', bottom: '24px', left: '24px',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(48px, 6vw, 72px)',
                color: 'rgba(247,245,242,0.08)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                userSelect: 'none',
              }}>01</p>
            </div>

            {/* Bottom right label */}
            <div style={{
              position: 'absolute', bottom: '24px', right: '24px',
              textAlign: 'right',
            }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.4)', marginBottom: '4px' }}>
                Authenticated
              </p>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.6)' }}>
                Deadstock Only ✓
              </p>
            </div>
          </div>

          {/* Floating small image — bottom left offset */}
          <div style={{
            position: 'absolute',
            bottom: '-32px',
            left: '-28px',
            width: 'clamp(100px, 14vw, 160px)',
            aspectRatio: '3/4',
            overflow: 'hidden',
            border: '3px solid var(--black)',
            zIndex: 2,
          }}>
            <img
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&q=80"
              alt="Detail"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
          </div>

          {/* Decorative border frame */}
          <div style={{
            position: 'absolute',
            top: '-16px', right: '-16px',
            width: '120px', height: '120px',
            border: '1px solid rgba(247,245,242,0.12)',
            pointerEvents: 'none', zIndex: 0,
          }} />
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.25)' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'rgba(247,245,242,0.15)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, width: '100%',
              height: '50%', background: 'var(--white)',
              animation: 'grain 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div style={{
        borderTop: '1px solid rgba(247,245,242,0.08)',
        borderBottom: '1px solid rgba(247,245,242,0.08)',
        padding: '16px 0', overflow: 'hidden',
        background: 'rgba(247,245,242,0.02)',
      }}>
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px', letterSpacing: '0.3em',
              color: i % 2 === 0 ? 'var(--white)' : 'rgba(247,245,242,0.25)',
              paddingRight: '60px', whiteSpace: 'nowrap',
            }}>
              {item} <span style={{ color: 'rgba(247,245,242,0.2)', marginRight: '60px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED DROPS ─── */}
      <section style={{ padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)' }}>
        <div className="reveal" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: '56px', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '12px' }}>
              Recent Drops
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, fontStyle: 'italic' }}>
              Featured Pieces
            </h2>
          </div>
          <Link to="/shop" style={{
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(247,245,242,0.45)',
            borderBottom: '1px solid rgba(247,245,242,0.2)', paddingBottom: '4px',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.target.style.color = 'var(--white)'; e.target.style.borderBottomColor = 'var(--white)' }}
            onMouseLeave={e => { e.target.style.color = 'rgba(247,245,242,0.45)'; e.target.style.borderBottomColor = 'rgba(247,245,242,0.2)' }}
          >
            View All →
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
          gap: '24px',
        }}>
          {featured.map((product, i) => (
            <Link
              key={product.id}
              to={`/shop/${product.id}`}
              className="product-card reveal"
              data-delay={i * 100}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {/* Image */}
              <div className="card-img" style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#111', marginBottom: '16px' }}>
                <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)',
                  opacity: 0, transition: 'opacity 0.4s',
                }} className="card-overlay" />
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '14px', left: '14px',
                  padding: '4px 10px',
                  border: '1px solid rgba(247,245,242,0.4)',
                  fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase',
                  background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(4px)',
                }}>
                  {product.tag}
                </div>
                {/* Actions */}
                <div className="card-actions" style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <div style={{
                    padding: '10px', background: 'var(--white)', color: 'var(--black)',
                    textAlign: 'center', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontWeight: 500,
                  }}>
                    Quick View
                  </div>
                </div>
              </div>

              {/* Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <p style={{ fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)' }}>
                  {product.category} · {product.year}
                </p>
                <span style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(247,245,242,0.3)' }}>
                  {product.condition}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '8px', fontWeight: 400 }}>
                {product.name}
              </h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 500 }}>${product.price}</span>
                <span style={{ fontSize: '13px', color: 'rgba(247,245,242,0.3)', textDecoration: 'line-through' }}>${product.originalPrice}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── HORIZONTAL SCROLLING TEXT ─── */}
      <div className="scroll-text-section" style={{ overflow: 'hidden', padding: '40px 0' }}>
        <div className="scroll-text" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(60px, 10vw, 120px)',
          color: 'rgba(247,245,242,0.04)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          VINTAGE ARCHIVE LUXURY PRE-OWNED DEADSTOCK THRIFT RARE FINDS AUTHENTIC PIECES VINTAGE ARCHIVE LUXURY PRE-OWNED DEADSTOCK THRIFT
        </div>
      </div>

      {/* ─── BRAND PROMISE ─── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        background: '#0a0a0a',
        borderTop: '1px solid rgba(247,245,242,0.05)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p className="reveal" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '32px' }}>
            Why Deadstock
          </p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontStyle: 'italic',
            fontWeight: 400,
            lineHeight: 1.3,
            marginBottom: '48px',
          }}>
            "Every garment has a story. We find the ones worth telling."
          </h2>

          <div className="reveal" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '32px', marginTop: '64px',
          }}>
            {[
              { icon: '✓', title: 'Authenticated', desc: 'Every piece verified by experts' },
              { icon: '⊕', title: 'Curated', desc: 'Hand-selected archive quality' },
              { icon: '↺', title: 'Sustainable', desc: 'Pre-loved, not landfill' },
              { icon: '◈', title: 'Rare', desc: 'Pieces you won\'t find elsewhere' },
            ].map(item => (
              <div key={item.title} style={{
                padding: '32px 20px',
                border: '1px solid rgba(247,245,242,0.07)',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(247,245,242,0.25)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(247,245,242,0.07)'}
              >
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '16px', opacity: 0.6 }}>{item.icon}</span>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '8px' }}>{item.title}</p>
                <p style={{ fontSize: '12px', color: 'rgba(247,245,242,0.35)', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px', alignItems: 'center',
      }}>
        <div className="reveal-left">
          <div style={{
            position: 'relative',
            aspectRatio: '4/5',
            background: '#111',
            overflow: 'hidden',
          }}>
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
              alt="About"
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }}
            />
            {/* Corner decoration */}
            <div style={{
              position: 'absolute', top: '-16px', left: '-16px',
              width: '80px', height: '80px',
              border: '1px solid rgba(247,245,242,0.2)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: '-16px', right: '-16px',
              width: '80px', height: '80px',
              border: '1px solid rgba(247,245,242,0.2)',
              pointerEvents: 'none',
            }} />
          </div>
        </div>

        <div className="reveal-right">
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '24px' }}>
            Our Story
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '24px' }}>
            Built for those<br /><em>who know.</em>
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'rgba(247,245,242,0.3)', marginBottom: '24px' }} />
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(247,245,242,0.5)', fontWeight: 300, marginBottom: '40px' }}>
            We started Deadstock Thrift with one obsession: finding the garments that time forgot.
            Archive Helmut Lang. Deadstock Levi's. Pristine Carhartt from the 90s. Pieces that carry weight — cultural, historical, personal.
          </p>
          <Link to="/about" className="btn btn-outline">Read Our Story →</Link>
        </div>
      </section>

      {/* ─── INSTAGRAM GRID PLACEHOLDER ─── */}
      <section style={{ padding: '0 clamp(20px, 5vw, 60px) clamp(60px, 10vw, 120px)' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)' }}>
            @deadstockthrift
          </p>
          <a href="#" style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', borderBottom: '1px solid rgba(247,245,242,0.15)', paddingBottom: '3px', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.target.style.color = 'var(--white)'; e.target.style.borderBottomColor = 'var(--white)' }}
            onMouseLeave={e => { e.target.style.color = 'rgba(247,245,242,0.35)'; e.target.style.borderBottomColor = 'rgba(247,245,242,0.15)' }}
          >
            Follow →
          </a>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '4px',
        }}>
          {[
            'photo-1509631179647-0177331693ae',
            'photo-1512436991641-6745cdb1723f',
            'photo-1551028719-00167b16eac5',
            'photo-1558618666-fcd25c85cd64',
            'photo-1503341504253-dff4815485f1',
            'photo-1515886657613-9f3515b0c78f',
          ].map((id, i) => (
            <div key={i} className="reveal" data-delay={i * 60} style={{
              aspectRatio: '1', overflow: 'hidden', background: '#111',
              filter: 'grayscale(100%)',
              transition: 'filter 0.4s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0%)'}
              onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(100%)'}
            >
              <img
                src={`https://images.unsplash.com/${id}?w=400&q=70`}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
