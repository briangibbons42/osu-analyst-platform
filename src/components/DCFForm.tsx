"use client";

import { useState, useMemo } from "react";
import type { DCFInputs, DCFOutput, FramingValue } from "@/lib/types";
import FramingRow from "./FramingRow";

interface DCFFormProps {
  initialInputs?: Partial<DCFInputs>;
  showTeachNotes?: boolean;
}

const DEFAULT_INPUTS: DCFInputs = {
  revenueGrowthRates: {
    "Year 1": 15,
    "Year 2": 12,
    "Year 3": 10,
    "Year 4": 8,
    "Year 5": 6,
  },
  ebitdaMargins: {
    "Year 1": 30,
    "Year 2": 32,
    "Year 3": 33,
    "Year 4": 34,
    "Year 5": 34,
  },
  capexPercent: 8,
  nwcChange: 2,
  taxRate: 21,
  wacc: 10,
  terminalGrowth: 3,
  sharesOutstanding: 1000,
  netDebt: 5000,
};

export default function DCFForm({
  initialInputs,
  showTeachNotes = false,
}: DCFFormProps) {
  const [inputs, setInputs] = useState<DCFInputs>({
    ...DEFAULT_INPUTS,
    ...initialInputs,
  });

  const [waccFraming, setWaccFraming] = useState<FramingValue>({
    label: "WACC",
    yourAssumption: inputs.wacc,
    management: null,
    consensus: 10,
    unit: "%",
  });

  const [terminalFraming, setTerminalFraming] = useState<FramingValue>({
    label: "Terminal Growth Rate",
    yourAssumption: inputs.terminalGrowth,
    management: null,
    consensus: 2.5,
    unit: "%",
  });

  const output: DCFOutput = useMemo(() => {
    const baseRevenue = 25000;
    const years = ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"];
    const projectedFCF: Record<string, number> = {};
    let rev = baseRevenue;

    for (const yr of years) {
      const growth = (inputs.revenueGrowthRates[yr] ?? 10) / 100;
      rev = rev * (1 + growth);
      const ebitda = rev * ((inputs.ebitdaMargins[yr] ?? 30) / 100);
      const tax = ebitda * (inputs.taxRate / 100);
      const capex = rev * (inputs.capexPercent / 100);
      const nwc = rev * (inputs.nwcChange / 100);
      projectedFCF[yr] = ebitda - tax - capex - nwc;
    }

    const lastFCF = projectedFCF["Year 5"] ?? 0;
    const tg = inputs.terminalGrowth / 100;
    const w = inputs.wacc / 100;
    const terminalValue = w > tg ? (lastFCF * (1 + tg)) / (w - tg) : 0;

    let pvFCF = 0;
    years.forEach((yr, i) => {
      pvFCF += (projectedFCF[yr] ?? 0) / Math.pow(1 + w, i + 1);
    });
    const pvTV = terminalValue / Math.pow(1 + w, 5);

    const enterpriseValue = pvFCF + pvTV;
    const equityValue = enterpriseValue - inputs.netDebt;
    const impliedSharePrice =
      inputs.sharesOutstanding > 0 ? equityValue / inputs.sharesOutstanding : 0;

    return {
      projectedFCF,
      terminalValue,
      enterpriseValue,
      equityValue,
      impliedSharePrice,
      impliedUpside: 0,
    };
  }, [inputs]);

  function updateInput<K extends keyof DCFInputs>(key: K, value: DCFInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="space-y-8">
      {showTeachNotes && (
        <div className="rounded-lg border-l-4 border-beaver-orange bg-beaver-orange/5 p-4">
          <h4 className="mb-1 text-sm font-bold text-beaver-orange">
            What is a DCF?
          </h4>
          <p className="text-sm leading-relaxed text-body-text">
            A Discounted Cash Flow (DCF) model values a company by projecting its
            future free cash flows and discounting them back to present value.
            The key inputs are growth rates, margins, WACC (your discount rate),
            and terminal growth. Each input should tie back to your thesis.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-paddletail-black">
          Key Assumptions
        </h3>
        <FramingRow
          value={waccFraming}
          onChange={(v) => {
            setWaccFraming(v);
            if (v.yourAssumption != null) updateInput("wacc", v.yourAssumption);
          }}
          showTeachNotes={showTeachNotes}
        />
        <FramingRow
          value={terminalFraming}
          onChange={(v) => {
            setTerminalFraming(v);
            if (v.yourAssumption != null)
              updateInput("terminalGrowth", v.yourAssumption);
          }}
          showTeachNotes={showTeachNotes}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
            Tax Rate (%)
          </label>
          <input
            type="number"
            value={inputs.taxRate}
            onChange={(e) => updateInput("taxRate", parseFloat(e.target.value) || 0)}
            className="w-full rounded-md border border-light-gray px-3 py-2 text-sm focus:border-beaver-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
            CapEx (% of Rev)
          </label>
          <input
            type="number"
            value={inputs.capexPercent}
            onChange={(e) =>
              updateInput("capexPercent", parseFloat(e.target.value) || 0)
            }
            className="w-full rounded-md border border-light-gray px-3 py-2 text-sm focus:border-beaver-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
            NWC Change (% of Rev)
          </label>
          <input
            type="number"
            value={inputs.nwcChange}
            onChange={(e) =>
              updateInput("nwcChange", parseFloat(e.target.value) || 0)
            }
            className="w-full rounded-md border border-light-gray px-3 py-2 text-sm focus:border-beaver-orange focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
            Shares Outstanding (M)
          </label>
          <input
            type="number"
            value={inputs.sharesOutstanding}
            onChange={(e) =>
              updateInput("sharesOutstanding", parseFloat(e.target.value) || 0)
            }
            className="w-full rounded-md border border-light-gray px-3 py-2 text-sm focus:border-beaver-orange focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold uppercase tracking-widest text-body-text">
            Net Debt ($M)
          </label>
          <input
            type="number"
            value={inputs.netDebt}
            onChange={(e) =>
              updateInput("netDebt", parseFloat(e.target.value) || 0)
            }
            className="w-full rounded-md border border-light-gray px-3 py-2 text-sm focus:border-beaver-orange focus:outline-none"
          />
        </div>
      </div>

      <div className="rounded-xl border-2 border-beaver-orange bg-beaver-orange/5 p-6">
        <h3 className="mb-4 text-lg font-bold text-beaver-orange">
          DCF Output
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OutputCard
            label="Enterprise Value"
            value={`$${(output.enterpriseValue / 1000).toFixed(1)}B`}
          />
          <OutputCard
            label="Equity Value"
            value={`$${(output.equityValue / 1000).toFixed(1)}B`}
          />
          <OutputCard
            label="Terminal Value"
            value={`$${(output.terminalValue / 1000).toFixed(1)}B`}
          />
          <OutputCard
            label="Implied Share Price"
            value={`$${output.impliedSharePrice.toFixed(2)}`}
            highlight
          />
        </div>

        {showTeachNotes && (
          <p className="mt-4 text-xs leading-relaxed text-body-text">
            <strong>Remember:</strong> The implied share price is an output of
            your assumptions, not a prediction. Change an input above and watch
            how the output moves. This helps you understand which assumptions
            drive the most value — those are the ones to stress-test.
          </p>
        )}
      </div>
    </div>
  );
}

function OutputCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 ${
        highlight ? "bg-beaver-orange text-white" : "bg-white"
      }`}
    >
      <span
        className={`block text-xs font-bold uppercase tracking-widest ${
          highlight ? "text-white/80" : "text-body-text"
        }`}
      >
        {label}
      </span>
      <span
        className={`mt-1 block text-2xl font-extrabold ${
          highlight ? "text-white" : "text-paddletail-black"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
