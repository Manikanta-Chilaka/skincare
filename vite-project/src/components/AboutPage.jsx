'use client'

import Navbar from './Navbar'
import './AboutPage.css'

const credentials = [
  { title: 'PhD Pediatric Metabolism', school: 'Heidelberg University, Germany' },
  { title: 'MSc Animal Biotechnology', school: 'Hyderabad Central University' },
  { title: 'Yoga Teacher Certification', school: 'Rishikesh & Svyasa University, Bangalore' },
]

const values = [
  {
    num: '01',
    title: 'Root cause over symptom suppression',
    body: 'Every recommendation traces back to the biological reason behind a symptom — not just temporary relief from it.',
  },
  {
    num: '02',
    title: 'Science meets lived experience',
    body: 'Clinical research guides the protocols. The empathy comes from someone who has been exactly where you are.',
  },
  {
    num: '03',
    title: 'Personalised, not packaged',
    body: 'No two women get the same plan. Lab results, lifestyle, culture, and history all shape every protocol.',
  },
  {
    num: '04',
    title: 'Whole-body thinking',
    body: 'Nutrition, yoga, movement, sleep, and stress — managed together, because the body does not separate them.',
  },
]

const AboutPage = () => {
  return (
    <div className="about-page">
      <Navbar />

      {/* HERO */}
      <section className="ap-hero">
        <div className="ap-hero-inner">
          <div className="ap-hero-text">
            <span className="ap-kicker">About Dr Raga Deepthi Ediga</span>
            <h1>Science shaped by personal struggle.</h1>
            <p>
              Eleven years in Germany. A PhD in Pediatric Metabolism. Her own autoimmune
              battle fought far from home. These are the experiences that built
              ForHerWellbeing — a practice where clinical rigour and deep empathy coexist.
            </p>
            <a href="mailto:forherwellbeing.official@gmail.com" className="ap-cta">
              Book a consultation — ₹1,000
            </a>
          </div>
          <div className="ap-hero-image">
            <img src="/images/dr-raga.jpg" alt="Dr Raga Deepthi Ediga, PhD" />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="ap-story">
        <div className="ap-story-inner">
          <span className="ap-kicker">Her story</span>
          <h2>From Hyderabad to Heidelberg — and back with a purpose.</h2>
          <p>
            Dr Raga Deepthi Ediga grew up in Hyderabad, driven by a deep curiosity about human
            biology. After completing her MSc in Animal Biotechnology at Hyderabad Central
            University, she moved to Germany in 2008 — alone, far from family, and into one
            of Europe's most demanding research environments.
          </p>
          <p>
            Her PhD at Heidelberg University focused on Pediatric Metabolism — studying how
            early metabolic imbalances shape lifelong health. But midway through her research,
            Dr Raga Deepthi Ediga faced something she had not expected: her own body began to falter.
            Autoimmune symptoms, fatigue, and hormonal disruption arrived without warning — in
            a country where she had no family, no familiar food, and a healthcare system that
            treated her as a collection of lab values rather than a whole person.
          </p>
          <p>
            She managed it herself — through research, through trial, through the slow
            rebuilding of metabolic health using the very science she was studying. That
            experience became the foundation of ForHerWellbeing: a belief that Indian women,
            wherever they are in the world, deserve care that sees them fully.
          </p>
          <p>
            She returned to India in 2019, yoga-certified from Rishikesh, PhD completed, and
            with over a decade of research-grade training behind her. She built ForHerWellbeing
            as a practice that bridges rigorous clinical science with deeply personal care — for
            women navigating PCOS, hormonal weight, fertility challenges, thyroid imbalances,
            and the particular stresses of life abroad.
          </p>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="ap-credentials">
        <div className="ap-credentials-inner">
          <span className="ap-kicker">Qualifications</span>
          <h2>Academic rigour behind every protocol.</h2>
          <div className="ap-cred-grid">
            {credentials.map((c) => (
              <div className="ap-cred-card" key={c.title}>
                <strong>{c.title}</strong>
                <span>{c.school}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="ap-values">
        <div className="ap-values-inner">
          <span className="ap-kicker ap-kicker-light">Philosophy</span>
          <h2>Four things ForHerWellbeing will never compromise on.</h2>
          <div className="ap-values-grid">
            {values.map((v) => (
              <div className="ap-value-card" key={v.title}>
                <span className="ap-value-num">{v.num}</span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ap-cta-section">
        <div className="ap-cta-inner">
          <h2>Ready to find your root cause?</h2>
          <p>
            A one-hour consultation with Dr Raga Deepthi Ediga — your full health history reviewed,
            root causes investigated, and a clear path forward. ₹1,000. No surprises.
          </p>
          <a href="mailto:forherwellbeing.official@gmail.com" className="ap-cta ap-cta-large">
            Book consultation — ₹1,000
          </a>
          <a href="/" className="ap-back">← Back to homepage</a>
        </div>
      </section>

      <footer className="ap-footer">
        <div className="ap-footer-inner">
          <span>© 2026 ForHerWellbeing. All rights reserved.</span>
          <div>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage
