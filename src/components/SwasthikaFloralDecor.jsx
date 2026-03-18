import { useState, useEffect, useRef, useCallback } from "react";
import {FontLink} from "../styles/FontLink.jsx";
import Testimonials from "./Testimonials.jsx";
import Marquee from "./Marquee.jsx";
import Category from "./Category.jsx";
import About from "./About.jsx";
import Process from "./Process.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import Gallery from "./Gallery.jsx";

import LOGO from '../assets/logo.png'
import BridalBouquet from "./BridalBouquet.jsx";

/* ── Scroll Reveal Hook ── */
function useReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".sfd-reveal");
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
            { threshold: 0.12 }
        );
        els.forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

/* ── Cursor Hook ── */
function useCursor() {
    const cursorRef = useRef(null);
    const ringRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ring = useRef({ x: 0, y: 0 });
    const raf = useRef(null);

    useEffect(() => {
        const move = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (cursorRef.current) { cursorRef.current.style.left = e.clientX + "px"; cursorRef.current.style.top = e.clientY + "px"; }
        };
        const animate = () => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
            if (ringRef.current) { ringRef.current.style.left = ring.current.x + "px"; ringRef.current.style.top = ring.current.y + "px"; }
            raf.current = requestAnimationFrame(animate);
        };
        document.addEventListener("mousemove", move);
        raf.current = requestAnimationFrame(animate);
        const expand = () => { if (ringRef.current) { ringRef.current.style.width = "52px"; ringRef.current.style.height = "52px"; } if (cursorRef.current) cursorRef.current.style.opacity = "0"; };
        const shrink = () => { if (ringRef.current) { ringRef.current.style.width = "32px"; ringRef.current.style.height = "32px"; } if (cursorRef.current) cursorRef.current.style.opacity = "1"; };
        const interactives = document.querySelectorAll("a, button, .sfd-cat-card, .sfd-gallery-item");
        interactives.forEach((el) => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink); });
        return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
    }, []);
    return { cursorRef, ringRef };
}

export default function App() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { cursorRef, ringRef } = useCursor();
    useReveal();

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    const scrollTo = useCallback((id) => {
        setMenuOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    }, []);


    return (
        <>
            <FontLink />

            {/* Cursor */}
            <div className="sfd-cursor" ref={cursorRef} />
            <div className="sfd-cursor-ring" ref={ringRef} />

            {/* Mobile Menu */}
            <div className={`sfd-mobile-menu${menuOpen ? " open" : ""}`} role="navigation" aria-label="Mobile navigation">
                <button className="sfd-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
                {["categories", "about", "process", "gallery", "contact"].map((id) => (
                    <a key={id} onClick={() => scrollTo(id)} style={{ textTransform: "capitalize" }}>{id}</a>
                ))}
            </div>

            {/* Navbar */}
            <nav className={`sfd-nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <span className="sfd-logo" onClick={() => scrollTo("hero")} role="button" tabIndex={0}>
            <img style={{width:"70px", height:"70px"}} src={LOGO} alt="swasthika floral logo"/>
        </span>

                <ul className="sfd-nav-links">
                    {["categories", "about", "process", "gallery", "contact"].map((id) => (
                        <li key={id}><a onClick={() => scrollTo(id)} style={{ textTransform: "capitalize" }}>{id === "categories" ? "categories" : id}</a></li>
                    ))}
                </ul>
                <button className="sfd-nav-cta" onClick={() => scrollTo("contact")}>Book Consultation</button>
                <button className="sfd-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
                    <span /><span /><span />
                </button>
            </nav>



            {/* ── HERO ── */}
            <section id="hero" className="sfd-hero" aria-label="Hero">
                <div className="sfd-hero-bg" />
                <div className="sfd-hero-ornament" aria-hidden="true">Floral</div>
                <span className="sfd-hero-badge">Luxury Floral Artistry</span>
                <h1 className="sfd-hero-title">
                    Where <em>Blooms</em>
                    <span className="line2">Become Magic</span>
                </h1>
                <p className="sfd-hero-sub">Poruwa · Setty Back · Bridal Bouquet · Table Decor · Oil Lamp · Car Decor</p>
                <div className="sfd-hero-divider" aria-hidden="true" />
                <div className="sfd-hero-ctas">
                    <button className="sfd-btn-primary" onClick={() => scrollTo("categories")}>Explore Collections</button>
                    <button className="sfd-btn-outline" onClick={() => scrollTo("contact")}>Book Your Date</button>
                </div>
            </section>

            <Marquee />

           <Category />
           
           <BridalBouquet />

           <About />

            <Process />

            <Gallery />

            <Testimonials />

            <Contact />

            <Footer />
        </>
    );
}
