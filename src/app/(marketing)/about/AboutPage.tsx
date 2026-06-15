'use client'

import { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Container } from '@/components/common/Container'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { heroImageClassName } from '@/lib/hero-image-position'
import { cn } from '@/lib/utils'

const SCROLL_START = 'top 82%'

function reconcileScrollAnimations(): void {
  ScrollTrigger.refresh()
  ScrollTrigger.getAll().forEach((trigger) => {
    const animation = trigger.animation
    if (!animation || trigger.progress <= 0) return
    if (animation.progress() < 1) {
      animation.progress(1)
    }
  })
}

const STATS = [
  { value: 500, suffix: '+', label: 'Placements made across North America' },
  { value: 98, suffix: '%', label: 'Client satisfaction rate' },
  { value: 150, suffix: '+', label: 'Active employer partnerships' },
  { value: 10, suffix: '+', label: 'Industries served' },
] as const

const VALUES = [
  {
    num: '01',
    title: 'Deep expertise, not just availability.',
    body: "Our recruiters specialize in your industry. We don't send a shortlist until we understand your tech stack, your culture, and what 'wrong hire' looks like for you.",
  },
  {
    num: '02',
    title: 'Relationships over transactions.',
    body: "We track every placement. Follow up at 30, 60, and 90 days. If a hire isn't working, we want to know, and we'll make it right.",
  },
  {
    num: '03',
    title: 'Radical transparency, always.',
    body: "You'll know exactly where every candidate stands. No vague timelines, no ghost updates. Honest answers, even when they're hard to give.",
  },
] as const

const DIFFERENCE_CARDS = [
  {
    title: 'Expert guidance at every step.',
    body: 'Personalized coaching, resume positioning, and interview prep from recruiters who know your market.',
    micro: 'Avg. 3 qualified interviews per shortlist',
  },
  {
    title: 'Connections that go beyond job boards.',
    body: '150+ partner companies built through a decade of consistent, honest delivery.',
    micro: '150+ active employer partnerships',
  },
  {
    title: 'No surprises. Ever.',
    body: 'Transparent timelines, honest feedback, and ethical practices on every engagement. Full stop.',
    micro: '98% client satisfaction',
  },
  {
    title: 'With you past the offer letter.',
    body: '30, 60, and 90-day follow-ups on every placement. A thriving hire is the finish line, not an accepted offer.',
    micro: '30/60/90-day check-ins, standard',
  },
] as const

