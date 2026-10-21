/**
 * Product catalogue.
 * To add a product, copy one entry inside `items` and change its values.
 * `checkoutUrl` is the link to your external checkout page — "Buy now" opens it.
 * Images live in /public/img. See docs/EDITING.md.
 */
export type Product = {
  id: string
  name: string
  material: string
  price: string
  description: string
  image: string
  alt: string
  checkoutUrl: string
}

export type Collection = {
  id: 'rings' | 'watches' | 'straps'
  index: string
  title: string
  kicker: string
  description: string
  items: Product[]
}

export const collections: Collection[] = [
  {
    id: 'rings',
    index: '01',
    title: 'Rings',
    kicker: 'Cast & hand-finished',
    description:
      'Clean architecture in precious metal. Each band is cast, shaped and polished in our studio, sized to you.',
    items: [
      {
        id: 'linea-band',
        name: 'Linea Band',
        material: '18k yellow gold',
        price: '€1,450',
        description: 'A 2.5 mm band with a softened comfort-fit interior. The piece our studio began with.',
        image: '/img/ring-1.png',
        alt: 'Slim polished 18k yellow gold band ring standing upright on black stone',
        checkoutUrl: 'https://checkout.example.com/aurel/linea-band',
      },
      {
        id: 'solus-solitaire',
        name: 'Solus Solitaire',
        material: 'Platinum, 0.8 ct diamond',
        price: '€6,900',
        description: 'A round brilliant held by four knife-edge claws, set low so it sits close to the hand.',
        image: '/img/ring-2.png',
        alt: 'Platinum solitaire ring with a round diamond reflected on black glass',
        checkoutUrl: 'https://checkout.example.com/aurel/solus-solitaire',
      },
      {
        id: 'plane-signet',
        name: 'Plane Signet',
        material: 'Brushed 18k white gold',
        price: '€2,800',
        description: 'A wide, flat face ready for engraving — or left perfectly blank.',
        image: '/img/ring-3.png',
        alt: 'Wide brushed white gold signet ring with a flat face on dark slate',
        checkoutUrl: 'https://checkout.example.com/aurel/plane-signet',
      },
      {
        id: 'duo-stack',
        name: 'Duo Stack',
        material: 'Rose gold & black ceramic',
        price: '€1,900',
        description: 'Two thin bands designed to be worn together, warm metal against matte ceramic.',
        image: '/img/ring-4.png',
        alt: 'Two stacked thin rings in rose gold and matte black ceramic on a black plinth',
        checkoutUrl: 'https://checkout.example.com/aurel/duo-stack',
      },
    ],
  },
  {
    id: 'watches',
    index: '02',
    title: 'Bespoke Watches',
    kicker: 'Specified by you',
    description:
      'Choose the case, the dial, the hands and the movement. We assemble, regulate and test every watch by hand.',
    items: [
      {
        id: 'noct-38',
        name: 'Noct 38',
        material: 'Steel, black sunray dial',
        price: 'From €4,200',
        description: 'A 38 mm dress watch with slim baton hands and no numerals. Nothing more than needed.',
        image: '/img/watch-1.png',
        alt: 'Minimalist steel dress watch with a black sunray dial on black stone',
        checkoutUrl: 'https://checkout.example.com/aurel/noct-38',
      },
      {
        id: 'aura-gold',
        name: 'Aura',
        material: '18k gold, champagne fumé dial',
        price: 'From €14,500',
        description: 'A brushed gold case and a smoked dial that darkens toward its edge.',
        image: '/img/watch-2.png',
        alt: 'Gold bespoke watch with a champagne fumé dial worn on the wrist',
        checkoutUrl: 'https://checkout.example.com/aurel/aura',
      },
      {
        id: 'calibre-open',
        name: 'Calibre Open',
        material: 'Sapphire caseback, hand-finished movement',
        price: 'From €9,800',
        description: 'Turn it over: a movement with Côtes de Genève striping, bevelled bridges and blued screws.',
        image: '/img/watch-3.png',
        alt: 'Open caseback revealing a finely finished mechanical watch movement',
        checkoutUrl: 'https://checkout.example.com/aurel/calibre-open',
      },
      {
        id: 'slate-ti',
        name: 'Slate Ti',
        material: 'Sandblasted titanium',
        price: 'From €5,600',
        description: 'Light, matte and understated. A slate dial in a case that weighs almost nothing.',
        image: '/img/watch-4.png',
        alt: 'Matte black titanium watch with a slate grey dial, seen from above',
        checkoutUrl: 'https://checkout.example.com/aurel/slate-ti',
      },
    ],
  },
  {
    id: 'straps',
    index: '03',
    title: 'Leather Straps',
    kicker: 'Hand-stitched to measure',
    description:
      'Cut from a single hide, edge-painted and saddle-stitched by hand. Made to your wrist and your watch.',
    items: [
      {
        id: 'noir-calf',
        name: 'Noir Calf',
        material: 'Black calfskin, tonal stitch',
        price: '€290',
        description: 'Our everyday strap. Supple from the first wear, with a tonal stitch you only notice up close.',
        image: '/img/strap-1.png',
        alt: 'Hand-stitched black calfskin watch strap with tonal stitching',
        checkoutUrl: 'https://checkout.example.com/aurel/noir-calf',
      },
      {
        id: 'cognac',
        name: 'Cognac',
        material: 'Full-grain leather, steel buckle',
        price: '€320',
        description: 'Warm full-grain leather that deepens with age. Hand-painted edges, brushed steel buckle.',
        image: '/img/strap-2.png',
        alt: 'Cognac brown full-grain leather watch strap with a brushed steel buckle',
        checkoutUrl: 'https://checkout.example.com/aurel/cognac',
      },
      {
        id: 'verde',
        name: 'Verde',
        material: 'Forest alligator grain, gold buckle',
        price: '€480',
        description: 'Deep forest green with a champagne-gold buckle. Quietly unexpected.',
        image: '/img/strap-3.png',
        alt: 'Deep forest green alligator-grain leather watch strap with a gold buckle',
        checkoutUrl: 'https://checkout.example.com/aurel/verde',
      },
      {
        id: 'dune-suede',
        name: 'Dune',
        material: 'Sand suede, minimal stitch',
        price: '€260',
        description: 'Soft sand suede for warm days and lighter dials.',
        image: '/img/strap-4.png',
        alt: 'Sand-coloured suede watch strap laid across a dark slate surface',
        checkoutUrl: 'https://checkout.example.com/aurel/dune',
      },
    ],
  },
]
