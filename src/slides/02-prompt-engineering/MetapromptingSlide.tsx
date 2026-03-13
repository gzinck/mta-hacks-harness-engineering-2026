import { useState, useEffect, useRef, useCallback } from 'react'
import './MetapromptingSlide.css'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'

const INPUT_TEXT = `Create a plan to refactor the auth utils to use async/await instead of .then() chains`

const OUTPUT_TEXT = `Here's a plan to refactor the auth utils to async/await:

Files to modify:
- src/auth/utils.ts (primary — all .then() chains)
- src/auth/session.ts (uses fetchUser — needs updating)
- tests/auth/utils.test.ts (mock async signatures)

Steps:
[ ] Identify all .then()/.catch() chains in utils.ts
[ ] Convert each to async/await with try/catch
[ ] Update callers in session.ts to await refactored fns
[ ] Run existing tests and fix any broken async mocks
[ ] Verify no unhandled promise rejections remain`

const CHAR_DELAY_INPUT = 12
const CHAR_DELAY_OUTPUT = 6
const LOADING_DURATION = 1400

type Phase = 'idle' | 'typing-input' | 'loading' | 'typing-output' | 'done'

export function MetapromptingSlide() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const startAnimation = useCallback(() => {
    clearTimers()
    setInputText('')
    setOutputText('')
    setPhase('typing-input')

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setInputText(INPUT_TEXT.slice(0, i))
      if (i >= INPUT_TEXT.length) {
        clearInterval(intervalRef.current!)
        setPhase('loading')
        timeoutRef.current = setTimeout(() => {
          setPhase('typing-output')
          let j = 0
          intervalRef.current = setInterval(() => {
            j++
            setOutputText(OUTPUT_TEXT.slice(0, j))
            if (j >= OUTPUT_TEXT.length) {
              clearInterval(intervalRef.current!)
              setPhase('done')
            }
          }, CHAR_DELAY_OUTPUT)
        }, LOADING_DURATION)
      }
    }, CHAR_DELAY_INPUT)
  }, [])

  useEffect(() => {
    const t = setTimeout(startAnimation, 400)
    return () => { clearTimeout(t); clearTimers() }
  }, [startAnimation])

  const isTypingInput = phase === 'typing-input'
  const isTypingOutput = phase === 'typing-output'
  const showOutput = phase === 'typing-output' || phase === 'done'
  const showLoading = phase === 'loading'

  return (
    <SlideLayout>
      <SlideTitle
        tag="02 · Prompt Engineering"
        title="Metaprompting"
        subtitle="Using AI to write your prompts"
      />
      <div className="meta-flow">
        <div className="meta-box meta-box--input">
          <div className="meta-box__label">Your metaprompt</div>
          <div className="meta-box__content">
            {inputText}
            {isTypingInput && <span className="meta-cursor" />}
          </div>
        </div>

        <div className="meta-arrow">
          <span className="meta-arrow__label">Claude writes the prompt</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        <div className={`meta-box meta-box--output${showOutput || showLoading ? ' meta-box--visible' : ''}`}>
          <div className="meta-box__label">Generated prompt</div>
          {showLoading ? (
            <div className="meta-loading">
              <span className="meta-dot" />
              <span className="meta-dot" />
              <span className="meta-dot" />
            </div>
          ) : (
            <pre className="meta-box__content meta-box__content--mono">
              {outputText}
              {isTypingOutput && <span className="meta-cursor meta-cursor--green" />}
            </pre>
          )}
        </div>
      </div>

      <div className="meta-footer">
        <p className="meta-insight">
          The model understands prompt structure better than you do — let it draft, you refine.
        </p>
        <button className="meta-replay" onClick={startAnimation} title="Replay animation">
          ↺ replay
        </button>
      </div>
    </SlideLayout>
  )
}
