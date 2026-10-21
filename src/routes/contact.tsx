import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'

import { ContactForm } from '@/components/contact-form'
import { site } from '@/content/site'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact — Commissions & Studio Visits',
      description:
        'Commission a ring, bespoke watch or leather strap, or book a visit to the Aurel studio in Lisbon. We reply personally within two working days.',
      path: '/contact',
      image: '/img/craft-2.png',
    }),
  component: Contact,
})

function Contact() {
  const { contact, social } = site
  return (
    <div className="mx-auto max-w-content px-6 pb-24 pt-36 md:px-10 md:pb-36 md:pt-48">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label animate-fade mb-8 flex items-center gap-4 text-primary">
            <span className="h-px w-10 bg-primary" /> {contact.eyebrow}
          </p>
          <h1 className="text-[clamp(3.25rem,7vw,7rem)] leading-[0.92]">
            <span className="block overflow-hidden"><span className="animate-rise block">Begin a</span></span>
            <span className="block overflow-hidden"><span className="animate-rise block italic text-primary" style={{ animationDelay: '0.12s' }}>commission.</span></span>
          </h1>
          <p className="animate-fade mt-8 max-w-sm leading-relaxed text-muted-foreground" style={{ animationDelay: '0.4s' }}>
            {contact.intro}
          </p>

          <dl className="animate-fade mt-14 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-1" style={{ animationDelay: '0.6s' }}>
            <div>
              <dt className="label text-muted-foreground">Write</dt>
              <dd className="mt-3">
                <a href={`mailto:${contact.email}`} className="border-b border-primary/40 pb-0.5 transition-colors hover:border-primary hover:text-primary">
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="label text-muted-foreground">Call</dt>
              <dd className="mt-3">
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-primary">{contact.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="label text-muted-foreground">Visit</dt>
              <dd className="mt-3 leading-relaxed">
                {contact.address.join(', ')}
                <span className="mt-1 block text-sm text-muted-foreground">{contact.hours}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="animate-fade lg:col-span-6 lg:col-start-7 lg:pt-24" style={{ animationDelay: '0.5s' }}>
          <ContactForm />
        </div>
      </div>

      <ul className="mt-24 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4" aria-label="Social">
        {social.map((s) => (
          <li key={s.label} className="border-b border-border sm:odd:border-r lg:border-r lg:last:border-r-0">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-1 py-8 transition-colors hover:text-primary sm:px-6"
            >
              <span className="font-display text-3xl">{s.label}</span>
              <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.25} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
