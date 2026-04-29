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
                Michigan Safe Rooms is a family-owned operation based in Durand, MI — centrally located in lower Michigan so we can reach any community quickly. Owner Aaron Spoor brings years of licensed construction experience to every installation, combining hands-on craftsmanship with a commitment to doing the job right the first time.
              </p>
              <p>
                Aaron is also a licensed pilot — a discipline where there is no margin for error and every checklist matters. He applies those same exacting standards to every safe room installation. From the anchor bolts to the door hardware, nothing gets left to chance. When your family&rsquo;s safety is on the line, that level of precision isn&rsquo;t optional — it&rsquo;s the only way we know how to work.
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
