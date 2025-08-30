// src/pages/portals/ApplicantPortal.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Portal.css";

export default function ApplicantPortal() {
  const { user } = useAuth();

  return (
    <section className="portal">
      <header className="portal__hero">
        <p className="portal__eyebrow">👩‍🎓 Scholarship Applicants</p>
        <h1 className="portal__title">
          Unlock Your Future with <span>UYZN Scholarships</span>
        </h1>
        <p className="portal__lead">
          Apply, upload documents, track your status, and receive timely updates—all in one place.
        </p>
        <div className="portal__me">Signed in as <strong>{user?.name}</strong> ({user?.email})</div>
      </header>

      <div className="portal__grid">
        <article className="card">
          <h3>✅ Check Eligibility</h3>
          <p>Quickly confirm you meet criteria for open scholarships.</p>
          <Link to="/resources/eligibility/quiz" className="btn btn--primary">Check now</Link>
        </article>

        <article className="card">
          <h3>📝 Apply Online</h3>
          <p>Fill forms digitally and save drafts as you go.</p>
          <Link to="/directory/apply-now" className="btn">Start an application</Link>
        </article>

        <article className="card">
          <h3>📎 Upload Documents</h3>
          <p>Transcripts, IDs, essays, and recommendations—securely stored.</p>
          <Link to="#" className="btn" aria-disabled="true">Upload (demo)</Link>
        </article>

        <article className="card">
          <h3>📊 Track Status</h3>
          <p>Submitted → Under Review → Shortlisted → Decision.</p>
          <Link to="#" className="btn" aria-disabled="true">View status (demo)</Link>
        </article>

        <article className="card">
          <h3>🔔 Notifications</h3>
          <p>Email/SMS alerts for deadlines and results.</p>
          <Link to="/resources/faqs" className="btn">Learn more</Link>
        </article>

        <article className="card">
          <h3>💬 Need Help?</h3>
          <p>Questions about your application? We’re here.</p>
          <Link to="/contact" className="btn">Contact support</Link>
        </article>
      </div>

      <aside className="panel">
        <h2>📅 Key Dates (2025)</h2>
        <ul className="dates">
          <li><span>Opens</span><strong>Aug 15, 2025</strong></li>
          <li><span>Deadline</span><strong>Sept 30, 2025</strong></li>
          <li><span>Results</span><strong>Nov 20, 2025</strong></li>
        </ul>
        <p className="muted">Deadlines vary by scholarship—always check each listing.</p>
      </aside>
    </section>
  );
}
