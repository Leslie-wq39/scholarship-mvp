// src/pages/ContactUs.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

export default function ContactUs() {
  // basic client-side form state (replace with real submit later)
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [notice, setNotice] = useState(null); // {type:'ok'|'err', text:string}

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.name || !okEmail || !form.message) {
      setNotice({ type: 'err', text: 'Please fill your name, a valid email, and a message.' });
      return;
    }
    // TODO: send to backend/email service
    setNotice({ type: 'ok', text: 'Thanks! Your message has been sent. We’ll reply within 2–3 working days.' });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* Hero */}
      <section className="contact-hero" role="banner">
        <div className="contact-hero__inner">
          {/* Breadcrumbs */}
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/" className="crumbs__home">
              <svg className="crumbs__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 10.5l9-7 9 7" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M5 11v9h5v-5h4v5h5v-9" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Home</span>
            </Link>
            <span className="crumbs__sep" aria-hidden>›</span>
            <span className="crumbs__current">Contact Us</span>
          </nav>

          <h1 className="contact-hero__title">Contact <span>Us</span></h1>
          <p className="contact-hero__lead">
            Have questions about scholarships, eligibility, or partnerships? We’re here to help.
          </p>

          <div className="contact-hero__cta">
            <a href="#form" className="btn btn--primary">Send a Message</a>
            <Link to="/directory" className="btn btn--ghost">Browse Scholarships</Link>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="contact-cards">
        <div className="contact-wrap cards-grid">
          <article className="c-card">
            <h3>Email Us</h3>
            <ul className="c-list">
              <li><strong>General:</strong> <a href="mailto:info@uyznfoundation.org">info@uyznfoundation.org</a></li>
              <li><strong>Applications:</strong> <a href="mailto:apply@uyznfoundation.org">apply@uyznfoundation.org</a></li>
              <li><strong>Partnerships:</strong> <a href="mailto:partners@uyznfoundation.org">partners@uyznfoundation.org</a></li>
            </ul>
          </article>

          <article className="c-card">
            <h3>Call Us</h3>
            <p className="muted">Mon–Fri, 9:00 AM – 5:00 PM (GMT)</p>
            <p className="phone"><a href="tel:+233209194636">+233 (0) 20 919 4636</a></p>
          </article>

          <article className="c-card">
            <h3>Visit Us</h3>
            <address className="addr">
              UYZN Scholarship Foundation<br/>
              Market Circle, Takoradi, Ghana
            </address>
          </article>
        </div>
      </section>

      {/* Form + Map */}
      <section className="contact-main" id="form">
        <div className="contact-wrap main-grid">
          <form className="c-form" onSubmit={onSubmit} noValidate>
            <h2>Quick Contact Form</h2>
            <p className="muted">We typically reply within 2–3 working days.</p>

            <label className="f-field">
              <span className="f-label">Full Name</span>
              <input
                type="text"
                name="name"
                className="f-input"
                placeholder="Your full name"
                value={form.name}
                onChange={onChange}
                required
              />
            </label>

            <label className="f-field">
              <span className="f-label">Email</span>
              <input
                type="email"
                name="email"
                className="f-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </label>

            <label className="f-field f-field--full">
              <span className="f-label">Message</span>
              <textarea
                name="message"
                className="f-input f-textarea"
                rows="6"
                placeholder="How can we help?"
                value={form.message}
                onChange={onChange}
                required
              />
            </label>

            <button type="submit" className="btn btn--primary">Send Message</button>

            {notice && (
              <p className={`c-notice ${notice.type === 'ok' ? 'c-notice--ok' : 'c-notice--err'}`} role="status" aria-live="polite">
                {notice.text}
              </p>
            )}
          </form>

          <aside className="c-map">
            <h2 className="sr-only">Location Map</h2>
            {/* Replace src with your Google Maps embed if you have one */}
            <div className="map-frame">
              <iframe
                title="UYZN Scholarship Foundation — Map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Market+Circle,+Takoradi,+Ghana&output=embed"
              />
            </div>

            <div className="c-social">
              <h3>Connect with us</h3>
              <ul>
                <li><a href="https://facebook.com/uyznfoundation" target="_blank" rel="noreferrer">Facebook</a></li>
                <li><a href="https://twitter.com/uyznfoundation" target="_blank" rel="noreferrer">Twitter (X)</a></li>
                <li><a href="https://instagram.com/uyznfoundation" target="_blank" rel="noreferrer">Instagram</a></li>
                <li><a href="https://linkedin.com/company/uyznfoundation" target="_blank" rel="noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <section className="contact-cta">
        <div className="contact-wrap contact-cta__inner">
          <h2>Partner with UYZN</h2>
          <p>Donors, sponsors, and mentors help us unlock opportunity for talented students.</p>
          <div className="contact-hero__cta">
            <Link to="/contact/partners" className="btn btn--primary">Partnership Enquiries</Link>
            <Link to="/directory" className="btn btn--ghost">See Scholarships</Link>
          </div>
        </div>
      </section>
    </>
  );
}
