/**
 * Static SEO content for Trimio
 * Manually curated FAQs and meta descriptions for optimal SEO
 */

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Static FAQ content for the homepage
 * Optimized for salon management software keywords and long-tail searches
 */
export const homepageFAQs: FAQItem[] = [
  {
    question: 'What is salon management software and how does it help my business?',
    answer: 'Salon management software is a comprehensive digital solution that streamlines all aspects of running a salon or spa. Trimio helps you manage appointments, track inventory, process payments, maintain client records, and analyze business performance from one central platform. It reduces administrative work, minimizes no-shows through automated reminders, and helps you deliver better customer experiences. Most salon owners report saving 10-15 hours per week on administrative tasks after implementing salon management software.',
  },
  {
    question: 'How does online booking work with Trimio?',
    answer: 'Trimio provides a customizable online booking widget that integrates seamlessly with your website and social media pages. Clients can view real-time availability, select their preferred stylist, choose services, and book appointments 24/7 without calling. The system automatically updates your calendar, sends confirmation emails, and syncs across all devices. You maintain full control over booking rules, buffer times, and service availability. Online booking typically increases appointment bookings by 30-40% while reducing phone interruptions.',
  },
  {
    question: 'Can Trimio handle multiple salon locations?',
    answer: 'Yes, Trimio is designed for both single and multi-location salon businesses. You can manage multiple locations from one dashboard, with separate calendars, staff schedules, and inventory tracking for each location. The system provides consolidated reporting across all locations while allowing individual location managers to access only their relevant data. You can also enable clients to book at any of your locations and transfer appointments between locations seamlessly. This makes it ideal for growing salon chains.',
  },
  {
    question: 'What payment methods does Trimio support?',
    answer: 'Trimio integrates with major payment processors to accept credit cards, debit cards, digital wallets (Apple Pay, Google Pay), and UPI payments. You can process payments in-person using card readers or accept online payments during booking. The system also supports split payments, gift cards, membership packages, and tip processing. All transactions are encrypted and PCI-compliant for security. Payment data syncs automatically with your accounting, making reconciliation effortless at the end of each day.',
  },
  {
    question: 'How does Trimio reduce no-shows and cancellations?',
    answer: 'Trimio reduces no-shows through automated SMS and email reminders sent at customizable intervals (typically 24 hours and 2 hours before appointments). Clients can confirm, reschedule, or cancel directly from the reminder message. You can also require credit card holds or deposits for bookings, implement cancellation policies, and maintain a waitlist to fill last-minute openings. The system tracks client no-show history to help you identify patterns. Salons using Trimio typically see no-show rates drop by 40-60%.',
  },
  {
    question: 'Is Trimio suitable for small salons or only large businesses?',
    answer: 'Trimio is designed to scale with your business, making it perfect for solo stylists, small salons, and large multi-location chains alike. Small salons benefit from affordable pricing, easy setup, and essential features like appointment scheduling and client management. As you grow, you can add advanced features like inventory management, staff performance tracking, and marketing automation. There are no long-term contracts, so you can start small and expand your usage as your business grows.',
  },
  {
    question: 'How long does it take to set up Trimio?',
    answer: 'Most salons are up and running with Trimio within 1-2 hours. The setup process includes adding your services and pricing, creating staff profiles, importing existing client data (if applicable), and customizing your online booking page. We provide step-by-step setup guides, video tutorials, and live chat support to help you through the process. You can start taking online bookings immediately after setup. For more complex needs like multi-location setup or custom integrations, our support team offers personalized onboarding assistance.',
  },
  {
    question: 'What kind of reports and analytics does Trimio provide?',
    answer: 'Trimio offers comprehensive reporting on revenue, appointments, staff performance, client retention, service popularity, and inventory usage. You can view daily, weekly, monthly, or custom date range reports with visual charts and graphs. Track key metrics like average ticket value, rebooking rates, peak booking times, and revenue per stylist. Export reports to Excel or PDF for accounting purposes. The dashboard provides real-time insights so you can make data-driven decisions about pricing, staffing, and marketing strategies to grow your salon business.',
  },
  {
    question: 'Does Trimio work for walk-in clients or only appointments?',
    answer: 'Trimio handles both. You can manage scheduled appointments through online booking and also log walk-in clients directly at the front desk. The system updates staff availability in real time so you always know who\'s free. Walk-ins are tracked the same way as booked appointments, giving you complete records and analytics for every client visit.',
  },
  {
    question: 'Can I manage multiple salon branches with one Trimio account?',
    answer: 'Yes. Trimio supports multi-location management from a single dashboard. You can view bookings, staff schedules, and revenue reports per branch or across all locations at once. Staff accounts are scoped to their branch by default, but managers can be given cross-location visibility.',
  },
  {
    question: 'Does Trimio send automated reminders to clients?',
    answer: 'Yes. Trimio automatically sends appointment reminders via SMS and email at intervals you configure — typically 24 hours and 2 hours before the appointment. This significantly reduces no-shows. You can customize the reminder message and timing from your settings panel.',
  },
  {
    question: 'What payment methods does Trimio support?',
    answer: 'Trimio\'s built-in POS supports cash, card (via integrated payment terminals), UPI, and online payments collected at the time of booking. All transactions are recorded automatically and reflected in your daily revenue reports.',
  },
  {
    question: 'Is my salon\'s client data secure on Trimio?',
    answer: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest. Trimio is hosted on enterprise-grade infrastructure with daily backups. You own your client data and can export it at any time. We do not sell or share your data with third parties.',
  },
  {
    question: 'How long does it take to set up Trimio for my salon?',
    answer: 'Most salons are fully set up within one day. The onboarding flow walks you through adding your services, staff, and working hours. If you have existing client data in a spreadsheet, our team can help you import it. We also offer a free onboarding call for new accounts.',
  },
];

/**
 * Meta descriptions for different pages
 * Each description is optimized for SEO (150-155 characters) with target keywords and CTAs
 */
export const metaDescriptions = {
  home: 'Streamline your salon operations with Trimio salon management software. Online booking, scheduling, payments & more. Start your free 14-day trial today!',
  features: 'Discover Trimio\'s powerful features: online booking, appointment scheduling, client management, inventory tracking, and analytics. Try it free for 14 days!',
  pricing: 'Affordable salon management software pricing for businesses of all sizes. Plans start at ₹999/month. No setup fees. Start your free 14-day trial today!',
  about: 'Trimio helps salon owners streamline operations and grow their business. Trusted by 500+ salons across India. Learn more about our mission and values.',
  contact: 'Get in touch with Trimio support team. We\'re here to help you succeed with our salon management software. Chat, email, or call us today!',
};

/**
 * Get FAQs for a specific page
 * @param page - The page identifier
 * @returns Array of FAQ items for that page
 */
export function getFAQsForPage(page: 'home' | 'features' | 'pricing'): FAQItem[] {
  switch (page) {
    case 'home':
      return homepageFAQs;
    case 'features':
      // Return a subset of FAQs relevant to features
      return homepageFAQs.slice(0, 5);
    case 'pricing':
      // Return pricing-related FAQs
      return [
        homepageFAQs[5], // Small salon suitability
        homepageFAQs[6], // Setup time
        homepageFAQs[3], // Payment methods
      ];
    default:
      return homepageFAQs;
  }
}

/**
 * Get meta description for a specific page
 * @param page - The page identifier
 * @returns Meta description string
 */
export function getMetaDescription(page: keyof typeof metaDescriptions): string {
  return metaDescriptions[page] || metaDescriptions.home;
}
