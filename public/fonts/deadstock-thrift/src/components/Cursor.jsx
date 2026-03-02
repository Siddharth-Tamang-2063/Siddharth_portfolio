import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ringPos = useRef({ x: -200, y: -200 })
  const rafRef = useRef(null)
  const visible = useRef(false)

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 769) return

    // Add class to body to hide default cursor
    document.body.classList.add('custom-cursor-active')

    const dot = dotRef.current
    const ring = ringRef.current

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }

      // Show cursor on first move
      if (!visible.current) {
        visible.current = true
        dot.style.opacity = '1'
        ring.style.opacity = '0.6'
        ringPos.current = { x: e.clientX, y: e.clientY }
      }

      // Dot follows instantly
      dot.style.left = e.clientX + 'px'
      dot.style.top = e.clientY + 'px'
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      visible.current = false
    }

    const onEnter = () => {
      if (visible.current) {
        dot.style.opacity = '1'
        ring.style.opacity = '0.6'
      }
    }

    // Hover on interactive elements — expand ring
    const onHoverIn = () => {
      ring.style.width = '52px'
      ring.style.height = '52px'
      ring.style.opacity = '0.4'
      dot.style.width = '5px'
      dot.style.height = '5px'
    }

    const onHoverOut = () => {
      ring.style.width = '30px'
      ring.style.height = '30px'
      ring.style.opacity = '0.6'
      dot.style.width = '8px'
      dot.style.height = '8px'
    }

    const interactives = document.querySelectorAll('a, button, .product-card, input, select, textarea')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // Ring follows with smooth lag via RAF
    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.1
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.1
      ring.style.left = ringPos.current.x + 'px'
      ring.style.top = ringPos.current.y + 'px'
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Small sharp dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#f7f5f2',
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '1.5px solid rgba(247,245,242,0.7)',
          background: 'transparent',
        }}
      />
    </>
  )
}
