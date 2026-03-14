import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import { MetapromptingDemo } from './MetapromptingDemo'

const INPUT_TEXT = `I'm trying to do a refactor of my audio processing pipeline to remove repetition. Create a prompt that would help an agent refactor my code. Look through my codebase to understand what's going on, then look through the web. Ask me questions. Then, give me a prompt.`

const OUTPUT_TEXT = `You are a senior engineer refactoring an audio processing pipeline.

Steps:
1. Glob src/audio/**/* — identify repeated patterns
   and shared logic across processors
2. Web search: "audio pipeline abstraction patterns"
3. Ask the user:
   - Which audio formats does the pipeline support?
   - Are there real-time latency constraints?
   - Incremental refactor or full rewrite preferred?
4. Write a refactoring plan: file targets, a recommended
   abstraction (processor chain, plugin interface, etc.),
   and a migration order that keeps tests green.`

export function MetapromptingExampleSlide() {
  return (
    <SlideLayout>
      <SlideTitle
        tag="02 · Prompt Engineering"
        title="Metaprompting"
        subtitle="Describe a goal — AI writes the prompt"
      />
      <MetapromptingDemo
        inputText={INPUT_TEXT}
        outputText={OUTPUT_TEXT}
        arrowLabel="Cursor writes the prompt"
      />
    </SlideLayout>
  )
}
