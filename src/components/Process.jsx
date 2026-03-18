import React from 'react';

const processSteps = [
    { num: "01", icon: "💬", title: "Consultation", desc: "We meet to understand your vision, theme, venue, and preferences so we can craft a concept unique to you." },
    { num: "02", icon: "✏️", title: "Design", desc: "Our team curates a bespoke floral plan — colour palettes, bloom selections, and layout sketches tailored to your day." },
    { num: "03", icon: "🌺", title: "Sourcing", desc: "We source the freshest seasonal blooms and finest materials to ensure vibrant, long-lasting arrangements." },
    { num: "04", icon: "✨", title: "Installation", desc: "On your special day, our expert team arrives early to set up every detail with precision — so you can simply arrive and shine." },
];
const Process = () => {
    return (
        <section id="process" className="sfd-section-dark" aria-labelledby="process-heading">
            <div style={{ maxWidth: 1400, margin: "0 auto" }}>
                <div className="sfd-center">
                    <span className="sfd-section-label sfd-reveal">How We Work</span>
                    <h2 className="sfd-section-title sfd-reveal d1" id="process-heading">Your Vision, <em>Realised</em></h2>
                    <div className="sfd-gold-line center sfd-reveal d2" />
                </div>
                <div className="sfd-process-grid">
                    {processSteps.map((step, i) => (
                        <div key={step.num} className={`sfd-process-card sfd-reveal${i ? " d" + i : ""}`}>
                            <div className="sfd-process-num" aria-hidden="true">{step.num}</div>
                            <div className="sfd-process-icon" aria-hidden="true">{step.icon}</div>
                            <h3 className="sfd-process-title">{step.title}</h3>
                            <p className="sfd-process-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;