import Link from 'next/link'
import { AlertTriangle, Ban, FileText, Gavel, Scale, ShieldCheck, UserCheck } from 'lucide-react'
import { ClassifiedPageShell, ClassifiedCard, ClassifiedSectionHeading, classifiedTheme } from '@/components/shared/classified-page-shell'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    icon: UserCheck,
    title: '1. Your account',
    body: `You must be at least 18 years old to create an account on ${SITE_CONFIG.name}. Keep your login details secure and let us know straight away if you suspect unauthorised access. You're responsible for everything posted from your account.`,
  },
  {
    icon: FileText,
    title: '2. Content you post',
    body: 'You keep ownership of your listings, photos and messages. By posting them, you give us a license to display them on the platform so other users can find your ad. Don\'t post anything that you don\'t have the right to share.',
  },
  {
    icon: Ban,
    title: '3. What you can\'t do',
    body: 'No fakes, no scams, no illegal items, no harassment. We remove ads and accounts that break the rules — sometimes without notice when safety is at risk.',
  },
  {
    icon: ShieldCheck,
    title: '4. Buyer & seller responsibility',
    body: 'We host the marketplace — you make the deal. Always inspect items in person, verify documents and use safe payment methods. We don\'t guarantee transactions between users.',
  },
  {
    icon: Scale,
    title: '5. Disputes & liability',
    body: 'If something goes wrong, contact our support team — we\'ll help where we can. To the extent allowed by law, our liability is limited to the amount you paid us in the previous 12 months.',
  },
  {
    icon: Gavel,
    title: '6. Changes & governing law',
    body: 'We may update these terms occasionally. We\'ll notify you of meaningful changes. These terms are governed by the laws of India and disputes will be heard in the courts of Mumbai.',
  },
]

export default function TermsPage() {
  return (
    <ClassifiedPageShell
      eyebrow="Legal & privacy"
      title="Terms of service"
      description={`The rules of using ${SITE_CONFIG.name} — written to be readable, not just legally correct.`}
      breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms of service' }]}
      actions={
        <Link
          href="/contact?topic=legal"
          className={`inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-bold ${classifiedTheme.primaryOutline}`}
        >
          Legal questions
        </Link>
      }
    >
      <ClassifiedCard className="bg-[#002f34] text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-white/70">Effective date</p>
        <p className="mt-1 text-base font-bold">March 16, 2026 · Version 5.0</p>
        <p className="mt-3 text-sm leading-6 text-white/80">
          By using the marketplace, you agree to these terms. If you don&apos;t agree, please don&apos;t use the service.
        </p>
      </ClassifiedCard>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ClassifiedCard className="h-fit">
          <ClassifiedSectionHeading eyebrow="Quick read" title="In a nutshell" />
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#002f34]">
            <li>• Be honest in your listings.</li>
            <li>• Don&apos;t post anything illegal or unsafe.</li>
            <li>• Treat other users with respect.</li>
            <li>• We help connect — you make the deal.</li>
            <li>• We can remove rule-breaking content.</li>
          </ul>
          <div className="mt-6 flex items-start gap-3 rounded-md border border-[#fde2cf] bg-[#fff7ee] p-4 text-sm">
            <AlertTriangle className="mt-0.5 h-4 w-4 text-[#b85700]" />
            <p className="text-[#7a3a00]">
              Spotted a violation? <Link href="/contact?topic=report" className="font-bold underline">Report it</Link> — our trust team reviews every report.
            </p>
          </div>
        </ClassifiedCard>

        <div className="space-y-4">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <ClassifiedCard key={s.title}>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ebeeef] text-[#3a77ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002f34]">{s.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#406367]">{s.body}</p>
                  </div>
                </div>
              </ClassifiedCard>
            )
          })}
        </div>
      </div>

      <div className="mt-10">
        <ClassifiedCard className="text-center">
          <p className="text-sm text-[#406367]">
            Looking for our{' '}
            <Link href="/privacy" className={classifiedTheme.link}>privacy policy</Link>{' '}
            or{' '}
            <Link href="/licenses" className={classifiedTheme.link}>open source licenses</Link>?
          </p>
        </ClassifiedCard>
      </div>
    </ClassifiedPageShell>
  )
}
