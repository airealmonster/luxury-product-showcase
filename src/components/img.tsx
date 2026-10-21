import { cdn, srcSet } from '@/lib/image'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  alt: string
  sizes: string
  /** height / width, crops the image to this ratio */
  ratio?: number
  widths?: number[]
  priority?: boolean
  className?: string
}

/** Responsive image served through the Netlify Image CDN as WebP. */
export function Img({ src, alt, sizes, ratio, widths = [480, 800, 1200, 1600], priority, className }: Props) {
  const fallback = widths[1] ?? widths[0]
  return (
    <img
      src={cdn(src, fallback, ratio ? Math.round(fallback * ratio) : undefined)}
      srcSet={srcSet(src, widths, ratio)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('block h-full w-full object-cover', className)}
    />
  )
}
