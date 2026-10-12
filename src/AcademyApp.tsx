import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { CoursesPage } from './pages/CoursesPage'
import { HomePage } from './pages/HomePage'
import { CoursePage } from './pages/CoursePage'
import { LessonPage } from './pages/LessonPage'
import { PlaygroundPage } from './pages/PlaygroundPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ProgressPage } from './pages/ProgressPage'
import { QuizPage } from './pages/QuizPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProgressProvider } from './hooks/useProgress'
import './site.css'

function AcademyApp() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <div className="academy-shell">
          <SiteHeader />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseSlug" element={<CoursePage />} />
              <Route path="/courses/:courseSlug/lessons/:lessonId" element={<LessonPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </ProgressProvider>
    </BrowserRouter>
  )
}

export default AcademyApp