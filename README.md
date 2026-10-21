# Aurel Atelier

A minimal, luxury showcase website for three product lines — rings, bespoke watches and hand-stitched leather watch straps. Visitors browse the collection and complete purchases on an external checkout provider; no cart or payments live on the site.

## Pages

- **Home** (`/`) — full-screen autoplaying hero loop, value statement and a single call to action into the collection, followed by a typographic index of the three disciplines.
- **Collection** (`/gallery`) — three clearly separated sections with a sticky section switcher, a full-screen lightbox with click-to-zoom, keyboard and swipe navigation, and a "Buy now" link on every item.
- **Atelier** (`/about`) — brand story, principles, studio photography and an autoplaying craftsmanship highlight reel.
- **Contact** (`/contact`) — enquiry form (Netlify Forms) with contact details and social links.

## Technology

- TanStack Start (React 19) with file-based routing and server rendering
- Tailwind CSS 4 — theme in `src/styles.css`
- Typography: Instrument Serif (display) and Inter Tight (text)
- Netlify Image CDN for responsive, compressed WebP images
- Netlify Forms for the contact form
- Per-page SEO titles, descriptions, Open Graph tags, canonical URLs, sitemap and alt text

## Editing content

All products and copy live in `src/content/products.ts` and `src/content/site.ts`. See **[docs/EDITING.md](docs/EDITING.md)** for a step-by-step guide.

## Running locally

```bash
pnpm install
netlify dev
```

`netlify dev` emulates the Image CDN and Forms locally. `pnpm dev` also works for quick UI work.

## Next steps

- Replace the placeholder photography in `public/img/` with the final brand photography.
- Paste the real checkout links into each product's `checkoutUrl`.
- Update contact details and social links in `src/content/site.ts`.
- Connect the custom domain in Netlify.
