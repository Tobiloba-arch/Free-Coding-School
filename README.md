# FreeCode Academy

A free web-development learning platform built with React, Vite, TypeScript, React Router, and Lucide icons. Learning paths, lessons, quizzes, guided projects, and the sandbox playground are available without an account. Lesson completion and best quiz scores are saved in the learner's browser.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```sh
npm install
npm run dev
```

Vite prints the local development URL when ready.

## Verify and preview a release

```sh
npm run build
npm run preview
```

Production files are generated in `dist/`. Run `npm run lint` for Oxlint checks.

## Deploy for free

The app is a static Vite site. Netlify settings are included in `netlify.toml`: Node 22.12, `npm run build`, and `dist`, with a fallback for React Router URLs.

To publish without connecting Git, run `npm run build`, then upload the generated `dist/` folder using Netlify's manual deploy flow. To enable automatic deploys, push this project to a Git provider and import the repository into Netlify; it will read `netlify.toml`. Cloudflare Pages can also host the build using `npm run build` and `dist`, with an equivalent SPA fallback configured in its dashboard.

Before launch, deploy a preview and test direct route loading, keyboard navigation, mobile layouts, and the sandbox. Progress is stored in the current browser and does not sync across devices.

## Project structure

- `src/components/` shared navigation, footer, and course cards
- `src/data/` course and lesson content
- `src/hooks/` browser-local progress state
- `src/pages/` home, courses, lessons, projects, quiz, progress, and playground routes
- `src/site.css` responsive site styling
