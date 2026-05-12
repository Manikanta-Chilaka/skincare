'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './Navbar'
import './LandingPage.css'

gsap.registerPlugin(ScrollTrigger)

/* ─── DATA ──────────────────────────────────────── */

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

const batches = [
  { month: 'May 2026', program: 'PCOS Healing', spotsLeft: 14, total: 20, start: 'May 5' },
  { month: 'May 2026', program: "Women's Obesity", spotsLeft: 5, total: 20, start: 'May 5' },
  { month: 'June 2026', program: 'Metabolic Reset', spotsLeft: 16, total: 20, start: 'June 2' },
]

const videoTestimonials = [
  {
    name: 'Rekha',
    program: 'Thyroid & Metabolic Health Program',
    highlight: 'Thyroid values normalised — lost 8 kg in 3 months',
    src: '/videos/rekha-testimonial.mp4',
  },
  {
    name: 'Sunitha',
    program: 'PCOS Reversal Program',
    highlight: 'Energy returned, weight reduced, PCOS symptoms reversed',
    src: '/videos/sunitha-testimonial.mp4',
  },
  {
    name: 'Divyasree',
    program: 'Diet Counselling · Hyderabad',
    highlight: 'Lost 15 kg and conceived naturally after following the plan',
    src: '/videos/divyasree-testimonial.mp4',
  },
]

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
]

const pricingTiers = [
  {
    name: 'Initial Consultation',
    price: '₹1,000',
    duration: 'One-time · 60 min',
    cta: 'Book now',
    highlighted: false,
    features: [
      'Deep-dive health history review',
      'Root-cause assessment',
      'Personalised program recommendation',
      'Direct Q&A with Dr. Raga',
    ],
  },
  {
    name: 'Group Programs',
    price: '₹15,000+',
    duration: '3-month cohort',
    cta: 'Reserve your spot',
    highlighted: true,
    features: [
      'Weekly group coaching calls',
      'Personalised nutrition protocol',
      'Therapeutic yoga sessions',
      'WhatsApp community support',
      'Lab test interpretation',
      'Max 20 women per batch',
    ],
  },
  {
    name: 'Premium 1:1',
    price: '₹50,000+',
    duration: '3-month personalised',
    cta: 'Apply for 1:1',
    highlighted: false,
    features: [
      'Weekly 1:1 calls with Dr. Raga',
      'Fully custom protocol',
      'Priority WhatsApp access',
      'Monthly lab review',
      'Supplement guidance',
      'Unlimited session support',
    ],
  },
]

const faqItems = [
  {
    q: 'How is this different from seeing a regular nutritionist?',
    a: 'Most nutritionists create generic meal plans. Dr. Raga investigates the metabolic, hormonal, and gut root causes behind your symptoms — then builds a protocol specific to your body, your labs, and your lifestyle. Her PhD in Pediatric Metabolism and 11 years of clinical research in Germany shape every recommendation.',
  },
  {
    q: 'What conditions does ForHerWellbeing treat?',
    a: 'PCOS and irregular periods, hormonal weight gain, insulin resistance, thyroid imbalances, gut dysbiosis, Vitamin D deficiency, fertility preparation, prenatal and postnatal nutrition, fatigue, brain fog, and autoimmune-related metabolic conditions.',
  },
  {
    q: 'Are sessions fully online? What about time zones?',
    a: 'Yes, 100% online. Dr. Raga works with women across India, UK, Germany, USA, Australia, Canada, Netherlands, and Singapore. Sessions are scheduled around your time zone — morning, evening, or weekend slots are available.',
  },
  {
    q: 'What is the total cost for a full program?',
    a: 'The ₹1,000 consultation is a standalone session. Group programs start at ₹15,000 for three months. Premium 1:1 programs start at ₹50,000. The consultation fee is credited toward any program you join within 30 days.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Many women notice changes in energy, bloating, and sleep within 2–4 weeks. Cycle improvements often show by the second month. Metabolic shifts like weight loss and thyroid stabilisation typically take the full 3 months.',
  },
  {
    q: 'I live abroad — can this still work for me?',
    a: 'Absolutely. The abroad women program was built specifically for Indian women navigating cold climates, dietary shifts, Vitamin D deficiency, and healthcare systems unfamiliar with their conditions. Dr. Raga lived in Germany for 11 years and built this program from that experience.',
  },
  {
    q: 'Are sessions available in Telugu?',
    a: 'Yes. Sessions are available in both English and Telugu. You can choose your preferred language at the time of booking.',
  },
  {
    q: 'What is the refund policy?',
    a: 'The ₹1,000 consultation is non-refundable. For group programs and 1:1 programs, a full refund is available within 7 days of joining if you have not attended any sessions. After that, a prorated refund is offered based on sessions attended.',
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
    options: ['Generic diets and plans', 'Medications only', 'Exercise programs', 'Nothing yet — just starting'],
  },
]

