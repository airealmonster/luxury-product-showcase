import { Link } from '@tanstack/react-router'

import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-content px-6 md:px-10">
        <div className="grid gap-12 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <p className="font-display text-4xl leading-tight md:text-5xl">{site.tagline}</p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-8 inline-block border-b border-primary/50 pb-1 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
            >
              {site.contact.email}
            </a>
          </div>
          <FooterCol title="Navigate" className="md:col-span-2 md:col-start-7">
            <Link to="/gallery">Collection</Link>
            <Link to="/about">Atelier</Link>
            <Link to="/contact">Contact</Link>
          </FooterCol>
          <FooterCol title="Studio" className="md:col-span-2">
            {site.contact.address.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </FooterCol>
          <FooterCol title="Follow" className="md:col-span-2">
            {site.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </FooterCol>
        </div>
      </div>
      <div className="overflow-hidden border-t border-border">
        <p
          aria-hidden="true"
          className="select-none text-center font-display leading-[0.78] tracking-[0.18em] text-foreground/[0.06]"
          style={{ fontSize: 'clamp(6rem, 24vw, 26rem)' }}
        >
          {site.name}
        </p>
      </div>
      <div className="mx-auto flex max-w-content flex-col gap-2 border-t border-border px-6 py-6 text-xs text-muted-foreground md:flex-row md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</span>
        <span>Made to order in Lisbon</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="label mb-6 text-muted-foreground">{title}</p>
      <div className="flex flex-col gap-3 text-sm text-foreground/80 [&_a:hover]:text-primary [&_a]:transition-colors">
        {children}
      </div>
    </div>
  )
}
