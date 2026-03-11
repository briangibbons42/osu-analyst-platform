import Link from "next/link";
import CompanyPicker from "@/components/CompanyPicker";

export default function AnalystIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Analyst Mode
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Full Analyst Toolkit
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-body-text">
        Analyst Mode gives you full access to all tools without step-by-step
        guidance. Same best-practice spine — thesis first, framing columns,
        model-to-consensus comparison — but you move at your own pace.
        &quot;Why?&quot; links and explainer videos are always one click away.
      </p>

      <CompanyPicker />

      <div className="mt-6 text-center text-sm text-body-text">
        New to equity research?{" "}
        <Link
          href="/teach"
          className="font-semibold text-beaver-orange hover:underline"
        >
          Switch to Teach Mode &rarr;
        </Link>
      </div>
    </div>
  );
}
