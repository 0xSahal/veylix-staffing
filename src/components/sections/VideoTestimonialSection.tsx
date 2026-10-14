import Link from 'next/link'

import { ArrowRight, Captions, Clock } from 'lucide-react'

import LazyVideo from '@/components/ui/LazyVideo'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { candidateStoryVideo } from '@/constants/pages/testimonials-page'

const video = candidateStoryVideo

const videoJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: video.title,
  description: video.description,
  thumbnailUrl: [`${siteConfig.url}${video.poster}`],
  uploadDate: video.uploadDate,
  duration: video.durationIso,
  contentUrl: `${siteConfig.url}${video.src}`,
}

export default function VideoTestimonialSection(): React.ReactNode {
  return (
    <section className="section-vx bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="container-vx grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
        <div className="max-w-xl">
          <span className="section-label">CANDIDATE STORY</span>
          <h2 className="heading-h2 mt-4 text-vx-navy">
            Hear it straight from a candidate.
          </h2>
          <p className="mt-5 font-body text-lg leading-relaxed text-vx-muted">
            One job seeker walks through their search, what changed once they started
            working with {siteConfig.shortName}, and how they landed their next role in
            site reliability engineering.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-vx-body">
            <li className="inline-flex items-center gap-2">
              <Clock size={16} className="text-vx-blue" aria-hidden="true" />
              {video.duration} watch
            </li>
            <li className="inline-flex items-center gap-2">
              <Captions size={16} className="text-vx-blue" aria-hidden="true" />
              Captions on screen
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={routes.apply} className="btn-primary">
              Apply now
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href={routes.jobs} className="btn-ghost">
              Browse job openings
            </Link>
          </div>
        </div>

        <LazyVideo
          src={video.src}
          poster={video.poster}
          width={video.width}
          height={video.height}
          title={video.title}
          duration={video.duration}
          sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 80vw"
          className="mx-auto w-full max-w-[300px] shadow-float sm:max-w-[320px] lg:mx-0 lg:max-w-[340px]"
        />
      </div>
    </section>
  )
}
