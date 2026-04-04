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
