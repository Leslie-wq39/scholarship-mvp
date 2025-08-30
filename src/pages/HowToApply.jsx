import React from 'react';
import { Link } from 'react-router-dom';
import './HowToApply.css';

export default function HowToApply() {
  return (
    <div className="apply-page">
      {/* Hero */}
      <section className="apply-hero" role="banner">
        <div className="apply-hero__inner">
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
            <span className="crumbs__current">How to Apply</span>
          </nav>

          <h1 className="apply-hero__title">How to <span>Apply</span></h1>
          <p className="apply-hero__lead">
            Applying should be simple, transparent, and stress-free. Follow the steps below and submit your application with confidence.
          </p>

          <div className="apply-hero__cta">
            <Link to="/signup" className="btn btn--primary">Create Account</Link>
            <Link to="/directory" className="btn btn--ghost">Browse Scholarships</Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="apply-steps">
        <div className="apply-wrap">
          <header className="apply-hd">
            <h2>Step-by-step guide</h2>
            <p>From account creation to decision—everything you need to know.</p>
          </header>

          {/* RENAMED to avoid clash */}
          <ol className="apply-steps__list">
            <li className="apply-step">
              <div className="step__num">1</div>
              <div className="step__body">
                <h3>Create an Account</h3>
                <p>Register on the UYZN Application Portal with your name, email, and a secure password. Verify your email to activate your account.</p>
                <Link className="step__link" to="/signup">Create account →</Link>
              </div>
            </li>

            <li className="apply-step">
              <div className="step__num">2</div>
              <div className="step__body">
                <h3>Choose a Scholarship</h3>
                <p>Browse available scholarships. Review eligibility, award details, and deadlines—then pick the one that fits you.</p>
                <Link className="step__link" to="/directory">View scholarships →</Link>
              </div>
            </li>

            <li className="apply-step">
              <div className="step__num">3</div>
              <div className="step__body">
                <h3>Prepare Your Documents</h3>
                <ul className="apply-bullets">
                  <li>Academic transcripts or school reports</li>
                  <li>Proof of admission or enrollment (if available)</li>
                  <li>National ID / Birth Certificate / Passport</li>
                  <li>Recommendation letters</li>
                  <li>Personal statement / essay</li>
                </ul>
              </div>
            </li>

            <li className="apply-step">
              <div className="step__num">4</div>
              <div className="step__body">
                <h3>Complete the Application</h3>
                <p>Fill in your personal, academic, and financial information accurately. You can save progress anytime.</p>
              </div>
            </li>

            <li className="apply-step">
              <div className="step__num">5</div>
              <div className="step__body">
                <h3>Upload Documents</h3>
                <p>Upload clear, correctly-labelled files (PDF/JPEG/Word). Double-check readability before submitting.</p>
              </div>
            </li>

            <li className="apply-step">
              <div className="step__num">6</div>
              <div className="step__body">
                <h3>Submit Your Application</h3>
                <p>Review everything carefully. After submission, you’ll receive an email confirmation and a reference number.</p>
                <small className="muted">Late or incomplete applications are not considered—apply early.</small>
              </div>
            </li>

            <li className="apply-step">
              <div className="step__num">7</div>
              <div className="step__body">
                <h3>Track Your Progress</h3>
                <p>Log in anytime to check your status: <strong>Submitted → Under Review → Shortlisted → Final Decision</strong>. Selected applicants are notified by email and SMS.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Tips + Dates */}
      <section className="apply-tips">
        <div className="apply-wrap apply-tips-grid">
          <article className="apply-tips-card">
            <h2>Tips for a strong application</h2>
            <ul className="apply-bullets">
              <li>Apply early—don’t wait until the deadline.</li>
              <li>Write a clear, honest personal statement.</li>
              <li>Highlight leadership, community service, and achievements.</li>
              <li>Ask referees to submit letters on time.</li>
            </ul>
            <div className="tips__cta">
              <Link to="/faqs" className="btn btn--ghost">Visit FAQs</Link>
              <Link to="/contact" className="btn btn--primary">Contact Support</Link>
            </div>
          </article>

          <aside className="apply-dates">
            <h2>Important dates</h2>
            <ul className="apply-dates__list">
              <li><span>Opens</span><strong>Aug 15, 2025</strong></li>
              <li><span>Deadline</span><strong>Sept 30, 2025</strong></li>
              <li><span>Results</span><strong>Nov 20, 2025</strong></li>
            </ul>
            <Link to="/signup" className="btn btn--primary dates__btn">Apply Now</Link>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <section className="apply-cta">
        <div className="apply-wrap apply-cta__inner">
          <h2>Ready to start?</h2>
          <p>Create an account and take the first step toward unlocking new opportunities.</p>
          <div className="apply-hero__cta">
            <Link to="/signup" className="btn btn--primary">Create Account</Link>
            <Link to="/directory" className="btn btn--ghost">Browse Scholarships</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
