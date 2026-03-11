"use client";

import type { FramingValue } from "@/lib/types";

interface FramingRowProps {
  value: FramingValue;
  onChange: (updated: FramingValue) => void;
  showTeachNotes?: boolean;
}

export default function FramingRow({
  value,
  onChange,
  showTeachNotes = false,
}: FramingRowProps) {
  const diff =
    value.yourAssumption != null && value.consensus != null
      ? value.yourAssumption - value.consensus
      : null;

  const mgmtDiff =
    value.yourAssumption != null && value.management != null
      ? value.yourAssumption - value.management
      : null;

  return (
    <div className="rounded-lg border border-light-gray bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-bold text-paddletail-black">
          {value.label}
        </span>
        {diff !== null && (
          <span
            className={`text-xs font-bold ${
              diff > 0
                ? "text-green-600"
                : diff < 0
                  ? "text-red-600"
                  : "text-gray-500"
            }`}
          >
            {diff > 0 ? "+" : ""}
            {diff.toFixed(1)}
            {value.unit} vs consensus
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold text-beaver-orange">
            Your Assumption
          </label>
          <input
            type="number"
            step="any"
            value={value.yourAssumption ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                yourAssumption:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
            className="w-full rounded-md border-2 border-beaver-orange/30 bg-beaver-orange/5 px-3 py-2 text-sm font-semibold text-paddletail-black focus:border-beaver-orange focus:outline-none"
            placeholder="—"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-500">
            Management
          </label>
          <input
            type="number"
            step="any"
            value={value.management ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                management:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
            className="w-full rounded-md border border-light-gray bg-gray-50 px-3 py-2 text-sm text-body-text focus:border-gray-400 focus:outline-none"
            placeholder="—"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-gray-500">
            Consensus
          </label>
          <input
            type="number"
            step="any"
            value={value.consensus ?? ""}
            onChange={(e) =>
              onChange({
                ...value,
                consensus:
                  e.target.value === "" ? null : parseFloat(e.target.value),
              })
            }
            className="w-full rounded-md border border-light-gray bg-gray-50 px-3 py-2 text-sm text-body-text focus:border-gray-400 focus:outline-none"
            placeholder="—"
          />
        </div>
      </div>

      {showTeachNotes && (
        <div className="mt-3 rounded border-l-4 border-beaver-orange bg-beaver-orange/5 p-3">
          <p className="text-xs leading-relaxed text-body-text">
            <strong>Framing your view:</strong> Each key driver should be
            explicitly compared to management guidance and Street consensus. When
            your number differs, be prepared to articulate <em>why</em> — this
            is what distinguishes strong research.
            {mgmtDiff !== null && (
              <span className="mt-1 block">
                You are{" "}
                <strong className={mgmtDiff >= 0 ? "text-green-600" : "text-red-600"}>
                  {mgmtDiff >= 0 ? "above" : "below"} management
                </strong>{" "}
                by {Math.abs(mgmtDiff).toFixed(1)}
                {value.unit}.
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
