"use client";

import { use, useState } from "react";
import Link from "next/link";
import TeachStep from "@/components/TeachStep";
import ModelGrid from "@/components/ModelGrid";
import FramingRow from "@/components/FramingRow";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { FramingValue } from "@/lib/types";

const HISTORICAL_PERIODS = ["FY2022", "FY2023", "FY2024"];
const PROJECTION_PERIODS = ["FY2025E", "FY2026E", "FY2027E"];
const ALL_PERIODS = [...HISTORICAL_PERIODS, ...PROJECTION_PERIODS];

const INITIAL_IS_ROWS = [
  { label: "Revenue", isHeader: false, values: buildValues(30000, 25000, 28000) },
  { label: "Cost of Revenue", isHeader: false, values: buildValues(-18000, -17000, -16800) },
  { label: "Gross Profit", isHeader: true, values: buildValues(12000, 8000, 11200) },
  { label: "R&D Expense", isHeader: false, values: buildValues(-3200, -3100, -3400) },
  { label: "SG&A Expense", isHeader: false, values: buildValues(-1200, -1100, -1300) },
  { label: "Operating Income", isHeader: true, values: buildValues(7600, 3800, 6500) },
  { label: "Interest Expense", isHeader: false, values: buildValues(-400, -450, -380) },
  { label: "Pre-Tax Income", isHeader: true, values: buildValues(7200, 3350, 6120) },
  { label: "Tax Expense", isHeader: false, values: buildValues(-1512, -704, -1285) },
  { label: "Net Income", isHeader: true, values: buildValues(5688, 2646, 4835) },
];

function buildValues(
  fy22: number,
  fy23: number,
  fy24: number
): Record<string, number | null> {
  return {
    FY2022: fy22,
    FY2023: fy23,
    FY2024: fy24,
    "FY2025E": null,
    "FY2026E": null,
    "FY2027E": null,
  };
}

export default function TeachThreeStatementPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();
  const [currentStep, setCurrentStep] = useState(0);
  const [rows, setRows] = useState(INITIAL_IS_ROWS);

  const [revenueFraming, setRevenueFraming] = useState<FramingValue>({
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

  function handleCellChange(rowIndex: number, col: string, value: number | null) {
    setRows((prev) => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        values: { ...updated[rowIndex].values, [col]: value },
      };
      return updated;
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Teach Mode &middot; Step 2 &middot; {t}
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Build the 3-Statement Model
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-body-text">
        Map data from SEC filings to the Income Statement, Balance Sheet, and
        Cash Flow Statement. Historical data is pre-loaded from EDGAR;{" "}
        <strong>projected periods are your assumptions</strong>.
      </p>

      <div className="mb-8">
        <VideoHelp video={EXPLAINER_VIDEOS["three-statement-model"]} />
      </div>

      <div className="mb-10 space-y-4">
        <TeachStep
          stepNumber={1}
          title="Review Historical Data"
          description="Look at the historical financials (FY2022–FY2024). These come from SEC filings. Understand the trends before projecting."
          hint="Notice how Revenue and Gross Profit move together. What's the historical gross margin trend?"
          completed={currentStep > 0}
          active={currentStep === 0}
        >
          <button
            onClick={() => setCurrentStep(1)}
            className="mt-4 rounded-md bg-beaver-orange px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-hover"
          >
            I&apos;ve reviewed the historicals &rarr;
          </button>
        </TeachStep>

        <TeachStep
          stepNumber={2}
          title="Frame Key Drivers vs Consensus & Management"
          description="Before projecting, enter your assumptions for key drivers and compare them to management guidance and Street consensus."
          hint="Revenue growth and gross margin are the two most important drivers. How does your view differ from the Street?"
          video={EXPLAINER_VIDEOS["segments-guidance"]}
          completed={currentStep > 1}
          active={currentStep === 1}
        >
          <div className="space-y-4">
            <FramingRow
              value={revenueFraming}
              onChange={setRevenueFraming}
              showTeachNotes
            />
            <FramingRow
              value={marginFraming}
              onChange={setMarginFraming}
              showTeachNotes
            />
            <button
              onClick={() => setCurrentStep(2)}
              className="mt-2 rounded-md bg-beaver-orange px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-hover"
            >
              Continue to projections &rarr;
            </button>
          </div>
        </TeachStep>

        <TeachStep
          stepNumber={3}
          title="Project Future Periods"
          description="Fill in the projected columns (FY2025E–FY2027E). Your assumptions from Step 2 should drive these numbers."
          hint="Start with Revenue using your growth assumption, then work down the income statement. Each line should tie to your thesis."
          completed={currentStep > 2}
          active={currentStep === 2}
        >
          <button
            onClick={() => setCurrentStep(3)}
            className="mt-4 rounded-md bg-beaver-orange px-6 py-2.5 text-sm font-bold text-white hover:bg-orange-hover"
          >
            I&apos;ve filled in projections &rarr;
          </button>
        </TeachStep>
      </div>

      <ModelGrid
        title="Income Statement ($M)"
        headers={ALL_PERIODS}
        rows={rows}
        editableColumns={PROJECTION_PERIODS}
        onCellChange={handleCellChange}
        showTeachNotes={currentStep <= 2}
        teachNote="Historical data (FY2022–FY2024) comes from SEC filings. Projected periods (FY2025E–FY2027E) are where your assumptions go. Each editable cell should tie back to your thesis and the framing above."
      />

      {currentStep >= 3 && (
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm font-semibold text-green-600">
            ✓ Income Statement complete. Next: construct your DCF.
          </p>
          <Link
            href={`/teach/${t}/dcf`}
            className="inline-block rounded-md bg-beaver-orange px-8 py-3 text-sm font-bold text-white hover:bg-orange-hover"
          >
            Continue to DCF &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
