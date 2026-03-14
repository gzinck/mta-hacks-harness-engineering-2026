import { type ComponentType } from 'react'
import { CoverSlide } from './00-cover/CoverSlide'
import { StateOfDevSlide } from './01-intro/StateOfDevSlide'
import { WhatIsHarnessSlide } from './01-intro/WhatIsHarnessSlide'
import { PromptingStrategiesSlide } from './02-prompt-engineering/PromptingStrategiesSlide'
import { MetapromptingExampleSlide } from './02-prompt-engineering/MetapromptingExampleSlide'
import { MetapromptingSlide } from './02-prompt-engineering/MetapromptingSlide'
import { ContextWindowSlide } from './03-harness/ContextWindowSlide'
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
  WhatIsHarnessSlide,
  PromptingStrategiesSlide,
  MetapromptingExampleSlide,
  MetapromptingSlide,
  ContextWindowSlide,
  ToolsSlide,
  RulesSlide,
  RulesMonorepoSlide,
  HooksSlide,
  SkillsSlide,
  ContextWindowProblemSlide,
  OrchestrationOverviewSlide,
  ClosingSlide,
]
