import Link from 'next/link'
import { Bike, Briefcase, Building2, Car, ChevronRight, Gamepad2, Home, MapPin, Package, Shirt, Smartphone, Sofa } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'

const productLinks = [
  { label: 'Homepage', href: '/' },
  { label: 'All categories', href: '/classifieds' },
  { label: 'Search', href: '/search' },
  { label: 'Post a free ad', href: '/create/classified' },
  { label: 'Login', href: '/login' },
  { label: 'Register', href: '/register' },
]

const companyLinks = [
  { label: 'About us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Contact us', href: '/contact' },
]

const supportLinks = [
  { label: 'Help center', href: '/help' },
  { label: 'Trust & safety', href: '/help#scam' },
  { label: 'Report a listing', href: '/contact?topic=report' },
  { label: 'Sitemap', href: '/site-map' },
]

const legalLinks = [
  { label: 'Privacy policy', href: '/privacy' },
  { label: 'Terms of service', href: '/terms' },
  { label: 'Open source licenses', href: '/licenses' },
  { label: 'Cookies', href: '/privacy#cookies' },
]

const categories = [
  { icon: Car, label: 'Cars' },
  { icon: Bike, label: 'Bikes' },
  { icon: Smartphone, label: 'Mobiles' },
  { icon: Sofa, label: 'Furniture' },
  { icon: Home, label: 'Real estate' },
  { icon: Briefcase, label: 'Jobs' },
  { icon: Building2, label: 'Services' },
  { icon: Shirt, label: 'Fashion' },
  { icon: Gamepad2, label: 'Hobbies' },
  { icon: Package, label: 'Everything else' },
]

const cities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Surat', 'Kanpur',
  'Nagpur', 'Indore', 'Patna', 'Bhopal', 'Coimbatore', 'Kochi',
]

function LinkColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <ClassifiedCard>
      <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#406367]">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (
          <li key={i.label}>
            <Link href={i.href} className="group inline-flex items-center gap-1 text-sm text-[#002f34] hover:text-[#3a77ff]">
              {i.label}
              <ChevronRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </ClassifiedCard>
  )
}

export default function SitemapPage() {
  return (
    <ClassifiedPageShell
      eyebrow="Sitemap"
      title="Find any page on the site"
      description="A complete index of pages, categories and locations available on the marketplace."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <LinkColumn title="Product" items={productLinks} />
        <LinkColumn title="Company" items={companyLinks} />
        <LinkColumn title="Support" items={supportLinks} />
        <LinkColumn title="Legal" items={legalLinks} />
      </div>

      <div className="mt-10">
        <ClassifiedSectionHeading eyebrow="By category" title="Browse all categories" />
        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.label}
                href={`/classifieds?category=${encodeURIComponent(c.label.toLowerCase())}`}
                className="group flex items-center gap-3 rounded-md border border-[#e0e0e0] bg-white p-4 transition hover:border-[#3a77ff]/40 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff] transition group-hover:bg-[#3a77ff] group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-bold text-[#002f34]">{c.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-10">
        <ClassifiedSectionHeading eyebrow="By location" title="Popular cities" />
        <div className="mt-6 flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city}
              href={`/search?location=${encodeURIComponent(city)}`}
              className={`${classifiedTheme.pill} hover:bg-[#3a77ff] hover:text-white`}
            >
              <MapPin className="h-3.5 w-3.5" />
              {city}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <ClassifiedCard className="text-center">
          <h3 className="text-lg font-bold text-[#002f34]">Looking for the XML sitemap?</h3>
          <p className="mt-2 text-sm text-[#406367]">
            Crawlers can fetch the machine-readable version at{' '}
            <Link href="/sitemap.xml" className={classifiedTheme.link}>
              /sitemap.xml
            </Link>
            .
          </p>
        </ClassifiedCard>
      </div>
    </ClassifiedPageShell>
  )
}
