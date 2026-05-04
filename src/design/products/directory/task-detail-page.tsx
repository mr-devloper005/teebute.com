'use client'

import Link from 'next/link'
import { ArrowRight, Copy, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, X } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location =
    typeof content.address === 'string'
      ? content.address
      : typeof content.location === 'string'
        ? content.location
        : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []

  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const shareUrl = `${taskRoute.replace(/\/$/, '')}/${post.slug}`
  const shareSubject = encodeURIComponent(post.title || 'Listing')
  const shareBody = encodeURIComponent(`Check this out: ${shareUrl}`)
  const categoryLabel = category || taskLabel

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          ← Back to {taskLabel}
        </Link>

        <div className="rounded-3xl border border-blue-600 bg-blue-600 px-6 py-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">{categoryLabel}</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">{post.title}</h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:?subject=${shareSubject}&body=${shareBody}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" /> Share
              </a>
              <a
                href={shareUrl}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                <Copy className="h-4 w-4" /> Copy link
              </a>
              <a
                href="#respond"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Respond to this ad <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr_360px] lg:items-start">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <ShieldCheck className="h-4 w-4 text-slate-700" /> Avoid scams
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                <li>Never pay in advance for an inspection or viewing.</li>
                <li>Prefer meeting in public places and verify documents.</li>
                <li>Do not share OTPs, passwords, or card details.</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold text-slate-900">Related searches</p>
              <div className="mt-4 grid gap-2">
                {[categoryLabel, taskLabel, location].filter(Boolean).slice(0, 4).map((term) => (
                  <Link
                    key={term as string}
                    href={`/search?q=${encodeURIComponent(String(term))}&task=${encodeURIComponent(task)}`}
                    className="flex min-w-0 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                  >
                    <span className="truncate">{String(term)}</span>
                    <ArrowRight className="h-4 w-4 text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
              <div
                className="relative h-[360px] overflow-hidden bg-slate-100 sm:h-[420px] cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image, idx) => (
                    <div
                      key={image}
                      className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer"
                      onClick={() => openLightbox(idx + 1)}
                    >
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Overview</p>
              <div className="mt-5 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
                {location ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <MapPin className="mt-0.5 h-4 w-4" /> <span className="leading-6">{location}</span>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Phone className="h-4 w-4" /> <span>{phone}</span>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Mail className="h-4 w-4" /> <span className="truncate">{email}</span>
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <Globe className="h-4 w-4" /> <span className="truncate">{website}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Description</p>
              <RichContent html={descriptionHtml} className="mt-4 text-slate-700 prose-a:text-slate-900" />
              {highlights.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[300px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6" id="respond">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Respond to this ad</p>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-slate-950">Contact the poster</h2>
              <div className="mt-5 grid gap-3">
                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                ) : null}
                {email ? (
                  <a
                    href={`mailto:${email}?subject=${shareSubject}&body=${shareBody}`}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                ) : null}
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-50"
                  >
                    <Globe className="h-4 w-4" /> Visit website
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Browse more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold text-slate-900">Quick trust cues</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {['Verify contact details', 'Meet safely in public', 'Inspect before you pay', 'Keep chats on-platform'].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-black/95" showCloseButton={false}>
          <DialogTitle className="sr-only">Image viewer</DialogTitle>
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img
              src={images[currentImageIndex]}
              alt={post.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
