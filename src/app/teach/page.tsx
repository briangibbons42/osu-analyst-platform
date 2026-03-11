import Link from "next/link";
import CompanyPicker from "@/components/CompanyPicker";

export default function TeachIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Teach Mode
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Learn Equity Research
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-body-text">
        Teach Mode walks you through the complete equity research process
        step-by-step. Start by choosing a company to research. You&apos;ll learn
        how to articulate a thesis, build a 3-statement model from SEC filings,
        construct a DCF, and compare your model to consensus.
      </p>

      <CompanyPicker />

      <div className="mt-12 rounded-xl border border-light-gray bg-white p-8">
        <h2 className="mb-4 text-lg font-bold text-paddletail-black">
          What you&apos;ll learn
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <LearnItem
            title="Thesis-Driven Research"
            description="Why every analysis starts with a thesis and how your assumptions shape the model."
          />
          <LearnItem
            title="3-Statement Modeling"
            description="How to map SEC filings to Income Statement, Balance Sheet, and Cash Flow."
          />
          <LearnItem
            title="DCF Construction"
            description="How WACC, terminal value, and growth assumptions produce an implied price."
          />
          <LearnItem
            title="Framing vs Consensus"
            description="How to compare your view to management and Street consensus, and defend divergences."
          />
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-body-text">
        Already know the basics?{" "}
        <Link
          href="/analyst"
          className="font-semibold text-beaver-orange hover:underline"
        >
          Switch to Analyst Mode &rarr;
        </Link>
      </div>
    </div>
  );
}

function LearnItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border-l-4 border-beaver-orange bg-page-bg p-4">
      <h3 className="text-sm font-bold text-paddletail-black">{title}</h3>
      <p className="mt-1 text-xs text-body-text">{description}</p>
    </div>
  );
}
