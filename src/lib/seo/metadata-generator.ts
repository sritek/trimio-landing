import type { Metadata } from 'next';

/**
 * Configuration for generating page metadata
 */
export interface MetadataConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  twitterImage?: string;
}

/**
 * Complete metadata object for Next.js Metadata API
 */
export interface GeneratedMetadata extends Metadata {
  title: string;
  description: string;
  keywords?: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  alternates: {
    canonical: string;
  };
}

/**
 * Service for generating Next.js metadata objects with comprehensive SEO tags
 */
export class MetadataGenerator {
  private readonly siteUrl: string;
  private readonly siteName: string;

  constructor() {
    this.siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trimio.in';
    this.siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Trimio';
  }

  /**
   * Validates that image URLs are absolute and meet dimension requirements
   */
  private validateImageUrl(url: string): string {
    // Ensure URL is absolute
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Convert relative URL to absolute
      return `${this.siteUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
    return url;
  }

  /**
   * Generate complete metadata object for any page
   * @param config - Metadata configuration
   * @returns Complete Next.js metadata object with all required tags
   */
  generatePageMetadata(config: MetadataConfig): GeneratedMetadata {
    const canonical = config.canonical || this.siteUrl;
    const ogImage = this.validateImageUrl(config.ogImage || '/og-image.png');
    const twitterImage = this.validateImageUrl(config.twitterImage || config.ogImage || '/og-image.png');

    return {
      title: config.title,
      description: config.description,
      keywords: config.keywords?.join(', '),
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: config.title,
        description: config.description,
        url: canonical,
        siteName: this.siteName,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: config.title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: config.title,
        description: config.description,
        images: [twitterImage],
      },
      alternates: {
        canonical,
      },
    };
  }

  /**
   * Generate metadata specifically for the homepage
   * Includes primary keyword "salon management software"
   * @returns Complete metadata object optimized for homepage SEO
   */
  generateHomeMetadata(): GeneratedMetadata {
    const title = 'Trimio - Salon Management Software | Booking & Scheduling';
    const description = 'Streamline your salon operations with Trimio salon management software. Online booking, scheduling, payments & more. Start your free 14-day trial today!';
    const keywords = [
      'salon management software',
      'salon booking system',
      'salon appointment app',
      'salon scheduling software',
      'beauty salon software',
    ];

    return this.generatePageMetadata({
      title,
      description,
      keywords,
      canonical: this.siteUrl,
      ogImage: '/hero-light.png',
      twitterImage: '/hero-light.png',
    });
  }
}
