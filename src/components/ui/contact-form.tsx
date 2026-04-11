"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { User, Mail, ArrowRight, X } from "lucide-react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface ContactFormContextValue {
  open: () => void;
}

const ContactFormContext = createContext<ContactFormContextValue | null>(null);

export function useContactForm() {
  const ctx = useContext(ContactFormContext);
  if (!ctx) throw new Error("useContactForm must be used within ContactFormProvider");
  return ctx;
}

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <ContactFormContext.Provider value={value}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 w-full max-w-md mx-4 bg-background border border-border rounded-2xl shadow-2xl p-8 animate-fade-in font-[family-name:var(--font-geist-sans)]">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close contact form"
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
            >
              <X className="size-5" />
            </button>
            <ContactForm onSuccess={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </ContactFormContext.Provider>
  );
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [consent, setConsent] = useState(false);

  const validate = (name: string, email: string, message: string): FormErrors => {
    const errs: FormErrors = {};
    if (name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address";
    if (message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("contact-name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("contact-email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("contact-message") as HTMLTextAreaElement).value;

    const validationErrors = validate(name, email, message);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, message,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
          honeypot,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.details) {
          setErrors(data.details);
          setStatus("idle");
          return;
        }
        throw new Error();
      }

      setStatus("success");

      // GA4 conversion event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", {
          event_category: "Contact Form",
          event_label: "Landing Page Modal",
        });
      }

      setTimeout(() => onSuccess?.(), 2000);
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <div className="size-12 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
          <ArrowRight className="size-5 text-foreground" />
        </div>
        <p className="text-lg font-semibold text-foreground">Thank you!</p>
        <p className="text-sm text-muted-foreground mt-1">We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm text-foreground">
      {/* Honeypot — invisible to humans */}
      <input
        type="text"
        name="honeypot"
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: "none" }}
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
      />

      <span className="text-xs bg-foreground/10 text-foreground font-medium px-3 py-1 rounded-full">Contact Us</span>
      <h2 className="text-2xl font-bold py-4 text-center text-foreground">Let's Get In Touch.</h2>
      <p className="text-sm text-muted-foreground pb-6 text-center">
        Or reach out to us at{" "}
        <a href="mailto:hello@trimio.in" className="text-foreground underline underline-offset-2 hover:opacity-80">hello@trimio.in</a>
      </p>

      <div className="w-full space-y-4">
        <div>
          <label htmlFor="contact-name" className="font-medium text-foreground">Full Name</label>
          <div className="flex items-center mt-2 h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-foreground/20 transition-all overflow-hidden bg-background">
            <User className="size-4 text-muted-foreground shrink-0" />
            <input id="contact-name" name="contact-name" type="text" className="h-full px-2 w-full outline-none bg-transparent text-foreground placeholder:text-muted-foreground" placeholder="Enter your full name" required disabled={status === "submitting"} />
          </div>
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="font-medium text-foreground">Email Address</label>
          <div className="flex items-center mt-2 h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-foreground/20 transition-all overflow-hidden bg-background">
            <Mail className="size-4 text-muted-foreground shrink-0" />
            <input id="contact-email" name="contact-email" type="email" className="h-full px-2 w-full outline-none bg-transparent text-foreground placeholder:text-muted-foreground" placeholder="Enter your email address" required disabled={status === "submitting"} />
          </div>
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="font-medium text-foreground">Message</label>
          <textarea id="contact-message" name="contact-message" rows={4} className="w-full mt-2 p-3 bg-background border border-border rounded-lg resize-none outline-none focus:ring-2 focus:ring-foreground/20 transition-all text-foreground placeholder:text-muted-foreground" placeholder="Enter your message" required disabled={status === "submitting"} />
          {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" id="consent" required className="mt-1 accent-current" checked={consent} onChange={e => setConsent(e.target.checked)} />
          <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
            By submitting, you agree to our{" "}
            <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
            {" "}and consent to be contacted about Trimio.
          </label>
        </div>

        {status === "error" && <p className="text-sm text-destructive text-center">Something went wrong. Please try again.</p>}

        <button type="submit" disabled={status === "submitting"} className="flex items-center justify-center gap-1.5 mt-2 bg-foreground hover:bg-foreground/90 text-background py-2.5 w-full rounded-full transition font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          {status === "submitting" ? "Submitting..." : "Submit Form"}
          {status !== "submitting" && <ArrowRight className="size-4" />}
        </button>
      </div>
    </form>
  );
}
