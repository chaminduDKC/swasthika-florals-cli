import React from 'react';

const marqueeItems = ["Poruwa Decoration", "Setty Back", "Bridal Bouquet", "Entrance Design", "Table Decoration", "Arch & Altar Decoration", "Bridesmaid Bouquet","Boutonnieres","Sign Decor","Chair Decoration", "Oil Lamp", "Car Decoration","Garlands","Centerpieces", "Birthday Functions", "Opening Ceremony", "Luxury Florals", "Wedding Artistry"];

const Marquee = () => {
    return (
        <div className="sfd-marquee-wrap" aria-hidden="true">
            <div className="sfd-marquee-track">
                {[...marqueeItems, ...marqueeItems].map((item, i) => (
                    <div key={i} className="sfd-marquee-item">
                        <span className="sfd-marquee-dot" /> {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Marquee;