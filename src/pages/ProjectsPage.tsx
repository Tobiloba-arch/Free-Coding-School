import { useState } from 'react'
import { ArrowRight, Check, Code2, ExternalLink, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { guidedProjects } from '../data/projects'
import { createSandboxDocument } from '../utils/createSandboxDocument'

export function ProjectsPage() {
  const [openProject, setOpenProject] = useState<string | null>(guidedProjects[0]?.id ?? null)

  return (
    <div className="projects-page section-wrap">
      <div className="tool-page-intro">
        <div className="section-label">GUIDED BUILDS</div>
        <h1>Learn by <span>making.</span></h1>
        <p>Explore a working build, follow the steps, then open its code to change the design and behavior yourself.</p>
      </div>
      <div className="projects-catalog">
        {guidedProjects.map((project, index) => {
          const isOpen = openProject === project.id
          return (
            <article className={`guided-project ${isOpen ? 'is-open' : ''}`} key={project.id}>
              <button className="guided-project-toggle" type="button" aria-expanded={isOpen} aria-controls={`project-${project.id}`} onClick={() => setOpenProject(isOpen ? null : project.id)}>
                <span className="project-index">0{index + 1}</span>
                <span className="guided-project-title">
                  <small>{project.category} · {project.level} · {project.time}</small>
                  <strong>{project.title}</strong>
                  <span>{project.brief}</span>
                </span>
                <span className="project-expand" aria-hidden="true">+</span>
              </button>
              {isOpen && (
                <div className="project-detail" id={`project-${project.id}`}>
                  <section className="project-instructions">
                    <div>
                      <h2>Build steps</h2>
                      <ol>{project.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                    </div>
                    <div>
                      <h2>What you will practice</h2>
                      <ul>{project.outcomes.map((outcome) => <li key={outcome}><Check size={14} /> {outcome}</li>)}</ul>
                      <Link className="button button-primary" to={`/playground?project=${project.id}`}><Code2 size={15} /> Open editable build <ArrowRight size={15} /></Link>
                    </div>
                  </section>
                  <section className="project-demo" aria-label={`${project.title} working example`}>
                    <div className="project-demo-heading"><span><Eye size={15} /> WORKING EXAMPLE</span><small>Interactive preview · isolated sandbox</small></div>
                    <iframe title={`${project.title} working project preview`} sandbox="allow-scripts" srcDoc={createSandboxDocument(project.starter)} referrerPolicy="no-referrer" />
                  </section>
                </div>
              )}
            </article>
          )
        })}
      </div>
      <div className="project-publish-note"><ExternalLink size={16} /><span><strong>Make it yours.</strong> Add your own content, test with people, and publish when you are ready.</span></div>
    </div>
  )
}
