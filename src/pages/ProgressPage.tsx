import { ArrowRight, BookOpenCheck, CheckCircle2, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseLessons } from '../data/lessons'
import { getCourseExamQuestions } from '../data/courseExam'
import { useProgress } from '../hooks/useProgressState'

export function ProgressPage() {
  const { completed, quizScores, clearProgress } = useProgress()
  const allLessonIds = courses.flatMap((course) => getCourseLessons(course.slug).map((lesson) => lesson.id))
  const percent = allLessonIds.length ? Math.round((completed.filter((id) => allLessonIds.includes(id)).length / allLessonIds.length) * 100) : 0

  return (
    <div className="progress-page section-wrap">
      <div className="tool-page-intro"><div className="section-label">YOUR LEARNING, YOUR PACE</div><h1>Progress you <span>can see.</span></h1><p>Your lesson completions and best quiz scores are saved in this browser. No account needed.</p></div>
      <section className="progress-summary" aria-label="Overall learning progress"><div className="progress-summary-icon"><Trophy size={22} /></div><div><span>OVERALL COMPLETION</span><strong>{percent}%</strong><small>{completed.filter((id) => allLessonIds.includes(id)).length} of {allLessonIds.length} lessons complete</small></div><div className="big-progress-track"><i style={{ width: `${percent}%` }} /></div></section>
      <div className="progress-course-list">{courses.map((course) => { const courseLessons = getCourseLessons(course.slug); const done = courseLessons.filter((lesson) => completed.includes(lesson.id)).length; const coursePercent = Math.round(done / courseLessons.length * 100); return <article className="progress-course-row" key={course.slug}><span className={`progress-course-icon accent-${course.accent}`}>{course.icon}</span><div className="progress-course-copy"><h2>{course.title}</h2><span>{done} / {courseLessons.length} lessons complete</span><div className="course-progress-track"><i style={{ width: `${coursePercent}%` }} /></div></div><span className="progress-course-percent">{coursePercent}%</span><Link to={`/courses/${course.slug}`} aria-label={`Continue ${course.title}`}><ArrowRight size={17} /></Link></article> })}</div>
      <section className="quiz-score-list"><h2><BookOpenCheck size={18} /> Best quiz scores</h2>{Object.keys(quizScores).length ? courses.filter((course) => quizScores[course.slug] !== undefined).map((course) => <div key={course.slug}><span>{course.title}</span><strong>{quizScores[course.slug]} / {getCourseLessons(course.slug).length + getCourseExamQuestions(course.slug).length}</strong><Link to={`/quiz?course=${course.slug}`}>Practice again</Link></div>) : <p>No quiz scores yet. Take a course quiz when you are ready.</p>}<Link className="text-link" to="/quiz">Browse quizzes <ArrowRight size={15} /></Link></section>
      <div className="progress-reset"><CheckCircle2 size={16} /><span>Progress is stored only in this browser.</span><button type="button" onClick={clearProgress} disabled={completed.length === 0 && Object.keys(quizScores).length === 0}>Reset all progress</button></div>
    </div>
  )
}
