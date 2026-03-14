import { useState, useEffect } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import { slideSteps } from '../../slideSteps'
import './HooksSlide.css'

const hookExamples = [
  {
    event: 'afterFileEdit',
    trigger: 'After file edit — format + lint',
    example: `// .cursor/hooks.json
{
  "version": 1,
  "hooks": {
    "afterFileEdit": [
      { "command": ".cursor/hooks/format.sh" }
    ]
  }
}`,
    use: 'Auto-format and fix lint after every file write — Cursor never ships code that fails the linter',
  },
  {
    event: 'beforeShellExecution',
    trigger: 'Before shell command — safety check',
    example: `// .cursor/mcp.json
{
  "hooks": {
    "beforeShellExecution": [
      {
        "type": "prompt",
        "prompt": "Does this command look safe to execute? Only allow read-only operations.",
        "timeout": 10
      }
    ]
  }
}`,
    use: 'Before every shell command, an LLM reviews it and blocks execution if it looks destructive.',
  },
]

export function HooksSlide() {
  const [selected, setSelected] = useState(0)
  const h = hookExamples[selected]

  useEffect(() => {
    slideSteps.handler = () => {
      if (selected < hookExamples.length - 1) {
        setSelected((s) => s + 1)
        return true
      }
      return false
    }
    return () => {
      slideSteps.handler = null
    }
  }, [selected])

  return (
    <SlideLayout>
      <SlideTitle
        tag="03 · Harness Engineering"
        title="Hooks"
        subtitle="Automate the things the agent forgets to do"
      />
      <div className="hooks-layout">
        <div className="hooks-tabs">
          {hookExamples.map((hook, i) => (
            <button
              key={i}
              className={`hooks-tab${selected === i ? ' hooks-tab--active' : ''}`}
              onClick={() => setSelected(i)}
            >
              <span className="hooks-tab__event">{hook.event}</span>
              <span className="hooks-tab__trigger">{hook.trigger}</span>
            </button>
          ))}
        </div>
        <div className="hooks-detail">
          <pre className="hooks-code">{h.example}</pre>
          <p className="hooks-use">{h.use}</p>
        </div>
      </div>
    </SlideLayout>
  )
}
