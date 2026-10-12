import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { courses } from '../data/courses'
import { getCourseLessons } from '../data/lessons'
import { getCourseExamQuestions } from '../data/courseExam'
import { useProgress } from '../hooks/useProgressState'

export function QuizPage() {
  const [params, setParams] = useSearchParams()
  const selectedCourse = params.get('course') ?? courses[0].slug
  const course = courses.find((item) => item.slug === selectedCourse) ?? courses[0]
  const quizQuestions = useMemo(() => [
    ...getCourseLessons(course.slug).map((lesson) => ({ id: lesson.id, question: lesson.question, choices: lesson.choices, answer: lesson.answer, note: lesson.answerNote })),
    ...getCourseExamQuestions(course.slug).map((item, index) => ({ id: `${course.slug}-exam-${index + 1}`, ...item, note: item.explanation })),
  ], [course.slug])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const { quizScores, saveQuizScore } = useProgress()
  const score = quizQuestions.reduce((total, item) => total + (answers[item.id] === item.answer ? 1 : 0), 0)

  const changeCourse = (slug: string) => {
    setParams({ course: slug })
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <div className="quiz-page section-wrap">
      <div className="tool-page-intro"><div className="section-label">CHECK YOUR UNDERSTANDING</div><h1>Practice what <span>you learned.</span></h1><p>Choose a course quiz, answer at your own pace, and see your result right away.</p></div>
      <div className="quiz-course-picker"><label htmlFor="quiz-course">Course quiz</label><select id="quiz-course" value={course.slug} onChange={(event) => changeCourse(event.target.value)}>{courses.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select><span>{quizQuestions.length} questions · Best score {quizScores[course.slug] ?? '—'}</span></div>
      {submitted ? <><div className="quiz-result" role="status"><CheckCircle2 size={28} /><span className="section-label">QUIZ COMPLETE</span><strong>{score} / {quizQuestions.length}</strong><p>{score === quizQuestions.length ? 'Excellent work. You have a strong grasp of this course.' : 'Review the explanations below, then try again when you are ready.'}</p><div><button className="button button-secondary" type="button" onClick={() => { setAnswers({}); setSubmitted(false) }}><RotateCcw size={15} /> Try again</button><Link className="button button-primary" to={`/courses/${course.slug}`}>Review course <ArrowRight size={15} /></Link></div></div><section className="quiz-review"><div className="section-label">ANSWER REVIEW</div><h2>Learn from every answer</h2>{quizQuestions.map((item, index) => { const correct = answers[item.id] === item.answer; return <article className={`quiz-review-item ${correct ? 'is-correct' : 'is-incorrect'}`} key={item.id}><span>{String(index + 1).padStart(2, '0')} · {correct ? 'CORRECT' : 'REVIEW'}</span><h3>{item.question}</h3><p><strong>Answer:</strong> {item.choices[item.answer]}</p><p>{item.note}</p></article> })}</section></> : <form className="quiz-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); saveQuizScore(course.slug, score) }}>{quizQuestions.map((item, index) => <fieldset className="quiz-question" key={item.id}><legend><span>{String(index + 1).padStart(2, '0')}</span>{item.question}</legend><div className="answer-options">{item.choices.map((choice, choiceIndex) => <label key={choice} className={answers[item.id] === choiceIndex ? 'is-picked' : ''}><input type="radio" name={item.id} value={choiceIndex} checked={answers[item.id] === choiceIndex} onChange={() => setAnswers((current) => ({ ...current, [item.id]: choiceIndex }))} /><span>{choice}</span></label>)}</div></fieldset>)}<button className="button button-primary" type="submit" disabled={Object.keys(answers).length !== quizQuestions.length}>Submit answers <ArrowRight size={15} /></button></form>}
    </div>
  )
}
