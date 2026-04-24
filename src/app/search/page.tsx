import Link from 'next/link'
import { ChevronRight, Filter, MapPin, Package, Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

const popularSearches = ['iPhone', 'Honda Activa', 'Maruti Swift', '2 BHK flat', 'Sofa set', 'Laptop']

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string; location?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const rawCategory = (resolved.category || '').trim()
  const category = rawCategory.toLowerCase()
  const activeCategorySlug = rawCategory ? normalizeCategory(rawCategory) : ''
  const task = (resolved.task || '').trim().toLowerCase()
  const location = (resolved.location || '').trim()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  )
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)
  const hasFilters = Boolean(query || category || task || location)

  const buildUrl = (omit: string) => {
    const params = new URLSearchParams()
    if (query && omit !== 'q') params.set('q', query)
    if (rawCategory && omit !== 'category') params.set('category', rawCategory)
    if (task && omit !== 'task') params.set('task', task)
    if (location && omit !== 'location') params.set('location', location)
    const qs = params.toString()
    return qs ? `/search?${qs}` : '/search'
  }

  return (
    <div className="min-h-screen bg-[#f2f4f5] text-[#002f34]">
      <NavbarShell />

      <section className="border-b border-[#e0e0e0] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 text-xs font-medium text-[#406367]">
            <Link href="/" className="hover:text-[#002f34] hover:underline">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[#a0aaab]" />
            <span className="text-[#002f34]">Search</span>
          </nav>

          <form action="/search" className="mt-4 grid gap-2 sm:grid-cols-[1fr_220px_auto] sm:items-stretch">
            <input type="hidden" name="master" value="1" />
            {rawCategory ? <input type="hidden" name="category" value={rawCategory} /> : null}
            {task ? <input type="hidden" name="task" value={task} /> : null}
            <div className="flex items-center overflow-hidden rounded-md border border-[#cdd2d3] bg-white focus-within:border-[#3a77ff]">
              <Search className="ml-3 h-4 w-4 text-[#406367]" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search across the marketplace..."
                className="h-12 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm outline-none placeholder:text-[#7a8989]"
              />
            </div>
            <div className="flex items-center overflow-hidden rounded-md border border-[#cdd2d3] bg-white focus-within:border-[#3a77ff]">
              <MapPin className="ml-3 h-4 w-4 text-[#406367]" />
              <input
                name="location"
                defaultValue={location}
                placeholder="Anywhere"
                className="h-12 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm outline-none placeholder:text-[#7a8989]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-[#002f34] px-6 text-sm font-bold text-white hover:bg-[#003c44]"
            >
              Search
            </button>
          </form>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-[#406367]">
              {query ? (
                <>
                  <span>Showing</span>
                  <span className="font-bold text-[#002f34]">{results.length}</span>
                  <span>results for</span>
                  <span className="font-bold text-[#002f34]">&ldquo;{query}&rdquo;</span>
                </>
              ) : (
                <>
                  <span>Latest</span>
                  <span className="font-bold text-[#002f34]">{results.length}</span>
                  <span>posts across the marketplace</span>
                </>
              )}
            </div>
            {hasFilters ? (
              <Link
                href="/search"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#406367] hover:text-[#3a77ff] hover:underline"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </Link>
            ) : null}
          </div>

          {hasFilters ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {query ? (
                <Link
                  href={buildUrl('q')}
                  className="inline-flex items-center gap-1 rounded-full border border-[#3a77ff] bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#3a77ff] hover:bg-white"
                >
                  &ldquo;{query}&rdquo;
                  <X className="h-3 w-3" />
                </Link>
              ) : null}
              {rawCategory ? (
                <Link
                  href={buildUrl('category')}
                  className="inline-flex items-center gap-1 rounded-full border border-[#3a77ff] bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#3a77ff] hover:bg-white"
                >
                  Category: {rawCategory}
                  <X className="h-3 w-3" />
                </Link>
              ) : null}
              {task ? (
                <Link
                  href={buildUrl('task')}
                  className="inline-flex items-center gap-1 rounded-full border border-[#3a77ff] bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#3a77ff] hover:bg-white"
                >
                  Type: {task}
                  <X className="h-3 w-3" />
                </Link>
              ) : null}
              {location ? (
                <Link
                  href={buildUrl('location')}
                  className="inline-flex items-center gap-1 rounded-full border border-[#3a77ff] bg-[#eef3ff] px-3 py-1 text-xs font-semibold text-[#3a77ff] hover:bg-white"
                >
                  <MapPin className="h-3 w-3" />
                  {location}
                  <X className="h-3 w-3" />
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-md border border-[#e0e0e0] bg-white p-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#3a77ff]" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#406367]">
                  Refine results
                </h3>
              </div>
              <form action="/search" className="mt-4 grid gap-4">
                <input type="hidden" name="master" value="1" />
                {query ? <input type="hidden" name="q" value={query} /> : null}
                {location ? <input type="hidden" name="location" value={location} /> : null}
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-[#002f34]">Category</label>
                  <select
                    name="category"
                    defaultValue={activeCategorySlug || ''}
                    className="h-10 rounded-md border border-[#cdd2d3] bg-white px-2 text-sm outline-none focus:border-[#3a77ff]"
                  >
                    <option value="">All categories</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-[#002f34]">Type</label>
                  <select
                    name="task"
                    defaultValue={task}
                    className="h-10 rounded-md border border-[#cdd2d3] bg-white px-2 text-sm outline-none focus:border-[#3a77ff]"
                  >
                    <option value="">Any type</option>
                    {SITE_CONFIG.tasks
                      .filter((t) => t.enabled)
                      .map((t) => (
                        <option key={t.key} value={t.key}>
                          {t.label}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="h-10 rounded-md bg-[#3a77ff] text-sm font-bold text-white hover:bg-[#2f65e0]"
                >
                  Apply
                </button>
                <Link
                  href="/search"
                  className="text-center text-xs font-semibold text-[#406367] hover:text-[#002f34] hover:underline"
                >
                  Reset
                </Link>
              </form>
            </div>

            <div className="rounded-md border border-[#e0e0e0] bg-white p-5">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-[#3a77ff]" />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#406367]">
                  Popular searches
                </h3>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}&master=1`}
                    className="inline-flex items-center rounded-full bg-[#ebeeef] px-2.5 py-1 text-xs font-semibold text-[#002f34] hover:bg-[#3a77ff] hover:text-white"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-md border border-[#e0e0e0] bg-[#3a77ff] p-5 text-white">
              <Plus className="h-5 w-5" />
              <h3 className="mt-2 text-sm font-bold">Can&apos;t find it?</h3>
              <p className="mt-1 text-xs leading-5 text-white/90">
                Be the first to list it — post your free ad in just 2 minutes.
              </p>
              <Link
                href="/create/classified"
                className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-xs font-bold text-[#3a77ff] hover:bg-[#eef3ff]"
              >
                Post free ad
              </Link>
            </div>
          </aside>

          <section>
            {results.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((post) => {
                  const t = getPostTaskKey(post)
                  const href = t ? buildPostUrl(t, post.slug) : `/posts/${post.slug}`
                  return <TaskPostCard key={post.id} post={post} href={href} taskKey={t || undefined} />
                })}
              </div>
            ) : (
              <div className="rounded-md border border-dashed border-[#cdd2d3] bg-white p-12 text-center">
                <Package className="mx-auto h-10 w-10 text-[#406367]" />
                <h3 className="mt-3 text-lg font-bold text-[#002f34]">
                  {query ? `No results for "${query}"` : 'No results yet'}
                </h3>
                <p className="mt-1 text-sm text-[#406367]">
                  Try a shorter query, broaden filters, or browse popular categories below.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {CATEGORY_OPTIONS.slice(0, 6).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/classifieds?category=${c.slug}`}
                      className="inline-flex items-center rounded-full bg-[#ebeeef] px-3 py-1.5 text-xs font-semibold text-[#002f34] hover:bg-[#3a77ff] hover:text-white"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
