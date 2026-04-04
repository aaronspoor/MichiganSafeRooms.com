# Michigan Safe Rooms Full Site Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement 18 improvements across trust/credibility, conversion, SEO, technical performance, and content/copy for michigansaferooms.com.

**Architecture:** All new UI is added as React components in `app/components/`. New pages go in `app/gallery/` and `app/locations/[city]/`. JSON-LD schema, GA4, and the trust bar/seasonal banner are injected via `app/layout.tsx`. City pages use `generateStaticParams` for full static generation.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Resend (contact API), Vercel Analytics already installed.

---

## SECTION 1 — Trust & Credibility

### Task 1: Trust Bar component

**Files:**
- Create: `app/components/TrustBar.tsx`
- Modify: `app/layout.tsx` (insert below `<header>`)

**Step 1: Create `app/components/TrustBar.tsx`**

```tsx
export default function TrustBar() {
  const items = [
    "FEMA P-320 Compliant",
    "ICC-500 Rated",
    "Licensed & Insured | MI Lic. #2101209885",
    "Lifetime Structural Warranty",
  ];
  return (
    <div className="bg-gray-50 border-b border-gray-200 py-2 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-center gap-1.5 text-[13px] text-gray-600 font-medium py-1">
            <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: In `app/layout.tsx`, import TrustBar and insert after `</header>`**

```tsx
import TrustBar from "@/app/components/TrustBar";
// In JSX, after </header>:
<TrustBar />
```

**Step 3: Commit**
```bash
cd /Users/aaronspoor/projects/michigansaferooms
git add app/components/TrustBar.tsx app/layout.tsx
git commit -m "feat: add trust bar below nav"
```

---

### Task 2: Hero section updates

**Files:**
- Modify: `app/page.tsx` (hero section, lines ~54–111)

**Step 1: After the `<h1>` block, add a ratings line**

Between `</h1>` and the `<p>` subhead, insert:
```tsx
<p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-4">
  EF5-Rated | 250 MPH Tested | FEMA Compliant
</p>
```

**Step 2: Replace the subhead `<p>` text**

Old text: `"We design, fabricate, and install premium steel safe rooms..."`
New text:
```tsx
<p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
  The only dedicated safe room installer based in mid-Michigan. We fabricate, deliver, and install — everything included.
</p>
```

**Step 3: After the CTA `<div>` (flex gap-4), add a city service badge**

```tsx
<p className="text-blue-200 text-sm mt-2 mb-16">
  Serving: Lansing • Flint • Grand Rapids • Saginaw • Ann Arbor • Kalamazoo + all lower Michigan
