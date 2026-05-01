import { useEffect, useRef } from 'react'
import './Navbar.css'

const Navbar = () => {
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle('scrolled', window.scrollY > 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="navbar" ref={navRef}>
      <div className="nav-left">
        <img src="/images/logo-main.jpg" alt="For Her Wellbeing" className="logo" />
        <span>ForHerWellbeing</span>
      </div>

      <ul className="nav-links">
        <li><a href="#rituals">Symptoms</a></li>
        <li><a href="#products">Programs</a></li>
        <li><a href="#quiz">Quiz</a></li>
      </ul>

      <div className="nav-right">
        <a className="btn btn-outline" href="#consultation">Consultation</a>
        <a className="btn btn-filled" href="#quiz">Start</a>
      </div>
    </header>
  )
}

export default Navbar
