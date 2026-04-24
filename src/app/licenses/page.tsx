import Link from 'next/link'
import { ExternalLink, Heart, Package } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'

const licenses = [
  { name: 'Next.js', license: 'MIT', author: 'Vercel', href: 'https://nextjs.org' },
  { name: 'React', license: 'MIT', author: 'Meta', href: 'https://react.dev' },
  { name: 'Tailwind CSS', license: 'MIT', author: 'Tailwind Labs', href: 'https://tailwindcss.com' },
  { name: 'Radix UI', license: 'MIT', author: 'WorkOS', href: 'https://radix-ui.com' },
  { name: 'lucide-react', license: 'ISC', author: 'Lucide contributors', href: 'https://lucide.dev' },
  { name: 'shadcn/ui', license: 'MIT', author: 'shadcn', href: 'https://ui.shadcn.com' },
  { name: 'Framer Motion', license: 'MIT', author: 'Framer', href: 'https://www.framer.com/motion/' },
  { name: 'Recharts', license: 'MIT', author: 'Recharts Group', href: 'https://recharts.org' },
  { name: 'date-fns', license: 'MIT', author: 'date-fns contributors', href: 'https://date-fns.org' },
]

export default function LicensesPage() {
  return (
    <ClassifiedPageShell
      eyebrow="Legal & privacy"
      title="Open source licenses"
      description="A thank-you to the open source projects that make our marketplace possible."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Open source licenses' }]}
    >
      <ClassifiedCard className="bg-gradient-to-br from-[#3a77ff] to-[#2f65e0] text-white">
        <Heart className="h-6 w-6" />
        <h2 className="mt-3 text-2xl font-extrabold">Built on the shoulders of giants</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-white/90">
          Our product wouldn&apos;t exist without the incredible work of open source maintainers around the world.
          Below are the libraries we use and the licenses they&apos;re shared under. Full license texts ship with our application bundle.
        </p>
      </ClassifiedCard>

      <div className="mt-8">
        <ClassifiedSectionHeading eyebrow="Dependencies" title="Software we depend on" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {licenses.map((l) => (
            <ClassifiedCard key={l.name} className="transition hover:border-[#3a77ff]/40 hover:shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                  <Package className="h-5 w-5" />
                </div>
                <span className={classifiedTheme.pill}>{l.license}</span>
              </div>
              <h3 className="mt-3 text-base font-bold text-[#002f34]">{l.name}</h3>
              <p className="mt-1 text-xs text-[#406367]">by {l.author}</p>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className={`mt-3 inline-flex items-center gap-1 text-sm ${classifiedTheme.link}`}
              >
                Visit project <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </ClassifiedCard>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <ClassifiedCard className="text-center">
          <p className="text-sm text-[#406367]">
            Need the full license text for a specific package? Write to us at{' '}
            <Link href="/contact?topic=legal" className={classifiedTheme.link}>
              our legal desk
            </Link>{' '}
            and we&apos;ll send the documents.
          </p>
        </ClassifiedCard>
      </div>
    </ClassifiedPageShell>
  )
}
