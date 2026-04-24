import Link from 'next/link'
import {
  Bike,
  Briefcase,
  Building2,
  Car,
  ChevronRight,
  Filter,
  Gamepad2,
  Home as HomeIcon,
  MapPin,
  Package,
  Plus,
  Search,
  Shirt,
  Smartphone,
  Sofa,
  Tag,
} from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('classified', {
    path: '/classifieds',
    title: taskPageMetadata.classified.title,
    description: taskPageMetadata.classified.description,
  })

const categoryIcons: Record<string, any> = {
  cars: Car,
  bikes: Bike,
  mobiles: Smartphone,
  electronics: Smartphone,
  furniture: Sofa,
  property: HomeIcon,
  realestate: HomeIcon,
  jobs: Briefcase,
  services: Building2,
  fashion: Shirt,
  hobbies: Gamepad2,
}

const popularCities = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
]

const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Lowest price', value: 'price-asc' },
  { label: 'Highest price', value: 'price-desc' },
  { label: 'Most relevant', value: 'relevant' },
]

export default async function ClassifiedsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; sort?: string; q?: string; location?: string }>
}) {
  const resolved = (await searchParams) || {}
  const rawCategory = (resolved.category || '').trim()
  const activeCategory = rawCategory ? normalizeCategory(rawCategory) : 'all'
  const activeSort = resolved.sort || 'newest'
  const activeQuery = resolved.q || ''
  const activeLocation = resolved.location || ''

  const allPosts = await fetchTaskPosts('classified', 60)
  const posts =
    activeCategory && activeCategory !== 'all'
      ? allPosts.filter((post) => {
          const content = (post.content && typeof post.content === 'object' ? post.content : {}) as {
            category?: string
          }
          const c = (content.category || '').toString().toLowerCase()
          const tagText = Array.isArray(post.tags) ? post.tags.join(' ').toLowerCase() : ''
          return c.includes(activeCategory) || tagText.includes(activeCategory)
        })
      : allPosts

  return (
    <div className="min-h-screen bg-[#f2f4f5] text-[#002f34]">
      <NavbarShell />

      <section className="border-b border-[#e0e0e0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-xs font-medium text-[#406367]">
            <Link href="/" className="hover:text-[#002f34] hover:underline">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#a0aaab]" />
            <span className="text-[#002f34]">All categories</span>
          </nav>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#3a77ff]">
                Classifieds
              </p>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {activeCategory && activeCategory !== 'all'
                  ? `${activeCategory.replace(/(^|\s)\S/g, (s) => s.toUpperCase())} ads near you`
                  : 'Browse all categories'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-[#406367]">
                Discover great deals from buyers and sellers across {SITE_CONFIG.name}. {posts.length}{' '}
                ads showing.
              </p>
            </div>
            <Link
              href="/create/classified"
              className="inline-flex items-center justify-center gap-1 rounded-md bg-[#3a77ff] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2f65e0]"
            >
              <Plus className="h-4 w-4" />
              Post your ad
            </Link>
          </div>

          <form action="/classifieds" className="mt-5 grid gap-2 sm:grid-cols-[1fr_220px_auto] sm:items-stretch">
            <div className="flex items-center overflow-hidden rounded-md border border-[#cdd2d3] bg-white focus-within:border-[#3a77ff]">
              <Search className="ml-3 h-4 w-4 text-[#406367]" />
              <input
                name="q"
                defaultValue={activeQuery}
                placeholder="Find cars, mobiles, jobs..."
                className="h-11 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm outline-none placeholder:text-[#7a8989]"
              />
            </div>
            <div className="flex items-center overflow-hidden rounded-md border border-[#cdd2d3] bg-white focus-within:border-[#3a77ff]">
              <MapPin className="ml-3 h-4 w-4 text-[#406367]" />
              <input
                name="location"
                defaultValue={activeLocation}
                placeholder="Location"
                className="h-11 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm outline-none placeholder:text-[#7a8989]"
              />
            </div>
            {activeCategory && activeCategory !== 'all' ? (
              <input type="hidden" name="category" value={activeCategory} />
            ) : null}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-[#002f34] px-6 text-sm font-bold text-white hover:bg-[#003c44]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-[#002f34]">Popular categories</h2>
            <Link href="/site-map" className="text-sm font-semibold text-[#3a77ff] hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {CATEGORY_OPTIONS.slice(0, 12).map((cat) => {
              const Icon = categoryIcons[cat.slug] || Tag
              const isActive = activeCategory === cat.slug
              return (
                <Link
                  key={cat.slug}
                  href={`/classifieds?category=${cat.slug}`}
                  className={`group flex flex-col items-center justify-center gap-2 rounded-md border p-4 text-center transition ${
                    isActive
                      ? 'border-[#3a77ff] bg-[#eef3ff] shadow-sm'
                      : 'border-[#e0e0e0] bg-white hover:border-[#3a77ff]/40 hover:shadow-sm'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                      isActive
                        ? 'bg-[#3a77ff] text-white'
                        : 'bg-[#ebeeef] text-[#3a77ff] group-hover:bg-[#3a77ff] group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-bold text-[#002f34]">{cat.name}</span>
                </Link>
              )
            })}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-[#e0e0e0] bg-white p-5">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#3a77ff]" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#406367]">Filters</h3>
              </div>
              <form action="/classifieds" className="mt-4 grid gap-4">
                {activeQuery ? <input type="hidden" name="q" value={activeQuery} /> : null}
                {activeLocation ? <input type="hidden" name="location" value={activeLocation} /> : null}
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-[#002f34]">Category</label>
                  <select
                    name="category"
                    defaultValue={activeCategory}
                    className="h-10 rounded-md border border-[#cdd2d3] bg-white px-2 text-sm outline-none focus:border-[#3a77ff]"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-[#002f34]">Sort by</label>
                  <select
                    name="sort"
                    defaultValue={activeSort}
                    className="h-10 rounded-md border border-[#cdd2d3] bg-white px-2 text-sm outline-none focus:border-[#3a77ff]"
                  >
                    {sortOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    name="min"
                    placeholder="Min ₹"
                    inputMode="numeric"
                    className="h-10 rounded-md border border-[#cdd2d3] bg-white px-2 text-sm outline-none focus:border-[#3a77ff]"
                  />
                  <input
                    name="max"
                    placeholder="Max ₹"
                    inputMode="numeric"
                    className="h-10 rounded-md border border-[#cdd2d3] bg-white px-2 text-sm outline-none focus:border-[#3a77ff]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-10 rounded-md bg-[#3a77ff] text-sm font-bold text-white hover:bg-[#2f65e0]"
                >
                  Apply filters
                </button>
                <Link
                  href="/classifieds"
                  className="text-center text-xs font-semibold text-[#406367] hover:text-[#002f34] hover:underline"
                >
                  Clear all
                </Link>
              </form>
            </div>

            <div className="rounded-md border border-[#e0e0e0] bg-white p-5">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#406367]">
                Popular locations
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularCities.map((city) => (
                  <Link
                    key={city}
                    href={`/classifieds?location=${encodeURIComponent(city)}`}
                    className="inline-flex items-center gap-1 rounded-full bg-[#ebeeef] px-2.5 py-1 text-xs font-semibold text-[#002f34] hover:bg-[#3a77ff] hover:text-white"
                  >
                    <MapPin className="h-3 w-3" />
                    {city}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-[#e0e0e0] bg-[#3a77ff] p-5 text-white">
              <Tag className="h-5 w-5" />
              <h3 className="mt-2 text-sm font-bold">Got something to sell?</h3>
              <p className="mt-1 text-xs leading-5 text-white/90">
                Post your ad in 2 minutes and reach buyers in your city.
              </p>
              <Link
                href="/create/classified"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-xs font-bold text-[#3a77ff] hover:bg-[#eef3ff]"
              >
                + Post free ad
              </Link>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between gap-2">
              <p className="text-sm text-[#406367]">
                Showing <span className="font-bold text-[#002f34]">{posts.length}</span> result
                {posts.length === 1 ? '' : 's'}
              </p>
              <span className="hidden text-xs text-[#406367] sm:inline">
                Sorted by: <span className="font-bold text-[#002f34]">{sortOptions.find((s) => s.value === activeSort)?.label || 'Newest first'}</span>
              </span>
            </div>

            {posts.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <TaskPostCard
                    key={post.id}
                    post={post}
                    href={buildPostUrl('classified', post.slug)}
                    taskKey="classified"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-[#cdd2d3] bg-white p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-[#406367]" />
                <h3 className="mt-3 text-lg font-bold text-[#002f34]">No ads found</h3>
                <p className="mt-1 text-sm text-[#406367]">
                  Try clearing filters or browse another category.
                </p>
                <Link
                  href="/classifieds"
                  className="mt-4 inline-flex items-center justify-center rounded-md bg-[#3a77ff] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#2f65e0]"
                >
                  See all classifieds
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
