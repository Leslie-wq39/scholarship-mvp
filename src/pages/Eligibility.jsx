import React from "react";
import { Link } from "react-router-dom";
import "./Eligibility.css";

export default function Eligibility() {
  return (
    <>
      {/* Hero */}
      <section className="elig-hero" role="banner">
        <div className="elig-hero__inner">
          {/* Breadcrumbs */}
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/" className="crumbs__home">
              <svg className="crumbs__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 10.5l9-7 9 7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M5 11v9h5v-5h4v5h5v-9" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
              <span>Home</span>
            </Link>
            <span className="crumbs__sep" aria-hidden>›</span>
            <Link to="/resources" className="crumbs__trail">Resources</Link>
            <span className="crumbs__sep" aria-hidden>›</span>
            <span className="crumbs__current">Eligibility</span>
          </nav>

          <h1 className="elig-hero__title">Eligibility</h1>
          <p className="elig-hero__lead">
            UYZN scholarships support high-potential students with financial need who show
            strong academics, character, and community impact.
          </p>

          <div className="elig-hero__cta">
            <Link to="/directory" className="btn btn--ghost">Check Scholarships</Link>
            <Link to="/resources/application-process" className="btn btn--primary">Apply Now</Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="elig-wrap">
        <div className="elig-grid">
          {/* Main column */}
          <article className="elig-main">
            {/* Core Criteria */}
            <header className="elig-hd">
              <h2>Core Eligibility Criteria</h2>
              <p className="muted">Meet these baseline requirements before you apply.</p>
            </header>

            <ul className="elig-cards" role="list">
              <li className="elig-card">
                <div className="elig-card__icon" aria-hidden>🪪</div>
                <div className="elig-card__body">
                  <h3>Residency &amp; Enrollment</h3>
                  <p>
                    Ghanaian citizen or permanent resident (some awards may open to other African nationals).
                    Admitted to or enrolled in an <strong>accredited</strong> tertiary institution (university, college, TVET/Polytechnic).
                  </p>
                </div>
              </li>

              <li className="elig-card">
                <div className="elig-card__icon" aria-hidden>📚</div>
                <div className="elig-card__body">
                  <h3>Academic Standing</h3>
                  <p>
                    Solid record (e.g., <strong>min. GPA 3.0/4.0 or ≥60%</strong>) and any <strong>program-specific</strong> grade requirements listed on the scholarship page.
                  </p>
                </div>
              </li>

              <li className="elig-card">
                <div className="elig-card__icon" aria-hidden>💳</div>
                <div className="elig-card__body">
                  <h3>Financial Need</h3>
                  <p>
                    Demonstrated need (household income, dependents, special circumstances) and willingness to provide supporting documentation when requested.
                  </p>
                </div>
              </li>

              <li className="elig-card">
                <div className="elig-card__icon" aria-hidden>🌟</div>
                <div className="elig-card__body">
                  <h3>Character &amp; Leadership</h3>
                  <p>
                    Evidence of leadership, community service, and extracurricular engagement, with strong recommendations from teachers/lecturers or community leaders.
                  </p>
                </div>
              </li>

              <li className="elig-card">
                <div className="elig-card__icon" aria-hidden>🛡️</div>
                <div className="elig-card__body">
                  <h3>Conduct &amp; Compliance</h3>
                  <p>
                    No serious disciplinary/academic misconduct and agreement to UYZN’s code of conduct, data protection and verification checks.
                  </p>
                </div>
              </li>
            </ul>

            {/* Required Documents */}
            <section className="elig-section">
              <h2>Required Documents (typical)</h2>
              <ul className="elig-bullets">
                <li>Valid photo ID (national ID, passport, or birth certificate)</li>
                <li>Academic transcripts / latest results</li>
                <li>Proof of admission/enrollment (if applicable)</li>
                <li>Personal statement/essay (goals, need, impact)</li>
                <li>Recommendation letter(s)</li>
                <li>Any program-specific documents (e.g., research proposal)</li>
              </ul>
              <div className="elig-tip" role="note">
                <strong>Tip:</strong> Upload clear, readable files (PDF/JPG/PNG).
                Label them like <code>Firstname_Lastname_DocumentType.pdf</code>.
              </div>
            </section>

            {/* Ineligible */}
            <section className="elig-section">
              <h2>Ineligible Applications (common cases)</h2>
              <ul className="elig-bullets">
                <li>Missed deadlines or incomplete submissions</li>
                <li>Falsified or unverifiable documents</li>
                <li>Not meeting minimum academic or residency criteria</li>
                <li>Applying to a category that doesn’t match your program/level</li>
              </ul>
            </section>

            {/* Special Categories */}
            <section className="elig-section">
              <h2>Special Opportunity Categories</h2>
              <p className="muted">Some UYZN awards give additional consideration to:</p>
              <ul className="elig-chips" role="list">
                <li>Women in STEM</li>
                <li>Rural / underserved communities</li>
                <li>First-generation university students</li>
                <li>Students with disabilities</li>
                <li>Fields of national development (health, education, technology)</li>
              </ul>
              <p className="muted">See each scholarship page for exact priority criteria.</p>
            </section>

            {/* Selection Weighting */}
            <section className="elig-section">
              <h2>Selection &amp; Weighting (guide)</h2>
              <ul className="elig-weights">
                <li><span>Academic merit</span><strong>30–40%</strong></li>
                <li><span>Financial need</span><strong>30–40%</strong></li>
                <li><span>Leadership &amp; community impact</span><strong>15–25%</strong></li>
                <li><span>Personal statement &amp; recommendations</span><strong>10–20%</strong></li>
              </ul>
              <p className="muted">Final weighting may vary by scholarship.</p>
            </section>

            {/* Obligations */}
            <section className="elig-section">
              <h2>Ongoing Scholar Obligations (if selected)</h2>
              <ul className="elig-bullets">
                <li>Maintain required GPA/academic standing</li>
                <li>Submit semester results and brief updates</li>
                <li>Participate in mentorship/leadership activities (where offered)</li>
                <li>Uphold UYZN code of conduct and notify us of status changes</li>
              </ul>
            </section>

            {/* Fairness */}
            <section className="elig-section">
              <h2>Fairness, Access &amp; Inclusion</h2>
              <p>
                UYZN is committed to equitable access. We provide reasonable accommodations for applicants with disabilities.
                If you need support, please contact us before the deadline via <Link to="/contact">Contact Us</Link>.
              </p>
            </section>

            {/* Quick check */}
            <section className="elig-section elig-quick">
              <h2>Quick Eligibility Check (3 steps)</h2>
              <ol className="elig-steps">
                <li><strong>Residency &amp; Enrollment</strong> — Ghanaian/eligible national + accredited institution</li>
                <li><strong>Academic Minimum</strong> — meets GPA/grade threshold for chosen award</li>
                <li><strong>Financial Need &amp; Documents</strong> — can evidence need + required files ready</li>
              </ol>
              <p className="elig-result">If you pass these checks, you’re likely <strong>eligible to apply</strong>.</p>
              <div className="elig-cta">
                <Link to="/directory" className="btn btn--ghost">Check Scholarships</Link>
                <Link to="/resources/application-process" className="btn btn--primary">Apply Now</Link>
                <Link to="/resources/faqs" className="btn">FAQs</Link>
              </div>
            </section>

            {/* Appeals */}
            <section className="elig-section">
              <h2>Appeals &amp; Re-application</h2>
              <ul className="elig-bullets">
                <li>Unsuccessful applicants may re-apply in future cycles.</li>
                <li>Formal appeals are accepted only for procedural issues (not panel decisions). See FAQs.</li>
              </ul>
            </section>
          </article>

          {/* Aside: Key Dates */}
          <aside className="elig-aside">
            <div className="elig-dates">
              <h2>Key Dates (example cycle)</h2>
              <ul className="elig-dates__list">
                <li><span>Opens</span><strong>Aug 15, 2025</strong></li>
                <li><span>Deadline</span><strong>Sept 30, 2025</strong></li>
                <li><span>Results</span><strong>Nov 20, 2025</strong></li>
              </ul>
              <Link to="/resources/application-process" className="btn btn--primary elig-dates__btn">Start Application</Link>
            </div>

            <div className="elig-help">
              <h3>Need help?</h3>
              <ul className="elig-bullets">
                <li><Link to="/resources/faqs">Read FAQs</Link></li>
                <li><Link to="/contact">Contact Support</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* Final CTA */}
      <section className="elig-cta-final">
        <div className="elig-wrap elig-cta__inner">
          <h2>Ready to proceed?</h2>
          <p>Find the right award, review requirements, and submit a strong application.</p>
          <div className="elig-hero__cta">
            <Link to="/directory" className="btn btn--ghost">Check Scholarships</Link>
            <Link to="/resources/application-process" className="btn btn--primary">Apply Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
