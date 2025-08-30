import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import './About.css';

// Partner logos you already use on the homepage
import pAbsa from '../assets/partners/absa.svg';
import pWorldBank from '../assets/partners/world-bank.svg';
import pUnicef from '../assets/partners/unicef.svg';
import pMtn from '../assets/partners/mtn.svg';
import pKnust from '../assets/partners/knust.png';
import pCedi from '../assets/partners/cedi-bank.png';

// Optional: annual report PDF + brand kit (replace with real files)
import annualReport from '../assets/reports/annual-report-2024.pdf';
import mediaKitUrl from '@/assets/brand/uyzn-media-kit.zip?url';

// ⬇️ CHANGED: named export instead of default
export function BrandDownload() {
  return (
    <a href={mediaKitUrl} download="uyzn-media-kit.zip">
      Download Media Kit
    </a>
  );
}

// --- Mock content you can swap later ---
const team = [
  { name: 'Les Ethan', role: 'Executive Director', photo: 'https://i.pravatar.cc/240?img=1' },
  { name: 'Ama Boateng', role: 'Programs Lead', photo: 'https://i.pravatar.cc/240?img=5' },
  { name: 'Kofi Mensah', role: 'Community Partnerships', photo: 'https://i.pravatar.cc/240?img=8' },
  { name: 'Efua Nyarko', role: 'Student Services', photo: 'https://i.pravatar.cc/240?img=9' },
];

const board = [
  { name: 'Dr. Akua Owusu', role: 'Board Chair' },
  { name: 'Yaw Aboagye', role: 'Treasurer' },
  { name: 'Nana Adjoa B.', role: 'Secretary' },
  { name: 'Rev. Daniel K.', role: 'Member' },
];

const timeline = [
  { year: '2019', title: 'The spark', text: 'UYZN is founded to remove financial barriers for high-potential students in Ghana.' },
  { year: '2021', title: 'First 100 awards', text: 'Regional partnerships unlock growth; we expand to 6 regions.' },
  { year: '2023', title: 'Student portal', text: 'Launch of a mobile-friendly application portal and eligibility quiz.' },
  { year: '2025', title: 'National reach', text: '1,200+ awards across 10+ regions; employer mentorship added.' },
];

const jobs = [
  { title: 'Programs Officer (Kumasi)', type: 'Full-time', close: 'Aug 30, 2025' },
  { title: 'Campus Ambassador (Multiple)', type: 'Part-time', close: 'Rolling' },
  { title: 'Volunteer Reviewer', type: 'Volunteer', close: 'Rolling' },
];

const partners = [
  { alt: 'ABSA Bank', src: pAbsa },
  { alt: 'World Bank', src: pWorldBank },
  { alt: 'UNICEF', src: pUnicef },
  { alt: 'MTN Foundation', src: pMtn },
  { alt: 'KNUST', src: pKnust },
  { alt: 'Cedi Bank', src: pCedi },
];

  const SECTIONS = ['story', 'mission', 'team', 'impact', 'partners', 'careers', 'press'];
const SECTION_ALIASES = {
  values: 'mission',
  governance: 'team',
  'impact-stories': 'impact',
  sponsors: 'partners',
};

function normalizeSection(s) {
  if (!s) return 'story';
  const key = s.toLowerCase();
  return SECTIONS.includes(key) ? key : (SECTION_ALIASES[key] || 'story');
}

