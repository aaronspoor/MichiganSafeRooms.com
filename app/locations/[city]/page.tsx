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
    description: `Michigan Safe Rooms installs FEMA P-320 compliant steel safe rooms in ${data.cityName}, ${data.countyName} County, MI. EF5-rated, same-day installation. Free quote — no obligation.`,
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
            <p className="text-gray-500 mt-3">Fill out the form and we&rsquo;ll be in touch within one business day.</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
