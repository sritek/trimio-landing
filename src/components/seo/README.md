# SEO Components

This directory contains SEO-optimized components for the Trimio landing page.

## OptimizedImage Component

A wrapper around Next.js Image component that enforces SEO best practices.

### Features

- ✅ **Automatic WebP Conversion**: Next.js automatically converts images to WebP format for better performance (Requirement 3.1)
- ✅ **Lazy Loading**: Non-priority images are lazy-loaded to improve initial page load (Requirement 3.2)
- ✅ **CLS Prevention**: Requires explicit width and height to prevent Cumulative Layout Shift (Requirement 3.3)
- ✅ **Priority Loading**: Support for priority loading of LCP images (Requirement 4.5)
- ✅ **Alt Text Validation**: Validates that alt text is descriptive and non-empty (Requirement 4.5)

### Usage

```tsx
import { OptimizedImage } from '@/components/seo';

// Hero image (LCP - above the fold)
<OptimizedImage
  src="/hero-light.png"
  alt="Trimio salon management software dashboard"
  width={2700}
  height={1440}
  priority={true}
/>

// Feature image (below the fold)
<OptimizedImage
  src="/feature-screenshot.png"
  alt="Appointment booking interface"
  width={1200}
  height={800}
/>
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` | ✅ | - | Image source URL (local or remote) |
| `alt` | `string` | ✅ | - | Descriptive alt text (min 3 chars) |
| `width` | `number` | ✅ | - | Image width in pixels |
| `height` | `number` | ✅ | - | Image height in pixels |
| `priority` | `boolean` | ❌ | `false` | Priority loading for LCP images |
| `className` | `string` | ❌ | - | Additional CSS classes |
| `quality` | `number` | ❌ | `75` | Image quality (1-100) |
| `sizes` | `string` | ❌ | - | Responsive image sizes |
| `fill` | `boolean` | ❌ | `false` | Fill container mode |
| `objectFit` | `string` | ❌ | - | Object fit when using fill mode |
| `objectPosition` | `string` | ❌ | - | Object position when using fill mode |

### Best Practices

1. **Always provide descriptive alt text** - Include relevant keywords naturally
2. **Use priority={true} only for LCP images** - Typically just the hero image
3. **Always specify width and height** - Prevents layout shift (CLS)
4. **Use appropriate quality settings** - 75 for most images, 85+ for detailed screenshots
5. **Use sizes prop for responsive images** - Optimizes for different viewports

### Examples

See `__tests__/optimized-image.demo.tsx` for comprehensive usage examples.

### Testing

Run tests with:

```bash
npm test -- src/components/seo/__tests__/optimized-image.test.tsx
```

### Requirements Validated

- **Requirement 3.1**: Automatic WebP conversion via Next.js Image
- **Requirement 3.2**: Lazy loading for non-priority images
- **Requirement 3.3**: Explicit width and height to prevent CLS
- **Requirement 4.5**: Descriptive alt text validation

### Migration Guide

Converting existing `<img>` tags:

**Before:**
```tsx
<img
  src="/hero-light.png"
  alt="Dashboard"
  className="rounded-2xl"
/>
```

**After:**
```tsx
<OptimizedImage
  src="/hero-light.png"
  alt="Trimio salon management dashboard showing appointment scheduling"
  width={2700}
  height={1440}
  priority={true}
  className="rounded-2xl"
/>
```

### Performance Impact

- **WebP Format**: 25-35% smaller file sizes compared to PNG/JPEG
- **Lazy Loading**: Reduces initial page weight by 40-60%
- **CLS Prevention**: Improves Core Web Vitals score
- **Priority Loading**: Optimizes LCP metric for hero images

### Browser Support

All modern browsers support WebP format. Next.js automatically provides fallbacks for older browsers.
