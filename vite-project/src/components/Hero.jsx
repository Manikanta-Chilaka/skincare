import { useLayoutEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const programs = [
  {
    title: 'PCOS Healing',
    text: 'Cycle support, nutrition coaching, yoga, and metabolic guidance built around your root cause.',
    meta: '3 months · 20 women',
  },
  {
    title: 'Metabolic Reset',
    text: 'For fatigue, bloating, brain fog, stubborn weight, and the body signals that never feel random.',
    meta: 'Online · guided weekly',
  },
  {
    title: 'Prenatal Care',
    text: 'Trimester-aware movement, food planning, and calm support for a stronger pregnancy journey.',
    meta: 'Yoga · nutrition · community',
  },
  {
    title: 'Gut Health Revival',
    text: 'Heal bloating, acidity, and gut imbalances with targeted nutrition, probiotics, and lifestyle shifts.',
    meta: '8 weeks · personalised plan',
  },
  {
    title: 'Thyroid Balance',
    text: 'Address weight fluctuation, hair fall, fatigue, and mood shifts rooted in thyroid dysfunction.',
    meta: 'Online · lab-guided coaching',
  },
  {
    title: 'Fertility Nutrition',
    text: 'Optimise egg health, hormonal harmony, and body readiness through evidence-based fertility nutrition.',
    meta: '3 months · couples welcome',
  },
]

const signals = [
  'Irregular or painful periods',
  'Weight gain despite trying everything',
  'PCOS, fertility, thyroid, or insulin concerns',
  'Fatigue, bloating, brain fog, or low mood',
]

const outcomes = [
  { value: 15, suffix: 'kg', label: 'lost in a focused 3-month transformation' },
  { value: 20, suffix: '', label: 'days to improved cycle regularity' },
  { value: 6, suffix: '', label: 'flagship women-first programs' },
  { value: 8, suffix: '+', label: 'countries supported online' },
]

const testimonials = [
  {
    name: 'DIVYASREE',
    role: 'Diet Counselling Client · Hyderabad',
    quote: 'Before starting my diet plan, I never thought I would lose weight. After 3 months I lost almost 15 kgs. The most happiest thing is that I conceived after following your diet plan. Thank you for bringing happiness in me and my family.',
    highlight: '15 kg lost · Conceived naturally',
    stars: 5,
  },
  {
    name: 'PADMA',
    role: 'Diet Counselling Client · London',
    quote: 'I have tried many methods for weight loss. But when I followed your diet, in just 20 days my periods became regular. Weight loss and inch loss was visible to everyone in a month and I used to feel very light.',
    highlight: 'Irregular periods resolved in 20 days',
    stars: 5,
  },
  {
    name: 'PRIYANKA NAYAK',
    role: 'Antenatal Nutrition Sessions',
    quote: 'Mam is clarifying doubts very clearly, with patience. By attending all the sessions, it actually freed me from so many fears and doubts. Thank you for sharing such useful nutritional tips.',
    highlight: 'Fear-free pregnancy nutrition',
    stars: 5,
  },
]

const quizQuestions = [
  {
    question: 'What is your primary health concern?',
    options: ['PCOS or irregular periods', 'Weight that will not shift', 'Fatigue, bloating, brain fog', 'Pregnancy or prenatal care'],
  },
  {
    question: 'How long have you been experiencing this?',
    options: ['Less than 6 months', '6 months to 1 year', '1–3 years', 'More than 3 years'],
  },
  {
    question: 'What have you tried so far?',
    options: ['Generic diets & plans', 'Medications only', 'Exercise programs', 'Nothing yet — just starting'],
  },
]

const quizResultMap = {
  'PCOS or irregular periods': { program: 'PCOS Healing', desc: 'Our 3-month PCOS healing program with cycle support, nutrition coaching, and metabolic guidance built for your root cause.' },
  'Weight that will not shift': { program: 'Metabolic Reset', desc: 'A guided metabolic reset addressing fatigue, bloating, and stubborn weight through personalized nutrition.' },
  'Fatigue, bloating, brain fog': { program: 'Metabolic Reset', desc: 'A guided metabolic reset addressing fatigue, bloating, and stubborn weight through personalized nutrition.' },
  'Pregnancy or prenatal care': { program: 'Prenatal Care', desc: 'Trimester-aware movement, food planning, and calm support for a stronger pregnancy journey.' },
}

const splitWords = (text) =>
  text.split(' ').map((word, index) => (
    <span className="word-wrap" key={`${word}-${index}`}>
      <span className="split-word">{word}</span>
    </span>
  ))

const fadeUp = {
  hidden: { y: 34, opacity: 0 },
  visible: { y: 0, opacity: 1 },
}

const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  size: `${3 + Math.random() * 5}px`,
  duration: `${10 + Math.random() * 14}s`,
  delay: `${i * 0.6}s`,
  opacity: 0.08 + Math.random() * 0.12,
}))

