'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Building2, Clock, HelpCircle, Mail, MapPin, MessageCircle, Phone, ShieldAlert } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { siteIdentity } from '@/config/site.identity'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

const channels = [
  {
    icon: HelpCircle,
    title: 'Help & FAQ',
    body: 'Browse the most common buyer and seller questions — most answers are one click away.',
    cta: 'Open Help Center',
    href: '/help',
  },
  {
    icon: ShieldAlert,
    title: 'Report an ad',
    body: 'Suspicious listing or unsafe behaviour? Our trust team reviews reports every day.',
    cta: 'Submit a report',
    href: '/contact?topic=report',
  },
  {
    icon: Building2,
    title: 'Business & partnerships',
    body: 'Bulk listings, dealer onboarding or media collaborations — let&apos;s talk.',
    cta: 'Talk business',
    href: '/contact?topic=business',
  },
]


export default function ContactPage() {
  const { toast } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      toast({
        title: 'Message sent',
        description: 'Thanks! Our team will get back to you within 1 business day.',
      })
      ;(e.currentTarget as HTMLFormElement).reset()
    }, 800)
  }

  return (
    <ClassifiedPageShell
      eyebrow="Contact us"
      title="We're here to help"
      description="Pick the lane that fits your question — or send a message directly. Real humans read everything that reaches us."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact us' }]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((c) => {
          const Icon = c.icon
          return (
            <ClassifiedCard key={c.title} className="flex flex-col">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#406367]">{c.body}</p>
              <Link href={c.href} className={`mt-4 inline-flex w-fit items-center text-sm ${classifiedTheme.link}`}>
                {c.cta} →
              </Link>
            </ClassifiedCard>
          )
        })}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ClassifiedCard>
          <ClassifiedSectionHeading eyebrow="Send a message" title="Drop us a line" />
          <p className="mt-2 text-sm text-[#406367]">We reply within one business day.</p>
          <ContactLeadForm />
        </ClassifiedCard>
      </div>



    
    </ClassifiedPageShell>
  )
}
