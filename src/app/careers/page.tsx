import Link from 'next/link'
import { Briefcase, Clock, Heart, Lightbulb, MapPin, Users } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  {
    id: 'frontend-engineer',
    title: 'Senior Frontend Engineer',
    team: 'Marketplace',
    location: 'Bengaluru / Remote (India)',
    type: 'Full-time',
    salary: '₹ 30 - 55 LPA',
    summary: 'Build the next generation of buyer & seller experiences across web and mobile web.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer — Trust & Safety',
    team: 'Design',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹ 25 - 45 LPA',
    summary: 'Design flows that protect buyers and sellers from scams without slowing real deals down.',
  },
  {
    id: 'category-lead',
    title: 'Category Lead — Cars & Bikes',
    team: 'Vertical Growth',
    location: 'Delhi NCR',
    type: 'Full-time',
    salary: '₹ 22 - 40 LPA',
    summary: 'Own the strategy for one of our largest categories, from supply to pricing tools.',
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    team: 'Operations',
    location: 'Remote (India)',
    type: 'Part-time',
    salary: '₹ 8 - 14 LPA',
    summary: 'Be the voice of our sellers — listen, support and help shape product decisions.',
  },
  {
    id: 'qa-engineer',
    title: 'QA Engineer',
    team: 'Engineering',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹ 12 - 22 LPA',
    summary: 'Keep listings, search and chat reliable for millions of daily users.',
  },
]

const benefits = [
  { icon: Heart, title: 'Health for the family', body: 'Medical cover for you, your partner, kids and parents.' },
  { icon: Clock, title: 'Flex hours, real weekends', body: 'Work in core hours that match your life — no Sunday slack pings.' },
  { icon: Lightbulb, title: 'Yearly learning budget', body: '₹ 1,00,000 every year for courses, books and conferences.' },
  { icon: Users, title: 'Quarterly team offsites', body: 'Meet your team in person — we believe great products come from great teammates.' },
]

const teams = ['Engineering', 'Design', 'Product', 'Trust & Safety', 'Operations', 'Marketing', 'Vertical Growth']

export default function CareersPage() {
  return (
    <ClassifiedPageShell
      eyebrow="Careers"
      title={`Build the marketplace millions trust every day`}
      description={`Join ${SITE_CONFIG.name} and help millions of buyers and sellers connect across India. We're a small, focused team building tools that change how people shop locally.`}
      actions={
        <>
          <Link href="#open-roles" className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primary}`}>
            See open roles
          </Link>
          <Link href="/contact" className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primaryOutline}`}>
            Talk to recruiting
          </Link>
        </>
      }
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Careers' }]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => {
          const Icon = b.icon
          return (
            <ClassifiedCard key={b.title}>
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold">{b.title}</h3>
              <p className="mt-1 text-sm leading-6 text-[#406367]">{b.body}</p>
            </ClassifiedCard>
          )
        })}
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#406367]">Teams hiring:</span>
        {teams.map((t) => (
          <span key={t} className={classifiedTheme.pill}>
            <Briefcase className="h-3.5 w-3.5" />
            {t}
          </span>
        ))}
      </div>

      <div id="open-roles" className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <ClassifiedSectionHeading eyebrow="Open positions" title={`${roles.length} roles open right now`} />
          <Link href="/contact" className={classifiedTheme.link}>
            Don&apos;t see your role? Drop us a line →
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          {roles.map((role) => (
            <ClassifiedCard key={role.id} className="transition hover:border-[#3a77ff]/40 hover:shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm bg-[#3a77ff] px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                      {role.team}
                    </span>
                    <span className={classifiedTheme.pill}>{role.type}</span>
                    <span className={`${classifiedTheme.pill} bg-[#e6fffb] text-[#005f5b]`}>{role.salary}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-[#002f34]">{role.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#406367]">{role.summary}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-[#406367]">
                    <MapPin className="h-3.5 w-3.5" />
                    {role.location}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href="/contact"
                    className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-bold ${classifiedTheme.primary}`}
                  >
                    Apply
                  </Link>
                </div>
              </div>
            </ClassifiedCard>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <ClassifiedCard>
          <ClassifiedSectionHeading eyebrow="Hiring process" title="Four short steps. No surprises." />
          <ol className="mt-5 space-y-4 text-sm text-[#002f34]">
            {[
              ['Apply', 'Send your CV and a short note about why this role.'],
              ['Intro chat', 'A 30-min call with our recruiter to align on basics.'],
              ['Skills round', 'A practical task or technical chat with the team.'],
              ['Final round', 'Meet your future teammates and ask anything.'],
            ].map(([step, body], i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#3a77ff] text-xs font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-bold">{step}</p>
                  <p className="text-sm leading-6 text-[#406367]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </ClassifiedCard>
        <ClassifiedCard>
          <ClassifiedSectionHeading eyebrow="Life at the company" title="What you can expect" />
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[#002f34]">
            <li>• Small teams that ship every week, not every quarter.</li>
            <li>• Honest feedback culture — we say what we mean, kindly.</li>
            <li>• Real ownership: pick a problem, take it end to end.</li>
            <li>• Hybrid by default, fully remote roles for the right people.</li>
            <li>• A workplace that values family time and personal life.</li>
          </ul>
        </ClassifiedCard>
      </div>
    </ClassifiedPageShell>
  )
}
