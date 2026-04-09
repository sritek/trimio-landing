# Implementation Plan: SEO Engagement Optimizer

## Overview

This implementation plan breaks down the SEO Engagement Optimizer feature into discrete coding tasks following the 6-phase approach outlined in the design document. Each task builds incrementally on previous work, with property-based tests placed close to implementation to catch errors early. The plan focuses exclusively on tasks that can be performed by a coding agent.

## Tasks

- [x] 1. Set up core SEO infrastructure and services
  - [x] 1.1 Create MetadataGenerator service with TypeScript interfaces
    - Create `src/lib/seo/metadata-generator.ts` with `MetadataConfig` and `GeneratedMetadata` interfaces
    - Implement `generatePageMetadata()` method that returns complete Next.js metadata objects
    - Implement `generateHomeMetadata()` method with primary keyword "salon management software"
    - Ensure all required meta tags are included: title, description, robots, OG tags, Twitter tags, canonical
    - Validate image URLs are absolute and meet 1200x630 dimension requirements
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8_

  - [x] 1.2 Write property test for metadata completeness
    - **Property 1: Metadata Completeness**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 9.1, 9.5**
    - Verify all required meta tags present for any page config
    - Verify no duplicate tags
    - Use fast-check with 100+ iterations

  - [x] 1.3 Write property test for social media image URLs
    - **Property 2: Social Media Image URLs**
    - **Validates: Requirements 1.8**
    - Verify OG and Twitter image URLs are absolute
    - Verify image dimensions are at least 1200x630
    - Use fast-check with 100+ iterations

  - [x] 1.4 Write unit tests for MetadataGenerator
    - Test specific examples: homepage metadata, feature page metadata
    - Test edge cases: missing optional fields, empty strings
    - Test default values are applied correctly

- [x] 2. Implement structured data generation
  - [x] 2.1 Create SchemaGenerator service with JSON-LD support
    - Create `src/lib/seo/schema-generator.ts` with schema interfaces
    - Implement `generateSoftwareApplicationSchema()` with all required fields
    - Implement `generateFAQSchema()` that accepts FAQ array and returns FAQPage schema
    - Implement `generateOrganizationSchema()` for company information
    - Ensure all schemas produce valid parseable JSON
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 2.2 Write property test for structured data completeness
    - **Property 3: Structured Data Completeness**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.5, 9.3**
    - Verify JSON-LD output is valid parseable JSON
    - Verify all required schema fields are present
    - Use fast-check with 100+ iterations

  - [x] 2.3 Write unit tests for SchemaGenerator
    - Test SoftwareApplication schema structure
    - Test FAQPage schema with various FAQ counts
    - Test Organization schema
    - Test schema validation against schema.org types

- [x] 3. Checkpoint - Verify core SEO services
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Integrate Claude API for AI content generation
  - [x] 4.1 Install Anthropic SDK and create AIContentService
    - Run `npm install @anthropic-ai/sdk`
    - Create `src/lib/seo/ai-content-service.ts` with TypeScript interfaces
    - Implement constructor with API key configuration
    - Set up Claude API client with model claude-sonnet-4-5
    - _Requirements: 5.1, 6.1_

  - [x] 4.2 Implement FAQ generation with Claude API
    - Implement `generateFAQs()` method that returns exactly 8 FAQ pairs
    - Create prompt that targets long-tail search queries for salon management software
    - Ensure questions and answers naturally incorporate target keywords
    - Implement answer length constraint (50-150 words per answer)
    - _Requirements: 5.1, 5.2, 5.3, 5.6_

  - [x] 4.3 Implement meta description generation with Claude API
    - Implement `generateMetaDescription()` method with 155 character limit
    - Create prompt that incorporates target keywords naturally
    - Ensure output includes call-to-action phrases (Start, Try, Get, Book, Learn)
    - Generate unique descriptions for different page types
    - _Requirements: 6.2, 6.3, 6.4, 6.5_

  - [x] 4.4 Implement error handling and fallback content
    - Add exponential backoff with 3 retry attempts
    - Create fallback FAQ content for API failures
    - Create fallback meta descriptions for API failures
    - Add error logging for monitoring
    - Cache successful AI responses to reduce API calls
    - _Requirements: 5.1, 6.1_

  - [x] 4.5 Write property test for AI-generated FAQ constraints
    - **Property 8: AI-Generated FAQ Constraints**
    - **Validates: Requirements 5.1, 5.3, 5.6**
    - Verify exactly 8 FAQs returned
    - Verify answer word count between 50-150 words
    - Verify target keywords present in content
    - Use fast-check with 100+ iterations

  - [x] 4.6 Write property test for AI-generated meta description constraints
    - **Property 10: AI-Generated Meta Description Constraints**
    - **Validates: Requirements 6.2, 6.3, 6.5**
    - Verify maximum 155 characters
    - Verify target keywords incorporated
    - Verify CTA phrase pattern present
    - Use fast-check with 100+ iterations

  - [x] 4.7 Write property test for meta description uniqueness
    - **Property 11: Meta Description Uniqueness**
    - **Validates: Requirements 6.4**
    - Generate descriptions for different pages
    - Verify no duplicates in the set
    - Use fast-check with 100+ iterations

  - [x] 4.8 Write unit tests for AIContentService
    - Test FAQ generation with mock API responses
    - Test meta description generation with mock API responses
    - Test error handling and fallback behavior
    - Test retry logic with exponential backoff
    - Test caching mechanism