</p>
```
Remove the `mb-16` from the CTA div if it's there, and put `mb-4` on it; the badge gets `mb-16`.

**Step 4: Commit**
```bash
git add app/page.tsx
git commit -m "feat: update hero with ratings line, subhead, and city badge"
```

---

### Task 3: Testimonials section

**Files:**
- Create: `app/components/TestimonialsSection.tsx`
- Modify: `app/page.tsx` (insert between How It Works and FAQ)

**Step 1: Create `app/components/TestimonialsSection.tsx`**

```tsx
// TODO: Replace placeholder reviews with real customer reviews once collected
const REVIEWS = [
  {
    name: "Dave R.",
    city: "Lansing, MI",
    text: "We had a close call during the May storms last year — a tornado touched down less than two miles from our house. I called Michigan Safe Rooms the next morning. Aaron came out the same week, and we had our shelter installed before the next storm system came through. Couldn't be happier.",
  },
  {
    name: "Jennifer M.",
    city: "Saginaw, MI",
    text: "I was nervous about the whole process — permits, installation, disruption to the garage. Aaron walked me through everything on the phone first, then came out for a free assessment. Installation day was fast, professional, and totally painless. My kids feel safe now and that's everything.",
  },
  {
    name: "Tom & Lisa K.",
    city: "Grand Rapids, MI",
    text: "We compared three companies. Michigan Safe Rooms was the only one based in-state, and it showed — Aaron knew our county's permit process, the local soil conditions, everything. The price was fair and the quality is exceptional. Steel construction, FEMA rated, lifetime warranty. Highly recommend.",
  },
  {
    name: "Brian S.",
    city: "Flint, MI",
    text: "Tornado season in mid-Michigan is no joke. After the storms two summers ago, my wife and I finally pulled the trigger on a safe room. Aaron was professional, fast, and thorough. The unit is rock solid — I checked every weld. We sleep better knowing it's there.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
            What Michigan Families Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-gray-50 border border-gray-100 rounded-xl p-7 shadow-sm">
              <StarRating />
              <p className="text-gray-700 leading-relaxed mb-5 text-sm">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-brand text-sm">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.city}</p>
                </div>
                {/* TODO: Replace with real Google review badge once reviews are live */}
                <span className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-1 rounded font-medium flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm6.506 17.027A8.963 8.963 0 0112 20.977a8.963 8.963 0 01-8.977-8.977A8.963 8.963 0 0112 3.023c2.44 0 4.655.973 6.27 2.552l-2.543 2.543A5.472 5.472 0 0012 6.545a5.477 5.477 0 00-5.477 5.455 5.477 5.477 0 005.477 5.455 5.272 5.272 0 005.227-3.886h-5.227v-3.319h8.727c.11.578.168 1.175.168 1.791 0 4.945-3.32 8.477-8.895 8.477z" fill="#4285F4"/></svg>
                  Google Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          {/* TODO: Replace # with real Google Business Profile reviews URL */}
          <a href="#" className="text-brand-light font-semibold hover:underline text-sm">
            See all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: In `app/page.tsx`, import and insert `<TestimonialsSection />` between How It Works section and FAQ section**

```tsx
import TestimonialsSection from "@/app/components/TestimonialsSection";
// Place <TestimonialsSection /> between </section> (How It Works) and <section id="faq">
```

**Step 3: Commit**
```bash
git add app/components/TestimonialsSection.tsx app/page.tsx
git commit -m "feat: add testimonials section"
```

---

### Task 4: About section

**Files:**
- Create: `app/components/AboutSection.tsx`
- Modify: `app/page.tsx` (insert before closing `</>`)

**Step 1: Create `app/components/AboutSection.tsx`**

```tsx
export default function AboutSection() {
  const stats = [
    "100% FEMA Compliant Installs",
    "Same-Day Installation",
    "Lifetime Structural Warranty",
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image placeholder */}
          <div className="order-2 md:order-1">
            {/* TODO: Replace with real photo of Aaron Spoor */}
            <div className="bg-gray-200 rounded-xl aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm font-medium">Aaron Spoor — Owner</p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 md:order-2">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">About Us</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand mb-6 leading-tight">
              Built by a Michigan Contractor Who Understands Risk
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Michigan Safe Rooms is a family-owned operation based in Durand, MI — centrally located in lower Michigan so we can reach any community quickly. Owner Aaron Spoor brings years of licensed construction experience to every installation, combining hands-on craftsmanship with a commitment to doing the job right the first time. Michigan Contractor License #2101209885.
              </p>
              <p>
                Aaron is also a licensed pilot and flight instructor — a discipline where there is no margin for error and every checklist matters. He applies those same exacting standards to every safe room installation. From the anchor bolts to the door hardware, nothing gets left to chance. When your family's safety is on the line, that level of precision isn't optional — it's the only way we know how to work.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat} className="bg-gray-50 border border-gray-100 rounded-lg p-4 text-center">
                  <svg className="w-5 h-5 text-brand-accent mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs font-semibold text-brand">{stat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: In `app/page.tsx`, import and add `<AboutSection />` before the closing `</>`**

```tsx
import AboutSection from "@/app/components/AboutSection";
// Add <AboutSection /> just before the closing </>
```

**Step 3: Commit**
```bash
git add app/components/AboutSection.tsx app/page.tsx
git commit -m "feat: add about section with Aaron bio and stat callouts"
```

---

**Commit Section 1:**
```bash
cd /Users/aaronspoor/projects/michigansaferooms
git push origin main
```

---

## SECTION 2 — Conversion Optimization

### Task 5: Pricing section

**Files:**
- Create: `app/components/PricingSection.tsx`
- Modify: `app/page.tsx` (insert after TestimonialsSection, before FAQ)

**Step 1: Create `app/components/PricingSection.tsx`**

```tsx
const TIERS = [
  {
    name: "Small Safe Room",
    size: "4×6 ft",
    price: "Starting at $3,200",
    capacity: "Ideal for 2–4 people",
    popular: false,
    features: ["Heavy-gauge steel construction", "FEMA P-320 rated", "Same-day installation"],
  },
  {
    name: "Medium Safe Room",
    size: "8×8 ft",
    price: "Starting at $5,500",
    capacity: "Most popular — fits 4–8 people",
    popular: true,
    features: ["Heavy-gauge steel construction", "FEMA P-320 rated", "Same-day installation"],
  },
  {
    name: "Large Safe Room",
    size: "10×10 ft",
    price: "Starting at $7,800",
    capacity: "Family + neighbors — fits 8–12 people",
    popular: false,
    features: ["Heavy-gauge steel construction", "FEMA P-320 rated", "Same-day installation"],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Investment</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
            Pricing
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            All prices include design, fabrication, delivery, and professional installation. Free on-site quote — no obligation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl p-8 border ${
                tier.popular
                  ? "bg-brand text-white border-brand shadow-xl scale-[1.02]"
                  : "bg-white text-gray-900 border-gray-200 shadow-sm"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${tier.popular ? "text-blue-200" : "text-brand-accent"}`}>
                {tier.size}
              </p>
              <h3 className="font-heading text-2xl font-extrabold uppercase mb-1">{tier.name}</h3>
              <p className={`text-sm mb-4 ${tier.popular ? "text-blue-200" : "text-gray-500"}`}>{tier.capacity}</p>
              <p className={`font-heading text-3xl font-extrabold mb-6 ${tier.popular ? "text-brand-accent" : "text-brand"}`}>
                {tier.price}
              </p>
              <ul className="space-y-2 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${tier.popular ? "text-blue-100" : "text-gray-600"}`}>
                    <svg className={`w-4 h-4 shrink-0 ${tier.popular ? "text-brand-accent" : "text-brand-accent"}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`block text-center font-bold py-3 px-6 rounded-lg transition-opacity hover:opacity-90 ${
                  tier.popular ? "bg-brand-accent text-white" : "bg-brand text-white"
                }`}
              >
                Get a Quote
              </a>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-sm text-gray-700 space-y-2 max-w-3xl mx-auto">
          <p>
            <strong className="text-brand">FEMA Hazard Mitigation Grants</strong> may cover up to 75% of your installation cost for qualifying Michigan homeowners. Ask us about eligibility when you call.
          </p>
          <p className={`text-gray-500`}>
            Financing available through third-party partners — ask for details.
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: In `app/page.tsx`, import and insert `<PricingSection />` between `<TestimonialsSection />` and the FAQ section**

```tsx
import PricingSection from "@/app/components/PricingSection";
```

**Step 3: Commit**
```bash
git add app/components/PricingSection.tsx app/page.tsx
git commit -m "feat: add 3-tier pricing section with FEMA grant note"
```

---

### Task 6: FAQ expansion

**Files:**
- Modify: `app/page.tsx` (FAQ_ITEMS array)

**Step 1: Replace the `FAQ_ITEMS` array with 11 items (keep 6 existing + add 5 new)**

Add these 5 new items to the `FAQ_ITEMS` array:
```tsx
{
  question: "Do you offer financing?",
  answer:
    "Yes — financing is available through third-party partners. Ask us about options during your free consultation. We want to make sure cost isn't a barrier to protecting your family.",
},
{
  question: "What is a FEMA hazard mitigation grant and do I qualify?",
  answer:
    "FEMA's Hazard Mitigation Grant Program (HMGP) and Flood Mitigation Assistance (FMA) programs can cover up to 75% of safe room installation costs for qualifying homeowners in declared disaster areas. Michigan has been an active participant in these programs. Eligibility depends on your county and current grant cycles — ask us when you call and we'll point you toward the right resources.",
},
{
  question: "Can a safe room be installed in a garage?",
  answer:
    "Absolutely — the garage is actually one of the most popular and practical locations for a safe room. It provides easy access from the home, usually has a concrete slab that allows for secure anchoring, and keeps the unit out of your living space entirely. We assess your garage during the free consultation and recommend the best placement.",
},
{
  question: "What makes Michigan Safe Rooms different from national companies?",
  answer:
    "We're a Michigan-based, family-owned operation — not a national franchise dispatching subcontractors from out of state. When you call, you're talking to Aaron, the owner and installer. We know Michigan's permit requirements, soil conditions, and storm patterns. We can often schedule installs faster than national companies, and we stand behind every job personally. You won't get lost in a customer service queue.",
},
{
  question: "Can I get a safe room installed before tornado season?",
  answer:
    "Yes — and we strongly encourage it. Michigan tornado season runs roughly April through August, and install slots fill up quickly as storm season approaches. Most installations take a single day, so even a late-spring call can get you covered before the peak risk window. Call (989) 627-7291 today to check availability.",
},
```

**Step 2: Commit**
```bash
git add app/page.tsx
git commit -m "feat: expand FAQ with 5 new questions"
```

---

### Task 7: Sticky mobile CTA

**Files:**
- Create: `app/components/StickyMobileCta.tsx`
- Modify: `app/layout.tsx` (insert before `</body>`)

**Step 1: Create `app/components/StickyMobileCta.tsx`**

```tsx
"use client";
import { useState } from "react";

export default function StickyMobileCta() {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("stickyCtaDismissed") === "1";
    }
    return false;
  });

  if (dismissed) return null;

  function dismiss() {
    sessionStorage.setItem("stickyCtaDismissed", "1");
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 pb-[env(safe-area-inset-bottom,12px)]">
      <div className="flex items-center justify-between gap-3 max-w-sm mx-auto">
        <p className="text-xs font-semibold text-gray-700 leading-snug shrink-0">
          Free Quote<br />No Obligation
        </p>
        <div className="flex gap-2 flex-1 justify-end">
          <a
            href="tel:+19896277291"
            className="bg-brand text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Call Now
          </a>
          <a
            href="#contact"
            className="bg-brand-accent text-white text-xs font-bold px-3 py-2 rounded-lg whitespace-nowrap"
          >
            Get Quote
          </a>
        </div>
        <button onClick={dismiss} className="text-gray-400 hover:text-gray-600 ml-1 shrink-0" aria-label="Dismiss">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

**Step 2: In `app/layout.tsx`, import and add `<StickyMobileCta />` just before `</body>`**

```tsx
import StickyMobileCta from "@/app/components/StickyMobileCta";
// Add before </body>
<StickyMobileCta />
```

**Step 3: Commit**
```bash
git add app/components/StickyMobileCta.tsx app/layout.tsx
git commit -m "feat: add sticky mobile CTA bar"
```

---

### Task 8: Contact form improvements

**Files:**
- Modify: `app/components/ContactForm.tsx`
- Modify: `app/api/contact/route.ts`

**Step 1: In `ContactForm.tsx`, after the `message` textarea block and before the error block, add the "Best time to call" dropdown**

```tsx
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="callTime">
    Best Time to Call
  </label>
  <select
    id="callTime"
    name="callTime"
    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand bg-white"
  >
    <option value="">— Select a time —</option>
    <option value="morning">Morning (8am–12pm)</option>
    <option value="afternoon">Afternoon (12pm–5pm)</option>
    <option value="evening">Evening (5pm–8pm)</option>
  </select>
</div>
```

**Step 2: Update the submit button text**

Change `"Send My Quote Request"` to `"Request My Free On-Site Consultation"`.

**Step 3: After the `<button>`, add trust/response lines**

```tsx
<p className="text-center text-xs text-gray-400 mt-2">
  We respond within 1 business day. No spam, no pressure.
</p>
<p className="text-center text-xs text-gray-400">
  Your info is never shared or sold.
</p>
```

**Step 4: In `app/api/contact/route.ts`, destructure `callTime` from body and add it to the email table**

In the destructuring line:
```ts
const { name, phone, email, address, interest, message, callTime } = body;
```

Add a row to the HTML table after the Message row:
```ts
<tr>
  <td style="padding: 8px 12px; background: #f8f9fa; font-weight: 600; border: 1px solid #e5e7eb;">Best Time to Call</td>
  <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${esc(callTime) || "—"}</td>
</tr>
```

**Step 5: Commit**
```bash
git add app/components/ContactForm.tsx app/api/contact/route.ts
git commit -m "feat: improve contact form with call time, updated button, trust copy"
```

---

**Section 2 push:**
```bash
git push origin main
```

---

## SECTION 3 — SEO

### Task 9: Homepage metadata

**Files:**
- Modify: `app/page.tsx` (metadata export at top)

**Step 1: Replace the `metadata` export**

```tsx
export const metadata: Metadata = {
  title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer | Free Quote — Michigan Safe Rooms",
  description:
    "Michigan's dedicated safe room installer. We design, fabricate & install FEMA P-320 compliant steel safe rooms across lower Michigan. EF5-rated. Same-day installation. Free consultation — call (989) 627-7291.",
  alternates: {
    canonical: "https://michigansaferooms.com",
  },
  openGraph: {
    title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer | Free Quote",
    description:
      "Michigan's dedicated safe room installer. FEMA P-320 compliant steel safe rooms across lower Michigan. EF5-rated. Same-day installation. Free consultation.",
    url: "https://michigansaferooms.com",
    // TODO: Replace with real OG image once photography is complete
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Michigan Safe Rooms Installation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Safe Rooms Michigan | FEMA-Compliant Installer",
    description:
      "Michigan's dedicated safe room installer. FEMA P-320 compliant. EF5-rated. Same-day installation. Free quote — call (989) 627-7291.",
    // TODO: Replace with real Twitter card image
    images: ["/og-image.jpg"],
  },
};
```

**Step 2: Commit**
```bash
git add app/page.tsx
git commit -m "feat: update homepage metadata with OG and Twitter card tags"
```

---

### Task 10: JSON-LD schema markup

**Files:**
- Modify: `app/page.tsx` (add schema script to JSX)

**Step 1: Add a JSON-LD block at the top of the `HomePage` component's return statement**

Place this before the first `{/* Hero */}` comment:

```tsx
{/* JSON-LD Structured Data */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Michigan Safe Rooms",
        url: "https://michigansaferooms.com",
        telephone: "+19896277291",
        email: "aaronspoorconstruction@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Durand, MI",
          addressLocality: "Durand",
          addressRegion: "MI",
          postalCode: "48429",
          addressCountry: "US",
        },
        areaServed: [
          "Ingham County, MI", "Genesee County, MI", "Kent County, MI",
          "Saginaw County, MI", "Washtenaw County, MI", "Kalamazoo County, MI",
          "Jackson County, MI", "Bay County, MI", "Midland County, MI",
          "Ottawa County, MI", "Muskegon County, MI", "Grand Traverse County, MI",
          "Shiawassee County, MI", "Clinton County, MI", "Eaton County, MI",
          "Barry County, MI", "Ionia County, MI", "Montcalm County, MI",
        ],
        openingHours: "Mo-Fr 08:00-18:00",
        description:
          "Michigan's dedicated safe room installer. FEMA P-320 compliant steel safe rooms across lower Michigan. EF5-rated. Same-day installation.",
        priceRange: "$$$",
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Safe Room Installation Michigan",
        provider: {
          "@type": "LocalBusiness",
          name: "Michigan Safe Rooms",
          url: "https://michigansaferooms.com",
        },
        areaServed: "Lower Michigan",
        description:
          "Professional design, fabrication, and installation of FEMA P-320 compliant steel safe rooms for Michigan homeowners. EF5-rated against 250 MPH winds.",
        serviceType: "Safe Room Installation",
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ]),
  }}
/>
```

**Step 2: Commit**
```bash
git add app/page.tsx
git commit -m "feat: add JSON-LD LocalBusiness, Service, and FAQPage schema"
```

---

### Task 11: City location pages

**Files:**
- Create: `app/locations/[city]/page.tsx`

**Step 1: Create `app/locations/[city]/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContactForm from "@/app/components/ContactForm";
import PricingSection from "@/app/components/PricingSection";

// City data — extend as needed
const CITIES: Record<string, {
  cityName: string;
  countyName: string;
  tornadoRiskNote: string;
  permitNote: string;
  neighborhoodList: string[];
}> = {
  lansing: {
    cityName: "Lansing",
    countyName: "Ingham",
    tornadoRiskNote: "Ingham County and the greater Lansing metro area sit in one of Michigan's most tornado-active corridors. The region has experienced multiple confirmed tornado touchdowns in recent decades, with EF2+ events causing significant residential damage. Storm season typically runs April through August.",
    permitNote: "The City of Lansing requires a building permit for safe room installation. Permits are typically issued within 1–2 weeks for residential projects. We handle the permit paperwork as part of your installation package.",
    neighborhoodList: ["East Lansing", "Okemos", "Holt", "Mason", "DeWitt", "Haslett", "Williamston"],
  },
  flint: {
    cityName: "Flint",
    countyName: "Genesee",
    tornadoRiskNote: "Genesee County has a documented history of tornado activity, including damaging storms that have affected residential neighborhoods in and around Flint. The flat terrain of mid-Michigan provides little natural barrier against severe weather systems tracking northeast across the state.",
    permitNote: "Flint and Genesee County municipalities generally require a building permit for safe room installations. We coordinate permit requirements for your specific address during the free consultation.",
    neighborhoodList: ["Grand Blanc", "Burton", "Flushing", "Davison", "Mt. Morris", "Swartz Creek", "Linden"],
  },
  "grand-rapids": {
    cityName: "Grand Rapids",
    countyName: "Kent",
    tornadoRiskNote: "West Michigan — including Kent County and the Grand Rapids metro — experiences significant tornado activity each year. The region's proximity to Lake Michigan creates complex storm dynamics that can intensify systems as they move inland. Several EF2 tornadoes have tracked through Kent County neighborhoods in recent years.",
    permitNote: "Grand Rapids and surrounding Kent County communities require building permits for safe room installation. Requirements vary slightly by municipality. We handle all permit filings as part of our full-service installation.",
    neighborhoodList: ["Wyoming", "Kentwood", "Grandville", "Byron Center", "Jenison", "Caledonia", "Lowell", "Ada"],
  },
  saginaw: {
    cityName: "Saginaw",
    countyName: "Saginaw",
    tornadoRiskNote: "Saginaw County lies in a well-documented tornado corridor through the Saginaw Valley. The region has experienced repeated tornado events including confirmed EF2 touchdowns. Low-lying terrain and the Saginaw River valley contribute to conditions that can amplify storm intensity.",
    permitNote: "Saginaw County and the City of Saginaw require building permits for safe room installations. We manage permit filings and coordinate with local building departments on your behalf.",
    neighborhoodList: ["Bay City", "Midland", "Freeland", "Frankenmuth", "Birch Run", "Chesaning", "St. Charles"],
  },
  jackson: {
    cityName: "Jackson",
    countyName: "Jackson",
    tornadoRiskNote: "Jackson County sits in the heart of lower Michigan's tornado belt. Multiple tornado events have been recorded in the county, with the greatest risk during spring and early summer storm systems tracking across the region from the southwest.",
    permitNote: "The City of Jackson and Jackson County require permits for structural installations including safe rooms. We handle the permitting process as part of our standard installation service.",
    neighborhoodList: ["Spring Arbor", "Grass Lake", "Brooklyn", "Michigan Center", "Blackman Charter Township", "Napoleon"],
  },
  "bay-city": {
    cityName: "Bay City",
    countyName: "Bay",
    tornadoRiskNote: "Bay County and the Bay City area are located in the Saginaw Valley tornado corridor, one of Michigan's most tornado-prone regions. The flat terrain and proximity to Saginaw Bay create conditions favorable for severe weather development and intensification.",
    permitNote: "Bay City and Bay County require building permits for safe room installations. Permit processing is typically 1–2 weeks. We coordinate all filings as part of your installation.",
    neighborhoodList: ["Essexville", "Midland", "Auburn", "Pinconning", "Kawkawlin Township", "Monitor Township"],
  },
  midland: {
    cityName: "Midland",
    countyName: "Midland",
    tornadoRiskNote: "Midland County experiences tornado risk consistent with the broader Saginaw Valley region. Several confirmed tornado touchdowns have occurred in the county over the past two decades, with damage to residential and agricultural properties.",
    permitNote: "Midland County and the City of Midland have standard residential building permit requirements for safe room installations. We manage all permit paperwork as part of our service.",
    neighborhoodList: ["Coleman", "Sanford", "Beaverton", "Hope Township", "Edenville", "Lee Township"],
  },
  holland: {
    cityName: "Holland",
    countyName: "Ottawa",
    tornadoRiskNote: "Ottawa County and the Holland area see regular severe weather activity. Lake Michigan can both suppress and enhance storm systems depending on the season, and the region has recorded multiple tornado events including significant EF1 and EF2 touchdowns in residential areas.",
    permitNote: "Holland, Zeeland, and Ottawa County municipalities each have their own permit requirements for safe room installations. We confirm requirements for your address during the free site visit.",
    neighborhoodList: ["Zeeland", "West Olive", "Hudsonville", "Jenison", "Park Township", "Fillmore Township"],
  },
  muskegon: {
    cityName: "Muskegon",
    countyName: "Muskegon",
    tornadoRiskNote: "Muskegon County's position along Lake Michigan makes it susceptible to severe weather systems that intensify after crossing the lake or develop rapidly inland. The county has recorded tornado activity including events that have affected residential neighborhoods.",
    permitNote: "Muskegon and surrounding municipalities require building permits for safe room installations. We handle permitting as part of our turnkey installation service.",
    neighborhoodList: ["Norton Shores", "Fruitport", "Roosevelt Park", "North Muskegon", "Whitehall", "Montague"],
  },
  "traverse-city": {
    cityName: "Traverse City",
    countyName: "Grand Traverse",
    tornadoRiskNote: "While northern lower Michigan sees fewer tornadoes than the state's southern tier, Grand Traverse County and the Traverse City area are not immune to severe weather. EF1 and EF2 tornadoes have touched down in the region, and the increasing unpredictability of Michigan storm systems makes preparedness important regardless of location.",
    permitNote: "Traverse City and Grand Traverse County require permits for safe room installations. We are familiar with the northern Michigan permit process and manage all filings for you.",
    neighborhoodList: ["Garfield Township", "Acme Township", "Interlochen", "Williamsburg", "Elk Rapids", "Suttons Bay"],
  },
};

export function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({ city }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) return {};
  return {
    title: `Safe Rooms in ${data.cityName}, MI | FEMA-Compliant Installation`,
    description: `Michigan Safe Rooms installs FEMA P-320 compliant steel safe rooms in ${data.cityName}, ${data.countyName} County, MI. EF5-rated, same-day installation. Free consultation — call (989) 627-7291.`,
    alternates: { canonical: `https://michigansaferooms.com/locations/${city}` },
    openGraph: {
      title: `Safe Rooms in ${data.cityName}, MI | Michigan Safe Rooms`,
      description: `FEMA-compliant steel safe room installation in ${data.cityName}, MI. EF5-rated. Same-day install. Free quote.`,
      url: `https://michigansaferooms.com/locations/${city}`,
    },
  };
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const data = CITIES[city];

  if (!data) {
    return (
      <div className="py-20 text-center">
        <h1 className="font-heading text-4xl font-extrabold uppercase text-brand">City Not Found</h1>
      </div>
    );
  }

  const { cityName, countyName, tornadoRiskNote, permitNote, neighborhoodList } = data;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0b1929] via-brand to-[#1a3a6e] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-accent text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Serving {cityName}, MI
          </div>
          <h1 className="font-heading text-5xl sm:text-6xl font-extrabold uppercase leading-tight mb-4">
            Safe Rooms in<br /><span className="text-brand-accent">{cityName}, MI</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
            FEMA P-320 compliant steel safe rooms designed, fabricated, and installed in {cityName} and {countyName} County. One call — everything included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-brand-accent hover:opacity-90 text-white font-bold px-10 py-4 rounded-lg text-lg">
              Get a Free Quote
            </a>
            <a href="tel:+19896277291" className="border-2 border-white/40 text-white hover:border-white hover:bg-white/10 font-bold px-10 py-4 rounded-lg text-lg">
              Call (989) 627-7291
            </a>
          </div>
        </div>
      </section>

      {/* Tornado Risk */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Local Risk</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand mb-4">
            Tornado Risk in {cityName}
          </h2>
          <p className="text-gray-600 leading-relaxed">{tornadoRiskNote}</p>
        </div>
      </section>

      {/* Permit Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Permits</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand mb-4">
            Permit Requirements in {cityName}
          </h2>
          <p className="text-gray-600 leading-relaxed">{permitNote}</p>
        </div>
      </section>

      {/* Neighborhoods Served */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Coverage Area</p>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-brand mb-4">
            Also Serving Near {cityName}
          </h2>
          <div className="flex flex-wrap gap-2">
            {neighborhoodList.map((n) => (
              <span key={n} className="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full">{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

      {/* Contact */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Free — No Obligation</p>
            <h2 className="font-heading text-4xl font-extrabold uppercase text-brand">
              Get a Free Quote in {cityName}
            </h2>
            <p className="text-gray-500 mt-3">Fill out the form and we'll be in touch within one business day.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
```

**Step 2: Commit**
```bash
git add app/locations/
git commit -m "feat: add city location pages for 10 Michigan cities"
```

---

### Task 12: Sitemap and robots

**Files:**
- Modify: `app/sitemap.ts`

**Step 1: Add gallery and city routes to sitemap**

```ts
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = "https://michigansaferooms.com";

const CITY_SLUGS = [
  "lansing", "flint", "grand-rapids", "saginaw", "jackson",
  "bay-city", "midland", "holland", "muskegon", "traverse-city",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
    url: `${BASE_URL}/locations/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...cityRoutes, ...postRoutes];
}
```

**Step 2: Commit**
```bash
git add app/sitemap.ts
git commit -m "feat: extend sitemap with city location and gallery routes"
```

---

**Section 3 push:**
```bash
git push origin main
```

---

## SECTION 4 — Technical & Performance

### Task 13: Image placeholders (already handled inline)

Image placeholders are embedded in `AboutSection.tsx` (Task 4) and `gallery/page.tsx` (Task 14) using gray `div` placeholders. All use descriptive alt text and `TODO` comments. No separate task needed beyond Task 14.

---

### Task 14: Gallery page

**Files:**
- Create: `app/gallery/page.tsx`
- Modify: `app/layout.tsx` (add Gallery to nav)

**Step 1: Create `app/gallery/page.tsx`**

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Work — Michigan Safe Room Installations",
  description:
    "See Michigan Safe Rooms installation photos from across lower Michigan — garage safe rooms, residential installs, and more. FEMA-compliant steel construction.",
};

const GALLERY_ITEMS = [
  { label: "Garage Safe Room — Lansing, MI" },
  { label: "Residential Install — Flint, MI" },
  { label: "8×8 Safe Room — Grand Rapids, MI" },
  { label: "Garage Safe Room — Saginaw, MI" },
  { label: "Large Safe Room — Ann Arbor, MI" },
  { label: "4×6 Install — Kalamazoo, MI" },
  { label: "Garage Safe Room — Jackson, MI" },
  { label: "Steel Door Detail — Bay City, MI" },
  { label: "Anchor System — Midland, MI" },
  { label: "Family Safe Room — Holland, MI" },
  { label: "10×10 Install — Muskegon, MI" },
  { label: "Completed Install — Traverse City, MI" },
];

export default function GalleryPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2">Portfolio</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand">
            Our Work — Michigan Safe Room Installations
          </h1>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Every job is FEMA P-320 compliant, professionally anchored, and installed in a single day.
          </p>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-14">
          {GALLERY_ITEMS.map((item) => (
            <div key={item.label} className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {/* TODO: Replace with real installation photo */}
              <div className="bg-gray-200 aspect-[4/3] flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="text-sm font-medium text-gray-700">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center bg-gray-50 border border-gray-100 rounded-xl p-10">
          <h2 className="font-heading text-3xl font-extrabold uppercase text-brand mb-3">
            See Your Safe Room Here
          </h2>
          <p className="text-gray-600 mb-6">Get a free on-site quote — no obligation.</p>
          <Link
            href="/#contact"
            className="inline-block bg-brand-accent text-white font-bold px-10 py-4 rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: In `app/layout.tsx`, add Gallery link to the nav and footer quick links**

In the nav `<nav>` block, add:
```tsx
<Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link>
```
(Place after "How It Works" link.)

**Step 3: Commit**
```bash
git add app/gallery/page.tsx app/layout.tsx
git commit -m "feat: add gallery page and nav link"
```

---

### Task 15: Performance (no code change needed)

- `ContactForm.tsx` already uses `e.preventDefault()` and client-side state — confirmed.
- Next.js Image is not used for any actual images yet (all placeholders use `div`); when real photos are added, use `next/image`.
- No iframes exist in the codebase.

No commit needed for this task.

---

### Task 16: GA4 Analytics

**Files:**
- Modify: `app/layout.tsx` (add gtag scripts)
- Modify: `app/components/ContactForm.tsx` (fire event on success)

**Step 1: In `app/layout.tsx`, add GA4 gtag scripts inside `<head>` (use Next.js `<Script>` or inline `<script>` tags)**

Add to the `<html>` body, right after `<body>`:
```tsx
{/* Google Analytics 4 — TODO: Replace G-XXXXXXXXXX with real Measurement ID */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `,
  }}
/>
```

**Step 2: In `ContactForm.tsx`, fire a GA4 conversion event on successful form submission**

In the `handleSubmit` function, after `setSuccess(true)`:
```ts
// Fire GA4 conversion event
if (typeof window !== "undefined" && typeof (window as Window & { gtag?: Function }).gtag === "function") {
  (window as Window & { gtag: Function }).gtag("event", "form_submit", {
    event_category: "Contact",
    event_label: "Quote Request",
  });
}
```

**Step 3: Commit**
```bash
git add app/layout.tsx app/components/ContactForm.tsx
git commit -m "feat: add GA4 analytics with form submit conversion event"
```

---

**Section 4 push:**
```bash
git push origin main
```

---

## SECTION 5 — Content & Copy Polish

### Task 17: Footer expansion

**Files:**
- Modify: `app/layout.tsx` (footer section)

**Step 1: Replace the entire footer content with a 4-column layout**

```tsx
<footer className="bg-gray-900 text-gray-400">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">

    {/* Column 1: Brand */}
    <div>
      <div className="flex items-center gap-2.5 mb-3">
        <ShieldIcon className="w-6 h-6 text-brand-accent" />
        <span className="text-white font-heading font-bold text-lg tracking-wide">Michigan Safe Rooms</span>
      </div>
      <p className="text-gray-400 leading-relaxed mb-3 text-xs">
        Protecting Michigan families with premium FEMA-compliant steel safe rooms. Fast installs across lower Michigan.
      </p>
      <a href="tel:+19896277291" className="text-brand-accent font-semibold hover:opacity-80 block mb-1">(989) 627-7291</a>
      <a href="mailto:aaronspoorconstruction@gmail.com" className="hover:text-white transition-colors text-xs">aaronspoorconstruction@gmail.com</a>
    </div>

    {/* Column 2: Quick Links */}
    <div>
      <p className="text-white font-semibold mb-3">Quick Links</p>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
        <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
        <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
        <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
        <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
        <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
        <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
      </ul>
    </div>

    {/* Column 3: Service Areas */}
    <div>
      <p className="text-white font-semibold mb-3">Service Areas</p>
      <ul className="space-y-2">
        {[
          ["Lansing", "lansing"],
          ["Flint", "flint"],
          ["Grand Rapids", "grand-rapids"],
          ["Saginaw", "saginaw"],
          ["Jackson", "jackson"],
          ["Bay City", "bay-city"],
          ["Midland", "midland"],
          ["Holland", "holland"],
          ["Muskegon", "muskegon"],
          ["Traverse City", "traverse-city"],
        ].map(([name, slug]) => (
          <li key={slug}>
            <Link href={`/locations/${slug}`} className="hover:text-white transition-colors">{name}, MI</Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Column 4: Trust Badges */}
    <div>
      <p className="text-white font-semibold mb-3">Our Credentials</p>
      <ul className="space-y-3">
        {[
          "FEMA P-320 Compliant",
          "ICC-500 Rated",
          "Licensed — MI Lic. #2101209885",
          "Fully Insured",
          "Lifetime Structural Warranty",
        ].map((badge) => (
          <li key={badge} className="flex items-center gap-2 text-xs">
            <svg className="w-3.5 h-3.5 text-brand-accent shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {badge}
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Copyright bar */}
  <div className="border-t border-gray-800 text-center text-xs py-4 text-gray-600">
    © {new Date().getFullYear()} MichiganSafeRooms.com — All rights reserved. Michigan Contractor Lic. #2101209885
  </div>
</footer>
```

**Step 2: Commit**
```bash
git add app/layout.tsx
git commit -m "feat: expand footer to 4 columns with service areas and trust badges"
```

---

### Task 18: Seasonal banner

**Files:**
- Create: `app/components/SeasonalBanner.tsx`
- Modify: `app/layout.tsx` (insert above `<header>`)

**Step 1: Create `app/components/SeasonalBanner.tsx`**

```tsx
"use client";
import { useState, useEffect } from "react";

export default function SeasonalBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show April (3) through August (7) — month is 0-indexed
    const month = new Date().getMonth();
    const inSeason = month >= 3 && month <= 7;
    const dismissed = sessionStorage.getItem("seasonalBannerDismissed") === "1";
    if (inSeason && !dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    sessionStorage.setItem("seasonalBannerDismissed", "1");
    setVisible(false);
  }

  return (
    <div className="bg-brand-accent text-white px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-center flex-1">
          Storm season is here — install slots are filling fast.{" "}
          <a href="tel:+19896277291" className="underline font-bold hover:opacity-80">
            Call (989) 627-7291
          </a>{" "}
          or{" "}
          <a href="#contact" className="underline font-bold hover:opacity-80">
            get a free quote today
          </a>
          .
        </p>
        <button onClick={dismiss} className="shrink-0 hover:opacity-70 transition-opacity" aria-label="Dismiss banner">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
```

**Step 2: In `app/layout.tsx`, import and add `<SeasonalBanner />` directly before `<header>`**

```tsx
import SeasonalBanner from "@/app/components/SeasonalBanner";
// In JSX, before <header>:
<SeasonalBanner />
```

**Step 3: Commit**
```bash
git add app/components/SeasonalBanner.tsx app/layout.tsx
git commit -m "feat: add dismissible seasonal storm banner (April–August)"
```

---

**Final push:**
```bash
cd /Users/aaronspoor/projects/michigansaferooms
git push origin main
```

---

## Final Checklist
- [ ] All internal links resolve (gallery, location pages, pricing anchor, how-it-works anchor)
- [ ] Mobile sticky CTA dismisses correctly
- [ ] Seasonal banner shows in April–August, dismisses to sessionStorage
- [ ] Contact form shows success message after submit
- [ ] FAQ accordion opens/closes correctly with all 11 items
- [ ] City pages render for all 10 slugs
- [ ] Sitemap includes gallery + 10 city routes
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] All TODO comments clearly labeled
