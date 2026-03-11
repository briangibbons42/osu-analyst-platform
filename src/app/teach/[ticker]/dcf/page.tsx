"use client";

import { use } from "react";
import Link from "next/link";
import DCFForm from "@/components/DCFForm";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";

export default function TeachDCFPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Teach Mode &middot; Step 3 &middot; {t}
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Construct the DCF
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-body-text">
        A Discounted Cash Flow values a company by projecting future free cash
        flows and discounting them to the present. Every input should tie back to
        your thesis. Change an assumption and watch the implied price move.
      </p>

      <div className="mb-8">
        <VideoHelp video={EXPLAINER_VIDEOS["dcf"]} />
      </div>

      <DCFForm showTeachNotes />

      <div className="mt-10 text-center">
        <Link
          href={`/teach/${t}/compare`}
          className="inline-block rounded-md bg-beaver-orange px-8 py-3 text-sm font-bold text-white hover:bg-orange-hover"
        >
          Continue to Compare vs Consensus &rarr;
        </Link>
      </div>
    </div>
  );
}
