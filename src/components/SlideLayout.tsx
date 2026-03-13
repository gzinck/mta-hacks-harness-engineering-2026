import { type ReactNode } from 'react'
import './SlideLayout.css'

type Props = {
  children: ReactNode
  centered?: boolean
}

export function SlideLayout({ children, centered }: Props) {
  return (
    <div className={`slide-layout${centered ? ' slide-layout--centered' : ''}`}>
      {children}
    </div>
  )
}
