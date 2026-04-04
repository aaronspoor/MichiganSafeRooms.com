# Michigan Safe Rooms — Full Site Optimization Design
**Date:** 2026-04-03
**Status:** Approved

## Overview
Comprehensive audit and optimization of michigansaferooms.com across 5 sections: trust/credibility, conversion, SEO, technical performance, and content/copy polish.

## Current State
- Next.js 14 App Router, Tailwind CSS, deployed on Vercel
- Single homepage (`app/page.tsx`): Hero, How It Works, FAQ (6 items), Contact Form, Blog preview
- Layout: sticky nav + 2-col footer
- Existing components: `FaqAccordion`, `ContactForm`
- Sitemap covers static + blog routes; no city/gallery pages

## Section 1 — Trust & Credibility

### 1. Trust Bar
- Location: below `<header>` in `layout.tsx`, above page content
- 4 items: FEMA P-320 Compliant, ICC-500 Rated, Licensed & Insured MI Lic. #2101209885, Lifetime Structural Warranty
- Style: gray-50 bg, checkmark per item, 13px text, centered; 2×2 grid on mobile

### 2. Hero Updates
- Add secondary rating line: "EF5-Rated | 250 MPH Tested | FEMA Compliant"
- New subhead emphasizing Michigan-local service
- City service badge below CTAs

### 3. Reviews Section (new component: `TestimonialsSection`)
- Placed between How It Works and FAQ
- 4 cards: 5-star rating, Michigan homeowner testimonial, reviewer name + city, Google Verified badge
- "See all reviews on Google →" link (placeholder #)

### 4. About Section (new component: `AboutSection`)
- Placed above footer in `page.tsx`
- Placeholder image box, headline, 2 paragraphs (contractor background + pilot/aviation standards analogy)
- 3 stat callouts: FEMA Compliant, Same-Day Installation, Lifetime Warranty

## Section 2 — Conversion Optimization

### 5. Pricing Section (new component: `PricingSection`)
- Placed after reviews, before FAQ
- 3 tiers: Small 4×6 ($3,200), Medium 8×8 ($5,500 — "Most Popular"), Large 10×10 ($7,800)
- Each card: size, capacity, price, 3 bullet features, CTA button
- FEMA grant note + financing note below cards

### 6. FAQ Expansion
- Add 5 new Q&As: financing, FEMA grant eligibility, garage installation, differentiator, before tornado season
- All 11 items will have visible answers via existing accordion

### 7. Sticky Mobile CTA (new client component: `StickyMobileCta`)
- `md:hidden`, sessionStorage dismiss
- Left: "Free Quote — No Obligation", Right: Call Now + Get Quote buttons
- White bg, top border, safe-area padding

### 8. Contact Form Updates
- Add "Best time to call" dropdown (Morning/Afternoon/Evening)
- Update button text to "Request My Free On-Site Consultation"
- Add response-time + privacy trust lines
- Update API route to pass through `callTime` field

## Section 3 — SEO

### 9. Homepage Metadata
- New title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer | Free Quote — Michigan Safe Rooms"
- New description with phone number
- og:title, og:description, og:image (placeholder), og:url, Twitter card, canonical URL

### 10. JSON-LD Schema
- In `page.tsx` via `<script type="application/ld+json">`
- LocalBusiness schema (name, address, phone, areaServed with Michigan counties, openingHours)
- Service schema
- FAQPage schema (all FAQ Q&As)

### 11. City Pages
- `app/locations/[city]/page.tsx` dynamic template with `generateStaticParams`
- 10 cities: Lansing, Flint, Grand Rapids, Saginaw, Jackson, Bay City, Midland, Holland, Muskegon, Traverse City
- Each city has unique: cityName, countyName, tornadoRiskNote, permitNote, neighborhoodList
- Reuses PricingSection and ContactForm components
- Dynamic SEO metadata per city

### 12. Sitemap
- Extend `app/sitemap.ts` to include all 10 city location routes
- Also add `/gallery` static route
- `robots.ts` already correct

## Section 4 — Technical

### 13. Image Placeholders
- All new image slots use `next/image` with gray bg, proper alt text, TODO comments

### 14. Gallery Page (`app/gallery/page.tsx`)
- "Our Work — Michigan Safe Room Installations"
- 3-col masonry grid, 12 placeholder slots with install-type labels
- CTA at bottom
- "Gallery" added to nav in `layout.tsx`

### 15. Performance
- Contact form already has client-side no-reload handler — verified
- Ensure all images use Next.js Image with lazy loading (default)

### 16. GA4 Analytics
- Add gtag.js script to `layout.tsx` with placeholder `G-XXXXXXXXXX`
- Fire `gtag('event', 'form_submit')` on contact form success in `ContactForm.tsx`

## Section 5 — Content & Copy

### 17. Footer Expansion
- 4 columns: Logo+tagline+phone+email / Quick Links / Service Areas (10 city links) / Trust badges
- Copyright bar adds "Michigan Contractor Lic. #2101209885"

### 18. Seasonal Banner (new client component: `SeasonalBanner`)
- April 1–August 31 check (client-side month check)
- sessionStorage dismiss, amber bg, X button
- Rendered above `<header>` in `layout.tsx`

## File Change Summary
- **Modified:** `app/layout.tsx`, `app/page.tsx`, `app/components/ContactForm.tsx`, `app/sitemap.ts`, `app/api/contact/route.ts`
- **Created:** `app/components/TrustBar.tsx`, `app/components/TestimonialsSection.tsx`, `app/components/PricingSection.tsx`, `app/components/AboutSection.tsx`, `app/components/StickyMobileCta.tsx`, `app/components/SeasonalBanner.tsx`, `app/gallery/page.tsx`, `app/locations/[city]/page.tsx`

## Commit Strategy
- Commit after each of the 5 sections
