"use client";

import { use } from "react";
import Link from "next/link";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";

export default function TeachDashboard({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();

  const steps = [
    {
      number: 1,
      title: "Articulate Your Thesis",
      description:
        "Start with a catalyst, key assumptions, and your bull/base/bear view. Your thesis drives the model.",
      href: `/teach/${t}/thesis`,
      videoId: "thesis-framing" as const,
    },
    {
      number: 2,
      title: "Build the 3-Statement Model",
      description:
        "Map SEC filings to Income Statement, Balance Sheet, and Cash Flow. Use segment detail and guidance.",
      href: `/teach/${t}/three-statement`,
      videoId: "three-statement-model" as const,
    },
    {
      number: 3,
      title: "Construct the DCF",
      description:
        "Link your 3-statement to a DCF. Set WACC, terminal value, and growth assumptions.",
      href: `/teach/${t}/dcf`,
      videoId: "dcf" as const,
    },
    {
      number: 4,
      title: "Compare to Consensus",
      description:
        "See how your model outputs compare to consensus and management. Stress-test your thesis.",
      href: `/teach/${t}/compare`,
      videoId: "compare-consensus" as const,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Teach Mode &middot; {t}
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Equity Research Workflow
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-body-text">
        Follow these steps to build a complete equity research analysis for{" "}
        <strong>{t}</strong>. Each step includes explanations, hints, and
        explainer videos. Start with your thesis — it shapes everything that
        follows.
      </p>

      <div className="mb-10 space-y-4">
        {steps.map((step) => (
          <Link
            key={step.number}
            href={step.href}
            className="group flex items-start gap-4 rounded-xl border-2 border-light-gray bg-white p-6 transition-all hover:border-beaver-orange hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-beaver-orange text-lg font-bold text-white">
              {step.number}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-paddletail-black group-hover:text-beaver-orange">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-body-text">{step.description}</p>
            </div>
            <span className="mt-1 text-sm text-beaver-orange opacity-0 transition-opacity group-hover:opacity-100">
              Start &rarr;
            </span>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-paddletail-black">
          Explainer Videos
        </h2>
        <VideoHelp video={EXPLAINER_VIDEOS["thesis-framing"]} />
        <VideoHelp video={EXPLAINER_VIDEOS["three-statement-model"]} />
        <VideoHelp video={EXPLAINER_VIDEOS["dcf"]} />
        <VideoHelp video={EXPLAINER_VIDEOS["compare-consensus"]} />
      </div>
    </div>
  );
}
