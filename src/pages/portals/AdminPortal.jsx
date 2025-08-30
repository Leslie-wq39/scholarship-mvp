// src/pages/portals/AdminPortal.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Portal.css";

export default function AdminPortal() {
  const { user } = useAuth();

  return (
    <section className="portal">
      <header className="portal__hero">
        <p className="portal__eyebrow">🛠️ UYZN Admin Team</p>
        <h1 className="portal__title">
          Empowering <span>Fair & Transparent</span> Management
        </h1>
        <p className="portal__lead">
          Coordinate applications, reviews, communication, and reporting in one secure hub.
        </p>
        <div className="portal__me">Signed in as <strong>{user?.name}</strong> ({user?.email})</div>
      </header>

      <div className="portal__grid">
        <article className="card">
          <h3>📂 Applicant Management</h3>
          <p>Find, update, and verify records and documents.</p>
          <Link to="#" className="btn btn--primary" aria-disabled="true">Open (demo)</Link>
        </article>

        <article className="card">
          <h3>📝 Review & Shortlist</h3>
          <p>Score applications with built-in criteria and produce shortlists.</p>
          <Link to="#" className="btn" aria-disabled="true">Open (demo)</Link>
        </article>

        <article className="card">
          <h3>✉️ Communication</h3>
          <p>Send updates about deadlines, missing docs, or results.</p>
          <Link to="#" className="btn" aria-disabled="true">Open (demo)</Link>
        </article>

        <article className="card">
          <h3>📊 Reports & Analytics</h3>
          <p>Real-time stats: volumes, demographics, trends.</p>
          <Link to="#" className="btn" aria-disabled="true">Open (demo)</Link>
        </article>

        <article className="card">
          <h3>📅 Program Management</h3>
          <p>Post new scholarships, update deadlines, define criteria.</p>
          <Link to="#" className="btn" aria-disabled="true">Open (demo)</Link>
        </article>

        <article className="card">
          <h3>🔒 Security & Access</h3>
          <p>Role-based controls, audit logs, and compliance.</p>
          <Link to="/resources/faqs" className="btn">Learn more</Link>
        </article>
      </div>
    </section>
  );
}
