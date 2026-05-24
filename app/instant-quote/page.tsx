import type { Metadata } from "next";
import InstantQuoteWizard from "./InstantQuoteWizard";

export const metadata: Metadata = {
  title: "Get an Instant Quote | Michigan Safe Rooms",
  description:
    "FEMA-compliant steel safe rooms, made in Michigan. Answer a few questions and get your tailored price in about 2 minutes.",
  alternates: { canonical: "https://michigansaferooms.com/instant-quote" },
};

export default function InstantQuotePage() {
  return (
    <main>
      <section className="bg-brand text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand-accent mb-3">
            Get an Instant Quote
          </h1>
          <p className="text-blue-100 text-lg">
            FEMA-compliant safe rooms, made in Michigan. Get your tailored price in 2 minutes.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <InstantQuoteWizard />
      </section>
    </main>
  );
}
