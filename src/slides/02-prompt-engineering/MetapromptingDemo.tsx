import { useState, useEffect, useRef, useCallback } from 'react'
import './MetapromptingSlide.css'

const CHAR_DELAY_INPUT = 12
const CHAR_DELAY_OUTPUT = 6
const LOADING_DURATION = 1400

type Phase = 'idle' | 'typing-input' | 'loading' | 'typing-output' | 'done'

interface Props {
  inputText: string
  outputText: string
  arrowLabel?: string
}

export function MetapromptingDemo({
  inputText,
  outputText,
  arrowLabel = 'Cursor writes the prompt',
}: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [displayInput, setDisplayInput] = useState('')
  const [displayOutput, setDisplayOutput] = useState('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const startAnimation = useCallback(() => {
    clearTimers()
    setDisplayInput('')
    setDisplayOutput('')
    setPhase('typing-input')

    let i = 0
    intervalRef.current = setInterval(() => {
      i++
      setDisplayInput(inputText.slice(0, i))
      if (i >= inputText.length) {
        clearInterval(intervalRef.current!)
        setPhase('loading')
        timeoutRef.current = setTimeout(() => {
          setPhase('typing-output')
          let j = 0
          intervalRef.current = setInterval(() => {
            j++
            setDisplayOutput(outputText.slice(0, j))
            if (j >= outputText.length) {
              clearInterval(intervalRef.current!)
              setPhase('done')
            }
          }, CHAR_DELAY_OUTPUT)
        }, LOADING_DURATION)
      }
    }, CHAR_DELAY_INPUT)
  }, [inputText, outputText])

  useEffect(() => {
    const t = setTimeout(startAnimation, 400)
    return () => {
      clearTimeout(t)
      clearTimers()
    }
  }, [startAnimation])

  const isTypingInput = phase === 'typing-input'
  const isTypingOutput = phase === 'typing-output'
  const showOutput = phase === 'typing-output' || phase === 'done'
  const showLoading = phase === 'loading'

  return (
    <>
      <div className="meta-flow">
        <div className="meta-box meta-box--input">
          <div className="meta-box__label">Your metaprompt</div>
          <div className="meta-box__content">
            {displayInput}
            {isTypingInput && <span className="meta-cursor" />}
          </div>
        </div>

        <div className="meta-arrow">
          <span className="meta-arrow__label">{arrowLabel}</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        <div
          className={`meta-box meta-box--output${showOutput || showLoading ? ' meta-box--visible' : ''}`}
        >
          <div className="meta-box__label">Generated prompt</div>
          {showLoading ? (
            <div className="meta-loading">
              <span className="meta-dot" />
              <span className="meta-dot" />
              <span className="meta-dot" />
            </div>
          ) : (
            <pre className="meta-box__content meta-box__content--mono">
              {displayOutput}
              {isTypingOutput && (
                <span className="meta-cursor meta-cursor--green" />
              )}
            </pre>
          )}
        </div>
      </div>

      <div className="meta-footer">
        <button
          className="meta-replay"
          onClick={startAnimation}
          title="Replay animation"
        >
          ↺ replay
        </button>
      </div>
    </>
  )
}
