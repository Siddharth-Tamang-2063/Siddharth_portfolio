import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Contact() {
  useScrollReveal()
  const heroRef = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    gsap.fromTo(heroRef.current.querySelectorAll('.anim'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ─── HERO ─── */}
      <section ref={heroRef} style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px) clamp(40px, 5vw, 60px)',
        borderBottom: '1px solid rgba(247,245,242,0.07)',
      }}>
        <p className="anim" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '16px', opacity: 0 }}>
          Get In Touch
        </p>
        <h1 className="anim" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(56px, 10vw, 120px)',
          lineHeight: 0.9, letterSpacing: '0.02em',
          marginBottom: '24px', opacity: 0,
        }}>
          CONTACT<br />US.
        </h1>
        <p className="anim" style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(247,245,242,0.45)', maxWidth: '440px', fontWeight: 300, opacity: 0 }}>
          Questions, wholesale inquiries, or want to sell us your archive? We want to hear from you.
        </p>
      </section>

      {/* ─── CONTENT ─── */}
      <section style={{
        padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 60px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '80px',
      }}>

        {/* Left: Form */}
        <div>
          {submitted ? (
            <div style={{ padding: '48px 0' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '40px', letterSpacing: '0.05em', marginBottom: '16px' }}>
                RECEIVED.
              </p>
              <p style={{ fontSize: '14px', color: 'rgba(247,245,242,0.5)', lineHeight: 1.7, marginBottom: '32px' }}>
                We typically respond within 24–48 hours. In the meantime, feel free to browse the archive.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-outline">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="reveal">
                <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', display: 'block', marginBottom: '8px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="form-field"
                  placeholder="Full name"
                />
              </div>

              <div className="reveal">
                <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', display: 'block', marginBottom: '8px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="form-field"
                  placeholder="your@email.com"
                />
              </div>

              <div className="reveal">
                <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', display: 'block', marginBottom: '12px' }}>
                  Subject
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[['general', 'General'], ['sell', 'Sell to Us'], ['wholesale', 'Wholesale'], ['press', 'Press']].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm({ ...form, subject: val })}
                      style={{
                        padding: '8px 16px',
                        border: form.subject === val ? '1px solid var(--white)' : '1px solid rgba(247,245,242,0.2)',
                        background: form.subject === val ? 'var(--white)' : 'transparent',
                        color: form.subject === val ? 'var(--black)' : 'rgba(247,245,242,0.5)',
                        fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'all 0.2s',
                        fontFamily: 'var(--font-body)',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="reveal">
                <label style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', display: 'block', marginBottom: '8px' }}>
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="form-field"
                  placeholder="Tell us what's on your mind..."
                  style={{ resize: 'vertical', minHeight: '140px' }}
                />
              </div>

              <div className="reveal">
                <button type="submit" className="btn btn-white" style={{ justifyContent: 'center' }}>
                  Send Message →
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {[
            {
              title: 'Email',
              lines: ['hello@deadstockthrift.com', 'orders@deadstockthrift.com'],
            },
            {
              title: 'Flagship Store',
              lines: ['48 Redchurch Street', 'Shoreditch, London E2 7DP', 'Open Tue–Sat, 11am–7pm'],
            },
            {
              title: 'Sell to Us',
              lines: ['We accept individual pieces and collections.', 'Email with photos and provenance.', 'Fair market offers within 48hrs.'],
            },
            {
              title: 'Press & Partnerships',
              lines: ['press@deadstockthrift.com'],
            },
          ].map((block, i) => (
            <div key={i} className="reveal" data-delay={i * 80}>
              <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.3)', marginBottom: '12px' }}>
                {block.title}
              </p>
              {block.lines.map((line, j) => (
                <p key={j} style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(247,245,242,0.6)', fontWeight: 300 }}>
                  {line}
                </p>
              ))}
            </div>
          ))}

          {/* Map placeholder */}
          <div className="reveal" style={{
            aspectRatio: '16/9',
            background: '#111',
            border: '1px solid rgba(247,245,242,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '12px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Grid pattern for map feel */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(247,245,242,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(247,245,242,0.04) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }} />
            <span style={{ fontSize: '24px', opacity: 0.3, position: 'relative' }}>◎</span>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.25)', position: 'relative' }}>
              Shoreditch, London
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{
        padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 60px)',
        borderTop: '1px solid rgba(247,245,242,0.07)',
        background: '#080808',
      }}>
        <p className="reveal" style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '16px' }}>
          Common Questions
        </p>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '0.03em', marginBottom: '56px', lineHeight: 0.9 }}>
          FAQ
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0', borderTop: '1px solid rgba(247,245,242,0.08)' }}>
          {[
            { q: 'How do you authenticate pieces?', a: 'All items are examined in our London authentication lab. We check stitching, labels, hardware, and provenance. If it fails any check, it doesn\'t make it to the site.' },
            { q: 'Can I sell my archive to you?', a: 'Yes. Send us high-res photos, size information, and any provenance you have. We\'ll review and make an offer within 48 hours.' },
            { q: 'Do you offer returns?', a: 'We accept returns within 14 days if the item is substantially different from its description. All sales of deadstock/NWT pieces are final.' },
            { q: 'How long does shipping take?', a: 'UK: 1–3 days. Europe: 3–5 days. Worldwide: 5–10 days. Every order is fully tracked and insured.' },
            { q: 'Do you do consignment?', a: 'For significant archive pieces or collections, yes. Get in touch and we\'ll work out a structure that makes sense for both parties.' },
            { q: 'What condition gradings mean?', a: 'Deadstock/NWT = unworn with tags. Near Mint = worn once or twice, no visible wear. Excellent = light wear, no damage. Very Good = normal wear, minor flaws documented.' },
          ].map((item, i) => (
            <FAQItem key={i} item={item} i={i} />
          ))}
        </div>
      </section>
    </div>
  )
}

function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="reveal"
      data-delay={i * 60}
      style={{
        borderBottom: '1px solid rgba(247,245,242,0.08)',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(!open)}
    >
      <div style={{
        padding: '24px 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
      }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', fontWeight: 400 }}>{item.q}</h3>
        <span style={{ fontSize: '18px', color: 'rgba(247,245,242,0.4)', flexShrink: 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s', display: 'block' }}>+</span>
      </div>
      <div style={{
        maxHeight: open ? '200px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(247,245,242,0.45)', fontWeight: 300, paddingBottom: '24px' }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}
