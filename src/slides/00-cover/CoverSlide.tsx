import './CoverSlide.css'

export function CoverSlide() {
  return (
    <div className="cover">
      <div className="cover__eyebrow">MTA Hacks · March 2026</div>
      <h1 className="cover__title">
        <span className="cover__title-dim">AI</span> Harness
        <br />
        Engineering
      </h1>
      <p className="cover__subtitle">
        Building the scaffolding that makes AI agents actually work
      </p>
      <div className="cover__topics">
        {[
          'Intro',
          'Prompt Engineering',
          'Harness Engineering',
          'Task Orchestration',
        ].map((t, i) => (
          <div key={t} className="cover__topic">
            <span className="cover__topic-num">0{i + 1}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
