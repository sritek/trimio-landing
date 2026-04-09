/**
 * JSON-LD Schema Generator for SEO structured data
 * Generates valid schema.org structured data for rich snippets in search results
 */

/**
 * SoftwareApplication schema for app/software products
 * @see https://schema.org/SoftwareApplication
 */
export interface SoftwareApplicationSchema {
  "@context": "https://schema.org";
  "@type": "SoftwareApplication";
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    "@type": "Offer";
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
}

/**
 * FAQPage schema for frequently asked questions
 * @see https://schema.org/FAQPage
 */
export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

/**
 * Organization schema for company information
 * @see https://schema.org/Organization
 */
export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    "@type": "ContactPoint";
    contactType: string;
    email?: string;
  };
}

/**
 * FAQ item structure
 */
export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Service for generating JSON-LD structured data
 */
export class SchemaGenerator {
  private readonly siteUrl: string;
  private readonly siteName: string;

  constructor() {
    this.siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trimio.in';
    this.siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Trimio';
  }

  /**
   * Generate SoftwareApplication schema with all required fields
   * Includes application details, pricing, and ratings
   * @returns Valid SoftwareApplication JSON-LD schema
   */
  generateSoftwareApplicationSchema(): SoftwareApplicationSchema {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: this.siteName,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "500",
      },
    };
  }

  /**
   * Generate FAQPage schema from FAQ array
   * Accepts FAQ items and returns properly structured FAQPage schema
   * @param faqs - Array of FAQ items with question and answer
   * @returns Valid FAQPage JSON-LD schema
   */
  generateFAQSchema(faqs: FAQItem[]): FAQSchema {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  /**
   * Generate Organization schema for company information
   * Includes company details and contact information
   * @returns Valid Organization JSON-LD schema
   */
  generateOrganizationSchema(): OrganizationSchema {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: this.siteName,
      url: this.siteUrl,
      logo: `${this.siteUrl}/logo-black.png`,
      description: "Comprehensive salon management software for booking, scheduling, and business operations",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
      },
    };
  }

  /**
   * Convert schema object to JSON-LD script tag string
   * Ensures valid JSON output for embedding in HTML
   * @param schema - Schema object to convert
   * @returns JSON string suitable for script tag
   */
  toScriptTag(schema: SoftwareApplicationSchema | FAQSchema | OrganizationSchema): string {
    return JSON.stringify(schema);
  }
}
