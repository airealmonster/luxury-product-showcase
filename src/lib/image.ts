/** Build a Netlify Image CDN URL so originals never ship at full resolution. */
export function cdn(src: string, width: number, height?: number) {
  const params = new URLSearchParams({ url: src, w: String(width), fm: 'webp', q: '78' })
  if (height) {
    params.set('h', String(height))
    params.set('fit', 'cover')
  }
  return `/.netlify/images?${params.toString()}`
}

export function srcSet(src: string, widths: number[], ratio?: number) {
  return widths
    .map((w) => `${cdn(src, w, ratio ? Math.round(w * ratio) : undefined)} ${w}w`)
    .join(', ')
}
