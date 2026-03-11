"use client";

import type { ConsensusComparison } from "@/lib/types";

interface CompareConsensusProps {
  comparisons: ConsensusComparison[];
  showTeachNotes?: boolean;
}

export default function CompareConsensus({
  comparisons,
  showTeachNotes = false,
}: CompareConsensusProps) {
  return (
    <div className="space-y-6">
      {showTeachNotes && (
        <div className="rounded-lg border-l-4 border-beaver-orange bg-beaver-orange/5 p-4">
          <h4 className="mb-1 text-sm font-bold text-beaver-orange">
            Comparing your model to consensus
          </h4>
          <p className="text-sm leading-relaxed text-body-text">
            This table shows how your model outputs compare to Street consensus
            and management targets. The value isn&apos;t in being &quot;right&quot; — it&apos;s in
            understanding <em>where</em> you differ and being able to articulate{" "}
            <em>why</em>. Use this to stress-test your thesis: if your revenue is
            10% above consensus, what assumption drives that? Can you defend it?
          </p>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-light-gray">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-nav-bg">
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-body-text">
                Metric
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-beaver-orange">
                Your Estimate
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-gray-500">
                Consensus
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-gray-500">
                Management
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-widest text-body-text">
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, i) => (
              <tr
                key={row.metric}
                className={i % 2 === 0 ? "bg-white" : "bg-page-bg"}
              >
                <td className="px-4 py-3 font-semibold text-paddletail-black">
                  {row.metric}
                </td>
                <td className="px-4 py-3 text-right font-bold text-beaver-orange">
                  {row.yourEstimate != null
                    ? formatValue(row.yourEstimate, row.unit)
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right text-body-text">
                  {row.consensus != null
                    ? formatValue(row.consensus, row.unit)
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right text-body-text">
                  {row.management != null
                    ? formatValue(row.management, row.unit)
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  {row.differencePercent != null ? (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                        row.differencePercent > 0
                          ? "bg-green-100 text-green-700"
                          : row.differencePercent < 0
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {row.differencePercent > 0 ? "+" : ""}
                      {row.differencePercent.toFixed(1)}%
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTeachNotes && (
        <div className="rounded-lg bg-white p-5 border border-light-gray">
          <h4 className="mb-2 text-sm font-bold text-paddletail-black">
            How to use this comparison
          </h4>
          <ol className="space-y-2 text-sm text-body-text list-decimal list-inside">
            <li>
              <strong>Identify divergences:</strong> Where is your estimate
              meaningfully above or below consensus?
            </li>
            <li>
              <strong>Trace to assumptions:</strong> Which of your key
              assumptions (from your thesis) drives this divergence?
            </li>
            <li>
              <strong>Defend or adjust:</strong> Can you articulate why the
              market is wrong? If not, revisit your assumption.
            </li>
            <li>
              <strong>Frame the pitch:</strong> Your pitch should lead with the
              divergences that matter most and explain why.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

function formatValue(val: number, unit: string): string {
  if (unit === "$B") return `$${val.toFixed(1)}B`;
  if (unit === "$M") return `$${val.toFixed(0)}M`;
  if (unit === "%") return `${val.toFixed(1)}%`;
  if (unit === "x") return `${val.toFixed(1)}x`;
  if (unit === "$") return `$${val.toFixed(2)}`;
  return val.toFixed(2);
}
