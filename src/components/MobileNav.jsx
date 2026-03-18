import React, {useState} from 'react';

const MobileNav = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className={`sfd-mobile-menu${menuOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
            <button className="sfd-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
            {["categories", "about", "process", "gallery", "contact"].map((id) => (
                <a key={id} onClick={() => scrollTo(id)} style={{ textTransform: "capitalize" }}>{id}</a>
            ))}
        </div>
    );
};

export default MobileNav;