const quizResultMap = {
  'PCOS or irregular periods': { program: 'PCOS Healing', desc: 'Our 3-month PCOS healing program with cycle support, nutrition coaching, and metabolic guidance built for your root cause.' },
  'Weight that will not shift': { program: 'Metabolic Reset', desc: 'A guided metabolic reset addressing fatigue, bloating, and stubborn weight through personalised nutrition.' },
  'Fatigue, bloating, brain fog': { program: 'Metabolic Reset', desc: 'A guided metabolic reset addressing fatigue, bloating, and stubborn weight through personalised nutrition.' },
  'Pregnancy or prenatal care': { program: 'Prenatal Care', desc: 'Trimester-aware movement, food planning, and calm support for a stronger pregnancy journey.' },
}

const credentials = [
  { title: 'PhD Pediatric Metabolism', school: 'Heidelberg University, Germany' },
  { title: 'MSc Animal Biotechnology', school: 'Hyderabad Central University' },
  { title: 'Yoga Teacher Certification', school: 'Rishikesh & Svyasa University, Bangalore' },
]

/* ─── UTILS ─────────────────────────────────────── */

const splitWords = (text) =>
  text.split(' ').map((word, index) => (
    <span className="word-wrap" key={`${word}-${index}`}>
      <span className="split-word">{word}</span>
    </span>
  ))

const fadeUp = { hidden: { y: 34, opacity: 0 }, visible: { y: 0, opacity: 1 } }

const particles = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  x: `${10 + i * 18}%`,
  size: `${3 + (i % 3)}px`,
  duration: `${12 + i * 3}s`,
  delay: `${i * 1.2}s`,
  opacity: 0.06 + (i % 3) * 0.03,
}))

/* ─── COMPONENT ─────────────────────────────────── */

