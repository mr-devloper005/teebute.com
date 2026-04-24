'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

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

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d7c4b3] bg-[#fff7ee]/90 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryQuickLinks = [
  { label: 'Cars', href: '/search?q=cars&task=classified' },
  { label: 'Motorcycles', href: '/search?q=motorcycle&task=classified' },
  { label: 'Mobile Phones', href: '/search?q=phones&task=classified' },
  { label: 'Houses & Apartments', href: '/search?q=property&task=classified' },
  { label: 'Beds & Wardrobes', href: '/search?q=furniture&task=classified' },
  { label: 'TVs, Video - Audio', href: '/search?q=electronics&task=classified' },
  { label: 'Jobs', href: '/search?q=jobs&task=classified' },
  { label: 'Services', href: '/search?q=services&task=classified' },
] as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile'), [])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const sellHref = primaryTask ? `/create/${primaryTask.key}` : '/create/classified'
    const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#e0e0e0] bg-white text-[#002f34] shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-[52px] items-center gap-2 sm:gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-1.5">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-[#e8e8e8] bg-white p-1">
                <img src="/favicon.png?v=20260401" alt="" width="32" height="32" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-extrabold leading-none tracking-tight text-[#3a77ff]">
                {SITE_CONFIG.name.slice(0, 1)}
                {SITE_CONFIG.name.slice(1).toLowerCase()}
              </span>
            </Link>

            <div className="hidden items-center gap-1 rounded-sm border border-[#002f34]/20 px-2 py-1.5 sm:flex" title="Location">
              <MapPin className="h-4 w-4 text-[#002f34]" />
              <span className="text-sm font-medium">India</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </div>

            <form action="/search" method="get" className="mx-auto hidden min-w-0 max-w-2xl flex-1 items-center gap-0 md:flex">
              <input type="hidden" name="task" value="classified" />
              <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-sm border-2 border-[#002f34] bg-white pl-3">
                <Search className="h-4 w-4 shrink-0 text-[#002f34]/60" />
                <input
                  name="q"
                  type="search"
                  autoComplete="off"
                  placeholder={'Search "Cars"'}
                  className="h-10 min-w-0 flex-1 border-0 bg-transparent px-2.5 text-sm text-[#002f34] outline-none placeholder:text-[#406367]/70"
                />
              </div>
              <button
                type="submit"
                className="grid h-10 w-12 shrink-0 place-items-center rounded-r-sm border-2 border-l-0 border-[#3a77ff] bg-[#3a77ff] text-white hover:bg-[#2f65e0]"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-2">
              {isAuthenticated ? (
                <NavbarAuthControls sellHref={sellHref} />
              ) : (
                <div className="flex items-center gap-0.5 sm:gap-2">
                  <Button variant="ghost" size="sm" asChild className="h-9 gap-1.5 rounded-md px-2 text-[#002f34] hover:bg-[#f2f4f5]">
                    <Link href="/login">
                      <User className="h-4 w-4" />
                      <span className="hidden sm:inline">Login</span>
                    </Link>
                  </Button>
                  <Link
                    href={sellHref}
                    className="inline-flex items-center gap-1 rounded-full border-[3px] border-transparent bg-white px-3 py-1.5 text-sm font-extrabold text-[#002f34] [background:linear-gradient(white,white)_padding-box,linear-gradient(100deg,#ffd000,#3a77ff,#23e5db)_border-box] shadow-sm hover:opacity-95"
                  >
                    <Plus className="h-4 w-4 font-bold" />
                    SELL
                  </Link>
                </div>
              )}

              <Button variant="ghost" size="icon" className="h-9 rounded-md md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          <div className="hidden h-11 items-center justify-between border-t border-[#f0f0f0] pr-0 text-sm md:flex">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Link
                href="/classifieds"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-[#3a77ff] px-3 py-1.5 font-bold uppercase tracking-wide text-white hover:bg-[#2f65e0]"
              >
                <Menu className="h-4 w-4" />
                All categories
              </Link>
              <div className="ml-1 flex min-w-0 items-center gap-1 overflow-x-auto pr-2">
                {directoryQuickLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="shrink-0 rounded-md px-2 py-1 font-medium text-[#002f34] hover:bg-[#f2f4f5] whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="shrink-0 pl-2 text-sm font-medium text-[#406367]">{today}</div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-[#e0e0e0] bg-white md:hidden">
            <form action="/search" method="get" className="px-4 pt-3">
              <input type="hidden" name="task" value="classified" />
              <div className="flex items-center overflow-hidden rounded-sm border-2 border-[#002f34]">
                <input
                  name="q"
                  type="search"
                  placeholder={'Search "Cars"'}
                  className="h-10 min-w-0 flex-1 border-0 bg-transparent px-3 text-sm outline-none"
                />
                <button type="submit" className="h-10 w-11 shrink-0 bg-[#3a77ff] text-white" aria-label="Search">
                  <Search className="mx-auto h-4 w-4" />
                </button>
              </div>
            </form>
            <div className="max-h-[70vh] space-y-1 overflow-y-auto px-2 py-2">
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold', isActive ? 'bg-[#3a77ff] text-white' : 'text-[#002f34] hover:bg-[#f2f4f5]')}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
              {directoryQuickLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-[#002f34] hover:bg-[#f2f4f5]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
