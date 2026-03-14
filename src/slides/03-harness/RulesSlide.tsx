import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import './RulesSlide.css'

const sections = [
  {
    label: 'Project',
    content:
      'React + TypeScript presentation (Vite, pnpm)\nFrontend-only, no router. Port 5173.',
  },
  {
    label: 'Commands',
    content:
      'pnpm dev        # start dev server\npnpm build      # type-check + build\npnpm lint       # ESLint',
  },
  {
    label: 'Architecture',
    content:
      'Flat slide array in src/slides/index.ts\nEach slide: one .tsx + one co-located .css\nNavigation via usePresentation hook',
  },
  {
    label: 'Conventions',
    content:
      'Named exports only (no default exports)\nCSS custom properties: --bg, --accent, --text-muted\nSizes use clamp(min, vw, max)',
  },
]

export function RulesSlide() {
  return (
    <SlideLayout>
      <SlideTitle
        tag="03 · Harness Engineering"
        title="Rules"
        subtitle="AGENTS.md — the agent's persistent memory"
      />
      <div className="rules-layout">
        <div className="rules-file">
          <div className="rules-file__header">
            <span
              className="rules-file__dot"
              style={{ background: '#f87171' }}
            />
            <span
              className="rules-file__dot"
              style={{ background: '#fbbf24' }}
            />
            <span
              className="rules-file__dot"
              style={{ background: '#4ade80' }}
            />
            <span className="rules-file__name">AGENTS.md</span>
          </div>
          <div className="rules-file__body">
            {sections.map((s) => (
              <div key={s.label} className="rules-section">
                <span className="rules-section__label"># {s.label}</span>
                <pre className="rules-section__content">{s.content}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
