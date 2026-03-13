import './ClosingSlide.css'

const items = [
  { label: 'Prompting', color: 'var(--accent)' },
  { label: 'Rules',     color: 'var(--green)' },
  { label: 'Hooks',     color: 'var(--yellow)' },
  { label: 'Tools',     color: '#38bdf8' },
  { label: 'Skills',    color: '#f472b6' },
  { label: 'Subagents', color: 'var(--red)' },
]

export function ClosingSlide() {
  return (
    <div className="closing">
      <div className="closing__grid">
        {items.map(({ label, color }) => (
          <div key={label} className="closing__card" style={{ '--card-color': color } as React.CSSProperties}>
            <div className="closing__card-bar" />
            <span className="closing__card-label">{label}</span>
          </div>
        ))}
      </div>
      <p className="closing__caveat">This changes daily.</p>
    </div>
  )
}
