import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(247,245,242,0.08)',
      padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 60px) 32px',
      background: '#030303',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '48px',
        marginBottom: '64px',
      }}>
        {/* Brand */}
        <div style={{ gridColumn: 'span 1' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(22px, 3vw, 28px)',
            letterSpacing: '0.2em',
            marginBottom: '16px',
          }}>
            DEADSTOCK<br />THRIFT
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(247,245,242,0.35)', fontWeight: 300, maxWidth: '220px' }}>
            Pre-owned luxury & vintage streetwear. Every piece is dead stock — found once, never repeated.
          </p>
        </div>

        {/* Links */}
        {[
          { title: 'Shop', links: [['New In', '/shop'], ['Streetwear', '/shop'], ['Outerwear', '/shop'], ['Accessories', '/shop']] },
          { title: 'Info', links: [['About Us', '/about'], ['Sustainability', '/about'], ['Authenticity', '/about'], ['Sell to Us', '/contact']] },
          { title: 'Support', links: [['Contact', '/contact'], ['FAQ', '/contact'], ['Shipping', '/contact'], ['Returns', '/contact']] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.4)', marginBottom: '20px' }}>
              {col.title}
            </p>
            {col.links.map(([label, path]) => (
              <Link key={label} to={path} style={{
                display: 'block', fontSize: '13px',
                color: 'rgba(247,245,242,0.35)', marginBottom: '10px',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--white)'}
                onMouseLeave={e => e.target.style.color = 'rgba(247,245,242,0.35)'}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <p style={{ fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.4)', marginBottom: '20px' }}>
            Stay Updated
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(247,245,242,0.35)', lineHeight: 1.6, marginBottom: '20px' }}>
            Get first access to new drops and limited pieces.
          </p>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(247,245,242,0.2)' }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="form-field"
              style={{ borderBottom: 'none', padding: '10px 0', fontSize: '13px' }}
            />
            <button style={{
              background: 'transparent', border: 'none',
              color: 'var(--white)', fontSize: '11px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.6'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >→</button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(247,245,242,0.06)',
        paddingTop: '28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <p style={{ fontSize: '11px', color: 'rgba(247,245,242,0.2)', letterSpacing: '0.05em' }}>
          © 2025 Deadstock Thrift. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Instagram', 'TikTok', 'Twitter', 'Pinterest'].map(sn => (
            <a key={sn} href="#" style={{
              fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(247,245,242,0.2)', transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'rgba(247,245,242,0.2)'}
            >
              {sn}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
