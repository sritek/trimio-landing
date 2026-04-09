import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { SchemaGenerator } from '../schema-generator';
import type { FAQItem } from '../schema-generator';

describe('Property-Based Tests: SchemaGenerator', () => {
  let generator: SchemaGenerator;

  beforeEach(() => {
    generator = new SchemaGenerator();
  });

  describe('Property 3: Structured Data Completeness', () => {
    /**
     * **Validates: Requirements 2.1, 2.2, 2.3, 2.5, 9.3**
     * 
     * For any JSON-LD schema generation, the output SHALL be valid parseable JSON
     * and SHALL include all required fields:
     * - SoftwareApplication schema with name, applicationCategory, operatingSystem, offers, and aggregateRating properties
     * - FAQPage schema with mainEntity array containing properly structured Question and Answer objects
     */
    it('should generate valid parseable JSON for SoftwareApplication schema with all required fields', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generator.generateSoftwareApplicationSchema();
          
          // Requirement 9.3: Output SHALL be valid parseable JSON
          let parsed;
          expect(() => {
            const jsonString = JSON.stringify(schema);
            parsed = JSON.parse(jsonString);
          }).not.toThrow();
          
          // Requirement 2.1: SoftwareApplication schema SHALL include name, applicationCategory, operatingSystem, and offers
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('SoftwareApplication');
          expect(schema.name).toBeDefined();
          expect(typeof schema.name).toBe('string');
          expect(schema.name.length).toBeGreaterThan(0);
          
          expect(schema.applicationCategory).toBeDefined();
          expect(typeof schema.applicationCategory).toBe('string');
          expect(schema.applicationCategory.length).toBeGreaterThan(0);
          
          expect(schema.operatingSystem).toBeDefined();
          expect(typeof schema.operatingSystem).toBe('string');
          expect(schema.operatingSystem.length).toBeGreaterThan(0);
          
          expect(schema.offers).toBeDefined();
          expect(schema.offers['@type']).toBe('Offer');
          expect(schema.offers.price).toBeDefined();
          expect(typeof schema.offers.price).toBe('string');
          expect(schema.offers.priceCurrency).toBeDefined();
          expect(typeof schema.offers.priceCurrency).toBe('string');
          
          // Requirement 2.2: SoftwareApplication schema SHALL include aggregateRating with ratingValue and reviewCount
          expect(schema.aggregateRating).toBeDefined();
          expect(schema.aggregateRating?.['@type']).toBe('AggregateRating');
          expect(schema.aggregateRating?.ratingValue).toBeDefined();
          expect(typeof schema.aggregateRating?.ratingValue).toBe('string');
          expect(schema.aggregateRating?.reviewCount).toBeDefined();
          expect(typeof schema.aggregateRating?.reviewCount).toBe('string');
          
          // Verify no undefined values in JSON output
          const jsonString = JSON.stringify(schema);
          expect(jsonString).not.toContain('undefined');
          expect(jsonString).not.toContain('null');
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid parseable JSON for FAQPage schema with properly structured Question and Answer objects', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      // Create arbitrary generators for FAQ items
      const faqItemArbitrary = fc.record({
        question: fc.string({ minLength: 10, maxLength: 200 }),
        answer: fc.string({ minLength: 50, maxLength: 500 }),
      });
      
      const faqArrayArbitrary = fc.array(faqItemArbitrary, { minLength: 1, maxLength: 20 });

      fc.assert(
        fc.property(faqArrayArbitrary, (faqs: FAQItem[]) => {
          const schema = generator.generateFAQSchema(faqs);
          
          // Requirement 9.3: Output SHALL be valid parseable JSON
          let parsed;
          expect(() => {
            const jsonString = JSON.stringify(schema);
            parsed = JSON.parse(jsonString);
          }).not.toThrow();
          
          // Requirement 2.3: FAQPage schema SHALL have mainEntity array with Question and Answer objects
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('FAQPage');
          expect(schema.mainEntity).toBeDefined();
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBe(faqs.length);
          
          // Verify each Question and Answer object is properly structured
          schema.mainEntity.forEach((entity, index) => {
            // Question structure
            expect(entity['@type']).toBe('Question');
            expect(entity.name).toBeDefined();
            expect(typeof entity.name).toBe('string');
            expect(entity.name).toBe(faqs[index].question);
            
            // Answer structure
            expect(entity.acceptedAnswer).toBeDefined();
            expect(entity.acceptedAnswer['@type']).toBe('Answer');
            expect(entity.acceptedAnswer.text).toBeDefined();
            expect(typeof entity.acceptedAnswer.text).toBe('string');
            expect(entity.acceptedAnswer.text).toBe(faqs[index].answer);
          });
          
          // Verify no undefined values in JSON output
          const jsonString = JSON.stringify(schema);
          expect(jsonString).not.toContain('undefined');
        }),
        { numRuns: 100 }
      );
    });

    it('should handle edge case with empty FAQ array', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      fc.assert(
        fc.property(fc.constant([]), (faqs: FAQItem[]) => {
          const schema = generator.generateFAQSchema(faqs);
          
          // Should still produce valid JSON even with empty array
          expect(() => {
            const jsonString = JSON.stringify(schema);
            JSON.parse(jsonString);
          }).not.toThrow();
          
          // Schema structure should still be valid
          expect(schema['@context']).toBe('https://schema.org');
          expect(schema['@type']).toBe('FAQPage');
          expect(schema.mainEntity).toBeDefined();
          expect(Array.isArray(schema.mainEntity)).toBe(true);
          expect(schema.mainEntity.length).toBe(0);
        }),
        { numRuns: 100 }
      );
    });

    it('should handle FAQs with special characters and maintain valid JSON', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      // Create arbitrary generators with special characters
      const specialCharFaqArbitrary = fc.array(
        fc.record({
          question: fc.string({ minLength: 10, maxLength: 100 }).map(s => 
            `${s} "quotes" 'apostrophes' & ampersands?`
          ),
          answer: fc.string({ minLength: 50, maxLength: 200 }).map(s => 
            `${s}\nNewlines\tTabs & special chars: <>"'`
          ),
        }),
        { minLength: 1, maxLength: 10 }
      );

      fc.assert(
        fc.property(specialCharFaqArbitrary, (faqs: FAQItem[]) => {
          const schema = generator.generateFAQSchema(faqs);
          
          // Must produce valid parseable JSON despite special characters
          let parsed;
          expect(() => {
            const jsonString = JSON.stringify(schema);
            parsed = JSON.parse(jsonString);
          }).not.toThrow();
          
          // Verify content is preserved correctly
          expect(schema.mainEntity.length).toBe(faqs.length);
          schema.mainEntity.forEach((entity, index) => {
            expect(entity.name).toBe(faqs[index].question);
            expect(entity.acceptedAnswer.text).toBe(faqs[index].answer);
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should handle FAQs with Unicode and emoji characters', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      // Create arbitrary generators with Unicode characters
      const unicodeFaqArbitrary = fc.array(
        fc.record({
          question: fc.string({ minLength: 10, maxLength: 100 }).map(s => 
            `${s} 你好 مرحبا 🎉 ✨`
          ),
          answer: fc.string({ minLength: 50, maxLength: 200 }).map(s => 
            `${s} café résumé naïve 🚀 💡`
          ),
        }),
        { minLength: 1, maxLength: 10 }
      );

      fc.assert(
        fc.property(unicodeFaqArbitrary, (faqs: FAQItem[]) => {
          const schema = generator.generateFAQSchema(faqs);
          
          // Must produce valid parseable JSON with Unicode
          expect(() => {
            const jsonString = JSON.stringify(schema);
            JSON.parse(jsonString);
          }).not.toThrow();
          
          // Verify Unicode content is preserved
          schema.mainEntity.forEach((entity, index) => {
            expect(entity.name).toBe(faqs[index].question);
            expect(entity.acceptedAnswer.text).toBe(faqs[index].answer);
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should generate valid JSON-LD that can be embedded in script tags', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      // Test both SoftwareApplication and FAQPage schemas
      const faqArrayArbitrary = fc.array(
        fc.record({
          question: fc.string({ minLength: 10, maxLength: 150 }),
          answer: fc.string({ minLength: 50, maxLength: 300 }),
        }),
        { minLength: 1, maxLength: 15 }
      );

      fc.assert(
        fc.property(faqArrayArbitrary, (faqs: FAQItem[]) => {
          const softwareSchema = generator.generateSoftwareApplicationSchema();
          const faqSchema = generator.generateFAQSchema(faqs);
          
          // Requirement 2.5: JSON-LD SHALL pass Google's Rich Results Test (valid JSON is prerequisite)
          // Convert to script tag format
          const softwareScriptTag = generator.toScriptTag(softwareSchema);
          const faqScriptTag = generator.toScriptTag(faqSchema);
          
          // Both should be valid JSON strings
          expect(typeof softwareScriptTag).toBe('string');
          expect(typeof faqScriptTag).toBe('string');
          
          // Both should parse without errors
          let parsedSoftware, parsedFaq;
          expect(() => {
            parsedSoftware = JSON.parse(softwareScriptTag);
          }).not.toThrow();
          expect(() => {
            parsedFaq = JSON.parse(faqScriptTag);
          }).not.toThrow();
          
          // Parsed schemas should maintain structure
          expect(parsedSoftware['@context']).toBe('https://schema.org');
          expect(parsedSoftware['@type']).toBe('SoftwareApplication');
          expect(parsedFaq['@context']).toBe('https://schema.org');
          expect(parsedFaq['@type']).toBe('FAQPage');
        }),
        { numRuns: 100 }
      );
    });

    it('should ensure all required SoftwareApplication fields are non-empty strings', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      fc.assert(
        fc.property(fc.constant(null), () => {
          const schema = generator.generateSoftwareApplicationSchema();
          
          // All string fields should be non-empty
          expect(schema.name.length).toBeGreaterThan(0);
          expect(schema.applicationCategory.length).toBeGreaterThan(0);
          expect(schema.operatingSystem.length).toBeGreaterThan(0);
          expect(schema.offers.price.length).toBeGreaterThan(0);
          expect(schema.offers.priceCurrency.length).toBeGreaterThan(0);
          expect(schema.aggregateRating?.ratingValue.length).toBeGreaterThan(0);
          expect(schema.aggregateRating?.reviewCount.length).toBeGreaterThan(0);
          
          // Verify proper types
          expect(typeof schema.name).toBe('string');
          expect(typeof schema.applicationCategory).toBe('string');
          expect(typeof schema.operatingSystem).toBe('string');
          expect(typeof schema.offers.price).toBe('string');
          expect(typeof schema.offers.priceCurrency).toBe('string');
          expect(typeof schema.aggregateRating?.ratingValue).toBe('string');
          expect(typeof schema.aggregateRating?.reviewCount).toBe('string');
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain proper nesting structure in FAQPage schema', () => {
      // Feature: seo-engagement-optimizer, Property 3: Structured Data Completeness
      
      const faqArrayArbitrary = fc.array(
        fc.record({
          question: fc.string({ minLength: 10, maxLength: 150 }),
          answer: fc.string({ minLength: 50, maxLength: 300 }),
        }),
        { minLength: 1, maxLength: 15 }
      );

      fc.assert(
        fc.property(faqArrayArbitrary, (faqs: FAQItem[]) => {
          const schema = generator.generateFAQSchema(faqs);
          
          // Verify proper nesting: FAQPage > mainEntity > Question > acceptedAnswer > Answer
          expect(schema).toHaveProperty('@context');
          expect(schema).toHaveProperty('@type');
          expect(schema).toHaveProperty('mainEntity');
          
          schema.mainEntity.forEach(entity => {
            // Each entity should be a Question
            expect(entity).toHaveProperty('@type');
            expect(entity['@type']).toBe('Question');
            expect(entity).toHaveProperty('name');
            expect(entity).toHaveProperty('acceptedAnswer');
            
            // Each acceptedAnswer should be an Answer
            expect(entity.acceptedAnswer).toHaveProperty('@type');
            expect(entity.acceptedAnswer['@type']).toBe('Answer');
            expect(entity.acceptedAnswer).toHaveProperty('text');
            
            // Verify no extra properties
            const entityKeys = Object.keys(entity);
            expect(entityKeys).toContain('@type');
            expect(entityKeys).toContain('name');
            expect(entityKeys).toContain('acceptedAnswer');
            
            const answerKeys = Object.keys(entity.acceptedAnswer);
            expect(answerKeys).toContain('@type');
            expect(answerKeys).toContain('text');
          });
        }),
        { numRuns: 100 }
      );
    });
  });
});
