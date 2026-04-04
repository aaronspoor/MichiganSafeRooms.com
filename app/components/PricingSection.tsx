const TIERS = [
  {
    name: "Small Safe Room",
    size: "4×6 ft",
    price: "Starting at $6,999",
    capacity: "Ideal for 2–4 people",
    popular: false,
    features: ["Heavy-gauge steel construction", "FEMA P-320 rated", "Same-day installation"],
  },
  {
    name: "Medium Safe Room",
    size: "8×8 ft",
    price: "Starting at $9,999",
    capacity: "Most popular — fits 4–8 people",
    popular: true,
    features: ["Heavy-gauge steel construction", "FEMA P-320 rated", "Same-day installation"],
  },
  {
    name: "Large Safe Room",
    size: "10×10 ft",
    price: "Starting at $13,999",
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
                    <svg className="w-4 h-4 shrink-0 text-brand-accent" viewBox="0 0 20 20" fill="currentColor">
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
          <p className="text-gray-500">
            Financing available through third-party partners — ask for details.
          </p>
        </div>
      </div>
    </section>
  );
}
