import { useState, useEffect } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import { slideSteps } from '../../slideSteps'
import './SkillsSlide.css'

const skills = [
  {
    command: '/scaffold-component',
    frontmatter: `---
name: scaffold-component
version: 1.0.0
description: "Scaffold a new React component following project conventions."
---`,
    body: `Use AskUserQuestion to ask: component name, target screen,
and any props or behaviour you're unsure about.
Summarize the plan and confirm with the user before
writing any files.

Create .tsx + .css with named export and TypeScript
props interface following project conventions.`,
    benefit:
      'Asks before acting — no wasted scaffolding for the wrong component.',
  },
  {
    command: '/update-doc',
    frontmatter: `---
name: update-doc
version: 1.0.0
description: "Update a Google Doc via the gws CLI."
metadata:
  requires:
    bins: ["gws"]
  cliHelp: "gws docs --help"
---`,
    body: `Inspect params before calling:
  gws schema docs.documents.get
  gws schema docs.documents.batchUpdate

Fetch the doc:
  gws docs documents.get \\
    --params '{"documentId":"1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms"}'

Apply the requested edits with batchUpdate.
Use gws schema output to build correct --json flags.`,
    benefit:
      'Grounds the model in real API shapes — no hallucinated field names.',
  },
  {
    command: '/review-pr',
    frontmatter: `---
name: review-pr
version: 1.0.0
description: "Review a pull request for bugs, security, and style."
---`,
    body: `Fetch the diff for PR #{{args}}.
Spawn three subagents in parallel:
  1. Logic & correctness reviewer
  2. Security & dependency reviewer
  3. Docs & changelog reviewer

Merge all findings into a single markdown report.`,
    benefit:
      'Parallel subagents cut review time — each focuses on one concern.',
  },
]

export function SkillsSlide() {
  const [selected, setSelected] = useState(0)
  const [showFrontmatter, setShowFrontmatter] = useState(false)
  const s = skills[selected]

  useEffect(() => {
    slideSteps.handler = () => {
      if (selected < skills.length - 1) {
        setSelected((i) => i + 1)
        return true
      }
      return false
    }
    slideSteps.prevHandler = () => {
      if (selected > 0) {
        setSelected((i) => i - 1)
        return true
      }
      return false
    }
    return () => {
      slideSteps.handler = null
      slideSteps.prevHandler = null
    }
  }, [selected])

  const templateContent = showFrontmatter
    ? `${s.frontmatter}\n\n${s.body}`
    : s.body

  return (
    <SlideLayout>
      <SlideTitle
        tag="03 · Harness Engineering"
        title="Skills"
        subtitle="Packaged workflows as slash commands"
      />
      <div className="skills-layout">
        <div className="skills-list">
          {skills.map((skill, i) => (
            <button
              key={skill.command}
              className={`skills-item${selected === i ? ' skills-item--active' : ''}`}
              onClick={() => setSelected(i)}
            >
              {skill.command}
            </button>
          ))}
        </div>
        <div className="skills-detail">
          <div className="skills-prompt">
            <div className="skills-prompt__header">
              <div className="skills-prompt__label">Skill template</div>
              <button
                className={`skills-fm-toggle${showFrontmatter ? ' skills-fm-toggle--active' : ''}`}
                onClick={() => setShowFrontmatter((v) => !v)}
              >
                frontmatter
              </button>
            </div>
            <pre className="skills-prompt__content">{templateContent}</pre>
          </div>
          <p className="skills-benefit">{s.benefit}</p>
        </div>
      </div>
    </SlideLayout>
  )
}
