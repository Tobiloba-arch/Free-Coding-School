import { useMemo, useState } from 'react'
import { Play, RotateCcw, Code2 } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { guidedProjects, type ProjectCode } from '../data/projects'
import { createSandboxDocument } from '../utils/createSandboxDocument'

const starter = {
  html: '<main class="card">\n  <p class="eyebrow">A SMALL START</p>\n  <h1>Make something real.</h1>\n  <p>Change the code and see what happens.</p>\n  <button id="hello">Say hello</button>\n  <p id="message" aria-live="polite"></p>\n</main>',
  css: 'body {\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  margin: 0;\n  background: #10121c;\n  color: #f6f4ff;\n  font: 16px system-ui;\n}\n.card {\n  max-width: 28rem;\n  padding: 2rem;\n  border: 1px solid #34374c;\n  border-radius: 1rem;\n  background: #191c29;\n}\n.eyebrow { color: #b3a3ff; font-size: .7rem; letter-spacing: .12em; }\nbutton { padding: .7rem 1rem; border: 0; border-radius: .4rem; background: #b3a3ff; cursor: pointer; }',
  javascript: 'document.querySelector("#hello").addEventListener("click", () => {\n  document.querySelector("#message").textContent = "Hello, web builder!";\n});',
}

type CodeTabs = keyof ProjectCode

export function PlaygroundPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selectedProject = guidedProjects.find((project) => project.id === searchParams.get('project'))
  const initialCode = selectedProject?.starter ?? starter
  const [code, setCode] = useState<ProjectCode>(initialCode)
  const [activeTab, setActiveTab] = useState<CodeTabs>('html')
  const [runCode, setRunCode] = useState<ProjectCode>(initialCode)
  const [hasRun, setHasRun] = useState(false)
  const [error, setError] = useState('')
  const documentContent = useMemo(() => createSandboxDocument(runCode), [runCode])

  const selectProject = (projectId: string) => {
    const project = guidedProjects.find((item) => item.id === projectId)
    const nextCode = project?.starter ?? starter
    setSearchParams(project ? { project: project.id } : {})
    setCode(nextCode)
    setRunCode(nextCode)
    setHasRun(false)
    setError('')
  }

  return (
    <div className="playground-page section-wrap">
      <div className="tool-page-intro"><div className="section-label">A SAFE PLACE TO EXPERIMENT</div><h1>Code, run, <span>learn.</span></h1><p>Choose a guided project or start from scratch. Your changes run in an isolated preview on this page.</p></div>
      <div className="playground-toolbar"><div className="playground-title"><span><Code2 size={16} /></span><div><strong>{selectedProject?.title ?? 'Untitled experiment'}</strong><small>{hasRun ? 'Preview updated' : selectedProject ? 'Project starter loaded' : 'Starter project'}</small></div></div><div className="playground-actions"><label className="playground-select-label" htmlFor="project-starter">Starter</label><select id="project-starter" className="playground-select" value={selectedProject?.id ?? ''} onChange={(event) => selectProject(event.target.value)}><option value="">Blank experiment</option>{guidedProjects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select><button type="button" className="tool-button" onClick={() => { const resetCode = selectedProject?.starter ?? starter; setCode(resetCode); setRunCode(resetCode); setHasRun(false); setError('') }}><RotateCcw size={15} /> Reset</button><button type="button" className="button button-primary" onClick={() => { setRunCode(code); setHasRun(true); setError('') }}><Play size={14} fill="currentColor" /> Run code</button></div></div>
      <div className="playground-workspace">
        <section className="editor-panel" aria-label="Code editors"><div className="editor-tabs" role="tablist" aria-label="Code language">{(['html', 'css', 'javascript'] as CodeTabs[]).map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => { setActiveTab(tab); setError('') }}>{tab === 'javascript' ? 'JavaScript' : tab.toUpperCase()}</button>)}</div><label className="editor-label" htmlFor="code-editor">{activeTab === 'javascript' ? 'JavaScript' : activeTab.toUpperCase()} editor</label><textarea id="code-editor" className="code-editor" spellCheck={false} value={code[activeTab]} onChange={(event) => setCode((current) => ({ ...current, [activeTab]: event.target.value }))} aria-label={`${activeTab} code editor`} /><div className="editor-help">Preview code runs in a separate sandbox with network requests blocked.</div></section>
        <section className="preview-panel" aria-label="Live code preview"><div className="preview-header"><span><i /> PREVIEW</span><span>{hasRun ? 'Latest run' : 'Starter preview'}</span></div>{error && <p role="alert">{error}</p>}<iframe title="Sandboxed code output" sandbox="allow-scripts" srcDoc={documentContent} referrerPolicy="no-referrer" /></section>
      </div>
      <div className="playground-footnote"><span /> Preview is isolated from the academy. Avoid pasting private credentials into browser code.</div>
    </div>
  )
}
