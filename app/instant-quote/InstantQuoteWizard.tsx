"use client";

import { useState } from "react";
import type { QuizAnswers, QuoteResult } from "./types";
import { calculateQuote, formatCurrency } from "./quote-engine";

const TOTAL_STEPS = 6;

type Answers = Partial<QuizAnswers>;

const LOCATION_OPTIONS: { value: QuizAnswers["location"]; label: string }[] = [
  { value: "basement_existing", label: "Existing basement (concrete floor)" },
  { value: "garage_existing", label: "Existing garage (concrete floor)" },
  { value: "interior_new", label: "Interior room of a new home being built" },
  { value: "exterior_above", label: "Outside the home, above ground (attached or freestanding)" },
  { value: "exterior_buried", label: "Outside the home, buried below grade" },
];

const REFERRAL_OPTIONS = [
  "Google search",
  "Facebook",
  "Referral from friend/family",
  "Saw your truck",
  "Other",
];

// ── Small presentational helpers ─────────────────────────────
function RadioCard({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
        checked
          ? "border-brand-accent bg-amber-50 ring-1 ring-brand-accent"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4 accent-brand-accent"
      />
      <span className="text-sm text-gray-800 leading-snug">{children}</span>
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-red-600 mt-1">{msg}</p>;
}

const inputCls =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none";
const labelCls = "block text-sm font-medium text-gray-700 mb-1";

export default function InstantQuoteWizard() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({
    state: "MI",
    installSameAsContact: true,
    veteran: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    quoteNumber: string;
    emailDelivered: boolean;
    quote: QuoteResult;
  } | null>(null);

  const update = (patch: Answers) => setAnswers((a) => ({ ...a, ...patch }));

  // ── Per-step validation ────────────────────────────────────
  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 1) {
      if (!answers.bedrooms) e.bedrooms = "Please select the number of bedrooms.";
      if (!answers.occupants || answers.occupants < 1 || answers.occupants > 20)
        e.occupants = "Enter a number between 1 and 20.";
      if (!answers.mobilityNeeds) e.mobilityNeeds = "Please choose an option.";
    }
    if (s === 2) {
      if (!answers.location) e.location = "Please choose where it will be installed.";
    }
    if (s === 3) {
      if (!answers.hasConcreteSlab) e.hasConcreteSlab = "Please choose an option.";
      if (answers.hasConcreteSlab === "yes" && !answers.slabThickness)
        e.slabThickness = "Please choose the slab thickness.";
      if (!/^\d{5}$/.test(answers.zipCode ?? "")) e.zipCode = "Enter a 5-digit ZIP code.";
      if (!answers.floodZone) e.floodZone = "Please choose an option.";
    }
    if (s === 5) {
      if (!answers.firstName?.trim()) e.firstName = "Required.";
      if (!answers.lastName?.trim()) e.lastName = "Required.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(answers.email ?? ""))
        e.email = "Enter a valid email.";
      if ((answers.phone ?? "").replace(/\D/g, "").length !== 10)
        e.phone = "Enter a 10-digit US phone number.";
      if (!answers.streetAddress?.trim()) e.streetAddress = "Required.";
      if (!answers.city?.trim()) e.city = "Required.";
      if (!answers.state?.trim()) e.state = "Required.";
      if (!/^\d{5}$/.test(answers.zip ?? "")) e.zip = "Enter a 5-digit ZIP code.";
      if (!answers.installSameAsContact && !answers.installAddress?.trim())
        e.installAddress = "Enter the install address.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, TOTAL_STEPS));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function back() {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function doSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/instant-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setResult({
        quoteNumber: data.quoteNumber,
        emailDelivered: data.emailDelivered,
        quote: data.quote,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleSubmitClick() {
    if (!validateStep(5)) {
      setStep(5);
      return;
    }
    doSubmit();
  }

  // ── Success screen ──────────────────────────────────────────
  if (result) {
    const q = result.quote;
    return (
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
        <div className="text-4xl mb-3" aria-hidden="true">
          ✅
        </div>
        {result.emailDelivered ? (
          <h2 className="font-heading text-3xl font-extrabold uppercase text-brand mb-2">
            Quote sent to {answers.email}
          </h2>
        ) : (
          <h2 className="font-heading text-3xl font-extrabold uppercase text-brand mb-2">
            We got your quote — we&apos;re resending your email now
          </h2>
        )}
        <p className="text-gray-500 mb-6">Quote #{result.quoteNumber}</p>

        <div className="text-left bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
          {q.isCustom ? (
            <>
              <p className="font-semibold text-brand mb-1">Custom quote in progress</p>
              <p className="text-sm text-gray-600">{q.reason}</p>
            </>
          ) : (
            <ul className="space-y-1 text-sm text-gray-700">
              <li>
                <strong>Recommended size:</strong> {q.shelter.name} ({q.shelter.sqFt} sq ft)
              </li>
              <li>
                <strong>Estimated total:</strong> {formatCurrency(q.total)}
              </li>
            </ul>
          )}
        </div>


        <a
          href="tel:+19896277291"
          className="inline-block bg-brand-accent text-white font-bold py-3 px-8 rounded-lg hover:opacity-90"
        >
          Call Aaron now: (989) 627-7291
        </a>
      </div>
    );
  }

  // ── Wizard ──────────────────────────────────────────────────
  const pct = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6 sticky top-0 bg-gray-50/95 backdrop-blur py-3 z-10">
        <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
          <span>
            Step {step} of {TOTAL_STEPS}
          </span>
          <span>{pct}%</span>
        </div>
        <div
          className="h-2 bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-label={`Step ${step} of ${TOTAL_STEPS}`}
        >
          <div
            className="h-full bg-brand-accent transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
        {/* STEP 1 */}
        {step === 1 && (
          <fieldset>
            <legend className="font-heading text-2xl font-extrabold uppercase text-brand mb-1">
              How many people need protection?
            </legend>
            <p className="text-sm text-gray-500 mb-5">
              We use household size and accessibility needs to recommend a shelter size.
            </p>

            <p className={labelCls}>Bedrooms in your home</p>
            <div className="flex flex-wrap gap-2 mb-1">
              {[1, 2, 3, 4, 5].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => update({ bedrooms: b, occupants: b * 2 })}
                  className={`px-5 py-2 rounded-lg border text-sm font-semibold ${
                    answers.bedrooms === b
                      ? "border-brand-accent bg-amber-50 text-brand ring-1 ring-brand-accent"
                      : "border-gray-200 text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {b === 5 ? "5+" : b}
                </button>
              ))}
            </div>
            <FieldError msg={errors.bedrooms} />

            <div className="mt-5">
              <label htmlFor="occupants" className={labelCls}>
                Number of occupants
              </label>
              <input
                id="occupants"
                type="number"
                min={1}
                max={20}
                value={answers.occupants ?? ""}
                onChange={(e) => update({ occupants: Number(e.target.value) })}
                className={`${inputCls} max-w-[8rem]`}
              />
              <FieldError msg={errors.occupants} />
            </div>

            <div className="mt-5">
              <p className={labelCls}>Does anyone need ADA-accessible access?</p>
              <div className="space-y-2">
                <RadioCard
                  name="mobility"
                  value="no"
                  checked={answers.mobilityNeeds === "no"}
                  onChange={() => update({ mobilityNeeds: "no" })}
                >
                  No
                </RadioCard>
                <RadioCard
                  name="mobility"
                  value="yes"
                  checked={answers.mobilityNeeds === "yes"}
                  onChange={() => update({ mobilityNeeds: "yes" })}
                >
                  Yes — someone in our household uses a wheelchair or needs ADA-accessible access
                </RadioCard>
              </div>
              <FieldError msg={errors.mobilityNeeds} />
            </div>
          </fieldset>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <fieldset>
            <legend className="font-heading text-2xl font-extrabold uppercase text-brand mb-1">
              Where will the safe room be installed?
            </legend>
            <p className="text-sm text-gray-500 mb-5">
              Safe rooms can go in several locations. Placement affects price and anchoring method.
            </p>
            <div className="space-y-2">
              {LOCATION_OPTIONS.map((o) => (
                <RadioCard
                  key={o.value}
                  name="location"
                  value={o.value}
                  checked={answers.location === o.value}
                  onChange={() => update({ location: o.value })}
                >
                  {o.label}
                </RadioCard>
              ))}
            </div>
            <FieldError msg={errors.location} />
          </fieldset>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <fieldset>
            <legend className="font-heading text-2xl font-extrabold uppercase text-brand mb-1">
              Installation details
            </legend>
            <p className="text-sm text-gray-500 mb-5">
              These help us prepare an accurate quote. If you&apos;re unsure, choose “Not sure”; we may ask for a photo or measurement by email.
            </p>

            <p className={labelCls}>Is there an existing concrete slab?</p>
            <div className="space-y-2 mb-4">
              {[
                { v: "yes", l: "Yes" },
                { v: "no", l: "No" },
                { v: "not_sure", l: "Not sure" },
              ].map((o) => (
                <RadioCard
                  key={o.v}
                  name="slab"
                  value={o.v}
                  checked={answers.hasConcreteSlab === o.v}
                  onChange={() =>
                    update({ hasConcreteSlab: o.v as QuizAnswers["hasConcreteSlab"] })
                  }
                >
                  {o.l}
                </RadioCard>
              ))}
            </div>
            <FieldError msg={errors.hasConcreteSlab} />

            {answers.hasConcreteSlab === "yes" && (
              <div className="mb-4">
                <p className={labelCls}>How thick is the slab?</p>
                <div className="space-y-2">
                  {[
                    { v: "ge_4", l: "4 inches or more" },
                    { v: "lt_4", l: "Less than 4 inches" },
                    { v: "not_sure", l: "Not sure" },
                  ].map((o) => (
                    <RadioCard
                      key={o.v}
                      name="thickness"
                      value={o.v}
                      checked={answers.slabThickness === o.v}
                      onChange={() =>
                        update({ slabThickness: o.v as QuizAnswers["slabThickness"] })
                      }
                    >
                      {o.l}
                    </RadioCard>
                  ))}
                </div>
                <FieldError msg={errors.slabThickness} />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="zipCode" className={labelCls}>
                ZIP code
              </label>
              <input
                id="zipCode"
                inputMode="numeric"
                maxLength={5}
                value={answers.zipCode ?? ""}
                onChange={(e) =>
                  update({ zipCode: e.target.value.replace(/\D/g, "").slice(0, 5) })
                }
                className={`${inputCls} max-w-[10rem]`}
              />
              <FieldError msg={errors.zipCode} />
            </div>

            <p className={labelCls}>Is your property in a flood zone?</p>
            <div className="space-y-2">
              {[
                { v: "no", l: "No, my property is not in a flood zone" },
                {
                  v: "yes",
                  l: "Yes, I'm in a designated FEMA flood zone (Zone A, AE, VE, or Floodway)",
                },
                { v: "unknown", l: "I don't know" },
              ].map((o) => (
                <RadioCard
                  key={o.v}
                  name="flood"
                  value={o.v}
                  checked={answers.floodZone === o.v}
                  onChange={() => update({ floodZone: o.v as QuizAnswers["floodZone"] })}
                >
                  {o.l}
                </RadioCard>
              ))}
            </div>
            <FieldError msg={errors.floodZone} />

            {answers.floodZone === "yes" && answers.location === "exterior_buried" && (
              <p className="mt-4 text-sm text-amber-800 bg-amber-50 border border-brand-accent rounded-lg p-3">
                We’ll account for flood-zone considerations using the details you provide and may request more information by email.
              </p>
            )}
          </fieldset>
        )}

        {/* STEP 4 — optional veteran discount */}
        {step === 4 && (
          <fieldset>
            <legend className="font-heading text-2xl font-extrabold uppercase text-brand mb-1">
              Is anyone in your household a veteran or active-duty service member?
            </legend>
            <p className="text-sm text-gray-500 mb-5">
              A 10% discount is available for eligible veterans and active-duty service members.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={!!answers.veteran}
                onChange={(e) => update({ veteran: e.target.checked })}
                className="h-4 w-4 accent-brand-accent"
              />
              <span className="text-sm text-gray-800">
                I am a veteran or active-duty service member
              </span>
            </label>
          </fieldset>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <fieldset>
            <legend className="font-heading text-2xl font-extrabold uppercase text-brand mb-1">
              Your contact information
            </legend>
            <p className="text-sm text-gray-500 mb-5">
              We&apos;ll email your quote here. If we need more information, we&apos;ll follow up by email.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelCls}>
                  First name
                </label>
                <input
                  id="firstName"
                  value={answers.firstName ?? ""}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.firstName} />
              </div>
              <div>
                <label htmlFor="lastName" className={labelCls}>
                  Last name
                </label>
                <input
                  id="lastName"
                  value={answers.lastName ?? ""}
                  onChange={(e) => update({ lastName: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.lastName} />
              </div>
              <div>
                <label htmlFor="email" className={labelCls}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={answers.email ?? ""}
                  onChange={(e) => update({ email: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.email} />
              </div>
              <div>
                <label htmlFor="phone" className={labelCls}>
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={answers.phone ?? ""}
                  onChange={(e) => update({ phone: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.phone} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="streetAddress" className={labelCls}>
                Street address
              </label>
              <input
                id="streetAddress"
                value={answers.streetAddress ?? ""}
                onChange={(e) => update({ streetAddress: e.target.value })}
                className={inputCls}
              />
              <FieldError msg={errors.streetAddress} />
            </div>
            <div className="mt-4">
              <label htmlFor="addressLine2" className={labelCls}>
                Address line 2 (optional)
              </label>
              <input
                id="addressLine2"
                value={answers.addressLine2 ?? ""}
                onChange={(e) => update({ addressLine2: e.target.value })}
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="city" className={labelCls}>
                  City
                </label>
                <input
                  id="city"
                  value={answers.city ?? ""}
                  onChange={(e) => update({ city: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.city} />
              </div>
              <div>
                <label htmlFor="state" className={labelCls}>
                  State
                </label>
                <input
                  id="state"
                  value={answers.state ?? "MI"}
                  onChange={(e) => update({ state: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.state} />
              </div>
              <div>
                <label htmlFor="zip" className={labelCls}>
                  ZIP
                </label>
                <input
                  id="zip"
                  inputMode="numeric"
                  maxLength={5}
                  value={answers.zip ?? answers.zipCode ?? ""}
                  onChange={(e) =>
                    update({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) })
                  }
                  className={inputCls}
                />
                <FieldError msg={errors.zip} />
              </div>
            </div>

            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input
                type="checkbox"
                checked={answers.installSameAsContact !== false}
                onChange={(e) => update({ installSameAsContact: e.target.checked })}
                className="h-4 w-4 accent-brand-accent"
              />
              <span className="text-sm text-gray-800">
                The install address is the same as my contact address
              </span>
            </label>

            {answers.installSameAsContact === false && (
              <div className="mt-4">
                <label htmlFor="installAddress" className={labelCls}>
                  Install address
                </label>
                <input
                  id="installAddress"
                  value={answers.installAddress ?? ""}
                  onChange={(e) => update({ installAddress: e.target.value })}
                  className={inputCls}
                />
                <FieldError msg={errors.installAddress} />
              </div>
            )}

            <div className="mt-4">
              <label htmlFor="referral" className={labelCls}>
                How did you hear about us? (optional)
              </label>
              <select
                id="referral"
                value={answers.referralSource ?? ""}
                onChange={(e) => update({ referralSource: e.target.value })}
                className={inputCls}
              >
                <option value="">Select…</option>
                {REFERRAL_OPTIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <ReviewStep
            answers={answers}
            submitError={submitError}
            submitting={submitting}
          />
        )}

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={back}
              className="font-bold py-3 px-6 rounded-lg border border-brand text-brand hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={next}
              className="font-bold py-3 px-8 rounded-lg bg-brand-accent text-white hover:opacity-90"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitClick}
              disabled={submitting}
              className="font-bold py-3 px-8 rounded-lg bg-brand-accent text-white hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Email Me This Quote Now"}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

// ── Review step (Step 6) ─────────────────────────────────────
function ReviewStep({
  answers,
  submitError,
  submitting,
}: {
  answers: Answers;
  submitError: string | null;
  submitting: boolean;
}) {
  const quote = calculateQuote(answers as QuizAnswers);

  return (
    <div>
      <h2 className="font-heading text-2xl font-extrabold uppercase text-brand mb-1">
        Review &amp; get your quote
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Here&apos;s what we have. You can go back to edit anything before we email it.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5 text-sm text-gray-700 space-y-1">
        <p>
          <strong>Household:</strong> {answers.bedrooms === 5 ? "5+" : answers.bedrooms} bedrooms,{" "}
          {answers.occupants} occupants
          {answers.mobilityNeeds === "yes" ? ", ADA access" : ""}
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {LOCATION_OPTIONS.find((l) => l.value === answers.location)?.label}
        </p>
        <p>
          <strong>Contact:</strong> {answers.firstName} {answers.lastName} · {answers.email} ·{" "}
          {answers.phone}
        </p>
        <p>
          <strong>Install:</strong>{" "}
          {answers.installSameAsContact || !answers.installAddress
            ? `${answers.streetAddress}, ${answers.city}, ${answers.state} ${answers.zip}`
            : answers.installAddress}
        </p>
      </div>

      {quote.isCustom ? (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-5">
          <p className="font-semibold text-brand mb-1">Custom quote</p>
          <p className="text-sm text-gray-700 mb-1">{quote.reason}</p>
          <p className="text-sm text-gray-500">{quote.recommendedSizeNote}</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-5 mb-5">
          <p className="text-sm text-gray-700 mb-3">
            Recommended: <strong>{quote.shelter.name}</strong> ({quote.shelter.sqFt} sq ft)
          </p>
          <table className="w-full text-sm">
            <tbody>
              {quote.lineItems.map((li, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-1.5 text-gray-700">{li.label}</td>
                  <td className="py-1.5 text-right text-gray-700">
                    {formatCurrency(li.amount)}
                  </td>
                </tr>
              ))}
              {quote.veteranDiscount > 0 && (
                <tr className="border-b border-gray-100">
                  <td className="py-1.5 text-green-700">Veteran discount (10%)</td>
                  <td className="py-1.5 text-right text-green-700">
                    −{formatCurrency(quote.veteranDiscount)}
                  </td>
                </tr>
              )}
              <tr>
                <td className="py-2 font-bold text-brand">Estimated total</td>
                <td className="py-2 text-right font-bold text-brand">
                  {formatCurrency(quote.total)}
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      )}

      {quote.siteNotes.length > 0 && (
        <ul className="list-disc pl-5 text-sm text-amber-800 bg-amber-50 border border-brand-accent rounded-lg p-4 mb-5 space-y-1">
          {quote.siteNotes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      )}

      {submitError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          {submitError}
        </p>
      )}

      <p className="text-xs text-gray-500 leading-relaxed">
        This quote is based on the information you provided and assumes standard installation
        conditions. If photos or measurements are needed to confirm a custom scope, we’ll request
        them by email. Quote valid for 30 days from issue. Our design and installation process uses applicable FEMA safe-room guidance as a
        reference. FEMA does not certify or endorse individual contractors or products.
      </p>

      {submitting && <p className="sr-only">Sending your quote…</p>}
    </div>
  );
}
