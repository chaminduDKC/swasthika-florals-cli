import React, { useEffect, useState } from 'react';
import { contactApi, emailApi } from '../apis';

const Contact = () => {
    const [contact, setContact] = useState({})

    useEffect(() => {
        fetchContactDetails()
    }, [])
    const fetchContactDetails = async () => {
        const result = await contactApi.getContactDetails();
        setContact(result.data.data[0]);
        console.log("Contact");
        console.log(result);

    }

    const [form, setForm] = useState({
    name: '', email: '', phone: '', event_date: '', service: '', message: ''
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const sendEnquiry = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.service) {
      alert('Please fill in name, email and service')
      return
    }

    setSending(true)
    try {
        console.log("Form from front");
        
        console.log(form);
        
      await emailApi.sendEnquiry(form)

      setSent(true)
      setForm({ name: '', email: '', phone: '', event_date: '', service: '', message: '' })

    } catch (err) {
      console.error('Enquiry error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
}
    return (
        <section id="contact" className="sfd-section sfd-center" aria-labelledby="contact-heading">
            <div className="sfd-contact-inner">
                <span className="sfd-section-label sfd-reveal">Get In Touch</span>
                <h2 className="sfd-section-title sfd-reveal d1" id="contact-heading">Let's Create Something <em>Extraordinary</em></h2>
                <div className="sfd-gold-line center sfd-reveal d2" />
                <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.8 }} className="sfd-reveal d2">
                    Tell us about your vision and we'll craft a bespoke proposal for your celebration.
                </p>
                <form
      className="sfd-contact-form sfd-reveal d3"
      onSubmit={sendEnquiry}
      aria-label="Contact form"
    >
      {/* Success message */}
      {sent && (
        <div style={{
          padding: '12px 20px', marginBottom: 16,
          background: 'rgba(201,168,76,.08)',
          border: '1px solid rgba(201,168,76,.3)',
          color: 'var(--gold)', fontSize: '.82rem', letterSpacing: '.05em',
        }}>
          ✓ Your enquiry has been sent! We'll get back to you soon.
        </div>
      )}

      <div className="sfd-form-row">
        <input className="sfd-input" type="text"  name="name"       value={form.name}       onChange={handleChange} placeholder="Your Full Name"   required aria-label="Full name"      autoComplete="name" />
        <input className="sfd-input" type="email" name="email"      value={form.email}      onChange={handleChange} placeholder="Email Address"     required aria-label="Email address"  autoComplete="email" />
      </div>
      <div className="sfd-form-row">
        <input className="sfd-input" type="tel"   name="phone"      value={form.phone}      onChange={handleChange} placeholder="Phone Number"               aria-label="Phone number"   autoComplete="tel" />
        <input className="sfd-input" type="date"  name="event_date" value={form.event_date} onChange={handleChange}                                           aria-label="Event date" />
      </div>

      <select className="sfd-select sfd-input" name="service" value={form.service} onChange={handleChange} aria-label="Service required">
        <option value="" disabled>Service Required</option>
        <option value="wedding decoration">Wedding Decoration</option>
        <option value="bouquet">Bridal Bouquet</option>
        <option value="engagement decoration">Engagement Decoration</option>
        <option value="outdoor">Outdoor Functions</option>
        <option value="birthday">Birthday Decoration</option>
        <option value="concert">Concerts</option>
        <option value="other">Other</option>
      </select>

      <textarea
        className="sfd-textarea" name="message" value={form.message} onChange={handleChange}
        placeholder="Tell us about your vision, venue, and any special requests..."
        aria-label="Message"
      />

      <button
        type="submit"
        className="sfd-btn-primary"
        disabled={sending}
        style={{ alignSelf: 'center', marginTop: 8, padding: '16px 56px', opacity: sending ? .6 : 1 }}
      >
        {sending ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>







            </div>

            <div className='sfd-contact-info'>

                {/* Phone */}
                <div style={{ display: 'flex', flexDirection:"column",  alignItems: 'center', gap: 16 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        border: '1px solid rgba(201,168,76,.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>Phone</div>
                        <a href={`tel:${contact.phone}`} style={{ fontSize: '.9rem', color: 'var(--text)', textDecoration: 'none', letterSpacing: '.05em' }}>
                            {contact.phone}
                        </a>
                    </div>
                </div>



                <div style={{ display: 'flex', flexDirection:"column",  alignItems: 'center', gap: 16 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        border: '1px solid rgba(201,168,76,.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>Email</div>
                        <a href={`mailto:${contact.email}`} style={{ fontSize: '.9rem', color: 'var(--text)', textDecoration: 'none', letterSpacing: '.05em' }}>
                            {contact.email}
                        </a>
                    </div>
                </div>


                {/* Address */}
                <div style={{ display: 'flex',flexDirection:"column",  alignItems: 'center', gap: 16 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                        border: '1px solid rgba(201,168,76,.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>Address</div>
                        <div style={{ fontSize: '.9rem', color: 'var(--text)', lineHeight: 1.7 }}>
                            {contact.address}
                        </div>
                        <div style={{ fontSize: '.75rem', letterSpacing: '.15em', color: 'var(--gold)', marginTop: 2 }}>
                            {contact.city}
                        </div>
                    </div>
                </div>








            </div>



            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: '.6rem', letterSpacing: '.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                    Follow Us
                </div>

                <div style={{ display: 'flex', justifyContent: "center", gap: 12 }}>
                    <a href={`${contact.facebook}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 16px',
                            border: '1px solid rgba(201,168,76,.2)',
                            color: 'var(--text)', textDecoration: 'none',
                            fontSize: '.75rem', letterSpacing: '.1em',
                            transition: 'all .3s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.2)'; e.currentTarget.style.color = 'var(--text)' }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                        </svg>
                        Facebook

                    </a>




                    <a href={`https://instagram.com/${contact.instagram}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 16px',
                            border: '1px solid rgba(201,168,76,.2)',
                            color: 'var(--text)', textDecoration: 'none',
                            fontSize: '.75rem', letterSpacing: '.1em',
                            transition: 'all .3s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.2)'; e.currentTarget.style.color = 'var(--text)' }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        Instagram
                    </a>

                    <a href={`https://wa.me/${contact.phone}/`}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '8px 16px',
                            border: '1px solid rgba(201,168,76,.2)',
                            color: 'var(--text)', textDecoration: 'none',
                            fontSize: '.75rem', letterSpacing: '.1em',
                            transition: 'all .3s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,.2)'; e.currentTarget.style.color = 'var(--text)' }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.525 5.847L.057 23.571a.75.75 0 00.921.921l5.726-1.468A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.18-1.433l-.36-.214-3.862.99.999-3.768-.233-.374A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </svg>
                        WhatsApp

                    </a>


                </div>
                <div style={{ height: 1, background: 'linear-gradient(to right, var(--gold-dim), transparent)' }} />
                {contact.mapUrl && (
                    <div style={{ borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(201,168,76,.15)' }}>
                        <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.mapUrl)}&output=embed`}
                            width="100%" height="220"
                            style={{ display: 'block', border: 'none', filter: 'grayscale(1) brightness(.7)' }}
                            title="Location"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>

        </section>
    );
};

export default Contact;