- [x] 5. Checkpoint - Verify AI content generation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement image optimization infrastructure
  - [x] 6.1 Create OptimizedImage component wrapper
    - Create `src/components/seo/optimized-image.tsx` with TypeScript props interface
    - Wrap Next.js Image component with SEO best practices
    - Implement automatic WebP conversion via Next.js Image
    - Add lazy loading for non-priority images (loading="lazy")
    - Require explicit width and height props to prevent CLS
    - Add priority prop for LCP images
    - Validate alt text is descriptive and non-empty
    - _Requirements: 3.1, 3.2, 3.3, 4.5_

  - [x] 6.2 Update next.config.ts for image optimization
    - Add image formats configuration: WebP and AVIF
    - Configure device sizes and image sizes for responsive images
    - Enable static optimization
    - _Requirements: 3.1_

  - [x] 6.3 Write property test for image optimization attributes
    - **Property 4: Image Optimization Attributes**
    - **Validates: Requirements 3.1, 3.2, 3.3, 4.5, 4.6, 9.4**
    - Verify width and height attributes present
    - Verify WebP format conversion
    - Verify lazy loading for below-fold images
    - Verify descriptive alt attribute with keywords
    - Use fast-check with 100+ iterations

  - [x] 6.4 Write unit tests for OptimizedImage component
    - Test priority images render without lazy loading
    - Test non-priority images have loading="lazy"
    - Test width and height props are applied
    - Test alt text validation
    - Test error handling for missing images

- [x] 7. Optimize Core Web Vitals and performance
  - [x] 7.1 Add font preconnect and optimization to layout
    - Update `src/app/layout.tsx` to add preconnect links for Google Fonts
    - Configure font-display: swap for Geist fonts
    - Enable font preloading
    - _Requirements: 3.4, 3.5_

  - [x] 7.2 Implement script loading optimization
    - Audit all script tags in the application
    - Add defer or async attributes to non-critical scripts
    - Ensure critical scripts load synchronously
    - _Requirements: 3.6_

  - [x] 7.3 Write property test for script loading optimization
    - **Property 5: Script Loading Optimization**
    - **Validates: Requirements 3.6**
    - Verify non-critical scripts have defer or async
    - Use fast-check with 100+ iterations

  - [x] 7.4 Write unit tests for performance optimizations
    - Test preconnect links are present in layout
    - Test font-display: swap is configured
    - Test script defer/async attributes

- [x] 8. Checkpoint - Verify image and performance optimizations
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Update layout with comprehensive metadata
  - [x] 9.1 Update src/app/layout.tsx with Metadata API
    - Import and instantiate MetadataGenerator
    - Export metadata object using generateHomeMetadata()
    - Add preconnect links in head for Google Fonts
    - Ensure viewport meta tag is present
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 3.4, 9.5_

  - [x] 9.2 Write unit tests for layout metadata
    - Test metadata object is exported correctly
    - Test preconnect links are present
    - Test viewport meta tag is present

