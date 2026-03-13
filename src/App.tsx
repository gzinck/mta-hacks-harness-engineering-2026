import { usePresentation } from './hooks/usePresentation'
import { ProgressBar } from './components/ProgressBar'
import { slides } from './slides'
import './App.css'

export function App() {
  const { currentIndex, total, next, prev, goTo } = usePresentation()
  const Slide = slides[currentIndex]

  return (
    <div className="app" onClick={next}>
      <div className="slide-wrapper" onClick={(e) => e.stopPropagation()}>
        <Slide />
      </div>
      <ProgressBar current={currentIndex} total={total} onDotClick={goTo} />
      <button
        className="nav-btn nav-btn--prev"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="nav-btn nav-btn--next"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label="Next slide"
      >
        ›
      </button>
    </div>
  )
}

export default App
