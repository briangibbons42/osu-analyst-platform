"use client";

import Link from "next/link";

interface ModeSelectorProps {
  ticker: string;
}

export default function ModeSelector({ ticker }: ModeSelectorProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Link
        href={`/teach/${ticker}`}
        className="group rounded-xl border-2 border-light-gray bg-white p-8 transition-all hover:border-beaver-orange hover:shadow-lg"
      >
        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-beaver-orange">
          Recommended for new analysts
        </span>
        <h3 className="mb-3 text-2xl font-bold text-paddletail-black group-hover:text-beaver-orange">
          Teach Mode
        </h3>
        <p className="text-sm leading-relaxed text-body-text">
          Step-by-step guidance through the equity research process. Learn how to
          build a 3-statement model, construct a DCF, articulate a thesis, and
          frame your views vs consensus and management.
        </p>
        <ul className="mt-4 space-y-1 text-xs text-body-text">
          <li>&#x2713; Guided, step-by-step flow</li>
          <li>&#x2713; &quot;Where does this come from?&quot; explanations</li>
          <li>&#x2713; Explainer videos for every concept</li>
          <li>&#x2713; Checkpoints and progress tracking</li>
        </ul>
      </Link>

      <Link
        href={`/analyst/${ticker}`}
        className="group rounded-xl border-2 border-light-gray bg-white p-8 transition-all hover:border-beaver-orange hover:shadow-lg"
      >
        <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-beaver-orange">
          For returning analysts
        </span>
        <h3 className="mb-3 text-2xl font-bold text-paddletail-black group-hover:text-beaver-orange">
          Analyst Mode
        </h3>
        <p className="text-sm leading-relaxed text-body-text">
          Full access to all tools with less hand-holding. Same best-practice
          spine — thesis first, framing vs consensus, model-to-consensus
          comparison — but you move at your own pace.
        </p>
        <ul className="mt-4 space-y-1 text-xs text-body-text">
          <li>&#x2713; All tools unlocked</li>
          <li>&#x2713; Framing columns always visible</li>
          <li>&#x2713; Tooltips and &quot;Why?&quot; links available</li>
          <li>&#x2713; Bulk import from SEC/EDGAR</li>
        </ul>
      </Link>
    </div>
  );
}
