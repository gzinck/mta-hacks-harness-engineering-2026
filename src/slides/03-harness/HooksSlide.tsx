import { useState, useEffect } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import { slideSteps } from '../../slideSteps'
import './HooksSlide.css'

const hookExamples = [
  {
    event: 'PostToolUse',
    trigger: 'After Edit/Write — auto-lint',
    example: `// .claude/settings.json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "pnpm eslint --fix \\"$CLAUDE_TOOL_RESPONSE_FILE_PATH\\"",
        "statusMessage": "Linting..."
      }]
    }]
  }
}`,
    use: 'Auto-fix lint errors after every file write — Claude never ships code that fails the linter',
  },
  {
    event: 'Stop',
    trigger: 'When Claude thinks it\'s done — simplify',
    example: `// .claude/settings.json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "agent",
        "prompt": "Review git diff --cached. If any files look
over-engineered or unnecessarily complex, run the /simplify
skill on them and fix in-place. Return { ok: true } when done.",
        "statusMessage": "Simplifying generated code..."
      }]
    }]
  }
}`,
    use: 'After Claude finishes, a second agent automatically reviews and simplifies the output',
  },
  {
    event: 'Stop',
    trigger: 'When Claude thinks it\'s done — changelog',
    example: `// .claude/settings.json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "agent",
        "prompt": "Run git diff --cached --name-only. If there are
staged changes, prepend a new entry to CHANGELOG.md with
today's date and the list of changed files. Return { ok: true }.",
        "statusMessage": "Updating CHANGELOG.md..."
      }]
    }]
  }
}`,
    use: 'Every time Claude finishes, an agent writes the changed files into CHANGELOG.md',
  },
]

export function HooksSlide() {
  const [selected, setSelected] = useState(0)
  const h = hookExamples[selected]

  useEffect(() => {
    slideSteps.handler = () => {
      if (selected < hookExamples.length - 1) {
        setSelected(s => s + 1)
        return true
      }
      return false
    }
    return () => { slideSteps.handler = null }
  }, [selected])

  return (
    <SlideLayout>
      <SlideTitle
        tag="03 · Harness Engineering"
        title="Hooks"
        subtitle="Automate the things Claude forgets to do"
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
