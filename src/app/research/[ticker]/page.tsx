"use client";

import { useEffect, useState, use } from "react";
import type { ValidationResult } from "@/lib/types";
import ModeSelector from "@/components/ModeSelector";

export default function CompanyPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/edgar?ticker=${encodeURIComponent(ticker)}`)
      .then((r) => r.json())
      .then((data) => setResult(data))
      .catch(() =>
        setResult({
          valid: false,
          company: null,
          has10K: false,
          has10Q: false,
          latestAnnual: null,
          latestQuarterly: null,
          edgarUrl: "",
          irUrl: null,
          message: "Error loading company data.",
        })
      )
      .finally(() => setLoading(false));
  }, [ticker]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-beaver-orange border-t-transparent" />
          <p className="text-sm text-body-text">
            Validating {ticker.toUpperCase()} against SEC EDGAR...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Validation result */}
      <div
        className={`mb-8 rounded-xl border-2 p-6 ${
          result?.valid
            ? "border-green-500 bg-green-50"
            : "border-red-400 bg-red-50"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${
              result?.valid ? "bg-green-500" : "bg-red-400"
            }`}
          >
            {result?.valid ? "✓" : "!"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-paddletail-black">
              {result?.company?.name ?? ticker.toUpperCase()}
            </h2>
            <p className="mt-1 text-sm text-body-text">{result?.message}</p>

            {result?.valid && result.company && (
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <InfoItem
                  label="Latest 10-K"
                  value={result.latestAnnual?.filingDate ?? "N/A"}
                />
                <InfoItem
                  label="Latest 10-Q"
                  value={result.latestQuarterly?.filingDate ?? "N/A"}
                />
                <InfoItem
                  label="SIC"
                  value={result.company.sicDescription || result.company.sic}
                />
              </div>
            )}

            {result?.edgarUrl && (
              <a
                href={result.edgarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-beaver-orange hover:underline"
              >
                View on SEC EDGAR &rarr;
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mode selection */}
      {result?.valid && (
        <>
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Step 2
          </span>
          <h2 className="mb-6 text-2xl font-extrabold text-paddletail-black">
            Choose your mode
          </h2>
          <ModeSelector ticker={ticker.toUpperCase()} />
        </>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <span className="block text-xs font-bold uppercase tracking-widest text-body-text">
        {label}
      </span>
      <span className="block text-sm font-semibold text-paddletail-black">
        {value}
      </span>
    </div>
  );
}
