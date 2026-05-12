'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import './Navbar.css'

const Navbar = () => {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const a = (hash) => pathname === '/' ? hash : `/${hash}`

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={`navbar${menuOpen ? ' menu-open' : ''}`} ref={navRef}>
      <div className="nav-left">
        <img src="/images/logo-main.jpg" alt="For Her Wellbeing" className="logo" />
        <span>ForHerWellbeing</span>
      </div>

      <nav className={`nav-overlay${menuOpen ? ' active' : ''}`}>
        <ul className="nav-links-mobile">
          <li style={{ '--i': 0 }}><a href={a('#rituals')} onClick={close}>Symptoms</a></li>
          <li style={{ '--i': 1 }}><a href={a('#products')} onClick={close}>Programs</a></li>
          <li style={{ '--i': 2 }}><a href="/stories" onClick={close}>Stories</a></li>
          <li style={{ '--i': 3 }}><a href="/about" onClick={close}>About</a></li>
          <li style={{ '--i': 4 }}><a href={a('#quiz')} onClick={close}>Quiz</a></li>
          <li style={{ '--i': 5 }}><a href="mailto:forherwellbeing.official@gmail.com" onClick={close} className="mobile-cta">Book Consultation</a></li>
        </ul>
      </nav>

      <ul className="nav-links">
        <li><a href={a('#rituals')}>Symptoms</a></li>
        <li><a href={a('#products')}>Programs</a></li>
        <li><a href="/stories">Stories</a></li>
        <li><a href="/about">About</a></li>
        <li><a href={a('#quiz')}>Quiz</a></li>
      </ul>

      <div className="nav-right">
        <a className="btn btn-outline" href="#consultation">Consultation</a>
        <a className="btn btn-filled" href="#quiz">Start</a>
      </div>

      <button
        className={`hamburger${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>
    </header>
  )
}

export default Navbar
