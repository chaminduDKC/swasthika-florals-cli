import React from 'react';
import LOGO from '../assets/logo.png'

const Footer = () => {
    return (
        <footer className="sfd-footer" role="contentinfo">
            <div className="sfd-footer-logo">Swasthika Floral Decor</div>
            <img style={{width:"100px", height:"100px", overflow:"hidden", }} src={LOGO} alt="swasthika floral logo"/>
            {/*<nav className="sfd-footer-links" aria-label="Footer navigation">*/}
            {/*    {[["Collections", "categories"], ["About", "about"], ["Process", "process"], ["Gallery", "gallery"], ["Contact", "contact"]].map(([label, id]) => (*/}
            {/*        <a key={id} onClick={() => scrollTo(id)}>{label}</a>*/}
            {/*    ))}*/}
            {/*</nav>*/}
            <div className="sfd-footer-copy">© {new Date().getFullYear()} Swasthika Floral Decor. All rights reserved.</div>
        </footer>
    );
};

export default Footer;