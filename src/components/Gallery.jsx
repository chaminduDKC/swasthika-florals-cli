import React, { useEffect, useRef, useState } from 'react';
import { categoryApi } from '../apis';
import { useNavigate } from 'react-router-dom';
import { optimizeImage } from '../../utils/optimizeImage';



const Gallery = () => {
    const navigateTo = useNavigate()

    const [otherCats, setOtherCats] = useState([]);
    useEffect(() => {
        fetchOtherCats()
    }, [])

    const fetchOtherCats = async () => {
        const result = await categoryApi.getOtherCats();
        setOtherCats(result.data.data);
    }


    const stripRef = useRef(null);
    const drag = useRef({ down: false, startX: 0, scrollLeft: 0 });
    const onMouseDown = (e) => { drag.current = { down: true, startX: e.pageX - stripRef.current.offsetLeft, scrollLeft: stripRef.current.scrollLeft }; };
    const onMouseUp = () => { drag.current.down = false; };
    const onMouseMove = (e) => { if (!drag.current.down) return; e.preventDefault(); const x = e.pageX - stripRef.current.offsetLeft; stripRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.2; };


    return (
        <section id="gallery" style={{ overflow: "hidden" }} aria-labelledby="gallery-heading">
            <div style={{ padding: "0 48px 48px" }}>
                <span className="sfd-section-label sfd-reveal">Our Work</span>
                <h2 className="sfd-section-title sfd-reveal d1" id="gallery-heading">A Glimpse of <em>Beauty</em></h2>
                <div className="sfd-gold-line sfd-reveal d2" />
                <p style={{ fontSize: ".8rem", color: "var(--muted)", letterSpacing: ".1em" }} className="sfd-reveal d2">Drag to explore ←→</p>
            </div>
            {
                otherCats.length === 0 ? (
                    <h1>Empty</h1>
                ) : (
                    <div
                        className="sfd-gallery-strip" ref={stripRef}
                        onMouseDown={onMouseDown} onMouseUp={onMouseUp}
                        onMouseLeave={onMouseUp} onMouseMove={onMouseMove}
                        role="list" aria-label="Gallery of decorated events"
                    >

                        {otherCats.map((item, i) => (
                            <div key={i} className="sfd-gallery-item" role="listitem" onClick={() => {
                                navigateTo(`/category/${item._id}`)
                            }}>
                                <div className="sfd-gallery-icon" aria-hidden="true">
                                    <img src={optimizeImage(item.thumbnail, 800)} style={{
                                        width: '320px',
                                        height: '380px',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        display: 'block',
                                    }} alt={`${item.name} ${item.label}`} />
                                </div>
                                <span className="sfd-gallery-label">{item.name}<em> {item.label}</em></span>
                            </div>
                        ))}
                    </div>
                )
            }


        </section>
    );
};

export default Gallery;