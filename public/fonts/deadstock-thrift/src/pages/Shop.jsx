import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { products, categories } from '../assets/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Shop() {
  useScrollReveal()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const filtered = products
    .filter(p => activeCategory === 'All' || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      return b.id - a.id
    })

  const addToCart = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setToast(`${product.name} added to cart`)
    setTimeout(() => setToast(null), 2500)
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ─── HERO ─── */}
      <div ref={headerRef} style={{
        padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 60px) clamp(32px, 5vw, 60px)',
        borderBottom: '1px solid rgba(247,245,242,0.07)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: '24px',
        opacity: 0,
      }}>
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '12px' }}>
            The Archive
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 96px)',
            letterSpacing: '0.03em', lineHeight: 0.9,
          }}>
            SHOP ALL
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button onClick={() => setCartOpen(true)} style={{
            background: 'transparent', border: '1px solid rgba(247,245,242,0.25)',
            color: 'var(--white)', padding: '10px 20px',
            fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
            display: 'flex', alignItems: 'center', gap: '8px',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--white)'; e.currentTarget.style.color = 'var(--black)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--white)' }}
          >
            Cart
            {cart.length > 0 && (
              <span style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'var(--white)', color: 'var(--black)',
                fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ─── FILTERS ─── */}
      <div style={{
        padding: '20px clamp(20px, 5vw, 60px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(247,245,242,0.07)',
        flexWrap: 'wrap', gap: '16px',
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? 'var(--white)' : 'transparent',
              color: activeCategory === cat ? 'var(--black)' : 'rgba(247,245,242,0.45)',
              border: '1px solid ' + (activeCategory === cat ? 'var(--white)' : 'rgba(247,245,242,0.15)'),
              padding: '7px 16px',
              fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}>
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{
            background: 'transparent',
            border: '1px solid rgba(247,245,242,0.15)',
            color: 'rgba(247,245,242,0.55)',
            padding: '8px 16px',
            fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
            cursor: 'pointer', outline: 'none',
          }}
        >
          <option value="newest" style={{ background: '#111' }}>Newest</option>
          <option value="price-asc" style={{ background: '#111' }}>Price: Low–High</option>
          <option value="price-desc" style={{ background: '#111' }}>Price: High–Low</option>
        </select>
      </div>

      {/* ─── RESULTS COUNT ─── */}
      <div style={{ padding: '16px clamp(20px, 5vw, 60px)', borderBottom: '1px solid rgba(247,245,242,0.05)' }}>
        <p style={{ fontSize: '11px', color: 'rgba(247,245,242,0.3)', letterSpacing: '0.1em' }}>
          {filtered.length} pieces
        </p>
      </div>

      {/* ─── PRODUCT GRID ─── */}
      <div
        ref={gridRef}
        style={{
          padding: 'clamp(32px, 5vw, 60px) clamp(20px, 5vw, 60px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
          gap: '32px 24px',
        }}
      >
        {filtered.map((product, i) => (
          <Link
            key={product.id}
            to={`/shop/${product.id}`}
            className="product-card reveal"
            data-delay={i * 60}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {/* Image */}
            <div className="card-img" style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#111', marginBottom: '16px' }}>
              <img src={product.img} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(20%)' }} />

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

              {/* Hover: Add to cart */}
              <div className="card-actions" style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                <button
                  onClick={(e) => addToCart(product, e)}
                  style={{
                    width: '100%', padding: '11px',
                    background: 'var(--white)', color: 'var(--black)',
                    border: 'none',
                    fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
                    fontWeight: 600, cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={e => e.target.style.opacity = '0.85'}
                  onMouseLeave={e => e.target.style.opacity = '1'}
                >
                  + Add to Cart
                </button>
              </div>
            </div>

            {/* Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.3)' }}>
                {product.category} · {product.year}
              </p>
              <span style={{ fontSize: '10px', color: 'rgba(247,245,242,0.3)' }}>{product.condition}</span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '17px', marginBottom: '8px', fontWeight: 400 }}>
              {product.name}
            </h3>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 500 }}>${product.price}</span>
              <span style={{ fontSize: '12px', color: 'rgba(247,245,242,0.25)', textDecoration: 'line-through' }}>${product.originalPrice}</span>
              <span style={{ fontSize: '10px', color: 'rgba(247,245,242,0.4)', marginLeft: 'auto' }}>
                {Math.round((1 - product.price / product.originalPrice) * 100)}% off
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── CART DRAWER ─── */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'all' : 'none',
          transition: 'opacity 0.3s',
        }}
      />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)',
        background: '#0c0c0c',
        borderLeft: '1px solid rgba(247,245,242,0.1)',
        zIndex: 1001,
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex', flexDirection: 'column',
        padding: '32px 28px',
        overflow: 'auto',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', letterSpacing: '0.1em' }}>
            CART ({cart.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button onClick={() => setCartOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--white)', fontSize: '20px', cursor: 'pointer' }}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <p style={{ fontSize: '40px', opacity: 0.2 }}>◈</p>
            <p style={{ fontSize: '13px', color: 'rgba(247,245,242,0.35)', letterSpacing: '0.1em' }}>Your cart is empty</p>
            <button onClick={() => setCartOpen(false)} className="btn btn-outline" style={{ marginTop: '8px' }}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: 'flex', gap: '16px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(247,245,242,0.07)',
                }}>
                  <div style={{ width: '80px', aspectRatio: '3/4', flexShrink: 0, overflow: 'hidden', background: '#1a1a1a' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', marginBottom: '4px' }}>{item.name}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(247,245,242,0.35)', marginBottom: '12px' }}>{item.condition}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>${item.price * item.qty}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))} style={{ background: 'transparent', border: '1px solid rgba(247,245,242,0.2)', color: 'var(--white)', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                        <span style={{ fontSize: '13px' }}>{item.qty}</span>
                        <button onClick={() => setCart(c => c.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))} style={{ background: 'transparent', border: '1px solid rgba(247,245,242,0.2)', color: 'var(--white)', width: '24px', height: '24px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                        <button onClick={() => setCart(c => c.filter(i => i.id !== item.id))} style={{ background: 'transparent', border: 'none', color: 'rgba(247,245,242,0.3)', cursor: 'pointer', fontSize: '12px' }}>✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(247,245,242,0.1)', paddingTop: '24px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '13px', color: 'rgba(247,245,242,0.5)' }}>Total</span>
                <span style={{ fontSize: '18px', fontWeight: 500 }}>${total}</span>
              </div>
              <button className="btn btn-white" style={{ width: '100%', justifyContent: 'center' }}>
                Checkout →
              </button>
            </div>
          </>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--white)', color: 'var(--black)',
          padding: '12px 24px',
          fontSize: '12px', letterSpacing: '0.1em',
          zIndex: 2000,
          animation: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}>
          {toast}
        </div>
      )}
    </div>
  )
}
