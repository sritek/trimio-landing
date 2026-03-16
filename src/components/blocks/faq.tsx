'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Does Trimio support multi-branch management?",
    answer: "Yes, our Enterprise plan is built specifically for chains. You can manage multiple locations, shared inventory, and transferable staff from a single unified dashboard."
  },
  {
    question: "Can I migrate my data from my current salon software?",
    answer: "Absolutely. Our expert team provides free migration support to move your client data, staff records, and inventory history from most major salon software platforms."
  },
  {
    question: "Is the billing GST-compliant for Indian businesses?",
    answer: "Yes, Trimio is fully GST-ready. It automatically handles HSN/SAC mapping, split payments, and generates professional tax invoices for all services and products."
  },
  {
    question: "Do you offer a mobile app for staff and clients?",
    answer: "Yes, we provide a dedicated staff app for tracking schedules and commissions, and a seamless mobile booking experience for your clients."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer 24/7 technical support via WhatsApp, email, and call. Pro and Enterprise plans also come with a dedicated account manager."
  }
];

export function FAQ() {
  return (
    <section className="bg-muted/50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">Support</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>
        
        <Accordion className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-md leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
