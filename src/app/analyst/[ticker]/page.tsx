"use client";

import { use, useState } from "react";
import Link from "next/link";
import ThesisPanel from "@/components/ThesisPanel";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { Thesis } from "@/lib/types";

export default function AnalystDashboard({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();
  const [thesisSaved, setThesisSaved] = useState(false);

  function handleSaveThesis(thesis: Thesis) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`thesis-${t}`, JSON.stringify(thesis));
    }
    setThesisSaved(true);
  }

  const tools = [
    {
      title: "3-Statement Model",
      description:
        "Build IS/BS/CF from SEC filings. Framing columns show Your vs Management vs Consensus for key drivers.",
      href: `/analyst/${t}/three-statement`,
    },
    {
      title: "DCF",
      description:
        "Link inputs from 3-statement. Set WACC, terminal value, and growth. See implied share price.",
      href: `/analyst/${t}/dcf`,
    },
    {
      title: "Compare to Consensus",
      description:
        "Your model outputs vs consensus (and management) for revenue, EPS, FCF, and target price.",
      href: `/analyst/${t}/compare`,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Analyst Mode &middot; {t}
          </span>
          <h1 className="text-3xl font-extrabold text-paddletail-black">
            Analyst Dashboard
          </h1>
        </div>
        <VideoHelp
          video={EXPLAINER_VIDEOS["platform-overview"]}
          variant="button"
        />
      </div>

      {/* Thesis */}
      <div className="mb-8 rounded-xl border border-light-gray bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-paddletail-black">
            Investment Thesis
          </h2>
          <VideoHelp
            video={EXPLAINER_VIDEOS["thesis-framing"]}
            variant="button"
          />
        </div>
        {thesisSaved ? (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-semibold text-green-700">
              ✓ Thesis saved. Proceed to modeling tools below.
            </p>
            <button
              onClick={() => setThesisSaved(false)}
              className="mt-2 text-xs font-semibold text-beaver-orange hover:underline"
            >
              Edit thesis
            </button>
          </div>
        ) : (
          <ThesisPanel ticker={t} onSave={handleSaveThesis} />
        )}
      </div>

      {/* Tools */}
      <h2 className="mb-4 text-lg font-bold text-paddletail-black">
        Modeling Tools
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="group rounded-xl border-2 border-light-gray bg-white p-6 transition-all hover:border-beaver-orange hover:shadow-md"
          >
            <h3 className="mb-2 text-base font-bold text-paddletail-black group-hover:text-beaver-orange">
              {tool.title}
            </h3>
            <p className="text-sm text-body-text">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