const Hero = () => {
  const pageRef = useRef(null)
  const orbRef = useRef(null)
  const heroBottleRef = useRef(null)
  const marqueeRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const programsSectionRef = useRef(null)
  const programsTrackRef = useRef(null)


  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)

  const handleQuizOption = (option) => {
    const next = [...quizAnswers, option]
    setQuizAnswers(next)
    if (next.length >= quizQuestions.length) {
      setTimeout(() => setShowResult(true), 350)
    } else {
      setQuizStep((s) => s + 1)
    }
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setQuizAnswers([])
    setShowResult(false)
  }

  const quizResult = quizAnswers[0] ? quizResultMap[quizAnswers[0]] : null

  const handleTilt = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -10
    const rotateY = ((x / rect.width) - 0.5) * 10
    gsap.to(card, { rotateX, rotateY, y: -8, duration: 0.35, ease: 'power2.out', transformPerspective: 900, transformOrigin: 'center' })
  }

  const resetTilt = (event) => {
    gsap.to(event.currentTarget, { rotateX: 0, rotateY: 0, y: 0, duration: 0.45, ease: 'power3.out' })
  }

  const handleMagnetic = useCallback((e) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' })
  }, [])

  const resetMagnetic = useCallback((e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }, [])

  useLayoutEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.2 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const moveCursor = (event) => {
      if (!cursorRef.current || !cursorDotRef.current) return
      gsap.to(cursorRef.current, { x: event.clientX, y: event.clientY, duration: 0.45, ease: 'power3.out' })
      gsap.to(cursorDotRef.current, { x: event.clientX, y: event.clientY, duration: 0.12, ease: 'power2.out' })
    }
    window.addEventListener('pointermove', moveCursor)

    const ctx = gsap.context(() => {
      /* ── Split-word reveal ─────────────── */
      gsap.set('.split-word', { yPercent: 112, rotate: 3 })
      gsap.to('.split-word', { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.035, ease: 'power4.out', delay: 0.15 })

      /* ── Floating orb ──────────────────── */
      gsap.to(orbRef.current, { y: 28, x: -18, rotate: 8, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      /* ── Image clip-path reveal ────────── */
      gsap.from('.hero-visual img', { clipPath: 'circle(0% at 50% 50%)', duration: 1.4, ease: 'power3.out', delay: 0.3 })

      /* ── Hero parallax layers ──────────── */
      gsap.to('.hero-copy', {
        y: -60,
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(orbRef.current, {
        y: 80,
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
      })

      /* ── Doctor image scroll parallax ─── */
      gsap.to(heroBottleRef.current, {
        scrollTrigger: { trigger: '.programs-section', start: 'top bottom', end: 'bottom top', scrub: true },
        y: 260, rotate: -14, scale: 0.78, ease: 'none',
      })

      /* ── Signal reveal lines ───────────── */
      gsap.to('.reveal-line', {
        scrollTrigger: { trigger: '.signals-section', start: 'top 70%', end: 'bottom 30%', scrub: true },
        scaleX: 1, transformOrigin: 'left center', stagger: 0.08,
      })

      /* ── Credential marquee ────────────── */
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 22, repeat: -1, ease: 'none' })

      /* ── Horizontal scroll programs (desktop) */
      const mm = gsap.matchMedia()
      mm.add('(min-width: 901px)', () => {
        const track = programsTrackRef.current
        if (!track) return
        const totalScroll = track.scrollWidth - window.innerWidth
        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: programsSectionRef.current,
            start: 'top top',
            end: `+=${totalScroll}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })



      /* ── Motion cards entrance ─────────── */
      gsap.utils.toArray('.motion-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 84%' },
          y: 42, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      })

      /* ── Enhanced counter with scramble ── */
      gsap.utils.toArray('.counter-value').forEach((counter) => {
        const target = Number(counter.dataset.target)
        const suffix = counter.dataset.suffix || ''
        let scrambleId

        ScrollTrigger.create({
          trigger: counter,
          start: 'top 86%',
          once: true,
          onEnter: () => {
            scrambleId = setInterval(() => {
              counter.textContent = `${Math.floor(Math.random() * target * 2)}${suffix}`
            }, 50)
            setTimeout(() => {
              clearInterval(scrambleId)
              const state = { value: 0 }
              gsap.to(state, {
                value: target,
                duration: 1.2,
                ease: 'power2.out',
                onUpdate: () => { counter.textContent = `${Math.round(state.value)}${suffix}` },
                onComplete: () => { counter.classList.add('counter-done') },
              })
            }, 400)
          },
        })
      })

      /* ── Scroll-linked color transitions ─ */
      const colorSections = [
        { trigger: '.hero-section', color: '#f6f1e8' },
        { trigger: '.signals-section', color: '#eae5dc' },
        { trigger: '.abroad-section', color: '#f0e4d4' },
        { trigger: '.outcomes-section', color: '#f6f1e8' },
        { trigger: '.testimonials-section', color: '#faf5ee' },
        { trigger: '.quiz-section', color: '#f6f1e8' },
      ]
      colorSections.forEach(({ trigger, color }, i) => {
        ScrollTrigger.create({
          trigger,
          start: 'top 60%',
          onEnter: () => gsap.to(pageRef.current, { backgroundColor: color, duration: 0.7 }),
          onLeaveBack: () => {
            const prev = i > 0 ? colorSections[i - 1].color : '#f6f1e8'
            gsap.to(pageRef.current, { backgroundColor: prev, duration: 0.7 })
          },
        })
      })

      /* ── Testimonial card entrance ─────── */
      gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 50, opacity: 0, rotate: i % 2 === 0 ? -2 : 2,
          duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        })
      })
    }, pageRef)

    return () => {
      ctx.revert()
      window.removeEventListener('pointermove', moveCursor)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="fhw-page" ref={pageRef}>
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />

      {/* ═══ HERO ═══════════════════════════ */}
      <section className="hero-section">
        <Navbar />

        {/* Floating particles */}
        <div className="hero-particles" aria-hidden="true">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{ '--x': p.x, '--size': p.size, '--dur': p.duration, '--delay': p.delay, opacity: p.opacity }}
            />
          ))}
        </div>

        <div className="hero-grid">
          <motion.div className="hero-copy" initial="hidden" animate="visible" transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}>
            <motion.p className="eyebrow" variants={fadeUp}>
              Dr. Raga Deepthi — science-backed holistic wellness
            </motion.p>
            <h1 className="split-heading-text">
              {splitWords('You have tried enough. Let us find why your body is asking for help.')}
            </h1>
            <motion.p className="hero-lede" variants={fadeUp}>
              ForHerWellbeing helps women decode PCOS, fatigue, hormonal weight,
              fertility concerns, gut health, and stress with root-cause nutrition,
              yoga, and deeply personal coaching.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a href="#consultation" className="primary-action magnetic-btn" onPointerMove={handleMagnetic} onPointerLeave={resetMagnetic}>
                Book consultation
              </a>
              <a href="#quiz" className="secondary-action magnetic-btn" onPointerMove={handleMagnetic} onPointerLeave={resetMagnetic}>
                Find my program
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={{ y: 60, opacity: 0, rotate: -3 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.25 }}
          >
            <div className="pulse-orb" ref={orbRef}>
              <span>Root cause</span>
              <strong>Care</strong>
            </div>
            <img ref={heroBottleRef} src="/images/dr-raga.jpg" alt="Dr. Raga Deepthi" />
            <div className="doctor-note tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <span>Next batch</span>
              <strong>20 women only</strong>
              <p>Personal attention, weekly guidance, English and Telugu support.</p>
            </div>
          </motion.div>
        </div>

        <div className="cred-strip">
          <div ref={marqueeRef} className="cred-track">
            <span>PhD Metabolic Science</span>
            <span>Yoga and meditation certified</span>
            <span>100% online programs</span>
            <span>Women in India, UK, Germany, USA and Australia</span>
            <span>PhD Metabolic Science</span>
            <span>Yoga and meditation certified</span>
            <span>100% online programs</span>
            <span>Women in India, UK, Germany, USA and Australia</span>
          </div>
        </div>
      </section>

      {/* ═══ SIGNALS ════════════════════════ */}
      <section className="signals-section" id="rituals">
        <div className="section-kicker">You are not alone</div>
        <div className="split-heading">
          <h2>Symptoms are signals. Your plan should listen.</h2>
          <p>
            Instead of another generic diet, ForHerWellbeing investigates the
            metabolic, hormonal, gut, and stress patterns behind what you feel.
          </p>
        </div>
        <div className="signal-list">
          {signals.map((signal) => (
            <div className="signal-row" key={signal}>
              <span>{signal}</span>
              <i className="reveal-line" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ PROGRAMS (horizontal scroll) ═══ */}
      <section className="programs-section" id="products" ref={programsSectionRef}>
        <div className="section-top">
          <div>
            <span className="section-kicker">Flagship programs</span>
            <h2>Three months of science, structure, and sisterhood.</h2>
          </div>
          <a href="#consultation" className="magnetic-btn" onPointerMove={handleMagnetic} onPointerLeave={resetMagnetic}>Explore all programs</a>
        </div>

        <div className="programs-track" ref={programsTrackRef}>
          {programs.map((program, index) => (
            <article className="program-card motion-card tilt-card" key={program.title} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <span>0{index + 1}</span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <strong>{program.meta}</strong>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ ABROAD ═════════════════════════ */}
      <section className="abroad-section">
        <div className="abroad-copy motion-card">
          <span className="section-kicker">For Indian women abroad</span>
          <h2>You moved countries. Your hormones did not.</h2>
          <p>
            Cold weather, new food patterns, vitamin D dips, isolation, and stress
            can change the body fast. This care model was built by someone who has
            lived that story and treats it with science.
          </p>
        </div>
        <div className="abroad-points">
          {['Vitamin D crash', 'Gut disruption', 'Cortisol surge', 'Culturally aware care'].map((point) => (
            <div className="motion-card tilt-card" key={point} onPointerMove={handleTilt} onPointerLeave={resetTilt}>{point}</div>
          ))}
        </div>
      </section>

      {/* ═══ OUTCOMES ═══════════════════════ */}
      <section className="outcomes-section">
        <span className="section-kicker">Real outcomes</span>
        <h2>Progress you can measure, support you can feel.</h2>
        <div className="outcome-grid">
          {outcomes.map((outcome) => (
            <div className="outcome-card motion-card tilt-card" key={outcome.label} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <strong className="counter-value" data-target={outcome.value} data-suffix={outcome.suffix}>0{outcome.suffix}</strong>
              <span>{outcome.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══════════════════ */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-kicker">Real stories</div>
        <h2 className="testimonials-heading">Women who chose themselves, and transformed.</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card tilt-card" key={t.name} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              <div className="testimonial-stars" aria-label={`${t.stars} stars`}>
                {'★'.repeat(t.stars)}
              </div>
              <blockquote>
                <span className="quote-mark">"</span>
                {t.quote}
              </blockquote>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
              <div className="testimonial-tags">
                <span className="tag-highlight">✓ {t.highlight}</span>
                <span className="tag-verified">✓ Verified Client</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ QUIZ (interactive multi-step) ═══ */}
      <section className="quiz-section" id="quiz">
        <div className="quiz-panel motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
          <div className="quiz-left">
            <span className="section-kicker">Quick quiz</span>
            <h2>Which program is right for you?</h2>
            <div className="quiz-progress">
              {quizQuestions.map((_, i) => (
                <div key={i} className={`quiz-dot${i < quizAnswers.length ? ' done' : ''}${i === quizStep && !showResult ? ' active' : ''}`} />
              ))}
            </div>
          </div>

          <div className="quiz-right">
            <AnimatePresence mode="wait">
              {showResult && quizResult ? (
                <motion.div
                  key="result"
                  className="quiz-result"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="quiz-result-label">Your recommended program</span>
                  <h3>{quizResult.program}</h3>
                  <p>{quizResult.desc}</p>
                  <div className="quiz-result-actions">
                    <a href="#consultation" className="primary-action magnetic-btn" onPointerMove={handleMagnetic} onPointerLeave={resetMagnetic}>
                      Book consultation
                    </a>
                    <button onClick={resetQuiz} className="quiz-retry">Retake quiz</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={quizStep}
                  className="quiz-step"
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -60, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="quiz-question">{quizQuestions[quizStep]?.question}</p>
                  <div className="quiz-options">
                    {quizQuestions[quizStep]?.options.map((opt) => (
                      <button key={opt} onClick={() => handleQuizOption(opt)}>{opt}</button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ CONSULT CTA ════════════════════ */}
      <section className="consult-section" id="consultation">
        <div>
          <span className="section-kicker">Free. personal. confidential.</span>
          <h2>Ask Dr. Raga directly, or begin with a consultation.</h2>
        </div>
        <a className="primary-action magnetic-btn" href="mailto:edigaragadeepthi@gmail.com" onPointerMove={handleMagnetic} onPointerLeave={resetMagnetic}>
          Start your journey
        </a>
      </section>
    </main>
  )
}

export default Hero
