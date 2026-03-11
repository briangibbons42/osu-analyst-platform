"use client";

import { use } from "react";
import Link from "next/link";
import CompareConsensus from "@/components/CompareConsensus";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { ConsensusComparison } from "@/lib/types";

const SAMPLE_COMPARISONS: ConsensusComparison[] = [
  {
    metric: "Revenue (FY2025E)",
    yourEstimate: 32.2,
    consensus: 30.5,
    management: 31.0,
    difference: 1.7,
    differencePercent: 5.6,
    unit: "$B",
  },
  {
    metric: "Gross Margin (FY2025E)",
    yourEstimate: 42.0,
    consensus: 39.5,
    management: 41.0,
    difference: 2.5,
    differencePercent: 6.3,
    unit: "%",
  },
  {
    metric: "EPS (FY2025E)",
    yourEstimate: 8.5,
    consensus: 7.8,
    management: null,
    difference: 0.7,
    differencePercent: 9.0,
    unit: "$",
  },
  {
    metric: "Free Cash Flow (FY2025E)",
    yourEstimate: 8200,
    consensus: 7500,
    management: null,
    difference: 700,
    differencePercent: 9.3,
    unit: "$M",
  },
  {
    metric: "Implied Share Price",
    yourEstimate: 125.0,
    consensus: 110.0,
    management: null,
    difference: 15.0,
    differencePercent: 13.6,
    unit: "$",
  },
];

export default function TeachComparePage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Teach Mode &middot; Step 4 &middot; {t}
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Compare Your Model to Consensus
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-body-text">
        This is where your research comes together. See how your model outputs
        compare to Street consensus and management targets. The goal isn&apos;t to
        match — it&apos;s to understand where and why you differ, and to articulate
        that clearly.
      </p>

      <div className="mb-8">
        <VideoHelp video={EXPLAINER_VIDEOS["compare-consensus"]} />
      </div>

      <CompareConsensus comparisons={SAMPLE_COMPARISONS} showTeachNotes />

      <div className="mt-10 rounded-xl border-2 border-green-500 bg-green-50 p-6 text-center">
        <h3 className="mb-2 text-lg font-bold text-green-700">
          ✓ Workflow Complete
        </h3>
        <p className="mb-4 text-sm text-body-text">
          You&apos;ve completed the core equity research workflow: thesis &rarr;
          3-statement &rarr; DCF &rarr; compare to consensus. In a real
          analysis, you&apos;d now refine your assumptions, build scenarios
          (bull/base/bear), and prepare your pitch.
        </p>
        <Link
          href={`/teach/${t}`}
          className="inline-block rounded-md bg-beaver-orange px-8 py-3 text-sm font-bold text-white hover:bg-orange-hover"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
