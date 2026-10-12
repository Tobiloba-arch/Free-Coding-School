import { ArrowUpRight, Clock3, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Course } from '../data/courses'

type CourseCardProps = { course: Course; compact?: boolean }

export function CourseCard({ course, compact = false }: CourseCardProps) {
  return (
    <article className={`course-card ${compact ? 'course-card-compact' : ''}`}>
      <div className={`course-art accent-${course.accent}`} aria-hidden="true">
        <span className="course-art-index">{course.number} / PATH</span>
        <span className="course-code">{course.icon}</span>
        <span className="art-line art-line-one" />
        <span className="art-line art-line-two" />
      </div>
      <div className="course-card-body">
        <div className="course-card-meta"><span className={`level-tag level-${course.level.toLowerCase()}`}>{course.level}</span><span>{course.number} learning path</span></div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
        <div className="course-card-bottom"><span><Layers3 size={14} /> {course.modules} modules</span><span><Clock3 size={14} /> {course.duration}</span></div>
        {!compact && <Link className="course-card-link" to={`/courses/${course.slug}`}>Explore path <ArrowUpRight size={15} /></Link>}
        {compact && <Link className="course-card-stretched-link" to={`/courses/${course.slug}`} aria-label={`Open ${course.title}`} />}
      </div>
    </article>
  )
}