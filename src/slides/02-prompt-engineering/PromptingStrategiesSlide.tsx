import { useState, useEffect, useRef } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import './PromptingStrategiesSlide.css'

const strategies = [
  {
    name: 'Role + Goal',
    example:
      'You are a senior TypeScript engineer. Refactor this function to eliminate side effects.',
  },
  {
    name: 'Chain of Thought',
    example:
      'Think step by step. First identify the bug, then explain why it occurs, then fix it.',
  },
  {
    name: 'Constrained Output',
    example:
      'Return only a JSON object with keys: { summary, files_changed, risk_level }',
  },
  {
    name: 'Few-Shot',
    example:
      'Here are 2 examples of good commit messages:\n[...]\nNow write one for this diff:',
  },
  {
    name: 'Declarative Decision Request',
    example:
      'I have retry logic happening in src/api/client.ts.\n\nList the pros and cons of this approach in bullet points.\n\nProvide a summary of 3 alternative approaches with their pros and cons.\n\nState your recommendation and explain your reasoning.',
  },
]

const CHAR_DELAY = 8

export function PromptingStrategiesSlide() {
  const [selected, setSelected] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [typing, setTyping] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const selectedRef = useRef(selected)
  selectedRef.current = selected
  const s = strategies[selected]

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        if (selectedRef.current < strategies.length - 1) {
          e.preventDefault()
          e.stopPropagation()
          setSelected((i) => i + 1)
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (selectedRef.current > 0) {
          e.preventDefault()
          e.stopPropagation()
          setSelected((i) => i - 1)
        }
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplayedText('')
    setTyping(true)
    const full = s.example
    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayedText(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(intervalRef.current!)
        setTyping(false)
      }
    }, CHAR_DELAY)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SlideLayout>
      <SlideTitle tag="02 · Prompt Engineering" title="Prompting Strategies" />
      <div className="ps-layout">
        <div className="ps-list">
          {strategies.map((strat, i) => (
            <button
              key={i}
              className={`ps-item${selected === i ? ' ps-item--active' : ''}`}
              onClick={() => setSelected(i)}
            >
              <span className="ps-item__num">0{i + 1}</span>
              {strat.name}
            </button>
          ))}
        </div>
        <div className="ps-detail">
          <pre className="ps-example">
            {displayedText}
            {typing && <span className="ps-cursor" />}
          </pre>
        </div>
      </div>
    </SlideLayout>
  )
}
