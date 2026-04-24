import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { Building2, Handshake, MapPinned, ShieldCheck, Sparkles, Users } from 'lucide-react'

const stats = [
  { label: 'Active classifieds', value: '2.4M+' },
  { label: 'Cities covered', value: '1,200+' },
  { label: 'Buyers & sellers', value: '18M' },
  { label: 'Avg. response time', value: '< 1 hr' },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust comes first',
    description:
      'Every listing goes through quality checks so buyers can browse with confidence and sellers can list without worry.',
  },
  {
    icon: MapPinned,
    title: 'Hyper-local discovery',
    description:
      'From a phone in your neighbourhood to a flat across town — the classifieds you see are the ones that matter near you.',
  },
  {
    icon: Handshake,
    title: 'Honest, simple deals',
    description:
      'Plain pricing, no hidden upsells, no spam. We keep the marketplace clean so good deals reach real people.',
  },
]

const milestones = [
  { year: '2019', text: `${SITE_CONFIG.name} starts with a single classifieds board for one city.` },
  { year: '2021', text: 'Crosses 1 million ads with verified seller profiles.' },
  { year: '2023', text: 'Launches in-app chat and safe-deal tips across 500+ cities.' },
  { year: '2026', text: 'Becomes the everyday marketplace for buyers and sellers across India.' },
]

export default function AboutPage() {
  return (
    <ClassifiedPageShell
      eyebrow="About us"
      title={`The marketplace built for everyday India`}
      description={`${SITE_CONFIG.name} is where neighbours meet to buy and sell — cars, mobiles, properties, jobs, services and everything in between. We make classifieds simple, safe and useful for everyone.`}
      actions={
        <>
          <Link href="/contact" className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primary}`}>
            Talk to our team
          </Link>
          <Link href="/careers" className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primaryOutline}`}>
            We&apos;re hiring
          </Link>
        </>
      }
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About us' }]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <ClassifiedCard key={s.label} className="text-center">
            <p className="text-3xl font-extrabold text-[#3a77ff]">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#406367]">{s.label}</p>
          </ClassifiedCard>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ClassifiedCard>
          <ClassifiedSectionHeading eyebrow="Our story" title="Built block by block, ad by ad" />
          <p className="mt-4 text-sm leading-7 text-[#406367]">
            We started small — one city, a few hundred classifieds and an idea that buying and selling between
            neighbours should feel as easy as a chat. Today we connect millions of people every month, but the
            promise has not changed: a marketplace that respects your time, your money and your trust.
          </p>
          <div className="mt-6 grid gap-3">
            {milestones.map((m) => (
              <div key={m.year} className="flex items-start gap-4 rounded-md border border-[#e0e0e0] bg-[#f8f9fa] p-4">
                <span className="rounded-sm bg-[#002f34] px-2 py-1 text-xs font-extrabold text-white">{m.year}</span>
                <p className="text-sm leading-6 text-[#002f34]">{m.text}</p>
              </div>
            ))}
          </div>
        </ClassifiedCard>

        <div className="grid gap-4">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <ClassifiedCard key={v.title}>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#406367]">{v.description}</p>
              </ClassifiedCard>
            )
          })}
        </div>
      </div>

      {mockTeamMembers.length > 0 ? (
        <div className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <ClassifiedSectionHeading eyebrow="Meet the team" title="People keeping the marketplace human" />
            <Link href="/careers" className={classifiedTheme.link}>
              Open roles →
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockTeamMembers.map((member) => (
              <ClassifiedCard key={member.id}>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-[#e0e0e0]">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-[#3a77ff] text-white">{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#002f34]">{member.name}</p>
                    <p className="truncate text-xs text-[#406367]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#406367]">{member.bio}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs text-[#406367]">
                  <MapPinned className="h-3.5 w-3.5" />
                  {member.location}
                </p>
              </ClassifiedCard>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-12 grid gap-4 rounded-md bg-[#3a77ff] p-8 text-white sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">Get involved</p>
          <h3 className="mt-2 text-2xl font-extrabold">Sell something today, find a deal tomorrow.</h3>
          <p className="mt-2 max-w-xl text-sm text-white/90">
            Post a classified in minutes or browse what&apos;s new in your city — it&apos;s free and always will be.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/create/classified" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2.5 text-sm font-bold text-[#3a77ff] hover:bg-[#eef3ff]">
            + Post an ad
          </Link>
          <Link href="/classifieds" className="inline-flex items-center justify-center rounded-md border-2 border-white px-4 py-2.5 text-sm font-bold text-white hover:bg-white hover:text-[#3a77ff]">
            Browse classifieds
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-3 text-center text-xs text-[#406367] sm:grid-cols-3">
        <span className="inline-flex items-center justify-center gap-2">
          <Users className="h-4 w-4" /> Community-first product
        </span>
        <span className="inline-flex items-center justify-center gap-2">
          <Building2 className="h-4 w-4" /> Headquartered across India
        </span>
        <span className="inline-flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" /> Independently funded
        </span>
      </div>
    </ClassifiedPageShell>
  )
}
