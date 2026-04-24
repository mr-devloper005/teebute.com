'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { Download, ExternalLink, FileText, Image as ImageIcon, Newspaper, Quote } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

const facts = [
  { label: 'Founded', value: '2019' },
  { label: 'Headquartered', value: 'Mumbai, India' },
  { label: 'Monthly users', value: '18M+' },
  { label: 'Cities live', value: '1,200+' },
]

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  const fileTypeIcon = (type?: string) => {
    if (!type) return FileText
    const t = type.toLowerCase()
    if (t.includes('png') || t.includes('jpg') || t.includes('svg') || t.includes('image')) return ImageIcon
    if (t.includes('pdf') || t.includes('doc')) return FileText
    return FileText
  }

  return (
    <ClassifiedPageShell
      eyebrow="Press"
      title="Newsroom & media kit"
      description={`Everything you need to write about ${SITE_CONFIG.name} — brand assets, fact sheet, leadership bios and recent coverage in one place.`}
      actions={
        <Link
          href="/contact?topic=press"
          className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primary}`}
        >
          Press inquiries
        </Link>
      }
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Press' }]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <ClassifiedCard key={f.label} className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#406367]">{f.label}</p>
            <p className="mt-1 text-2xl font-extrabold text-[#002f34]">{f.value}</p>
          </ClassifiedCard>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ClassifiedCard>
          <ClassifiedSectionHeading eyebrow="Press kit" title="Logos, screenshots & guidelines" />
          <p className="mt-2 text-sm text-[#406367]">
            Download approved assets for editorial use. For custom requests, write to{' '}
            <Link href="/contact?topic=press" className={classifiedTheme.link}>
              press@example.com
            </Link>
            .
          </p>
          <div className="mt-5 grid gap-3">
            {mockPressAssets.map((asset) => {
              const Icon = fileTypeIcon(asset.fileType)
              return (
                <div
                  key={asset.id}
                  className="flex flex-col gap-3 rounded-md border border-[#e0e0e0] bg-[#f8f9fa] p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-[#3a77ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#002f34]">{asset.title}</p>
                      <p className="mt-0.5 text-xs text-[#406367]">{asset.description}</p>
                      <span className={`${classifiedTheme.pill} mt-2`}>{asset.fileType}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveAssetId(asset.id)}
                      className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-xs font-bold ${classifiedTheme.primaryOutline}`}
                    >
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                      className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-bold ${classifiedTheme.primary}`}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </ClassifiedCard>

        <div className="grid gap-4">
          <ClassifiedCard>
            <ClassifiedSectionHeading eyebrow="In the news" title="Recent coverage" />
            <ul className="mt-5 space-y-4">
              {mockPressCoverage.map((item) => (
                <li key={item.id} className="flex items-start gap-3 border-b border-[#eeeeee] pb-4 last:border-b-0 last:pb-0">
                  <Newspaper className="mt-0.5 h-4 w-4 shrink-0 text-[#3a77ff]" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#406367]">{item.outlet}</p>
                    <p className="mt-1 text-sm leading-6 text-[#002f34]">{item.headline}</p>
                    <p className="mt-1 text-xs text-[#406367]">{item.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ClassifiedCard>

          <ClassifiedCard className="bg-[#3a77ff] text-white">
            <Quote className="h-6 w-6 text-white/80" />
            <p className="mt-3 text-base font-medium leading-7">
              &ldquo;A quietly transformative product for everyday Indian buyers and sellers — utility done right.&rdquo;
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-white/80">— Editorial review, 2026</p>
          </ClassifiedCard>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <ClassifiedCard>
          <p className="text-xs font-bold uppercase tracking-wider text-[#406367]">Media contact</p>
          <p className="mt-2 text-sm font-bold text-[#002f34]">Press team</p>
          <p className="mt-1 text-sm text-[#406367]">press@example.com</p>
        </ClassifiedCard>
        <ClassifiedCard>
          <p className="text-xs font-bold uppercase tracking-wider text-[#406367]">Investor relations</p>
          <p className="mt-2 text-sm font-bold text-[#002f34]">IR desk</p>
          <p className="mt-1 text-sm text-[#406367]">ir@example.com</p>
        </ClassifiedCard>
        <ClassifiedCard>
          <p className="text-xs font-bold uppercase tracking-wider text-[#406367]">Brand &amp; partnerships</p>
          <p className="mt-2 text-sm font-bold text-[#002f34]">Brand desk</p>
          <p className="mt-1 text-sm text-[#406367]">brand@example.com</p>
        </ClassifiedCard>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-[#e0e0e0] bg-[#f2f4f5]">
              <Image
                src={activeAsset.previewUrl}
                alt={activeAsset.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <p className="text-sm text-[#406367]">{activeAsset?.description}</p>
          <DialogFooter>
            <button
              type="button"
              onClick={() => setActiveAssetId(null)}
              className={`inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-bold ${classifiedTheme.primaryOutline}`}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
              className={`inline-flex h-10 items-center justify-center gap-1 rounded-md px-4 text-sm font-bold ${classifiedTheme.primary}`}
            >
              <ExternalLink className="h-4 w-4" />
              Download {activeAsset?.fileType}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClassifiedPageShell>
  )
}
