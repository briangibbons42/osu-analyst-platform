"use client";

import { useEffect, useState } from "react";
import type { HistoricalFinancials } from "@/lib/xbrl-parser";

interface FinancialLoaderProps {
  ticker: string;
  children: (data: HistoricalFinancials) => React.ReactNode;
}

export default function FinancialLoader({ ticker, children }: FinancialLoaderProps) {
  const [data, setData] = useState<HistoricalFinancials | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/financials?ticker=${encodeURIComponent(ticker)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((d) => setData(d))
      .catch(() => setError("Could not load financial data from EDGAR. The model will use placeholder data."))
      .finally(() => setLoading(false));
  }, [ticker]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-beaver-orange border-t-transparent" />
          <p className="text-sm text-body-text">
            Loading financial data from SEC EDGAR for <strong>{ticker}</strong>...
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Fetching XBRL data from data.sec.gov
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4">
        <p className="text-sm font-semibold text-yellow-800">
          {error || "No EDGAR data available for this company."}
        </p>
        <p className="mt-1 text-xs text-yellow-700">
          You can still build a model with manually entered data.
        </p>
      </div>
    );
  }

  return <>{children(data)}</>;
}
