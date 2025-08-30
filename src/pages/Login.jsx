// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  // role selector (replaces your `tab`)
  const [role, setRole] = useState('applicant'); // "applicant" | "admin" | "partner"

  // form fields
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  // ui state
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  // auth + nav
  const { login } = useAuth();
  const nav = useNavigate();

  const headline = {
    applicant: 'Scholarship Applicants',
    admin: 'UYZN Admin Team',
    partner: 'Strategic Partners & Donors',
  }[role];

  const blurb = {
    applicant:
      'Create an account or log in to complete applications, upload documents, and track your status.',
    admin:
      'Secure portal for reviewing applications, managing listings, and communicating with applicants.',
    partner:
      'View impact dashboards, download reports, and monitor program outcomes.',
  }[role];

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login({ role, email, password: pwd }); // <- your AuthContext
      // redirect to portal
        const target =
        role === "admin"
            ? "/portal/admin"
            : role === "partner"
            ? "/portal/partner"
            : "/portal/applicant";

        nav(target, { replace: true, state: { flash: `Welcome, ${role}!` } });
    } catch (e) {
      setErr(e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="login-hero" role="banner">
        <div className="login-hero__inner">
          {/* Breadcrumbs */}
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/" className="crumbs__home">
              <svg className="crumbs__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 10.5l9-7 9 7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M5 11v9h5v-5h4v5h5v-9" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="crumbs__sep" aria-hidden>
              ›
            </span>
            <span className="crumbs__current">Login</span>
          </nav>

          <h1 className="login-hero__title">
            Secure <span>Login</span>
          </h1>
          <p className="login-hero__lead">
            Welcome to the UYZN Scholarship Foundation Portal. Choose your role to continue.
          </p>
        </div>
      </section>

      {/* Tabs + Forms */}
      <section className="login-wrap">
        {/* role tabs */}
        <div className="login-tabs" role="tablist" aria-label="Select your role">
          <button
            role="tab"
            aria-selected={role === 'applicant'}
            className={`login-tab ${role === 'applicant' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setRole('applicant')}
          >
            Applicants
          </button>
          <button
            role="tab"
            aria-selected={role === 'admin'}
            className={`login-tab ${role === 'admin' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
          <button
            role="tab"
            aria-selected={role === 'partner'}
            className={`login-tab ${role === 'partner' ? 'is-active' : ''}`}
            type="button"
            onClick={() => setRole('partner')}
          >
            Partners
          </button>
        </div>

        <div className="login-panel" role="tabpanel">
          <header className="login-panel__hd">
            <h2>{headline}</h2>
            <p className="muted">{blurb}</p>
          </header>

          <form className="login-form" onSubmit={onSubmit} noValidate>
            <label className="lf-field">
              <span className="lf-label">Email</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="lf-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="lf-field">
              <span className="lf-label">Password</span>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Use demo123"
                className="lf-input"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </label>

            {err && (
              <p className="lf-notice lf-notice--err" role="alert">
                {err}
              </p>
            )}

            <div className="lf-actions">
              <button type="submit" className="btn btn--primary" disabled={loading}>
                {loading ? 'Signing in…' : 'Log In'}
              </button>
              <Link to="/reset-password" className="lf-link">
                Forgot password?
              </Link>
            </div>

            <p className="muted" style={{ marginTop: '.5rem' }}>
              Demo password: <code>demo123</code>
            </p>
          </form>

          {/* Role helpers (unchanged) */}
          {role === 'applicant' && (
            <div className="login-help">
              <h3>Applicants can:</h3>
              <ul className="login-bullets">
                <li>Check eligibility and apply online</li>
                <li>Upload transcripts, IDs, and essays</li>
                <li>Track application status and deadlines</li>
              </ul>
              <div className="login-cta">
                <Link to="/signup" className="btn btn--ghost">
                  Create Account
                </Link>
                <Link to="/directory" className="btn btn--ghost">
                  Browse Scholarships
                </Link>
              </div>
            </div>
          )}

          {role === 'admin' && (
            <div className="login-help">
              <h3>Admins can:</h3>
              <ul className="login-bullets">
                <li>Review & score applications</li>
                <li>Manage listings, deadlines, announcements</li>
                <li>Communicate with applicants and export reports</li>
              </ul>
            </div>
          )}

          {role === 'partner' && (
            <div className="login-help">
              <h3>Partners can:</h3>
              <ul className="login-bullets">
                <li>View impact dashboards & metrics</li>
                <li>Download transparency reports</li>
                <li>Monitor fund utilization and outcomes</li>
              </ul>
            </div>
          )}
        </div>

        <div className="login-footer-help">
          <p className="muted">
            New applicant? <Link to="/signup">Create an account</Link> · Questions?{' '}
            <Link to="/resources/faqs">Read FAQs</Link> · <Link to="/contact">Contact Us</Link>
          </p>
        </div>
      </section>
    </>
  );
}
