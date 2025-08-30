// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './SignUp.css';

export default function SignUp() {
  const nav = useNavigate();
  const { signup } = useAuth();

  // applicant | admin | partner
  const [tab, setTab] = useState('applicant');

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirm: '',
    org: '',
  });

  const [notice, setNotice] = useState(null); // {type:'ok'|'err', text:string}
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!form.fullName.trim()) return 'Please enter your full name.';
    if (!emailOK) return 'Enter a valid email address.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirm) return 'Passwords do not match.';
    if ((tab === 'partner' || tab === 'admin') && !form.org.trim())
      return 'Please enter your organization.';
    return null;
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setNotice(null);

  const err = validate();
  if (err) {
    setNotice({ type: 'err', text: err });
    return;
  }

  setLoading(true);
  try {
    await signup({
      role: tab,             // "applicant" | "admin" | "partner"
      name: form.fullName,
      email: form.email,
      // password is ignored in the mock backend; still validated in UI
    });

    // Success → send each role to its portal
    const target =
      tab === 'admin'
        ? '/portal/admin'
        : tab === 'partner'
        ? '/portal/partner'
        : '/portal/applicant';

    nav(target, { replace: true, state: { flash: `Signed up as ${tab}` } });
  } catch (e2) {
    setNotice({ type: 'err', text: e2.message || 'Sign up failed' });
  } finally {
    setLoading(false);
  }
 };


  const title = {
    applicant: 'Scholarship Applicants',
    admin: 'UYZN Admin Team',
    partner: 'Strategic Partners & Donors',
  }[tab];

  const blurb = {
    applicant:
      'Create your profile to apply for scholarships, upload documents, and track your status.',
    admin:
      'Request admin access to review applications, manage listings, and generate reports.',
    partner:
      'Register to view impact dashboards, download reports, and monitor outcomes.',
  }[tab];

  return (
    <>
      {/* Hero */}
      <section className="signup-hero" role="banner">
        <div className="signup-hero__inner">
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
            <span className="crumbs__current">Sign Up</span>
          </nav>

          <h1 className="signup-hero__title">
            Create your <span>account</span>
          </h1>
          <p className="signup-hero__lead">
            Choose your role below to create a secure account and unlock tailored access to
            the UYZN Scholarship Foundation portal.
          </p>
        </div>
      </section>

      {/* Tabs + Form */}
      <section className="signup-wrap">
        <div className="signup-tabs" role="tablist" aria-label="Select your role">
          <button
            role="tab"
            aria-selected={tab === 'applicant'}
            className={`signup-tab ${tab === 'applicant' ? 'is-active' : ''}`}
            onClick={() => setTab('applicant')}
            type="button"
          >
            Applicants
          </button>
          <button
            role="tab"
            aria-selected={tab === 'admin'}
            className={`signup-tab ${tab === 'admin' ? 'is-active' : ''}`}
            onClick={() => setTab('admin')}
            type="button"
          >
            Admin
          </button>
          <button
            role="tab"
            aria-selected={tab === 'partner'}
            className={`signup-tab ${tab === 'partner' ? 'is-active' : ''}`}
            onClick={() => setTab('partner')}
            type="button"
          >
            Partners
          </button>
        </div>

        <div className="signup-panel" role="tabpanel">
          <header className="signup-panel__hd">
            <h2>{title}</h2>
            <p className="muted">{blurb}</p>
          </header>

          <form className="su-form" onSubmit={onSubmit} noValidate>
            <label className="su-field">
              <span className="su-label">Full name</span>
              <input
                className="su-input"
                type="text"
                name="fullName"
                placeholder="Ama Boateng"
                value={form.fullName}
                onChange={onChange}
                required
              />
            </label>

            <label className="su-field">
              <span className="su-label">Email</span>
              <input
                className="su-input"
                type="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                required
              />
            </label>

            {(tab === 'admin' || tab === 'partner') && (
              <label className="su-field">
                <span className="su-label">
                  Organization {tab === 'admin' ? '(department/unit)' : '(company/NGO)'}
                </span>
                <input
                  className="su-input"
                  type="text"
                  name="org"
                  placeholder={tab === 'admin' ? 'UYZN – Programs Team' : 'AngloGold Ghana'}
                  value={form.org}
                  onChange={onChange}
                  required
                />
              </label>
            )}

            <label className="su-field">
              <span className="su-label">Password</span>
              <input
                className="su-input"
                type="password"
                name="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={onChange}
                required
              />
              <small className="su-help">Use 8+ characters with letters &amp; numbers.</small>
            </label>

            <label className="su-field">
              <span className="su-label">Confirm password</span>
              <input
                className="su-input"
                type="password"
                name="confirm"
                placeholder="Re-enter password"
                autoComplete="new-password"
                value={form.confirm}
                onChange={onChange}
                required
              />
            </label>

            <label className="su-check">
              <input type="checkbox" required /> I agree to the{' '}
              <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
            </label>

            <div className="su-actions">
              <button type="submit" className="btn btn--primary" disabled={loading}>
                {loading
                  ? 'Creating…'
                  : tab === 'applicant'
                  ? 'Create Account'
                  : 'Request Access'}
              </button>
              <span className="muted">
                Already have an account? <Link to="/login">Log in</Link>
              </span>
            </div>

            {notice && (
              <p
                className={`su-notice ${
                  notice.type === 'ok' ? 'su-notice--ok' : 'su-notice--err'
                }`}
                role="status"
                aria-live="polite"
              >
                {notice.text}
              </p>
            )}
          </form>

          {/* Role perks (brief) */}
          {tab === 'applicant' && (
            <ul className="signup-bullets">
              <li>Instant eligibility check</li>
              <li>Online applications &amp; document uploads</li>
              <li>Real-time status tracking &amp; deadline alerts</li>
            </ul>
          )}
          {tab === 'admin' && (
            <ul className="signup-bullets">
              <li>Review, score &amp; shortlist applications</li>
              <li>Manage listings, deadlines &amp; announcements</li>
              <li>Export reports &amp; analytics</li>
            </ul>
          )}
          {tab === 'partner' && (
            <ul className="signup-bullets">
              <li>Impact dashboards and transparency reports</li>
              <li>Program metrics &amp; outcomes monitoring</li>
              <li>Downloadable summaries for stakeholders</li>
            </ul>
          )}
        </div>

        <div className="signup-notes">
          <h3>Notes</h3>
          <ul>
            <li>Your data is stored securely and handled per our privacy policy.</li>
            <li>Admin &amp; Partner accounts require authorization before activation.</li>
            <li>Applicants can sign up freely but must verify their email before submitting.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