const LandingPage = () => {
  const pageRef = useRef(null)
  const orbRef = useRef(null)
  const heroBottleRef = useRef(null)
  const marqueeRef = useRef(null)
  const programsSectionRef = useRef(null)
  const programsTrackRef = useRef(null)

  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [showResult, setShowResult] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', concern: '' })
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadLoading, setLeadLoading] = useState(false)

  const handleQuizOption = (option) => {
    const next = [...quizAnswers, option]
    setQuizAnswers(next)
    if (next.length >= quizQuestions.length) {
      setTimeout(() => setShowResult(true), 350)
    } else {
      setQuizStep((s) => s + 1)
    }
  }

  const resetQuiz = () => { setQuizStep(0); setQuizAnswers([]); setShowResult(false) }

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

  const handleLeadChange = (e) => {
    setLeadForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    setLeadLoading(true)
    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      })
      if (res.ok) setLeadSubmitted(true)
    } catch {
      setLeadSubmitted(true)
    } finally {
      setLeadLoading(false)
    }
  }

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.2 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const ctx = gsap.context(() => {
      gsap.set('.split-word', { yPercent: 112, rotate: 3 })
      gsap.to('.split-word', { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.035, ease: 'power4.out', delay: 0.15 })

      gsap.to(orbRef.current, { y: 28, x: -18, rotate: 8, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      gsap.from('.hero-visual img', { clipPath: 'circle(0% at 50% 50%)', duration: 1.4, ease: 'power3.out', delay: 0.3 })

      gsap.to('.hero-copy', {
        y: -60,
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(orbRef.current, {
        y: 80,
        scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.to(heroBottleRef.current, {
        scrollTrigger: { trigger: '.programs-section', start: 'top bottom', end: 'bottom top', scrub: true },
        y: 260, rotate: -14, scale: 0.78, ease: 'none',
      })

      gsap.to('.reveal-line', {
        scrollTrigger: { trigger: '.signals-section', start: 'top 70%', end: 'bottom 30%', scrub: true },
        scaleX: 1, transformOrigin: 'left center', stagger: 0.08,
      })

      gsap.to(marqueeRef.current, { xPercent: -50, duration: 22, repeat: -1, ease: 'none' })

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

      gsap.utils.toArray('.motion-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 84%' },
          y: 42, opacity: 0, duration: 0.8, ease: 'power3.out',
        })
      })

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

      const colorSections = [
        { trigger: '.hero-section', color: '#f6f1e8' },
        { trigger: '.signals-section', color: '#eae5dc' },
        { trigger: '.batches-section', color: '#f0e8de' },
        { trigger: '.abroad-section', color: '#f0e4d4' },
        { trigger: '.outcomes-section', color: '#f6f1e8' },
        { trigger: '.video-testimonials-section', color: '#faf5ee' },
        { trigger: '.testimonials-section', color: '#faf5ee' },
        { trigger: '.about-section', color: '#eae5dc' },
        { trigger: '.lead-magnet-section', color: '#f6f1e8' },
        { trigger: '.quiz-section', color: '#f6f1e8' },
        { trigger: '.faq-section', color: '#f0ebe2' },
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

      gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%' },
          y: 50, opacity: 0, rotate: i % 2 === 0 ? -2 : 2,
          duration: 0.9, delay: i * 0.12, ease: 'power3.out',
        })
      })

      gsap.from('.about-image', {
        scrollTrigger: { trigger: '.about-section', start: 'top 72%' },
        x: -50, opacity: 0, duration: 1, ease: 'power3.out',
      })
      gsap.from('.about-content > *', {
        scrollTrigger: { trigger: '.about-section', start: 'top 72%' },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })

      gsap.utils.toArray('.faq-item').forEach((item) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: 'top 92%' },
          y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
        })
      })
    }, pageRef)

    return () => {
      ctx.revert()
      lenis.destroy()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <main className="fhw-page" ref={pageRef}>

      {/* ═══ HERO ═══════════════════════════════════ */}
      <section className="hero-section">
        <Navbar />

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
              <a
                href="#consultation"
                className="primary-action magnetic-btn"
                onPointerMove={handleMagnetic}
                onPointerLeave={resetMagnetic}
              >
                Book consultation — ₹1,000
              </a>
              <a
                href="#quiz"
                className="secondary-action magnetic-btn"
                onPointerMove={handleMagnetic}
                onPointerLeave={resetMagnetic}
              >
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
            <span>PhD Pediatric Metabolism · Heidelberg University</span>
            <span>11 years in Germany</span>
            <span>Yoga and meditation certified</span>
            <span>100% online programs</span>
            <span>Women in India, UK, Germany, USA and Australia</span>
            <span>PhD Pediatric Metabolism · Heidelberg University</span>
            <span>11 years in Germany</span>
            <span>Yoga and meditation certified</span>
            <span>100% online programs</span>
            <span>Women in India, UK, Germany, USA and Australia</span>
          </div>
        </div>
      </section>

      {/* ═══ SIGNALS ════════════════════════════════ */}
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

      {/* ═══ PROGRAMS ═══════════════════════════════ */}
      <section className="programs-section" id="products" ref={programsSectionRef}>
        <div className="section-top programs-section-top">
          <div>
            <span className="section-kicker">Flagship programs</span>
            <h2>Three months of science, structure, and sisterhood.</h2>
          </div>
          <a
            href="#consultation"
            className="magnetic-btn programs-explore-btn"
            onPointerMove={handleMagnetic}
            onPointerLeave={resetMagnetic}
          >
            Explore all programs
          </a>
        </div>

        <p className="scroll-hint scroll-hint-light" aria-hidden="true">Swipe to see all programs →</p>
        <div className="programs-track" ref={programsTrackRef}>
          {programs.map((program, index) => (
            <article
              className="program-card motion-card tilt-card"
              key={program.title}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
            >
              <span>0{index + 1}</span>
              <h3>{program.title}</h3>
              <p>{program.text}</p>
              <strong>{program.meta}</strong>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ NEXT BATCHES ═══════════════════════════ */}
      <section className="batches-section" id="batches">
        <div className="batches-inner">
          <div className="batches-header">
            <span className="section-kicker">Upcoming batches</span>
            <h2>Limited spots. Real results. Real women.</h2>
            <p>Each cohort is capped at 20 women to ensure Dr. Raga can give each person genuine attention.</p>
          </div>
          <div className="batches-grid">
            {batches.map((batch) => {
              const filled = batch.total - batch.spotsLeft
              const pct = (filled / batch.total) * 100
              const urgent = batch.spotsLeft <= 6
              return (
                <div
                  className={`batch-card motion-card tilt-card${urgent ? ' batch-urgent' : ''}`}
                  key={batch.program}
                  onPointerMove={handleTilt}
                  onPointerLeave={resetTilt}
                >
                  <div className="batch-month">{batch.month}</div>
                  <h3>{batch.program}</h3>
                  <div className="batch-spots-wrap">
                    <div className="spots-bar">
                      <div className="spots-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className={urgent ? 'spots-urgent' : ''}>
                      {batch.spotsLeft} of {batch.total} spots remaining
                    </span>
                  </div>
                  <div className="batch-start">Starting {batch.start}</div>
                  <a
                    href="#consultation"
                    className="primary-action magnetic-btn batch-cta"
                    onPointerMove={handleMagnetic}
                    onPointerLeave={resetMagnetic}
                  >
                    Reserve my spot
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ ABROAD ═════════════════════════════════ */}
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
            <div className="motion-card tilt-card" key={point} onPointerMove={handleTilt} onPointerLeave={resetTilt}>
              {point}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ OUTCOMES ═══════════════════════════════ */}
      <section className="outcomes-section">
        <span className="section-kicker">Real outcomes</span>
        <h2>Progress you can measure, support you can feel.</h2>
        <div className="outcome-grid">
          {outcomes.map((outcome) => (
            <div
              className="outcome-card motion-card tilt-card"
              key={outcome.label}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
            >
              <strong className="counter-value" data-target={outcome.value} data-suffix={outcome.suffix}>
                0{outcome.suffix}
              </strong>
              <span>{outcome.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ VIDEO TESTIMONIALS ═════════════════════ */}
      <section className="video-testimonials-section" id="stories">
        <div className="vt-inner">
          <div className="vt-header">
            <span className="section-kicker">Video stories</span>
            <h2>Hear it from the women themselves.</h2>
            <p>Real results, shared in their own words. Videos play muted — captions are on.</p>
          </div>
          <p className="scroll-hint" aria-hidden="true">Swipe to watch →</p>
          <div className="video-grid">
            {videoTestimonials.map((vt) => (
              <div className="video-card motion-card" key={vt.name}>
                <div className="video-wrap">
                  <video
                    autoPlay
                    muted
                    playsInline
                    loop
                    aria-label={`Video testimonial from ${vt.name}`}
                  >
                    <source src={vt.src} type="video/mp4" />
                    {/* Replace src with real video files in /public/videos/ */}
                  </video>
                  <div className="video-placeholder-label">Video testimonial coming soon</div>
                </div>
                <div className="video-caption">
                  <strong>{vt.name}</strong>
                  <span>{vt.program}</span>
                  <p>{vt.highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WRITTEN TESTIMONIALS ═══════════════════ */}
      <section className="testimonials-section" id="testimonials">
        <div className="section-kicker">Written stories</div>
        <h2 className="testimonials-heading">Women who chose themselves, and transformed.</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div
              className="testimonial-card tilt-card"
              key={t.name}
              onPointerMove={handleTilt}
              onPointerLeave={resetTilt}
            >
              <div className="testimonial-stars" aria-label={`${t.stars} stars`}>
                {'★'.repeat(t.stars)}
              </div>
              <blockquote>
                <span className="quote-mark">&ldquo;</span>
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

      {/* ═══ ABOUT DR. RAGA ═════════════════════════ */}
      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-image motion-card">
            <img src="/images/dr-raga.jpg" alt="Dr. Raga Deepthi, PhD" />
          </div>
          <div className="about-content">
            <span className="section-kicker">About Dr. Raga</span>
            <h2>Science shaped by personal struggle.</h2>
            <p>
              Dr. Raga Deepthi spent eleven years in Germany completing her PhD in Pediatric Metabolism
              at Heidelberg University — all while navigating her own autoimmune challenges far from home.
              That experience of fighting a foreign healthcare system, managing hormonal disruption without
              familiar food or family, shaped the philosophy behind ForHerWellbeing: that women deserve
              root-cause care, not symptom management.
            </p>
            <p>
              Returning to India, Dr. Raga built a practice that bridges rigorous clinical science with
              deeply personal care. Her protocols draw from metabolic research, therapeutic yoga, and the
              lived experience of an Indian woman who has been exactly where her clients are. With over a
              decade of research training and yoga certifications from Rishikesh and Svyasa University,
              she brings a rare combination of academic depth and holistic intuition to every consultation.
            </p>
            <div className="credentials-list">
              {credentials.map((c) => (
                <div className="credential-item" key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.school}</span>
                </div>
              ))}
            </div>
            <a
              href="/about"
              className="secondary-action magnetic-btn about-link"
              onPointerMove={handleMagnetic}
              onPointerLeave={resetMagnetic}
            >
              Read her full story
            </a>
          </div>
        </div>
      </section>

      {/* ═══ LEAD MAGNET ════════════════════════════ */}
      <section className="lead-magnet-section" id="free-guide">
        <div className="lead-inner">
          <div className="lead-copy">
            <span className="section-kicker section-kicker-light">Free resource</span>
            <h2>Your Free PCOS Starter Guide</h2>
            <p>
              A 12-page science-backed guide covering root causes, lab tests to ask for,
              anti-inflammatory nutrition basics, and a 7-day gentle eating framework.
              Delivered to your inbox instantly.
            </p>
            <ul className="guide-features">
              <li>Root causes of PCOS explained simply</li>
              <li>Which lab tests to ask your doctor for</li>
              <li>Anti-inflammatory food principles</li>
              <li>7-day gentle meal framework</li>
            </ul>
          </div>

          <div className="lead-form-wrap">
            {leadSubmitted ? (
              <div className="lead-success">
                <div className="lead-success-icon">✓</div>
                <h3>Check your inbox!</h3>
                <p>Your guide is on its way. Check your spam folder if you do not see it in 5 minutes.</p>
              </div>
            ) : (
              <form className="lead-form" onSubmit={handleLeadSubmit}>
                <h3>Get the free guide</h3>
                <div className="form-field">
                  <label htmlFor="lm-name">Your name</label>
                  <input
                    id="lm-name"
                    type="text"
                    name="name"
                    value={leadForm.name}
                    onChange={handleLeadChange}
                    placeholder="e.g. Priya"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="lm-email">Email address</label>
                  <input
                    id="lm-email"
                    type="email"
                    name="email"
                    value={leadForm.email}
                    onChange={handleLeadChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="lm-concern">Main concern</label>
                  <select
                    id="lm-concern"
                    name="concern"
                    value={leadForm.concern}
                    onChange={handleLeadChange}
                    required
                  >
                    <option value="">Select your main concern</option>
                    <option value="pcos">PCOS / Irregular periods</option>
                    <option value="weight">Weight / Metabolism</option>
                    <option value="fatigue">Fatigue / Brain fog</option>
                    <option value="fertility">Fertility support</option>
                    <option value="abroad">Living abroad / Vitamin D</option>
                    <option value="hormonal">Hormonal balance</option>
                  </select>
                </div>
                <button type="submit" className="primary-action lm-submit" disabled={leadLoading}>
                  {leadLoading ? 'Sending…' : 'Send me the guide'}
                </button>
                <p className="form-disclaimer">No spam. Unsubscribe at any time.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ═══ PRICING SNAPSHOT ═══════════════════════ */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-inner">
          <div className="pricing-header">
            <span className="section-kicker">Pricing</span>
            <h2>Transparent pricing. No surprises.</h2>
            <p>The ₹1,000 consultation fee is credited toward any program you join within 30 days.</p>
          </div>
          <p className="scroll-hint" aria-hidden="true">Swipe to compare plans →</p>
          <div className="pricing-grid">
            {pricingTiers.map((tier) => (
              <div
                className={`pricing-card motion-card tilt-card${tier.highlighted ? ' pricing-featured' : ''}`}
                key={tier.name}
                onPointerMove={handleTilt}
                onPointerLeave={resetTilt}
              >
                {tier.highlighted && <div className="pricing-badge">Most popular</div>}
                <div className="pricing-top">
                  <span className="pricing-tier-name">{tier.name}</span>
                  <strong className="pricing-price">{tier.price}</strong>
                  <span className="pricing-duration">{tier.duration}</span>
                </div>
                <ul className="pricing-features">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a
                  href="#consultation"
                  className={`${tier.highlighted ? 'primary-action' : 'secondary-action'} magnetic-btn pricing-cta`}
                  onPointerMove={handleMagnetic}
                  onPointerLeave={resetMagnetic}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUIZ ════════════════════════════════════ */}
      <section className="quiz-section" id="quiz">
        <div className="quiz-panel motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
          <div className="quiz-left">
            <span className="section-kicker">Quick quiz</span>
            <h2>Which program is right for you?</h2>
            <div className="quiz-progress">
              {quizQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`quiz-dot${i < quizAnswers.length ? ' done' : ''}${i === quizStep && !showResult ? ' active' : ''}`}
                />
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
                    <a
                      href="#consultation"
                      className="primary-action magnetic-btn"
                      onPointerMove={handleMagnetic}
                      onPointerLeave={resetMagnetic}
                    >
                      Book consultation — ₹1,000
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

      {/* ═══ FAQ ═════════════════════════════════════ */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div className="faq-header">
            <span className="section-kicker">FAQ</span>
            <h2>Questions you are probably thinking.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <span className="faq-icon" aria-hidden="true">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div
                  className="faq-answer"
                  style={{ maxHeight: openFaq === i ? '300px' : '0' }}
                  aria-hidden={openFaq !== i}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONSULT CTA ════════════════════════════ */}
      <section className="consult-section" id="consultation">
        <div>
          <span className="section-kicker">Free. Personal. Confidential.</span>
          <h2>Ask Dr. Raga directly, or begin with a consultation.</h2>
        </div>
        <a
          className="primary-action magnetic-btn"
          href="mailto:forherwellbeing.official@gmail.com"
          onPointerMove={handleMagnetic}
          onPointerLeave={resetMagnetic}
        >
          Book consultation — ₹1,000
        </a>
      </section>

      {/* ═══ FOOTER ══════════════════════════════════ */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/images/logo-main.jpg" alt="ForHerWellbeing" className="footer-logo" />
            <span className="footer-brand-name">ForHerWellbeing</span>
            <p>Science-backed holistic wellness for women across India and abroad.</p>
            <div className="footer-social">
              <a href="https://www.instagram.com/forherwellbeing" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4.5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@forherwellbeing" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.5 5 12 5 12 5s-4.5 0-7 .1c-.4 0-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.5 2 11v1.9c0 1.5.2 3 .2 3s.2 1.4.8 2c.8.8 1.8.8 2.3.8C6.8 19 12 19 12 19s4.5 0 7-.2c.4 0 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.5.2-3V11c0-1.5-.2-3-.2-3zM10 14.5v-5l5.5 2.5L10 14.5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <strong>Programs</strong>
              <a href="#products">PCOS Healing</a>
              <a href="#products">Metabolic Reset</a>
              <a href="#products">Prenatal Care</a>
              <a href="#products">Thyroid Balance</a>
              <a href="#products">Fertility Nutrition</a>
            </div>
            <div className="footer-col">
              <strong>Resources</strong>
              <a href="#about">About Dr. Raga</a>
              <a href="#testimonials">Client Stories</a>
              <a href="#free-guide">Free PCOS Guide</a>
              <a href="#faq">FAQ</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-col">
              <strong>Contact</strong>
              <a href="mailto:forherwellbeing.official@gmail.com">forherwellbeing.official@gmail.com</a>
              <a href="#consultation">Book ₹1,000 Consultation</a>
              <div className="language-toggle">
                <span>Language:</span>
                <button className="lang-btn lang-active">English</button>
                <button className="lang-btn">తెలుగు</button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ForHerWellbeing. All rights reserved.</span>
          <div className="footer-legal">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </footer>

    </main>
  )
}

export default LandingPage
