import React, { useEffect,useRef, useState } from 'react';
import { categoryApi } from "../apis/index.js"
import { useNavigate } from 'react-router-dom';


const ArrowSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);

/* ── Corner SVG ── */
const CornerSvg = () => (
    <svg className="sfd-cat-corner" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M40 0 L0 0 L0 10" stroke="#c9a84c" strokeWidth="1" />
        <path d="M40 0 L40 10" stroke="#c9a84c" strokeWidth="1" />
    </svg>
);



const CatCard = ({ cat, delay, onEnquire }) => {
const navigate = useNavigate();
    return (
    
    <article className={`sfd-cat-card  sfd-reveal${delay ? " d" + delay : ""}`} aria-label={`${cat.name} ${cat.label}`}>
        <div
            className="sfd-cat-bg"
            style={{
                backgroundImage: `url(${cat.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
        <CornerSvg />
        <div className="sfd-cat-overlay" />
        <div className="sfd-cat-content">
            <span className="sfd-cat-num">{cat.order}</span>
            <h3 className='sfd-cat-name'>{cat.name} <em>{cat.label}</em></h3>
            <span className="sfd-cat-arrow"  onClick={() => {
                navigate(`/category/${cat._id}`)
                console.log(cat._id);
                
                
            }} role="button" tabIndex={0}>
                Explore <ArrowSvg />
            </span>
        </div>

    </article>
);
}


const Category = () => {
    
     const [categoryList, setCategoryList] = useState([]);
        const sectionRef = useRef(null)

    const fetchAllMainCategories = async () => {
        const result = await categoryApi.getAllMainCategories();
        console.log("Before filter");
        console.log(result.data.data);
        
        const sorted = result.data.data.sort((a, b)=> a.order - b.order);
        console.log("result.data.data");
        console.log(sorted);
        setCategoryList(sorted)
    }


    useEffect(() => {
        fetchAllMainCategories()
    }, [])
    
    useEffect(() => {
    // Wait for categories to load first
    if (categoryList.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')  // ← adds 'visible' class
            observer.unobserve(entry.target)        // ← stop watching after revealed
          }
        })
      },
      {
        threshold: 0.15,  // ← trigger when 15% of element is visible
        rootMargin: '0px 0px -50px 0px'  // ← trigger slightly before entering viewport
      }
    )

    // Observe all elements with sfd-reveal class
    const elements = document.querySelectorAll('.sfd-reveal')
    elements.forEach(el => observer.observe(el))

    // Cleanup when component unmounts
    return () => observer.disconnect()

  }, [categoryList])  // ← re-run when categories load

   
    return (
        <section id="categories" className="sfd-section" aria-labelledby="cat-heading">
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                <span className="sfd-section-label sfd-reveal">Our Collections</span>
                <h2 className="sfd-section-title sfd-reveal d1" id="cat-heading">Crafted with <em>Intention</em></h2>
                <div className="sfd-gold-line sfd-reveal d2" />
                <div className="sfd-cat-grid" role="list">
                    
                    {categoryList.map((cat, i) => (
                        <CatCard key={cat._id} cat={cat} delay={i % 3 || null} onEnquire={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Category;