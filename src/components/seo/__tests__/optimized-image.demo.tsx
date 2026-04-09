/**
 * OptimizedImage Component - Usage Examples
 * 
 * This file demonstrates how to use the OptimizedImage component
 * in various scenarios for the Trimio landing page.
 */

import { OptimizedImage } from '../optimized-image';

/**
 * Example 1: Hero Image (LCP - Largest Contentful Paint)
 * 
 * For above-the-fold hero images that are critical for LCP:
 * - Set priority={true} to load immediately
 * - Use large dimensions for high-quality display
 * - Provide descriptive alt text with keywords
 */
export function HeroImageExample() {
  return (
    <OptimizedImage
      src="/hero-light.png"
      alt="Trimio salon management software dashboard showing appointment scheduling, client management, and analytics features"
      width={2700}
      height={1440}
      priority={true}
      className="rounded-2xl shadow-lg"
    />
  );
}

/**
 * Example 2: Feature Section Image (Below the Fold)
 * 
 * For images below the fold:
 * - Omit priority prop (defaults to false) for lazy loading
 * - Use appropriate dimensions for the layout
 * - Include keyword-rich alt text
 */
export function FeatureImageExample() {
  return (
    <OptimizedImage
      src="/feature-screenshot.png"
      alt="Online salon booking system with calendar view and appointment management interface"
      width={1200}
      height={800}
      className="rounded-lg border"
    />
  );
}

/**
 * Example 3: Testimonial Avatar
 * 
 * For small images like avatars:
 * - Use smaller dimensions
 * - Lazy load by default
 * - Provide descriptive alt text
 */
export function TestimonialAvatarExample() {
  return (
    <OptimizedImage
      src="/customers/1.png"
      alt="Sarah Johnson, owner of Luxe Beauty Salon"
      width={64}
      height={64}
      className="rounded-full"
    />
  );
}

/**
 * Example 4: Responsive Image with Sizes
 * 
 * For images that need different sizes on different screens:
 * - Use the sizes prop to optimize for different viewports
 * - Next.js will automatically serve appropriately sized images
 */
export function ResponsiveImageExample() {
  return (
    <OptimizedImage
      src="/dashboard-preview.png"
      alt="Trimio dashboard preview showing real-time salon analytics and booking management"
      width={1920}
      height={1080}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      className="w-full h-auto"
    />
  );
}

/**
 * Example 5: Fill Mode for Container-Based Sizing
 * 
 * For images that should fill their container:
 * - Use fill={true} instead of width/height
 * - Set objectFit to control how the image fills the space
 * - Parent container must have position: relative
 */
export function FillModeExample() {
  return (
    <div className="relative w-full h-96">
      <OptimizedImage
        src="/hero-dark.png"
        alt="Trimio salon management software interface in dark mode"
        width={2700}
        height={1440}
        fill={true}
        objectFit="cover"
        objectPosition="center"
        className="rounded-xl"
      />
    </div>
  );
}

/**
 * Example 6: Logo Image
 * 
 * For logos and branding:
 * - Use appropriate dimensions
 * - Include brand name in alt text
 * - Consider priority if above the fold
 */
export function LogoExample() {
  return (
    <OptimizedImage
      src="/logo-black.png"
      alt="Trimio - Salon Management Software"
      width={120}
      height={40}
      priority={true}
      className="h-10 w-auto"
    />
  );
}

/**
 * Example 7: Product Screenshot with High Quality
 * 
 * For detailed product screenshots:
 * - Use higher quality setting (default is 75)
 * - Provide detailed alt text describing the features shown
 */
export function ProductScreenshotExample() {
  return (
    <OptimizedImage
      src="/appointment-booking-interface.png"
      alt="Trimio appointment booking interface showing drag-and-drop scheduling, client profiles, service selection, and automated reminders"
      width={1600}
      height={1200}
      quality={85}
      className="shadow-2xl rounded-lg"
    />
  );
}

/**
 * Example 8: Mobile App Screenshot
 * 
 * For mobile screenshots:
 * - Use portrait dimensions
 * - Describe mobile-specific features in alt text
 */
export function MobileScreenshotExample() {
  return (
    <OptimizedImage
      src="/mobile-app-screenshot.png"
      alt="Trimio mobile app for iOS and Android showing on-the-go appointment management and client notifications"
      width={375}
      height={812}
      className="rounded-3xl shadow-xl"
    />
  );
}

/**
 * Common Patterns and Best Practices
 * 
 * 1. ALWAYS provide descriptive alt text (minimum 3 characters)
 * 2. Use priority={true} ONLY for LCP images (typically hero images)
 * 3. Always specify width and height to prevent CLS
 * 4. Include relevant keywords in alt text naturally
 * 5. Use appropriate quality settings (75 for most, 85+ for detailed screenshots)
 * 6. Use sizes prop for responsive images
 * 7. Use fill mode when image should fill a container
 * 
 * SEO Benefits:
 * - Automatic WebP conversion improves page load speed
 * - Lazy loading reduces initial page weight
 * - Explicit dimensions prevent layout shift (better Core Web Vitals)
 * - Descriptive alt text improves image search rankings
 * - Priority loading optimizes LCP metric
 */

/**
 * Migration Guide: Converting existing <img> tags
 * 
 * Before:
 * <img
 *   src="/hero-light.png"
 *   alt="Dashboard"
 *   className="rounded-2xl"
 * />
 * 
 * After:
 * <OptimizedImage
 *   src="/hero-light.png"
 *   alt="Trimio salon management dashboard showing appointment scheduling and client management"
 *   width={2700}
 *   height={1440}
 *   priority={true}
 *   className="rounded-2xl"
 * />
 * 
 * Key Changes:
 * 1. Add explicit width and height props
 * 2. Enhance alt text to be more descriptive
 * 3. Add priority={true} for above-the-fold images
 * 4. Import from '@/components/seo/optimized-image'
 */
