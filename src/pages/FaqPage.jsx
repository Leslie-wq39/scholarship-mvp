import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FaqPage.css';

const FaqPage = () => {
  const { hash } = useLocation();

  // Expand the question if the user lands on /resources/faqs#qN
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el && el.tagName.toLowerCase() === 'details') {
      el.setAttribute('open', 'true');
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  const expandAll = () => {
    document.querySelectorAll('.faqpage__item').forEach(d => d.setAttribute('open', 'true'));
  };
  const collapseAll = () => {
    document.querySelectorAll('.faqpage__item').forEach(d => d.removeAttribute('open'));
  };

  return (
    <main className="faqpage" aria-labelledby="faqpage-title">
      <header className="faqpage__hero">
        <div className="faqpage__container">
          <p className="faqpage__eyebrow">Help Center</p>
          <h1 id="faqpage-title" className="faqpage__heading">
            Frequently Asked <span>Questions</span>
          </h1>
          <p className="faqpage__lead">
            Quick answers about the UYZN Scholarship Foundation, our application process, and the portals
            for students, admins, and partners. Can’t find what you need? <Link to="/contact">Contact us</Link>.
          </p>

          <nav className="faqpage__nav" aria-label="FAQ categories">
            <a href="#applicants" className="faqpage__pill" aria-label="Jump to Scholarship Applicants">👩‍🎓 Applicants</a>
            <a href="#admin" className="faqpage__pill" aria-label="Jump to UYZN Admin Team">🛠️ Admin</a>
            <a href="#partners" className="faqpage__pill" aria-label="Jump to Strategic Partners and Donors">🤝 Partners</a>
            <a href="#general" className="faqpage__pill" aria-label="Jump to General questions">🌍 General</a>
          </nav>

          <div className="faqpage__actions" role="group" aria-label="Expand or collapse all FAQ items">
            <button type="button" className="faqpage__btn" onClick={expandAll}>Expand all</button>
            <button type="button" className="faqpage__btn faqpage__btn--ghost" onClick={collapseAll}>Collapse all</button>
          </div>
        </div>
      </header>

      <div className="faqpage__container">
        {/* Applicants */}
        <section id="applicants" className="faqpage__section" aria-labelledby="h-applicants">
          <h2 id="h-applicants" className="faqpage__section-title">👩‍🎓 Scholarship Applicants</h2>

          <details id="q1" className="faqpage__item">
            <summary className="faqpage__q">Q1. Who can apply for a UYZN scholarship?</summary>
            <div className="faqpage__a">
              UYZN scholarships are open to Ghanaian citizens or permanent residents (some awards may
              extend to other African students). Applicants must demonstrate strong academic performance,
              financial need, and leadership potential.
            </div>
          </details>

          <details id="q2" className="faqpage__item">
            <summary className="faqpage__q">Q2. Can I apply for more than one scholarship?</summary>
            <div className="faqpage__a">
              Yes, you may apply for multiple scholarships if you meet the eligibility criteria for each.
              However, you can only be awarded <strong>one scholarship per cycle</strong>.
            </div>
          </details>

          <details id="q3" className="faqpage__item">
            <summary className="faqpage__q">Q3. What documents do I need to apply?</summary>
            <div className="faqpage__a">
              <p>Typical requirements include:</p>
              <ul>
                <li>Academic transcripts</li>
                <li>National ID, passport, or birth certificate</li>
                <li>Proof of admission/enrollment</li>
                <li>Recommendation letter(s)</li>
                <li>Personal statement/essay</li>
              </ul>
              <p>Always check the <strong>specific scholarship listing</strong> for additional requirements.</p>
            </div>
          </details>

          <details id="q4" className="faqpage__item">
            <summary className="faqpage__q">Q4. How do I track my application status?</summary>
            <div className="faqpage__a">
              Log into the <Link to="/login">Applicant Portal</Link> to monitor your progress:
              <em> Submitted → Under Review → Shortlisted → Final Decision</em>. You will also receive
              <strong> email/SMS notifications</strong>.
            </div>
          </details>

          <details id="q5" className="faqpage__item">
            <summary className="faqpage__q">Q5. What happens if I miss the deadline?</summary>
            <div className="faqpage__a">
              Late applications will <strong>not</strong> be considered. We strongly recommend applying at
              least <strong>one week before the deadline</strong> to avoid last-minute issues.
            </div>
          </details>
        </section>

        {/* Admin */}
        <section id="admin" className="faqpage__section" aria-labelledby="h-admin">
          <h2 id="h-admin" className="faqpage__section-title">🛠️ UYZN Admin Team</h2>

          <details id="q6" className="faqpage__item">
            <summary className="faqpage__q">Q6. How do admins access the portal?</summary>
            <div className="faqpage__a">
              Only authorized staff can access the <strong>Admin Portal</strong>. Login requires valid
              credentials and is secured with role-based access.
            </div>
          </details>

          <details id="q7" className="faqpage__item">
            <summary className="faqpage__q">Q7. What can admins do in the portal?</summary>
            <div className="faqpage__a">
              Admins can manage applicant records, verify documents, shortlist candidates, send notifications,
              and generate reports.
            </div>
          </details>

          <details id="q8" className="faqpage__item">
            <summary className="faqpage__q">Q8. Can admins communicate directly with applicants?</summary>
            <div className="faqpage__a">
              Yes. Admins can send bulk or individual messages to applicants within the portal.
            </div>
          </details>
        </section>

        {/* Partners */}
        <section id="partners" className="faqpage__section" aria-labelledby="h-partners">
          <h2 id="h-partners" className="faqpage__section-title">🤝 Strategic Partners &amp; Donors</h2>

          <details id="q9" className="faqpage__item">
            <summary className="faqpage__q">Q9. How do partners track the impact of their funding?</summary>
            <div className="faqpage__a">
              Partners log into the <strong>Partner Portal</strong>, where they can access real-time dashboards,
              fund utilization reports, and impact analytics (e.g., demographics, regional reach).
            </div>
          </details>

          <details id="q10" className="faqpage__item">
            <summary className="faqpage__q">Q10. Are financial reports available to donors?</summary>
            <div className="faqpage__a">
              Yes. Donors can download <strong>audited financial summaries</strong> and impact reports to ensure
              full transparency.
            </div>
          </details>

          <details id="q11" className="faqpage__item">
            <summary className="faqpage__q">Q11. Can donors fund specific categories of scholarships?</summary>
            <div className="faqpage__a">
              Absolutely. Donors may choose to support priority categories such as
              <strong> Women in STEM, Rural Excellence, or Postgraduate Research</strong>.
            </div>
          </details>
        </section>

        {/* General */}
        <section id="general" className="faqpage__section" aria-labelledby="h-general">
          <h2 id="h-general" className="faqpage__section-title">🌍 General</h2>

          <details id="q12" className="faqpage__item">
            <summary className="faqpage__q">Q12. When are scholarships usually open?</summary>
            <div className="faqpage__a">
              <p>Our annual cycle typically runs:</p>
              <ul>
                <li><strong>Applications open:</strong> August</li>
                <li><strong>Deadline:</strong> September</li>
                <li><strong>Shortlisting:</strong> October – November</li>
                <li><strong>Results:</strong> November</li>
              </ul>
              <p><em>(Exact dates vary by scholarship. Always check individual listings.)</em></p>
            </div>
          </details>

          <details id="q13" className="faqpage__item">
            <summary className="faqpage__q">Q13. How will I know if I am selected?</summary>
            <div className="faqpage__a">
              All applicants are notified via the portal, email, and SMS once final decisions are made.
            </div>
          </details>

          <details id="q14" className="faqpage__item">
            <summary className="faqpage__q">Q14. Can unsuccessful applicants reapply?</summary>
            <div className="faqpage__a">
              Yes. Students who do not receive a scholarship are encouraged to reapply in future cycles,
              provided they still meet eligibility requirements.
            </div>
          </details>

          <details id="q15" className="faqpage__item">
            <summary className="faqpage__q">Q15. Who can I contact for help?</summary>
            <div className="faqpage__a">
              <p>Visit our <Link to="/contact">Contact Us</Link> page or email:</p>
              <ul>
                <li>Applicants: <a href="mailto:apply@uyznfoundation.org">apply@uyznfoundation.org</a></li>
                <li>Partners: <a href="mailto:partners@uyznfoundation.org">partners@uyznfoundation.org</a></li>
                <li>General Inquiries: <a href="mailto:info@uyznfoundation.org">info@uyznfoundation.org</a></li>
              </ul>
            </div>
          </details>
        </section>

        <aside className="faqpage__note" aria-label="Informational note">
          <p>
            This page is for general guidance. Final rules and eligibility are defined in each scholarship’s
            official listing and program terms.
          </p>
        </aside>
      </div>
    </main>
  );
};

export default FaqPage;
