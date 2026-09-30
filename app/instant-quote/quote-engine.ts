import type {
  QuizAnswers,
  ShelterModel,
  LineItem,
  QuoteResult,
} from "./types";

// Standard line pricing. Site-specific work routes to a custom quote.
export const SHELTERS: Record<string, ShelterModel> = {
  TIER_2BR: { id: "tier_2br", name: "3.5' × 5' Safe Room", sqFt: 17.5, basePrice: 6999 },
  TIER_3BR: { id: "tier_3br", name: "4' × 6' Safe Room", sqFt: 24, basePrice: 7999 },
  TIER_4BR: { id: "tier_4br", name: "4' × 8' Safe Room", sqFt: 32, basePrice: 8999 },
};

const ADA_DOOR = 500; // 36" wheelchair-accessible clear opening
const INTERIOR_NEW_COORD = 250; // new-construction coordination charge
const VETERAN_DISCOUNT_PCT = 0.1;

// Only these locations are auto-priced (above-ground, interior, on a slab).
const AUTO_PRICE_LOCATIONS = new Set(["garage_existing", "interior_new"]);

export function recommendSize(
  occupants: number,
  mobility: boolean
): ShelterModel | null {
  const minSqFt = mobility ? occupants * 5 : occupants * 3;
  if (minSqFt <= SHELTERS.TIER_2BR.sqFt) return SHELTERS.TIER_2BR;
  if (minSqFt <= SHELTERS.TIER_3BR.sqFt) return SHELTERS.TIER_3BR;
  if (minSqFt <= SHELTERS.TIER_4BR.sqFt) return SHELTERS.TIER_4BR;
  return null; // larger than our standard line → custom quote
}

function buildSiteNotes(answers: QuizAnswers): string[] {
  const notes: string[] = [];
  if (answers.floodZone === "yes") {
    notes.push(
      "The property is in a mapped flood zone. We’ll review site conditions and installation requirements during the consultation."
    );
  }
  return notes;
}

export function calculateQuote(answers: QuizAnswers): QuoteResult {
  const mobility = answers.mobilityNeeds === "yes";
  const siteNotes = buildSiteNotes(answers);
  const shelter = recommendSize(answers.occupants, mobility);

  // ── Custom-quote routing ──────────────────────────────────
  if (!AUTO_PRICE_LOCATIONS.has(answers.location)) {
    return {
      isCustom: true,
      reason:
        "This installation type (basement, exterior, or buried) is built to order. We'll prepare a tailored custom quote after reviewing your site.",
      recommendedSizeNote: shelter
        ? `Based on your household, we'd recommend around a ${shelter.name}.`
        : "We'll size your shelter during the site visit.",
      siteNotes,
    };
  }

  if (answers.hasConcreteSlab === "no" || answers.slabThickness === "lt_4") {
    return {
      isCustom: true,
      reason:
        "Your site needs a new or thickened reinforced concrete pad before anchoring. We'll include that in a custom quote after a site visit.",
      recommendedSizeNote: shelter
        ? `Based on your household, we'd recommend around a ${shelter.name}.`
        : "We'll size your shelter during the site visit.",
      siteNotes,
    };
  }

  if (!shelter) {
    return {
      isCustom: true,
      reason:
        "Your household needs a shelter larger than our standard line. We'll prepare a custom quote sized for your family.",
      recommendedSizeNote: "Larger than a 4' × 8' unit — sized on a custom basis.",
      siteNotes,
    };
  }

  // ── Standard auto-price ───────────────────────────────────
  let subtotal = shelter.basePrice;
  const lineItems: LineItem[] = [
    { label: `${shelter.name} base unit`, amount: shelter.basePrice },
  ];

  if (mobility) {
    subtotal += ADA_DOOR;
    lineItems.push({ label: '36" ADA-accessible door upgrade', amount: ADA_DOOR });
  }

  if (answers.location === "interior_new") {
    subtotal += INTERIOR_NEW_COORD;
    lineItems.push({
      label: "New construction coordination",
      amount: INTERIOR_NEW_COORD,
    });
  }

  const veteranDiscount = answers.veteran
    ? Math.round(subtotal * VETERAN_DISCOUNT_PCT)
    : 0;
  const total = subtotal - veteranDiscount;

  return {
    isCustom: false,
    shelter,
    lineItems,
    subtotal,
    veteranDiscount,
    total,
    siteNotes,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
