import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Trimio',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main id="main-content" className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-4">404</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">Page not found</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
          Back to Trimio
        </Link>
      </div>
    </main>
  )
}
