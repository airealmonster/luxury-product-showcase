import { useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type State = 'idle' | 'pending' | 'success' | 'error'

const interests = ['Rings', 'Bespoke watch', 'Leather strap', 'Studio visit', 'Something else']

const field =
  'peer w-full border-0 border-b border-input bg-transparent pb-3 pt-7 text-lg text-foreground outline-none transition-colors duration-500 placeholder:text-transparent focus:border-primary'
const floating =
  'label pointer-events-none absolute left-0 top-7 text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0'

export function ContactForm() {
  const [state, setState] = useState<State>('idle')
  const [interest, setInterest] = useState(interests[0])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(await response.text())
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div role="status" className="animate-fade border-t border-primary pt-10">
        <p className="label text-primary">Received</p>
        <p className="mt-6 font-display text-5xl leading-tight">Thank you.</p>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          Your message is with the studio. We will reply personally within two working days.
        </p>
        <button type="button" onClick={() => setState('idle')} className="label mt-10 border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/contact-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="space-y-10">
        <legend className="sr-only">Your enquiry</legend>

        <div>
          <p className="label mb-5 text-muted-foreground" id="interest-label">I'm interested in</p>
          <input type="hidden" name="interest" value={interest} />
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="interest-label">
            {interests.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={interest === option}
                onClick={() => setInterest(option)}
                className={cn(
                  'border px-4 py-2.5 text-sm transition-colors duration-500',
                  interest === option
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground/70 hover:border-foreground/50 hover:text-foreground',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="relative">
            <input id="name" name="name" autoComplete="name" required maxLength={100} placeholder="Name" className={field} />
            <label htmlFor="name" className={floating}>Name</label>
          </div>
          <div className="relative">
            <input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Email" className={field} />
            <label htmlFor="email" className={floating}>Email</label>
          </div>
        </div>
        <div className="relative">
          <textarea id="message" name="message" required maxLength={2000} rows={4} placeholder="Message" className={cn(field, 'resize-none')} />
          <label htmlFor="message" className={floating}>Tell us about your piece</label>
        </div>

        <div className="flex flex-col items-start gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            We only use your details to reply to this enquiry.
          </p>
          <button
            type="submit"
            className="group relative inline-flex items-center gap-4 overflow-hidden bg-foreground px-8 py-5 text-background disabled:opacity-60"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-primary transition-transform duration-700 [transition-timing-function:var(--ease-lux)] group-hover:scale-x-100" />
            <span className="label relative">{state === 'pending' ? 'Sending…' : 'Send enquiry'}</span>
            <ArrowRight className="relative size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.25} />
          </button>
        </div>

        {state === 'error' && (
          <p role="alert" className="border-l border-destructive pl-4 text-sm text-destructive">
            Your message could not be sent just now. Your details are still here — please try again, or email us directly.
          </p>
        )}
      </fieldset>
    </form>
  )
}
