export type MobilityNeeds = "no" | "yes";

export type ShelterLocation =
  | "basement_existing"
  | "garage_existing"
  | "interior_new"
  | "exterior_above"
  | "exterior_buried";

export type HasConcreteSlab = "yes" | "no" | "not_sure";
export type SlabThickness = "ge_4" | "lt_4" | "not_sure";
export type FloodZone = "no" | "yes" | "unknown";
export type RebateIntent = "applying_rebate" | "not_applying" | "learning_more";

export interface QuizAnswers {
  // Step 1 — household
  bedrooms: number;
  occupants: number;
  mobilityNeeds: MobilityNeeds;

  // Step 2 — location
  location: ShelterLocation;

  // Step 3 — site
  hasConcreteSlab: HasConcreteSlab;
  slabThickness?: SlabThickness;
  zipCode: string;
  floodZone: FloodZone;

  // Step 4 — rebate
  rebateIntent: RebateIntent;
  veteran: boolean;

  // Step 5 — contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  addressLine2?: string;
  city: string;
  state: string;
  zip: string;
  installSameAsContact: boolean;
  installAddress?: string;
  referralSource?: string;
}

export interface ShelterModel {
  id: string;
  name: string;
  sqFt: number;
  basePrice: number;
}

export interface LineItem {
  label: string;
  amount: number;
}

export interface PricedQuote {
  isCustom: false;
  shelter: ShelterModel;
  lineItems: LineItem[];
  subtotal: number;
  veteranDiscount: number;
  total: number;
  estimatedRebate: number;
  netOutOfPocket: number;
  requiresBCA: boolean;
  rebateFlags: string[];
}

export interface CustomQuote {
  isCustom: true;
  reason: string;
  recommendedSizeNote: string;
  rebateFlags: string[];
}

export type QuoteResult = PricedQuote | CustomQuote;
