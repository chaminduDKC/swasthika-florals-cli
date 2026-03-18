import React, { useEffect, useState } from 'react';
import { categoryApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import { optimizeImage } from '../../utils/optimizeImage';


const ArrowSvg = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
const CornerSvg = () => (
    <svg className="sfd-cat-corner" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M40 0 L0 0 L0 10" stroke="#c9a84c" strokeWidth="1" />
        <path d="M40 0 L40 10" stroke="#c9a84c" strokeWidth="1" />
    </svg>
);

const About = () => {
    const navigate = useNavigate();

    const [engageMentCat, setEngagementCat] = useState({});

    useEffect(() => {
        fetchAllEngCats();
    }, [])

    const fetchAllEngCats = async () => {
        const result = await categoryApi.getEngagementCat();
        setEngagementCat(result.data.data[0])

    }
    return (
        <section id="about" className="sfd-section" aria-labelledby="about-heading" style={{ maxWidth: 1400, margin: "0 auto", }}>
            <span className="sfd-section-label sfd-reveal" >Our Special</span>
            <h2 className="sfd-section-title sfd-reveal d1" id="cat-heading" >Luxury <em>Engagement Ideas</em></h2>
            <div className="sfd-gold-line sfd-reveal d2" />
            <div className="sfd-about-inner">

                <div className="sfd-about-visual">
                    <div className="sfd-about-frame">
                        <div className="sfd-about-frame-icon">
                            <img src={optimizeImage(engageMentCat?.thumbnail, 1000)} alt={engageMentCat.name +" "+ engageMentCat.label} style={{ objectFit: "contain" }} height="100%" width={"100%"} />
                        </div>
                    </div>
                    <div className="sfd-about-frame-2">
                        <div
                            className="sfd-about-frame-icon"
                            style={{
                                position: 'relative',
                                padding: 'clamp(28px, 4vw, 48px)',
                                background: 'var(--card-bg)',
                                border: '1px solid rgba(201,168,76,.2)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: 12,
                                alignItems:"center",
                                overflow: 'hidden',
                                width:"100%",
                                height:"100%",
                                transition: 'border-color .4s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,.5)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,.2)'}
                        >
                            {/* Gold corner */}
                            <CornerSvg />

                            {/* Watermark number */}
                            <div style={{
                                position: 'absolute', top: 16, right: 20,
                                fontFamily: 'var(--ff-display)', fontSize: '5rem',
                                fontWeight: 300, color: 'rgba(201,168,76,.06)',
                                lineHeight: 1, userSelect: 'none',
                                pointerEvents: 'none',
                            }}>

                            </div>

                            {/* Badge */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', justifyContent:"center", gap: 8,
                                marginBottom: 4,
                            }}>
                                <div style={{ width: 20, height: 1, background: 'var(--gold)' }} />
                                <span style={{
                                    fontSize: '.58rem', letterSpacing: '.3em',
                                    textTransform: 'uppercase', color: 'var(--gold)',
                                }}>
                                    Special Collection
                                </span>
                                <div style={{ width: 20, height: 1, background: 'var(--gold)' }} />
                            </div>

                            {/* Title */}




                            {/* Enquire button */}
                            <span
                                className="sfd-cat-arrow"
                                onClick={() => navigate(`/category/${engageMentCat._id}`)}
                                role="button"
                                tabIndex={0}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 10,
                                    fontSize: '.68rem', letterSpacing: '.25em',
                                    textTransform: 'uppercase', color: 'var(--gold)',
                                    cursor: 'pointer', width: 'fit-content',
                                    transition: 'gap .3s var(--tr)',
                                }}
                                onMouseEnter={e => e.currentTarget.style.gap = '18px'}
                                onMouseLeave={e => e.currentTarget.style.gap = '10px'}
                            >
                                Explore Engagements <ArrowSvg />
                            </span>
                        </div>
                    </div>
                    <div className="sfd-about-gold-line" aria-hidden="true" />
                </div>
                <div className="sfd-about-text">
                    <span className="sfd-section-label sfd-reveal">Our Story</span>
                    <h2 className="sfd-section-title sfd-reveal d1" id="about-heading">Passion Blooms <em>Here</em></h2>
                    <div className="sfd-gold-line sfd-reveal d2" />
                    <p className="sfd-reveal d2">Swasthika Floral Decor was born from a deep love for the art of flowers and a desire to bring extraordinary beauty to Sri Lanka's most cherished celebrations. Every arrangement we create tells a story.</p>
                    <p className="sfd-reveal d3">We blend the richness of traditional Sri Lankan aesthetics with contemporary floral design, crafting immersive experiences — from grand Poruwa setups to intimate table settings — with meticulous care and the freshest blooms.</p>
                    <div className="sfd-about-stats sfd-reveal d3">
                        {[["500+", "Events Decorated"], ["8+", "Years of Artistry"], ["5", "Signature Collections"], ["100%", "Fresh Florals"]].map(([num, label]) => (
                            <div key={label} className="sfd-stat-box">
                                <div className="sfd-stat-num">{num}</div>
                                <div className="sfd-stat-label">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;