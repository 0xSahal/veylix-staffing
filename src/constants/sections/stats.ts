export type StatItem = {
  end: number
  suffix: string
  label: string
  decimals?: number
}

export const STATS: StatItem[] = [
  { end: 500, suffix: '+', label: 'People placed' },
  { end: 250, suffix: '+', label: 'Companies we work with' },
  { end: 15, suffix: '+', label: 'Industries we hire in' },
  { end: 98, suffix: '%', label: 'Still there at 90 days' },
  { end: 72, suffix: 'hrs', label: 'Typical shortlist time' },
]