export default function About() {
  const { section } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState(normalizeSection(section));
  const refs = useRef(SECTIONS.reduce((acc, id) => ({ ...acc, [id]: React.createRef() }), {}));

   // 🔹 Redirect /about → /about/story
  useEffect(() => {
    if (!section) navigate('/about/story', { replace: true });
  }, [section, navigate]);

  // Scroll spy (unchanged except we update URL when active changes)
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          setActive(id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.6, 1] }
    );
    SECTIONS.forEach((id) => refs.current[id]?.current && obs.observe(refs.current[id].current));
    return () => obs.disconnect();
  }, []);

  // When URL param changes (from header menu or back/forward), scroll to it.
  useEffect(() => {
    const dest = normalizeSection(section);
    setActive(dest);
    // Wait a tick so layout is ready, then smooth scroll
    requestAnimationFrame(() => {
      refs.current[dest]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [section, location.key]); // location.key helps when navigating to same path with different param

  // Keep URL in sync when user clicks left-rail buttons
  const go = (id) => navigate(`/about/${id}`);

  return (
    <>
      {/* Hero */}
      <section className="about-hero" role="banner">
        <div className="about-hero__inner">
          {/* Breadcrumbs */}
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/" className="crumbs__home">
                <svg className="crumbs__icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 10.5l9-7 9 7" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M5 11v9h5v-5h4v5h5v-9" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span className="crumbs__label">Home</span>
              </Link>
              <span className="crumbs__sep" aria-hidden>›</span>
              <span className="crumbs__current">About</span>
            </nav>
          <h1 className="about-hero__title">
            Opening doors to <span>education</span> across Ghana.
          </h1>
          <p className="about-hero__lead">
            UYZN Scholarships identifies bright, underserved students and backs them with
            funding, mentorship, and a clear path to graduation. 
          </p>
          <div className="about-hero__cta">
            <Link to="/directory" className="btn btn--primary">Browse Scholarships</Link>
            <button onClick={() => go('team')} className="btn btn--ghost">Meet the team</button>
          </div>
        </div>
      </section>

      {/* Layout: sticky left rail + content */}
      <div className="about-wrap">
        <nav className="about-toc" aria-label="About page">
          <ul>
            {SECTIONS.map((id) => (
              <li key={id}>
                <button
                  className={`toc__link ${active === id ? 'is-active' : ''}`}
                  onClick={() => go(id)}
                >
                  {labelFor(id)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <main className="about-main">
          {/* Our Story (timeline) */}
          <section id="story" ref={refs.current.story} className="about-section">
            <header className="section-hd">
              <h2>Our Story</h2>
              <p>From a small volunteer effort to a national platform for opportunity.</p>
            </header>

            <ol className="timeline">
              {timeline.map((t, i) => (
                <li key={i} className="timeline__item">
                  <div className="timeline__dot" aria-hidden />
                  <div className="timeline__year">{t.year}</div>
                  <div className="timeline__content">
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Mission, Vision, Values */}
          <section id="mission" ref={refs.current.mission} className="about-section">
            <header className="section-hd">
              <h2>Mission, Vision & Values</h2>
              <p>The principles that guide every scholarship we award.</p>
            </header>

            <div className="pillars">
              <article className="pillar">
                <h3>Mission</h3>
                <p>To eliminate financial barriers and help promising students thrive through scholarships, mentoring, and career pathways.</p>
              </article>
              <article className="pillar">
                <h3>Vision</h3>
                <p>A Ghana where talent—not income—determines access to quality education and meaningful work.</p>
              </article>
              <article className="pillar">
                <h3>Values</h3>
                <ul className="pillar__list">
                  <li>Equity & fairness</li>
                  <li>Student-first design</li>
                  <li>Integrity & transparency</li>
                  <li>Community impact</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Team & Governance */}
          <section id="team" ref={refs.current.team} className="about-section">
            <header className="section-hd">
              <h2>Team & Governance</h2>
              <p>Experienced staff, accountable board, strong safeguards.</p>
            </header>

            <div className="team">
              {team.map((p) => (
                <figure key={p.name} className="person">
                  <img src={p.photo} alt={p.name} loading="lazy" />
                  <figcaption>
                    <strong>{p.name}</strong>
                    <span>{p.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="board">
              <h3>Board of Directors</h3>
              <ul>
                {board.map((b) => (
                  <li key={b.name}><strong>{b.name}</strong> — {b.role}</li>
                ))}
              </ul>

              <div className="policies">
                <Link to="/policies/safeguarding" className="link">Safeguarding Policy</Link>
                <Link to="/policies/conflicts" className="link">Conflict of Interest</Link>
                <Link to="/privacy" className="link">Privacy & Data</Link>
              </div>
            </div>
          </section>

          {/* Impact & Reports */}
          <section id="impact" ref={refs.current.impact} className="about-section">
            <header className="section-hd">
              <h2>Impact & Reports</h2>
              <p>Measuring what matters—access, completion, and opportunity.</p>
            </header>

            <div className="impact">
              <div className="impact__stats">
                <div className="stat"><span>1,200+</span>Awards Granted</div>
                <div className="stat"><span>10+</span>Regions Reached</div>
                <div className="stat"><span>92%</span>Retention Rate</div>
                <div className="stat"><span>300+</span>Mentors & Partners</div>
              </div>

              <div className="impact__viz" aria-hidden="true">
                {/* simple decorative “mini map” */}
                <svg viewBox="0 0 320 160" className="mini-map">
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0" stopColor="var(--accent-color)" stopOpacity="0.35" />
                      <stop offset="1" stopColor="var(--accent-color)" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="320" height="160" rx="16" fill="url(#g)" />
                  <circle cx="60" cy="80" r="6" />
                  <circle cx="120" cy="55" r="6" />
                  <circle cx="180" cy="100" r="6" />
                  <circle cx="240" cy="70" r="6" />
                </svg>
              </div>
            </div>

            <a href={annualReport} className="btn btn--ghost" target="_blank" rel="noopener noreferrer">
              Read Annual Report (PDF)
            </a>
          </section>

          {/* Partners & Sponsors */}
          <section id="partners" ref={refs.current.partners} className="about-section">
            <header className="section-hd">
              <h2>Partners & Sponsors</h2>
              <p>Trusted organizations that make this work possible.</p>
            </header>

            <div className="logo-wall">
              {partners.map(p => (
                <div key={p.alt} className="logo">
                  <img src={p.src} alt={p.alt} loading="lazy" />
                  <small>Since 2022</small>
                </div>
              ))}
            </div>

            <Link to="/contact/partners" className="btn btn--primary">Partner with Us</Link>
          </section>

          {/* Careers / Volunteer */}
          <section id="careers" ref={refs.current.careers} className="about-section">
            <header className="section-hd">
              <h2>Careers & Volunteer</h2>
              <p>Join a mission-driven team changing lives at scale.</p>
            </header>

            <div className="jobs">
              {jobs.map((j) => (
                <article key={j.title} className="job">
                  <h3>{j.title}</h3>
                  <p className="job__meta">{j.type} · Closes {j.close}</p>
                  <Link to="/careers" className="link">View details →</Link>
                </article>
              ))}
            </div>

            <div className="benefits">
              <h3>What we offer</h3>
              <ul>
                <li>Meaningful impact and growth</li>
                <li>Hybrid work & wellness benefits</li>
                <li>Training budget & mentorship</li>
              </ul>
            </div>
          </section>

          {/* Press & Media */}
          <section id="press" ref={refs.current.press} className="about-section">
            <header className="section-hd">
              <h2>Press & Media</h2>
              <p>Logos, brand guidelines, and media contacts.</p>
            </header>

            <div className="press">
              {/* ⬇️ FIXED: use mediaKitUrl */}
              <a className="press__card" href={mediaKitUrl} download>
                <h3>Download Media Kit</h3>
                <p>Logos (PNG/SVG), color specs, and usage guidelines.</p>
              </a>
              <Link className="press__card" to="/brand">
                <h3>Brand Guidelines</h3>
                <p>How to use the UYZN mark, colors, and typography.</p>
              </Link>
              <Link className="press__card" to="/contact/media">
                <h3>Media Contact</h3>
                <p>Email our communications team for interviews & quotes.</p>
              </Link>
            </div>
          </section>

          {/* Page CTA */}
          <section className="about-cta">
            <h2>Ready to support the next scholar?</h2>
            <div className="about-cta__row">
              <Link to="/directory" className="btn btn--primary">Browse Scholarships</Link>
              <Link to="/contact/partners" className="btn btn--ghost">Partner with Us</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function labelFor(id) {
  switch (id) {
    case 'story': return 'Our Story';
    case 'mission': return 'Mission & Values';
    case 'team': return 'Team & Governance';
    case 'impact': return 'Impact & Reports';
    case 'partners': return 'Partners & Sponsors';
    case 'careers': return 'Careers / Volunteer';
    case 'press': return 'Press & Media Kit';
    default: return id;
  }
}
