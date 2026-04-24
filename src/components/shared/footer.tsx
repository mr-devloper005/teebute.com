import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {enabledTasks.slice(0, 5).map((task) => (
              <Link key={task.key} href={task.route} className="rounded-lg border border-[#d7deca] bg-white px-3 py-2 text-sm font-medium text-[#1f2617] hover:bg-[#ebefdf]">
                {task.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    const popular = ['Kolkata', 'Mumbai', 'Chennai', 'Pune', 'Bengaluru', 'Delhi', 'Ahmedabad']
    const trending = ['Bhubaneswar', 'Hyderabad', 'Chandigarh', 'Nashik', 'Indore', 'Kochi', 'Jaipur']
    return (
      <footer className="text-[#002f34]">
        <div className="bg-[#ebeeef]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#406367]">Popular locations</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#002f34]">
                  {popular.map((city) => (
                    <li key={city}>
                      <Link href={`/search?q=${encodeURIComponent(city)}&task=classified`} className="hover:underline">
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#406367]">Trending locations</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#002f34]">
                  {trending.map((city) => (
                    <li key={city}>
                      <Link href={`/search?q=${encodeURIComponent(city)}&task=classified`} className="hover:underline">
                        {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#406367]">About us</h3>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    { name: 'About', href: '/about' },
                    { name: 'Careers', href: '/careers' },
                    { name: 'Contact us', href: '/contact' },
                    { name: 'Press', href: '/press' },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-[#002f34] hover:underline">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#406367]">{SITE_CONFIG.name}</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#002f34]">
                  <li>
                    <Link href="/help" className="hover:underline">
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link href="/site-map" className="hover:underline">
                      Sitemap
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:underline">
                      Legal &amp; privacy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#406367]">Follow us</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socialLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-[#cad3d4] bg-white p-2 text-[#002f34] shadow-sm hover:bg-[#f2f4f5]"
                    >
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-xs text-[#406367]">Get the app: use your site on mobile for the best experience.</p>
              </div>
            </div>
            <div className="mt-10 border-t border-[#d8d8d8] pt-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded border border-[#d8d8d8] bg-white p-1">
                  <img src="/favicon.png?v=20260401" alt="" width="32" height="32" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#002f34]">{SITE_CONFIG.name.toLowerCase()}</p>
                  <p className="text-xs text-[#406367]">{siteContent.footer.tagline}</p>
                </div>
                {primaryTask ? (
                  <Link href={primaryTask.route} className="ml-auto hidden text-sm font-bold text-[#3a77ff] sm:inline-flex sm:items-center sm:gap-1 hover:underline">
                    Browse {primaryTask.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#002f34] py-4 text-center text-xs text-white/80 sm:px-6 sm:text-left">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start">
              {['Marketplace', 'Classifieds', 'Trust and safety'].map((t) => (
                <span key={t} className="text-white/70">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-white/90">
              &copy; 2006–{new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="hidden gap-3 text-white/70 sm:flex" aria-hidden>
              <span className="h-1 w-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Sections</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.platform.map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-slate-950">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
