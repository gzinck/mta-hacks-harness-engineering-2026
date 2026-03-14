import { SlideLayout } from '../../components/SlideLayout'
import { SlideTitle } from '../../components/SlideTitle'
import { MetapromptingDemo } from './MetapromptingDemo'

const INPUT_TEXT = `Create a plan to refactor the auth utils to use async/await instead of .then() chains`

const OUTPUT_TEXT = `Here's a plan to refactor the auth utils to async/await:

Files to modify:
- src/auth/utils.ts (primary — all .then() chains)
- src/auth/session.ts (uses fetchUser — needs updating)
- tests/auth/utils.test.ts (mock async signatures)

Steps:
[ ] Identify all .then()/.catch() chains in utils.ts
[ ] Convert each to async/await with try/catch
[ ] Update callers in session.ts to await refactored fns
[ ] Run existing tests and fix any broken async mocks
[ ] Verify no unhandled promise rejections remain`

export function MetapromptingSlide() {
  return (
    <SlideLayout>
      <SlideTitle
        tag="02 · Prompt Engineering"
        title="Metaprompting"
        subtitle="Or use plan mode"
      />
      <MetapromptingDemo
        inputText={INPUT_TEXT}
        outputText={OUTPUT_TEXT}
        arrowLabel="Cursor writes the prompt"
      />
    </SlideLayout>
  )
}
