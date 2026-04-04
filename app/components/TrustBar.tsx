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
