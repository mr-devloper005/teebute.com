import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

type Crumb = { label: string; href?: string }

export function ClassifiedPageShell({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  actions?: ReactNode
  breadcrumbs?: Crumb[]
  children?: ReactNode
}) {
  const crumbs: Crumb[] = breadcrumbs ?? [{ label: 'Home', href: '/' }, { label: title }]

  return (
    <div className="min-h-screen bg-[#f2f4f5] text-[#002f34]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#e0e0e0] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs font-medium text-[#406367]">
              {crumbs.map((crumb, i) => {
                const last = i === crumbs.length - 1
                return (
                  <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-1">
                    {crumb.href && !last ? (
                      <Link href={crumb.href} className="hover:text-[#002f34] hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={last ? 'text-[#002f34]' : ''}>{crumb.label}</span>
                    )}
                    {!last ? <ChevronRight className="h-3.5 w-3.5 text-[#a0aaab]" /> : null}
                  </span>
                )
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                {eyebrow ? (
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#3a77ff]">{eyebrow}</p>
                ) : null}
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#002f34] sm:text-4xl">{title}</h1>
                {description ? (
                  <p className="mt-3 text-sm leading-7 text-[#406367] sm:text-base">{description}</p>
                ) : null}
              </div>
              {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}

export function ClassifiedCard({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`rounded-md border border-[#e0e0e0] bg-white p-6 shadow-sm ${className}`}>{children}</div>
  )
}

export function ClassifiedSectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#3a77ff]">{eyebrow}</p>
      ) : null}
      <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[#002f34]">{title}</h2>
    </div>
  )
}

export const classifiedTheme = {
  primary: 'bg-[#3a77ff] text-white hover:bg-[#2f65e0]',
  primaryOutline:
    'border border-[#3a77ff] text-[#3a77ff] bg-white hover:bg-[#eef3ff]',
  surface: 'bg-white border border-[#e0e0e0]',
  soft: 'bg-[#ebeeef] border border-[#e0e0e0]',
  pill: 'inline-flex items-center gap-1 rounded-full bg-[#ebeeef] px-2.5 py-1 text-xs font-semibold text-[#002f34]',
  link: 'text-[#3a77ff] hover:underline font-semibold',
  muted: 'text-[#406367]',
}
