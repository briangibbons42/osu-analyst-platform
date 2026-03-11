import CompanyPicker from "@/components/CompanyPicker";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Step 1
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Research a Company
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-body-text">
        Enter a ticker symbol to validate that SEC filing data is available.
        We&apos;ll check EDGAR for recent 10-K and 10-Q filings and show you
        what&apos;s available before you start building.
      </p>

      <CompanyPicker />

      <div className="mt-12">
        <VideoHelp video={EXPLAINER_VIDEOS["company-validation"]} />
      </div>
    </div>
  );
}
