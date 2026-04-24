import Link from 'next/link'
import { CreditCard, MessageSquare, PackageSearch, ScanSearch, Search, ShieldCheck, ShoppingBag, Tag, User } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'

const topics = [
  { icon: ShoppingBag, title: 'Buying basics', body: 'How to search, contact sellers, and meet safely.' },
  { icon: Tag, title: 'Posting an ad', body: 'Pricing tips, photos, and writing titles that sell faster.' },
  { icon: ShieldCheck, title: 'Trust & safety', body: 'Spot scams, stay safe and report bad behaviour.' },
  { icon: User, title: 'Your account', body: 'Edit profile, manage notifications, change password.' },
  { icon: CreditCard, title: 'Payments & deals', body: 'Cash, UPI, escrow — pick what works for the deal.' },
  { icon: PackageSearch, title: 'Lost & found ads', body: 'Find an old listing or recover a deleted ad.' },
]

const quickLinks = [
  { label: 'How do I post my first ad?', href: '#post-ad' },
  { label: 'How to chat with a seller', href: '#chat' },
  { label: 'How to spot a scam', href: '#scam' },
  { label: 'How to delete my account', href: '#delete' },
  { label: 'Why was my ad rejected?', href: '#rejected' },
]

export default function HelpPage() {
  return (
    <ClassifiedPageShell
      eyebrow="Help center"
      title="How can we help you today?"
      description="Find quick answers, step-by-step guides and best practices for buying and selling on the marketplace."
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Help' }]}
    >
      <ClassifiedCard className="bg-gradient-to-br from-[#002f34] to-[#003c44] text-white">
        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">Search the help center</h2>
            <p className="mt-1 text-sm text-white/80">Try &quot;how to sell my car&quot; or &quot;report fake listing&quot;.</p>
          </div>
          <form action="/search" method="get" className="flex w-full items-center overflow-hidden rounded-md bg-white md:w-[420px]">
            <div className="flex items-center pl-3 text-[#406367]">
              <Search className="h-4 w-4" />
            </div>
            <input
              name="q"
              type="search"
              placeholder="Search articles..."
              className="h-11 min-w-0 flex-1 border-0 bg-transparent px-2 text-sm text-[#002f34] outline-none"
            />
            <button type="submit" className="h-11 bg-[#3a77ff] px-4 text-sm font-bold text-white hover:bg-[#2f65e0]">
              Search
            </button>
          </form>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {quickLinks.map((q) => (
            <a key={q.label} href={q.href} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20">
              {q.label}
            </a>
          ))}
        </div>
      </ClassifiedCard>

      <div className="mt-10">
        <ClassifiedSectionHeading eyebrow="Browse topics" title="Pick a topic to explore" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((t) => {
            const Icon = t.icon
            return (
              <ClassifiedCard key={t.title} className="transition hover:border-[#3a77ff]/40 hover:shadow-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold">{t.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#406367]">{t.body}</p>
              </ClassifiedCard>
            )
          })}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ClassifiedCard>
          <ClassifiedSectionHeading eyebrow="Frequently asked" title="Quick answers" />
          <Accordion type="single" collapsible className="mt-4">
            {mockFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-[#e8e8e8]">
                <AccordionTrigger className="text-left text-sm font-semibold text-[#002f34] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-[#406367]">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ClassifiedCard>

        <div className="grid gap-4">
          <ClassifiedCard>
            <ClassifiedSectionHeading eyebrow="Selling like a pro" title="5 tips for faster sales" />
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-[#002f34]">
              <li>Use clear, well-lit photos — at least 4 angles.</li>
              <li>Write a title with the brand, model and year.</li>
              <li>Set a fair price and mention if it&apos;s negotiable.</li>
              <li>Reply to messages within an hour when possible.</li>
              <li>Meet in safe public places for handovers.</li>
            </ol>
          </ClassifiedCard>

          <ClassifiedCard className="bg-[#f1faf6] border-[#bfe6d2]">
            <div className="flex items-start gap-3">
              <ScanSearch className="mt-0.5 h-5 w-5 text-[#1c8a55]" />
              <div>
                <h3 className="text-sm font-bold text-[#0c5b39]">Spotted something off?</h3>
                <p className="mt-1 text-sm leading-6 text-[#0c5b39]/80">
                  Use the report button on any ad, or write to us — our trust team reviews every report.
                </p>
                <Link href="/contact?topic=report" className="mt-3 inline-flex items-center text-sm font-bold text-[#0c5b39] hover:underline">
                  Report an ad →
                </Link>
              </div>
            </div>
          </ClassifiedCard>

          <ClassifiedCard>
            <div className="flex items-start gap-3">
              <MessageSquare className="mt-0.5 h-5 w-5 text-[#3a77ff]" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-[#002f34]">Still need help?</h3>
                <p className="mt-1 text-sm leading-6 text-[#406367]">
                  Our support team is online Mon–Sat, 9am to 9pm IST.
                </p>
                <Link
                  href="/contact"
                  className={`mt-3 inline-flex w-fit items-center justify-center rounded-md px-4 py-2 text-sm font-bold ${classifiedTheme.primary}`}
                >
                  Contact support
                </Link>
              </div>
            </div>
          </ClassifiedCard>
        </div>
      </div>
    </ClassifiedPageShell>
  )
}
