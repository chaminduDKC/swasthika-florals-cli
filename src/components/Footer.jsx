import React from 'react';
import LOGO from '../assets/logo.png'

const Footer = () => {
    return (
        <footer className="sfd-footer" role="contentinfo">
            <div className="sfd-footer-logo">Swasthika Floral Decor</div>
            <img style={{width:"100px", height:"100px", overflow:"hidden", }} src={LOGO} alt="swasthika floral logo"/>
            
            <div className="sfd-footer-copy">© {new Date().getFullYear()} Swasthika Floral Decor. All rights reserved.</div>
        </footer>
    );
};

export default Footer;