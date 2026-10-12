import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { CourseCard } from '../components/CourseCard'
import { courses } from '../data/courses'

const levels = ['All levels', 'Beginner', 'Intermediate']

export function CoursesPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('All levels')
  const filteredCourses = useMemo(() => courses.filter((course) => {
    const matchesQuery = `${course.title} ${course.description}`.toLowerCase().includes(query.toLowerCase())
    const matchesLevel = level === 'All levels' || course.level === level
    return matchesQuery && matchesLevel
  }), [level, query])

  return (
    <div className="courses-page section-wrap">
      <div className="courses-intro"><div className="section-label">THE FREECODE CURRICULUM</div><h1>Learn the skills.<br /><span>Build the thing.</span></h1><p>Seven practical paths take you from your first web page to deploying complete applications.</p><div className="curriculum-summary"><span>07 learning paths</span><i /> <span>Free, forever</span><i /> <span>Learn at your pace</span></div></div>
      <div className="course-catalog-tools"><label className="course-search"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search paths and topics" aria-label="Search courses" /></label><div className="level-filters" aria-label="Filter courses by difficulty"><SlidersHorizontal size={16} />{levels.map((item) => <button key={item} type="button" className={level === item ? 'is-selected' : ''} aria-pressed={level === item} onClick={() => setLevel(item)}>{item}</button>)}</div></div>
      {filteredCourses.length ? <div className="catalog-grid">{filteredCourses.map((course) => <CourseCard key={course.slug} course={course} compact />)}</div> : <div className="catalog-empty"><Search size={22} /><strong>No paths match that search.</strong><span>Try another topic or clear the filters.</span><button type="button" onClick={() => { setQuery(''); setLevel('All levels') }}>Clear filters</button></div>}
    </div>
  )
}