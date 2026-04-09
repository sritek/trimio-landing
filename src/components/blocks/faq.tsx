'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SchemaGenerator } from '@/lib/seo/schema-generator';
import { homepageFAQs } from '@/lib/seo/static-content';

interface FAQProps {
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  includeSchema?: boolean;
}

export function FAQ({ faqs = homepageFAQs, includeSchema = true }: FAQProps) {
  const schemaGenerator = new SchemaGenerator();
  const faqSchema = includeSchema ? schemaGenerator.generateFAQSchema(faqs) : null;

  return (
    <section id="faq" className="bg-muted/50 px-6 py-24 sm:py-32">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: schemaGenerator.toScriptTag(faqSchema),
          }}
        />
      )}
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">Support</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </p>
        </div>
        
        <dl className="w-full">
          <Accordion className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <dt>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                </dt>
                <dd>
                  <AccordionContent className="text-muted-foreground text-md leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </dd>
              </AccordionItem>
            ))}
          </Accordion>
        </dl>
      </div>
    </section>
  );
}
