"use client";

import { useState } from "react";
import type { Thesis } from "@/lib/types";

interface ThesisPanelProps {
  ticker: string;
  onSave: (thesis: Thesis) => void;
  initialThesis?: Thesis;
  showTeachNotes?: boolean;
}

export default function ThesisPanel({
  ticker,
  onSave,
  initialThesis,
  showTeachNotes = false,
}: ThesisPanelProps) {
  const [thesis, setThesis] = useState<Thesis>(
    initialThesis ?? {
      ticker: ticker.toUpperCase(),
      catalyst: "",
      view: "base",
      keyAssumptions: ["", "", ""],
      relativeToConsensus: "",
      summary: "",
    }
  );

  function updateAssumption(index: number, value: string) {
    const updated = [...thesis.keyAssumptions];
    updated[index] = value;
    setThesis({ ...thesis, keyAssumptions: updated });
  }

  function addAssumption() {
    if (thesis.keyAssumptions.length < 6) {
      setThesis({
        ...thesis,
        keyAssumptions: [...thesis.keyAssumptions, ""],
      });
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(thesis);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showTeachNotes && (
        <div className="rounded-lg border-l-4 border-beaver-orange bg-beaver-orange/5 p-4">
          <h4 className="mb-1 text-sm font-bold text-beaver-orange">
            Why start with a thesis?
          </h4>
          <p className="text-sm leading-relaxed text-body-text">
            Strong equity research starts with a thesis — a clear view on why
            the stock is mispriced. Your thesis drives which assumptions matter
            most and what to stress-test in the model. Think about: What is the
            market missing? What catalyst could change the narrative?
          </p>
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
          Investment Catalyst
        </label>
        {showTeachNotes && (
          <p className="mb-2 text-xs text-gray-500">
            What event, trend, or insight could cause the stock to re-rate?
            (e.g., &quot;AI-driven DRAM demand inflection in CY25&quot;)
          </p>
        )}
        <textarea
          value={thesis.catalyst}
          onChange={(e) => setThesis({ ...thesis, catalyst: e.target.value })}
          rows={2}
          className="w-full rounded-md border border-light-gray bg-white px-4 py-3 text-sm text-paddletail-black placeholder:text-gray-400 focus:border-beaver-orange focus:outline-none focus:ring-2 focus:ring-beaver-orange/30"
          placeholder="Describe the key catalyst for your thesis..."
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
          Your View
        </label>
        {showTeachNotes && (
          <p className="mb-2 text-xs text-gray-500">
            Are you more positive, neutral, or more negative than the market?
          </p>
        )}
        <div className="flex gap-3">
          {(["bull", "base", "bear"] as const).map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setThesis({ ...thesis, view })}
              className={`flex-1 rounded-md border-2 px-4 py-3 text-sm font-bold capitalize transition-colors ${
                thesis.view === view
                  ? view === "bull"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : view === "bear"
                      ? "border-red-600 bg-red-50 text-red-700"
                      : "border-beaver-orange bg-beaver-orange/10 text-beaver-orange"
                  : "border-light-gray text-body-text hover:border-gray-400"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
          Key Assumptions (2–4)
        </label>
        {showTeachNotes && (
          <p className="mb-2 text-xs text-gray-500">
            What are the 2–4 assumptions that will drive your model? These
            become the line items you&apos;ll stress-test. (e.g., &quot;Revenue growth
            20%+ driven by HBM3e ramp&quot;)
          </p>
        )}
        <div className="space-y-2">
          {thesis.keyAssumptions.map((a, i) => (
            <input
              key={i}
              type="text"
              value={a}
              onChange={(e) => updateAssumption(i, e.target.value)}
              placeholder={`Assumption ${i + 1}`}
              className="w-full rounded-md border border-light-gray bg-white px-4 py-2.5 text-sm text-paddletail-black placeholder:text-gray-400 focus:border-beaver-orange focus:outline-none focus:ring-2 focus:ring-beaver-orange/30"
            />
          ))}
        </div>
        {thesis.keyAssumptions.length < 6 && (
          <button
            type="button"
            onClick={addAssumption}
            className="mt-2 text-xs font-semibold text-beaver-orange hover:underline"
          >
            + Add another assumption
          </button>
        )}
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
          Relative to Consensus
        </label>
        {showTeachNotes && (
          <p className="mb-2 text-xs text-gray-500">
            How does your view differ from the Street? This helps you frame your
            pitch later. (e.g., &quot;Above consensus on margins due to mix shift to
            high-value HBM&quot;)
          </p>
        )}
        <textarea
          value={thesis.relativeToConsensus}
          onChange={(e) =>
            setThesis({ ...thesis, relativeToConsensus: e.target.value })
          }
          rows={2}
          className="w-full rounded-md border border-light-gray bg-white px-4 py-3 text-sm text-paddletail-black placeholder:text-gray-400 focus:border-beaver-orange focus:outline-none focus:ring-2 focus:ring-beaver-orange/30"
          placeholder="How does your view differ from consensus?"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
          Thesis Summary
        </label>
        <textarea
          value={thesis.summary}
          onChange={(e) => setThesis({ ...thesis, summary: e.target.value })}
          rows={3}
          className="w-full rounded-md border border-light-gray bg-white px-4 py-3 text-sm text-paddletail-black placeholder:text-gray-400 focus:border-beaver-orange focus:outline-none focus:ring-2 focus:ring-beaver-orange/30"
          placeholder="1–2 sentence summary of your investment thesis..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-beaver-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-hover"
      >
        Save Thesis &amp; Continue to Model
      </button>
    </form>
  );
}
