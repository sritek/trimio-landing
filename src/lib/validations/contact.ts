import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long').trim(),
  email: z.string().email('Please enter a valid email address').max(255, 'Email is too long').toLowerCase().trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long').trim(),
  timezone: z.string().optional(),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
