"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import ModelGrid from "@/components/ModelGrid";
import FramingRow from "@/components/FramingRow";
import VideoHelp from "@/components/VideoHelp";
import FinancialLoader from "@/components/FinancialLoader";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { FramingValue } from "@/lib/types";
import type { HistoricalFinancials, StatementRow } from "@/lib/xbrl-parser";

export default function AnalystThreeStatementPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Analyst Mode &middot; {t}
          </span>
          <h1 className="text-3xl font-extrabold text-paddletail-black">
            3-Statement Model
          </h1>
        </div>
        <VideoHelp
          video={EXPLAINER_VIDEOS["three-statement-model"]}
          variant="button"
        />
      </div>

      <FinancialLoader ticker={t}>
        {(data) => <ModelContent data={data} ticker={t} />}
      </FinancialLoader>
    </div>
  );
}

function ModelContent({ data, ticker }: { data: HistoricalFinancials; ticker: string }) {
  const historical = data.periods.filter((p) => !p.endsWith("E"));
  const projected = data.periods.filter((p) => p.endsWith("E"));
  const allPeriods = [...historical, ...projected];

  const [isRows, setIsRows] = useState(data.incomeStatement);
  const [bsRows, setBsRows] = useState(data.balanceSheet);
  const [cfRows, setCfRows] = useState(data.cashFlow);

  const [revFraming, setRevFraming] = useState<FramingValue>({
    label: "Revenue Growth (%)",
    yourAssumption: null,
    management: null,
    consensus: null,
    unit: "%",
  });

  const [marginFraming, setMarginFraming] = useState<FramingValue>({
    label: "Gross Margin (%)",
    yourAssumption: null,
    management: null,
    consensus: null,
    unit: "%",
  });

  const [opexFraming, setOpexFraming] = useState<FramingValue>({
    label: "OpEx Growth (%)",
    yourAssumption: null,
    management: null,
    consensus: null,
    unit: "%",
  });

  const makeHandler = useCallback(
    (setter: React.Dispatch<React.SetStateAction<StatementRow[]>>) => {
      return (rowIndex: number, col: string, value: number | null) => {
        setter((prev) => {
          const updated = [...prev];
          updated[rowIndex] = {
            ...updated[rowIndex],
            values: { ...updated[rowIndex].values, [col]: value },
          };
          return updated;
        });
      };
    },
    []
  );

  return (
    <>
      <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-sm text-green-800">
          <strong>Live EDGAR data loaded</strong> for {data.companyName} ({data.ticker}).
          Historical periods ({historical.join(", ")}) are from SEC filings.
          Projected periods are editable — enter your assumptions.
        </p>
        {data.incomeStatement.find((r) => r.xbrlTag) && (
          <p className="mt-1 text-xs text-green-700">
            Source: SEC XBRL Company Facts API &middot; CIK {data.cik}
          </p>
        )}
      </div>

      {/* Framing */}
      <div className="mb-8 space-y-3">
        <h2 className="text-lg font-bold text-paddletail-black">
          Key Drivers — Your View vs Management vs Consensus
        </h2>
        <p className="text-xs text-body-text">
          Enter management guidance and consensus estimates below. Your
          assumptions in the projected columns should reflect your thesis.
        </p>
        <div className="grid gap-3 lg:grid-cols-3">
          <FramingRow value={revFraming} onChange={setRevFraming} />
          <FramingRow value={marginFraming} onChange={setMarginFraming} />
          <FramingRow value={opexFraming} onChange={setOpexFraming} />
        </div>
      </div>

      {/* Model grids */}
      <div className="space-y-10">
        {isRows.length > 0 && (
          <ModelGrid
            title="Income Statement ($M)"
            headers={allPeriods}
            rows={isRows}
            editableColumns={projected}
            onCellChange={makeHandler(setIsRows)}
          />
        )}
        {bsRows.length > 0 && (
          <ModelGrid
            title="Balance Sheet ($M)"
            headers={allPeriods}
            rows={bsRows}
            editableColumns={projected}
            onCellChange={makeHandler(setBsRows)}
          />
        )}
        {cfRows.length > 0 && (
          <ModelGrid
            title="Cash Flow Statement ($M)"
            headers={allPeriods}
            rows={cfRows}
            editableColumns={projected}
            onCellChange={makeHandler(setCfRows)}
          />
        )}
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href={`/analyst/${ticker}`}
          className="rounded-md border-2 border-light-gray px-6 py-3 text-sm font-bold text-body-text hover:border-gray-400"
        >
          &larr; Dashboard
        </Link>
        <Link
          href={`/analyst/${ticker}/dcf`}
          className="rounded-md bg-beaver-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-hover"
        >
          Continue to DCF &rarr;
        </Link>
      </div>
    </>
  );
}
