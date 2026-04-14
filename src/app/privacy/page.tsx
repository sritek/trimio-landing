import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Trimio',
  description: 'Learn how Trimio collects, uses, and protects your personal data. Compliant with DPDP Act 2023, GDPR, and Meta Platform requirements.',
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'April 11, 2026'
  const contactEmail = 'business.trimio@gmail.com'
  const companyName = 'Trimio'
  const websiteUrl = 'https://trimio.in'

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-20">

        <div className="mb-8">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Trimio</a>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-8 text-foreground">

          <section>
            <h2 className="text-xl font-semibold mb-3">1. Who we are</h2>
            <p className="text-muted-foreground leading-relaxed">
              {companyName} ("we", "us", "our") operates the website at <a href={websiteUrl} className="text-foreground underline">{websiteUrl}</a> and
              provides salon management software services. This Privacy Policy explains what data we collect, how we process it,
              the purposes for which we process it, and how you may request deletion of your data. This policy applies to all users
              who access our website, use our services, or interact with us through third-party platforms including Meta (Facebook and Instagram).
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">2. What data we collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We collect the following categories of personal data:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-foreground">Data type</th>
                    <th className="text-left p-3 font-medium text-foreground">Examples</th>
                    <th className="text-left p-3 font-medium text-foreground">How collected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-3 font-medium text-foreground">Contact information</td><td className="p-3">Full name, email address</td><td className="p-3">Contact form submission</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Message content</td><td className="p-3">Free-text message you write to us</td><td className="p-3">Contact form submission</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Technical data</td><td className="p-3">IP address, browser type, device type, timezone</td><td className="p-3">Automatically via server logs</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Usage data</td><td className="p-3">Pages visited, time on page, click patterns, scroll depth</td><td className="p-3">Analytics tools (with your consent)</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Session recordings</td><td className="p-3">Anonymised screen recordings of your browsing session</td><td className="p-3">Microsoft Clarity (with your consent)</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Meta Platform data</td><td className="p-3">Public profile information, email (if you interact via Facebook/Instagram)</td><td className="p-3">Meta APIs (with your authorisation)</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How we use your data</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We process your personal data for the following specific purposes:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>To respond to your enquiries submitted through our contact form</li>
              <li>To provide you with information about {companyName} products and services</li>
              <li>To send marketing communications (only with your explicit consent, which you can withdraw at any time)</li>
              <li>To analyse website usage patterns and improve our website and services</li>
              <li>To generate heatmaps and session recordings to understand user experience</li>
              <li>To detect and prevent fraud, spam, and abuse of our services</li>
              <li>To comply with legal obligations under applicable Indian and international law</li>
              <li>To manage our presence on Meta platforms (Facebook, Instagram) and respond to interactions there</li>
            </ul>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Legal basis for processing</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">We process your personal data on the following legal bases:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="text-foreground font-medium">Consent:</span> For analytics, session recordings, marketing communications, and Meta Platform data access. You may withdraw consent at any time.</li>
              <li><span className="text-foreground font-medium">Contractual necessity:</span> To provide our services and respond to your enquiries.</li>
              <li><span className="text-foreground font-medium">Legitimate interest:</span> To improve our website, prevent fraud, and ensure security.</li>
              <li><span className="text-foreground font-medium">Legal obligation:</span> To comply with the Digital Personal Data Protection Act 2023 (India), GDPR (EU), and other applicable regulations.</li>
            </ul>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data from Meta Platforms (Facebook & Instagram)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If you interact with {companyName} through Facebook or Instagram, or authorise our application to access your Meta account, we may receive the following data from Meta:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>Your public profile information (name, profile picture)</li>
              <li>Your email address (if you grant permission)</li>
              <li>Page and post interaction data (likes, comments, messages)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We use this data solely to respond to your enquiries, provide customer support, and improve our services.
              We do not sell, rent, or share your Meta data with any third party for their own purposes.
              We do not use your Meta data for purposes unrelated to {companyName}'s services.
              You can revoke our access to your Meta data at any time through your Facebook or Instagram privacy settings.
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Third-party services we use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">We share data with the following third-party services, each for a specific purpose:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-muted-foreground border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-medium text-foreground">Service</th>
                    <th className="text-left p-3 font-medium text-foreground">Provider</th>
                    <th className="text-left p-3 font-medium text-foreground">Purpose</th>
                    <th className="text-left p-3 font-medium text-foreground">Data shared</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-3">Google Sheets</td><td className="p-3">Google LLC</td><td className="p-3">Lead storage</td><td className="p-3">Name, email, message, timezone</td></tr>
                  <tr><td className="p-3">Google Analytics 4</td><td className="p-3">Google LLC</td><td className="p-3">Website analytics</td><td className="p-3">Anonymised usage data</td></tr>
                  <tr><td className="p-3">Microsoft Clarity</td><td className="p-3">Microsoft Corp</td><td className="p-3">UX heatmaps & recordings</td><td className="p-3">Anonymised session data</td></tr>
                  <tr><td className="p-3">Sentry</td><td className="p-3">Sentry Inc</td><td className="p-3">Error monitoring</td><td className="p-3">Error logs, browser info</td></tr>
                  <tr><td className="p-3">Vercel</td><td className="p-3">Vercel Inc</td><td className="p-3">Website hosting</td><td className="p-3">IP address, request logs</td></tr>
                  <tr><td className="p-3">Meta Platforms</td><td className="p-3">Meta Platforms Inc</td><td className="p-3">Social media presence</td><td className="p-3">Interaction data (with your consent)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-sm mt-3">We do not sell your personal data to any third party.</p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Data retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal data only for as long as necessary to fulfil the purposes described in this policy.
              Contact form submissions are retained for up to 3 years after your last interaction.
              Analytics data is retained according to the default retention periods of Google Analytics (14 months) and Microsoft Clarity (30 days).
              You may request deletion of your data at any time (see Section 9).
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Data security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organisational measures to protect your data, including:
              encryption in transit (TLS 1.3), secure server-side API routes for form processing, rate limiting to prevent abuse,
              bot detection via honeypot fields, and access controls on stored data. However, no method of transmission over the
              internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Your rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">Under the DPDP Act 2023 (India), GDPR (EU), and Meta Platform Terms, you have the right to:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><span className="text-foreground font-medium">Access:</span> Request a copy of the personal data we hold about you</li>
              <li><span className="text-foreground font-medium">Correction:</span> Request correction of inaccurate or incomplete data</li>
              <li><span className="text-foreground font-medium">Deletion:</span> Request deletion of your personal data ("right to be forgotten")</li>
              <li><span className="text-foreground font-medium">Withdraw consent:</span> Withdraw your consent at any time without affecting prior processing</li>
              <li><span className="text-foreground font-medium">Data portability:</span> Request your data in a structured, machine-readable format</li>
              <li><span className="text-foreground font-medium">Restrict processing:</span> Request that we limit how we use your data</li>
              <li><span className="text-foreground font-medium">Object:</span> Object to processing based on legitimate interests</li>
              <li><span className="text-foreground font-medium">Complain:</span> Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              To exercise any of these rights, email us at <a href={`mailto:${contactEmail}`} className="text-foreground underline">{contactEmail}</a>.
              We will respond within 30 days.
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies on our website. When you first visit, a consent banner allows you to accept or decline
              non-essential cookies. Strictly necessary cookies (required for the website to function) are always active.
              Analytics and tracking cookies (Google Analytics, Microsoft Clarity) are only activated after you provide consent.
              You can change your cookie preferences at any time by clearing your browser cookies and revisiting the site.
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Children's privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal data from children.
              If we become aware that we have collected data from a child without parental consent, we will delete it promptly.
              If you believe a child has provided us with personal data, please contact us at <a href={`mailto:${contactEmail}`} className="text-foreground underline">{contactEmail}</a>.
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Changes to this policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last updated" date
              at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after
              changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          <div className="border-t border-border" />

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Contact us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For any privacy-related questions, to exercise your rights, or to request deletion of your data, contact our Data Protection Officer:
            </p>
            <div className="mt-3 p-4 border border-border rounded-lg bg-muted/30">
              <p className="text-foreground font-medium">{companyName}</p>
              <p className="text-muted-foreground">Email: <a href={`mailto:${contactEmail}`} className="text-foreground underline">{contactEmail}</a></p>
              <p className="text-muted-foreground">Website: <a href={websiteUrl} className="text-foreground underline">{websiteUrl}</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-border" />
      </div>
    </main>
  )
}
