import { useState, useEffect } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import './WhatIsHarnessSlide.css'

const EXAMPLES = [
  { name: 'Claude Code', emoji: '🟠' },
  { name: 'Cursor', emoji: '🔵' },
  { name: 'Codex', emoji: '🟢' },
  { name: 'OpenCode', emoji: '⚪' },
  { name: 'Mastra Code', emoji: '🟣' },
]

const BOXES = [
  {
    key: 'agent',
    title: '🤖 Agent',
    items: ['📋 System prompts', '🧠 Memory', '🔧 Tools', '⚡ Skills'],
  },
  {
    key: 'workspace',
    title: '🗂️ Workspace',
    items: ['📁 File system', '📦 Sandbox'],
  },
  {
    key: 'steering',
    title: '🧑‍✈️ Steering',
    items: ['✅ Tool approval', '🛑 Abort', '❓ Ask user'],
  },
]

export function WhatIsHarnessSlide() {
  const [step, setStep] = useState(0) // 0 = none, 1–3 = boxes, 4 = examples

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const fwd =
        e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' '
      const bwd = e.key === 'ArrowLeft' || e.key === 'ArrowUp'

      const MAX = BOXES.length + 1 // +1 for examples row
      if (fwd && step < MAX) {
        e.preventDefault()
        e.stopImmediatePropagation()
        setStep((s) => s + 1)
      } else if (bwd && step > 0) {
        e.preventDefault()
        e.stopImmediatePropagation()
        setStep((s) => s - 1)
      }
      // at step === MAX → let presentation advance
      // at step === 0 going back → let presentation go back
    }
    window.addEventListener('keydown', onKey, { capture: true })
    return () => window.removeEventListener('keydown', onKey, { capture: true })
  }, [step])

  return (
    <SlideLayout>
      <SlideTitle
        tag="01 · Intro"
        title="What is a Harness?"
        subtitle="The scaffolding that wraps an AI agent"
      />
      <div className="wih-outer">
        <div className="wih-label wih-label--outer">Harness</div>
        <div className="wih-boxes">
          {BOXES.map((box, i) => {
            const visible = step > i
            return (
              <div
                key={box.key}
                className={`wih-box wih-box--${box.key}${visible ? ' wih-box--visible' : ''}`}
              >
                <div className="wih-box-title">{box.title}</div>
                <div className="wih-chips">
                  {box.items.map((item) => (
                    <span
                      key={item}
                      className={`wih-chip wih-chip--${box.key}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        <div
          className={`wih-examples${step > BOXES.length ? ' wih-examples--visible' : ''}`}
        >
          <span className="wih-examples-label">Examples:</span>
          {EXAMPLES.map((ex) => (
            <span key={ex.name} className="wih-example-pill">
              {ex.emoji} {ex.name}
            </span>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
