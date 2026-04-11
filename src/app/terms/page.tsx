import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Trimio',
  description: 'Read the terms and conditions governing your use of Trimio salon management software.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  const lastUpdated = 'April 11, 2026'
  const contactEmail = 'legal@trimio.in'

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-8">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Trimio</a>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">Terms of Service</h1>
          <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
        </div>
        <div className="space-y-8 text-foreground">
          <section><h2 className="text-xl font-semibold mb-3">1. Acceptance of terms</h2><p className="text-muted-foreground leading-relaxed">By accessing or using Trimio, you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">2. Description of service</h2><p className="text-muted-foreground leading-relaxed">Trimio provides salon management software including appointment booking, staff scheduling, client records, and point-of-sale features. We reserve the right to modify or discontinue any part of the Service with reasonable notice.</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">3. Account responsibilities</h2><ul className="space-y-2 text-muted-foreground"><li>You must provide accurate information when creating an account.</li><li>You are responsible for maintaining the confidentiality of your credentials.</li><li>You must notify us immediately of any unauthorised use.</li></ul></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">4. Acceptable use</h2><p className="text-muted-foreground leading-relaxed mb-3">You agree NOT to:</p><ul className="space-y-2 text-muted-foreground"><li>Use the Service for any unlawful purpose</li><li>Attempt to gain unauthorised access to our systems</li><li>Reverse engineer, copy, or resell any part of the Service</li></ul></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">5. Subscription and billing</h2><p className="text-muted-foreground leading-relaxed">Paid plans are billed monthly or annually in advance. A 14-day free trial is available without a credit card. All fees are in Indian Rupees (INR) and are exclusive of applicable taxes (GST).</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">6. Cancellation and refunds</h2><p className="text-muted-foreground leading-relaxed">You may cancel your subscription at any time. Your account remains active until the end of the current billing period. We do not offer prorated refunds unless required by law.</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">7. Data ownership</h2><p className="text-muted-foreground leading-relaxed">You own all data you input into Trimio. We do not claim ownership of your data. You may export your data at any time. Upon termination, we delete your data within 30 days.</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">8. Limitation of liability</h2><p className="text-muted-foreground leading-relaxed">To the maximum extent permitted by law, Trimio shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the amount you paid us in the 3 months preceding the claim.</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">9. Governing law</h2><p className="text-muted-foreground leading-relaxed">These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of the courts in India.</p></section>
          <div className="border-t border-border" />
          <section><h2 className="text-xl font-semibold mb-3">10. Contact</h2><p className="text-muted-foreground">For questions: <a href={`mailto:${contactEmail}`} className="text-foreground underline">{contactEmail}</a></p></section>
        </div>
        <div className="mt-16 pt-8 border-t border-border" />
      </div>
    </main>
  )
}
