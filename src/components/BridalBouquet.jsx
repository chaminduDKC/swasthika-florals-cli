import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categoryApi } from '../apis/index.js'

/* ── Arrow SVG ── */
const ArrowSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

/* ── Corner SVGs ── */
const CornerSvgTL = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"
    style={{ position: 'absolute', top: 12, left: 12, width: 32, height: 32, zIndex: 2 }}>
    <path d="M40 0 L0 0 L0 10" stroke="#c9a84c" strokeWidth="1" />
    <path d="M40 0 L40 10" stroke="#c9a84c" strokeWidth="1" />
  </svg>
)
const CornerSvgBR = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"
    style={{ position: 'absolute', bottom: 12, right: 12, width: 32, height: 32, zIndex: 2, transform: 'rotate(180deg)' }}>
    <path d="M40 0 L0 0 L0 10" stroke="#c9a84c" strokeWidth="1" />
    <path d="M40 0 L40 10" stroke="#c9a84c" strokeWidth="1" />
  </svg>
)

/* ── Floral Divider ── */
const FloralDivider = () => (
  <svg width="120" height="24" viewBox="0 0 120 24" fill="none" aria-hidden="true">
    <line x1="0" y1="12" x2="48" y2="12" stroke="#7a6430" strokeWidth="0.8" />
    <circle cx="60" cy="12" r="3" stroke="#c9a84c" strokeWidth="0.8" fill="none" />
    <circle cx="60" cy="12" r="1" fill="#c9a84c" />
    <circle cx="52" cy="12" r="1.5" stroke="#c9a84c" strokeWidth="0.6" fill="none" />
    <circle cx="68" cy="12" r="1.5" stroke="#c9a84c" strokeWidth="0.6" fill="none" />
    <line x1="72" y1="12" x2="120" y2="12" stroke="#7a6430" strokeWidth="0.8" />
  </svg>
)

/* ── Single Bouquet Card ── */
const BouquetCard = ({ cat, index }) => {
  const navigate  = useNavigate()
  const cardRef   = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Scroll reveal
  useEffect(() => {
    if (!cardRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={cardRef}
      className={`sfd-reveal${index === 1 ? ' d1' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/category/${cat._id}`)}
      style={{
        position: 'relative',
        flex: '1 1 380px',
        minHeight: 700,
        overflow: 'hidden',
        
        cursor: 'pointer',
        background: 'var(--card-bg)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,.3)' : 'rgba(201,168,76,.1)'}`,
        transition: 'border-color .4s',
      }}
    >
      {/* Background image */}
      <div style={{
        
        position: 'absolute', inset: 0,
        backgroundImage: `url(${cat.thumbnail})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: hovered ? 'brightness(.9) saturate(1)' : 'brightness(.95) saturate(1)',
        transform: hovered ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform .9s cubic-bezier(.22,1,.36,1), filter .6s',
      }} />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,8,5,.97) 0%, rgba(10,8,5,.4) 55%, transparent 100%)',
      }} />

      {/* Corners */}
      <CornerSvgTL />
      <CornerSvgBR />

      {/* Watermark number */}
      <div style={{
        position: 'absolute', top: 20, right: 24,
        fontFamily: 'var(--ff-display)', fontSize: '5rem',
        fontWeight: 300, color: 'rgba(201,168,76,.07)',
        lineHeight: 1, userSelect: 'none',
        opacity: hovered ? 0 : 1, transition: 'opacity .4s',
      }}>
        0{index + 1}
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(24px, 4vw, 40px)',
      }}>

        {/* Expert badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18,
          opacity: hovered ? 1 : 0.6, transition: 'opacity .4s',
        }}>
          <div style={{ width: 20, height: 1, background: 'var(--gold)' }} />
          <span style={{ fontSize: '.58rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Expert Crafted
          </span>
          <div style={{ width: 20, height: 1, background: 'var(--gold)' }} />
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--ff-display)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          fontWeight: 400, color: 'var(--cream)', lineHeight: 1.05, marginBottom: 6,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform .4s cubic-bezier(.22,1,.36,1)',
        }}>
          {cat.name}
        </h3>

        {/* Label */}
        <div style={{
          fontFamily: 'var(--ff-display)', fontSize: '1.1rem',
          fontStyle: 'italic', color: 'var(--gold)', marginBottom: 16,
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'transform .4s .04s cubic-bezier(.22,1,.36,1)',
        }}>
          {cat.label}
        </div>

        {/* Description — slides in on hover */}
        <p style={{
          fontSize: '.82rem', color: 'rgba(213,199,170,.75)',
          lineHeight: 1.8, marginBottom: 24,
          maxHeight: hovered ? '120px' : '0px',
          overflow: 'hidden',
          opacity: hovered ? 1 : 0,
          transition: 'max-height .5s cubic-bezier(.22,1,.36,1), opacity .35s',
        }}>
          {cat.description}
        </p>

        {/* Explore button */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: hovered ? 16 : 10,
          transition: 'gap .4s cubic-bezier(.22,1,.36,1)',
        }}>
          <span style={{
            fontSize: '.68rem', letterSpacing: '.25em',
            textTransform: 'uppercase', color: 'var(--gold)',
            fontFamily: 'var(--ff-body)',
          }}>
            Explore Collection
          </span>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4, color: 'var(--gold)',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform .4s cubic-bezier(.22,1,.36,1)',
          }}>
            <div style={{
              width: hovered ? 28 : 12, height: 1, background: 'var(--gold)',
              transition: 'width .4s cubic-bezier(.22,1,.36,1)',
            }} />
            <ArrowSvg />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main BridalBouquet Component ── */
