"use client";

import { useState } from "react";

type Answer = "yes" | "no" | null;

interface Step {
  question: string;
  disqualifyIf: "no" | "yes";
  disqualifyReason: string;
}

const STEPS: Step[] = [
  {
    question: "Is this your primary residence in Michigan?",
    disqualifyIf: "no",
    disqualifyReason:
      "The Michigan Safe Room Rebate Program is only available for primary residences located in Michigan.",
  },
  {
    question: "Is this a single-family home that you own?",
    disqualifyIf: "no",
    disqualifyReason:
      "The program is limited to owner-occupied single-family homes. Rentals, condos, and commercial properties are not eligible.",
  },
  {
    question: "Have you already installed a safe room at this property?",
    disqualifyIf: "yes",
    disqualifyReason:
      "The rebate is for new safe room installations only. Retroactive reimbursement for previously installed shelters is not available.",
  },
];

export default function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([null, null, null]);
  const [disqualified, setDisqualified] = useState(false);
  const [disqualifyReason, setDisqualifyReason] = useState("");
  const [complete, setComplete] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySubmitted, setNotifySubmitted] = useState(false);

  function handleAnswer(answer: "yes" | "no") {
    const current = STEPS[step];
    const newAnswers = [...answers];
    newAnswers[step] = answer;
    setAnswers(newAnswers);

    if (answer === current.disqualifyIf) {
      setDisqualifyReason(current.disqualifyReason);
      setDisqualified(true);
      return;
    }

    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setComplete(true);
    }
  }

  function reset() {
    setStep(0);
    setAnswers([null, null, null]);
    setDisqualified(false);
    setDisqualifyReason("");
    setComplete(false);
    setNotifyEmail("");
    setNotifySubmitted(false);
  }

  if (disqualified) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-extrabold uppercase text-gray-800 mb-2">
          May Not Qualify
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{disqualifyReason}</p>

        {!notifySubmitted ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-left mb-4">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Want to be notified if the program rules change?
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand"
              />
              <button
                onClick={() => notifyEmail && setNotifySubmitted(true)}
                className="bg-brand text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Notify Me
              </button>
            </div>
          </div>
        ) : (
          <p className="text-green-700 text-sm font-semibold bg-green-50 border border-green-200 rounded-lg py-3 px-4 mb-4">
            Got it — we&rsquo;ll reach out if eligibility rules change.
          </p>
        )}

        <button onClick={reset} className="text-sm text-brand-light underline hover:opacity-80">
          Start over
        </button>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="bg-white border border-green-200 rounded-2xl shadow-sm p-8 text-center max-w-lg mx-auto">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-extrabold uppercase text-green-700 mb-2">
          You Appear Eligible!
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          Based on your answers, you may qualify for up to <strong className="text-green-700">$7,131.75 back</strong> on a FEMA-compliant safe room.
          The next step is to apply through the state&rsquo;s portal and get a free quote from Michigan Safe Rooms.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://app.smartsheet.com/b/form/019d6e30121875f6ae8b02a5d30b3a4b"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Apply Now (State Portal)
          </a>
          <a
            href="#grant-lead-form"
            className="bg-brand-accent text-white px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity"
          >
            Get a Free Quote
          </a>
        </div>
        <button onClick={reset} className="mt-4 text-xs text-gray-400 underline hover:opacity-80">
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-6">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-brand-accent" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-2">
        Step {step + 1} of {STEPS.length}
      </p>
      <h3 className="font-heading text-xl font-bold text-brand mb-6 leading-snug">
        {STEPS[step].question}
      </h3>

      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer("yes")}
          className="flex-1 border-2 border-green-500 text-green-700 bg-green-50 hover:bg-green-100 font-bold py-4 rounded-xl transition-colors text-lg"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer("no")}
          className="flex-1 border-2 border-gray-300 text-gray-600 bg-gray-50 hover:bg-gray-100 font-bold py-4 rounded-xl transition-colors text-lg"
        >
          No
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-5">
        Results are informational only — final eligibility is determined by the state.
      </p>
    </div>
  );
}
