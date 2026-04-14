'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Menu, X, ArrowRight, User, Mail, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContactForm } from '@/components/ui/contact-form';
import { Footer } from '@/components/blocks/footer';

const ThemeToggle = dynamic(() => import('@/components/theme-toggle').then(mod => ({ default: mod.ThemeToggle })), { ssr: false });

const menuItems = [
  { name: 'Features', href: '/#features' },
  { name: 'Solution', href: '/#solution' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'About', href: '/#about' },
  { name: 'FAQ', href: '/#faq' },
];

export default function ContactPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <ContactHeader />
      <main id="main-content" className="min-h-screen bg-background">
        <div className="pt-32 md:pt-40 pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Page heading */}
            <div className="mx-auto max-w-2xl text-center mb-16">
              <span className="text-xs bg-foreground/10 text-foreground font-medium px-3 py-1 rounded-full">
                Get In Touch
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Have a question or want to learn more about Trimio? We'd love to hear from you.
              </p>
            </div>

            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">
                    Let's start a conversation
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you're looking to streamline your salon operations or just want to say hello, drop us a message and we'll get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                      <Mail className="size-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <a
                        href="mailto:business.trimio@gmail.com"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        business.trimio@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                      <MapPin className="size-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">India</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground/5">
                      <Clock className="size-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Response Time</p>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                <div className="bg-background border border-border rounded-2xl shadow-lg p-8">
                  <ContactPageForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer hideCta />
    </div>
  );
}


interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactPageForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);

  const validate = (name: string, email: string, message: string): FormErrors => {
    const errs: FormErrors = {};
    if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address';
    if (message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('contact-name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('contact-email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('contact-message') as HTMLTextAreaElement).value;

    const validationErrors = validate(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
          honeypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.details) {
          setErrors(data.details);
          setStatus('idle');
          return;
        }
        throw new Error();
      }

      setStatus('success');

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact Form',
          event_label: 'Contact Page',
        });
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <div className="size-14 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
          <ArrowRight className="size-6 text-foreground" />
        </div>
        <p className="text-xl font-semibold text-foreground">Thank you!</p>
        <p className="text-sm text-muted-foreground mt-2">We've received your message and will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-sm text-foreground">
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: 'none' }}
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />

      <div>
        <label htmlFor="contact-name" className="font-medium text-foreground">
          Full Name
        </label>
        <div className="flex items-center mt-2 h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-foreground/20 transition-all overflow-hidden bg-background">
          <User className="size-4 text-muted-foreground shrink-0" />
          <input
            id="contact-name"
            name="contact-name"
            type="text"
            className="h-full px-2 w-full outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
            placeholder="Enter your full name"
            required
            disabled={status === 'submitting'}
          />
        </div>
        {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className="font-medium text-foreground">
          Email Address
        </label>
        <div className="flex items-center mt-2 h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-foreground/20 transition-all overflow-hidden bg-background">
          <Mail className="size-4 text-muted-foreground shrink-0" />
          <input
            id="contact-email"
            name="contact-email"
            type="email"
            className="h-full px-2 w-full outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
            placeholder="Enter your email address"
            required
            disabled={status === 'submitting'}
          />
        </div>
        {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-medium text-foreground">
          Message
        </label>
        <textarea
          id="contact-message"
          name="contact-message"
          rows={5}
          className="w-full mt-2 p-3 bg-background border border-border rounded-lg resize-none outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-foreground placeholder:text-muted-foreground"
          placeholder="Tell us how we can help..."
          required
          disabled={status === 'submitting'}
        />
        {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          required
          className="mt-1 accent-current"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
          By submitting, you agree to our{' '}
          <a href="/privacy" className="underline hover:text-foreground transition-colors">
            Privacy Policy
          </a>{' '}
          and consent to be contacted about Trimio.
        </label>
      </div>

      {status === 'error' && (
        <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex items-center justify-center gap-1.5 bg-foreground hover:bg-foreground/90 text-background py-2.5 w-full rounded-full transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
        {status !== 'submitting' && <ArrowRight className="size-4" />}
      </button>
    </form>
  );
}

function ContactHeader() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const contactForm = useContactForm();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-[1000] w-full px-2 group">
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border shadow-xl backdrop-blur-xl lg:px-5'
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <img
                  src="/logo-black.svg"
                  alt="Trimio logo"
                  width={120}
                  height={28}
                  className="h-7 w-auto dark:hidden"
                />
                <img
                  src="/logo-white.svg"
                  alt="Trimio logo"
                  width={120}
                  height={28}
                  className="h-7 w-auto hidden dark:block"
                />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-3 sm:space-y-0 md:w-fit">
                <ThemeToggle />
                <button
                  onClick={() => contactForm.open()}
                  className={cn(
                    'group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none bg-primary text-primary-foreground [a]:hover:bg-primary/80 h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] cursor-pointer',
                    isScrolled ? 'lg:inline-flex' : 'hidden md:inline-flex'
                  )}
                >
                  <span>Start Free Trial</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
