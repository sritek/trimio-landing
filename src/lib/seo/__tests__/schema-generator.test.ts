import { describe, it, expect, beforeEach } from 'vitest';
import { SchemaGenerator } from '../schema-generator';
import type { FAQItem } from '../schema-generator';

describe('SchemaGenerator', () => {
  let generator: SchemaGenerator;

  beforeEach(() => {
    generator = new SchemaGenerator();
  });

  describe('generateSoftwareApplicationSchema', () => {
    it('should include all required fields', () => {
      const schema = generator.generateSoftwareApplicationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('SoftwareApplication');
      expect(schema.name).toBeDefined();
      expect(schema.applicationCategory).toBeDefined();
      expect(schema.operatingSystem).toBeDefined();
      expect(schema.offers).toBeDefined();
    });

    it('should include offers with price and currency', () => {
      const schema = generator.generateSoftwareApplicationSchema();

      expect(schema.offers['@type']).toBe('Offer');
      expect(schema.offers.price).toBeDefined();
      expect(schema.offers.priceCurrency).toBeDefined();
    });

    it('should include aggregateRating with all properties', () => {
      const schema = generator.generateSoftwareApplicationSchema();

      expect(schema.aggregateRating).toBeDefined();
      expect(schema.aggregateRating?.['@type']).toBe('AggregateRating');
      expect(schema.aggregateRating?.ratingValue).toBeDefined();
      expect(schema.aggregateRating?.reviewCount).toBeDefined();
    });

    it('should produce valid parseable JSON', () => {
      const schema = generator.generateSoftwareApplicationSchema();
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('should have applicationCategory as BusinessApplication', () => {
      const schema = generator.generateSoftwareApplicationSchema();

      expect(schema.applicationCategory).toBe('BusinessApplication');
    });

    it('should include multiple operating systems', () => {
      const schema = generator.generateSoftwareApplicationSchema();

      expect(schema.operatingSystem).toContain('Web');
      expect(schema.operatingSystem).toContain('iOS');
      expect(schema.operatingSystem).toContain('Android');
    });
  });

  describe('generateFAQSchema', () => {
    it('should generate FAQPage schema with mainEntity array', () => {
      const faqs: FAQItem[] = [
        { question: 'What is Trimio?', answer: 'Trimio is a salon management software.' },
        { question: 'How much does it cost?', answer: 'Pricing starts at $29/month.' },
      ];

      const schema = generator.generateFAQSchema(faqs);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('FAQPage');
      expect(schema.mainEntity).toBeDefined();
      expect(Array.isArray(schema.mainEntity)).toBe(true);
    });

    it('should create Question and Answer objects for each FAQ', () => {
      const faqs: FAQItem[] = [
        { question: 'Test question?', answer: 'Test answer.' },
      ];

      const schema = generator.generateFAQSchema(faqs);

      expect(schema.mainEntity).toHaveLength(1);
      expect(schema.mainEntity[0]['@type']).toBe('Question');
      expect(schema.mainEntity[0].name).toBe('Test question?');
      expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe('Test answer.');
    });

    it('should handle multiple FAQs', () => {
      const faqs: FAQItem[] = [
        { question: 'Q1?', answer: 'A1' },
        { question: 'Q2?', answer: 'A2' },
        { question: 'Q3?', answer: 'A3' },
      ];

      const schema = generator.generateFAQSchema(faqs);

      expect(schema.mainEntity).toHaveLength(3);
      expect(schema.mainEntity[0].name).toBe('Q1?');
      expect(schema.mainEntity[1].name).toBe('Q2?');
      expect(schema.mainEntity[2].name).toBe('Q3?');
    });

    it('should produce valid parseable JSON', () => {
      const faqs: FAQItem[] = [
        { question: 'Test?', answer: 'Answer' },
      ];

      const schema = generator.generateFAQSchema(faqs);
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('should handle empty FAQ array', () => {
      const faqs: FAQItem[] = [];

      const schema = generator.generateFAQSchema(faqs);

      expect(schema.mainEntity).toHaveLength(0);
      expect(Array.isArray(schema.mainEntity)).toBe(true);
    });

    it('should preserve question and answer text exactly', () => {
      const faqs: FAQItem[] = [
        { 
          question: 'How do I book an appointment?', 
          answer: 'You can book appointments through our online booking system or mobile app.' 
        },
      ];

      const schema = generator.generateFAQSchema(faqs);

      expect(schema.mainEntity[0].name).toBe('How do I book an appointment?');
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe('You can book appointments through our online booking system or mobile app.');
    });

    it('should handle special characters in questions and answers', () => {
      const faqs: FAQItem[] = [
        { 
          question: 'What\'s the pricing for "premium" features?', 
          answer: 'Premium features cost $49/month & include advanced analytics.' 
        },
      ];

      const schema = generator.generateFAQSchema(faqs);
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
      expect(schema.mainEntity[0].name).toContain('premium');
      expect(schema.mainEntity[0].acceptedAnswer.text).toContain('$49/month');
    });
  });

  describe('generateOrganizationSchema', () => {
    it('should include all required Organization fields', () => {
      const schema = generator.generateOrganizationSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBeDefined();
      expect(schema.url).toBeDefined();
      expect(schema.logo).toBeDefined();
      expect(schema.description).toBeDefined();
    });

    it('should include contactPoint information', () => {
      const schema = generator.generateOrganizationSchema();

      expect(schema.contactPoint).toBeDefined();
      expect(schema.contactPoint?.['@type']).toBe('ContactPoint');
      expect(schema.contactPoint?.contactType).toBeDefined();
    });

    it('should produce valid parseable JSON', () => {
      const schema = generator.generateOrganizationSchema();
      const jsonString = JSON.stringify(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('should use absolute URL for logo', () => {
      const schema = generator.generateOrganizationSchema();

      expect(schema.logo).toMatch(/^https?:\/\//);
    });

    it('should use absolute URL for organization URL', () => {
      const schema = generator.generateOrganizationSchema();

      expect(schema.url).toMatch(/^https?:\/\//);
    });
  });

  describe('toScriptTag', () => {
    it('should convert SoftwareApplication schema to JSON string', () => {
      const schema = generator.generateSoftwareApplicationSchema();
      const jsonString = generator.toScriptTag(schema);

      expect(typeof jsonString).toBe('string');
      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('should convert FAQ schema to JSON string', () => {
      const faqs: FAQItem[] = [
        { question: 'Test?', answer: 'Answer' },
      ];
      const schema = generator.generateFAQSchema(faqs);
      const jsonString = generator.toScriptTag(schema);

      expect(typeof jsonString).toBe('string');
      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('should convert Organization schema to JSON string', () => {
      const schema = generator.generateOrganizationSchema();
      const jsonString = generator.toScriptTag(schema);

      expect(typeof jsonString).toBe('string');
      expect(() => JSON.parse(jsonString)).not.toThrow();
    });

    it('should produce valid JSON-LD for embedding', () => {
      const schema = generator.generateSoftwareApplicationSchema();
      const jsonString = generator.toScriptTag(schema);
      const parsed = JSON.parse(jsonString);

      expect(parsed['@context']).toBe('https://schema.org');
      expect(parsed['@type']).toBe('SoftwareApplication');
    });
  });

  describe('schema validation', () => {
    it('should generate schema that passes basic JSON-LD validation', () => {
      const softwareSchema = generator.generateSoftwareApplicationSchema();
      const faqSchema = generator.generateFAQSchema([
        { question: 'Test?', answer: 'Answer' },
      ]);
      const orgSchema = generator.generateOrganizationSchema();

      // All schemas should have @context and @type
      expect(softwareSchema['@context']).toBe('https://schema.org');
      expect(softwareSchema['@type']).toBe('SoftwareApplication');
      
      expect(faqSchema['@context']).toBe('https://schema.org');
      expect(faqSchema['@type']).toBe('FAQPage');
      
      expect(orgSchema['@context']).toBe('https://schema.org');
      expect(orgSchema['@type']).toBe('Organization');
    });

    it('should generate schema with no undefined values', () => {
      const schema = generator.generateSoftwareApplicationSchema();
      const jsonString = JSON.stringify(schema);

      expect(jsonString).not.toContain('undefined');
    });

    it('should generate FAQ schema with proper nesting', () => {
      const faqs: FAQItem[] = [
        { question: 'Q1?', answer: 'A1' },
      ];
      const schema = generator.generateFAQSchema(faqs);

      // Verify proper nesting structure
      expect(schema.mainEntity[0]).toHaveProperty('@type');
      expect(schema.mainEntity[0]).toHaveProperty('name');
      expect(schema.mainEntity[0]).toHaveProperty('acceptedAnswer');
      expect(schema.mainEntity[0].acceptedAnswer).toHaveProperty('@type');
      expect(schema.mainEntity[0].acceptedAnswer).toHaveProperty('text');
    });
  });

  describe('edge cases', () => {
    it('should handle very long FAQ answers', () => {
      const longAnswer = 'A'.repeat(1000);
      const faqs: FAQItem[] = [
        { question: 'Long answer question?', answer: longAnswer },
      ];

      const schema = generator.generateFAQSchema(faqs);
      const jsonString = generator.toScriptTag(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
      expect(schema.mainEntity[0].acceptedAnswer.text).toBe(longAnswer);
    });

    it('should handle Unicode characters in FAQ content', () => {
      const faqs: FAQItem[] = [
        { question: 'What about émojis? 🎉', answer: 'We support Unicode! 你好' },
      ];

      const schema = generator.generateFAQSchema(faqs);
      const jsonString = generator.toScriptTag(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
      expect(schema.mainEntity[0].name).toContain('🎉');
    });

    it('should handle newlines in FAQ answers', () => {
      const faqs: FAQItem[] = [
        { 
          question: 'Multi-line answer?', 
          answer: 'Line 1\nLine 2\nLine 3' 
        },
      ];

      const schema = generator.generateFAQSchema(faqs);
      const jsonString = generator.toScriptTag(schema);

      expect(() => JSON.parse(jsonString)).not.toThrow();
    });
  });
});
