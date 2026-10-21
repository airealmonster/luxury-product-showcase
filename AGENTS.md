# AGENTS.md

## Project overview

Aurel Atelier — a four-page luxury showcase site for rings, bespoke watches and leather watch straps, built on TanStack Start and deployed to Netlify. There is no cart or payment handling: every "Buy now" is an external link to the owner's checkout provider.

## Architecture

```
src/
├── content/
│   ├── site.ts        # All site copy: brand, home, about (story, studio, reel), contact, social links
│   └── products.ts    # Collections (rings, watches, straps) and their products incl. checkoutUrl
├── components/
│   ├── site-header.tsx   # Fixed header, centered wordmark, mobile full-screen menu
│   ├── site-footer.tsx   # Footer with oversized wordmark
│   ├── lightbox.tsx      # Radix Dialog lightbox (zoom, keys, swipe) + BuyButton
│   ├── contact-form.tsx  # Netlify Forms AJAX form
│   ├── img.tsx           # <Img> — responsive srcset through Netlify Image CDN
│   └── ui/               # shadcn/ui primitives (mostly unused)
├── lib/
│   ├── image.ts       # cdn()/srcSet() build /.netlify/images URLs
│   ├── seo.ts         # seo() returns per-route head meta + canonical
│   ├── use-reveal.ts  # IntersectionObserver adding .is-visible to .reveal elements
│   └── use-sequence.ts# Looping slide counter with stable keys (hero + reel)
├── routes/            # index, gallery, about, contact (+ __root shell)
└── styles.css         # Theme tokens (dark, champagne accent), .label, .reveal, keyframes
public/
├── img/               # Product, studio and craft photography (originals; always served via CDN)
├── contact-form.html  # Static Netlify Forms registration — fields must match contact-form.tsx
├── robots.txt, sitemap.xml, favicon.svg
docs/EDITING.md        # Owner-facing editing guide
```

## Conventions

- Content is data: never hard-code product or brand copy in components; add it to `src/content/*`.
- Always render images via `<Img>` / `cdn()` — never link `/img/*` originals directly.
- Design language: near-black background, ivory text, single champagne accent (`primary`), zero border radius, 1px hairlines (`border-border`), uppercase tracked `.label` for meta text, Instrument Serif for headings with italic accents. Motion uses `var(--ease-lux)` and respects `prefers-reduced-motion`.
- Every page sets its own head via `seo()`; every image needs meaningful `alt` text.
- If form fields change, update both `contact-form.tsx` and `public/contact-form.html`.

## Notes

- Photography in `public/img` is generated placeholder imagery standing in for the owner's final assets; filenames are referenced from `src/content/*`.
- Editing is file-based (see docs/EDITING.md). A visual CMS could be layered on later by pointing it at `src/content`.
