import { useEffect, useState, type ReactNode } from 'react'
import { ProgressContext, storageKey, type ProgressState } from './progressContext'

function readProgress(): ProgressState {
  try {
    const stored = localStorage.getItem(storageKey)
    if (!stored) return { completed: [], quizScores: {} }
    const parsed = JSON.parse(stored) as Partial<ProgressState>
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed.filter((id): id is string => typeof id === 'string') : [],
      quizScores: parsed.quizScores && typeof parsed.quizScores === 'object' ? parsed.quizScores : {},
    }
  } catch {
    return { completed: [], quizScores: {} }
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(readProgress)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(progress))
  }, [progress])

  const toggleLesson = (lessonId: string) => {
    setProgress((current) => ({
      ...current,
      completed: current.completed.includes(lessonId)
        ? current.completed.filter((id) => id !== lessonId)
        : [...current.completed, lessonId],
    }))
  }

  const saveQuizScore = (quizId: string, score: number) => {
    setProgress((current) => ({
      ...current,
      quizScores: { ...current.quizScores, [quizId]: Math.max(current.quizScores[quizId] ?? 0, score) },
    }))
  }

  const clearProgress = () => setProgress({ completed: [], quizScores: {} })

  return <ProgressContext.Provider value={{ ...progress, toggleLesson, saveQuizScore, clearProgress }}>{children}</ProgressContext.Provider>
}

