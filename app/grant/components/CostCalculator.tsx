"use client";

import { useState } from "react";

const MAX_REBATE = 7131.75;
const MAX_ELIGIBLE_COST = 9509; // 75% of this = $7,131.75

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export default function CostCalculator() {
  const [cost, setCost] = useState(9500);

  const rebate = cost <= MAX_ELIGIBLE_COST ? cost * 0.75 : MAX_REBATE;
  const outOfPocket = cost - rebate;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-gray-700">
            Estimated Safe Room Cost
          </label>
          <span className="font-heading text-2xl font-extrabold text-brand">{fmt(cost)}</span>
        </div>
        <input
          type="range"
          min={3000}
          max={15000}
          step={100}
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$3,000</span>
          <span>$15,000</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
          <p className="text-xs text-green-700 font-semibold uppercase tracking-wider mb-1">
            Your Estimated Rebate
          </p>
          <p className="font-heading text-3xl font-extrabold text-green-700">{fmt(rebate)}</p>
          {cost > MAX_ELIGIBLE_COST && (
            <p className="text-xs text-green-600 mt-1">Capped at program maximum</p>
          )}
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center">
          <p className="text-xs text-blue-700 font-semibold uppercase tracking-wider mb-1">
            Your Out-of-Pocket
          </p>
          <p className="font-heading text-3xl font-extrabold text-blue-800">{fmt(outOfPocket)}</p>
          {cost <= MAX_ELIGIBLE_COST && (
            <p className="text-xs text-blue-600 mt-1">25% of safe room cost</p>
          )}
        </div>
      </div>

      {cost > MAX_ELIGIBLE_COST && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-sm text-amber-800">
          <strong>Note:</strong> The state caps the rebate at {fmt(MAX_REBATE)} (75% of the predetermined BCA cost of {fmt(MAX_ELIGIBLE_COST)}).
          Any cost above that amount is your responsibility.
        </div>
      )}

      <div className="bg-brand/5 border border-brand/20 rounded-xl p-4 text-sm text-brand leading-relaxed">
        Michigan Safe Rooms installs FEMA P-320 compliant steel shelters starting at $6,999.
        {" "}<a href="#grant-lead-form" className="font-bold text-brand-light underline hover:opacity-80">
          Request a free quote
        </a>{" "}
        to lock in your price before applying.
      </div>
    </div>
  );
}
