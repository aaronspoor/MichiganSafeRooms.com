import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/app/components/FaqAccordion";
import EligibilityChecker from "./components/EligibilityChecker";
import CostCalculator from "./components/CostCalculator";
import LeadCaptureForm from "./components/LeadCaptureForm";

export const metadata: Metadata = {
  title: "Michigan Safe Room Rebate Program | Get Up to $7,131.75 Back | Michigan Safe Rooms",
  description:
    "Michigan homeowners can receive a 75% rebate (up to $7,131.75) on a FEMA-compliant safe room through the Michigan Safe Room Rebate Program. Learn if you qualify and get a free quote from Michigan Safe Rooms.",
  alternates: {
    canonical: "https://michigansaferooms.com/grant",
  },
  openGraph: {
    title: "Michigan Safe Room Rebate Program | Get Up to $7,131.75 Back",
    description:
      "Michigan homeowners can receive a 75% rebate (up to $7,131.75) on a FEMA-compliant safe room. Check eligibility, calculate your savings, and get a free quote.",
    url: "https://michigansaferooms.com/grant",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Michigan Safe Room Rebate Program" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Michigan Safe Room Rebate — Get Up to $7,131.75 Back",
    description:
      "75% rebate on a FEMA-compliant safe room for Michigan homeowners. Check if you qualify.",
    images: ["/og-image.jpg"],
  },
};

const FAQ_ITEMS = [
  {
    question: "Do I have to use a specific contractor?",
    answer:
      "No — but the contractor must be able to certify that the safe room meets FEMA P-320 or P-361 compliance standards. Michigan Safe Rooms is fully FEMA-compliant and provides all required contractor certification documentation.",
  },
  {
    question: "What safe room types qualify for the rebate?",
    answer:
      "The program covers four types: below-ground interior safe rooms, below-ground exterior safe rooms, above-ground interior safe rooms, and above-ground exterior safe rooms. All must meet FEMA P-320 (residential) or P-361 (larger residential/community) standards.",
  },
  {
    question: "How does the selection process work?",
    answer:
      "50 primary homeowners and 100 backup homeowners are selected by random draw from all eligible Michigan applicants. There is no way to improve your odds — everyone who applies has an equal chance. Backup applicants fill any slots vacated by primary selectees.",
  },
  {
    question: "How long does the whole process take?",
    answer:
      "From application submission to receiving your rebate check can take 12 months or more. After selection, you must attend a virtual briefing, receive a Notice to Proceed, hire a contractor, complete the installation, submit documentation, and then wait for the state to process payment.",
  },
  {
    question: "What if my safe room costs more than $9,509?",
    answer:
      "The rebate is calculated based on the state's predetermined BCA (Benefit-Cost Analysis) cost of $9,509. The maximum rebate is 75% of that amount, or $7,131.75. Any cost above $9,509 is your responsibility — the state will not cover the difference.",
  },
  {
    question: "Can I install the safe room myself and get reimbursed?",
    answer:
      "No. The installation must be completed by a licensed, FEMA-compliant contractor and you must have paid for it. DIY installations and labor performed by the homeowner are not eligible for reimbursement.",
  },
  {
    question: "What documentation is required to receive the rebate?",
    answer:
      "You will need to submit: a completed application, proof of property ownership, contractor invoice and proof of payment, contractor certification that the safe room meets FEMA P-320 or P-361 standards, and photos of the completed installation. Your contractor should provide most of this documentation.",
  },
  {
    question: "Does the rebate money go to me or directly to the contractor?",
    answer:
      "The rebate goes from the state directly to you, the homeowner. You pay Michigan Safe Rooms in full at the time of installation, then submit your documentation to receive your reimbursement check from the state.",
  },
  {
    question: "What is the application deadline?",
    answer:
      "Application windows vary by grant cycle. Visit the official Michigan Safe Room Rebate Program page at michigan.gov or check the Smartsheet application form for current deadlines. Applications are only accepted during open enrollment periods.",
  },
  {
    question: "Can I apply if I live in a mobile home or manufactured home?",
    answer:
      "Generally, no. The program is intended for owner-occupied single-family residences with permanent foundations. Contact the Michigan State Police EMHSD directly if you have questions about your specific property type.",
  },
];

