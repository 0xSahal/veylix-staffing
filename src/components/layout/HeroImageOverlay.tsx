export const HERO_IMAGE_OVERLAY_GRADIENT =
  'linear-gradient(to bottom, #0F2246CC, #0F2246B3, #0F2246D9)'

export default function HeroImageOverlay(): React.ReactNode {
  return (
    <div
      className="absolute inset-0"
      style={{ backgroundImage: HERO_IMAGE_OVERLAY_GRADIENT }}
      aria-hidden
    />
  )
}
