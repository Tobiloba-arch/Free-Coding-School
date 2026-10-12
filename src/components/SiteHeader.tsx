import { useState } from 'react'
import { ArrowUpRight, Code2, Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="academy-brand" to="/" onClick={closeMenu} aria-label="FreeCode Academy home">
          <span className="brand-symbol"><Code2 size={20} strokeWidth={2.4} /></span>
          <span>freecode<span>academy</span></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/courses" onClick={closeMenu}>Courses</NavLink>
          <a href="/#roadmap" onClick={closeMenu}>Roadmap</a>
          <a href="/#projects" onClick={closeMenu}>Projects</a>
          <NavLink to="/projects" onClick={closeMenu}>Guided builds</NavLink>
          <NavLink to="/playground" onClick={closeMenu}>Playground</NavLink>
          <NavLink to="/quiz" onClick={closeMenu}>Quizzes</NavLink>
          <NavLink to="/progress" onClick={closeMenu}>My progress</NavLink>
          <Link className="nav-cta" to="/courses" onClick={closeMenu}>Start learning <ArrowUpRight size={15} /></Link>
        </nav>
      </div>
    </header>
  )
}