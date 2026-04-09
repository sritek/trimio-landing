import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { FAQ } from '../faq';

describe('FAQ Component', () => {
  it('should render using semantic HTML elements (dl, dt, dd)', () => {
    const testFaqs = [
      { question: 'Test Question 1', answer: 'Test Answer 1' },
      { question: 'Test Question 2', answer: 'Test Answer 2' },
    ];

    const { container } = render(<FAQ faqs={testFaqs} />);

    // Verify semantic HTML structure
    const dl = container.querySelector('dl');
    expect(dl).toBeInTheDocument();

    const dtElements = container.querySelectorAll('dt');
    expect(dtElements).toHaveLength(2);

    const ddElements = container.querySelectorAll('dd');
    expect(ddElements).toHaveLength(2);
  });

  it('should include FAQPage schema when includeSchema is true', () => {
    const testFaqs = [
      { question: 'Test Question', answer: 'Test Answer' },
    ];

    const { container } = render(<FAQ faqs={testFaqs} includeSchema={true} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();

    if (script?.textContent) {
      const schema = JSON.parse(script.textContent);
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toHaveLength(1);
      expect(schema.mainEntity[0]['@type']).toBe('Question');
      expect(schema.mainEntity[0].name).toBe('Test Question');
      expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Test Answer');
    }
  });

  it('should omit schema when includeSchema is false', () => {
    const testFaqs = [
      { question: 'Test Question', answer: 'Test Answer' },
    ];

    const { container } = render(<FAQ faqs={testFaqs} includeSchema={false} />);

    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeInTheDocument();
  });

  it('should use homepageFAQs by default when no faqs prop is provided', () => {
    const { container } = render(<FAQ />);

    // Should render the default FAQs from static-content.ts
    const dl = container.querySelector('dl');
    expect(dl).toBeInTheDocument();

    // homepageFAQs has 8 items
    const dtElements = container.querySelectorAll('dt');
    expect(dtElements.length).toBeGreaterThan(0);
  });

  it('should maintain accordion functionality', () => {
    const testFaqs = [
      { question: 'Test Question', answer: 'Test Answer' },
    ];

    const { container } = render(<FAQ faqs={testFaqs} />);

    // Verify accordion components are present
    const accordionItem = container.querySelector('[data-slot="accordion-item"]');
    expect(accordionItem).toBeInTheDocument();
  });

  it('should render FAQ content correctly', () => {
    const testFaqs = [
      { question: 'What is Trimio?', answer: 'Trimio is salon management software.' },
    ];

    const { getByText, container } = render(<FAQ faqs={testFaqs} />);

    // Question should be visible
    expect(getByText('What is Trimio?')).toBeInTheDocument();
    
    // Answer is in the DOM but may be hidden by accordion
    const answerText = container.textContent;
    expect(answerText).toContain('Trimio is salon management software.');
  });
});
