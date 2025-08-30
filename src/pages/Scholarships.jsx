import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Scholarships.css';

// Campus/partner logos you already have
import pKnust from '../assets/partners/knust.png';
import pAbsa from '../assets/partners/absa.svg';
import pMtn from '../assets/partners/mtn.svg';

// ----- Sample data (swap with live data/API later) -----
const SCHOLARSHIPS = [
  {
    id: 'flg-001',
    title: 'UYZN Future Leaders Grant',
    amount: 5000,
    deadline: '2025-08-31',
    level: 'Undergraduate',
    field: 'Any',
    region: 'National',
    type: 'Need-based',
    featured: true,
    partnerLogo: pAbsa,
    tags: ['Leadership', 'First-Gen', 'Mentorship'],
    overview:
      'Funding + mentorship for first-generation students with clear leadership potential and community service.',
    benefits: ['GHS 5,000 tuition grant', 'Mentor pairing', 'Career workshops'],
    eligibility: [
      'Ghanaian citizen, 16–30',
      'Undergraduate (new or continuing)',
      'Demonstrated financial need & leadership impact',
    ],
    documents: ['Results slip / Transcript', 'National ID', 'Reference letter'],
    timeline: 'Opens July • Deadline Aug 31 • Results by Sep 20',
    faqs: [
      ['Can I reapply?', 'Yes, if your circumstances change you may reapply next cycle.'],
      ['Is it renewable?', 'Renewal is possible based on GPA ≥ 3.0 and need review.'],
    ],
  },
  {
    id: 'stem-203',
    title: 'STEM Innovators Award',
    amount: 8000,
    deadline: '2025-09-15',
    level: 'Undergraduate',
    field: 'STEM',
    region: 'National',
    type: 'Merit-based',
    featured: true,
    partnerLogo: pMtn,
    tags: ['Engineering', 'Computer Science', 'Research'],
    overview:
      'Supporting exceptional science & technology students who build bold solutions to local problems.',
    benefits: ['GHS 8,000 tuition support', 'Lab mini-grants', 'Internship pathways'],
    eligibility: [
      'GPA ≥ 3.2 on 4.0 scale',
      'Enrolled in STEM field',
      'Portfolio or project summary',
    ],
    documents: ['Transcript', 'Project brief (2 pages)', '1 referee contact'],
    timeline: 'Opens Aug • Deadline Sept 15 • Interviews late Sept',
    faqs: [['Group projects?', 'Individual applicants are evaluated; group projects welcomed as evidence.']],
  },
  {
    id: 'arts-110',
    title: 'Arts & Culture Scholarship',
    amount: 4500,
    deadline: '2025-10-01',
    level: 'Undergraduate',
    field: 'Arts',
    region: 'Ashanti',
    type: 'Need-based',
    featured: false,
    partnerLogo: null,
    tags: ['Visual Arts', 'Performing Arts', 'Portfolio'],
    overview:
      'For creative students advancing Ghanaian arts and culture—visual, performing, design.',
    benefits: ['GHS 4,500 tuition support', 'Showcase opportunities'],
    eligibility: ['Portfolio (10–15 works)', 'Statement of purpose', 'Proof of admission'],
    documents: ['Portfolio link', 'Transcript', 'ID'],
    timeline: 'Opens Aug • Deadline Oct 1',
    faqs: [['Can SHS arts students apply?', 'Yes—if admitted to a tertiary program for the coming year.']],
  },
  {
    id: 'rural-550',
    title: 'Rural Access Scholarship',
    amount: 3500,
    deadline: '2025-10-20',
    level: 'SHS',
    field: 'Any',
    region: 'Northern',
    type: 'Need-based',
    featured: false,
    partnerLogo: null,
    tags: ['Rural', 'Transport stipend'],
    overview:
      'Support for promising SHS students from underserved rural districts covering fees and transport stipends.',
    benefits: ['GHS 3,500 support', 'Transport stipends', 'Guidance counselling'],
    eligibility: ['From designated rural district', 'Household income threshold', 'Headteacher reference'],
    documents: ['Results slip', 'Income affidavit', 'Reference letter'],
    timeline: 'Opens Sept • Deadline Oct 20',
    faqs: [['Boarding students?', 'Yes—boarding costs are considered in the need assessment.']],
  },
];

