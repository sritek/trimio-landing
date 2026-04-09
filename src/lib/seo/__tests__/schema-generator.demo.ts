/**
 * Demonstration of SchemaGenerator usage
 * This file shows how to use the SchemaGenerator service
 */

import { SchemaGenerator } from '../schema-generator';

const generator = new SchemaGenerator();

// Example 1: Generate SoftwareApplication schema
console.log('=== SoftwareApplication Schema ===');
const softwareSchema = generator.generateSoftwareApplicationSchema();
console.log(JSON.stringify(softwareSchema, null, 2));

// Example 2: Generate FAQ schema
console.log('\n=== FAQ Schema ===');
const faqs = [
  {
    question: 'What is Trimio?',
    answer: 'Trimio is a comprehensive salon management software that helps you manage bookings, appointments, staff, and payments all in one place.',
  },
  {
    question: 'How much does Trimio cost?',
    answer: 'Trimio offers flexible pricing starting at $29/month for small salons, with enterprise plans available for larger businesses.',
  },
  {
    question: 'Does Trimio work on mobile devices?',
    answer: 'Yes! Trimio is fully responsive and works on web browsers, iOS, and Android devices, allowing you to manage your salon from anywhere.',
  },
];
const faqSchema = generator.generateFAQSchema(faqs);
console.log(JSON.stringify(faqSchema, null, 2));

// Example 3: Generate Organization schema
console.log('\n=== Organization Schema ===');
const orgSchema = generator.generateOrganizationSchema();
console.log(JSON.stringify(orgSchema, null, 2));

// Example 4: Convert to script tag format
console.log('\n=== Script Tag Format ===');
const scriptContent = generator.toScriptTag(softwareSchema);
console.log(`<script type="application/ld+json">`);
console.log(scriptContent);
console.log(`</script>`);
