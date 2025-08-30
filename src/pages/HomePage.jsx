import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import heroBg from '../assets/hero-bg.jpg';
import './HomePage.css';
// at top with other imports
import amaImg from '../assets/IMG_0092-1.jpg';
import lesImg from '../assets/les.jpg';
// Partner logos (replace with your real files)
import pAbsa from '../assets/partners/absa.svg';
import pWorldBank from '../assets/partners/world-bank.svg';
import pUnicef from '../assets/partners/unicef.svg';
import pMtn from '../assets/partners/mtn.svg';
import pKnust from '../assets/partners/knust.png';
import pCedi from '../assets/partners/cedi-bank.png';

const HomePage = () => {
  const loc = useLocation();
  const flash = loc.state?.flash;

  const [showFlash, setShowFlash] = useState(Boolean(flash));

  useEffect(() => {
    if (!flash) return;
    setShowFlash(true);
    const t = setTimeout(() => setShowFlash(false), 3500); // auto-hide after 3.5s
    return () => clearTimeout(t);
  }, [flash]);

  const viewportRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // how many cards should be visible per slide
  const cardsPerPage = () => (window.innerWidth >= 769 ? 2 : 1);

  const pageRef = useRef(0);
  useEffect(() => { pageRef.current = page; }, [page]);

  // update arrow disabled state + the current page number
  const clampEdges = () => {
    const el = viewportRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    setPage(Math.round(el.scrollLeft / el.clientWidth));
  };

  // compute total slides from card count and cardsPerPage()
  const computePages = () => {
    const el = viewportRef.current;
    if (!el) return;
    const count = el.querySelectorAll('.featured__card').length;
    setPages(Math.max(1, Math.ceil(count / cardsPerPage())));
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    // initial
    computePages();
    clampEdges();

    // keep pages correct when the viewport size changes
    const onResize = () => {
      computePages();
      // snap to the current page after resize
      el.scrollTo({ left: pageRef.current * el.clientWidth, behavior: 'auto' });
      clampEdges();
    };

    // listeners
    el.addEventListener('scroll', clampEdges, { passive: true });
    window.addEventListener('resize', onResize);

    // also watch element size (e.g., fonts load, content changes)
    const ro = new ResizeObserver(() => {
      computePages();
      clampEdges();
    });
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', clampEdges);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, []);

  // ── Eligibility state ─────────────────────────────────────────────
  const [eligForm, setEligForm] = useState({
    age: '',
    gpa: '',
    gpaScale: '4', // NEW: normalize GPA to 4.0
    region: '',
    income: ''
  });
  const [eligibility, setEligibility] = useState(null);
  // { status: 'ok' | 'maybe' | 'no', message: '...' }

  // Policy constants in one place
  const GPA_MIN_4 = 2.8;
  const AGE_MIN = 16;
  const AGE_MAX = 35;
  const INCOME_MAX_GHS = 72000;

  const toGpa4 = (gpa, scale) => {
    const n = parseFloat(gpa);
    if (Number.isNaN(n)) return NaN;
    if (scale === '5') return (n / 5) * 4;
    if (scale === '100') return (n / 100) * 4;
    return n; // '4'
  };

  const handleEligChange = (e) => {
    const { name, value } = e.target;
    setEligForm((f) => ({ ...f, [name]: value }));
  };

  const handleEligSubmit = (e) => {
    e.preventDefault();
    const age = parseInt(eligForm.age, 10);
    const gpa4 = toGpa4(eligForm.gpa, eligForm.gpaScale);
    const income = parseInt(eligForm.income, 10);

    // basic guard
    if (Number.isNaN(age) || Number.isNaN(gpa4) || Number.isNaN(income) || !eligForm.region) {
      setEligibility({ status: 'maybe', message: 'Please complete all fields to check eligibility.' });
      return;
    }

    // Simple example policy:
    // Age 16–35, GPA ≥ 2.8/4.0 (normalized), household income ≤ GHS 72,000
    let score = 0;
    if (age >= AGE_MIN && age <= AGE_MAX) score += 1;
    if (gpa4 >= GPA_MIN_4) score += 1;
    if (income <= INCOME_MAX_GHS) score += 1;

    if (score === 3) {
      setEligibility({
        status: 'ok',
        message: "Great news—you’re likely eligible! Start your application or explore matching scholarships."
      });
    } else if (score === 2) {
      setEligibility({
        status: 'maybe',
        message: "You may be eligible depending on program specifics. Review requirements and proceed."
      });
    } else {
      setEligibility({
        status: 'no',
        message: "Based on your answers, you may not qualify at this time. You can still browse open scholarships."
      });
    }
  };

  // partners carousel data
  const partnerLogos = [
    { src: pAbsa, alt: 'ABSA Bank' },
    { src: pWorldBank, alt: 'World Bank' },
    { src: pUnicef, alt: 'UNICEF' },
    { src: pMtn, alt: 'MTN Foundation' },
    { src: pKnust, alt: 'KNUST' },
    { src: pCedi, alt: 'Cedi Bank' },
  ];
  const marquee = [...partnerLogos, ...partnerLogos]; // loop smoothly

  // Newsletter state
  const [newsEmail, setNewsEmail] = useState('');
  const [newsNotice, setNewsNotice] = useState(null); // { type: 'ok'|'err', text: string }

  return (
    <>
      {showFlash && (
        <div className="flash-banner">
          {flash}
        </div>
      )}
      {/* ────────────── Hero ────────────── */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="hero__overlay" />

        <div className="hero__content">
          <h1 className="hero__title">
            Empowering Students. <span>Changing Lives.</span>
          </h1>
          <p className="hero__subtitle">
            Apply now for life-changing scholarships for bright, underserved students.
          </p>

          <div className="hero__cta">
            <Link
              to="/resources"
              className="hero__btn hero__btn--primary"
            >
              Apply Now
            </Link>
            <Link
              to="/resources/eligibility"
              className="hero__btn hero__btn--outline">
              Check Eligibility
            </Link>
          </div>
        </div>
      </section>
      {/* ────────────── Quick Stats & Impact Highlights ────────────── */}
      <section className="stats">
        <div className="stats__card">
          <div className="stats__icon">🎓</div>
          <div className="stats__text">1,200+ Scholarships Awarded</div>
        </div>
        <div className="stats__card">
          <div className="stats__icon">🌍</div>
          <div className="stats__text">Across 10+ Regions in Ghana</div>
        </div>
        <div className="stats__card">
          <div className="stats__icon">📅</div>
          <div className="stats__text">Next Deadline: Sept 30, 2025</div>
        </div>
        <div className="stats__card">
          <div className="stats__icon">💬</div>
          <div className="stats__text">98% Beneficiary Satisfaction</div>
        </div>
      </section>
      <div className="page-content">
        {/* ─────── Available Scholarships (Carousel) ─────── */}
        <section className="featured">
          <h2 className="featured__heading">Available Scholar<span>ships</span></h2>
          {/* NEW WRAPPER */}
          <div className="featured__inner">
            <button
              className="featured__arrow featured__arrow--left"
              disabled={atStart}
              aria-label="Previous"
              onClick={() => {
                const el = viewportRef.current;
                if (!el) return;
                el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
              }}
            >
              &#8592;
            </button>

            <div
              className="featured__viewport"
              ref={viewportRef}
              onScroll={() => {
                const el = viewportRef.current;
                if (!el) return;
                const p = Math.round(el.scrollLeft / el.clientWidth);
                setPage(p);
              }}
            >
              <div className="featured__track">
                <div className="featured__card">
                  <h3 className="featured__title">UYZN Future Leaders Grant</h3>
                  <p className="featured__amount">GHS 5,000</p>
                  <p className="featured__deadline">Deadline: Aug 31, 2025</p>
                  <p className="featured__desc">For incoming undergraduates with leadership potential.</p>
                  <Link to="/directory" className="featured__btn">Apply Now</Link>
                </div>

                <div className="featured__card">
                  <h3 className="featured__title">STEM Innovators Award</h3>
                  <p className="featured__amount">GHS 8,000</p>
                  <p className="featured__deadline">Deadline: Sept 15, 2025</p>
                  <p className="featured__desc">Supporting exceptional science & tech students.</p>
                  <Link to="/directory" className="featured__btn">Apply Now</Link>
                </div>

                <div className="featured__card">
                  <h3 className="featured__title">Arts & Culture Scholarship</h3>
                  <p className="featured__amount">GHS 4,500</p>
                  <p className="featured__deadline">Deadline: Oct 1, 2025</p>
                  <p className="featured__desc">For creative students in visual & performing arts.</p>
                  <Link to="/directory" className="featured__btn">Apply Now</Link>
                </div>

                <div className="featured__card">
                  <h3 className="featured__title">Business Leaders Fund</h3>
                  <p className="featured__amount">GHS 6,000</p>
                  <p className="featured__deadline">Deadline: Sept 30, 2025</p>
                  <p className="featured__desc">For students pursuing business and entrepreneurship.</p>
                  <Link to="/directory" className="featured__btn">Apply Now</Link>
                </div>

                <div className="featured__card">
                  <h3 className="featured__title">Women in STEM Grant</h3>
                  <p className="featured__amount">GHS 7,000</p>
                  <p className="featured__deadline">Deadline: Nov 10, 2025</p>
                  <p className="featured__desc">Empowering female students in science & engineering.</p>
                  <Link to="/directory" className="featured__btn">Apply Now</Link>
                </div>

                <div className="featured__card">
                  <h3 className="featured__title">Rural Access Scholarship</h3>
                  <p className="featured__amount">GHS 3,500</p>
                  <p className="featured__deadline">Deadline: Oct 20, 2025</p>
                  <p className="featured__desc">For students from underserved rural communities.</p>
                  <Link to="/directory" className="featured__btn">Apply Now</Link>
                </div>
              </div>
            </div>

            <button
              className="featured__arrow featured__arrow--right"
              disabled={atEnd}
              aria-label="Next"
              onClick={() => {
                const el = viewportRef.current;
                if (!el) return;
                el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
              }}
            >
              &#8594;
            </button>
          </div>
          <div className="featured__dots">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                className={`featured__dot ${i === page ? 'active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  const el = viewportRef.current;
                  if (!el) return;
                  el.scrollTo({ left: el.clientWidth * i, behavior: 'smooth' });
                }}
              />
            ))}
          </div>

          <div className="featured__all">
            <Link to="/directory" className="featured__all-btn">See All Scholarships</Link>
          </div>
        </section>
        {/* ────────────── How It Works ────────────── */}
        <section id="how-to-apply" className="steps">
          <div className="steps__inner">
            {/* Intro (like the screenshot’s big left block) */}
            <div className="steps__intro">
              <h2 className="steps__heading">
                How to Apply in <span>3 Easy Steps</span>
              </h2>
              <p className="steps__lead">
                UYZN Scholarships is a free scholarship search platform that matches you to
                scholarships you qualify for.
              </p>
              <Link to="/resources" className="steps__btn">
                Learn More
                <span className="steps__btn-arrow" aria-hidden>→</span>
              </Link>
            </div>

            {/* Numbered cards */}
            <ol className="steps__list">
              <li className="steps__item">
                <div className="steps__badge">1</div>
                <h3 className="steps__title">Create a Profile</h3>
                <p className="steps__desc">
                  Sign up and complete your student profile so we can match you to the best scholarships.
                </p>
              </li>

              <li className="steps__item">
                <div className="steps__badge">2</div>
                <h3 className="steps__title">Check Eligibility &amp; Apply</h3>
                <p className="steps__desc">
                  Use the eligibility checker, pick scholarships that fit, and start your application.
                </p>
              </li>

              <li className="steps__item">
                <div className="steps__badge">3</div>
                <h3 className="steps__title">Upload Documents &amp; Submit</h3>
                <p className="steps__desc">
                  Add your transcripts, references, and statements—then submit before the deadline.
                </p>
              </li>
            </ol>
          </div>
        </section>
        {/* ────────────── Success Stories / Testimonials ────────────── */}
        <section className="story">
          {/* Left: image + quote */}
          <figure className="story__media">
            {/* left portrait */}
            <img
              src={amaImg}
              alt="Ama Boateng, UYZN Scholarship recipient"
              className="story__img"
              loading="lazy"
            />

            {/* inline quote fills the empty space to the right of the portrait */}
            <blockquote className="story__quote story__quote--inline">
              “UYZN Scholarships was an amazing resource that helped me hone in on my work
              and made my application so much easier. With its straightforward and
              user-friendly interface.”
              <cite className="story__cite">— Ama Boateng, 2022 Recipient</cite>
            </blockquote>
          </figure>

          {/* Right: headline + copy + buttons */}
          <div className="story__content">
            <div className="story__icon" aria-hidden="true">
              {/* inline SVG mortarboard so you don’t need any libs */}
              <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
                <path d="M2 9.5l10-4 10 4-10 4-10-4z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M6 12.5v3c0 1.2 3.6 2.5 6 2.5s6-1.3 6-2.5v-3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M22 11.5v3" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h2 className="story__heading">Your #1 resource for <span>navigating scholarships</span></h2>
            <p className="story__lead">
              Finding and applying for the right scholarships can be a daunting task.
              UYZN offers a safe and trusted resource to help you find scholarships and
              answer important questions along the way.
            </p>

            <div className="story__cta">
              <Link to="/directory" className="story__btn story__btn--primary">
                Browse Scholarships <span aria-hidden>→</span>
              </Link>
              <Link to="/resources" className="story__btn story__btn--secondary">
                Learn More <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </section>
        {/* ────────────── Video Introduction ────────────── */}
        <section className="video">
          <div className="video__inner">
            {/* floating badge */}
            <div className="video__badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path d="M2 9.5l10-4 10 4-10 4-10-4z" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M6 12.5v3c0 1.2 3.6 2.5 6 2.5s6-1.3 6-2.5v-3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M22 11.5v3" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            <div className="video__copy">
              <p className="video__eyebrow">Inside UYZN</p>
              <h2 className="video__heading">Get to know <span>UYZN</span></h2>
              <p className="video__lead">
                A quick look at how our program works and the impact on past scholars.
              </p>
              <ul className="video__bullets">
                <li>Program overview</li>
                <li>Interviews with past scholars</li>
                <li>Message from the founder</li>
              </ul>

              <a
                className="video__link"
                href="https://www.youtube.com/watch?v=NrchkapM4UY"
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube →
              </a>
            </div>

            <div className="video__frame">
              <div className="video__ratio">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/NrchkapM4UY?rel=0&modestbranding=1&playsinline=1"
                  title="UYZN Scholarship — Program Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        {/* ────────────── Eligibility Checker ────────────── */}
        <section className="elig">
          <div className="elig__inner">
            <div className="elig__copy">
              <p className="elig__eyebrow">Quick Check</p>
              <h2 className="elig__heading">Do you <span>qualify</span>?</h2>
              <p className="elig__lead">
                Answer a few questions to estimate your eligibility. This checker is informational only—
                final decisions are based on your submitted application.
              </p>
              <ul className="elig__bullets">
                <li>Takes under a minute</li>
                <li>Doesn’t affect your application</li>
                <li>Shows next best action</li>
              </ul>
              {/* NEW: privacy-friendly disclaimer */}
              <p id="elig-disclaimer" className="elig__disclaimer">
                We do not store these answers. Using this tool is optional and anonymous.
              </p>
            </div>

            <form className="elig__form" onSubmit={handleEligSubmit} aria-describedby="elig-disclaimer">
              <div className="elig__grid">
                <label className="elig__field">
                  <span className="elig__label">Age</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    autoComplete="off"
                    min="10"
                    max="60"
                    name="age"
                    value={eligForm.age}
                    onChange={handleEligChange}
                    placeholder="e.g., 18"
                    className="elig__input"
                    required
                  />
                </label>

                {/* GPA + scale */}
                <label className="elig__field">
                  <span className="elig__label">GPA</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    name="gpa"
                    value={eligForm.gpa}
                    onChange={handleEligChange}
                    placeholder="e.g., 3.2 or 72%"
                    className="elig__input"
                    required
                  />
                </label>

                <label className="elig__field">
                  <span className="elig__label">GPA scale</span>
                  <select
                    name="gpaScale"
                    value={eligForm.gpaScale}
                    onChange={handleEligChange}
                    className="elig__input"
                    aria-label="GPA scale"
                  >
                    <option value="4">4.0</option>
                    <option value="5">5.0</option>
                    <option value="100">Percentage (0–100)</option>
                  </select>
                </label>

                <label className="elig__field elig__field--full">
                  <span className="elig__label">Region</span>
                  <select
                    name="region"
                    value={eligForm.region}
                    onChange={handleEligChange}
                    className="elig__input"
                    required
                    autoComplete="address-level1"
                  >
                    <option value="" disabled>Choose your region</option>
                    <option>Greater Accra</option>
                    <option>Ashanti</option>
                    <option>Central</option>
                    <option>Eastern</option>
                    <option>Northern</option>
                    <option>Upper East</option>
                    <option>Upper West</option>
                    <option>Western</option>
                    <option>Western North</option>
                    <option>Volta</option>
                    <option>Bono</option>
                    <option>Bono East</option>
                    <option>Ahafo</option>
                    <option>Oti</option>
                    <option>Savannah</option>
                    <option>North East</option>
                  </select>
                </label>

                <label className="elig__field elig__field--full">
                  <span className="elig__label">Household income (GHS / year)</span>
                  <div className="elig__input-group">
                    <span className="elig__prefix" aria-hidden="true">GHS</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      autoComplete="off"
                      min="0"
                      name="income"
                      value={eligForm.income}
                      onChange={handleEligChange}
                      placeholder="e.g., 36000"
                      className="elig__input elig__input--money"
                      required
                    />
                  </div>
                  <small className="elig__help">Approximate is fine.</small>
                </label>
              </div>

              <div className="elig__actions">
                <button type="submit" className="elig__btn">Check My Eligibility</button>
                {/* NEW: simple legal line */}
                <small className="elig__legal">
                  By using this tool you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Notice</Link>.
                </small>

                {eligibility && (
                  <div
                    className={
                      `elig__result ${
                        eligibility.status === 'ok' ? 'elig__result--ok'
                          : eligibility.status === 'maybe' ? 'elig__result--maybe'
                            : 'elig__result--no'
                      }`
                    }
                    role="status"
                    aria-live="polite"
                  >
                    <p className="elig__result-text">{eligibility.message}</p>
                    <div className="elig__result-cta">
                      {eligibility.status === 'ok' && (
                        <>
                          <Link to="/resources/application-process" className="elig__cta elig__cta--primary">Start Application →</Link>
                          <Link to="/directory" className="elig__cta">See Scholarships</Link>
                        </>
                      )}
                      {eligibility.status === 'maybe' && (
                        <>
                          <Link to="/resources/eligibility/quiz" className="elig__cta elig__cta--primary">Take Full Quiz →</Link>
                          <Link to="/directory" className="elig__cta">Browse Scholarships</Link>
                        </>
                      )}
                      {eligibility.status === 'no' && (
                        <Link to="/resources/eligibility/quiz" className="elig__cta">Review Requirements</Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>
        {/* ────────────── Partners / Sponsors ────────────── */}
        <section className="partners" aria-labelledby="partners-title">
          <div className="partners__inner">
            <p className="partners__eyebrow">Our partners</p>
            <h2 id="partners-title" className="partners__heading">
              Proudly supported by <span>trusted institutions</span>
            </h2>

            <div className="partners__marquee" role="region" aria-label="Partner logos">
              <div className="partners__track">
                {marquee.map((p, i) => (
                  <div className="partners__item" key={`${p.alt}-${i}`} aria-hidden={i >= partnerLogos.length ? 'true' : 'false'}>
                    <img className="partners__logo" src={p.src} alt={p.alt} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* ────────────── FAQs Teaser ────────────── */}
        <section className="faq" aria-labelledby="faq-title">
          <div className="faq__inner">
            <p className="faq__eyebrow">FAQs</p>
            <h2 id="faq-title" className="faq__heading">
              Answers to common <span>questions</span>
            </h2>

            <div className="faq__grid">
              <details className="faq__item">
                <summary className="faq__q">
                  Who can apply?
                  <span className="faq__chev" aria-hidden>▸</span>
                </summary>
                <div className="faq__a">
                  Ghana-based students with demonstrated need and strong academic potential.
                  Most programs target ages 16–35, SHS to tertiary levels. Check each listing
                  for specific criteria.
                </div>
              </details>

              <details className="faq__item">
                <summary className="faq__q">
                  What documents do I need?
                  <span className="faq__chev" aria-hidden>▸</span>
                </summary>
                <div className="faq__a">
                  Typically: transcripts or results slip, national ID, proof of income/need,
                  and short essays or recommendation letters. Each scholarship page lists the exact docs.
                </div>
              </details>

              <details className="faq__item">
                <summary className="faq__q">
                  How will I know if I’m selected?
                  <span className="faq__chev" aria-hidden>▸</span>
                </summary>
                <div className="faq__a">
                  You’ll receive an email and dashboard notification. Timelines are posted on each
                  scholarship; decisions usually arrive 2–6 weeks after the deadline.
                </div>
              </details>

              <details className="faq__item">
                <summary className="faq__q">
                  When are the deadlines?
                  <span className="faq__chev" aria-hidden>▸</span>
                </summary>
                <div className="faq__a">
                  Deadlines vary. See the date on each listing and our Application Deadlines page
                  for a consolidated calendar.
                </div>
              </details>

              <details className="faq__item">
                <summary className="faq__q">
                  Can I reapply if I wasn’t selected?
                  <span className="faq__chev" aria-hidden>▸</span>
                </summary>
                <div className="faq__a">
                  Yes—most programs allow reapplication next cycle. Strengthen your profile,
                  update documents, and re-check eligibility.
                </div>
              </details>
            </div>

            <div className="faq__cta">
              <Link to="/resources/faqs" className="faq__btn">See All FAQs</Link>
            </div>
          </div>
        </section>
        {/* ────────────── Newsletter / Updates ────────────── */}
        <section className="news" aria-labelledby="news-title">
          <div className="news__inner">
            <div className="news__copy">
              <div className="news__badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26">
                  <path d="M3 6h18v12H3z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <p className="news__eyebrow">Stay informed</p>
              <h2 id="news-title" className="news__heading">
                Get deadline reminders <span>&amp; updates</span>
              </h2>
              <p className="news__lead">
                Enter your email to receive scholarship deadlines, new opportunities, and program news.
              </p>
            </div>

            <form
              className="news__form"
              onSubmit={(e) => {
                e.preventDefault();
                const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsEmail);
                if (!ok) {
                  setNewsNotice({ type: 'err', text: 'Please enter a valid email address.' });
                  return;
                }
                // TODO: send to your backend / email service
                setNewsNotice({ type: 'ok', text: 'Thanks! You’re subscribed. Check your inbox for a confirmation.' });
                setNewsEmail('');
              }}
              noValidate
            >
              <label htmlFor="news-email" className="sr-only">Email address</label>
              <div className="news__controls">
                <input
                  id="news-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="news__input"
                  aria-describedby="news-help"
                  required
                />
                <button type="submit" className="news__btn">Subscribe</button>
              </div>
              <small id="news-help" className="news__help">
                We’ll only email about scholarship updates. You can unsubscribe anytime.
              </small>

              {newsNotice && (
                <p
                  className={`news__notice ${
                    newsNotice.type === 'ok' ? 'news__notice--ok' : 'news__notice--err'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {newsNotice.text}
                </p>
              )}
            </form>
          </div>
        </section>

        {/* other homepage sections go here */}
      </div>
    </>
  );
};

export default HomePage;
