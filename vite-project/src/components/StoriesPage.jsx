'use client'

import Navbar from './Navbar'
import './StoriesPage.css'

const testimonials = [
  {
    name: 'DIVYASREE',
    role: 'Diet Counselling Client · Hyderabad',
    quote:
      'Before starting my diet plan, I never thought I would lose weight. After 3 months I lost almost 15 kgs. The most happiest thing is that I conceived after following your diet plan. Thank you for bringing happiness in me and my family.',
    highlight: '15 kg lost · Conceived naturally',
    stars: 5,
  },
  {
    name: 'PADMA',
    role: 'Diet Counselling Client · London',
    quote:
      'I have tried many methods for weight loss. But when I followed your diet, in just 20 days my periods became regular. Weight loss and inch loss was visible to everyone in a month and I used to feel very light.',
    highlight: 'Irregular periods resolved in 20 days',
    stars: 5,
  },
  {
    name: 'PRIYANKA NAYAK',
    role: 'Antenatal Nutrition Sessions',
    quote:
      'Mam is clarifying doubts very clearly, with patience. By attending all the sessions, it actually freed me from so many fears and doubts. Thank you for sharing such useful nutritional tips.',
    highlight: 'Fear-free pregnancy nutrition',
    stars: 5,
  },
  {
    name: 'REKHA',
    role: 'Thyroid & Metabolic Health Program',
    quote:
      'My thyroid values have normalised after three months. The combination of diet changes and guided yoga made a difference I did not expect so soon. Dr Raga Deepthi Ediga follows up personally and that makes all the difference.',
    highlight: 'Thyroid values normalised · 8 kg lost',
    stars: 5,
  },
  {
    name: 'SUNITHA',
    role: 'PCOS Reversal Program',
    quote:
      'I had been dealing with PCOS for over 5 years. In three months, my energy has returned, the weight that never moved is finally shifting, and my cycles are regular for the first time. I wish I had found this program sooner.',
    highlight: 'Energy returned · PCOS symptoms reversed',
    stars: 5,
  },
  {
    name: 'LAKSHMI',
    role: 'Metabolic Reset Program · USA',
    quote:
      'Living in the US made it hard to find someone who understood Indian food, Indian body types, and what it means to be an Indian woman abroad. Dr Raga Deepthi Ediga does. The program is completely personalised and the support is real.',
    highlight: 'Personalised care for life abroad',
    stars: 5,
  },
]

const StoriesPage = () => {
  return (
    <div className="stories-page">
      <Navbar />

      {/* HEADER */}
      <section className="sp-header">
        <div className="sp-header-inner">
          <span className="sp-kicker">Client stories</span>
          <h1>Women who chose themselves, and transformed.</h1>
          <p>
            Real results from real women — shared with permission, in their own words.
            Every story starts with a decision to stop settling for generic care.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sp-testimonials">
        <div className="sp-testimonials-inner">
          <div className="sp-grid">
            {testimonials.map((t) => (
              <div className="sp-card" key={t.name}>
                <div className="sp-stars" aria-label={`${t.stars} stars`}>
                  {'★'.repeat(t.stars)}
                </div>
                <blockquote>
                  <span className="sp-quote-mark">&ldquo;</span>
                  {t.quote}
                </blockquote>
                <div className="sp-card-footer">
                  <div className="sp-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
                <div className="sp-tags">
                  <span className="sp-tag-highlight">✓ {t.highlight}</span>
                  <span className="sp-tag-verified">✓ Verified Client</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sp-cta-section">
        <div className="sp-cta-inner">
          <h2>Ready to write your own story?</h2>
          <p>
            Book a ₹1,000 consultation with Dr Raga Deepthi Ediga and find out exactly what your body needs.
          </p>
          <a href="mailto:forherwellbeing.official@gmail.com" className="sp-cta-btn">
            Book consultation — ₹1,000
          </a>
          <a href="/" className="sp-back">← Back to homepage</a>
        </div>
      </section>

      <footer className="sp-footer">
        <div className="sp-footer-inner">
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

export default StoriesPage
