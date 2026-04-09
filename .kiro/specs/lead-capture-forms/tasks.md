# Implementation Plan: Lead Capture Forms

## Overview

Add lead capture forms to the Trimio landing page by building a reusable modal form component, a validation layer, a Next.js API route for lead persistence, and an admin dashboard. All existing CTA buttons will be wired to open the modal with source tracking.

## Tasks

- [x] 1. Set up shared types, validation logic, and UI dependencies
  - [x] 1.1 Install shadcn/ui Dialog, Input, and Label components and add `fast-check` + `vitest` + `@testing-library/react` + `@testing-library/jest-dom` as dev dependencies
    - Run `npx shadcn@latest add dialog input label` to add missing shadcn/ui primitives
    - Run `npm install --save-dev fast-check vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom` for testing
    - Add a `vitest.config.ts` at project root configured for React/jsdom
    - _Requirements: 1.1, 1.2, 1.5_

  - [x] 1.2 Create shared types and validation function
    - Create `src/lib/types.ts` with `LeadFormData`, `ValidationErrors`, `Lead`, `CreateLeadRequest`, `GetLeadsResponse`, `CreateLeadResponse`, and `ErrorResponse` interfaces
    - Create `src/lib/validation.ts` with `validateLeadForm(data: LeadFormData): ValidationErrors` pure function
    - Validation rules: fullName required (non-empty after trim), email required + regex, phone optional but validated if present, company optional
    - Error messages must match requirements exactly: "Full name is required", "Email is required", "Please enter a valid email address", "Please enter a valid phone number"
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ]* 1.3 Write property tests for validation (Properties 1–4)
    - **Property 1: Required field validation rejects missing name or email**
    - **Validates: Requirements 2.1, 2.2**
    - **Property 2: Invalid email format is rejected**
    - **Validates: Requirements 2.3**
    - **Property 3: Invalid phone format is rejected**
    - **Validates: Requirements 2.4**
    - **Property 4: Valid form data passes validation**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**
    - Create `src/lib/__tests__/validation.test.ts` using `fast-check` with minimum 100 iterations per property

- [x] 2. Checkpoint - Ensure validation tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Build the API route for lead storage
  - [x] 3.1 Implement the `/api/leads` route handler
    - Create `src/app/api/leads/route.ts` with POST and GET handlers
    - POST: validate required fields (name, email), generate UUID, append to `data/leads.json`, return 201 with created lead
    - GET: read `data/leads.json`, return all leads sorted by `createdAt` descending with total count
    - Use `fs/promises` for file I/O; write to temp file then rename for safe concurrent writes
    - Handle missing file (create on POST, return empty array on GET), malformed JSON (500), and write failures (500)
    - Return 400 with `{ error: "Full name and email are required" }` for missing required fields
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 3.2 Write property tests for API route (Properties 5–7)
    - **Property 5: Lead storage round-trip**
    - **Validates: Requirements 3.1, 4.1, 4.4**
    - **Property 6: API rejects requests with missing required fields**
    - **Validates: Requirements 4.2**
    - **Property 7: Leads are returned sorted by date descending**
    - **Validates: Requirements 4.3**
    - Create `src/app/api/leads/__tests__/route.test.ts` using `fast-check` with minimum 100 iterations per property

- [x] 4. Checkpoint - Ensure API tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Build the LeadCaptureModal and LeadFormProvider
  - [x] 5.1 Create the LeadFormProvider context
    - Create `src/components/lead-form-provider.tsx` as a client component
    - Expose `openLeadForm(source: string, variant: 'free-trial' | 'demo')` via React Context
    - Manage modal open/close state, current source, and variant internally
    - Render `LeadCaptureModal` as a child of the provider
    - _Requirements: 1.1, 1.2, 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 5.2 Create the LeadCaptureModal component
    - Create `src/components/lead-capture-modal.tsx` using shadcn/ui Dialog, Input, Label
    - Display title "Start Your Free Trial" for `free-trial` variant, "Book a Demo" for `demo` variant
    - Form fields: full name (required), email (required), phone (optional), company/salon name (optional)
    - Implement state machine: idle → submitting → success/error
    - On valid submit: POST to `/api/leads` with form data + source
    - On success: show "Thank you! We'll be in touch soon." and auto-close after 2 seconds
    - On error: show "Something went wrong. Please try again." and re-enable submit
    - While submitting: disable button and show loading indicator
    - Close on outside click or Escape without submitting
    - Reset form state when re-opened after success
    - Include proper ARIA labels, focus trapping (handled by Radix Dialog), and keyboard navigation
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.5, 3.1, 3.2, 3.3, 3.4_

  - [ ]* 5.3 Write unit tests for LeadCaptureModal
    - Test modal title matches variant ("Start Your Free Trial" vs "Book a Demo")
    - Test form validation error display
    - Test submit button disabled state during submission
    - Test success message display
    - Test error message display
    - Create `src/components/__tests__/lead-capture-modal.test.tsx`
    - _Requirements: 1.3, 3.2, 3.3, 3.4_

- [x] 6. Integrate CTA buttons with the lead capture form
  - [x] 6.1 Wrap the landing page with LeadFormProvider and update CTA buttons
    - Add `LeadFormProvider` to `src/app/page.tsx` (or layout) wrapping all content
    - Update hero section (`src/components/blocks/hero-section-1.tsx`): "Start Free Trial" → `openLeadForm('hero-free-trial', 'free-trial')`, "Book a Demo" → `openLeadForm('hero-demo', 'demo')`
    - Update footer (`src/components/blocks/footer.tsx`): "Start Your Free Trial" → `openLeadForm('footer-free-trial', 'free-trial')`, "Book a Demo" → `openLeadForm('footer-demo', 'demo')`
    - Update pricing (`src/components/blocks/pricing.tsx`): "Get started" buttons → `openLeadForm('pricing-starter', 'free-trial')`, `openLeadForm('pricing-growth', 'free-trial')`, "Contact Sales" → `openLeadForm('pricing-enterprise', 'demo')`
    - Replace `<Link href="#link">` wrappers on CTA buttons with `onClick` handlers that call `openLeadForm`
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 7. Checkpoint - Ensure modal and CTA integration work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Build the Admin Dashboard
  - [x] 8.1 Create the admin leads page
    - Create `src/app/admin/leads/page.tsx` as a client component
    - Fetch leads via `GET /api/leads` on mount
    - Render a table with columns: name, email, phone, company, source, submission date
    - Implement column sorting by clicking headers (date, name, source) with ascending/descending toggle
    - Implement dropdown filter by source (show all sources from the data)
    - Display total lead count
    - Show empty state "No leads captured yet" when no leads exist
    - Style with Tailwind, consistent with the rest of the app
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 8.2 Write property tests for admin dashboard (Properties 8–10)
    - **Property 8: Dashboard displays all leads with required columns**
    - **Validates: Requirements 5.1, 5.5**
    - **Property 9: Dashboard sorting produces correctly ordered results**
    - **Validates: Requirements 5.2**
    - **Property 10: Dashboard filtering returns only matching source**
    - **Validates: Requirements 5.3**
    - Create `src/app/admin/leads/__tests__/page.test.tsx` using `fast-check` with minimum 100 iterations per property

- [x] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests use `fast-check` and validate universal correctness properties from the design document
- The project uses TypeScript with Next.js App Router, shadcn/ui, and Tailwind CSS
- Lead data is persisted to `data/leads.json` in the project root
