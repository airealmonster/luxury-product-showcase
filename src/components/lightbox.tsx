import { useEffect, useState, type PointerEvent } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ArrowLeft, ArrowRight, ArrowUpRight, Minus, Plus, X } from 'lucide-react'

import type { Product } from '@/content/products'
import { cdn } from '@/lib/image'
import { cn } from '@/lib/utils'

type Props = {
  items: Product[]
  collectionTitle: string
  index: number | null
  onIndexChange: (index: number | null) => void
}

/** Full-screen viewer with click-to-zoom, keyboard and swipe navigation. */
export function Lightbox({ items, collectionTitle, index, onIndexChange }: Props) {
  const [zoomed, setZoomed] = useState(false)
  const [origin, setOrigin] = useState('50% 50%')
  const [touchX, setTouchX] = useState<number | null>(null)
  const item = index === null ? null : items[index]

  const go = (step: number) => {
    if (index === null) return
    setZoomed(false)
    onIndexChange((index + step + items.length) % items.length)
  }

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const track = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`)
  }

  return (
    <DialogPrimitive.Root
      open={item !== null}
      onOpenChange={(open) => {
        if (!open) {
          setZoomed(false)
          onIndexChange(null)
        }
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-background/97 backdrop-blur-sm data-[state=open]:animate-fade" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-[61] flex flex-col outline-none lg:flex-row"
          aria-describedby={undefined}
        >
          {item && (
            <>
              <div
                className="relative flex-1 overflow-hidden"
                onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (touchX === null || zoomed) return
                  const dx = e.changedTouches[0].clientX - touchX
                  if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
                  setTouchX(null)
                }}
              >
                <button
                  type="button"
                  key={item.id}
                  onClick={(e) => {
                    track(e)
                    setZoomed((z) => !z)
                  }}
                  onPointerMove={zoomed ? track : undefined}
                  className={cn(
                    'animate-zoom-in flex h-full w-full items-center justify-center p-6 pt-20 lg:p-16',
                    zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in',
                  )}
                  aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                >
                  <img
                    src={cdn(item.image, 1800)}
                    alt={item.alt}
                    className="max-h-full max-w-full object-contain transition-transform duration-700 [transition-timing-function:var(--ease-lux)]"
                    style={{ transform: zoomed ? 'scale(2.2)' : 'scale(1)', transformOrigin: origin }}
                    draggable={false}
                  />
                </button>

                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-6">
                  <span className="label text-muted-foreground">
                    {collectionTitle} — {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                  <DialogPrimitive.Close className="pointer-events-auto flex size-11 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary lg:hidden">
                    <X className="size-4" strokeWidth={1.25} />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>

                <div className="absolute bottom-6 left-6 hidden items-center gap-2 lg:flex">
                  <span className="label text-muted-foreground">
                    {zoomed ? <Minus className="inline size-3" /> : <Plus className="inline size-3" />} Click to {zoomed ? 'zoom out' : 'zoom'}
                  </span>
                </div>
              </div>

              <aside className="flex shrink-0 flex-col justify-between gap-6 border-t border-border bg-background p-6 lg:w-[26rem] lg:border-l lg:border-t-0 lg:p-10">
                <div className="hidden justify-end lg:flex">
                  <DialogPrimitive.Close className="flex size-11 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary">
                    <X className="size-4" strokeWidth={1.25} />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                </div>
                <div key={item.id} className="animate-fade">
                  <p className="label text-primary">{item.material}</p>
                  <DialogPrimitive.Title className="mt-3 font-display text-4xl lg:text-5xl">{item.name}</DialogPrimitive.Title>
                  <p className="mt-4 hidden text-sm leading-relaxed text-muted-foreground sm:block">{item.description}</p>
                  <p className="mt-5 text-lg">{item.price}</p>
                </div>
                <div className="flex flex-col gap-4">
                  <BuyButton product={item} className="w-full" />
                  <div className="grid grid-cols-2 border border-border">
                    <button type="button" onClick={() => go(-1)} className="label flex items-center justify-center gap-2 py-4 transition-colors hover:bg-secondary">
                      <ArrowLeft className="size-3.5" strokeWidth={1.25} /> Prev
                    </button>
                    <button type="button" onClick={() => go(1)} className="label flex items-center justify-center gap-2 border-l border-border py-4 transition-colors hover:bg-secondary">
                      Next <ArrowRight className="size-3.5" strokeWidth={1.25} />
                    </button>
                  </div>
                </div>
              </aside>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

/** "Buy now" opens the product's external checkout page in a new tab. */
export function BuyButton({ product, className }: { product: Product; className?: string }) {
  return (
    <a
      href={product.checkoutUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Buy ${product.name} now (opens secure checkout)`}
      className={cn(
        'label group/buy relative inline-flex items-center justify-center gap-3 overflow-hidden bg-foreground px-7 py-4 text-background transition-colors duration-500',
        className,
      )}
    >
      <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-700 [transition-timing-function:var(--ease-lux)] group-hover/buy:scale-x-100" />
      <span className="relative">Buy now</span>
      <ArrowUpRight className="relative size-3.5 transition-transform duration-500 group-hover/buy:-translate-y-0.5 group-hover/buy:translate-x-0.5" strokeWidth={1.5} />
    </a>
  )
}
