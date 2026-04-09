import Image from 'next/image';

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component that enforces SEO best practices:
 * - Automatic WebP conversion via Next.js Image
 * - Lazy loading for non-priority images (loading="lazy")
 * - Requires explicit width and height props to prevent CLS
 * - Priority prop for LCP images
 * - Validates alt text is descriptive and non-empty
 * 
 * Requirements: 3.1, 3.2, 3.3, 4.5
 */

export interface OptimizedImageProps {
  /** Image source URL (can be local or remote) */
  src: string;
  /** Descriptive alt text (required, non-empty) */
  alt: string;
  /** Image width in pixels (required to prevent CLS) */
  width: number;
  /** Image height in pixels (required to prevent CLS) */
  height: number;
  /** Priority loading for LCP images (default: false) */
  priority?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Image quality (1-100, default: 75) */
  quality?: number;
  /** Image sizes attribute for responsive images */
  sizes?: string;
  /** Fill mode (alternative to width/height) */
  fill?: boolean;
  /** Object fit when using fill mode */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** Object position when using fill mode */
  objectPosition?: string;
}

/**
 * Validates that alt text is descriptive and non-empty
 * @param alt - The alt text to validate
 * @throws Error if alt text is empty or too short
 */
function validateAltText(alt: string): void {
  if (!alt || alt.trim().length === 0) {
    throw new Error('OptimizedImage: alt text is required and cannot be empty');
  }
  
  if (alt.trim().length < 3) {
    console.warn(
      `OptimizedImage: alt text "${alt}" is very short. Consider providing a more descriptive alt text for better SEO and accessibility.`
    );
  }
}

/**
 * OptimizedImage Component
 * 
 * Wraps Next.js Image component with SEO best practices enforced.
 * 
 * @example
 * // Priority image (LCP - hero image)
 * <OptimizedImage
 *   src="/hero-light.png"
 *   alt="Trimio dashboard interface showing appointment scheduling"
 *   width={2700}
 *   height={1440}
 *   priority={true}
 * />
 * 
 * @example
 * // Below-fold image (lazy loaded)
 * <OptimizedImage
 *   src="/feature-screenshot.png"
 *   alt="Appointment booking interface with calendar view"
 *   width={1200}
 *   height={800}
 * />
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  quality = 75,
  sizes,
  fill,
  objectFit,
  objectPosition,
}: OptimizedImageProps) {
  // Validate alt text
  validateAltText(alt);

  // Determine loading strategy
  // Priority images: load immediately (for LCP optimization)
  // Non-priority images: lazy load (for performance)
  const loading = priority ? 'eager' : 'lazy';

  // Build the Image component props
  const imageProps: any = {
    src,
    alt,
    quality,
    priority,
    loading,
    className,
  };

  // Handle fill mode vs explicit dimensions
  if (fill) {
    imageProps.fill = true;
    if (objectFit) {
      imageProps.style = {
        ...imageProps.style,
        objectFit,
      };
    }
    if (objectPosition) {
      imageProps.style = {
        ...imageProps.style,
        objectPosition,
      };
    }
  } else {
    // Explicit width and height to prevent CLS (Cumulative Layout Shift)
    imageProps.width = width;
    imageProps.height = height;
  }

  // Add sizes attribute for responsive images
  if (sizes) {
    imageProps.sizes = sizes;
  }

  return <Image {...imageProps} />;
}
