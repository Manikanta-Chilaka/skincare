import { useEffect, useRef, useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

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
          <li style={{ '--i': 0 }}><a href="#rituals" onClick={close}>Symptoms</a></li>
          <li style={{ '--i': 1 }}><a href="#products" onClick={close}>Programs</a></li>
          <li style={{ '--i': 2 }}><a href="#testimonials" onClick={close}>Stories</a></li>
          <li style={{ '--i': 3 }}><a href="#quiz" onClick={close}>Quiz</a></li>
          <li style={{ '--i': 4 }}><a href="#consultation" onClick={close} className="mobile-cta">Book Consultation</a></li>
        </ul>
      </nav>

      <ul className="nav-links">
        <li><a href="#rituals">Symptoms</a></li>
        <li><a href="#products">Programs</a></li>
        <li><a href="#testimonials">Stories</a></li>
        <li><a href="#quiz">Quiz</a></li>
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
