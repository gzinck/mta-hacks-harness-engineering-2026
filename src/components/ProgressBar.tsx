import './ProgressBar.css'

type Props = {
  current: number
  total: number
  onDotClick?: (index: number) => void
}

export function ProgressBar({ current, total, onDotClick }: Props) {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__fill"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />
      <div className="progress-bar__dots">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            className={`progress-bar__dot${i === current ? ' progress-bar__dot--active' : ''}`}
            onClick={() => onDotClick?.(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
