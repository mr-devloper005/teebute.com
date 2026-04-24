'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Building2, Clock, HelpCircle, Mail, MapPin, MessageCircle, Phone, ShieldAlert } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

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

const offices = [
  { city: 'Mumbai', address: 'Bandra Kurla Complex, Mumbai 400051', hours: 'Mon – Fri · 10am – 7pm' },
  { city: 'Bengaluru', address: 'Koramangala 4th Block, Bengaluru 560034', hours: 'Mon – Fri · 10am – 7pm' },
  { city: 'Delhi NCR', address: 'Cyber City, Gurugram 122002', hours: 'Mon – Fri · 10am – 7pm' },
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
          <form onSubmit={onSubmit} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" required placeholder="Your full name" className="h-11" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input id="contact-email" name="email" type="email" required placeholder="you@example.com" className="h-11" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-topic">What can we help with?</Label>
              <select
                id="contact-topic"
                name="topic"
                className="h-11 rounded-md border border-input bg-background px-3 text-sm text-[#002f34] outline-none focus:border-[#3a77ff]"
                defaultValue="General"
              >
                {['General', 'Buying help', 'Selling help', 'Report an ad', 'Business & partnerships', 'Press'].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell us a little about what's going on..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className={`inline-flex h-11 items-center justify-center rounded-md px-6 text-sm font-bold disabled:opacity-60 ${classifiedTheme.primary}`}
            >
              {submitting ? 'Sending…' : 'Send message'}
            </button>
          </form>
        </ClassifiedCard>

        <div className="grid gap-4">
          <ClassifiedCard>
            <ClassifiedSectionHeading eyebrow="Reach us directly" title="Other ways to talk" />
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-[#3a77ff]" />
                <div>
                  <p className="font-bold text-[#002f34]">Email</p>
                  <p className="text-[#406367]">support@example.com · partners@example.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-[#3a77ff]" />
                <div>
                  <p className="font-bold text-[#002f34]">Phone</p>
                  <p className="text-[#406367]">1800-000-000 · Toll free</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 text-[#3a77ff]" />
                <div>
                  <p className="font-bold text-[#002f34]">Chat</p>
                  <p className="text-[#406367]">In-app chat for buyers and sellers, 24/7</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-[#3a77ff]" />
                <div>
                  <p className="font-bold text-[#002f34]">Support hours</p>
                  <p className="text-[#406367]">Mon – Sat · 9am – 9pm IST</p>
                </div>
              </li>
            </ul>
          </ClassifiedCard>

          <ClassifiedCard>
            <ClassifiedSectionHeading eyebrow="Offices" title="Where to find us" />
            <ul className="mt-5 space-y-3">
              {offices.map((o) => (
                <li key={o.city} className="rounded-md border border-[#e0e0e0] bg-[#f8f9fa] p-4">
                  <p className="text-sm font-bold text-[#002f34]">{o.city}</p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#406367]">
                    <MapPin className="h-3.5 w-3.5" />
                    {o.address}
                  </p>
                  <p className="mt-1 text-xs text-[#406367]">{o.hours}</p>
                </li>
              ))}
            </ul>
          </ClassifiedCard>
        </div>
      </div>
    </ClassifiedPageShell>
  )
}
