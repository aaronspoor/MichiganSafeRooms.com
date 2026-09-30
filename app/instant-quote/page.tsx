import type { Metadata } from "next";
import InstantQuoteWizard from "./InstantQuoteWizard";

export const metadata: Metadata = {
  title: "Get an Instant Quote | Michigan Safe Rooms",
  description:
    "Steel safe rooms designed using applicable FEMA safe-room guidance. Answer a few questions to get an estimate in about 2 minutes.",
  alternates: { canonical: "https://michigansaferooms.com/instant-quote" },
};

export default function InstantQuotePage() {
  return (
    <>
      <section className="bg-brand text-white py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-brand-accent mb-3">
            Get an Instant Quote
          </h1>
          <p className="text-blue-100 text-lg">
            Steel safe rooms designed using applicable FEMA safe-room guidance. Get an estimate in about 2 minutes.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4">
        <InstantQuoteWizard />
      </section>
    </>
  );
}
