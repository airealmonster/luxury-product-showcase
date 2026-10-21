import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'

import { site } from '@/content/site'
import { cn } from '@/lib/utils'

const nav = [
  { to: '/gallery', label: 'Collection', index: '01' },
  { to: '/about', label: 'Atelier', index: '02' },
  { to: '/contact', label: 'Contact', index: '03' },
] as const

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 [transition-timing-function:var(--ease-lux)]',
          scrolled || open
            ? 'border-b border-border bg-background/80 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto grid h-16 max-w-content grid-cols-[1fr_auto_1fr] items-center px-6 md:h-20 md:px-10">
          <nav aria-label="Primary" className="hidden items-center gap-10 md:flex">
            {nav.slice(0, 2).map((item) => (
              <NavLink key={item.to} {...item} />
            ))}
          </nav>
          <button
            type="button"
            className="label flex items-center gap-3 justify-self-start md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-2.5 w-6">
              <span className={cn('absolute left-0 top-0 h-px w-full bg-foreground transition-transform duration-500', open && 'translate-y-[5px] rotate-45')} />
              <span className={cn('absolute bottom-0 left-0 h-px w-full bg-foreground transition-transform duration-500', open && '-translate-y-[4px] -rotate-45')} />
            </span>
            {open ? 'Close' : 'Menu'}
          </button>

          <Link to="/" className="justify-self-center" aria-label={`${site.fullName} — home`}>
            <span className="font-display text-2xl tracking-[0.42em] md:text-[1.7rem]">
              {site.name}
            </span>
          </Link>

          <div className="flex items-center justify-end gap-10">
            <span className="hidden md:block">
              <NavLink {...nav[2]} />
            </span>
            <Link
              to="/gallery"
              className="label hidden border border-foreground/30 px-5 py-2.5 transition-colors duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground lg:inline-block"
            >
              Shop
            </Link>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 flex flex-col justify-between bg-background px-6 pb-10 pt-28 transition-[opacity,visibility] duration-700 md:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-baseline justify-between border-b border-border py-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="font-display text-5xl">{item.label}</span>
              <span className="label text-muted-foreground">{item.index}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {site.social.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="label text-muted-foreground">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

function NavLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="label group relative py-2 text-foreground/70 transition-colors duration-500 hover:text-foreground"
      activeProps={{ className: 'text-foreground' }}
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={cn(
              'absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary transition-transform duration-700 [transition-timing-function:var(--ease-lux)]',
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
            )}
          />
        </>
      )}
    </Link>
  )
}
