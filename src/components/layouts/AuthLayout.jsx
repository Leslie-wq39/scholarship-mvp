// src/components/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

export default function AuthLayout() {
  return (
    <div className="auth-shell">
      <header className="auth-header">
        <div className="auth-header__inner">
          <Link to="/" className="auth-brand">
            <span className="auth-logo" aria-hidden>🎓</span>
            <span>UYZN Foundation</span>
          </Link>

          {/* keep this minimal – different from main site header */}
          <nav className="auth-nav">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="auth-main">
        <Outlet />
      </main>

      <footer className="auth-footer">
        <div className="auth-footer__inner">
          <p>© {new Date().getFullYear()} UYZN Scholarship Foundation</p>
          <nav>
            <Link to="/terms">Terms</Link>
            <span>·</span>
            <Link to="/privacy">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