const JSON_LD = {
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
};

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function GrantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="bg-brand text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-green-700/30 border border-green-500/40 text-green-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 01.894.553l1.837 3.72 4.104.597a1 1 0 01.554 1.705l-2.97 2.893.701 4.084a1 1 0 01-1.451 1.054L10 14.547l-3.669 1.929a1 1 0 01-1.451-1.054l.701-4.084L2.61 8.575a1 1 0 01.554-1.705l4.104-.597L9.106 2.553A1 1 0 0110 2z" />
            </svg>
            Michigan Safe Room Rebate Program
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight mb-5">
            Get Up to{" "}
            <span className="text-brand-accent">$7,131.75 Back</span>{" "}
            on Your Safe Room
          </h1>

          <p className="text-blue-100 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Michigan homeowners can qualify for a 75% rebate on a FEMA-compliant safe room through the state&rsquo;s rebate program. Michigan Safe Rooms installs shelters that meet every requirement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#eligibility-checker"
              className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
            >
              Check My Eligibility
            </a>
            <a
              href="#grant-lead-form"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Get a Free Quote
            </a>
          </div>

          <p className="text-blue-200 text-xs mt-6">
            Michigan Safe Rooms is not affiliated with MSP/EMHSD. We are a qualified FEMA-compliant contractor for this program.
          </p>
        </div>
      </section>

      {/* ── Overview Cards ─────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
              <p className="font-heading text-4xl font-extrabold text-green-700 mb-2">75% Back</p>
              <p className="font-semibold text-gray-800 mb-1">Up to $7,131.75</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                The state reimburses 75% of eligible safe room costs, up to a program maximum of $7,131.75.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
              <p className="font-heading text-4xl font-extrabold text-brand mb-2">50 Slots</p>
              <p className="font-semibold text-gray-800 mb-1">Statewide Random Draw</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                50 primary homeowners (plus 100 backups) are selected by random draw from all eligible Michigan applicants.
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
              <p className="font-heading text-4xl font-extrabold text-brand-accent mb-2">FEMA</p>
              <p className="font-semibold text-gray-800 mb-1">P-320 / P-361 Required</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your safe room must meet FEMA P-320 (residential) or P-361 (community) standards and be installed by a certified contractor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand text-center mb-3">
            How the Program Works
          </h2>
          <p className="text-gray-500 text-center mb-10 text-sm">
            From application to rebate check — here&rsquo;s the full process.
          </p>

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "Apply Through the State Portal",
                body: "Submit your application through the official Michigan state Smartsheet form. Applications are only accepted during open enrollment windows.",
                cta: { label: "Open Application Form", href: "https://app.smartsheet.com/b/form/019d6e30121875f6ae8b02a5d30b3a4b" },
              },
              {
                num: "02",
                title: "Random Selection",
                body: "50 primary applicants and 100 backup applicants are randomly selected from the pool of eligible Michigan homeowners. All eligible applicants have an equal chance.",
              },
              {
                num: "03",
                title: "Attend the Required Briefing",
                body: "Selected homeowners must attend a virtual briefing via Microsoft Teams. Attendance is mandatory — missing it forfeits your slot.",
              },
              {
                num: "04",
                title: "Receive Notice to Proceed — Then Hire Us",
                body: "Once you receive your official Notice to Proceed from the state, you may hire a FEMA-compliant contractor. Michigan Safe Rooms provides full P-320 certification documentation.",
              },
              {
                num: "05",
                title: "Install, Document, Get Paid",
                body: "Your shelter is installed and inspected. Submit your documentation (invoice, photos, certifications) to the state, and your rebate check is issued directly to you.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-brand text-white font-heading font-extrabold text-lg flex items-center justify-center shadow">
                    {step.num}
                  </div>
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-gray-900 text-base mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                  {step.cta && (
                    <a
                      href={step.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold text-brand-light hover:opacity-80 transition-opacity"
                    >
                      {step.cta.label}
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://www.michigan.gov/msp/divisions/emhsd/response-recovery-responsive/michigan-safe-room-rebate-program"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Official program page: michigan.gov
            </a>
          </div>
        </div>
      </section>

      {/* ── Eligibility Checker ─────────────────────────────────────── */}
      <section id="eligibility-checker" className="bg-brand/5 border-y border-brand/10 py-16 sm:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand text-center mb-3">
            Do You Qualify?
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Answer three quick questions to check your basic eligibility.
          </p>
          <EligibilityChecker />
        </div>
      </section>

      {/* ── Cost Calculator ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand text-center mb-3">
            Calculate Your Savings
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Drag the slider to see your estimated rebate and out-of-pocket cost.
          </p>
          <CostCalculator />
        </div>
      </section>

      {/* ── Trust / Credentials ─────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-6">Program Administered By</p>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-10">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
              <svg className="w-8 h-8 text-brand shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <div>
                <p className="font-bold text-brand text-sm leading-none">Michigan State Police</p>
                <p className="text-xs text-gray-500 mt-0.5">EMHSD Division</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm">
              <svg className="w-8 h-8 text-blue-700 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              <div>
                <p className="font-bold text-blue-700 text-sm leading-none">FEMA</p>
                <p className="text-xs text-gray-500 mt-0.5">Hazard Mitigation</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              "Michigan Safe Rooms installs FEMA P-320 compliant shelters",
              "We provide all required contractor certification documentation",
              "Steel shelters rated for EF5 tornado-force winds",
              "Licensed and insured — operating throughout lower Michigan",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <CheckIcon />
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture Form ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand text-center mb-3">
            Get Program Info + a Free Quote
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm leading-relaxed">
            We&rsquo;ll send you a full breakdown of the program and follow up with a no-obligation quote from Michigan Safe Rooms.
          </p>
          <LeadCaptureForm />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-brand text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Answers based on the official Michigan Safe Room Rebate Program rules.
          </p>
          <FaqAccordion items={FAQ_ITEMS} />
          <p className="text-xs text-gray-400 text-center mt-6">
            Program details subject to change.{" "}
            <a
              href="https://www.michigan.gov/msp/divisions/emhsd/response-recovery-responsive/michigan-safe-room-rebate-program"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-80"
            >
              Verify at michigan.gov
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="bg-brand py-14 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white mb-4">
            Ready to Lock In Your Price?
          </h2>
          <p className="text-blue-100 leading-relaxed mb-6 max-w-xl mx-auto">
            Michigan Safe Rooms installs FEMA-certified steel shelters that qualify for this program. We handle the contractor certification paperwork so you have everything you need to claim your rebate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#grant-lead-form"
              className="bg-brand-accent hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-opacity shadow-lg"
            >
              Get Your Free Quote
            </a>
            <Link
              href="/"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Learn About Our Shelters
            </Link>
          </div>
          <p className="text-blue-200 text-xs mt-6">
            Questions? Call us at{" "}
            <a href="tel:9896277291" className="underline font-semibold hover:opacity-80">
              (989) 627-7291
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
