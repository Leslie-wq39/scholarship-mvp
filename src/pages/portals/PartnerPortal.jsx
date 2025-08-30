// src/pages/portals/PartnerPortal.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Portal.css";

export default function PartnerPortal() {
  const { user } = useAuth();

  return (
    <section className="portal">
      <header className="portal__hero">
        <p className="portal__eyebrow">🤝 Strategic Partners & Donors</p>
        <h1 className="portal__title">
          Partnering for <span>Impact & Transparency</span>
        </h1>
        <p className="portal__lead">
          Access dashboards, reports, and verified outcomes across UYZN programs.
        </p>
        <div className="portal__me">Signed in as <strong>{user?.name}</strong> ({user?.email})</div>
      </header>

      <div className="portal__grid">
        <article className="card">
          <h3>📊 Impact Dashboards</h3>
          <p>Real-time metrics: reach, performance, and geography.</p>
          <Link to="#" className="btn btn--primary" aria-disabled="true">Open dashboards (demo)</Link>
        </article>

        <article className="card">
          <h3>📥 Reports & Insights</h3>
          <p>Download demographics, progress, and fund utilization summaries.</p>
          <Link to="#" className="btn" aria-disabled="true">View reports (demo)</Link>
        </article>

        <article className="card">
          <h3>💵 Transparency</h3>
          <p>Track disbursements and audit summaries with confidence.</p>
          <Link to="#" className="btn" aria-disabled="true">Financials (demo)</Link>
        </article>

        <article className="card">
          <h3>🎯 Targeted Programs</h3>
          <p>Women in STEM, Rural Excellence, and more.</p>
          <Link to="/directory" className="btn">Explore programs</Link>
        </article>

        <article className="card">
          <h3>🎤 Engagement</h3>
          <p>Mentorship, events, and co-branding opportunities.</p>
          <Link to="/contact" className="btn">Talk to us</Link>
        </article>

        <article className="card">
          <h3>📞 Partner Support</h3>
          <p>Email: partners@uyznfoundation.org • +233 (0) 20 919 4636</p>
          <Link to="/contact" className="btn">Contact support</Link>
        </article>
      </div>
    </section>
  );
}
