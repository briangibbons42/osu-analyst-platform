"use client";

import { use, useState } from "react";
import Link from "next/link";
import TeachStep from "@/components/TeachStep";
import ModelGrid from "@/components/ModelGrid";
import FramingRow from "@/components/FramingRow";
import VideoHelp from "@/components/VideoHelp";
import FinancialLoader from "@/components/FinancialLoader";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";
import type { FramingValue } from "@/lib/types";
import type { HistoricalFinancials, StatementRow } from "@/lib/xbrl-parser";

export default function TeachThreeStatementPage({
  params,
}: {
  params: Promise<{ ticker: string }>;
}) {
  const { ticker } = use(params);
  const t = ticker.toUpperCase();

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
        Cash Flow Statement. Historical data is loaded live from EDGAR;{" "}
        <strong>projected periods are your assumptions</strong>.
      </p>

      <div className="mb-8">
        <VideoHelp video={EXPLAINER_VIDEOS["three-statement-model"]} />
      </div>

      <FinancialLoader ticker={t}>
        {(data) => <TeachModelContent data={data} ticker={t} />}
      </FinancialLoader>
    </div>
  );
}

function TeachModelContent({
  data,
  ticker,
}: {
  data: HistoricalFinancials;
  ticker: string;
}) {
  const historical = data.periods.filter((p) => !p.endsWith("E"));
  const projected = data.periods.filter((p) => p.endsWith("E"));
  const allPeriods = [...historical, ...projected];

  const [currentStep, setCurrentStep] = useState(0);
  const [isRows, setIsRows] = useState(data.incomeStatement);

  const [revenueFraming, setRevenueFraming] = useState<FramingValue>({
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

  function handleCellChange(
    rowIndex: number,
    col: string,
    value: number | null
  ) {
    setIsRows((prev: StatementRow[]) => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        values: { ...updated[rowIndex].values, [col]: value },
      };
      return updated;
    });
  }

  return (
    <>
      <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-3">
        <p className="text-sm text-green-800">
          <strong>Live EDGAR data loaded</strong> for {data.companyName} (
          {data.ticker}). Historical data below is real — pulled from SEC XBRL
          filings.
        </p>
        <p className="mt-1 text-xs text-green-700">
          Source: SEC XBRL Company Facts API &middot; CIK {data.cik}
        </p>
      </div>

      <div className="mb-10 space-y-4">
        <TeachStep
          stepNumber={1}
          title="Review Historical Data"
          description={`Look at the historical financials (${historical.join(", ")}). These are real numbers from ${data.companyName}'s SEC filings. Understand the trends before projecting.`}
          hint="Look at how Revenue, Gross Profit, and Net Income have changed over the past 3 years. What's the story? Is the business growing, shrinking, or cyclical?"
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
          hint="Revenue growth and gross margin are typically the two most important drivers. Enter management's guidance and consensus estimates, then your own view."
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
          description={`Fill in the projected columns (${projected.join(", ")}). Your assumptions from Step 2 should drive these numbers.`}
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
        headers={allPeriods}
        rows={isRows}
        editableColumns={projected}
        onCellChange={handleCellChange}
        showTeachNotes={currentStep <= 2}
        teachNote={`Historical data (${historical.join(", ")}) is from ${data.companyName}'s SEC filings. Projected periods (${projected.join(", ")}) are where your assumptions go. Each editable cell should tie back to your thesis and the framing above.`}
      />

      {data.balanceSheet.length > 0 && (
        <div className="mt-8">
          <ModelGrid
            title="Balance Sheet ($M)"
            headers={allPeriods}
            rows={data.balanceSheet}
            editableColumns={projected}
          />
        </div>
      )}

      {data.cashFlow.length > 0 && (
        <div className="mt-8">
          <ModelGrid
            title="Cash Flow Statement ($M)"
            headers={allPeriods}
            rows={data.cashFlow}
            editableColumns={projected}
          />
        </div>
      )}

      {currentStep >= 3 && (
        <div className="mt-8 text-center">
          <p className="mb-4 text-sm font-semibold text-green-600">
            ✓ Financial statements reviewed. Next: construct your DCF.
          </p>
          <Link
            href={`/teach/${ticker}/dcf`}
            className="inline-block rounded-md bg-beaver-orange px-8 py-3 text-sm font-bold text-white hover:bg-orange-hover"
          >
            Continue to DCF &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
