import { ArrowRight, BookOpenCheck, CheckCircle2, Clock3, Play } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseLessons } from '../data/lessons'
import { useProgress } from '../hooks/useProgressState'

export function CoursePage() {
  const { courseSlug = '' } = useParams()
  const course = courses.find((item) => item.slug === courseSlug)
  const courseLessons = getCourseLessons(courseSlug)
  const { completed } = useProgress()

  if (!course) return <div className="section-wrap catalog-empty"><strong>Course not found</strong><Link to="/courses">Browse all courses</Link></div>

  const completeCount = courseLessons.filter((lesson) => completed.includes(lesson.id)).length
  const progressPercent = courseLessons.length ? Math.round((completeCount / courseLessons.length) * 100) : 0
  const nextLesson = courseLessons.find((lesson) => !completed.includes(lesson.id)) ?? courseLessons[0]

  return (
    <div className="course-detail-page section-wrap">
      <div className="course-detail-head">
        <div className="section-label">LEARNING PATH {course.number}</div>
        <div className="course-detail-title-row">
          <div><h1>{course.title}</h1><p>{course.description}</p></div>
          <span className={`level-tag level-${course.level.toLowerCase()}`}>{course.level}</span>
        </div>
        <div className="course-detail-facts"><span><BookOpenCheck size={15} /> {courseLessons.length} lessons</span><span><Clock3 size={15} /> {course.duration}</span><span>Free, always</span></div>
        <div className="course-progress-box"><div><strong>Your progress</strong><span>{completeCount} of {courseLessons.length} complete</span></div><div className="course-progress-track"><i style={{ width: `${progressPercent}%` }} /></div><strong>{progressPercent}%</strong></div>
      </div>
      <div className="course-detail-columns">
        <div className="course-syllabus"><div className="section-label">COURSE CONTENT</div>{courseLessons.map((lesson, index) => {
          const isComplete = completed.includes(lesson.id)
          return <Link className="syllabus-row" to={`/courses/${course.slug}/lessons/${lesson.id}`} key={lesson.id}><span className={`syllabus-status ${isComplete ? 'is-done' : ''}`}>{isComplete ? <CheckCircle2 size={17} /> : <Play size={14} />}</span><span className="syllabus-copy"><small>LESSON {String(index + 1).padStart(2, '0')}</small><strong>{lesson.title}</strong><span>{lesson.summary}</span></span><span className="syllabus-time">{lesson.duration}</span><ArrowRight className="syllabus-arrow" size={16} /></Link>
        })}</div>
        <aside className="course-aside"><span className={`course-aside-icon accent-${course.accent}`}>{course.icon}</span><h2>Build your skills, one useful idea at a time.</h2><p>Every lesson includes a clear explanation, a code example, and something to practice.</p><Link className="button button-primary" to={`/courses/${course.slug}/lessons/${nextLesson.id}`}>{completeCount ? 'Continue learning' : 'Start this path'} <ArrowRight size={16} /></Link><Link className="aside-quiz-link" to={`/quiz?course=${course.slug}`}>Take the course quiz</Link></aside>
      </div>
    </div>
  )
}
