import Image from 'next/image'

import { Quote, Star } from 'lucide-react'

export type TestimonialData = {
  quote: string
  name: string
  title: string
  avatarSeed: string
}

export default function TestimonialCard({
  quote,
  name,
  title,
  avatarSeed,
}: TestimonialData): React.ReactNode {
  return (
    <article className="flex h-full flex-col rounded-card border border-vx-border bg-white p-6 shadow-card">
      <Quote size={32} className="text-vx-blue/30" aria-hidden />
      <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-vx-body">
        {quote}
      </p>
      <div className="mt-6 flex items-center gap-4 border-t border-vx-border pt-6">
        <Image
          src={`https://i.pravatar.cc/80?u=${avatarSeed}`}
          alt=""
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-display font-semibold text-vx-navy">{name}</p>
          <p className="text-sm text-vx-muted">{title}</p>
          <div className="mt-1 flex gap-0.5" aria-label="5 out of 5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={`${name}-star-${i + 1}`}
                size={14}
                className="fill-vx-gold text-vx-gold"
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
