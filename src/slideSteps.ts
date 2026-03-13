/**
 * Slides can register handlers here to consume "next"/"prev" presses for
 * internal step animations before the global slide navigation fires.
 *
 * Handlers should return true if they consumed the event (step advanced),
 * or false if the navigation should proceed normally.
 */
export const slideSteps = {
  handler: null as (() => boolean) | null,
  prevHandler: null as (() => boolean) | null,
}
