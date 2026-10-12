import type { ProjectCode } from '../data/projects'

export function createSandboxDocument(code: ProjectCode) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>${code.css}</style></head><body>${code.html}<script>try { ${code.javascript} } catch (error) { const message = document.createElement('pre'); message.style.cssText = 'color:#9a352a;padding:1rem;font:12px monospace'; message.textContent = String(error); document.body.append(message); }</script></body></html>`
}
