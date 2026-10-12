import { ArrowUpRight, Code2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block"><Link className="academy-brand" to="/"><span className="brand-symbol"><Code2 size={19} strokeWidth={2.4} /></span><span>freecode<span>academy</span></span></Link><p>Good things happen when knowledge is open.</p></div>
        <div className="footer-links"><Link to="/courses">Explore courses <ArrowUpRight size={14} /></Link><Link to="/projects">Student projects <ArrowUpRight size={14} /></Link><Link to="/playground">Code playground <ArrowUpRight size={14} /></Link><a href="mailto:hello@freecode.academy">Get in touch <ArrowUpRight size={14} /></a></div>
        <div className="footer-note">Free to learn. Built for everyone.<br />© 2026 FreeCode Academy</div>
      </div>
    </footer>
  )
}