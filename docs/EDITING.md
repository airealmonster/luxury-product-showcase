# Editing the Aurel website

Everything you see on the site — products, prices, copy, photos and social links — is in **two files**.
Edit one, save (commit) it, and Netlify rebuilds and publishes the site automatically in about a minute.

| What you want to change | File |
| --- | --- |
| Products, prices, descriptions, "Buy now" links | `src/content/products.ts` |
| Brand name, home page text, About story, contact details, social links | `src/content/site.ts` |
| Photos | `public/img/` |

You can edit these files directly in your Git provider's web editor (open the file → pencil icon → edit → commit). No software install needed.

## Add or change a product

1. Open `src/content/products.ts`.
2. Find the collection: `rings`, `watches` or `straps`.
3. Copy an existing product block (from `{` to `},`) and paste it below.
4. Change the values:

```ts
{
  id: 'linea-band',                 // unique, lowercase, no spaces
  name: 'Linea Band',               // shown as the product title
  material: '18k yellow gold',      // small line under the title
  price: '€1,450',                  // any text, e.g. 'From €4,200' or 'On request'
  description: 'A 2.5 mm band…',    // one or two sentences
  image: '/img/ring-1.png',         // a file in public/img
  alt: 'Slim polished gold band…',  // describes the photo for SEO and screen readers
  checkoutUrl: 'https://…',         // your external checkout page for this item
},
```

To remove a product, delete its block. The order in the file is the order on the page.

## Replace photos

1. Upload your high-resolution photo to `public/img/` (JPG or PNG; any size — the site resizes and compresses automatically through Netlify Image CDN, serving WebP at the right width for each screen).
2. Point the product's `image` field (or the entry in `site.ts`) at the new file name, e.g. `/img/aura-front.jpg`.
3. Update the `alt` text to describe the new photo.

Recommended shapes: products **4:5 portrait**, home hero **16:9 landscape**, highlight reel **16:9**.

## Change "Buy now" checkout links

Each product has its own `checkoutUrl`. Paste the product link from your checkout provider (Shopify Buy Button link, Stripe Payment Link, Gumroad, etc.). The button opens it in a new tab — no payments are handled on this site.

## Change page text

`src/content/site.ts` is grouped by page: `home`, `about`, `contact`, plus `social` links. Change any text between quotes. Keep the quotes and commas in place. If a sentence contains an apostrophe, use the curly one (’) or keep the existing quote style.

## Page titles and descriptions (SEO)

Each page's title and meta description is at the top of its page file in `src/routes/` (`index.tsx`, `gallery.tsx`, `about.tsx`, `contact.tsx`) inside `seo({ title, description })`.

## Contact form submissions

Messages sent through the Contact page appear in the Netlify dashboard under **Forms → contact**. Turn on email notifications in **Project configuration → Notifications → Emails and webhooks → Form submission notifications**.

## Connect your domain

In the Netlify dashboard: **Domain management → Add a domain**, enter your domain, and follow the DNS instructions. HTTPS is issued automatically. After connecting, update `url` in `src/content/site.ts` and the addresses in `public/sitemap.xml` and `public/robots.txt`.
