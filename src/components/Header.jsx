// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // track which nested menu is open: 'faqs' | ''
  const [openNested, setOpenNested] = useState('');
  const firstLinkRef = useRef(null);

  // Handle header BG/color on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // When the menu opens/closes, blur/lock the page and focus first nav item
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    if (menuOpen) firstLinkRef.current?.focus();
  }, [menuOpen]);

  // Close menu / nested panels with Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setOpenNested('');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      {/* Logo */}
      <div className="header__logo">
        <Link to="/" className="header__logo-link" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="UYZN Scholarship Logo" className="header__logo-img" />
          <span className="header__logo-text">UYZN Scholarship</span>
        </Link>
      </div>

      {/* Toggle Menu Button */}
      <button
        className="header__burger-button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="site-nav"
      >
        {menuOpen ? (
          <span className="header__close-icon" aria-hidden>&times;</span>
        ) : (
          <>
            <span className="header__burger-bar" />
            <span className="header__burger-bar" />
            <span className="header__burger-bar" />
          </>
        )}
      </button>

      {/* Nav Panel */}
      <nav
        id="site-nav"
        className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
        role="navigation"
        aria-label="Main"
      >
        <div className="header__nav-links">
          <NavLink
            to="/"
            end
            ref={firstLinkRef}
            className={({ isActive }) =>
              `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          {/* About */}
          <div className="header__dropdown">
            <NavLink
              to="/about"
              aria-haspopup="true"
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </NavLink>
            <div className="header__dropdown-content">
              <NavLink to="/about/story"    className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Our Story</NavLink>
              <NavLink to="/about/mission"  className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Mission &amp; Values</NavLink>
              <NavLink to="/about/team"     className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Our Team</NavLink>
              <NavLink to="/about/impact"   className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Impact Stories</NavLink>
              <NavLink to="/about/partners" className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Partners &amp; Sponsors</NavLink>
            </div>
          </div>

          {/* Scholarships */}
          <div className="header__dropdown">
            <NavLink
              to="/directory"
              aria-haspopup="true"
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Scholarships
            </NavLink>
            <div className="header__dropdown-content">
              <NavLink to="/directory/all"       className="header__dropdown-item" onClick={() => setMenuOpen(false)}>All Scholarships</NavLink>
              <NavLink to="/directory/undergrad" className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Undergraduate Scholarships</NavLink>
              <NavLink to="/directory/postgrad"  className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Postgraduate Scholarships</NavLink>
              <NavLink to="/directory/fields"    className="header__dropdown-item" onClick={() => setMenuOpen(false)}>By Field of Study</NavLink>
              <NavLink to="/directory/regions"   className="header__dropdown-item" onClick={() => setMenuOpen(false)}>By Region</NavLink>
              <NavLink to="/directory/apply-now" className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Apply Now</NavLink>
            </div>
          </div>

          {/* How to Apply */}
          <div className="header__dropdown">
            <NavLink
              to="/resources"
              aria-haspopup="true"
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              How to Apply
            </NavLink>

            <div className="header__dropdown-content">
              <NavLink to="/resources#process"      className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Application Process</NavLink>
              <NavLink to="/resources#tips"  className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Personal Statement Tips</NavLink>
              <NavLink to="/resources#deadlines"    className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Application Deadlines</NavLink>

              {/* ✅ Eligibility now a direct link (no nested toggle) */}
              <NavLink
                to="/resources/eligibility"
                className="header__dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                📋 Eligibility
              </NavLink>

              {/* FAQs (simple direct link) */}
              <NavLink
                to="/resources/faqs"
                className="header__dropdown-item"
                onClick={() => setMenuOpen(false)}
              >
                ❓ FAQs
              </NavLink>
            </div>
          </div>

          {/* Contact Us */}
          <div className="header__dropdown">
            <NavLink
              to="/contact"
              aria-haspopup="true"
              className={({ isActive }) =>
                `header__nav-link${isActive ? ' header__nav-link--active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </NavLink>
            <div className="header__dropdown-content">
              <NavLink to="/contact/message"  className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Send a Message</NavLink>
              <a href="mailto:support@uyzn.edu" className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Support Email</a>
              <a href="tel:+1234567890" className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Call Us</a>
              <NavLink to="/contact/location" className="header__dropdown-item" onClick={() => setMenuOpen(false)}>Location &amp; Map</NavLink>
            </div>
          </div>
        </div>

        <div className="header__auth">
          <Link to="/login" className="button button--outline" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="button button--primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
