import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Img } from '@/components/img'
import { collections } from '@/content/products'
import { site } from '@/content/site'
import { seo } from '@/lib/seo'
import { useReveal } from '@/lib/use-reveal'
import { useSequence } from '@/lib/use-sequence'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'Rings, Bespoke Watches & Leather Straps',
      description: site.description,
      path: '/',
    }),
  component: Home,
})

const SLIDE_MS = 6500

function Home() {
  useReveal()
  return (
    <>
      <Hero />
      <CollectionIndex />
      <Statement />
    </>
  )
}

function Hero() {
  const slides = site.home.heroImages
  const { active, next, goTo, keyFor } = useSequence(slides.length)

  useEffect(() => {
    const id = window.setTimeout(next, SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [active])

  return (
    <section className="grain relative flex min-h-[100svh] flex-col overflow-hidden" aria-label="Introduction">
      {/* Autoplay loop: slow push-in with crossfades */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              'absolute inset-0 transition-opacity duration-[2200ms] [transition-timing-function:var(--ease-lux)]',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div
              key={keyFor(i)}
              className="h-full w-full"
              style={{ animation: `kenburns ${SLIDE_MS + 2200}ms linear both` }}
            >
              <Img
                src={slide.src}
                alt={slide.alt}
                sizes="100vw"
                widths={[800, 1280, 1920, 2560]}
                priority={i === 0}
                className="object-[70%_center] md:object-center"
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Architectural column lines */}
      <div className="pointer-events-none absolute inset-0 mx-auto hidden max-w-content grid-cols-4 px-10 md:grid" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="animate-fade border-l border-foreground/[0.07] last:border-r" style={{ animationDelay: `${0.3 + i * 0.15}s` }} />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-content flex-1 flex-col justify-end px-6 pb-14 pt-32 md:px-10 md:pb-20">
        <p className="label animate-fade mb-8 flex items-center gap-4 text-primary" style={{ animationDelay: '0.2s' }}>
          <span className="h-px w-10 bg-primary" />
          {site.home.eyebrow}
        </p>
        <h1 className="text-[clamp(4.25rem,14vw,13.5rem)] leading-[0.86]">
          {site.home.headline.map((word, i) => (
            <span key={word} className="block overflow-hidden pb-[0.06em]">
              <span
                className={cn('animate-rise block', i === 1 && 'italic text-primary md:pl-[1.2em]')}
                style={{ animationDelay: `${0.35 + i * 0.15}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-4">
          <p
            className="animate-fade max-w-md text-base leading-relaxed text-foreground/75 md:col-span-2 md:text-lg"
            style={{ animationDelay: '0.9s' }}
          >
            {site.home.statement}
          </p>
          <div className="animate-fade flex items-end md:col-span-2 md:justify-end" style={{ animationDelay: '1.1s' }}>
            <Link
              to="/gallery"
              className="group relative inline-flex items-center gap-6 border border-foreground/40 py-5 pl-8 pr-6 transition-colors duration-700 hover:border-primary"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-primary transition-transform duration-700 [transition-timing-function:var(--ease-lux)] group-hover:scale-y-100" />
              <span className="label relative transition-colors duration-500 group-hover:text-primary-foreground">
                {site.home.cta}
              </span>
              <span className="relative flex size-9 items-center justify-center overflow-hidden border-l border-foreground/30 pl-5 transition-colors group-hover:border-primary-foreground/30 group-hover:text-primary-foreground">
                <ArrowRight className="size-4 transition-transform duration-700 group-hover:translate-x-1" strokeWidth={1.25} />
              </span>
            </Link>
          </div>
        </div>

        {/* Slide progress */}
        <div className="mt-14 grid grid-cols-3 gap-4 md:mt-20 md:gap-10">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              className="group text-left"
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
            >
              <span className="relative block h-px w-full overflow-hidden bg-foreground/15">
                {i === active && (
                  <span
                    key={active}
                    className="absolute inset-0 origin-left bg-foreground"
                    style={{ animation: `progress ${SLIDE_MS}ms linear both` }}
                  />
                )}
              </span>
              <span className={cn('label mt-3 hidden transition-colors sm:block', i === active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground')}>
                {String(i + 1).padStart(2, '0')} — {slide.caption}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

const covers = ['/img/ring-1.png', '/img/watch-1.png', '/img/strap-2.png']

function CollectionIndex() {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <section className="relative border-t border-border" aria-labelledby="index-title">
      <div className="mx-auto max-w-content px-6 py-24 md:px-10 md:py-36">
        <div className="reveal mb-14 flex items-end justify-between gap-6 md:mb-20">
          <h2 id="index-title" className="label text-muted-foreground">
            Three disciplines
          </h2>
          <span className="label text-muted-foreground">Index</span>
        </div>

        <div className="relative">
          {/* Floating preview on desktop */}
          <div className="pointer-events-none absolute right-[8%] top-1/2 z-10 hidden aspect-[4/5] w-[22rem] -translate-y-1/2 overflow-hidden lg:block" aria-hidden="true">
            {covers.map((src, i) => (
              <div
                key={src}
                className={cn(
                  'absolute inset-0 transition-all duration-1000 [transition-timing-function:var(--ease-lux)]',
                  hover === i ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
                )}
              >
                <Img src={src} alt="" sizes="352px" ratio={1.25} widths={[400, 720]} />
              </div>
            ))}
          </div>

          <ul className="border-t border-border">
            {collections.map((c, i) => (
              <li key={c.id} className="reveal border-b border-border" style={{ transitionDelay: `${i * 90}ms` }}>
                <Link
                  to="/gallery"
                  hash={c.id}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-8 md:grid-cols-[6rem_1fr_16rem_auto] md:py-12"
                >
                  <span className="label text-muted-foreground transition-colors duration-500 group-hover:text-primary">{c.index}</span>
                  <span className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-none transition-transform duration-1000 [transition-timing-function:var(--ease-lux)] group-hover:translate-x-4 group-hover:italic">
                    {c.title}
                  </span>
                  <span className="hidden text-sm text-muted-foreground md:block">{c.kicker}</span>
                  <ArrowRight className="size-5 -translate-x-2 text-primary opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.25} />
                </Link>
                <div className="pb-8 md:hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Img src={covers[i]} alt={c.items[0].alt} sizes="100vw" ratio={0.625} widths={[480, 800]} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Statement() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto grid max-w-content gap-10 px-6 py-24 md:grid-cols-12 md:px-10 md:py-40">
        <p className="label reveal text-primary md:col-span-3">Our promise</p>
        <blockquote className="reveal md:col-span-9">
          <p className="font-display text-[clamp(2.2rem,5vw,4.75rem)] leading-[1.05]">
            Nothing is made in advance. <span className="italic text-foreground/50">Nothing is made twice exactly the same.</span>
          </p>
          <div className="rule-draw mt-12 h-px w-full bg-border" />
          <footer className="mt-6 flex flex-wrap justify-between gap-4 text-sm text-muted-foreground">
            <span>Made to order · Lifetime servicing</span>
            <Link to="/about" className="transition-colors hover:text-primary">
              The atelier →
            </Link>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
