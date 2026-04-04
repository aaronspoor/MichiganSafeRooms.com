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
