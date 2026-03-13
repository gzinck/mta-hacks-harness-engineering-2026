import { useState, useEffect } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import './StateOfDevSlide.css'

const START = new Date('2025-01-01').getTime()
const END = new Date('2026-06-01').getTime() // extra right margin so last dot ~84%

function pct(dateStr: string) {
  return ((new Date(dateStr).getTime() - START) / (END - START)) * 100
}

const events = [
  {
    date: 'May 2025',
    pos: pct('2025-05-01'),
    label: 'Claude Sonnet / Opus 4',
    company: 'anthropic',
    above: true,
  },
  {
    date: 'Aug 2025',
    pos: pct('2025-08-01'),
    label: 'GPT-5',
    company: 'openai',
    above: false,
  },
  {
    date: 'Nov 2025',
    pos: pct('2025-11-01'),
    label: 'Claude Opus 4.5',
    company: 'anthropic',
    above: true,
  },
  {
    date: 'Dec 2025',
    pos: pct('2025-12-01'),
    label: 'GPT-5.2',
    company: 'openai',
    above: false,
  },
  {
    date: 'Mar 2026',
    pos: pct('2026-03-11'),
    label: 'Sonnet / Opus 4.6\nGPT-5.4',
    company: 'both',
    above: true,
    today: true,
  },
]

const ERA_SPLIT = pct('2025-11-01') // Opus 4.5 marks start of AI-written era

export function StateOfDevSlide() {
  const [focused, setFocused] = useState<number | null>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const fwd =
        e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' '
      const bwd = e.key === 'ArrowLeft' || e.key === 'ArrowUp'

      if (fwd) {
        if (focused === null) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setFocused(0)
        } else if (focused < events.length - 1) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setFocused((f) => (f as number) + 1)
        }
        // at last event → let presentation advance
      } else if (bwd) {
        if (focused !== null && focused > 0) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setFocused((f) => (f as number) - 1)
        } else if (focused === 0) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setFocused(null)
        }
        // focused === null → let presentation go back
      }
    }
    window.addEventListener('keydown', onKey, { capture: true })
    return () => window.removeEventListener('keydown', onKey, { capture: true })
  }, [focused])

  return (
    <SlideLayout>
      <SlideTitle
        tag="01 · Intro"
        title="The State of Development"
        subtitle="March 2026"
      />

      {/* Single positioned container — labels + track are siblings here so
          percentage-based positioning is all relative to the same width */}
      <div className="tl-stage">
        {/* Labels above/below track */}
        {events.map((ev, i) => {
          const state =
            focused === null
              ? 'idle'
              : i < focused
                ? 'past'
                : i === focused
                  ? 'active'
                  : 'future'
          return (
            <div
              key={i}
              className={`tl-label tl-label--${ev.company} tl-label--${state} tl-label--${ev.above ? 'above' : 'below'}`}
              style={{ left: `${ev.pos}%` }}
              onClick={() => setFocused(focused === i ? null : i)}
            >
              {ev.today && <span className="tl-label__today">TODAY</span>}
              <span className="tl-label__name">
                {ev.label.split('\n').map((line, j) => (
                  <span key={j} className="tl-label__line">
                    {line}
                  </span>
                ))}
              </span>
              <span className="tl-label__date">{ev.date}</span>
            </div>
          )
        })}

        {/* Track */}
        <div className="tl-track">
          <div
            className="tl-fill tl-fill--hand"
            style={{ width: `${ERA_SPLIT}%` }}
          />
          <div
            className="tl-fill tl-fill--ai"
            style={{ left: `${ERA_SPLIT}%`, right: 0 }}
          />

          {focused !== null && (
            <div
              className="tl-progress"
              style={{ width: `${events[focused].pos}%` }}
            />
          )}

          <div className="tl-era-divider" style={{ left: `${ERA_SPLIT}%` }} />

          {events.map((ev, i) => {
            const state =
              focused === null
                ? 'idle'
                : i < focused
                  ? 'past'
                  : i === focused
                    ? 'active'
                    : 'future'
            return (
              <div
                key={i}
                className={`tl-dot tl-dot--${ev.company} tl-dot--${state}`}
                style={{ left: `${ev.pos}%` }}
                onClick={() => setFocused(focused === i ? null : i)}
              />
            )
          })}
        </div>

        {/* Era labels */}
        <div className="tl-era tl-era--hand" style={{ width: `${ERA_SPLIT}%` }}>
          Primarily handwritten code
        </div>
        <div
          className="tl-era tl-era--ai"
          style={{ left: `${ERA_SPLIT}%`, right: 0 }}
        >
          Primarily AI-written code
        </div>
      </div>
    </SlideLayout>
  )
}
