import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Code2, Compass, GraduationCap, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CourseCard } from '../components/CourseCard'
import { courses } from '../data/courses'

const reasons = [
  { icon: GraduationCap, title: 'Made for real beginners', text: 'Start with the foundations, build confidence, and grow into more complex work at your own pace.' },
  { icon: Code2, title: 'Learn by building', text: 'Every path connects concepts to practical exercises and projects you can make your own.' },
  { icon: BadgeCheck, title: 'Open, always', text: 'Every lesson and learning path is free. No trials, paywalls, or account required.' },
]

const projects = [
  { title: 'A portfolio that feels like you', type: 'HTML + CSS', level: 'Beginner', image: 'photo-1467232004584-a241de8bcf5d' },
  { title: 'A tiny tool with big utility', type: 'JavaScript', level: 'Beginner', image: 'photo-1516321318423-f06f85e504b3' },
  { title: 'A live weather dashboard', type: 'APIs + React', level: 'Intermediate', image: 'photo-1504608524841-42fe6f032b4b' },
]

const faqs = [
  { question: 'Is FreeCode Academy really free?', answer: 'Yes. Every course, lesson, and project on the learning paths is free to access. You do not need to create an account to start.' },
  { question: 'Do I need experience to begin?', answer: 'No prior experience is required. The HTML Fundamentals path starts at the beginning and introduces concepts in a practical order.' },
  { question: 'How do I keep track of what I have learned?', answer: 'Your browser can save lesson progress locally as you work through the courses. Cloud accounts are not required.' },
]

