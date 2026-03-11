"use client";

import { use, useState } from "react";
import Link from "next/link";
import ModelGrid from "@/components/ModelGrid";
import FramingRow from "@/components/FramingRow";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { FramingValue } from "@/lib/types";

const HISTORICAL = ["FY2022", "FY2023", "FY2024"];
const PROJECTED = ["FY2025E", "FY2026E", "FY2027E"];
const ALL = [...HISTORICAL, ...PROJECTED];

function v(
  a: number,
  b: number,
  c: number
): Record<string, number | null> {
  return {
    FY2022: a,
    FY2023: b,
    FY2024: c,
    "FY2025E": null,
    "FY2026E": null,
    "FY2027E": null,
  };
}

const IS_ROWS = [
  { label: "Revenue", isHeader: false, values: v(30000, 25000, 28000) },
  { label: "Cost of Revenue", isHeader: false, values: v(-18000, -17000, -16800) },
  { label: "Gross Profit", isHeader: true, values: v(12000, 8000, 11200) },
  { label: "R&D Expense", isHeader: false, values: v(-3200, -3100, -3400) },
  { label: "SG&A Expense", isHeader: false, values: v(-1200, -1100, -1300) },
  { label: "Operating Income", isHeader: true, values: v(7600, 3800, 6500) },
  { label: "Interest Expense", isHeader: false, values: v(-400, -450, -380) },
  { label: "Pre-Tax Income", isHeader: true, values: v(7200, 3350, 6120) },
  { label: "Tax Expense", isHeader: false, values: v(-1512, -704, -1285) },
  { label: "Net Income", isHeader: true, values: v(5688, 2646, 4835) },
];

const BS_ROWS = [
  { label: "Assets", isHeader: true, values: v(0, 0, 0) },
  { label: "Cash & Equivalents", isHeader: false, values: v(8800, 7200, 9100) },
  { label: "Accounts Receivable", isHeader: false, values: v(5200, 4100, 4800) },
  { label: "Inventory", isHeader: false, values: v(6600, 8300, 7200) },
  { label: "PP&E (net)", isHeader: false, values: v(38000, 40000, 42000) },
  { label: "Total Assets", isHeader: true, values: v(64000, 65000, 68500) },
  { label: "Liabilities", isHeader: true, values: v(0, 0, 0) },
  { label: "Accounts Payable", isHeader: false, values: v(2800, 2400, 2900) },
  { label: "Long-Term Debt", isHeader: false, values: v(12000, 13000, 11500) },
  { label: "Total Liabilities", isHeader: true, values: v(22000, 23000, 21500) },
  { label: "Shareholders' Equity", isHeader: true, values: v(42000, 42000, 47000) },
];

const CF_ROWS = [
  { label: "Operating Activities", isHeader: true, values: v(0, 0, 0) },
  { label: "Net Income", isHeader: false, values: v(5688, 2646, 4835) },
  { label: "D&A", isHeader: false, values: v(5500, 5800, 6100) },
  { label: "Changes in Working Capital", isHeader: false, values: v(-600, 1200, -400) },
  { label: "Cash from Operations", isHeader: true, values: v(10588, 9646, 10535) },
  { label: "Investing Activities", isHeader: true, values: v(0, 0, 0) },
  { label: "CapEx", isHeader: false, values: v(-8000, -8500, -9000) },
  { label: "Cash from Investing", isHeader: true, values: v(-8000, -8500, -9000) },
  { label: "Financing Activities", isHeader: true, values: v(0, 0, 0) },
  { label: "Debt Issuance / (Repayment)", isHeader: false, values: v(1000, 1000, -1500) },
  { label: "Dividends", isHeader: false, values: v(-460, -460, -480) },
  { label: "Cash from Financing", isHeader: true, values: v(540, 540, -1980) },
];

export default function AnalystThreeStatementPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();
  const [isRows, setIsRows] = useState(IS_ROWS);
  const [bsRows, setBsRows] = useState(BS_ROWS);
  const [cfRows, setCfRows] = useState(CF_ROWS);

  const [revFraming, setRevFraming] = useState<FramingValue>({
    label: "Revenue Growth (%)",
    yourAssumption: null,
    management: 15,
    consensus: 12,
    unit: "%",
  });

  const [marginFraming, setMarginFraming] = useState<FramingValue>({
    label: "Gross Margin (%)",
    yourAssumption: null,
    management: 42,
    consensus: 40,
    unit: "%",
  });

  const [opexFraming, setOpexFraming] = useState<FramingValue>({
    label: "OpEx Growth (%)",
    yourAssumption: null,
    management: 8,
    consensus: 10,
    unit: "%",
  });

  function makeHandler(
    setter: React.Dispatch<React.SetStateAction<typeof IS_ROWS>>
  ) {
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
  }

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

      {/* Framing */}
      <div className="mb-8 space-y-3">
        <h2 className="text-lg font-bold text-paddletail-black">
          Key Drivers — Your View vs Management vs Consensus
        </h2>
        <div className="grid gap-3 lg:grid-cols-3">
          <FramingRow value={revFraming} onChange={setRevFraming} />
          <FramingRow value={marginFraming} onChange={setMarginFraming} />
          <FramingRow value={opexFraming} onChange={setOpexFraming} />
        </div>
      </div>

      {/* Model grids */}
      <div className="space-y-10">
        <ModelGrid
          title="Income Statement ($M)"
          headers={ALL}
          rows={isRows}
          editableColumns={PROJECTED}
          onCellChange={makeHandler(setIsRows)}
        />
        <ModelGrid
          title="Balance Sheet ($M)"
          headers={ALL}
          rows={bsRows}
          editableColumns={PROJECTED}
          onCellChange={makeHandler(setBsRows)}
        />
        <ModelGrid
          title="Cash Flow Statement ($M)"
          headers={ALL}
          rows={cfRows}
          editableColumns={PROJECTED}
          onCellChange={makeHandler(setCfRows)}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <Link
          href={`/analyst/${t}`}
          className="rounded-md border-2 border-light-gray px-6 py-3 text-sm font-bold text-body-text hover:border-gray-400"
        >
          &larr; Dashboard
        </Link>
        <Link
          href={`/analyst/${t}/dcf`}
          className="rounded-md bg-beaver-orange px-6 py-3 text-sm font-bold text-white hover:bg-orange-hover"
        >
          Continue to DCF &rarr;
        </Link>
      </div>
    </div>
  );
}
