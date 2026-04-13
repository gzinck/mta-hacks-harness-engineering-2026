import './CoverSlide.css'

export function CoverSlide() {
  return (
    <div className="cover">
      <div className="cover__eyebrow">Volta Vibe Coding Meetup · April 2026</div>
      <h1 className="cover__title">
        <span className="cover__title-dim">AI</span> Harness
        <br />
        Engineering
      </h1>
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
      <div className="cover__author">
        <img
          className="cover__author-photo"
          src="/mta-hacks-harness-engineering-2026/profile.jpg"
          alt="Graeme Zinck"
        />
        <div className="cover__author-info">
          <span className="cover__author-name">Graeme Zinck</span>
          <span className="cover__author-role">Senior Software Engineer</span>
          <span className="cover__author-role">Lazer Technologies</span>
        </div>
      </div>
    </div>
  )
}