export default function AboutPage(): React.ReactNode {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const root = containerRef.current
      if (!root) return

      const opener = root.querySelector('[data-animate="opener"]')
      if (opener) {
        gsap.from(opener, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power1.out',
          delay: 0.2,
        })
      }

      const bandLabel = root.querySelector('[data-animate="band-label"]')
      if (bandLabel) {
        gsap.from(bandLabel, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: bandLabel,
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const editorialBand = root.querySelector('[data-animate="editorial-band"]')
      if (editorialBand) {
        gsap.from(editorialBand, {
          opacity: 0,
          duration: 0.8,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: editorialBand,
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const storyText = root.querySelector('[data-animate="story-text"]')
      const storyImage = root.querySelector('[data-animate="story-image"]')
      if (storyText) {
        gsap.from(storyText, {
          x: -24,
          opacity: 0,
          duration: 0.65,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: storyText,
            start: SCROLL_START,
            once: true,
          },
        })
      }
      if (storyImage) {
        gsap.from(storyImage, {
          x: 24,
          opacity: 0,
          duration: 0.65,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: storyImage,
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const statItems = root.querySelectorAll('[data-animate="stat"]')
      if (statItems.length) {
        gsap.from(statItems, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: root.querySelector('[data-animate="stats-grid"]'),
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const valueRows = root.querySelectorAll('[data-animate="value-row"]')
      if (valueRows.length) {
        gsap.from(valueRows, {
          y: 16,
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: root.querySelector('[data-animate="values-list"]'),
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const missionHeadline = root.querySelector('[data-animate="mission-headline"]')
      const missionCols = root.querySelectorAll('[data-animate="mission-col"]')
      if (missionHeadline) {
        gsap.from(missionHeadline, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: missionHeadline,
            start: SCROLL_START,
            once: true,
          },
        })
      }
      if (missionCols.length) {
        gsap.from(missionCols, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: root.querySelector('[data-animate="mission-cols"]'),
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const diffGrid = root.querySelector('[data-animate="diff-grid"]')
      const diffCards = root.querySelectorAll('[data-animate="diff-card"]')
      if (diffGrid && diffCards.length) {
        gsap.set(diffCards, { opacity: 1, clearProps: 'opacity' })
        gsap.from(diffCards, {
          y: 20,
          duration: 0.6,
          ease: 'power1.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: diffGrid,
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const teamImage = root.querySelector('[data-animate="team-image"]')
      const teamText = root.querySelector('[data-animate="team-text"]')
      if (teamImage) {
        gsap.from(teamImage, {
          x: -24,
          opacity: 0,
          duration: 0.65,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: teamImage,
            start: SCROLL_START,
            once: true,
          },
        })
      }
      if (teamText) {
        gsap.from(teamText, {
          x: 24,
          opacity: 0,
          duration: 0.65,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: teamText,
            start: SCROLL_START,
            once: true,
          },
        })
      }

      const closingCta = root.querySelector('[data-animate="closing-cta"]')
      if (closingCta) {
        gsap.from(closingCta, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: closingCta,
            start: SCROLL_START,
            once: true,
          },
        })
      }
    }, containerRef)

    const refreshFrame = window.requestAnimationFrame(reconcileScrollAnimations)
    const refreshTimeouts = [
      window.setTimeout(reconcileScrollAnimations, 300),
      window.setTimeout(reconcileScrollAnimations, 800),
      window.setTimeout(reconcileScrollAnimations, 2400),
    ]
    window.addEventListener('load', reconcileScrollAnimations)

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshTimeouts.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('load', reconcileScrollAnimations)
      ctx.revert()
    }
  }, [prefersReduced])

  return (
    <main ref={containerRef}>
      {/* Section 1: Page Opener */}
      <section className="relative overflow-hidden bg-white">
        {/*
          ============================================================
          CHATGPT IMAGE GENERATION PROMPT
          File to save as: /public/images/about-hero.png
          Aspect ratio: 16:9 (landscape), use 1792x1024 in ChatGPT
          ============================================================
          Prompt to use in ChatGPT (DALL-E 3):
          "Corporate editorial photograph for a staffing company
          website. A professional in a sharp navy blazer sits at a
          modern glass desk in a bright, open-plan office with large
          floor-to-ceiling windows. Natural sunlight streams in from
          the right side. A second person stands behind, pointing at
          a laptop screen in a collaborative discussion. The office
          interior has clean white walls, light wood furniture, and
          subtle navy blue accents. Shallow depth of field with soft
          bokeh in the background. Editorial photography style,
          candid not posed, warm and confident atmosphere.
          Photorealistic, high resolution, no text, no watermark,
          no logos. Wide horizontal composition, 16:9 ratio."
          ============================================================
        */}
        <div className="absolute inset-y-0 right-0 z-[1] hidden w-[45%] md:block">
          <div className="relative h-full w-full">
            <Image
              src="/images/about-hero.png"
              alt="Veylix Staffing professionals"
              fill
              className={heroImageClassName('/images/about-hero.png')}
              sizes="45vw"
              priority
            />
            <div
              className="absolute inset-0 z-[2]"
              style={{
                background:
                  'linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.75) 30%, rgba(255,255,255,0.1) 100%)',
              }}
              aria-hidden
            />
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full opacity-[0.35] md:w-[55%]"
          style={{
            backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="container-vx relative z-10 pb-16 pt-24 md:min-h-[28rem] md:pb-[100px] md:pt-[120px]">
          <div data-animate="opener" className="relative z-10 w-full md:w-[55%]">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.15em] text-[#1A6EDC]">
              About Veylix Staffing
            </p>
            <h1 className="mt-6 font-display text-[32px] font-bold leading-[1.1] text-[#0F2246] sm:text-[40px] md:text-[4.5rem]">
              Staffing built on expertise,{' '}
              <span className="italic text-[#1A6EDC]">not just availability.</span>
            </h1>
            <div className="my-8 h-[3px] w-12 bg-[#1A6EDC]" aria-hidden />
            <p className="max-w-[620px] font-body text-lg leading-[1.8] text-[#475569]">
              Since {siteConfig.foundedYear}, Veylix Staffing has connected exceptional
              talent with growing companies across North America, in IT, engineering,
              healthcare, and professional services. We measure success in retained
              placements, not filled seats.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Editorial Image Band */}
      <section className="bg-[#F8FAFC]">
        <Container className="pt-16 md:pt-20">
          <p
            data-animate="band-label"
            className="font-body text-[13px] font-semibold uppercase tracking-[0.15em] text-[#1A6EDC]"
          >
            Our Team at Work
          </p>
          <p className="mt-3 max-w-[640px] font-body text-base leading-[1.8] text-[#475569]">
            Connecting talent across North America since {siteConfig.foundedYear}.
          </p>
        </Container>
        <div
          data-animate="editorial-band"
          className="relative mt-8 h-60 w-full overflow-hidden md:mt-10 md:h-[480px]"
        >
          <Image
            src="/images/about-sitting-group.webp"
            alt="Veylix Staffing professionals collaborating in a modern conference room"
            fill
            className="object-cover object-center md:object-[center_30%]"
            sizes="100vw"
          />
          <div className="absolute bottom-6 left-6 z-10 rounded-lg border-l-[3px] border-l-[#1A6EDC] bg-white px-6 py-4 md:bottom-8 md:left-16">
            <p className="font-display text-[15px] font-bold text-[#0F2246]">
              Veylix Staffing
            </p>
            <p className="mt-0.5 font-body text-[13px] text-[#64748B]">
              Cheyenne, Wyoming · Est. {siteConfig.foundedYear}
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Story */}
      <section className="bg-white py-16 lg:py-[100px]">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <div data-animate="story-text">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#1A6EDC]">
              Our Story
            </p>
            <h2 className="mt-4 font-display text-[28px] font-bold leading-[1.2] text-[#0F2246] sm:text-[36px] lg:text-[40px]">
              We don&apos;t just fill roles.
              <br />
              We build teams that last.
            </h2>
            <p className="mt-6 font-body text-base leading-[1.9] text-[#475569]">
              Veylix was founded on a simple frustration: too many recruiters were
              prioritizing speed over fit, sending available candidates instead of right
              ones, and burning trust on both sides of the hire.
            </p>
            <p className="mt-5 font-body text-base leading-[1.9] text-[#475569]">
              We built something different. A firm where recruiters specialize in the
              industries they hire for. Where every search starts with understanding, not
              a keyword match. Where we follow up at 30, 60, and 90 days because a
              successful placement means a thriving one.
            </p>
            <Link
              href={routes.employers}
              className="mt-8 inline-block border-b border-[#1A6EDC] pb-0.5 font-body text-sm font-semibold text-[#0F2246] transition-colors hover:text-[#1A6EDC]"
            >
              See how we work →
            </Link>
          </div>
          <div data-animate="story-image">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/recruting-interview.webp"
                alt="Veylix recruiter in a focused interview with a candidate"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: By the Numbers */}
      <section className="border-y border-[#E2E8F0] bg-[#F0F4FA] py-20">
        <Container>
          <p className="mb-12 text-center font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#1A6EDC]">
            Veylix by the Numbers
          </p>
          <div
            data-animate="stats-grid"
            className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:gap-y-0"
          >
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                data-animate="stat"
                className={cn(
                  'flex flex-col items-center px-4 text-center md:px-8 lg:px-12',
                  index < STATS.length - 1 && 'lg:border-r lg:border-[#CBD5E1]'
                )}
              >
                <p className="font-display text-[40px] font-bold leading-none text-[#0F2246] sm:text-[52px] md:text-[64px]">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                </p>
                <div className="mx-auto my-3 h-0.5 w-6 bg-[#1A6EDC]" aria-hidden />
                <p className="mx-auto max-w-[160px] font-body text-sm leading-snug text-[#64748B]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: What We Believe */}
      <section className="bg-white py-16 lg:py-[100px]">
        <Container className="flex flex-col gap-12 md:flex-row md:gap-16">
          <div className="md:sticky md:top-28 md:w-[35%] md:self-start">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#1A6EDC]">
              What We Believe
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.2] text-[#0F2246]">
              Three principles that guide every search.
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-[#64748B]">
              Not policies. Not procedures. The actual beliefs that shape how we recruit.
            </p>
          </div>
          <div data-animate="values-list" className="md:w-[65%]">
            {VALUES.map((value) => (
              <div
                key={value.num}
                data-animate="value-row"
                className="group border-t border-[#E2E8F0] py-9 transition-colors duration-200 hover:bg-[#F8FAFC]"
              >
                <div className="flex gap-6 md:gap-10">
                  <span className="flex shrink-0 items-center gap-3 font-display text-[13px] font-bold text-[#1A6EDC]">
                    <span className="h-6 w-[3px] rounded-full bg-[#1A6EDC]" aria-hidden />
                    {value.num}
                  </span>
                  <div className="min-w-0 flex-1 pr-4 md:pr-16">
                    <h3 className="font-display text-xl font-bold text-[#0F2246] transition-colors duration-200 group-hover:text-[#1A6EDC]">
                      {value.title}
                    </h3>
                    <p className="mt-2 font-body text-[15px] leading-relaxed text-[#64748B]">
                      {value.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 6: Mission Strip */}
      <section className="bg-[#0F2246] py-20">
        <Container className="text-center">
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#60A5FA]">
            Our Purpose
          </p>
          <h2
            data-animate="mission-headline"
            className="mx-auto mt-6 max-w-[700px] font-display text-[30px] font-bold leading-[1.2] text-white sm:text-[38px] lg:text-[44px]"
          >
            Connect outstanding talent with teams that deserve them.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] font-body text-base leading-[1.8] text-[#CBD5E1]">
            Every search we take on is a commitment to both sides of the table: the
            company building something that matters, and the person ready for what comes
            next.
          </p>
          <div
            className="mx-auto mt-12 h-px w-full max-w-3xl bg-white/[0.08]"
            aria-hidden
          />
          <div
            data-animate="mission-cols"
            className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-12 text-left md:grid-cols-2 md:gap-20"
          >
            <div data-animate="mission-col">
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#60A5FA]">
                Mission
              </p>
              <p className="mt-3 max-w-[340px] font-body text-base leading-[1.8] text-[#94A3B8]">
                We exist to make the right hire possible, for the business scaling fast
                and for the person ready for their next chapter.
              </p>
            </div>
            <div data-animate="mission-col">
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#60A5FA]">
                Vision
              </p>
              <p className="mt-3 max-w-[340px] font-body text-base leading-[1.8] text-[#94A3B8]">
                To be the most trusted staffing partner in North America, not the biggest,
                but the one every serious company calls first.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 7: The Veylix Difference */}
      <section className="bg-[#F8FAFC] py-16 lg:py-[100px]">
        <Container>
          <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#1A6EDC]">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-display text-[28px] font-bold text-[#0F2246] sm:text-[36px] lg:text-[40px]">
            The Veylix difference.
          </h2>
          <div
            data-animate="diff-grid"
            className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2"
          >
            {DIFFERENCE_CARDS.map((card) => (
              <article
                key={card.title}
                data-animate="diff-card"
                className="flex h-full flex-col rounded-xl border border-t-[3px] border-[#E2E8F0] border-t-[#1A6EDC] bg-white p-8 transition-all duration-300 hover:border-[#BFDBFE] hover:shadow-md"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF] font-display text-lg text-[#1A6EDC]"
                  aria-hidden
                >
                  ○
                </div>
                <h3 className="mt-5 font-display text-[17px] font-bold text-[#0F2246]">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-[1.7] text-[#64748B]">
                  {card.body}
                </p>
                <p className="mt-4 border-t border-[#F1F5F9] pt-4 font-body text-[13px] font-semibold text-[#1A6EDC]">
                  {card.micro}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 8: Team Teaser */}
      <section className="bg-white py-16 lg:py-[100px]">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <div data-animate="team-image">
            <div className="relative aspect-[3/4] max-h-[400px] w-full overflow-hidden rounded-xl shadow-lg md:max-h-none">
              <Image
                src="/images/the-people-behind-veylix.webp"
                alt="The people behind Veylix Staffing"
                fill
                className="object-cover object-top md:object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div data-animate="team-text" className="md:py-4">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.12em] text-[#1A6EDC]">
              The People Behind Veylix
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.2] text-[#0F2246] md:text-4xl">
              Recruiters who&apos;ve worked in your industry.
            </h2>
            <p className="mt-5 font-body text-base leading-[1.8] text-[#475569]">
              Every Veylix recruiter brings direct professional experience in the fields
              they hire for. We don&apos;t just read résumés. We understand what&apos;s in
              them, what&apos;s missing, and what it takes to succeed.
            </p>
            <blockquote className="mt-8 border-l-[3px] border-l-[#1A6EDC] pl-5">
              <p className="font-body text-base italic leading-relaxed text-[#475569]">
                &ldquo;We built the team we wished existed when we were on the other side
                of the search.&rdquo;
              </p>
              <p className="mt-2 font-body text-[13px] text-[#94A3B8]">
                Veylix Founding Team
              </p>
            </blockquote>
            <Link
              href={routes.apply}
              className="mt-8 inline-block border-b border-[#1A6EDC] pb-0.5 font-body text-sm font-semibold text-[#1A6EDC] transition-opacity hover:opacity-80"
            >
              Explore careers at Veylix →
            </Link>
          </div>
        </Container>
      </section>

      {/* Section 9: Closing CTA */}
      <section className="bg-[#0F2246] py-20 lg:py-28">
        <Container>
          <div data-animate="closing-cta" className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
              Ready to work with a firm that takes the right hire seriously?
            </h2>
            <p className="mt-5 font-body text-base text-[#CBD5E1]">
              Whether you&apos;re hiring or looking, we&apos;d like to understand your
              situation.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={routes.contact}
                className="inline-flex items-center justify-center rounded-md bg-[#1A6EDC] px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#1554b0]"
              >
                Talk to Our Team
              </Link>
              <Link
                href={routes.jobs}
                className="inline-flex items-center justify-center rounded-md border-[1.5px] border-white bg-transparent px-7 py-3.5 font-body text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-[#0F2246]"
              >
                Browse Open Roles
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
