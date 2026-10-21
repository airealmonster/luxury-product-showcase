/**
 * Site-wide copy and settings.
 * Edit the text here and every page updates. See docs/EDITING.md.
 */
export const site = {
  name: 'AUREL',
  fullName: 'Aurel Atelier',
  // تم التعديل هنا لحذف رابط netlify وتوجيهه إلى مسار مشروعك على GitHub Pages
  url: 'https://github.io',
  tagline: 'Objects of quiet precision.',
  description:
    'Aurel Atelier makes rings, bespoke watches and hand-stitched leather watch straps to order. Considered design, honest materials, made to be worn for a lifetime.',

  home: {
    eyebrow: 'Atelier — Est. 2014',
    headline: ['Quiet', 'precision.'],
    statement:
      'Rings, bespoke watches and hand-stitched leather straps, each made to order in our studio and finished by a single pair of hands.',
    cta: 'Enter the collection',
    heroImages: [
      { src: '/img/hero.png', caption: 'The Collection', alt: 'Steel watch with a black leather strap beside a slim gold band ring on dark slate' },
      { src: '/img/watch-2.png', caption: 'Bespoke Watches', alt: 'Gold bespoke watch with a champagne sunray dial worn on the wrist' },
      { src: '/img/ring-2.png', caption: 'Rings', alt: 'Platinum solitaire ring reflected on black glass' },
    ],
  },

  about: {
    eyebrow: 'The Atelier',
    headline: 'Fewer things, made better.',
    intro:
      'Aurel began at a single bench with a simple conviction: that the objects we wear every day deserve the same care as the moments they mark.',
    story: [
      'We design in straight lines and honest proportions, then spend our hours on what cannot be seen at first glance: the weight of a band in the hand, the way a crown turns, the tension of a saddle stitch.',
      'Every ring is cast and finished in-house. Every watch is assembled to its owner’s specification. Every strap is cut from a single hide, painted at the edge by hand and stitched with waxed linen thread.',
      'Nothing is made in advance. Nothing is made twice exactly the same.',
    ],
    principles: [
      { title: 'Made to order', body: 'Each piece begins when you commission it — never from a warehouse shelf.' },
      { title: 'One maker, one piece', body: 'A single craftsperson follows your piece from first cut to final polish.' },
      { title: 'Built to last', body: 'Lifetime servicing on every watch, resizing on every ring, re-stitching on every strap.' },
    ],
    studio: [
      { src: '/img/studio-1.png', alt: 'The Aurel studio: a long oak workbench with tools laid out beneath warm lamplight', caption: 'The bench, Lisbon' },
      { src: '/img/studio-2.png', alt: 'Leather workbench with rolls of hide, edge paint and waxed thread', caption: 'The leather room' },
    ],
    reel: [
      { src: '/img/craft-1.png', alt: 'Watchmaker placing a component into a movement with fine tweezers', caption: 'Assembling the movement', meta: '42 hours' },
      { src: '/img/craft-2.png', alt: 'Hands saddle-stitching a leather watch strap with two needles', caption: 'Saddle stitching by hand', meta: '6 hours' },
      { src: '/img/craft-3.png', alt: 'A gold ring being hand-polished at the jeweller’s bench', caption: 'Final polish', meta: '3 hours' },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    headline: 'Begin a commission.',
    intro: 'Tell us what you have in mind. We reply personally to every enquiry within two working days.',
    email: 'studio@aurel-atelier.com',
    phone: '+351 21 000 0000',
    address: ['Rua das Flores 28', '1200-195 Lisbon', 'Portugal'],
    hours: 'Studio visits by appointment, Tuesday to Saturday',
  },

  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Pinterest', href: 'https://pinterest.com/' },
    { label: 'TikTok', href: 'https://tiktok.com/' },
    { label: 'WhatsApp', href: 'https://wa.me/' },
  ],
}