const BridalBouquet = () => {
  const [bouquets, setBouquets] = useState([])
  const [loading,  setLoading]  = useState(true)
  const headerRef = useRef(null)

  // Fetch bridal categories
  useEffect(() => {
    const fetchBridal = async () => {
      try {
        const res = await categoryApi.getBridalCats()
        const all = res.data.data || res.data || []
        console.log("Bridal cat is");
        console.log(res.data.data);
        
       
        setBouquets(all.sort((a, b) => a.order - b.order))
      } catch (err) {
        console.error('BridalBouquet fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchBridal()
  }, [])

  // Header scroll reveal
  useEffect(() => {
       
    if (!headerRef.current || loading) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
      }),
      { threshold: 0.2 }
    )
    headerRef.current.querySelectorAll('.sfd-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  if (loading || bouquets.length === 0) return null

  return (
    <section id="bridal" className="sfd-section-dark" style={{
      
    }}>

      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* ── Header ── */}
        <div ref={headerRef} style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <span className="sfd-section-label sfd-reveal">Exclusively Designed</span>
          <h2 className="sfd-section-title sfd-reveal d1">
            Bridal <em>Bouquets</em>
          </h2>
          <div className="sfd-gold-line sfd-reveal d2" />
          <p className="sfd-reveal d2" style={{
            fontSize: 'clamp(.83rem, 1.5vw, .95rem)',
            color: 'var(--muted)', lineHeight: 1.9,
            maxWidth: 500, letterSpacing: '.03em',
          }}>
            Exclusively crafted by our certified floral experts. Each bouquet
            is a unique work of art — tailored to your vision, perfected for your day.
          </p>
        </div>

        {/* ── Floral Divider ── */}
        <div className="sfd-reveal" style={{ marginBottom: 'clamp(32px, 5vw, 52px)' }}>
          <FloralDivider />
        </div>

        {/* ── Two Cards ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 20,
        }}>
          {bouquets.slice(0, 2).map((cat, i) => (
            <BouquetCard key={cat._id} cat={cat} index={i} />
          ))}
        </div>

        {/* ── Bottom note ── */}
        

      </div>
    </section>
  )
}

export default BridalBouquet
