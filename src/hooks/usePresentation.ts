import { useState, useEffect, useCallback } from 'react'
import { slides } from '../slides'
import { slideSteps } from '../slideSteps'

export type PresentationState = {
  currentIndex: number
  total: number
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export function usePresentation(): PresentationState {
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = slides.length

  const next = useCallback(() => {
    if (slideSteps.handler && slideSteps.handler()) return
    setCurrentIndex(i => Math.min(i + 1, total - 1))
  }, [total])

  const prev = useCallback(() => {
    if (slideSteps.prevHandler && slideSteps.prevHandler()) return
    setCurrentIndex(i => Math.max(i - 1, 0))
  }, [])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, total - 1)))
  }, [total])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  return { currentIndex, total, next, prev, goTo }
}
