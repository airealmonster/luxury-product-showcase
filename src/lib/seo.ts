import { site } from '@/content/site'

/** Per-page <head> tags: title, description, Open Graph and canonical URL. */
export function seo({ title, description, path, image = '/img/hero.png' }: {
  title: string
  description: string
  path: string
  image?: string
}) {
  const fullTitle = path === '/' ? `${site.fullName} — ${title}` : `${title} — ${site.fullName}`
  const imageUrl = `${site.url}/.netlify/images?url=${image}&w=1200&h=630&fit=cover&fm=jpg`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: `${site.url}${path}` },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: `${site.url}${path}` }],
  }
}
