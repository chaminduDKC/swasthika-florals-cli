import React from 'react';


const testimonials = [
    { stars: "★★★★★", text: "The Poruwa decoration was absolutely breathtaking. Every bloom was perfect and the golden accents made it feel like something from a dream. Our guests couldn't stop talking about it.", author: "Nimali & Chamath", event: "Traditional Wedding · Colombo" },
    { stars: "★★★★★", text: "Swasthika created the most stunning entrance arch I have ever seen. The floral wall behind the Setty Back was pure artistry. Worth every penny for the most beautiful day of our lives.", author: "Dilanka & Sanduni", event: "Grand Wedding · Kandy" },
    { stars: "★★★★★", text: "My bridal bouquet was exactly what I envisioned — soft, romantic, and timeless. The table centrepieces brought the whole reception together beautifully. Highly recommend!", author: "Kavindya & Rashith", event: "Luxury Reception · Galle" },
];

const Testimonials = () => {
    return (
        <section id="testimonials" className="sfd-section-dark" aria-labelledby="testi-heading">
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                <div className="sfd-center">
                    <span className="sfd-section-label sfd-reveal">Testimonials</span>
                    <h2 className="sfd-section-title sfd-reveal d1" id="testi-heading">Words from Our <em>Couples</em></h2>
                    <div className="sfd-gold-line center sfd-reveal d2" />
                </div>
                <div className="sfd-testi-grid">
                    {testimonials.map((t, i) => (
                        <div key={i} className={`sfd-testi-card sfd-reveal${i ? " d" + i : ""}`}>
                            <div className="sfd-stars" aria-label="5 stars">{t.stars}</div>
                            <div className="sfd-testi-quote" aria-hidden="true">"</div>
                            <p className="sfd-testi-text">{t.text}</p>
                            <div className="sfd-testi-author">{t.author}</div>
                            <div className="sfd-testi-event">{t.event}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;