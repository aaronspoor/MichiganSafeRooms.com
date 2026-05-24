import type {
  QuizAnswers,
  ShelterModel,
  LineItem,
  QuoteResult,
} from "./types";

// ─────────────────────────────────────────────────────────────
// TODO: Aaron — tune these numbers before launch.
// Strategy: every auto-priced quote MUST stay under the $9,509
// Michigan rebate benefit cap so a FEMA Benefit-Cost Analysis (BCA)
// is never required. Anything that can't be priced under the cap, or
// isn't a standard above-ground interior install on an existing slab,
// routes to a manual custom quote instead of emitting a number.
// ─────────────────────────────────────────────────────────────
export const SHELTERS: Record<string, ShelterModel> = {
  TIER_2BR: { id: "tier_2br", name: "3.5' × 5' Safe Room", sqFt: 17.5, basePrice: 6999 },
  TIER_3BR: { id: "tier_3br", name: "4' × 6' Safe Room", sqFt: 24, basePrice: 7999 },
  TIER_4BR: { id: "tier_4br", name: "4' × 8' Safe Room", sqFt: 32, basePrice: 8999 },
};

const ADA_DOOR = 500; // 36" wheelchair-accessible clear opening
const INTERIOR_NEW_COORD = 250; // new-construction coordination charge
const VETERAN_DISCOUNT_PCT = 0.1;

// Michigan MSP/EMHSD rebate program
const REBATE_BENEFIT_CAP = 9509; // above this, a FEMA BCA is required
const REBATE_MAX = 7131.75; // 75% of the benefit cap
// ─────────────────────────────────────────────────────────────

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

function buildRebateFlags(answers: QuizAnswers): string[] {
  const flags: string[] = [];
  if (answers.floodZone === "yes") {
    flags.push(
      "Property is in a FEMA flood zone — rebate eligibility depends on the specific zone designation. Floodways, Zone VE, and Coastal A Zones disqualify; placement within a Special Flood Hazard Area is restricted."
    );
  }
  return flags;
}

export function calculateQuote(answers: QuizAnswers): QuoteResult {
  const mobility = answers.mobilityNeeds === "yes";
  const rebateFlags = buildRebateFlags(answers);
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
      rebateFlags,
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
      rebateFlags,
    };
  }

  if (!shelter) {
    return {
      isCustom: true,
      reason:
        "Your household needs a shelter larger than our standard line. We'll prepare a custom quote sized for your family.",
      recommendedSizeNote: "Larger than a 4' × 8' unit — sized on a custom basis.",
      rebateFlags,
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

  // Safety net: never emit an auto price that would trip the BCA threshold.
  if (total > REBATE_BENEFIT_CAP) {
    return {
      isCustom: true,
      reason:
        "Your configuration runs above the standard rebate benefit cap, so we'll prepare a custom quote to keep your rebate paperwork simple.",
      recommendedSizeNote: `Based on your household, we'd recommend around a ${shelter.name}.`,
      rebateFlags,
    };
  }

  const rebateEligibleAmount = Math.min(total, REBATE_BENEFIT_CAP);
  const estimatedRebate =
    answers.rebateIntent === "applying_rebate"
      ? Math.min(rebateEligibleAmount * 0.75, REBATE_MAX)
      : 0;
  const netOutOfPocket = total - estimatedRebate;

  return {
    isCustom: false,
    shelter,
    lineItems,
    subtotal,
    veteranDiscount,
    total,
    estimatedRebate,
    netOutOfPocket,
    requiresBCA: false, // auto-priced quotes are always under the cap
    rebateFlags,
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
