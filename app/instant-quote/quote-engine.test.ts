import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateQuote } from "./quote-engine.ts";
import type { QuizAnswers } from "./types.ts";

const base: QuizAnswers = {
  bedrooms: 1,
  occupants: 2,
  mobilityNeeds: "no",
  location: "garage_existing",
  hasConcreteSlab: "yes",
  slabThickness: "ge_4",
  zipCode: "48429",
  floodZone: "no",
  veteran: false,
  firstName: "Test",
  lastName: "User",
  email: "t@example.com",
  phone: "9896277291",
  streetAddress: "1 Main St",
  city: "Durand",
  state: "MI",
  zip: "48429",
  installSameAsContact: true,
};

test("minimum 1-bedroom (2 occupants) auto-prices the 3.5x5 tier at $6,999", () => {
  const q = calculateQuote({ ...base });
  assert.equal(q.isCustom, false);
  if (q.isCustom) return;
  assert.equal(q.shelter.basePrice, 6999);
  assert.equal(q.total, 6999);
});

test("3-bedroom (6 occupants) auto-prices the 4x6 tier at $7,999", () => {
  const q = calculateQuote({ ...base, bedrooms: 3, occupants: 6 });
  assert.equal(q.isCustom, false);
  if (q.isCustom) return;
  assert.equal(q.total, 7999);
});

test("veteran case applies a 10% discount", () => {
  const q = calculateQuote({ ...base, veteran: true });
  assert.equal(q.isCustom, false);
  if (q.isCustom) return;
  assert.equal(q.veteranDiscount, 700); // round(6999 * 0.10)
  assert.equal(q.total, 6299);
});

test("standard quotes above the former rebate cap still return an estimate", () => {
  const q = calculateQuote({
    ...base,
    bedrooms: 3,
    occupants: 6,
    mobilityNeeds: "yes",
    location: "interior_new",
  });
  assert.equal(q.isCustom, false);
  if (q.isCustom) return;
  assert.equal(q.total, 9749);
});

test("4-bedroom with ADA needs ledger > 4x8 and routes to a custom quote", () => {
  const q = calculateQuote({
    ...base,
    bedrooms: 4,
    occupants: 8,
    mobilityNeeds: "yes",
  });
  assert.equal(q.isCustom, true);
});

test("5-bedroom exterior buried with no slab routes to a custom quote", () => {
  const q = calculateQuote({
    ...base,
    bedrooms: 5,
    occupants: 10,
    location: "exterior_buried",
    hasConcreteSlab: "no",
  });
  assert.equal(q.isCustom, true);
});

test("basement install routes to a custom quote", () => {
  const q = calculateQuote({ ...base, location: "basement_existing" });
  assert.equal(q.isCustom, true);
});

test("flood-zone answer adds a site-review note without changing price", () => {
  const q = calculateQuote({ ...base, floodZone: "yes" });
  assert.equal(q.isCustom, false);
  if (q.isCustom) return;
  assert.equal(q.total, 6999);
  assert.ok(q.siteNotes.some((note) => note.toLowerCase().includes("flood zone")));
});
