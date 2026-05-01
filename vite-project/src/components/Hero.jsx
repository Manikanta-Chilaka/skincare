import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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
    meta: '3 months - 20 women',
  },
  {
    title: 'Metabolic Reset',
    text: 'For fatigue, bloating, brain fog, stubborn weight, and the body signals that never feel random.',
    meta: 'Online - guided weekly',
  },
  {
    title: 'Prenatal Care',
    text: 'Trimester-aware movement, food planning, and calm support for a stronger pregnancy journey.',
    meta: 'Yoga - nutrition - community',
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

const Hero = () => {
  const pageRef = useRef(null)
  const orbRef = useRef(null)
  const heroBottleRef = useRef(null)
  const marqueeRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  const handleTilt = (event) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rotateX = ((y / rect.height) - 0.5) * -10
    const rotateY = ((x / rect.width) - 0.5) * 10

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -8,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 900,
      transformOrigin: 'center',
    })
  }

  const resetTilt = (event) => {
    gsap.to(event.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    const moveCursor = (event) => {
      if (!cursorRef.current || !cursorDotRef.current) return
      gsap.to(cursorRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.45,
        ease: 'power3.out',
      })
      gsap.to(cursorDotRef.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.12,
        ease: 'power2.out',
      })
    }

    window.addEventListener('pointermove', moveCursor)

    const ctx = gsap.context(() => {
      gsap.set('.split-word', { yPercent: 112, rotate: 3 })
      gsap.to('.split-word', {
        yPercent: 0,
        rotate: 0,
        duration: 1.05,
        stagger: 0.035,
        ease: 'power4.out',
        delay: 0.15,
      })

      gsap.to(orbRef.current, {
        y: 28,
        x: -18,
        rotate: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      gsap.to(heroBottleRef.current, {
        scrollTrigger: {
          trigger: '.programs-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
        y: 260,
        rotate: -14,
        scale: 0.78,
        ease: 'none',
      })

      gsap.to('.reveal-line', {
        scrollTrigger: {
          trigger: '.signals-section',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true,
        },
        scaleX: 1,
        transformOrigin: 'left center',
        stagger: 0.08,
      })

      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 22,
        repeat: -1,
        ease: 'none',
      })

      gsap.utils.toArray('.motion-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
          },
          y: 42,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      })

      gsap.utils.toArray('.counter-value').forEach((counter) => {
        const target = Number(counter.dataset.target)
        const suffix = counter.dataset.suffix || ''
        const state = { value: 0 }

        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 86%',
            once: true,
          },
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}${suffix}`
          },
        })
      })
    }, pageRef)

    return () => {
      ctx.revert()
      window.removeEventListener('pointermove', moveCursor)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="fhw-page" ref={pageRef}>
      <div className="cursor-ring" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-dot" ref={cursorDotRef} aria-hidden="true" />

      <section className="hero-section">
        <Navbar />

        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          >
            <motion.p className="eyebrow" variants={fadeUp}>
              Dr. Raga Deepthi - science-backed holistic wellness
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
              <a href="#consultation" className="primary-action">Book consultation</a>
              <a href="#quiz" className="secondary-action">Find my program</a>
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

      <section className="programs-section" id="products">
        <div className="section-top">
          <div>
            <span className="section-kicker">Flagship programs</span>
            <h2>Three months of science, structure, and sisterhood.</h2>
          </div>
          <a href="#consultation">Explore all programs</a>
        </div>

        <div className="program-grid">
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
          <div className="motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>Vitamin D crash</div>
          <div className="motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>Gut disruption</div>
          <div className="motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>Cortisol surge</div>
          <div className="motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>Culturally aware care</div>
        </div>
      </section>

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

      <section className="quiz-section" id="quiz">
        <div className="quiz-panel motion-card tilt-card" onPointerMove={handleTilt} onPointerLeave={resetTilt}>
          <span className="section-kicker">Quick quiz</span>
          <h2>Which program is right for you?</h2>
          <div className="quiz-options">
            <button>PCOS or irregular periods</button>
            <button>Weight that will not shift</button>
            <button>Fatigue, bloating, brain fog</button>
            <button>I just have a health question</button>
          </div>
        </div>
      </section>

      <section className="consult-section" id="consultation">
        <div>
          <span className="section-kicker">Free. personal. confidential.</span>
          <h2>Ask Dr. Raga directly, or begin with a consultation.</h2>
        </div>
        <a className="primary-action" href="mailto:edigaragadeepthi@gmail.com">
          Start your journey
        </a>
      </section>
    </main>
  )
}

export default Hero
