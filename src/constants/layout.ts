export const NAVBAR_HEIGHT_PX = 92
export const NAVBAR_CSS_VAR = '--navbar-height'

/** Must match :root in globals.css */
export const LAYOUT_WIDTH_RATIO = 0.88
export const LAYOUT_MAX_WIDTH_PX = 1240

export function getLayoutMetrics(viewportWidth: number): {
  layoutWidth: number
  layoutGutter: number
} {
  const layoutWidth = Math.min(viewportWidth * LAYOUT_WIDTH_RATIO, LAYOUT_MAX_WIDTH_PX)
  const layoutGutter = Math.max(0, (viewportWidth - layoutWidth) / 2)
  return { layoutWidth, layoutGutter }
}

/** Horizontal scroll distance so the last card ends at the layout right edge */
export function getLayoutAlignedScrollDistance(
  trackScrollWidth: number,
  viewportWidth: number
): number {
  const { layoutWidth, layoutGutter } = getLayoutMetrics(viewportWidth)
  return Math.max(0, trackScrollWidth - layoutGutter - layoutWidth)
}
