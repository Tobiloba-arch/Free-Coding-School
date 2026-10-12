import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return <section className="not-found-page section-wrap"><span className="section-label">404 · PAGE NOT FOUND</span><h1>This page took<br /><span>a wrong turn.</span></h1><p>The link may be outdated, or the page may have moved.</p><Link to="/courses" className="button button-primary"><ArrowLeft size={15} /> Browse courses</Link></section>
}
