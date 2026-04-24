import Link from 'next/link'
import { Bell, Cookie, Database, Eye, FileText, Lock, ShieldCheck, UserCog } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'

const principles = [
  {
    icon: Lock,
    title: 'Your data is yours',
    body: 'We never sell personal data. Listings you choose to publish are public — everything else stays private to your account.',
  },
  {
    icon: Eye,
    title: 'Clear over clever',
    body: 'No buried terms. We explain what we collect, why we collect it and what you can do about it in plain language.',
  },
  {
    icon: ShieldCheck,
    title: 'Built-in safety',
    body: 'In-app chat, hidden phone numbers and report tools help keep deals safer for buyers and sellers.',
  },
]

const sections = [
  {
    icon: Database,
    title: 'Data we collect',
    body:
      'Account details (name, phone, email), listings you publish, messages you exchange in our chat, device & usage information, and limited location data when you allow it.',
  },
  {
    icon: UserCog,
    title: 'How we use your data',
    body:
      'To run the marketplace — show relevant ads near you, keep listings safe, prevent fraud, send important updates and improve the product.',
  },
  {
    icon: Cookie,
    title: 'Cookies & tracking',
    body:
      'We use cookies for sign-in, language, location and product analytics. You can control non-essential cookies from your browser at any time.',
  },
  {
    icon: Bell,
    title: 'Your choices & rights',
    body:
      'Edit or delete your profile, mute notifications, hide your phone, request a copy of your data or delete your account — all from settings.',
  },
]

const legalLinks = [
  { title: 'Terms of Service', href: '/terms', desc: 'Rules for using the marketplace.' },
  { title: 'Cookie Policy', href: '/privacy#cookies', desc: 'How we use cookies and how to opt out.' },
  { title: 'Community Guidelines', href: '/help', desc: 'What can and cannot be posted.' },
  { title: 'Open source licenses', href: '/licenses', desc: 'Third-party software we rely on.' },
]

export default function PrivacyPage() {
  return (
    <ClassifiedPageShell
      eyebrow="Legal & privacy"
      title="Your privacy, made simple"
      description="The short, honest version of how we collect, use and protect your information when you use the marketplace."
      actions={
        <Link
          href="/contact?topic=privacy"
          className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primary}`}
        >
          Privacy questions?
        </Link>
      }
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Legal & privacy' }]}
    >
      <ClassifiedCard className="bg-[#002f34] text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-white/70">Last updated</p>
        <p className="mt-1 text-base font-bold">March 16, 2026 · Version 4.2</p>
        <p className="mt-3 text-sm leading-6 text-white/80">
          This page summarises our full Privacy Policy. The complete legal document is available on request from our
          privacy team.
        </p>
      </ClassifiedCard>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {principles.map((p) => {
          const Icon = p.icon
          return (
            <ClassifiedCard key={p.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#406367]">{p.body}</p>
            </ClassifiedCard>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <ClassifiedSectionHeading eyebrow="What and why" title="The details" />
          <div className="mt-6 space-y-4">
            {sections.map((s) => {
              const Icon = s.icon
              return (
                <ClassifiedCard key={s.title}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#002f34]">{s.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#406367]">{s.body}</p>
                    </div>
                  </div>
                </ClassifiedCard>
              )
            })}
          </div>
        </div>

        <div className="grid h-fit gap-4">
          <ClassifiedCard>
            <ClassifiedSectionHeading eyebrow="Other policies" title="Related legal pages" />
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.title}>
                  <Link
                    href={l.href}
                    className="flex items-start justify-between gap-3 rounded-md border border-[#e0e0e0] bg-[#f8f9fa] p-4 transition hover:border-[#3a77ff]/40 hover:bg-white"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#002f34]">{l.title}</p>
                      <p className="mt-0.5 text-xs text-[#406367]">{l.desc}</p>
                    </div>
                    <FileText className="h-4 w-4 text-[#3a77ff]" />
                  </Link>
                </li>
              ))}
            </ul>
          </ClassifiedCard>

          <ClassifiedCard className="bg-[#3a77ff] text-white">
            <h3 className="text-lg font-bold">Need to delete your data?</h3>
            <p className="mt-2 text-sm text-white/90">
              Open settings and choose &quot;Delete my account&quot;. We&apos;ll process your request within 30 days.
            </p>
            <Link
              href="/contact?topic=privacy"
              className="mt-4 inline-flex w-fit items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-bold text-[#3a77ff] hover:bg-[#eef3ff]"
            >
              Contact privacy team
            </Link>
          </ClassifiedCard>
        </div>
      </div>
    </ClassifiedPageShell>
  )
}
