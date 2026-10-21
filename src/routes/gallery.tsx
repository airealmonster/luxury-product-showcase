import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Maximize2 } from 'lucide-react'

import { Img } from '@/components/img'
import { BuyButton, Lightbox } from '@/components/lightbox'
import { collections, type Collection } from '@/content/products'
import { seo } from '@/lib/seo'
import { useReveal } from '@/lib/use-reveal'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/gallery')({
  head: () =>
    seo({
      title: 'The Collection — Rings, Bespoke Watches & Leather Straps',
      description:
        'Explore Aurel rings in gold and platinum, bespoke mechanical watches and hand-stitched leather watch straps. Each piece made to order.',
      path: '/gallery',
      image: '/img/watch-1.png',
    }),
  component: Gallery,
})

function Gallery() {
  useReveal()
  const [current, setCurrent] = useState<string>(collections[0].id)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) document.getElementById(hash)?.scrollIntoView()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    collections.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <header className="mx-auto max-w-content px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-48">
        <p className="label animate-fade mb-8 flex items-center gap-4 text-primary">
          <span className="h-px w-10 bg-primary" /> The Collection
        </p>
        <h1 className="max-w-5xl text-[clamp(3.25rem,9vw,9rem)] leading-[0.9]">
          <span className="block overflow-hidden"><span className="animate-rise block">Made to be</span></span>
          <span className="block overflow-hidden"><span className="animate-rise block italic text-foreground/55" style={{ animationDelay: '0.12s' }}>worn for life.</span></span>
        </h1>
        <p className="animate-fade mt-10 max-w-lg leading-relaxed text-muted-foreground" style={{ animationDelay: '0.5s' }}>
          Three disciplines under one roof. Select any piece to view it in detail — purchases are completed securely with our checkout partner.
        </p>
      </header>

      <nav
        aria-label="Collections"
        className="sticky top-16 z-30 border-y border-border bg-background/85 backdrop-blur-xl md:top-20"
      >
        <div className="no-scrollbar mx-auto flex max-w-content overflow-x-auto px-6 md:px-10">
          {collections.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className={cn(
                'label relative flex shrink-0 items-center gap-3 py-5 pr-8 transition-colors duration-500 md:pr-14',
                current === c.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span className={cn('transition-colors', current === c.id && 'text-primary')}>{c.index}</span>
              {c.title}
              <sup className="text-[0.6rem] text-muted-foreground">{c.items.length}</sup>
              <span
                className={cn(
                  'absolute bottom-0 left-0 h-px bg-primary transition-all duration-700 [transition-timing-function:var(--ease-lux)]',
                  current === c.id ? 'w-[calc(100%-2rem)] md:w-[calc(100%-3.5rem)]' : 'w-0',
                )}
              />
            </a>
          ))}
        </div>
      </nav>

      {collections.map((c) => (
        <CollectionSection key={c.id} collection={c} />
      ))}
    </>
  )
}

function CollectionSection({ collection }: { collection: Collection }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id={collection.id} aria-labelledby={`${collection.id}-title`} className="scroll-mt-32 border-b border-border md:scroll-mt-40">
      <div className="mx-auto grid max-w-content gap-12 px-6 py-20 md:px-10 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="reveal lg:sticky lg:top-44">
            <span className="block font-display text-[clamp(5rem,12vw,10rem)] leading-none text-foreground/10">
              {collection.index}
            </span>
            <p className="label mt-4 text-primary">{collection.kicker}</p>
            <h2 id={`${collection.id}-title`} className="mt-4 text-5xl md:text-6xl">
              {collection.title}
            </h2>
            <div className="rule-draw my-8 h-px w-24 bg-primary" />
            <p className="max-w-sm leading-relaxed text-muted-foreground">{collection.description}</p>
          </div>
        </div>

        <ul className="grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:col-span-8 lg:gap-x-8 lg:gap-y-20">
          {collection.items.map((item, i) => (
            <li key={item.id} className={cn('reveal', i % 2 === 1 && 'sm:mt-24')} style={{ transitionDelay: `${(i % 2) * 120}ms` }}>
              <article>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden bg-card"
                  aria-label={`View ${item.name} larger`}
                >
                  <Img
                    src={item.image}
                    alt={item.alt}
                    ratio={1.25}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                    widths={[400, 640, 900, 1200]}
                    className="transition-transform duration-[1600ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/20" />
                  <span className="label absolute bottom-4 left-4 flex translate-y-2 items-center gap-2 bg-background/80 px-3 py-2 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Maximize2 className="size-3" strokeWidth={1.5} /> View
                  </span>
                  <span className="label absolute right-4 top-4 text-foreground/60">
                    {collection.index}.{String(i + 1).padStart(2, '0')}
                  </span>
                </button>
                <div className="mt-6 flex items-start justify-between gap-4 border-t border-border pt-5">
                  <div>
                    <h3 className="text-3xl leading-tight">{item.name}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.material}</p>
                  </div>
                  <p className="shrink-0 pt-1.5 text-sm">{item.price}</p>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/60">{item.description}</p>
                <BuyButton product={item} className="mt-6 w-full sm:w-auto" />
              </article>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox items={collection.items} collectionTitle={collection.title} index={open} onIndexChange={setOpen} />
    </section>
  )
}
