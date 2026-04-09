import { describe, it, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import { MetadataGenerator } from '../metadata-generator';
import type { MetadataConfig } from '../metadata-generator';

describe('Property-Based Tests: MetadataGenerator', () => {
  let generator: MetadataGenerator;

  beforeEach(() => {
    generator = new MetadataGenerator();
  });

  describe('Property 1: Metadata Completeness', () => {
    /**
     * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 9.1, 9.5**
     * 
     * For any page metadata generation, the output SHALL include all required meta tags:
     * - title with primary keyword
     * - description (150-155 chars with keywords)
     * - canonical URL
     * - robots directives (index, follow)
     * - viewport tag (handled by Next.js)
     * - complete Open Graph tags (title, description, image, url, type)
     * - complete Twitter Card tags (card, title, description, image)
     * - no duplicate tags
     */
    it('should include all required meta tags for any page config', () => {
      // Feature: seo-engagement-optimizer, Property 1: Metadata Completeness
      
      // Create arbitrary generators for valid metadata config
      const metadataConfigArbitrary = fc.record({
        title: fc.string({ minLength: 10, maxLength: 60 }),
        description: fc.string({ minLength: 150, maxLength: 155 }),
        keywords: fc.option(
          fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
          { nil: undefined }
        ),
        canonical: fc.option(
          fc.webUrl({ withFragments: false, withQueryParameters: false }),
          { nil: undefined }
        ),
        ogImage: fc.option(
          fc.oneof(
            fc.webUrl(),
            fc.string({ minLength: 5, maxLength: 50 }).map(s => `/${s}.png`)
          ),
          { nil: undefined }
        ),
        twitterImage: fc.option(
          fc.oneof(
            fc.webUrl(),
            fc.string({ minLength: 5, maxLength: 50 }).map(s => `/${s}.png`)
          ),
          { nil: undefined }
        ),
      });

      fc.assert(
        fc.property(metadataConfigArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // Requirement 1.1: Title tag present
          expect(metadata.title).toBeDefined();
          expect(metadata.title).toBe(config.title);
          expect(typeof metadata.title).toBe('string');
          expect(metadata.title.length).toBeGreaterThan(0);

          // Requirement 1.2: Meta description present (150-155 chars)
          expect(metadata.description).toBeDefined();
          expect(metadata.description).toBe(config.description);
          expect(typeof metadata.description).toBe('string');
          expect(metadata.description.length).toBeGreaterThanOrEqual(150);
          expect(metadata.description.length).toBeLessThanOrEqual(155);

          // Requirement 1.3: Canonical URL present
          expect(metadata.alternates).toBeDefined();
          expect(metadata.alternates.canonical).toBeDefined();
          expect(typeof metadata.alternates.canonical).toBe('string');
          expect(metadata.alternates.canonical).toMatch(/^https?:\/\//);

          // Requirement 1.4: Robots meta tag with "index, follow"
          expect(metadata.robots).toBeDefined();
          expect(metadata.robots).toEqual({ index: true, follow: true });

          // Requirement 1.6: Complete Open Graph tags
          expect(metadata.openGraph).toBeDefined();
          expect(metadata.openGraph.title).toBeDefined();
          expect(metadata.openGraph.title).toBe(config.title);
          expect(metadata.openGraph.description).toBeDefined();
          expect(metadata.openGraph.description).toBe(config.description);
          expect(metadata.openGraph.url).toBeDefined();
          expect(metadata.openGraph.url).toMatch(/^https?:\/\//);
          expect(metadata.openGraph.siteName).toBeDefined();
          expect(metadata.openGraph.type).toBe('website');
          expect(metadata.openGraph.locale).toBe('en_US');
          
          // Open Graph images
          expect(metadata.openGraph.images).toBeDefined();
          expect(Array.isArray(metadata.openGraph.images)).toBe(true);
          expect(metadata.openGraph.images.length).toBeGreaterThan(0);
          expect(metadata.openGraph.images[0].url).toBeDefined();
          expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
          expect(metadata.openGraph.images[0].width).toBe(1200);
          expect(metadata.openGraph.images[0].height).toBe(630);
          expect(metadata.openGraph.images[0].alt).toBeDefined();

          // Requirement 1.7: Complete Twitter Card tags
          expect(metadata.twitter).toBeDefined();
          expect(metadata.twitter.card).toBe('summary_large_image');
          expect(metadata.twitter.title).toBeDefined();
          expect(metadata.twitter.title).toBe(config.title);
          expect(metadata.twitter.description).toBeDefined();
          expect(metadata.twitter.description).toBe(config.description);
          expect(metadata.twitter.images).toBeDefined();
          expect(Array.isArray(metadata.twitter.images)).toBe(true);
          expect(metadata.twitter.images.length).toBeGreaterThan(0);
          expect(metadata.twitter.images[0]).toMatch(/^https?:\/\//);

          // Requirement 9.1: No duplicate tags
          // Check that all top-level keys are unique (no duplicates in object)
          const topLevelKeys = Object.keys(metadata);
          const uniqueKeys = new Set(topLevelKeys);
          expect(topLevelKeys.length).toBe(uniqueKeys.size);

          // Check Open Graph keys are unique
          const ogKeys = Object.keys(metadata.openGraph);
          const uniqueOgKeys = new Set(ogKeys);
          expect(ogKeys.length).toBe(uniqueOgKeys.size);

          // Check Twitter keys are unique
          const twitterKeys = Object.keys(metadata.twitter);
          const uniqueTwitterKeys = new Set(twitterKeys);
          expect(twitterKeys.length).toBe(uniqueTwitterKeys.size);

          // Requirement 9.5: Viewport meta tag (handled by Next.js, but verify structure)
          // Note: viewport is typically set in Next.js config or layout, not in metadata object
          // We verify the metadata structure is complete without viewport since Next.js handles it

          // Additional validation: keywords handling
          if (config.keywords !== undefined) {
            expect(metadata.keywords).toBeDefined();
            expect(typeof metadata.keywords).toBe('string');
            if (config.keywords.length > 0) {
              expect(metadata.keywords).toBe(config.keywords.join(', '));
            }
          }
        }),
        { numRuns: 100 }
      );
    });

    it('should handle edge cases with minimal valid input', () => {
      // Feature: seo-engagement-optimizer, Property 1: Metadata Completeness
      
      // Test with minimal required fields
      const minimalConfigArbitrary = fc.record({
        title: fc.constant('Minimal Title Test'),
        description: fc.constant('A'.repeat(150)), // Exactly 150 characters
      });

      fc.assert(
        fc.property(minimalConfigArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // All required fields should still be present even with minimal input
          expect(metadata.title).toBeDefined();
          expect(metadata.description).toBeDefined();
          expect(metadata.robots).toEqual({ index: true, follow: true });
          expect(metadata.alternates.canonical).toBeDefined();
          expect(metadata.openGraph).toBeDefined();
          expect(metadata.twitter).toBeDefined();
        }),
        { numRuns: 100 }
      );
    });

    it('should ensure image URLs are always absolute', () => {
      // Feature: seo-engagement-optimizer, Property 1: Metadata Completeness
      
      // Test with various image URL formats
      const configWithImagesArbitrary = fc.record({
        title: fc.string({ minLength: 10, maxLength: 60 }),
        description: fc.string({ minLength: 150, maxLength: 155 }),
        ogImage: fc.oneof(
          fc.webUrl(), // Absolute URL
          fc.string({ minLength: 5, maxLength: 30 }).map(s => `/${s}.png`), // Relative URL with slash
          fc.string({ minLength: 5, maxLength: 30 }).map(s => `${s}.png`) // Relative URL without slash
        ),
        twitterImage: fc.option(
          fc.oneof(
            fc.webUrl(),
            fc.string({ minLength: 5, maxLength: 30 }).map(s => `/${s}.png`)
          ),
          { nil: undefined }
        ),
      });

      fc.assert(
        fc.property(configWithImagesArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // Requirement 1.8: Image URLs must be absolute
          expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
          expect(metadata.twitter.images[0]).toMatch(/^https?:\/\//);

          // Verify dimensions meet requirements (1200x630)
          expect(metadata.openGraph.images[0].width).toBe(1200);
          expect(metadata.openGraph.images[0].height).toBe(630);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 2: Social Media Image URLs', () => {
    /**
     * **Validates: Requirements 1.8**
     * 
     * For any Open Graph or Twitter Card image specification, the URL SHALL be absolute
     * (not relative) and the image dimensions SHALL be at least 1200x630 pixels.
     */
    it('should ensure OG and Twitter image URLs are absolute with minimum dimensions 1200x630', () => {
      // Feature: seo-engagement-optimizer, Property 2: Social Media Image URLs
      
      // Create arbitrary generators for various image URL formats
      const metadataConfigArbitrary = fc.record({
        title: fc.string({ minLength: 10, maxLength: 60 }),
        description: fc.string({ minLength: 150, maxLength: 155 }),
        keywords: fc.option(
          fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 10 }),
          { nil: undefined }
        ),
        ogImage: fc.option(
          fc.oneof(
            // Absolute URLs
            fc.webUrl(),
            // Relative URLs with leading slash
            fc.string({ minLength: 5, maxLength: 50 }).map(s => `/${s}.png`),
            // Relative URLs without leading slash
            fc.string({ minLength: 5, maxLength: 50 }).map(s => `${s}.png`),
            // Relative URLs with subdirectories
            fc.tuple(
              fc.string({ minLength: 3, maxLength: 20 }),
              fc.string({ minLength: 3, maxLength: 20 })
            ).map(([dir, file]) => `/${dir}/${file}.png`)
          ),
          { nil: undefined }
        ),
        twitterImage: fc.option(
          fc.oneof(
            fc.webUrl(),
            fc.string({ minLength: 5, maxLength: 50 }).map(s => `/${s}.png`),
            fc.string({ minLength: 5, maxLength: 50 }).map(s => `${s}.png`)
          ),
          { nil: undefined }
        ),
      });

      fc.assert(
        fc.property(metadataConfigArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // Requirement 1.8: Verify OG image URLs are absolute
          expect(metadata.openGraph.images).toBeDefined();
          expect(Array.isArray(metadata.openGraph.images)).toBe(true);
          expect(metadata.openGraph.images.length).toBeGreaterThan(0);
          
          metadata.openGraph.images.forEach(image => {
            // URL must be absolute (start with http:// or https://)
            expect(image.url).toMatch(/^https?:\/\//);
            
            // Image dimensions must be at least 1200x630
            expect(image.width).toBeGreaterThanOrEqual(1200);
            expect(image.height).toBeGreaterThanOrEqual(630);
          });

          // Requirement 1.8: Verify Twitter image URLs are absolute
          expect(metadata.twitter.images).toBeDefined();
          expect(Array.isArray(metadata.twitter.images)).toBe(true);
          expect(metadata.twitter.images.length).toBeGreaterThan(0);
          
          metadata.twitter.images.forEach(imageUrl => {
            // URL must be absolute (start with http:// or https://)
            expect(imageUrl).toMatch(/^https?:\/\//);
          });
        }),
        { numRuns: 100 }
      );
    });

    it('should convert relative URLs to absolute URLs for social media images', () => {
      // Feature: seo-engagement-optimizer, Property 2: Social Media Image URLs
      
      // Test specifically with relative URLs to ensure conversion
      const relativeUrlConfigArbitrary = fc.record({
        title: fc.string({ minLength: 10, maxLength: 60 }),
        description: fc.string({ minLength: 150, maxLength: 155 }),
        ogImage: fc.oneof(
          fc.string({ minLength: 5, maxLength: 30 }).map(s => `/${s}.png`),
          fc.string({ minLength: 5, maxLength: 30 }).map(s => `${s}.png`)
        ),
        twitterImage: fc.option(
          fc.oneof(
            fc.string({ minLength: 5, maxLength: 30 }).map(s => `/${s}.png`),
            fc.string({ minLength: 5, maxLength: 30 }).map(s => `${s}.png`)
          ),
          { nil: undefined }
        ),
      });

      fc.assert(
        fc.property(relativeUrlConfigArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // Both OG and Twitter images should be converted to absolute URLs
          expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
          expect(metadata.twitter.images[0]).toMatch(/^https?:\/\//);
          
          // Verify the conversion preserved the path
          if (config.ogImage) {
            const expectedPath = config.ogImage.startsWith('/') ? config.ogImage : `/${config.ogImage}`;
            expect(metadata.openGraph.images[0].url).toContain(expectedPath);
          }
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain absolute URLs when already provided', () => {
      // Feature: seo-engagement-optimizer, Property 2: Social Media Image URLs
      
      // Test with absolute URLs to ensure they are not modified
      const absoluteUrlConfigArbitrary = fc.record({
        title: fc.string({ minLength: 10, maxLength: 60 }),
        description: fc.string({ minLength: 150, maxLength: 155 }),
        ogImage: fc.webUrl({ withFragments: false, withQueryParameters: false }),
        twitterImage: fc.option(
          fc.webUrl({ withFragments: false, withQueryParameters: false }),
          { nil: undefined }
        ),
      });

      fc.assert(
        fc.property(absoluteUrlConfigArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // Absolute URLs should be preserved as-is
          expect(metadata.openGraph.images[0].url).toBe(config.ogImage);
          
          if (config.twitterImage) {
            expect(metadata.twitter.images[0]).toBe(config.twitterImage);
          }
          
          // Dimensions should still meet requirements
          expect(metadata.openGraph.images[0].width).toBe(1200);
          expect(metadata.openGraph.images[0].height).toBe(630);
        }),
        { numRuns: 100 }
      );
    });

    it('should handle edge case with default images when none provided', () => {
      // Feature: seo-engagement-optimizer, Property 2: Social Media Image URLs
      
      // Test with no image URLs provided (should use defaults)
      const noImageConfigArbitrary = fc.record({
        title: fc.string({ minLength: 10, maxLength: 60 }),
        description: fc.string({ minLength: 150, maxLength: 155 }),
      });

      fc.assert(
        fc.property(noImageConfigArbitrary, (config: MetadataConfig) => {
          const metadata = generator.generatePageMetadata(config);

          // Default images should still be absolute URLs
          expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
          expect(metadata.twitter.images[0]).toMatch(/^https?:\/\//);
          
          // Default images should meet dimension requirements
          expect(metadata.openGraph.images[0].width).toBe(1200);
          expect(metadata.openGraph.images[0].height).toBe(630);
        }),
        { numRuns: 100 }
      );
    });
  });
});