- [x] 10. Enhance FAQ component with semantic HTML and schema
  - [x] 10.1 Update FAQ component with semantic markup
    - Update `src/components/blocks/faq.tsx` to accept optional faqs prop
    - Replace current markup with semantic dl, dt, dd elements
    - Maintain existing accordion UI and styling
    - Add includeSchema prop (default true)
    - _Requirements: 4.4, 5.4_

  - [x] 10.2 Integrate SchemaGenerator for FAQPage schema
    - Import SchemaGenerator in FAQ component
    - Generate FAQPage JSON-LD when includeSchema is true
    - Embed schema in script tag with type="application/ld+json"
    - Ensure schema content matches rendered FAQs
    - _Requirements: 2.3, 5.5_

  - [x] 10.3 Write property test for FAQ schema synchronization
    - **Property 9: FAQ Schema Synchronization**
    - **Validates: Requirements 5.5**
    - Verify FAQPage schema generated when FAQs present
    - Verify schema content matches rendered FAQs
    - Use fast-check with 100+ iterations

  - [x] 10.4 Write unit tests for FAQ component
    - Test semantic HTML elements (dl, dt, dd) are rendered
    - Test FAQPage schema is included when includeSchema is true
    - Test schema is omitted when includeSchema is false
    - Test accordion functionality is preserved
    - Test with AI-generated FAQs

- [x] 11. Update homepage with semantic HTML and heading hierarchy
  - [x] 11.1 Optimize hero section with H1 and primary keyword
    - Update `src/components/blocks/hero-section-1.tsx` to use single H1
    - Ensure H1 contains primary keyword "salon management software"
    - Update CTAs: primary "Start Free 14-Day Trial", secondary "Watch 2-min Demo"
    - Add social proof text "Trusted by 500+ salons"
    - _Requirements: 4.1, 7.1, 7.2, 7.3_

  - [x] 11.2 Ensure proper heading hierarchy across all sections
    - Audit all components in src/components/blocks/
    - Use H2 elements for major section headings
    - Ensure hierarchical order (H1 → H2 → H3)
    - _Requirements: 4.2_

  - [x] 11.3 Update all components to use semantic HTML5 elements
    - Ensure proper use of section, article, nav, footer elements
    - Replace div-based lists with ul/ol and li elements
    - _Requirements: 4.3, 4.4_

  - [x] 11.4 Convert all images to use OptimizedImage component
    - Replace all img tags and Image components with OptimizedImage
    - Add descriptive alt text with relevant keywords
    - Set priority=true for hero image (LCP)
    - Set priority=false for below-fold images
    - _Requirements: 3.1, 3.2, 3.3, 4.5, 4.6_

  - [x] 11.5 Write property test for heading hierarchy
    - **Property 6: Heading Hierarchy**
    - **Validates: Requirements 4.1, 4.2, 9.2**
    - Verify exactly one H1 with primary keyword
    - Verify H2 elements in hierarchical order
    - Use fast-check with 100+ iterations

  - [x] 11.6 Write property test for semantic list markup
    - **Property 7: Semantic List Markup**
    - **Validates: Requirements 4.4**
    - Verify lists use ul/ol with li children
    - Use fast-check with 100+ iterations

  - [x] 11.7 Write unit tests for homepage structure
    - Test exactly one H1 element present
    - Test H1 contains "salon management software"
    - Test primary CTA "Start Free 14-Day Trial" in hero
    - Test secondary CTA "Watch 2-min Demo" in hero
    - Test social proof text "Trusted by 500+ salons"
    - Test all images have alt attributes
    - Test semantic HTML5 elements present

- [x] 12. Enhance conversion elements across components
  - [x] 12.1 Update pricing component with comparison table
    - Update `src/components/blocks/pricing.tsx` to display 3 pricing tiers
    - Ensure clear pricing comparison table structure
    - Add semantic table markup
    - _Requirements: 7.5_

  - [x] 12.2 Update testimonials component with schema markup
    - Update `src/components/blocks/testimonials.tsx` to include customer photos
    - Add star ratings display
    - Add trust badges for G2 and Capterra
    - _Requirements: 7.6, 7.7_

  - [x] 12.3 Add sticky navigation with CTA button
    - Create or update navigation component with sticky positioning
    - Add CTA button that remains visible during scroll
    - _Requirements: 7.8_

  - [x] 12.4 Write unit tests for conversion elements
    - Test pricing table displays 3 tiers
    - Test testimonials include photos and ratings
    - Test trust badges are present
    - Test sticky navigation with CTA

