import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Pause, Play } from 'lucide-react'

import { Img } from '@/components/img'
import { site } from '@/content/site'
import { seo } from '@/lib/seo'
import { useReveal } from '@/lib/use-reveal'
import { useSequence } from '@/lib/use-sequence'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'The Atelier — Our Story & Craftsmanship',
      description:
        'Inside the Aurel studio: how we cast rings, assemble bespoke watches and hand-stitch leather straps, one piece and one maker at a time.',
      path: '/about',
      image: '/img/studio-1.png',
    }),
  component: About,
})

function About() {
  useReveal()
  const { about } = site
  return (
    <>
      <header className="mx-auto max-w-content px-6 pb-16 pt-36 md:px-10 md:pt-48">
        <p className="label animate-fade mb-8 flex items-center gap-4 text-primary">
          <span className="h-px w-10 bg-primary" /> {about.eyebrow}
        </p>
        <h1 className="max-w-5xl text-[clamp(3.25rem,9vw,9rem)] leading-[0.9]">
          <span className="block overflow-hidden"><span className="animate-rise block">Fewer things,</span></span>
          <span className="block overflow-hidden"><span className="animate-rise block italic text-primary" style={{ animationDelay: '0.12s' }}>made better.</span></span>
        </h1>
      </header>

      <figure className="grain relative mx-auto max-w-content px-6 md:px-10">
        <div className="animate-fade aspect-[4/5] overflow-hidden sm:aspect-[16/8]" style={{ animationDelay: '0.4s' }}>
          <Img src={about.studio[0].src} alt={about.studio[0].alt} sizes="100vw" widths={[640, 1024, 1600, 2200]} priority />
        </div>
        <figcaption className="label mt-4 flex justify-between text-muted-foreground">
          <span>{about.studio[0].caption}</span>
          <span>Fig. 01</span>
        </figcaption>
      </figure>

      <section className="mx-auto grid max-w-content gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36" aria-label="Our story">
        <p className="label reveal text-muted-foreground md:col-span-3">Our story</p>
        <div className="md:col-span-9">
          <p className="reveal font-display text-[clamp(2rem,4.2vw,3.75rem)] leading-[1.08]">{about.intro}</p>
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
            {about.story.map((p, i) => (
              <p key={i} className={cn('reveal leading-relaxed text-foreground/70', i === 2 && 'font-display text-2xl italic text-foreground md:col-span-2')}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border" aria-label="Principles">
        <ol className="mx-auto grid max-w-content md:grid-cols-3">
          {about.principles.map((p, i) => (
            <li
              key={p.title}
              className="reveal border-b border-border px-6 py-12 last:border-b-0 md:border-b-0 md:border-l md:px-10 md:py-16 md:first:border-l-0"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="label text-primary">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="mt-6 text-4xl">{p.title}</h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-content items-end gap-10 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36" aria-label="The studio">
        <div className="reveal md:col-span-5">
          <p className="label text-muted-foreground">The studio</p>
          <h2 className="mt-6 text-5xl leading-[1] md:text-6xl">
            One room. <span className="italic text-foreground/55">Every step.</span>
          </h2>
          <p className="mt-8 max-w-sm leading-relaxed text-muted-foreground">
            Casting, setting, assembly, cutting and stitching all happen within a few metres of each other — so nothing leaves our hands until it is ready for yours.
          </p>
        </div>
        <figure className="reveal md:col-span-6 md:col-start-7">
          <div className="aspect-[4/5] overflow-hidden">
            <Img src={about.studio[1].src} alt={about.studio[1].alt} ratio={1.25} sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <figcaption className="label mt-4 flex justify-between text-muted-foreground">
            <span>{about.studio[1].caption}</span>
            <span>Fig. 02</span>
          </figcaption>
        </figure>
      </section>

      <Reel />

      <section className="mx-auto max-w-content px-6 py-24 text-center md:px-10 md:py-36">
        <p className="label reveal text-primary">Visit by appointment</p>
        <h2 className="reveal mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[1]">
          Come and see the bench.
        </h2>
        <Link
          to="/contact"
          className="label reveal group mt-12 inline-flex items-center gap-4 border-b border-primary pb-2 transition-colors hover:text-primary"
        >
          Arrange a visit <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.25} />
        </Link>
      </section>
    </>
  )
}

const CHAPTER_MS = 5000

/** Craftsmanship highlight reel: an autoplaying, cinematic sequence of studio footage stills. */
function Reel() {
  const reel = site.about.reel
  const { active, next, goTo, keyFor } = useSequence(reel.length)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = window.setTimeout(next, CHAPTER_MS)
    return () => window.clearTimeout(id)
  }, [active, playing])

  return (
    <section className="border-t border-border bg-card" aria-labelledby="reel-title">
      <div className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-muted-foreground">Highlight reel</p>
            <h2 id="reel-title" className="mt-4 text-5xl md:text-6xl">
              The hands behind <span className="italic text-primary">the work.</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="label flex items-center gap-3 border border-border px-5 py-3 transition-colors hover:border-primary hover:text-primary"
            aria-pressed={!playing}
          >
            {playing ? <Pause className="size-3.5" strokeWidth={1.5} /> : <Play className="size-3.5" strokeWidth={1.5} />}
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>

        <div className="reveal grain relative aspect-[4/5] overflow-hidden bg-background sm:aspect-[16/9]">
          {reel.map((frame, i) => (
            <div
              key={frame.src}
              className={cn('absolute inset-0 transition-opacity duration-[1400ms]', i === active ? 'opacity-100' : 'opacity-0')}
              aria-hidden={i !== active}
            >
              <div
                key={keyFor(i)}
                className="h-full w-full"
                style={{ animation: `kenburns ${CHAPTER_MS + 1400}ms linear both`, animationPlayState: playing ? 'running' : 'paused' }}
              >
                <Img src={frame.src} alt={frame.alt} sizes="(min-width: 1408px) 1328px, 100vw" widths={[640, 1024, 1600]} />
              </div>
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-10">
            <p key={active} className="animate-fade font-display text-3xl md:text-5xl">
              {reel[active].caption}
            </p>
            <p className="label shrink-0 text-primary">{reel[active].meta}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 md:gap-8">
          {reel.map((frame, i) => (
            <button key={frame.src} type="button" onClick={() => goTo(i)} className="group text-left" aria-label={`Chapter ${i + 1}: ${frame.caption}`}>
              <span className="relative block h-px overflow-hidden bg-foreground/15">
                {i === active ? (
                  <span
                    key={`${active}-${playing}`}
                    className="absolute inset-0 origin-left bg-primary"
                    style={{ animation: playing ? `progress ${CHAPTER_MS}ms linear both` : 'none', transform: playing ? undefined : 'scaleX(1)' }}
                  />
                ) : (
                  i < active && <span className="absolute inset-0 bg-foreground/40" />
                )}
              </span>
              <span className={cn('label mt-3 hidden transition-colors sm:block', i === active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground')}>
                {String(i + 1).padStart(2, '0')} — {frame.caption}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
