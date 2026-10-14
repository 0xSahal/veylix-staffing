'use client'

import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import { Play } from 'lucide-react'

import { cn } from '@/lib/utils'

type LazyVideoProps = {
  src: string
  poster: string
  width: number
  height: number
  title: string
  duration: string
  sizes: string
  className?: string
}

export default function LazyVideo({
  src,
  poster,
  width,
  height,
  title,
  duration,
  sizes,
  className,
}: LazyVideoProps): React.ReactNode {
  const [started, setStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!started) return
    videoRef.current?.play().catch(() => undefined)
  }, [started])

  return (
    <div
      className={cn('relative overflow-hidden rounded-card bg-vx-navy', className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {started ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full bg-vx-navy object-contain"
          poster={poster}
          controls
          playsInline
          preload="auto"
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
          <a href={src}>Download the video ({duration})</a>
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setStarted(true)}
          className="group absolute inset-0 block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-vx-blue focus-visible:ring-offset-2"
          aria-label={`Play video: ${title}, ${duration}`}
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes={sizes}
            className="object-cover"
            loading="lazy"
          />
          <span
            className="absolute inset-0 bg-gradient-to-t from-vx-navy/60 via-transparent to-transparent"
            aria-hidden="true"
          />
          <span
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-vx-blue shadow-float transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-20 sm:w-20"
            aria-hidden="true"
          >
            <Play size={28} className="ml-1 fill-current" />
          </span>
          <span
            className="absolute bottom-4 left-4 rounded-full bg-vx-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            aria-hidden="true"
          >
            {duration}
          </span>
        </button>
      )}
    </div>
  )
}