export function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> YOUR OPEN WEB CLASSROOM</div>
          <h1>Learn to build<br />what <span>comes next.</span></h1>
          <p className="hero-description">A clear, hands-on path from your first line of HTML to full-stack confidence. Learn at your pace, make real things, and keep every lesson.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/courses">Start learning <ArrowRight size={17} /></Link><a className="button button-secondary" href="#featured">Explore courses <ArrowDown size={16} /></a></div>
          <div className="hero-proof"><span className="proof-avatars"><i>H</i><i>C</i><i>J</i></span><span>Free learning, open to everyone</span></div>
        </div>
        <div className="hero-art" role="img" aria-label="Illustrated code editor showing a learner's first web page">
          <div className="hero-art-top"><span><i /> LIVE LEARNING PATH</span><span>01 — 07</span></div>
          <div className="code-window"><div className="code-window-bar"><span /><span /><span /><small>your-first-page.html</small></div><pre aria-label="HTML code example"><code><span className="code-muted">01</span> <b>&lt;main</b> <em>class</em>=<strong>"your-next-idea"</strong><b>&gt;</b>{'\n'}<span className="code-muted">02</span>   <b>&lt;h1&gt;</b>Build something real<b>&lt;/h1&gt;</b>{'\n'}<span className="code-muted">03</span>   <b>&lt;p&gt;</b>One lesson at a time.<b>&lt;/p&gt;</b>{'\n'}<span className="code-muted">04</span>   <b>&lt;button&gt;</b>Keep going<b>&lt;/button&gt;</b>{'\n'}<span className="code-muted">05</span> <b>&lt;/main&gt;</b></code></pre></div>
          <div className="hero-note"><span className="note-icon"><Sparkles size={16} /></span><span><strong>Start anywhere.</strong><small>Every path is yours to explore.</small></span><ArrowUpRight size={16} /></div>
          <div className="hero-art-footer"><span>01 / 07</span><span className="art-progress"><i /></span><span>HTML fundamentals</span></div>
        </div>
        <a className="hero-scroll" href="#featured"><span /> Scroll to explore</a>
      </section>

      <section className="stats-band" aria-label="Academy principles"><div><strong>07</strong><span>Free learning paths</span></div><div><strong>100%</strong><span>Open access</span></div><div><strong>Build</strong><span>Real projects as you learn</span></div><div className="stats-statement">A better web starts<br /><em>with more people.</em></div></section>

      <section className="section-wrap featured-section" id="featured">
        <div className="section-heading-row"><div><div className="section-label">START WITH THE FOUNDATIONS</div><h2>Choose a path.<br /><span>Make it yours.</span></h2></div><div className="section-heading-aside"><p>Structured learning paths, built to take you from curious to capable.</p><Link to="/courses" className="text-link">See all courses <ArrowRight size={15} /></Link></div></div>
        <div className="featured-grid">{courses.slice(0, 3).map((course) => <CourseCard key={course.slug} course={course} />)}</div>
        <div className="featured-footnote"><span /> Every course is free. Start, pause, and pick up whenever you like.</div>
      </section>

      <section className="roadmap-section" id="roadmap"><div className="section-wrap"><div className="roadmap-heading"><div><div className="section-label">A PRACTICAL ROADMAP</div><h2>From first tag<br />to <span>first launch.</span></h2></div><p>Follow the order or jump to what you need. Each step adds a useful skill to your toolkit.</p></div><div className="roadmap-track">{courses.map((course, index) => <div className="roadmap-step" key={course.slug}><div className={`roadmap-node accent-${course.accent}`}><span>{course.number}</span></div>{index < courses.length - 1 && <span className="roadmap-connector" />}<span className="roadmap-index">STEP {course.number}</span><h3>{course.title}</h3><span className="roadmap-level">{course.level} <i /> {course.duration}</span></div>)}</div><Link className="roadmap-link" to="/courses">View the complete roadmap <ArrowRight size={16} /></Link></div></section>

      <section className="section-wrap why-section"><div className="why-intro"><div className="section-label">WHY FREECODE ACADEMY</div><h2>The web belongs<br />to <span>all of us.</span></h2><p>Good learning should be clear, practical, and open. That is the standard we build for.</p><Link to="/courses" className="text-link">Find your starting point <ArrowRight size={15} /></Link></div><div className="reason-list">{reasons.map(({ icon: Icon, title, text }, index) => <article className="reason-row" key={title}><span className="reason-number">0{index + 1}</span><span className="reason-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="reason-arrow" size={17} /></article>)}</div></section>

      <section className="projects-section" id="projects"><div className="section-wrap"><div className="section-heading-row project-heading"><div><div className="section-label">LEARN THROUGH MAKING</div><h2>Small steps.<br /><span>Real projects.</span></h2></div><div className="section-heading-aside"><p>Put new skills to work in guided builds that grow with you.</p><Link to="/projects" className="text-link">Explore guided projects <ArrowRight size={15} /></Link></div></div><div className="project-grid">{projects.map((project, index) => <article className="project-card" key={project.title}><div className={`project-image project-image-${index + 1}`} style={{ backgroundImage: `url(https://images.unsplash.com/${project.image}?auto=format&fit=crop&w=1000&q=85)` }} role="img" aria-label={`${project.title} project preview`}><span className="project-image-label">PROJECT 0{index + 1}</span><ArrowUpRight size={18} /></div><div className="project-card-info"><div><span>{project.type}</span><span>{project.level}</span></div><h3>{project.title}</h3><Link to="/projects" aria-label={`View guided projects for ${project.title}`}><ArrowRight size={16} /></Link></div></article>)}</div></div></section>

      <section className="section-wrap faq-section" id="faq"><div className="faq-title"><div className="section-label">GOOD QUESTIONS</div><h2>Before you<br /><span>get started.</span></h2><p>A few useful details about learning here.</p></div><div className="faq-list">{faqs.map(({ question, answer }) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>

      <section className="closing-cta"><div className="cta-mark"><Compass size={22} /></div><div><div className="section-label">YOUR NEXT CHAPTER STARTS HERE</div><h2>Curiosity is a good<br /><span>place to begin.</span></h2></div><Link className="button button-primary" to="/courses">Find your first lesson <ArrowRight size={17} /></Link></section>
    </>
  )
}