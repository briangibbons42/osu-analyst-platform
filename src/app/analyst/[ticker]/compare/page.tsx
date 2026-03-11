"use client";

import { use, useState } from "react";
import Link from "next/link";
import CompareConsensus from "@/components/CompareConsensus";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { ConsensusComparison } from "@/lib/types";

const INITIAL_COMPARISONS: ConsensusComparison[] = [
  {
    metric: "Revenue (FY2025E)",
    yourEstimate: null,
    consensus: 30.5,
    management: 31.0,
    difference: null,
    differencePercent: null,
    unit: "$B",
  },
  {
    metric: "Gross Margin (FY2025E)",
    yourEstimate: null,
    consensus: 39.5,
    management: 41.0,
    difference: null,
    differencePercent: null,
    unit: "%",
  },
  {
    metric: "EPS (FY2025E)",
    yourEstimate: null,
    consensus: 7.8,
    management: null,
    difference: null,
    differencePercent: null,
    unit: "$",
  },
  {
    metric: "Free Cash Flow (FY2025E)",
    yourEstimate: null,
    consensus: 7500,
    management: null,
    difference: null,
    differencePercent: null,
    unit: "$M",
  },
  {
    metric: "Target Price",
    yourEstimate: null,
    consensus: 110.0,
    management: null,
    difference: null,
    differencePercent: null,
    unit: "$",
  },
];

export default function AnalystComparePage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();
  const [comparisons, setComparisons] = useState(INITIAL_COMPARISONS);

  function updateEstimate(index: number, value: number | null) {
    setComparisons((prev) => {
      const updated = [...prev];
      const row = { ...updated[index] };
      row.yourEstimate = value;
      if (value != null && row.consensus != null) {
        row.difference = value - row.consensus;
        row.differencePercent =
          row.consensus !== 0
            ? ((value - row.consensus) / Math.abs(row.consensus)) * 100
            : null;
      } else {
        row.difference = null;
        row.differencePercent = null;
      }
      updated[index] = row;
      return updated;
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Analyst Mode &middot; {t}
          </span>
          <h1 className="text-3xl font-extrabold text-paddletail-black">
            Compare to Consensus
          </h1>
        </div>
        <VideoHelp
          video={EXPLAINER_VIDEOS["compare-consensus"]}
          variant="button"
        />
      </div>

      <p className="mb-6 text-sm text-body-text">
        Enter your model outputs in the &quot;Your Estimate&quot; column below. Consensus
        and management values are pre-populated — edit them if you have updated
        numbers.
      </p>

      {/* Editable comparison form */}
      <div className="mb-8 space-y-3">
        {comparisons.map((row, i) => (
          <div
            key={row.metric}
            className="flex items-center gap-4 rounded-lg border border-light-gray bg-white p-4"
          >
            <span className="w-48 text-sm font-semibold text-paddletail-black">
              {row.metric}
            </span>
            <div className="flex-1 grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-beaver-orange">
                  Your Estimate
                </label>
                <input
                  type="number"
                  step="any"
                  value={row.yourEstimate ?? ""}
                  onChange={(e) =>
                    updateEstimate(
                      i,
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  className="w-full rounded-md border-2 border-beaver-orange/30 bg-beaver-orange/5 px-3 py-2 text-sm font-semibold focus:border-beaver-orange focus:outline-none"
                  placeholder="—"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Consensus
                </label>
                <span className="block px-3 py-2 text-sm text-body-text">
                  {row.consensus != null ? row.consensus : "—"}
                </span>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-500">
                  Management
                </label>
                <span className="block px-3 py-2 text-sm text-body-text">
                  {row.management != null ? row.management : "—"}
                </span>
              </div>
            </div>
            <div className="w-24 text-right">
              {row.differencePercent != null ? (
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                    row.differencePercent > 0
                      ? "bg-green-100 text-green-700"
                      : row.differencePercent < 0
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {row.differencePercent > 0 ? "+" : ""}
                  {row.differencePercent.toFixed(1)}%
                </span>
              ) : (
                <span className="text-xs text-gray-400">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <CompareConsensus comparisons={comparisons} />

      <div className="mt-8 flex gap-4">
        <Link
          href={`/analyst/${t}/dcf`}
          className="rounded-md border-2 border-light-gray px-6 py-3 text-sm font-bold text-body-text hover:border-gray-400"
        >
          &larr; DCF
        </Link>
        <Link
          href={`/analyst/${t}`}
          className="rounded-md bg-beaver-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-hover"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
