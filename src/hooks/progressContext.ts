import { createContext } from 'react'

export type ProgressState = { completed: string[]; quizScores: Record<string, number> }
export type ProgressContextValue = ProgressState & {
  toggleLesson: (lessonId: string) => void
  saveQuizScore: (quizId: string, score: number) => void
  clearProgress: () => void
}

export const storageKey = 'freecode-academy-progress'
export const ProgressContext = createContext<ProgressContextValue | null>(null)
