"use client";

import { use } from "react";
import Link from "next/link";
import DCFForm from "@/components/DCFForm";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";

export default function AnalystDCFPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Analyst Mode &middot; {t}
          </span>
          <h1 className="text-3xl font-extrabold text-paddletail-black">DCF</h1>
        </div>
        <VideoHelp video={EXPLAINER_VIDEOS["dcf"]} variant="button" />
      </div>

      <DCFForm />

      <div className="mt-8 flex gap-4">
        <Link
          href={`/analyst/${t}/three-statement`}
          className="rounded-md border-2 border-light-gray px-6 py-3 text-sm font-bold text-body-text hover:border-gray-400"
        >
          &larr; 3-Statement
        </Link>
        <Link
          href={`/analyst/${t}/compare`}
          className="rounded-md bg-beaver-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-hover"
        >
          Compare to Consensus &rarr;
        </Link>
      </div>
    </div>
  );
}