const FIELDS = ['Any', 'STEM', 'Arts', 'Business', 'Health', 'Education'];
const LEVELS = ['SHS', 'Undergraduate', 'Postgraduate'];
const REGIONS = [
  'National', 'Greater Accra', 'Ashanti', 'Northern', 'Central', 'Eastern', 'Western',
  'Volta', 'Bono', 'Upper East', 'Upper West'
];
const TYPES = ['Need-based', 'Merit-based'];

// ----- Helpers -----
const money = (n) => `GHS ${n.toLocaleString()}`;
const isSameDay = (a, b) => {
  const aa = new Date(a), bb = new Date(b);
  return aa.getFullYear() === bb.getFullYear() &&
         aa.getMonth() === bb.getMonth() &&
         aa.getDate() === bb.getDate();
};

function monthMatrix(baseDate) {
  const d = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const firstDay = d.getDay(); // 0: Sun
  const start = new Date(d);
  start.setDate(1 - firstDay);
  const grid = [];
  for (let i = 0; i < 42; i++) {
    const cell = new Date(start);
    cell.setDate(start.getDate() + i);
    grid.push(cell);
  }
  return grid; // 6 weeks
}

// ----- Component -----
export default function Scholarships() {
  // Filters
  const [filters, setFilters] = useState({
    level: 'All',
    field: 'All',
    region: 'All',
    type: 'All',
    min: 0,
    max: 10000,
    due: 'All', // All | 30days | ThisMonth | NextMonth
    q: '',
  });

  const [saved, setSaved] = useState(() => new Set());
  const [detail, setDetail] = useState(null);

  // Calendar
  const [calMonth, setCalMonth] = useState(() => {
    const n = new Date();
    n.setDate(1);
    return n;
  });

  const results = useMemo(() => {
    return SCHOLARSHIPS.filter((s) => {
      if (filters.level !== 'All' && s.level !== filters.level) return false;
      if (filters.field !== 'All' && s.field !== filters.field) return false;
      if (filters.region !== 'All' && s.region !== filters.region) return false;
      if (filters.type !== 'All' && s.type !== filters.type) return false;
      if (!(s.amount >= filters.min && s.amount <= filters.max)) return false;

      // deadline filter
      const now = new Date();
      const d = new Date(s.deadline);
      if (filters.due === '30days') {
        const in30 = new Date();
        in30.setDate(now.getDate() + 30);
        if (!(d >= now && d <= in30)) return false;
      } else if (filters.due === 'ThisMonth') {
        if (!(d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()))
          return false;
      } else if (filters.due === 'NextMonth') {
        const nm = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        if (!(d.getFullYear() === nm.getFullYear() && d.getMonth() === nm.getMonth()))
          return false;
      }

      if (filters.q) {
        const q = filters.q.toLowerCase();
        const blob = [s.title, s.overview, s.tags.join(' ')].join(' ').toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  }, [filters]);

  const featured = useMemo(() => SCHOLARSHIPS.filter(s => s.featured), []);

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Calendar scholarships per day for current month
  const cells = useMemo(() => monthMatrix(calMonth), [calMonth]);
  const byDay = (date) => SCHOLARSHIPS.filter(s => isSameDay(s.deadline, date));

  return (
    <>
      {/* Hero */}
      <section className="sch-hero" role="banner">
        <div className="sch-hero__inner">
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
            <span className="crumbs__current">Scholarships</span>
          </nav>

          <h1>Find scholarships that <span>fit you</span>.</h1>
          <p>Browse opportunities, filter by your profile, and apply with confidence.</p>
          <div className="sch-hero__cta">
            <a href="#directory" className="btn btn--primary">Open Directory</a>
            <Link to="/resources/eligibility" className="btn btn--ghost">Check Eligibility</Link>
          </div>
        </div>
      </section>

      {/* Featured strip */}
      <section className="sch-featured" aria-labelledby="feat-title">
        <div className="sch-featured__inner">
          <h2 id="feat-title">Featured this month</h2>
          <div className="feat-track">
            {featured.map((s) => (
              <article key={s.id} className="feat-card">
                {s.partnerLogo && <img className="feat-card__logo" src={s.partnerLogo} alt="" />}
                <h3 className="feat-card__title">{s.title}</h3>
                <p className="feat-card__meta">{money(s.amount)} • Apply by <strong>{new Date(s.deadline).toLocaleDateString()}</strong></p>
                <div className="chips">
                  {s.tags.map(t => <span key={t} className="chip">{t}</span>)}
                </div>
                <div className="feat-card__cta">
                  <button className={`save ${saved.has(s.id) ? 'is-saved' : ''}`} onClick={() => toggleSave(s.id)}>
                    {saved.has(s.id) ? 'Saved' : 'Save for later'}
                  </button>
                  <button className="link-more" onClick={() => setDetail(s)}>View details →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Directory */}
      <section id="directory" className="sch-wrap">
        <aside className="sch-filters" aria-label="Filters">
          <div className="filter__block">
            <label className="filter__label">Search</label>
            <input
              type="search"
              className="filter__input"
              placeholder="Title, tag, keyword…"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            />
          </div>

          <div className="filter__block">
            <label className="filter__label">Level</label>
            <select className="filter__input" value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })}>
              <option>All</option>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>

          <div className="filter__block">
            <label className="filter__label">Field</label>
            <select className="filter__input" value={filters.field} onChange={(e) => setFilters({ ...filters, field: e.target.value })}>
              <option>All</option>
              {FIELDS.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          <div className="filter__block">
            <label className="filter__label">Region</label>
            <select className="filter__input" value={filters.region} onChange={(e) => setFilters({ ...filters, region: e.target.value })}>
              <option>All</option>
              {REGIONS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div className="filter__block">
            <label className="filter__label">Type</label>
            <select className="filter__input" value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}>
              <option>All</option>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div className="filter__block">
            <label className="filter__label">Amount</label>
            <div className="range">
              <input
                type="number"
                className="filter__input"
                value={filters.min}
                min={0}
                max={filters.max}
                onChange={(e) => setFilters({ ...filters, min: parseInt(e.target.value || '0', 10) })}
              />
              <span className="range__sep">—</span>
              <input
                type="number"
                className="filter__input"
                value={filters.max}
                min={filters.min}
                onChange={(e) => setFilters({ ...filters, max: parseInt(e.target.value || '0', 10) })}
              />
            </div>
          </div>

          <div className="filter__block">
            <label className="filter__label">Deadline</label>
            <select className="filter__input" value={filters.due} onChange={(e) => setFilters({ ...filters, due: e.target.value })}>
              <option value="All">All</option>
              <option value="30days">Next 30 days</option>
              <option value="ThisMonth">This month</option>
              <option value="NextMonth">Next month</option>
            </select>
          </div>

          <button className="filter__clear" onClick={() => setFilters({ level:'All', field:'All', region:'All', type:'All', min:0, max:10000, due:'All', q:'' })}>
            Clear filters
          </button>
        </aside>

        <main className="sch-results" aria-live="polite">
          <div className="results__hd">
            <h2>Scholarship Directory</h2>
            <p>{results.length} result{results.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="cards">
            {results.map((s) => (
              <article key={s.id} className="card">
                <div className="card__head">
                  <h3 className="card__title">{s.title}</h3>
                  <button
                    className={`save ${saved.has(s.id) ? 'is-saved' : ''}`}
                    onClick={() => toggleSave(s.id)}
                    aria-pressed={saved.has(s.id)}
                    aria-label={saved.has(s.id) ? 'Unsave' : 'Save for later'}
                  >
                    {saved.has(s.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
                <p className="card__meta">
                  {money(s.amount)} • {s.level} • {s.field} • {s.region}
                </p>
                <p className="card__desc">{s.overview}</p>
                <div className="chips">
                  <span className="chip chip--due">Apply by {new Date(s.deadline).toLocaleDateString()}</span>
                  <span className="chip">{s.type}</span>
                  {s.tags.slice(0, 2).map(t => <span className="chip" key={t}>{t}</span>)}
                </div>
                <div className="card__cta">
                  <Link to="/resources/application-process" className="btn btn--primary">Apply Now</Link>
                  <button className="btn btn--ghost" onClick={() => setDetail(s)}>View Details</button>
                </div>
              </article>
            ))}
          </div>
        </main>
      </section>

      {/* Deadlines Calendar */}
      <section className="sch-calendar" aria-labelledby="cal-title">
        <div className="sch-calendar__inner">
          <div className="cal-hd">
            <h2 id="cal-title">Deadlines</h2>
            <div className="cal-nav">
              <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))}>◀</button>
              <span>
                {calMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' })}
              </span>
              <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))}>▶</button>
            </div>
          </div>

          <div className="cal-grid" role="grid" aria-labelledby="cal-title">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <div key={d} className="cal-colhead" role="columnheader">{d}</div>
            ))}
            {cells.map((d, i) => {
              const inMonth = d.getMonth() === calMonth.getMonth();
              const list = byDay(d);
              return (
                <div key={i} className={`cal-cell ${inMonth ? '' : 'is-out'}`} role="gridcell" aria-selected="false">
                  <div className="cal-date">{d.getDate()}</div>
                  <div className="cal-dots">
                    {list.slice(0,3).map(s => <span key={s.id} className="dot" title={s.title} />)}
                    {list.length > 3 && <span className="dot more" title={`+${list.length - 3}`} />}
                  </div>
                </div>
              );
            })}
          </div>

          <ul className="cal-list">
            {SCHOLARSHIPS
              .filter(s => {
                const d = new Date(s.deadline);
                return d.getFullYear() === calMonth.getFullYear() && d.getMonth() === calMonth.getMonth();
              })
              .sort((a,b) => new Date(a.deadline) - new Date(b.deadline))
              .map(s => (
                <li key={s.id} className="cal-item">
                  <span className="pill">Apply by {new Date(s.deadline).toLocaleDateString()}</span>
                  <button className="link-more" onClick={() => setDetail(s)}>{s.title}</button>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Past Recipients */}
      <section className="sch-alumni" aria-labelledby="alum-title">
        <div className="sch-alumni__inner">
          <h2 id="alum-title">Past Recipients</h2>
          <div className="alumni-grid">
            <article className="alum">
              <img className="alum__photo" src="https://i.pravatar.cc/240?img=15" alt="Ama Boateng" />
              <div className="alum__body">
                <h3>Ama Boateng <span>’22</span></h3>
                <p>Electrical Engineering, KNUST</p>
                <img className="alum__logo" src={pKnust} alt="KNUST" />
                <Link className="link-more" to="/stories/ama-boateng">Read full story →</Link>
              </div>
            </article>

            <article className="alum">
              <img className="alum__photo" src="https://i.pravatar.cc/240?img=32" alt="Kofi Mensah" />
              <div className="alum__body">
                <h3>Kofi Mensah <span>’23</span></h3>
                <p>Computer Science, KNUST</p>
                <img className="alum__logo" src={pKnust} alt="KNUST" />
                <Link className="link-more" to="/stories/kofi-mensah">Read full story →</Link>
              </div>
            </article>

            <article className="alum">
              <img className="alum__photo" src="https://i.pravatar.cc/240?img=41" alt="Efua Nyarko" />
              <div className="alum__body">
                <h3>Efua Nyarko <span>’24</span></h3>
                <p>Fine Arts, KNUST</p>
                <img className="alum__logo" src={pKnust} alt="KNUST" />
                <Link className="link-more" to="/stories/efua-nyarko">Read full story →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Detail modal */}
      {detail && (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
          <div className="modal__card">
            <button className="modal__close" onClick={() => setDetail(null)} aria-label="Close">×</button>
            <header className="modal__hd">
              <h3 id="dlg-title">{detail.title}</h3>
              <p className="modal__meta">
                {money(detail.amount)} • Apply by <strong>{new Date(detail.deadline).toLocaleDateString()}</strong>
              </p>
              <div className="chips">
                <span className="chip">{detail.level}</span>
                <span className="chip">{detail.field}</span>
                <span className="chip">{detail.region}</span>
                <span className="chip">{detail.type}</span>
              </div>
            </header>

            <section className="modal__body">
              <p className="modal__overview">{detail.overview}</p>

              <div className="modal__grid">
                <div>
                  <h4>Benefits</h4>
                  <ul>{detail.benefits.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
                <div>
                  <h4>Eligibility</h4>
                  <ul>{detail.eligibility.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
                <div>
                  <h4>Documents</h4>
                  <ul>{detail.documents.map(b => <li key={b}>{b}</li>)}</ul>
                </div>
                <div>
                  <h4>Timeline</h4>
                  <p>{detail.timeline}</p>
                </div>
              </div>

              <details className="modal__faq">
                <summary>FAQs</summary>
                <ul>
                  {detail.faqs.map(([q,a]) => (
                    <li key={q}><strong>{q}</strong><br/>{a}</li>
                  ))}
                </ul>
              </details>
            </section>

            <footer className="modal__ft">
              <Link to="/resources/application-process" className="btn btn--primary">Apply Now</Link>
              <button className="btn btn--ghost" onClick={() => toggleSave(detail.id)}>
                {saved.has(detail.id) ? 'Saved' : 'Save for later'}
              </button>
              <Link to="/resources/eligibility/quiz" className="btn btn--ghost">Take Eligibility Quiz</Link>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
