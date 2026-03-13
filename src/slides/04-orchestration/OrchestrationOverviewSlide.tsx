import { useState, useEffect, useRef } from 'react'
import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import './OrchestrationOverviewSlide.css'

type Segment = { start: number; end: number; color: string }

const AGENTS: { id: string; name: string; segments: Segment[] }[] = [
  {
    id: 'orchestrator',
    name: 'Orchestrator',
    segments: [
      { start: 0, end: 0.16, color: 'var(--accent)' },
      { start: 0.62, end: 0.68, color: 'var(--accent)' },
      { start: 0.82, end: 1.0, color: 'var(--accent)' },
    ],
  },
  {
    id: 'frontend',
    name: 'Frontend Agent',
    segments: [{ start: 0.16, end: 0.55, color: 'var(--yellow)' }],
  },
  {
    id: 'backend',
    name: 'Backend Agent',
    segments: [{ start: 0.16, end: 0.62, color: 'var(--green)' }],
  },
  {
    id: 'tests',
    name: 'Test Agent',
    segments: [{ start: 0.68, end: 0.82, color: '#c084fc' }],
  },
]

const DURATION = 4500

export function OrchestrationOverviewSlide() {
  const [progress, setProgress] = useState(0)
  const [running, setRunning] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  function startAnimation() {
    if (running) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setRunning(true)
    setProgress(0)
    startTimeRef.current = null

    function tick(now: number) {
      if (!startTimeRef.current) startTimeRef.current = now
      const p = Math.min((now - startTimeRef.current) / DURATION, 1)
      setProgress(p)
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setRunning(false)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  function isActive(segments: Segment[], p: number) {
    return segments.some(s => p >= s.start && p <= s.end)
  }

  return (
    <SlideLayout>
      <SlideTitle tag="04 · Task Orchestration" title="Subagents" />
      <div className="orch-container">
        <div className="orch-timeline" onClick={startAnimation}>
          <div className="orch-rows">
            {AGENTS.slice(0, 1).map(agent => {
              const active = isActive(agent.segments, progress)
              return (
                <div key={agent.id} className={`orch-row${active ? ' orch-row--active' : ''}`}>
                  <div className="orch-row__label">{agent.name}</div>
                  <div className="orch-row__track">
                    {agent.segments.map((seg, i) => {
                      const leftPct = seg.start * 100
                      const filledWidth = Math.max(0, Math.min(progress, seg.end) - seg.start) * 100
                      const isDone = progress > seg.end
                      const isCurrent = progress >= seg.start && progress <= seg.end
                      return (
                        <div
                          key={i}
                          className="orch-segment"
                          style={{
                            left: `${leftPct}%`,
                            width: `${filledWidth}%`,
                            background: seg.color,
                            opacity: isDone ? 0.28 : isCurrent ? 1 : 0,
                            boxShadow: isCurrent ? `0 0 12px ${seg.color}` : 'none',
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className="orch-divider">
              <span className="orch-divider__label">subagents</span>
            </div>
            {AGENTS.slice(1).map(agent => {
              const active = isActive(agent.segments, progress)
              return (
                <div key={agent.id} className={`orch-row${active ? ' orch-row--active' : ''}`}>
                  <div className="orch-row__label">{agent.name}</div>
                  <div className="orch-row__track">
                    {agent.segments.map((seg, i) => {
                      const leftPct = seg.start * 100
                      const filledWidth = Math.max(0, Math.min(progress, seg.end) - seg.start) * 100
                      const isDone = progress > seg.end
                      const isCurrent = progress >= seg.start && progress <= seg.end
                      return (
                        <div
                          key={i}
                          className="orch-segment"
                          style={{
                            left: `${leftPct}%`,
                            width: `${filledWidth}%`,
                            background: seg.color,
                            opacity: isDone ? 0.28 : isCurrent ? 1 : 0,
                            boxShadow: isCurrent ? `0 0 12px ${seg.color}` : 'none',
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div
              className="orch-cursor"
              style={{ left: `calc(var(--label-w) + ${progress} * (100% - var(--label-w)))` }}
            />
          </div>
          <p className="orch-hint">
            {running ? 'Running\u2026' : progress >= 1 ? 'Click to replay' : 'Click to simulate'}
          </p>
        </div>

        <div className="orch-points">
          <div className="orch-point">
            <span className="orch-point__icon" style={{ color: 'var(--accent)' }}>◆</span>
            <div>
              <strong>Context window isolation</strong>
              <p>Each subagent has its own context — the main agent never hits its limit</p>
            </div>
          </div>
          <div className="orch-point">
            <span className="orch-point__icon" style={{ color: 'var(--yellow)' }}>◆</span>
            <div>
              <strong>Parallel subagents</strong>
              <p>Prompt the agent to spawn multiple subagents simultaneously to gather info or make changes</p>
            </div>
          </div>
          <div className="orch-point">
            <span className="orch-point__icon" style={{ color: 'var(--green)' }}>◆</span>
            <div>
              <strong>Results flow back up</strong>
              <p>Subagents complete their work and report back — the orchestrator synthesizes and acts</p>
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
