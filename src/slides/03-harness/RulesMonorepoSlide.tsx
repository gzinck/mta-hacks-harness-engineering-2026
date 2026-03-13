import { useState, useEffect } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import { slideSteps } from '../../slideSteps'
import './RulesMonorepoSlide.css'

type BaseNode = { revealOnStep?: number }
type TreeNode =
  | (BaseNode & { kind: 'claude'; name: string; note: string })
  | (BaseNode & { kind: 'rules-md'; name: string; note: string })
  | (BaseNode & { kind: 'dir'; name: string; children: TreeNode[] })
  | (BaseNode & { kind: 'ellipsis' })

const tree: TreeNode[] = [
  {
    kind: 'dir',
    name: 'my-app/',
    children: [
      { kind: 'claude', name: 'CLAUDE.md', note: 'tech stack, git conventions, shared tooling' },
      {
        kind: 'dir',
        name: '.claude/',
        revealOnStep: 1,
        children: [
          {
            kind: 'dir',
            name: 'rules/',
            revealOnStep: 1,
            children: [
              {
                kind: 'rules-md',
                name: 'audio-components.md',
                note: 'Web Audio API patterns',
                revealOnStep: 1,
              },
            ],
          },
        ],
      },
      {
        kind: 'dir',
        name: 'frontend/',
        children: [
          { kind: 'claude', name: 'CLAUDE.md', note: 'React patterns, CSS conventions, Vite config' },
          { kind: 'dir', name: 'src/', children: [{ kind: 'ellipsis' }] },
        ],
      },
      {
        kind: 'dir',
        name: 'backend/',
        children: [
          { kind: 'claude', name: 'CLAUDE.md', note: 'Go module layout, API patterns, DB migrations' },
          { kind: 'dir', name: 'cmd/', children: [{ kind: 'ellipsis' }] },
        ],
      },
    ],
  },
]

const MAX_STEP = 1

function TreeRow({ node, depth, step }: { node: TreeNode; depth: number; step: number }) {
  const revealStep = node.revealOnStep ?? 0
  if (step < revealStep) return null

  const entering = step === revealStep && revealStep > 0
  const indent = depth * 1.5
  const cls = (base: string) => `${base}${entering ? ' tree-row--entering' : ''}`

  if (node.kind === 'ellipsis') {
    return (
      <div className={cls('tree-row tree-row--ellipsis')} style={{ paddingLeft: `${indent}rem` }}>
        <span className="tree-connector">└──</span>
        <span className="tree-name tree-name--muted">…</span>
      </div>
    )
  }

  if (node.kind === 'claude') {
    return (
      <div className={cls('tree-row tree-row--claude')} style={{ paddingLeft: `${indent}rem` }}>
        <span className="tree-connector">├──</span>
        <span className="tree-icon">📄</span>
        <span className="tree-name tree-name--claude">{node.name}</span>
        <span className="tree-note">← {node.note}</span>
      </div>
    )
  }

  if (node.kind === 'rules-md') {
    return (
      <div className={cls('tree-row tree-row--rules-md')} style={{ paddingLeft: `${indent}rem` }}>
        <span className="tree-connector">└──</span>
        <span className="tree-icon">📄</span>
        <span className="tree-name tree-name--rules-md">{node.name}</span>
        <span className="tree-note">← {node.note}</span>
      </div>
    )
  }

  // dir
  return (
    <>
      <div className={cls('tree-row tree-row--dir')} style={{ paddingLeft: `${indent}rem` }}>
        {depth > 0 && <span className="tree-connector">├──</span>}
        <span className="tree-icon">📁</span>
        <span className="tree-name tree-name--dir">{node.name}</span>
      </div>
      {node.children.map((child, i) => (
        <TreeRow key={i} node={child} depth={depth + 1} step={step} />
      ))}
    </>
  )
}

export function RulesMonorepoSlide() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    slideSteps.handler = () => {
      if (step < MAX_STEP) {
        setStep(s => s + 1)
        return true
      }
      return false
    }
    return () => { slideSteps.handler = null }
  }, [step])

  return (
    <SlideLayout>
      <SlideTitle
        tag="03 · Harness Engineering"
        title="Rules"
        subtitle="Each folder can have its own CLAUDE.md"
      />
      <div className="monorepo-layout">
        <div className="monorepo-tree">
          {tree.map((node, i) => (
            <TreeRow key={i} node={node} depth={0} step={step} />
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