- [x] 13. Checkpoint - Verify component enhancements
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Implement sitemap and robots.txt generation
  - [x] 14.1 Create sitemap.ts for Next.js sitemap generation
    - Create `src/app/sitemap.ts` using Next.js MetadataRoute.Sitemap type
    - Include homepage with priority 1.0 and changefreq "weekly"
    - Include primary pages (#features, #pricing, #faq) with priority 0.8 and changefreq "monthly"
    - Include loc, lastmod, changefreq, and priority for each URL
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [x] 14.2 Create robots.ts for robots.txt generation
    - Create `src/app/robots.ts` using Next.js MetadataRoute.Robots type
    - Set rules: User-agent: *, Allow: /
    - Include sitemap directive pointing to sitemap.xml
    - _Requirements: 8.5, 8.6, 8.7_

  - [x] 14.3 Write property test for sitemap entry structure
    - **Property 12: Sitemap Entry Structure**
    - **Validates: Requirements 8.2, 8.3, 8.4**
    - Verify all required elements present (loc, lastmod, changefreq, priority)
    - Verify homepage priority is 1.0, others are 0.8
    - Verify homepage changefreq is "weekly", others are "monthly"
    - Use fast-check with 100+ iterations

  - [x] 14.4 Write unit tests for sitemap and robots
    - Test sitemap includes all required URLs
    - Test sitemap priorities and changefreq values
    - Test robots.txt allows all user agents
    - Test robots.txt includes sitemap directive

- [x] 15. Create SEO validation utility
  - [x] 15.1 Implement SEOValidator service
    - Create `src/lib/seo/validation.ts` with validation interfaces
    - Implement `validateMetadata()` method to check metadata completeness
    - Implement `validatePageStructure()` method to check H1 count, alt text, semantic HTML
    - Implement `validateStructuredData()` method to validate JSON-LD syntax
    - Generate actionable error messages for failures
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

  - [x] 15.2 Write unit tests for SEOValidator
    - Test metadata validation with complete and incomplete metadata
    - Test page structure validation with valid and invalid HTML
    - Test structured data validation with valid and invalid JSON-LD
    - Test error message generation

- [x] 16. Add environment variable configuration
  - [x] 16.1 Create .env.example file with required variables
    - Document ANTHROPIC_API_KEY
    - Document NEXT_PUBLIC_SITE_URL
    - Document NEXT_PUBLIC_SITE_NAME
    - Document optional AI service configuration
    - _Requirements: All AI-related requirements_

  - [x] 16.2 Add environment variable validation
    - Create validation function that checks required env vars at build time
    - Fail fast with clear error messages if variables are missing
    - _Requirements: All AI-related requirements_

  - [x] 16.3 Write unit tests for environment validation
    - Test validation passes with all required variables
    - Test validation fails with missing variables
    - Test error messages are clear and actionable

- [x] 17. Integration testing and validation
  - [x] 17.1 Write integration tests for SEO implementation
    - Test sitemap.xml is accessible at /sitemap.xml
    - Test robots.txt is accessible at /robots.txt
    - Test robots.txt contains sitemap directive
    - Test all images on page have alt attributes
    - Test JSON-LD scripts are present in document head
    - Test meta tags are present in rendered HTML
    - _Requirements: 8.1, 8.5, 8.6, 9.4_

  - [x] 17.2 Write end-to-end SEO validation tests
    - Test complete metadata is present without duplicates
    - Test exactly one H1 per page
    - Test structured data passes validation
    - Test no broken internal links
    - _Requirements: 9.1, 9.2, 9.3, 9.6_

- [x] 18. Final checkpoint and quality assurance
  - Run all tests (unit, property, integration) and ensure they pass
  - Manually verify Google Rich Results Test passes for structured data
  - Manually verify Google Lighthouse SEO audit score is 90+
  - Verify all acceptance criteria from requirements document are met
  - Ask the user if questions arise or if manual testing reveals issues

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and integration points
- Checkpoints ensure incremental validation throughout implementation
- All AI-generated content includes fallback mechanisms for API failures
- Environment variables must be configured before running AI-related tasks
- Manual validation with Google tools (Rich Results Test, Lighthouse) is required in final phase
