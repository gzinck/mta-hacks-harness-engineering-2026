import { type ComponentType } from 'react'
import { CoverSlide } from './00-cover/CoverSlide'
import { StateOfDevSlide } from './01-intro/StateOfDevSlide'
import { PromptingStrategiesSlide } from './02-prompt-engineering/PromptingStrategiesSlide'
import { MetapromptingSlide } from './02-prompt-engineering/MetapromptingSlide'
import { HarnessOverviewSlide } from './03-harness/HarnessOverviewSlide'
import { ContextWindowProblemSlide } from './03-harness/ContextWindowProblemSlide'
import { RulesSlide } from './03-harness/RulesSlide'
import { RulesMonorepoSlide } from './03-harness/RulesMonorepoSlide'
import { HooksSlide } from './03-harness/HooksSlide'
import { ToolsSlide } from './03-harness/ToolsSlide'
import { SkillsSlide } from './03-harness/SkillsSlide'
import { OrchestrationOverviewSlide } from './04-orchestration/OrchestrationOverviewSlide'
import { ClosingSlide } from './04-orchestration/ClosingSlide'

export const slides: ComponentType[] = [
  CoverSlide,
  StateOfDevSlide,
  PromptingStrategiesSlide,
  MetapromptingSlide,
  HarnessOverviewSlide,
  RulesSlide,
  RulesMonorepoSlide,
  HooksSlide,
  ToolsSlide,
  SkillsSlide,
  ContextWindowProblemSlide,
  OrchestrationOverviewSlide,
  ClosingSlide,
]
