import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { categoryApi, imageApi } from '../apis/index.js'

// ── Optimize Cloudinary image ──
const optimizeImage = (url, width = 800) => {
  if (!url || !url.includes('cloudinary.com')) return url
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`)
}

// ── Back Arrow SVG ──
const BackArrow = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

// ── Close SVG ──


// ── Chevron SVG ──
const ChevronSvg = ({ dir }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    {dir === 'left'
      ? <path d="M15 18l-6-6 6-6" />
      : <path d="M9 18l6-6-6-6" />
    }
  </svg>
)

// ── Full Screen Modal ──
const ImageModal = ({ images, index, onClose }) => {
  const [current, setCurrent] = useState(index)
  const img = images[current]

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowRight') setCurrent(p => Math.min(p + 1, images.length - 1))
      if (e.key === 'ArrowLeft')  setCurrent(p => Math.max(p - 1, 0))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [images.length, onClose])

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,.95)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'sfd-fadeIn .3s ease',
      }}
    >
      {/* Close button */}


<button  onClick={onClose} style={{
   position: 'absolute', top: 20, right: 40,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(10,8,5,.35)',       // ← --black with opacity
  border: '1px solid rgba(201,168,76,.3)',  // ← --gold border
  borderRadius: '50%',
  width: 40, height: 40,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  cursor: 'pointer',
  backdropFilter: 'blur(8px)',          // ← blurs whatever is behind
}}>
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
</button>

      {/* <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
          color: '#fff', borderRadius: '50%', width: 44, height: 44,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'background .2s', zIndex: 10,
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
      >
        <CloseSvg />
      </button> */}

      {/* Counter */}
      <div style={{
        position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
        fontSize: '.75rem', letterSpacing: '.2em', color: 'rgba(255,255,255,.5)',
      }}>
        {current + 1} / {images.length}
      </div>

      {/* Prev button */}
      {current > 0 && (
        <button
          onClick={e => { e.stopPropagation(); setCurrent(p => p - 1) }}
          style={{
            position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
            color: '#fff', borderRadius: '50%', width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
        >
          <ChevronSvg dir="left" />
        </button>
      )}

      {/* Next button */}
      {current < images.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); setCurrent(p => p + 1) }}
          style={{
            position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
            color: '#fff', borderRadius: '50%', width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.2)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.1)'}
        >
          <ChevronSvg dir="right" />
        </button>
      )}

      {/* Image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 900, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <img
          src={optimizeImage(img.secure_url || img.url, 1600)}
          alt={img.title}
          loading="lazy"
          style={{
            width: '100%', maxHeight: '75vh', objectFit: 'contain',
            borderRadius: 4,
          }}
        />

        {/* Image info */}
        <div style={{
          background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 4, padding: '16px 20px',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: '#f0eaf8', fontWeight: 400 }}>
              {img.title}
            </h3>
            {img.categoryName && (
              <span style={{
                fontSize: '.65rem', letterSpacing: '.2em', textTransform: 'uppercase',
                color: '#c9a84c', border: '1px solid rgba(201,168,76,.3)',
                padding: '3px 10px', borderRadius: 20,
              }}>
                {img.categoryName}
              </span>
            )}
          </div>
          {img.description && (
            <p style={{ fontSize: '.83rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.7 }}>
              {img.description}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{
          display: 'flex', gap: 8, marginTop: 16,
          overflowX: 'auto', maxWidth: 900, width: '100%', paddingBottom: 4,
        }}>
          {images.map((im, i) => (
            <div
              key={im._id}
              onClick={e => { e.stopPropagation(); setCurrent(i) }}
              style={{
                flexShrink: 0, width: 60, height: 60, borderRadius: 4,
                overflow: 'hidden', cursor: 'pointer',
                border: `2px solid ${i === current ? '#c9a84c' : 'transparent'}`,
                opacity: i === current ? 1 : 0.5,
                transition: 'all .2s',
              }}
            >
              <img
                src={optimizeImage(im.secure_url || im.url, 120)}
                alt={im.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Image Card ──
const ImageCard = ({ image, index, onClick }) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      onClick={() => onClick(index)}
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        borderRadius: 2, background: '#1a1510',
        animation: `sfd-fadeUp .5s ease ${index * 0.05}s both`,
      }}
      onMouseEnter={e => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'
        e.currentTarget.querySelector('.img-overlay').style.opacity = '1'
      }}
      onMouseLeave={e => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1)'
        e.currentTarget.querySelector('.img-overlay').style.opacity = '0'
      }}
    >
      {/* Skeleton loader */}
      {!loaded && (
        <div style={{
          width: '100%', paddingBottom: '75%',
          background: 'linear-gradient(90deg, #1a1510 25%, #2a2015 50%, #1a1510 75%)',
          backgroundSize: '400px 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      )}

      {/* Image */}
      <img
        src={optimizeImage(image.secure_url || image.url, 600)}
        alt={image.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', display: 'block',
          aspectRatio: '4/3', objectFit: 'cover',
          transition: 'transform .6s cubic-bezier(.22,1,.36,1)',
          opacity: loaded ? 1 : 0,
        }}
      />

      {/* Hover overlay */}
      <div
        className="img-overlay"
        style={{
          position: 'absolute', inset: 0, opacity: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 60%, transparent 100%)',
          transition: 'opacity .4s ease',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '16px',
        }}
      >
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: '#f0eaf8', fontWeight: 400, marginBottom: 4 }}>
          {image.title}
        </div>
        {image.description && (
          <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {image.description}
          </div>
        )}
        <div style={{ marginTop: 10, fontSize: '.65rem', letterSpacing: '.15em', textTransform: 'uppercase', color: '#c9a84c' }}>
          View Full ↗
        </div>
      </div>
    </div>
  )
}

// ── Main Page ──
export default function CategoryGallery() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory]   = useState(null)
  const [images, setImages]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [modalIndex, setModalIndex] = useState(null)

  useEffect(() => {
    console.log(`id is ${id}`);
    
    const fetchData = async () => {
      try {
        const catRes = await categoryApi.getCategory(id);
        console.log(catRes.data.data    );
        setCategory(catRes?.data?.data)
      } catch (error) {
         console.error('Failed to load:', error)
      }
      try {
        const imgRes = await imageApi.getImagesByCategory(id)
        console.log(imgRes);
        setImages(imgRes?.data?.data)
        
      } catch (err) {
        console.error('Failed to load:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    window.scrollTo(0, 0)  // scroll to top on page load
  }, [id])

  if (loading) return (
    <div style={{
      minHeight: '100vh', background: '#09080f',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid rgba(201,168,76,.2)',
        borderTopColor: '#c9a84c',
        animation: 'spin .7s linear infinite',
      }} />
      <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(201,168,76,.6)', fontSize: '.9rem', letterSpacing: '.2em' }}>
        Loading...
      </span>
    </div>
  )

  if (!category) return (
    <div style={{ minHeight: '100vh', background: '#09080f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#6b5f80' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🌸</div>
        <p>Category not found</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, background: 'none', border: '1px solid #c9a84c', color: '#c9a84c', padding: '10px 24px', cursor: 'pointer', borderRadius: 2 }}>
          Go Back
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#09080f', color: '#c4b8e0', fontFamily: "'Jost', sans-serif", fontWeight: 300 }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Jost:wght@200;300;400;500&display=swap');
        @keyframes sfd-fadeIn  { from { opacity:0; } to { opacity:1; } }
        @keyframes sfd-fadeUp  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin        { to { transform: rotate(360deg); } }
        @keyframes shimmer     { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #09080f; }
        ::-webkit-scrollbar-thumb { background: #6d28d9; border-radius: 2px; }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${optimizeImage(category.thumbnail, 1920)})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(.4) saturate(.7)',
          transform: 'scale(1.05)',
        }} />

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(9,8,15,.3) 0%, rgba(9,8,15,.1) 40%, rgba(9,8,15,.9) 100%)',
        }} />

        {/* Back button */}
        {/* <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute', top: 24, left: 24,
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(9,8,15,.6)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,168,76,.3)', color: '#c9a84c',
            padding: '10px 18px', borderRadius: 2, cursor: 'pointer',
            fontSize: '.75rem', letterSpacing: '.15em', textTransform: 'uppercase',
            transition: 'all .2s', fontFamily: "'Jost', sans-serif",
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(9,8,15,.6)'}
        >
          <BackArrow /> Back
        </button> */}

        {/* Hero content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(24px, 5vw, 60px)',
          animation: 'sfd-fadeUp .6s ease',
        }}>
          <span style={{ fontSize: '.65rem', letterSpacing: '.35em', textTransform: 'uppercase', color: '#c9a84c', display: 'block', marginBottom: 12 }}>
            Our Collections
          </span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 400, color: '#f0eaf8', lineHeight: 1.05, margin: 0,
          }}>
            {category.name} <em style={{ color: '#c9a84c' }}>{category.label}</em>
          </h1>
        </div>
      </div>

      {/* ── Description ── */}
      <div style={{
        maxWidth: 800, margin: '0 auto',
        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 48px)',
        textAlign: 'center',
        animation: 'sfd-fadeUp .6s .1s ease both',
      }}>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '0 auto 24px' }} />
        <p style={{ fontSize: 'clamp(.9rem, 2vw, 1.1rem)', color: '#9b8db0', lineHeight: 1.9, letterSpacing: '.03em' }}>
          {category.description}
        </p>
        <div style={{ width: 40, height: 1, background: '#c9a84c', margin: '24px auto 0' }} />
      </div>

      {/* ── Image Count ── */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ fontSize: '.65rem', letterSpacing: '.25em', textTransform: 'uppercase', color: '#6b5f80' }}>
          {images.length} {images.length === 1 ? 'Image' : 'Images'}
        </span>
      </div>

      {/* ── Image Grid ── */}
      <div style={{
        maxWidth: 1400, margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 48px) 80px',
      }}>
        {images?.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b5f80' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16, opacity: .4 }}>🌸</div>
            <p style={{ fontSize: '.88rem', letterSpacing: '.1em' }}>No images yet for this category</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 'clamp(8px, 2vw, 16px)',
          }}>
            {images?.map((image, i) => (
              <ImageCard
                key={image._id}
                image={image}
                index={i}
                onClick={(idx) => setModalIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modalIndex !== null && (
        <ImageModal
          images={images}
          index={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </div>
  )
}