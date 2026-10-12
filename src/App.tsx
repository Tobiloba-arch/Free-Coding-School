import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Compass,
  Layers3,
  Menu,
  Play,
  Search,
  Sparkles,
  X,
} from 'lucide-react'
import './App.css'

type Lesson = {
  id: number
  title: string
  type: string
  duration: string
  level: string
  description: string
  topics: string[]
}

type Course = {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  color: string
  lessons: Lesson[]
}

const courses: Course[] = [
  {
    id: 'foundations',
    number: '01',
    title: 'Web foundations',
    subtitle: 'Understand the web before you build on it.',
    category: 'HTML',
    color: 'lime',
    lessons: [
      {
        id: 1,
        title: 'How the web works',
        type: 'READING',
        duration: '8 min',
        level: 'Beginner',
        description: 'Learn how browsers, servers, URLs, and HTTP work together so every web page has a clear purpose.',
        topics: ['Browser', 'HTTP', 'Internet'],
      },
      {
        id: 2,
        title: 'Your first HTML document',
        type: 'GUIDED PROJECT',
        duration: '18 min',
        level: 'Beginner',
        description: 'Write a semantic document structure and use real-world tags to create a useful page skeleton.',
        topics: ['HTML', 'Semantics'],
      },
      {
        id: 3,
        title: 'Semantic HTML, made practical',
        type: 'READING',
        duration: '12 min',
        level: 'Beginner',
        description: 'Use meaning-first markup so your content is accessible, maintainable, and easier for tools to understand.',
        topics: ['HTML', 'Accessibility'],
      },
      {
        id: 4,
        title: 'Links, images & paths',
        type: 'EXERCISE',
        duration: '14 min',
        level: 'Beginner',
        description: 'Add navigation, media, and path logic that make your pages feel complete and connected.',
        topics: ['HTML', 'Assets'],
      },
    ],
  },
  {
    id: 'css',
    number: '02',
    title: 'CSS & visual design',
    subtitle: 'Make your layout readable, elegant, and responsive.',
    category: 'CSS',
    color: 'coral',
    lessons: [
      {
        id: 5,
        title: 'The cascade & selectors',
        type: 'READING',
        duration: '11 min',
        level: 'Beginner',
        description: 'Understand specificity, inheritance, and the cascade without guessing which rule will win.',
        topics: ['CSS', 'Selectors'],
      },
      {
        id: 6,
        title: 'Layouts with Flexbox',
        type: 'GUIDED PROJECT',
        duration: '22 min',
        level: 'Beginner',
        description: 'Build flexible layouts for navigation, cards, and content blocks that adapt across screens.',
        topics: ['CSS', 'Layout'],
      },
      {
        id: 7,
        title: 'Responsive design patterns',
        type: 'EXERCISE',
        duration: '16 min',
        level: 'Intermediate',
        description: 'Use fluid layouts and breakpoint thinking to make interfaces work across phones, tablets, and desktops.',
        topics: ['CSS', 'Responsive'],
      },
    ],
  },
  {
    id: 'javascript',
    number: '03',
    title: 'JavaScript essentials',
    subtitle: 'Add logic and interaction to your web pages.',
    category: 'JavaScript',
    color: 'blue',
    lessons: [
      {
        id: 8,
        title: 'Values, variables & types',
        type: 'READING',
        duration: '13 min',
        level: 'Beginner',
        description: 'Learn how JavaScript stores values and how to work confidently with different data types.',
        topics: ['JavaScript', 'Fundamentals'],
      },
      {
        id: 9,
        title: 'Functions that do useful work',
        type: 'EXERCISE',
        duration: '19 min',
        level: 'Beginner',
        description: 'Break problems into reusable functions and write code that scales beyond a quick script.',
        topics: ['JavaScript', 'Functions'],
      },
      {
        id: 10,
        title: 'Make a page interactive',
        type: 'GUIDED PROJECT',
        duration: '25 min',
        level: 'Intermediate',
        description: 'Handle click events and update the DOM so your interface responds to real user action.',
        topics: ['JavaScript', 'DOM'],
      },
    ],
  },
  {
    id: 'react',
    number: '04',
    title: 'Modern React',
    subtitle: 'Create components that scale with your ideas.',
    category: 'React',
    color: 'purple',
    lessons: [
      {
        id: 11,
        title: 'Thinking in components',
        type: 'READING',
        duration: '10 min',
        level: 'Intermediate',
        description: 'Break interfaces into reusable pieces that are easier to reason about and maintain.',
        topics: ['React', 'Components'],
      },
      {
        id: 12,
        title: 'State & user interactions',
        type: 'GUIDED PROJECT',
        duration: '24 min',
        level: 'Intermediate',
        description: 'Use state to keep your interface in sync with the user and the data behind it.',
        topics: ['React', 'State'],
      },
    ],
  },
]

