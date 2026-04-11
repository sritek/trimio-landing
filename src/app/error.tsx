'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main id="main-content" className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-4">Error</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground mb-4">Something went wrong</h1>
        <p className="text-muted-foreground leading-relaxed mb-8">An unexpected error occurred. Our team has been notified.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Go home
          </a>
        </div>
      </div>
    </main>
  )
}
