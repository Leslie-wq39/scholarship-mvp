import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer__inner">
        {/* Brand / short blurb */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">UYZN<span>Scholarships</span></Link>
          <p className="footer__tag">
            Matching bright students to the opportunities they deserve.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="footer__col" aria-labelledby="footer-quick">
          <h3 id="footer-quick" className="footer__title">Quick links</h3>
          <ul className="footer__list">
            <li><Link to="/directory" className="footer__link">Scholarships</Link></li>
            <li><Link to="/resources/application-process" className="footer__link">How to Apply</Link></li>
            <li><Link to="/resources/faqs" className="footer__link">FAQs</Link></li>
            <li><Link to="/resources/eligibility/quiz" className="footer__link">Eligibility Checker</Link></li>
          </ul>
        </nav>

        {/* Contact */}
        <div className="footer__col" aria-labelledby="footer-contact">
          <h3 id="footer-contact" className="footer__title">Contact</h3>
          <address className="footer__addr">
            Accra, Ghana<br />
            Mon–Fri, 9:00–17:00 GMT
          </address>
          <a href="mailto:support@uyzn.org" className="footer__link">support@uyzn.org</a>
          <a href="tel:+233201234567" className="footer__link">+233 20 123 4567</a>
          <div className="footer__social" aria-label="Social media">
            <a className="footer__social-link" href="https://facebook.com" aria-label="Facebook">
              <svg viewBox="0 0 24 24" role="img"><path fill="currentColor" d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.7V12h2.7V9.7c0-2.7 1.6-4.2 4-4.2 1.2 0 2.5.2 2.5.2v2.8h-1.4c-1.4 0-1.9.9-1.9 1.8V12h3.2l-.5 2.9h-2.7v7A10 10 0 0 0 22 12z"/></svg>
            </a>
            <a className="footer__social-link" href="https://twitter.com" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" role="img"><path fill="currentColor" d="M20.1 3H23l-7.5 8.6L24 21h-6.6l-5.2-6.4L6.2 21H1l8.1-9.3L0 3h6.7l4.7 5.9L20.1 3z"/></svg>
            </a>
            <a className="footer__social-link" href="https://instagram.com" aria-label="Instagram">
              <svg viewBox="0 0 24 24" role="img"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2zm6.4-.9a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2z"/></svg>
            </a>
            <a className="footer__social-link" href="https://linkedin.com" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" role="img"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8 8h3.8v2.2h.1c.5-.9 1.7-2.2 3.8-2.2 4.1 0 4.9 2.7 4.9 6.1V24h-4v-7.1c0-1.7 0-3.8-2.3-3.8s-2.7 1.8-2.7 3.7V24H8z"/></svg>
            </a>
          </div>
        </div>

        {/* Legal */}
        <nav className="footer__col" aria-labelledby="footer-legal">
          <h3 id="footer-legal" className="footer__title">Legal</h3>
          <ul className="footer__list">
            <li><Link to="/legal/privacy" className="footer__link">Privacy Policy</Link></li>
            <li><Link to="/legal/terms" className="footer__link">Terms of Use</Link></li>
          </ul>
        </nav>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© {year} UYZN Scholarships. All rights reserved.</p>
        <a href="#top" className="footer__top" aria-label="Back to top">Back to top ↑</a>
      </div>
    </footer>
  );
};

export default Footer;