const allLessons = courses.flatMap((course) =>
  course.lessons.map((lesson) => ({
    ...lesson,
    courseId: course.id,
    courseTitle: course.title,
    category: course.category,
  })),
)

const categories = ['All topics', 'HTML', 'CSS', 'JavaScript', 'React']

function App() {
  const [activeView, setActiveView] = useState('Overview')
  const [activeCategory, setActiveCategory] = useState('All topics')
  const [search, setSearch] = useState('')
  const [activeLesson, setActiveLesson] = useState<(typeof allLessons)[number] | null>(null)
  const [completed, setCompleted] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('openweb-progress') || '[]') as number[]
    } catch {
      return []
    }
  })
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('openweb-progress', JSON.stringify(completed))
  }, [completed])

  const filteredLessons = useMemo(
    () =>
      allLessons.filter((lesson) => {
        const matchesSearch = `${lesson.title} ${lesson.description} ${lesson.topics.join(' ')}`
          .toLowerCase()
          .includes(search.toLowerCase())
        const matchesCategory = activeCategory === 'All topics' || lesson.category === activeCategory
        const matchesView = activeView !== 'In progress' || !completed.includes(lesson.id)
        return matchesSearch && matchesCategory && matchesView
      }),
    [activeCategory, activeView, completed, search],
  )

  const progress = Math.round((completed.length / allLessons.length) * 100)
  const nextLessons = allLessons.filter((lesson) => !completed.includes(lesson.id)).slice(0, 3)

  const toggleCompleted = (id: number) => {
    setCompleted((previous) =>
      previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id],
    )
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''}`}>
        <a className="brand" href="#overview" onClick={() => setActiveView('Overview')}>
          <span className="brand-mark">
            <Code2 size={18} strokeWidth={2.5} />
          </span>
          <span>
            open<span className="brand-light">web</span>
            <sup>©</sup>
          </span>
        </a>

        <div className="sidebar-label">Learn</div>
        <nav className="main-nav" aria-label="Main navigation">
          {[
            { name: 'Overview', icon: Compass },
            { name: 'In progress', icon: Layers3 },
            { name: 'All lessons', icon: BookOpen },
          ].map(({ name, icon: Icon }) => (
            <button
              type="button"
              key={name}
              className={`nav-item ${activeView === name ? 'selected' : ''}`}
              onClick={() => {
                setActiveView(name)
                setMobileNavOpen(false)
              }}
            >
              <Icon size={17} />
              <span>{name}</span>
              {name === 'In progress' && (
                <span className="nav-count">{allLessons.length - completed.length}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-label track-label">
          Learning paths
          <button type="button" aria-label="View all paths" onClick={() => setActiveCategory('All topics')}>
            <ArrowUpRight size={15} />
          </button>
        </div>

        <nav className="track-nav" aria-label="Course paths">
          {courses.map((course) => (
            <button
              type="button"
              key={course.id}
              className="track-item"
              onClick={() => {
                setActiveCategory(course.category)
                setActiveView('All lessons')
                setMobileNavOpen(false)
              }}
            >
              <span className={`track-dot ${course.color}`} />
              <span>{course.title}</span>
              <span className="track-total">{course.lessons.length}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="free-badge">
            <Sparkles size={15} />
            <span>Free for everyone</span>
          </div>
          <p>Open learning made practical, thoughtful, and welcoming.</p>
          <span className="version-tag">Open education © 2026</span>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu icon-button"
            aria-label="Toggle menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            {mobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <div className="breadcrumbs">
            Learn <span>/</span> <strong>{activeView}</strong>
          </div>

          <div className="topbar-right">
            <span className="free-top">
              <span /> Always free
            </span>
            <div className="avatar" aria-label="Profile avatar">
              Y
            </div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div className="welcome-copy-block">
              <div className="eyebrow">
                <span className="eyebrow-star">?</span> Your open web classroom
              </div>
              <h1>
                Make the web.
                <br />
                <em>Make it yours.</em>
              </h1>
              <p>
                Learn the building blocks of the web with practical steps, clear structure,
                and zero paywalls.
              </p>
              <div className="hero-actions">
                <button type="button" className="primary-button" onClick={() => setActiveView('All lessons')}>
                  Explore curriculum
                  <ArrowRight size={16} />
                </button>
                <button type="button" className="secondary-button" onClick={() => setActiveView('In progress')}>
                  Continue learning
                </button>
              </div>
            </div>

            <div className="hero-visual" role="img" aria-label="Workspace with code and design tools on a desk">
              <div className="photo-overlay">
                <span className="photo-kicker">Build for everyone</span>
                <span className="photo-caption">One small lesson at a time.</span>
              </div>
            </div>
          </section>

          <section className="progress-strip" aria-label="Progress statistics">
            <div className="progress-intro">
              <div className="progress-icon">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <span className="progress-title">Your learning journey</span>
                <span className="progress-subtitle">
                  {completed.length} of {allLessons.length} lessons complete
                </span>
              </div>
            </div>

            <div className="progress-meter">
              <div className="progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <span className="progress-percent">{progress}%</span>
            </div>

            <button type="button" className="progress-link" onClick={() => setActiveView('In progress')}>
              Keep going
              <ArrowRight size={15} />
            </button>
          </section>

          <section className="curriculum-section">
            <div className="section-heading">
              <div>
                <div className="section-kicker">The curriculum</div>
                <h2>
                  {activeView === 'In progress'
                    ? "What's next"
                    : activeView === 'All lessons'
                      ? 'Explore every lesson'
                      : 'A practical path through the web'}
                </h2>
              </div>

              <button
                type="button"
                className="view-all"
                onClick={() => setActiveView(activeView === 'All lessons' ? 'Overview' : 'All lessons')}
              >
                {activeView === 'All lessons' ? 'View overview' : 'Browse all lessons'}
                <ArrowRight size={15} />
              </button>
            </div>

            <div className="filter-row">
              <div className="category-filters" aria-label="Filter lessons by topic">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(category)
                      if (category !== 'All topics') setActiveView('All lessons')
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="search-field">
                <Search size={16} />
                <input
                  aria-label="Search lessons"
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Find a lesson..."
                />
              </label>
            </div>

            {activeView === 'Overview' && activeCategory === 'All topics' && search === '' ? (
              <div className="course-list">
                {courses.map((course) => {
                  const completedInCourse = course.lessons.filter((lesson) => completed.includes(lesson.id)).length
                  const courseProgress = Math.round((completedInCourse / course.lessons.length) * 100)

                  return (
                    <article className="course-row" key={course.id}>
                      <div className="course-number">{course.number}</div>
                      <div className={`course-marker ${course.color}`}>
                        <span />
                      </div>

                      <div className="course-info">
                        <div className="course-heading">
                          <h3>{course.title}</h3>
                          <span className="lesson-count">{course.lessons.length} lessons</span>
                        </div>
                        <p>{course.subtitle}</p>

                        <div className="course-progress">
                          <span>
                            <i style={{ width: `${courseProgress}%` }} />
                          </span>
                          <small>
                            {completedInCourse}/{course.lessons.length}
                          </small>
                        </div>
                      </div>

                      <div className="course-lessons">
                        {course.lessons.slice(0, 2).map((lesson) => (
                          <button
                            type="button"
                            key={lesson.id}
                            className="lesson-preview"
                            onClick={() => setActiveLesson({ ...lesson, courseId: course.id, courseTitle: course.title, category: course.category })}
                          >
                            <span className={`lesson-status ${completed.includes(lesson.id) ? 'done' : ''}`}>
                              {completed.includes(lesson.id) ? <Check size={12} /> : <Play size={10} fill="currentColor" />}
                            </span>
                            <span className="preview-title">{lesson.title}</span>
                            <span className="preview-time">{lesson.duration}</span>
                          </button>
                        ))}
                        {course.lessons.length > 2 && <span className="more-lessons">+{course.lessons.length - 2} more</span>}
                      </div>

                      <button
                        type="button"
                        className="course-open"
                        aria-label={`Explore ${course.title}`}
                        onClick={() => {
                          setActiveCategory(course.category)
                          setActiveView('All lessons')
                        }}
                      >
                        <ArrowUpRight size={17} />
                      </button>
                    </article>
                  )
                })}
              </div>
            ) : (
              <div className="lesson-results">
                {filteredLessons.length ? (
                  filteredLessons.map((lesson, index) => (
                    <button
                      type="button"
                      key={lesson.id}
                      className="result-row"
                      onClick={() => setActiveLesson(lesson)}
                    >
                      <span className="result-number">{String(index + 1).padStart(2, '0')}</span>

                      <span className={`lesson-status ${completed.includes(lesson.id) ? 'done' : ''}`}>
                        {completed.includes(lesson.id) ? <Check size={12} /> : <Play size={10} fill="currentColor" />}
                      </span>

                      <span className="result-main">
                        <strong>{lesson.title}</strong>
                        <small>
                          {lesson.courseTitle} <span>/</span> {lesson.type}
                        </small>
                      </span>

                      <span className="result-level">{lesson.level}</span>
                      <span className="result-time">
                        <Clock3 size={13} />
                        {lesson.duration}
                      </span>
                      <ArrowUpRight className="result-arrow" size={16} />
                    </button>
                  ))
                ) : (
                  <div className="empty-state">
                    <Search size={21} />
                    <strong>No lessons found</strong>
                    <span>Try a new term or choose a different topic.</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('')
                        setActiveCategory('All topics')
                        setActiveView('Overview')
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeView === 'In progress' && (
              <div className="next-lessons">
                {nextLessons.length ? (
                  nextLessons.map((lesson) => (
                    <button
                      type="button"
                      key={lesson.id}
                      className="next-card"
                      onClick={() => setActiveLesson(lesson)}
                    >
                      <span className="next-kicker">Up next</span>
                      <strong>{lesson.title}</strong>
                      <small>
                        {lesson.courseTitle} • {lesson.duration}
                      </small>
                    </button>
                  ))
                ) : (
                  <div className="empty-state compact">
                    <CheckCircle2 size={20} />
                    <strong>You are all caught up.</strong>
                    <span>Everything in this curriculum is complete.</span>
                  </div>
                )}
              </div>
            )}
          </section>

          <footer className="page-footer">
            <span>
              OpenWeb <span>•</span> an open education project
            </span>
            <span>Built for curious minds, everywhere.</span>
          </footer>
        </div>
      </main>

      {activeLesson && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveLesson(null)
          }}
        >
          <section className="lesson-modal" role="dialog" aria-modal="true" aria-labelledby="lesson-title">
            <button type="button" className="modal-close icon-button" aria-label="Close lesson" onClick={() => setActiveLesson(null)}>
              <X size={18} />
            </button>

            <span className="modal-course">
              {activeLesson.courseTitle} <span>/</span> Lesson {String(activeLesson.id).padStart(2, '0')}
            </span>

            <div className="modal-play">
              <Play size={23} fill="currentColor" />
            </div>

            <span className="modal-meta">
              {activeLesson.type} <i /> {activeLesson.duration} <i /> {activeLesson.level}
            </span>
            <h2 id="lesson-title">{activeLesson.title}</h2>
            <p>{activeLesson.description}</p>

            <div className="topic-tags">
              {activeLesson.topics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>

            <button
              type="button"
              className={`complete-button ${completed.includes(activeLesson.id) ? 'is-complete' : ''}`}
              onClick={() => toggleCompleted(activeLesson.id)}
            >
              {completed.includes(activeLesson.id) ? (
                <>
                  <Check size={17} /> Complete
                </>
              ) : (
                <>
                  Mark as complete <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="modal-footnote">
              <BookOpen size={14} /> Free to learn. No account needed.
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
