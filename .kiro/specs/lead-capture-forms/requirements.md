# Requirements Document

## Introduction

This feature adds lead capture forms to the Trimio landing page. The "Start Free Trial" and "Book a Demo" CTAs throughout the page (hero section, pricing section, footer CTA) will open modal dialog forms that collect visitor information. Captured leads are stored locally and viewable through a simple admin dashboard at `/admin/leads`.

## Glossary

- **Lead_Capture_Form**: A modal dialog containing input fields that collects visitor contact information when a CTA button is clicked
- **Lead**: A record containing a visitor's name, email, and optional metadata (company name, phone) along with the form source and submission timestamp
- **Lead_Store**: A server-side persistence layer that stores submitted lead records as JSON
- **Admin_Dashboard**: A protected page at `/admin/leads` that displays all captured leads in a sortable, filterable table
- **CTA_Button**: A call-to-action button on the landing page, specifically "Start Free Trial" and "Book a Demo" buttons
- **Form_Source**: An identifier indicating which CTA_Button triggered the Lead_Capture_Form (e.g., "hero-free-trial", "hero-demo", "footer-free-trial", "footer-demo", "pricing-get-started")

## Requirements

### Requirement 1: Lead Capture Form Display

**User Story:** As a landing page visitor, I want to see a form when I click a CTA button, so that I can provide my contact information to start a trial or book a demo.

#### Acceptance Criteria

1. WHEN a visitor clicks a "Start Free Trial" CTA_Button, THE Lead_Capture_Form SHALL open as a modal dialog with fields for full name, email address, phone number (optional), and company/salon name (optional)
2. WHEN a visitor clicks a "Book a Demo" CTA_Button, THE Lead_Capture_Form SHALL open as a modal dialog with fields for full name, email address, phone number (optional), and company/salon name (optional)
3. THE Lead_Capture_Form SHALL display a title that matches the CTA context ("Start Your Free Trial" or "Book a Demo")
4. WHEN a visitor clicks outside the modal or presses the Escape key, THE Lead_Capture_Form SHALL close without submitting data
5. THE Lead_Capture_Form SHALL be accessible, including proper ARIA labels, focus trapping within the modal, and keyboard navigation support

### Requirement 2: Form Validation

**User Story:** As a landing page visitor, I want clear feedback when I fill out the form incorrectly, so that I can correct my input before submitting.

#### Acceptance Criteria

1. WHEN a visitor submits the Lead_Capture_Form with an empty full name field, THE Lead_Capture_Form SHALL display an inline error message "Full name is required"
2. WHEN a visitor submits the Lead_Capture_Form with an empty email field, THE Lead_Capture_Form SHALL display an inline error message "Email is required"
3. WHEN a visitor submits the Lead_Capture_Form with an invalid email format, THE Lead_Capture_Form SHALL display an inline error message "Please enter a valid email address"
4. WHEN a visitor submits the Lead_Capture_Form with a phone number that does not match a valid phone pattern, THE Lead_Capture_Form SHALL display an inline error message "Please enter a valid phone number"
5. THE Lead_Capture_Form SHALL validate all fields on form submission before sending data to the server

### Requirement 3: Lead Submission

**User Story:** As a landing page visitor, I want confirmation that my information was submitted successfully, so that I know my request was received.

#### Acceptance Criteria

1. WHEN a visitor submits a valid Lead_Capture_Form, THE Lead_Capture_Form SHALL send the lead data along with the Form_Source to the server via a POST request to `/api/leads`
2. WHEN the server successfully stores the Lead, THE Lead_Capture_Form SHALL display a success message ("Thank you! We'll be in touch soon.") and close the modal after 2 seconds
3. WHILE the Lead_Capture_Form is submitting data, THE Lead_Capture_Form SHALL disable the submit button and display a loading indicator
4. IF the server returns an error during lead submission, THEN THE Lead_Capture_Form SHALL display an error message "Something went wrong. Please try again." and re-enable the submit button

### Requirement 4: Lead Storage API

**User Story:** As a site owner, I want submitted leads to be persisted on the server, so that I do not lose any captured contact information.

#### Acceptance Criteria

1. WHEN the `/api/leads` endpoint receives a valid POST request, THE Lead_Store SHALL save the Lead record with a unique ID, full name, email, phone (if provided), company name (if provided), Form_Source, and a UTC timestamp
2. IF the `/api/leads` endpoint receives a POST request with missing required fields (name or email), THEN THE Lead_Store SHALL return a 400 status with a descriptive error message
3. WHEN the `/api/leads` endpoint receives a GET request, THE Lead_Store SHALL return all stored Lead records sorted by timestamp in descending order
4. THE Lead_Store SHALL persist lead data to a JSON file on the server filesystem so that data survives server restarts

### Requirement 5: Admin Dashboard for Lead Management

**User Story:** As a site owner, I want to view and manage all captured leads in one place, so that I can follow up with potential customers.

#### Acceptance Criteria

1. WHEN a user navigates to `/admin/leads`, THE Admin_Dashboard SHALL display all captured leads in a table with columns for name, email, phone, company, source, and submission date
2. THE Admin_Dashboard SHALL allow sorting leads by submission date, name, or source
3. THE Admin_Dashboard SHALL allow filtering leads by Form_Source (e.g., show only "Book a Demo" leads)
4. WHEN no leads exist, THE Admin_Dashboard SHALL display an empty state message "No leads captured yet"
5. THE Admin_Dashboard SHALL display the total count of captured leads

### Requirement 6: CTA Button Integration

**User Story:** As a site owner, I want all existing CTA buttons across the landing page to trigger the lead capture form, so that every conversion opportunity is captured.

#### Acceptance Criteria

1. THE hero section "Start Free Trial" CTA_Button SHALL trigger the Lead_Capture_Form with Form_Source "hero-free-trial"
2. THE hero section "Book a Demo" CTA_Button SHALL trigger the Lead_Capture_Form with Form_Source "hero-demo"
3. THE footer "Start Your Free Trial" CTA_Button SHALL trigger the Lead_Capture_Form with Form_Source "footer-free-trial"
4. THE footer "Book a Demo" CTA_Button SHALL trigger the Lead_Capture_Form with Form_Source "footer-demo"
5. THE pricing section "Get started" and "Contact Sales" buttons SHALL trigger the Lead_Capture_Form with a Form_Source that includes the plan name (e.g., "pricing-starter", "pricing-growth", "pricing-enterprise")
