import { ArrowLeft, ArrowRight, Check, CheckCircle2, CircleHelp, Code2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseLessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgressState'
import { useState } from 'react'

export function LessonPage() {
  const { courseSlug = '', lessonId = '' } = useParams()
  const { completed, toggleLesson } = useProgress()
  const course = courses.find((item) => item.slug === courseSlug)
  const courseLessons = getCourseLessons(courseSlug)
  const lessonIndex = courseLessons.findIndex((item) => item.id === lessonId)
  const current = courseLessons[lessonIndex]
  const [answer, setAnswer] = useState<number | null>(null)
  const isComplete = current ? completed.includes(current.id) : false

  if (!course || !current) return <div className="section-wrap catalog-empty"><strong>Lesson not found</strong><Link to="/courses">Browse courses</Link></div>

  const previous = courseLessons[lessonIndex - 1]
  const next = courseLessons[lessonIndex + 1]

  return (
    <div className="lesson-layout section-wrap">
      <aside className="lesson-sidebar"><Link className="back-link" to={`/courses/${course.slug}`}><ArrowLeft size={15} /> {course.title}</Link><div className="section-label">COURSE CONTENT</div>{courseLessons.map((item, index) => <Link key={item.id} className={`lesson-side-link ${item.id === current.id ? 'is-current' : ''}`} to={`/courses/${course.slug}/lessons/${item.id}`}><span>{completed.includes(item.id) ? <CheckCircle2 size={15} /> : String(index + 1).padStart(2, '0')}</span><span>{item.title}</span></Link>)}<div className="lesson-sidebar-progress"><span>{courseLessons.filter((item) => completed.includes(item.id)).length} / {courseLessons.length} completed</span><div className="course-progress-track"><i style={{ width: `${Math.round((courseLessons.filter((item) => completed.includes(item.id)).length / courseLessons.length) * 100)}%` }} /></div></div></aside>
      <article className="lesson-content">
        <div className="lesson-breadcrumb"><Link to="/courses">Courses</Link><span>/</span><Link to={`/courses/${course.slug}`}>{course.title}</Link><span>/</span><span>Lesson {lessonIndex + 1}</span></div>
        <div className="lesson-title-line"><div><div className="section-label">LESSON {String(lessonIndex + 1).padStart(2, '0')} · {current.duration.toUpperCase()}</div><h1>{current.title}</h1><p>{current.summary}</p></div>{isComplete && <span className="completed-label"><Check size={14} /> Completed</span>}</div>
        <div className="lesson-prose"><h2>The idea</h2>{current.explanation.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}<h2>See it in code</h2><div className="lesson-code"><div><span><Code2 size={14} /> {current.language}</span><button type="button" onClick={() => { void navigator.clipboard?.writeText(current.code) }}>Copy code</button></div><pre><code>{current.code}</code></pre></div><section className="exercise-block"><span className="exercise-kicker"><Code2 size={14} /> TRY IT YOURSELF</span><h2>Practice</h2><p>{current.exercise}</p><Link to="/playground" className="text-link">Open the code playground <ArrowRight size={15} /></Link></section><section className="lesson-check"><span className="exercise-kicker"><CircleHelp size={14} /> QUICK CHECK</span><h2>{current.question}</h2><div className="answer-options">{current.choices.map((choice, index) => <button key={choice} type="button" className={`${answer === index ? 'is-picked' : ''} ${answer !== null && index === current.answer ? 'is-correct' : ''}`} aria-pressed={answer === index} onClick={() => setAnswer(index)}>{String.fromCharCode(65 + index)}<span>{choice}</span></button>)}</div>{answer !== null && <p className={`answer-feedback ${answer === current.answer ? 'correct' : 'incorrect'}`} role="status">{answer === current.answer ? 'That is right. ' : 'Not quite. '}{current.answerNote}</p>}</section></div>
        <div className="lesson-navigation">
          {previous ? <Link className="button button-secondary" to={`/courses/${course.slug}/lessons/${previous.id}`}><ArrowLeft size={15} /> Previous</Link> : <Link className="button button-secondary" to={`/courses/${course.slug}`}><ArrowLeft size={15} /> Overview</Link>}
          <button className={`button ${isComplete ? 'button-secondary' : 'button-primary'}`} type="button" aria-pressed={isComplete} onClick={() => toggleLesson(current.id)}>{isComplete ? <><Check size={15} /> Completed</> : <>Mark complete <Check size={15} /></>}</button>
          {next ? <Link className="button button-secondary" to={`/courses/${course.slug}/lessons/${next.id}`}>Next <ArrowRight size={15} /></Link> : <Link className="button button-secondary" to={`/courses/${course.slug}`}>Finish path <ArrowRight size={15} /></Link>}
        </div>
      </article>
    </div>
  )
}
