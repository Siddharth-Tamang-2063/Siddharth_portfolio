# Deadstock Thrift — Full Website

A full multi-page luxury thrift/vintage clothing brand website built with React + React Router DOM + GSAP + Three.js.

---

## Stack

- **React 18** — UI
- **React Router DOM v6** — Multi-page routing
- **GSAP + ScrollTrigger** — Scroll animations, entrance animations
- **Three.js** — Interactive 3D sculpture in the hero
- **Vite** — Build tool

---

## Pages

| Route | Page |
|-------|------|
| `/` | Home — Hero, 3D model, marquee, featured products, brand story |
| `/shop` | Shop — Filter by category, sort, cart drawer, add-to-cart |
| `/shop/:id` | Product Detail — Image gallery, size selector, related products |
| `/about` | About — Brand story, timeline, values grid |
| `/contact` | Contact — Contact form, FAQ accordion, store info |

---

## Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Animated custom cursor (desktop)
- ✅ GSAP hero entrance animations
- ✅ GSAP ScrollTrigger scroll reveals on all sections
- ✅ Infinite marquee ticker
- ✅ Three.js interactive 3D scene (mouse parallax, breathing animation)
- ✅ Sticky navbar with blur/glass on scroll
- ✅ Mobile hamburger menu
- ✅ Cart drawer with add/remove, quantity controls
- ✅ Product filtering + sorting
- ✅ FAQ accordion
- ✅ Grain film overlay
- ✅ Grayscale image hover effects
- ✅ Parallax scroll effects
- ✅ Black & white editorial theme

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

To build for production:
```bash
npm run build
```

---

## Customisation

- **Brand name / copy** — Edit text in each page file
- **Products** — Edit `src/assets/products.js`
- **Colors** — Edit CSS variables in `src/index.css` (`:root`)
- **3D model** — Edit `src/components/ThreeScene.jsx`
- **Fonts** — Change Google Fonts link in `index.html` and font vars in `index.css`
