'use client'

import { useMemo } from 'react'

import Particles, { ParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

import {
  HERO_PARTICLE_COUNT,
  HERO_PARTICLE_LINK_DISTANCE,
  HERO_PARTICLE_MOVE_SPEED,
} from '@/constants/hero'

import type { ISourceOptions } from '@tsparticles/engine'

export default function ParticlesBackground(): React.ReactNode {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: 'transparent' } },
      fpsLimit: 60,
      particles: {
        number: { value: HERO_PARTICLE_COUNT },
        color: { value: '#ffffff' },
        opacity: { value: { min: 0.03, max: 0.12 } },
        size: { value: { min: 1, max: 2 } },
        links: {
          enable: true,
          distance: HERO_PARTICLE_LINK_DISTANCE,
          color: '#ffffff',
          opacity: 0.05,
          width: 1,
        },
        move: {
          enable: true,
          speed: HERO_PARTICLE_MOVE_SPEED,
          random: true,
        },
      },
      interactivity: {
        detectsOn: 'window',
        events: {
          onHover: { enable: false },
          onClick: { enable: false },
          resize: { enable: true },
        },
      },
      detectRetina: true,
    }),
    []
  )

  return (
    <ParticlesProvider init={loadSlim}>
      <Particles
        id="hero-particles"
        className="absolute inset-0 h-full w-full"
        options={options}
        aria-hidden="true"
      />
    </ParticlesProvider>
  )
}
