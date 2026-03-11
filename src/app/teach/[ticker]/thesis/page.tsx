"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import ThesisPanel from "@/components/ThesisPanel";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { Thesis } from "@/lib/types";

export default function TeachThesisPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();
  const router = useRouter();

  function handleSave(thesis: Thesis) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(`thesis-${t}`, JSON.stringify(thesis));
    }
    router.push(`/teach/${t}/three-statement`);
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Teach Mode &middot; Step 1 &middot; {t}
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Articulate Your Thesis
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-body-text">
        Before touching the model, answer: <em>What is the market missing?</em>{" "}
        Your thesis is the foundation of everything that follows. It determines
        which assumptions matter most and what to stress-test.
      </p>

      <div className="mb-8">
        <VideoHelp video={EXPLAINER_VIDEOS["thesis-framing"]} />
      </div>

      <ThesisPanel ticker={t} onSave={handleSave} showTeachNotes />
    </div>
  );
}
