import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { products } from '../assets/products'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function ProductDetail() {
  useScrollReveal()
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImg, setActiveImg] = useState(0)
  const [added, setAdded] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(heroRef.current.querySelectorAll('.anim'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: 'power3.out', delay: 0.2 }
    )
  }, [id])

  if (!product) return (
    <div style={{ paddingTop: '200px', textAlign: 'center' }}>
      <p>Product not found.</p>
      <Link to="/shop" style={{ color: 'var(--white)' }}>← Back to Shop</Link>
    </div>
  )

  const imgs = [product.img, product.img2]
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3)

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Breadcrumb */}
      <div style={{ padding: '20px clamp(20px, 5vw, 60px)', borderBottom: '1px solid rgba(247,245,242,0.07)' }}>
        <p style={{ fontSize: '11px', color: 'rgba(247,245,242,0.3)', letterSpacing: '0.1em' }}>
          <Link to="/" style={{ color: 'inherit' }}>Home</Link> / <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link> / {product.name}
        </p>
      </div>

      {/* Main */}
      <div ref={heroRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(32px, 5vw, 80px)',
        padding: 'clamp(32px, 5vw, 60px) clamp(20px, 5vw, 60px)',
      }}>
        {/* Left: Images */}
        <div className="anim">
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#111', marginBottom: '12px' }}>
            <img src={imgs[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(15%)' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {imgs.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{
                width: '72px', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer',
                border: activeImg === i ? '1px solid var(--white)' : '1px solid transparent',
                opacity: activeImg === i ? 1 : 0.4,
                transition: 'all 0.3s',
              }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <div className="anim" style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(247,245,242,0.3)', padding: '4px 10px', color: 'rgba(247,245,242,0.6)' }}>
              {product.tag}
            </span>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', border: '1px solid rgba(247,245,242,0.15)', padding: '4px 10px', color: 'rgba(247,245,242,0.4)' }}>
              {product.category}
            </span>
          </div>

          <h1 className="anim" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '12px' }}>
            {product.name}
          </h1>

          <div className="anim" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            <p style={{ fontSize: '11px', color: 'rgba(247,245,242,0.35)', letterSpacing: '0.1em' }}>
              {product.year} · Condition: {product.condition}
            </p>
          </div>

          <div className="anim" style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '32px', letterSpacing: '0.05em' }}>${product.price}</span>
            <span style={{ fontSize: '18px', color: 'rgba(247,245,242,0.25)', textDecoration: 'line-through' }}>${product.originalPrice}</span>
            <span style={{
              fontSize: '11px', letterSpacing: '0.1em',
              background: 'rgba(247,245,242,0.08)', padding: '4px 10px',
              color: 'rgba(247,245,242,0.6)',
            }}>
              {Math.round((1 - product.price / product.originalPrice) * 100)}% off
            </span>
          </div>

          {/* Divider */}
          <div className="anim" style={{ width: '100%', height: '1px', background: 'rgba(247,245,242,0.08)', marginBottom: '24px' }} />

          {/* Size */}
          <div className="anim" style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.4)', marginBottom: '12px' }}>
              Size
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.size.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{
                  width: '48px', height: '48px',
                  border: selectedSize === s ? '1px solid var(--white)' : '1px solid rgba(247,245,242,0.2)',
                  background: selectedSize === s ? 'var(--white)' : 'transparent',
                  color: selectedSize === s ? 'var(--black)' : 'var(--white)',
                  fontSize: '12px', letterSpacing: '0.05em',
                  cursor: 'pointer', transition: 'all 0.2s',
                  fontFamily: 'var(--font-body)',
                }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart */}
          <div className="anim" style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
              className="btn btn-white"
              style={{ flex: 1, minWidth: '160px', justifyContent: 'center', opacity: selectedSize ? 1 : 0.5 }}
            >
              {added ? '✓ Added' : '+ Add to Cart'}
            </button>
            <button className="btn btn-outline" style={{ padding: '14px 16px' }}>
              ♡
            </button>
          </div>

          {/* Description */}
          <div className="anim" style={{ borderTop: '1px solid rgba(247,245,242,0.08)', paddingTop: '24px', marginBottom: '24px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '12px' }}>
              Description
            </p>
            <p style={{ fontSize: '14px', lineHeight: 1.8, color: 'rgba(247,245,242,0.55)', fontWeight: 300 }}>
              {product.description}
            </p>
          </div>

          {/* Details grid */}
          <div className="anim" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px',
            borderTop: '1px solid rgba(247,245,242,0.08)', paddingTop: '24px',
          }}>
            {[
              ['Year', product.year],
              ['Condition', product.condition],
              ['Category', product.category],
              ['Authentication', 'Verified ✓'],
              ['Shipping', 'Free worldwide'],
              ['Returns', '14 days'],
            ].map(([label, val]) => (
              <div key={label}>
                <p style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.3)', marginBottom: '4px' }}>{label}</p>
                <p style={{ fontSize: '13px', color: 'rgba(247,245,242,0.7)' }}>{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 60px)', borderTop: '1px solid rgba(247,245,242,0.07)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(247,245,242,0.35)', marginBottom: '32px' }}>
            You Might Also Like
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {related.map(p => (
              <Link key={p.id} to={`/shop/${p.id}`} className="product-card reveal" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card-img" style={{ aspectRatio: '3/4', overflow: 'hidden', background: '#111', marginBottom: '12px' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '15px', marginBottom: '4px' }}>{p.name}</p>
                <p style={{ fontSize: '13px', color: 'rgba(247,245,242,0.5)' }}>${p.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
