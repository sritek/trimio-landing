import { describe, it, expect, beforeEach } from 'vitest';
import { MetadataGenerator } from '../metadata-generator';
import type { MetadataConfig } from '../metadata-generator';

describe('MetadataGenerator', () => {
  let generator: MetadataGenerator;

  beforeEach(() => {
    generator = new MetadataGenerator();
  });

  describe('generatePageMetadata', () => {
    it('should include all required meta tags', () => {
      const config: MetadataConfig = {
        title: 'Test Page Title',
        description: 'Test page description with exactly 150 characters to meet the requirement for meta descriptions that should be between 150 and 155 characters long.',
        keywords: ['test', 'keywords'],
        canonical: 'https://example.com/test',
        ogImage: '/test-image.png',
      };

      const metadata = generator.generatePageMetadata(config);

      // Verify all required fields are present
      expect(metadata.title).toBe(config.title);
      expect(metadata.description).toBe(config.description);
      expect(metadata.keywords).toBe('test, keywords');
      expect(metadata.robots).toEqual({ index: true, follow: true });
      expect(metadata.alternates.canonical).toBe(config.canonical);

      // Verify Open Graph tags
      expect(metadata.openGraph.title).toBe(config.title);
      expect(metadata.openGraph.description).toBe(config.description);
      expect(metadata.openGraph.url).toBe(config.canonical);
      expect(metadata.openGraph.siteName).toBeDefined();
      expect(metadata.openGraph.images).toHaveLength(1);
      expect(metadata.openGraph.images[0].width).toBe(1200);
      expect(metadata.openGraph.images[0].height).toBe(630);
      expect(metadata.openGraph.locale).toBe('en_US');
      expect(metadata.openGraph.type).toBe('website');

      // Verify Twitter Card tags
      expect(metadata.twitter.card).toBe('summary_large_image');
      expect(metadata.twitter.title).toBe(config.title);
      expect(metadata.twitter.description).toBe(config.description);
      expect(metadata.twitter.images).toHaveLength(1);
    });

    it('should include robots meta tag with "index, follow" directives', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
      });
    });

    it('should convert relative image URLs to absolute URLs', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        ogImage: '/relative-image.png',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
      expect(metadata.openGraph.images[0].url).toContain('/relative-image.png');
    });

    it('should preserve absolute image URLs', () => {
      const absoluteUrl = 'https://cdn.example.com/image.png';
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        ogImage: absoluteUrl,
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.openGraph.images[0].url).toBe(absoluteUrl);
    });

    it('should validate image dimensions are 1200x630', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        ogImage: '/test.png',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.openGraph.images[0].width).toBe(1200);
      expect(metadata.openGraph.images[0].height).toBe(630);
    });

    it('should use default image if none provided', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.openGraph.images[0].url).toContain('/og-image.png');
      expect(metadata.twitter.images[0]).toContain('/og-image.png');
    });

    it('should use ogImage for Twitter if twitterImage not provided', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        ogImage: '/custom-og.png',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.twitter.images[0]).toContain('/custom-og.png');
    });

    it('should use separate twitterImage if provided', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        ogImage: '/og.png',
        twitterImage: '/twitter.png',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.openGraph.images[0].url).toContain('/og.png');
      expect(metadata.twitter.images[0]).toContain('/twitter.png');
    });

    it('should include canonical URL', () => {
      const canonical = 'https://example.com/page';
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        canonical,
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.alternates.canonical).toBe(canonical);
    });

    it('should use site URL as default canonical', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.alternates.canonical).toBeDefined();
      expect(metadata.alternates.canonical).toMatch(/^https?:\/\//);
    });
  });

  describe('generateHomeMetadata', () => {
    it('should include primary keyword "salon management software" in title', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.title.toLowerCase()).toContain('salon management software');
    });

    it('should have description between 150-155 characters', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.description.length).toBeGreaterThanOrEqual(150);
      expect(metadata.description.length).toBeLessThanOrEqual(155);
    });

    it('should include target keywords in description', () => {
      const metadata = generator.generateHomeMetadata();
      const description = metadata.description.toLowerCase();

      // Should contain at least one target keyword
      const hasKeyword = 
        description.includes('salon management software') ||
        description.includes('salon booking') ||
        description.includes('salon');

      expect(hasKeyword).toBe(true);
    });

    it('should include all required meta tags', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.title).toBeDefined();
      expect(metadata.description).toBeDefined();
      expect(metadata.keywords).toBeDefined();
      expect(metadata.robots).toEqual({ index: true, follow: true });
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.twitter).toBeDefined();
      expect(metadata.alternates.canonical).toBeDefined();
    });

    it('should include complete Open Graph tags', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.openGraph.title).toBeDefined();
      expect(metadata.openGraph.description).toBeDefined();
      expect(metadata.openGraph.url).toBeDefined();
      expect(metadata.openGraph.siteName).toBeDefined();
      expect(metadata.openGraph.images).toHaveLength(1);
      expect(metadata.openGraph.images[0].url).toBeDefined();
      expect(metadata.openGraph.images[0].width).toBe(1200);
      expect(metadata.openGraph.images[0].height).toBe(630);
      expect(metadata.openGraph.locale).toBe('en_US');
      expect(metadata.openGraph.type).toBe('website');
    });

    it('should include complete Twitter Card tags', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.twitter.card).toBe('summary_large_image');
      expect(metadata.twitter.title).toBeDefined();
      expect(metadata.twitter.description).toBeDefined();
      expect(metadata.twitter.images).toHaveLength(1);
      expect(metadata.twitter.images[0]).toBeDefined();
    });

    it('should use absolute URLs for images', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
      expect(metadata.twitter.images[0]).toMatch(/^https?:\/\//);
    });

    it('should include relevant keywords', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.keywords).toBeDefined();
      expect(metadata.keywords?.toLowerCase()).toContain('salon management software');
    });

    it('should set canonical to site URL', () => {
      const metadata = generator.generateHomeMetadata();

      expect(metadata.alternates.canonical).toBeDefined();
      expect(metadata.alternates.canonical).toMatch(/^https?:\/\//);
    });
  });

  describe('edge cases', () => {
    it('should handle empty keywords array', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        keywords: [],
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.keywords).toBe('');
    });

    it('should handle undefined keywords', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.keywords).toBeUndefined();
    });

    it('should handle image URLs without leading slash', () => {
      const config: MetadataConfig = {
        title: 'Test',
        description: 'Test description',
        ogImage: 'image.png',
      };

      const metadata = generator.generatePageMetadata(config);

      expect(metadata.openGraph.images[0].url).toMatch(/^https?:\/\//);
      expect(metadata.openGraph.images[0].url).toContain('image.png');
    });
  });
});
