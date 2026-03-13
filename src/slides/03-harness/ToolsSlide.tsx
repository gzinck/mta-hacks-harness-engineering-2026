import { useState } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import './ToolsSlide.css'

type Tool = {
  name: string
  icon: string
  tag: string
  desc: string
  examples?: string[]
}

const tools: Tool[] = [
  {
    name: 'Read',
    icon: '📄',
    tag: 'files',
    desc: 'Read file contents. Supports code, images, PDFs, and Jupyter notebooks.',
  },
  {
    name: 'Write',
    icon: '✏️',
    tag: 'files',
    desc: 'Create or overwrite a file. Prefer Edit for targeted changes.',
  },
  {
    name: 'Edit',
    icon: '🔧',
    tag: 'files',
    desc: 'Precise string replacement inside a file — sends only the diff.',
  },
  {
    name: 'Glob',
    icon: '🔍',
    tag: 'search',
    desc: 'Find files matching a glob pattern, sorted by modification time.',
  },
  {
    name: 'Grep',
    icon: '🧵',
    tag: 'search',
    desc: 'Ripgrep-powered search across file contents with full regex support.',
  },
  {
    name: 'Bash',
    icon: '⚡',
    tag: 'shell',
    desc: 'Run arbitrary shell commands, scripts, and terminal operations.',
  },
  {
    name: 'WebFetch',
    icon: '🌐',
    tag: 'web',
    desc: 'Fetch a URL and return its content as Markdown for analysis.',
  },
  {
    name: 'WebSearch',
    icon: '🔎',
    tag: 'web',
    desc: 'Search the web and return ranked results with snippets.',
  },
  {
    name: 'Agent',
    icon: '🤖',
    tag: 'agents',
    desc: 'Spawn a specialized subagent for parallel or isolated workloads.',
  },
  {
    name: 'MCP',
    icon: '🔌',
    tag: 'extend',
    desc: 'Plug in any external system via the Model Context Protocol.',
    examples: ['Jira', 'GitHub', 'Slack', 'Postgres', 'Custom REST APIs'],
  },
]

const tagColor: Record<string, string> = {
  files: 'var(--accent)',
  search: 'var(--green)',
  shell: 'var(--yellow)',
  web: '#38bdf8',
  agents: 'var(--red)',
  extend: '#f472b6',
}

export function ToolsSlide() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <SlideLayout>
      <SlideTitle
        tag="03 · Harness Engineering"
        title="Tools"
        subtitle="The primitives Claude uses to act on the world"
      />
      <div className="tools-grid">
        {tools.map((tool, i) => (
          <div
            key={tool.name}
            className={`tool-card${hovered === i ? ' tool-card--hovered' : ''}`}
            style={{ '--tag-color': tagColor[tool.tag] } as React.CSSProperties}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="tool-card__icon">{tool.icon}</div>
            <div className="tool-card__name">{tool.name}</div>
            <div className="tool-card__tag">{tool.tag}</div>
            <div className="tool-card__desc">{tool.desc}</div>
            {tool.examples && (
              <ul className="tool-card__examples">
                {tool.examples.map(ex => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </SlideLayout>
  )
}
