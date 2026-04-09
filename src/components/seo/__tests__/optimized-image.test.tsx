import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { OptimizedImage } from '../optimized-image';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('OptimizedImage Component', () => {
  describe('Basic Rendering', () => {
    it('should render with required props', () => {
      const { container } = render(
        <OptimizedImage
          src="/test-image.png"
          alt="Test image description"
          width={800}
          height={600}
        />
      );

      const img = container.querySelector('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', '/test-image.png');
      expect(img).toHaveAttribute('alt', 'Test image description');
    });

    it('should apply custom className', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Test"
          width={100}
          height={100}
          className="custom-class"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveClass('custom-class');
    });
  });

  describe('Alt Text Validation (Requirement 4.5)', () => {
    it('should throw error when alt text is empty', () => {
      expect(() => {
        render(
          <OptimizedImage
            src="/test.png"
            alt=""
            width={100}
            height={100}
          />
        );
      }).toThrow('alt text is required and cannot be empty');
    });

    it('should throw error when alt text is whitespace only', () => {
      expect(() => {
        render(
          <OptimizedImage
            src="/test.png"
            alt="   "
            width={100}
            height={100}
          />
        );
      }).toThrow('alt text is required and cannot be empty');
    });

    it('should warn when alt text is very short', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <OptimizedImage
          src="/test.png"
          alt="ab"
          width={100}
          height={100}
        />
      );

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.stringContaining('alt text "ab" is very short')
      );

      consoleWarnSpy.mockRestore();
    });

    it('should accept descriptive alt text without warnings', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <OptimizedImage
          src="/test.png"
          alt="Descriptive alt text for the image"
          width={100}
          height={100}
        />
      );

      expect(consoleWarnSpy).not.toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });
  });

  describe('Lazy Loading (Requirement 3.2)', () => {
    it('should apply lazy loading for non-priority images', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Test image"
          width={800}
          height={600}
          priority={false}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('loading', 'lazy');
    });

    it('should apply eager loading for priority images', () => {
      const { container } = render(
        <OptimizedImage
          src="/hero.png"
          alt="Hero image"
          width={2700}
          height={1440}
          priority={true}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('loading', 'eager');
    });

    it('should default to lazy loading when priority is not specified', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Test image"
          width={800}
          height={600}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('CLS Prevention (Requirement 3.3)', () => {
    it('should include explicit width and height attributes', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Test image"
          width={1200}
          height={800}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('width', '1200');
      expect(img).toHaveAttribute('height', '800');
    });

    it('should handle different aspect ratios', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Wide image"
          width={1920}
          height={1080}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('width', '1920');
      expect(img).toHaveAttribute('height', '1080');
    });
  });

  describe('Priority Loading (Requirement 4.5)', () => {
    it('should set priority prop for LCP images', () => {
      const { container } = render(
        <OptimizedImage
          src="/hero.png"
          alt="Hero image for LCP"
          width={2700}
          height={1440}
          priority={true}
        />
      );

      const img = container.querySelector('img');
      // Priority is passed as a prop to Next.js Image, which handles it internally
      // We verify it's set by checking the loading attribute is 'eager'
      expect(img).toHaveAttribute('loading', 'eager');
    });

    it('should not set priority for regular images', () => {
      const { container } = render(
        <OptimizedImage
          src="/feature.png"
          alt="Feature image"
          width={800}
          height={600}
        />
      );

      const img = container.querySelector('img');
      // Non-priority images should have lazy loading
      expect(img).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Quality Settings (Requirement 3.1)', () => {
    it('should use default quality of 75', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Test image"
          width={800}
          height={600}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('quality', '75');
    });

    it('should accept custom quality setting', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Test image"
          width={800}
          height={600}
          quality={90}
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('quality', '90');
    });
  });

  describe('Responsive Images', () => {
    it('should accept sizes attribute for responsive images', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Responsive image"
          width={800}
          height={600}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
    });
  });

  describe('Fill Mode', () => {
    it('should support fill mode for container-based sizing', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Fill image"
          width={800}
          height={600}
          fill={true}
        />
      );

      const img = container.querySelector('img');
      // Fill mode is handled by Next.js Image internally
      // We just verify the image renders correctly
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Fill image');
    });

    it('should apply objectFit when in fill mode', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Cover image"
          width={800}
          height={600}
          fill={true}
          objectFit="cover"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveStyle({ objectFit: 'cover' });
    });

    it('should apply objectPosition when in fill mode', () => {
      const { container } = render(
        <OptimizedImage
          src="/test.png"
          alt="Positioned image"
          width={800}
          height={600}
          fill={true}
          objectPosition="center top"
        />
      );

      const img = container.querySelector('img');
      expect(img).toHaveStyle({ objectPosition: 'center top' });
    });
  });

  describe('SEO Best Practices', () => {
    it('should enforce descriptive alt text for SEO', () => {
      const { container } = render(
        <OptimizedImage
          src="/salon-dashboard.png"
          alt="Trimio salon management dashboard showing appointment scheduling and client management features"
          width={1200}
          height={800}
        />
      );

      const img = container.querySelector('img');
      expect(img?.getAttribute('alt')).toContain('Trimio');
      expect(img?.getAttribute('alt')).toContain('salon management');
    });

    it('should support keyword-rich alt text', () => {
      const { container } = render(
        <OptimizedImage
          src="/booking-system.png"
          alt="Online salon booking system with calendar view and appointment management"
          width={1000}
          height={750}
        />
      );

      const img = container.querySelector('img');
      const altText = img?.getAttribute('alt') || '';
      expect(altText).toContain('booking system');
      expect(altText).toContain('appointment');
    });
  });
});
