export const FontLink = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@200;300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; outline: none; }
    :root {
      --black:    #0a0805;
      --dark:     #111008;
      --card-bg:  #16120a;
      --gold:     #c9a84c;
      --gold-lt:  #e8c97a;
      --gold-dim: #7a6430;
      --cream:    #f5edd8;
      --text:     #d6c9aa;
      --muted:    #6b6045;
      --ff-display: 'Cormorant Garamond', serif;
      --ff-body:    'Jost', sans-serif;
      --tr: 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--black);
      color: var(--text);
      font-family: var(--ff-body);
      font-weight: 300;
      overflow-x: hidden;
    }
    body::before {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.35;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

    /* CURSOR */
    .sfd-cursor {
      position: fixed; width: 8px; height: 8px;
      background: var(--gold); border-radius: 50%;
      pointer-events: none; z-index: 10000;
      transform: translate(-50%,-50%);
      transition: width .3s, height .3s, opacity .3s;
    }
    .sfd-cursor-ring {
      position: fixed; width: 32px; height: 32px;
      border: 1px solid rgba(201,168,76,.5); border-radius: 50%;
      pointer-events: none; z-index: 9999;
      transform: translate(-50%,-50%);
      transition: width .3s, height .3s;
    }

    /* NAV */
    .sfd-nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 20px 48px;
      display: flex; align-items: center; justify-content: space-between;
      transition: background var(--tr), padding var(--tr), border-color var(--tr);
    }
    .sfd-nav.scrolled {
      background: rgba(10,8,5,.42);
      backdrop-filter: blur(16px);
      padding: 14px 48px;
      border-bottom: 1px solid rgba(201,168,76,.12);
    }
    .sfd-logo {
    user-select:none;
      font-family: var(--ff-display); font-size: 1.4rem; font-weight: 500;
      color: var(--gold-lt); letter-spacing: .04em; text-decoration: none; cursor: pointer; display:flex; align-items:center;
    }
    .sfd-logo span { font-style: italic; color: var(--cream); }
    .sfd-nav-links { display: flex; gap: 36px; list-style: none; }
    .sfd-nav-links a {
      color: var(--text); text-decoration: none;
      font-size: .78rem; letter-spacing: .15em; text-transform: uppercase;
      transition: color .3s; position: relative; cursor: pointer;
    }
    .sfd-nav-links a::after {
      content: ''; position: absolute; bottom: -4px; left: 0;
      width: 0; height: 1px; background: var(--gold); transition: width .35s;
    }
    .sfd-nav-links a:hover { color: var(--gold-lt); }
    .sfd-nav-links a:hover::after { width: 100%; }
    .sfd-nav-cta {
      background: transparent; border: 1px solid var(--gold-dim);
      color: var(--gold-lt); padding: 9px 22px;
      font-family: var(--ff-body); font-size: .75rem;
      letter-spacing: .14em; text-transform: uppercase; cursor: pointer;
      transition: background var(--tr), border-color var(--tr), color var(--tr);
    }
    .sfd-nav-cta:hover { background: var(--gold); border-color: var(--gold); color: var(--black); }
    .sfd-hamburger {
      display: none; flex-direction: column; gap: 5px;
      cursor: pointer; background: none; border: none; padding: 4px;
    }
    .sfd-hamburger span { display: block; width: 24px; height: 1px; background: var(--gold-lt); transition: all .35s; }

    /* MOBILE MENU */
    .sfd-mobile-menu {
      position: fixed; inset: 0; background: rgba(10,8,5,.98);
      backdrop-filter: blur(20px); z-index: 900;
      display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 36px;
      transform: translateX(100%); transition: transform .5s cubic-bezier(.22,1,.36,1);
    }
    .sfd-mobile-menu.open { transform: translateX(0); }
    .sfd-mobile-menu a {
      font-family: var(--ff-display); font-size: 2.5rem; font-weight: 300;
      color: var(--cream); text-decoration: none; transition: color .3s; cursor: pointer;
    }
    .sfd-mobile-menu a:hover { color: var(--gold-lt); }
    .sfd-mobile-close {
      position: absolute; top: 24px; right: 24px;
      background: none; border: none; color: var(--gold); font-size: 1.5rem; cursor: pointer;
    }

    /* HERO */
    .sfd-hero {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; align-items: center; text-align: center;
      position: relative; padding: 120px 24px 80px; overflow: hidden;
    }
    .sfd-hero-bg {
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,.08) 0%, transparent 65%),
        radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,.04) 0%, transparent 60%),
        radial-gradient(ellipse 50% 50% at 80% 20%, rgba(201,168,76,.05) 0%, transparent 60%);
    }
    .sfd-hero-ornament {
      position: absolute; font-size: 28vw; font-family: var(--ff-display);
      font-style: italic; color: rgba(201,168,76,.03);
      user-select: none; pointer-events: none;
      top: 50%; left: 50%; transform: translate(-50%,-50%);
      white-space: nowrap; letter-spacing: -.02em;
    }
    @keyframes sfdFadeUp { to { opacity:1; transform:translateY(0); } }
    @keyframes sfdFadeIn { to { opacity:1; } }
    @keyframes sfdMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes sfdReveal { to { opacity:1; transform:translateY(0); } }

    .sfd-hero-badge {
      display: inline-block; border: 1px solid var(--gold-dim); color: var(--gold);
      font-size: .68rem; letter-spacing: .25em; text-transform: uppercase;
      padding: 6px 18px; margin-bottom: 32px;
      opacity: 0; transform: translateY(20px);
      animation: sfdFadeUp 1s .3s forwards;
    }
    .sfd-hero-title {
      font-family: var(--ff-display); font-size: clamp(3rem,8vw,7.5rem);
      font-weight: 300; color: var(--cream); line-height: 1; letter-spacing: -.01em;
      opacity: 0; transform: translateY(30px); animation: sfdFadeUp 1.1s .55s forwards;
    }
    .sfd-hero-title em { font-style: italic; color: var(--gold-lt); }
    .sfd-hero-title .line2 { display: block; font-weight: 500; }
    .sfd-hero-sub {
      font-family: var(--ff-body); font-size: clamp(.8rem,1.5vw,1rem);
      color: var(--muted); letter-spacing: .12em; text-transform: uppercase; margin-top: 20px;
      opacity: 0; transform: translateY(20px); animation: sfdFadeUp 1s .85s forwards;
    }
    .sfd-hero-divider {
      width: 1px; height: 60px;
      background: linear-gradient(to bottom, transparent, var(--gold-dim), transparent);
      margin: 36px auto 0; opacity: 0; animation: sfdFadeIn 1.5s 1.2s forwards;
    }
    .sfd-hero-ctas {
      display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-top: 36px;
      opacity: 0; transform: translateY(20px); animation: sfdFadeUp 1s 1s forwards;
    }
    .sfd-btn-primary {
      background: var(--gold); color: var(--black); padding: 14px 38px;
      font-family: var(--ff-body); font-size: .78rem; letter-spacing: .18em;
      text-transform: uppercase; border: none; cursor: pointer;
      transition: background var(--tr), transform .2s; text-decoration: none; display: inline-block;
    }
    .sfd-btn-primary:hover { background: var(--gold-lt); transform: translateY(-2px); }
    .sfd-btn-outline {
      background: transparent; color: var(--gold-lt); padding: 14px 38px;
      font-family: var(--ff-body); font-size: .78rem; letter-spacing: .18em;
      text-transform: uppercase; border: 1px solid var(--gold-dim); cursor: pointer;
      transition: background var(--tr), color var(--tr), transform .2s;
      text-decoration: none; display: inline-block;
    }
    .sfd-btn-outline:hover { background: rgba(201,168,76,.08); transform: translateY(-2px); }

    /* MARQUEE */
    .sfd-marquee-wrap {
      overflow: hidden; border-top: 1px solid rgba(201,168,76,.1);
      border-bottom: 1px solid rgba(201,168,76,.1); padding: 18px 0; background: var(--dark);
    }
    .sfd-marquee-track {
      display: flex; gap: 0; width: max-content; animation: sfdMarquee 60s linear infinite;
    }
    .sfd-marquee-item {
      display: flex; align-items: center; gap: 28px; padding: 0 32px;
      font-size: .75rem; letter-spacing: .2em; text-transform: uppercase;
      color: var(--gold-dim); white-space: nowrap;
    }
    .sfd-marquee-dot { width: 4px; height: 4px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }

    /* SECTIONS */
    .sfd-section { padding: 100px 0px; }
    .sfd-section-dark {padding: 100px 48px; background: var(--dark); }
    .sfd-section-label {
      font-size: .68rem; letter-spacing: .3em; text-transform: uppercase;
      color: var(--gold); margin-bottom: 14px; display: block;
    }
    .sfd-section-title {
      font-family: var(--ff-display); font-size: clamp(2.2rem,5vw,4rem);
      font-weight: 400; color: var(--cream); line-height: 1.1;
    }
    .sfd-section-title em { font-style: italic; color: var(--gold-lt); }
    .sfd-gold-line { width: 48px; height: 1px; background: var(--gold); margin: 24px 0 32px; }
    .sfd-gold-line.center { margin: 24px auto 32px; }
    .sfd-center { text-align: center; }

    /* REVEAL */
    .sfd-reveal {
      opacity: 0; transform: translateY(36px);
      transition: opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1);
    }
    .sfd-reveal.visible { opacity: 1; transform: translateY(0); }
    .sfd-reveal.d1 { transition-delay: .1s; }
    .sfd-reveal.d2 { transition-delay: .2s; }
    .sfd-reveal.d3 { transition-delay: .3s; }
    .sfd-reveal.d4 { transition-delay: .4s; }

    /* CATEGORIES GRID */
    .sfd-cat-grid {
      display: grid; grid-template-columns: repeat(12,1fr);
      gap: 10px; margin-top: 60px;
     
    }
    .sfd-cat-card {
     
      position: relative; overflow: hidden; cursor: pointer;
      background: var(--card-bg); aspect-ratio: 1/1.15;
      border-radius:2px;
      
    }
    .sfd-cat-card:nth-child(1) { grid-column: 1/6; grid-row: 1; aspect-ratio: 3/3 }
    .sfd-cat-card:nth-child(2) { grid-column: 6/9; grid-row: 1; aspect-ratio: 3/3;}
    .sfd-cat-card:nth-child(3) { grid-column: 9/13; grid-row: 1; aspect-ratio: 3/3;}
    .sfd-cat-card:nth-child(4) { grid-column: 1/5; grid-row: 2; aspect-ratio: 3/3;}
    .sfd-cat-card:nth-child(5) { grid-column: 5/9; grid-row: 2; aspect-ratio: 3/3; }
    .sfd-cat-card:nth-child(6) { grid-column: 9/13;  grid-row: 2; aspect-ratio: 3/3;}
    .sfd-cat-bg {
      position: absolute; inset: 0; background-size: cover; background-position: center;
      transition: transform .8s cubic-bezier(.22,1,.36,1);
      filter: brightness(1) saturate(1);
    }
    .sfd-cat-card:hover .sfd-cat-bg { transform: scale(1.06); filter: brightness(.99) saturate(1); }
    .sfd-cat-bg-1 { background: linear-gradient(145deg, #1a1208 0%, #0d0b06 100%); }
    .sfd-cat-bg-2 { background: linear-gradient(145deg, #120f0a 0%, #0c0a07 100%); }
    .sfd-cat-bg-3 { background: linear-gradient(145deg, #16100b 0%, #0e0c08 100%); }
    .sfd-cat-bg-4 { background: linear-gradient(145deg, #130d09 0%, #100e07 100%); }
    .sfd-cat-bg-5 { background: linear-gradient(145deg, #18130a 0%, #0f0d06 100%); }
    .sfd-cat-floral {
      position: absolute; inset: 0; display: flex; align-items: center;
      justify-content: center; font-size: 7rem; opacity: .06;
      transition: opacity .5s, transform .6s; pointer-events: none;
    }
    .sfd-cat-card:hover .sfd-cat-floral { opacity: .04; transform: scale(1.05) rotate(3deg); }
    .sfd-cat-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(10,8,5,.82) 0%, rgba(10,8,5,.3) 30%, transparent 100%);
      transition: background .3s;
    }
    .sfd-cat-card:hover .sfd-cat-overlay {
      background: linear-gradient(to top, rgba(10,8,5,.97) 0%, rgba(10,8,5,.5) 40%, rgba(10,8,5,.15) 100%);
    }
    .sfd-cat-content {
      position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 28px 32px;
      transform: translateY(8px); transition: transform var(--tr);
    }
    .sfd-cat-card:hover .sfd-cat-content { transform: translateY(0); }
    .sfd-cat-num {
      font-size: .62rem; letter-spacing: .25em; color: var(--gold);
      text-transform: uppercase; margin-bottom: 8px; display: block;
    }
    .sfd-cat-name {
      font-family: var(--ff-display); font-size: clamp(1.4rem,2.5vw,2.2rem);
      font-weight: 400; color: var(--cream); line-height: 1.1;
    }
    .sfd-cat-name em { font-style: italic; color: var(--gold-lt); }
    .sfd-cat-desc {
      font-size: .78rem; color: var(--text); margin-top: 8px; line-height: 1.6;
      opacity: 1; transform: translateY(8px); max-width: 320px;
      transition: opacity .35s .05s, transform .35s .05s;
    }
    .sfd-cat-card:hover .sfd-cat-desc { opacity: 1; transform: translateY(0); }
    .sfd-cat-arrow {
      display: inline-flex; align-items: center; gap: 8px; margin-top: 16px;
      font-size: .72rem; letter-spacing: .18em; text-transform: uppercase;
      color: var(--gold); opacity: 0; transform: translateX(-8px);
      transition: opacity .35s .1s, transform .35s .1s; text-decoration: none; cursor: pointer;
    }
      .sfd-cat-arrow{
        opacity:1
      }
    .sfd-cat-arrow svg { width: 16px; transition: transform .3s; }
    .sfd-cat-card:hover .sfd-cat-arrow { opacity: 1; transform: translateX(0); }
    .sfd-cat-card:hover .sfd-cat-arrow svg { transform: translateX(4px); }
    .sfd-cat-corner { position: absolute; top: 20px; right: 20px; width: 40px; height: 40px; opacity: .3; transition: opacity .35s; }
    .sfd-cat-card:hover .sfd-cat-corner { opacity: .6; }

    /* ABOUT */
    .sfd-about-inner {
      display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center;
      max-width: 1400px; margin: 0 auto;
    }
    .sfd-about-visual { position: relative; height: 560px; }
    .sfd-about-frame {
      position: absolute; top: 0; left: 0; width: 75%; height: 85%;
      background: var(--card-bg); border: 1px solid rgba(201,168,76,.08);
      display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .sfd-about-frame-2 {
      position: absolute; bottom: 0; right: 0; width: 65%; height: 35%;
      background: var(--dark); border: 1px solid rgba(201,168,76,.12);
      display: flex; align-items: center; justify-content: center; overflow: hidden;
      
    }
    .sfd-about-frame-icon { 
    font-size: 5rem; opacity: .9; 
    padding:2px;
    transition: transform .3s;

    }

     .sfd-about-frame-icon:hover{
      transform: scaleX(1.1)
     }
    .sfd-about-frame-2 > .sfd-about-frame-icon{
      display:flex;
      flex-direction:column;
      align-items:flex-end
    }

    .sfd-about-gold-line {
      position: absolute; top: -20px; right: 40px; width: 2px; height: 80px;
      background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    }
    .sfd-about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; margin-top: 40px; }
    .sfd-stat-box { background: var(--card-bg); border: 1px solid rgba(201,168,76,.08); padding: 24px 20px; }
    .sfd-stat-num { font-family: var(--ff-display); font-size: 2.5rem; font-weight: 400; color: var(--gold-lt); line-height: 1; }
    .sfd-stat-label { font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); margin-top: 6px; }
    .sfd-about-text p { font-size: .95rem; line-height: 1.9; color: var(--text); margin-bottom: 20px; }

    /* PROCESS */
    .sfd-process-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 2px; margin-top: 60px; }
    .sfd-process-card {
      background: var(--card-bg); padding: 40px 28px; position: relative; overflow: hidden;
      transition: background var(--tr);
    }
    .sfd-process-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
      background: linear-gradient(to right, transparent, var(--gold), transparent);
      transform: scaleX(0); transition: transform .5s;
    }
    .sfd-process-card:hover { background: #1c1508; }
    .sfd-process-card:hover::before { transform: scaleX(1); }
    .sfd-process-num {
      font-family: var(--ff-display); font-size: 5rem; font-weight: 300;
      color: rgba(201,168,76,.08); line-height: 1; margin-bottom: 16px; transition: color .4s;
    }
    .sfd-process-card:hover .sfd-process-num { color: rgba(201,168,76,.14); }
    .sfd-process-icon { font-size: 1.8rem; margin-bottom: 16px; }
    .sfd-process-title { font-family: var(--ff-display); font-size: 1.4rem; color: var(--cream); margin-bottom: 12px; }
    .sfd-process-desc { font-size: .82rem; line-height: 1.75; color: var(--muted); }

    /* GALLERY */
    .sfd-gallery-strip {
      display: flex; gap: 5px; overflow-x: auto; padding: 0 48px;
      scrollbar-width: none; cursor: grab;
    }
    .sfd-gallery-strip::-webkit-scrollbar { display: none; }
    .sfd-gallery-strip:active { cursor: grabbing; }
    .sfd-gallery-item {
      flex-shrink: 0; width: 320px; height: 380px; background: var(--card-bg);
      border: 1px solid rgba(201,168,76,.06); display: flex; align-items: center;
      justify-content: center; position: relative; overflow: hidden; transition: transform .4s;
    }
    .sfd-gallery-item:hover { transform: scale(1.02); z-index: 2; }
    .sfd-gallery-icon {  opacity: .95; }
    .sfd-gallery-label {
      position: absolute; bottom: 0; left: 0; right: 0; padding: 16px;
      background: linear-gradient(to top, rgba(10,8,5,.9), transparent);
      font-size: 1rem; letter-spacing: .15em; font-weight:400; text-transform: uppercase; color: var(--gold);
    }

    /* TESTIMONIALS */
    .sfd-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2px; margin-top: 56px; }
    .sfd-testi-card {
      background: var(--card-bg); padding: 40px 32px;
      border: 1px solid rgba(201,168,76,.06); position: relative;
    }
    .sfd-testi-quote { font-size: 3rem; font-family: var(--ff-display); color: rgba(201,168,76,.15); line-height: 1; margin-bottom: 20px; }
    .sfd-testi-text { font-size: .9rem; line-height: 1.85; color: var(--text); font-family: var(--ff-display); font-style: italic; margin-bottom: 28px; }
    .sfd-testi-author { font-size: .72rem; letter-spacing: .15em; text-transform: uppercase; color: var(--gold); }
    .sfd-testi-event { font-size: .7rem; color: var(--muted); margin-top: 4px; }
    .sfd-stars { color: var(--gold); font-size: .7rem; letter-spacing: 2px; margin-bottom: 16px; }

    /* CONTACT */
    .sfd-contact-inner { max-width: 640px; margin: 0 auto; padding-top: 20px; }
    .sfd-contact-form { display: flex; flex-direction: column; gap: 12px; margin-top: 40px; }
    .sfd-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .sfd-input, .sfd-textarea, .sfd-select {
      background: var(--card-bg); border: 1px solid rgba(201,168,76,.12);
      color: var(--text); padding: 14px 18px;
      font-family: var(--ff-body); font-size: .85rem; outline: none;
      transition: border-color .3s; width: 100%;
    }
    .sfd-input::placeholder, .sfd-textarea::placeholder { color: var(--muted); }
    .sfd-input:focus, .sfd-textarea:focus, .sfd-select:focus { border-color: var(--gold-dim); }
    .sfd-select { appearance: none; cursor: pointer; }
    .sfd-select option { background: var(--card-bg); }
    .sfd-textarea { resize: vertical; min-height: 120px; }
    .sfd-contact-info {
      display: flex; justify-content: center; gap: 48px; margin-top: 56px;
      padding-top: 48px; border-top: 1px solid rgba(201,168,76,.1); flex-wrap: wrap;
    }
    .sfd-contact-item { text-align: center; }
    .sfd-contact-item-label { font-size: .65rem; letter-spacing: .25em; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
    .sfd-contact-item-val { font-size: .88rem; color: var(--text); }

    /* FOOTER */
    .sfd-footer {
      background: var(--dark); border-top: 1px solid rgba(201,168,76,.1);
      padding: 10px; display: flex; justify-content: space-between;
      align-items: center; flex-wrap: wrap; gap: 24px;
    }
    .sfd-footer-logo { font-family: var(--ff-display); font-size: 1.2rem; color: var(--gold-lt); font-style: italic; }
    .sfd-footer-links { display: flex; gap: 28px; flex-wrap: wrap; }
    .sfd-footer-links a {
      font-size: .72rem; letter-spacing: .12em; text-transform: uppercase;
      color: var(--muted); text-decoration: none; transition: color .3s; cursor: pointer;
    }
    .sfd-footer-links a:hover { color: var(--gold); }
    .sfd-footer-copy { font-size: .7rem; color: var(--muted); }

    /* RESPONSIVE */
    @media (max-width: 1100px) {
    .sfd-section { padding: 100px 60px; }
      .sfd-cat-grid { grid-template-columns: 1fr 1fr; }
      .sfd-cat-card:nth-child(1) { grid-column: 1/3; grid-row: 1; aspect-ratio: 16/7; }
      .sfd-cat-card:nth-child(2) { grid-column: 1; grid-row: 2; aspect-ratio: 1/1.15; }
      .sfd-cat-card:nth-child(3) { grid-column: 2; grid-row: 2; aspect-ratio: 1/1.15; }
      .sfd-cat-card:nth-child(4) { grid-column: 1; grid-row: 3; aspect-ratio: 1/1.15; }
      .sfd-cat-card:nth-child(5) { grid-column: 2; grid-row: 3; aspect-ratio: 1/1.15; }
       .sfd-cat-card:nth-child(6) { grid-column: 1;   grid-row: unset; aspect-ratio: 1/1.15; }
      
      
      .sfd-about-inner { grid-template-columns: 1fr; gap: 48px; }
      .sfd-about-visual { height: 380px; }
      .sfd-process-grid { grid-template-columns: 1fr 1fr; }
      .sfd-testi-grid { grid-template-columns: 1fr 1fr; }
    }


    @media (max-width: 768px) {
        
      .sfd-nav { padding: 16px 24px; }
      .sfd-nav.scrolled { padding: 12px 24px; }
      .sfd-nav-links, .sfd-nav-cta { display: none; }
      .sfd-hamburger { display: flex; }
      .sfd-section, .sfd-section-dark { padding: 72px 24px; }
      .sfd-cat-grid { grid-template-columns: 1fr; }
      .sfd-cat-card:nth-child(1),
      .sfd-cat-card:nth-child(2),
      .sfd-cat-card:nth-child(3),
      .sfd-cat-card:nth-child(4),
      .sfd-cat-card:nth-child(5) { 
      grid-column: 1; grid-row: unset; aspect-ratio: 3/3; 
      }
              .sfd-about-frame {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: var(--card-bg); border: 1px solid rgba(201,168,76,.08);
      display: flex; align-items: center; justify-content: center; overflow: hidden;
    }
    .sfd-about-frame-2 {
      position: absolute; bottom: 0; right: 0; width: 55%; height: 35%;
      background: var(--dark); border: 1px solid rgba(201,168,76,.12);
      display: flex; align-items: center; justify-content: center; overflow: hidden;
      
    }
      .sfd-cat-card:nth-child(6) { grid-column: 1;
    grid-row: unset;
    aspect-ratio: 4/3;}
      .sfd-process-grid { grid-template-columns: 1fr; }
      .sfd-testi-grid { grid-template-columns: 1fr; }
      .sfd-form-row { grid-template-columns: 1fr; }
      .sfd-footer { flex-direction: column; align-items: center; padding: 10px 24px; }
      .sfd-about-stats { grid-template-columns: 1fr 1fr; }
      .sfd-gallery-strip { padding: 0 24px; }
    }
  `}</style>
);