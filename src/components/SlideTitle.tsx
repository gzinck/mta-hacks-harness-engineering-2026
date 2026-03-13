import './SlideTitle.css'

type Props = {
  tag?: string
  title: string
  subtitle?: string
}

export function SlideTitle({ tag, title, subtitle }: Props) {
  return (
    <div className="slide-title">
      {tag && <span className="slide-title__tag">{tag}</span>}
      <h1 className="slide-title__heading">{title}</h1>
      {subtitle && <p className="slide-title__subtitle">{subtitle}</p>}
    </div>
  )
}
