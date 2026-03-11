"use client";

interface ModelGridProps {
  title: string;
  headers: string[];
  rows: GridRow[];
  onCellChange?: (rowIndex: number, col: string, value: number | null) => void;
  editableColumns?: string[];
  showTeachNotes?: boolean;
  teachNote?: string;
}

interface GridRow {
  label: string;
  isHeader: boolean;
  values: Record<string, number | null>;
}

export default function ModelGrid({
  title,
  headers,
  rows,
  onCellChange,
  editableColumns = [],
  showTeachNotes = false,
  teachNote,
}: ModelGridProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-paddletail-black">{title}</h3>

      {showTeachNotes && teachNote && (
        <div className="rounded-lg border-l-4 border-beaver-orange bg-beaver-orange/5 p-3">
          <p className="text-xs leading-relaxed text-body-text">{teachNote}</p>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-light-gray">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-light-gray bg-nav-bg">
              <th className="sticky left-0 bg-nav-bg px-4 py-2.5 text-left text-xs font-bold uppercase tracking-widest text-body-text">
                Line Item
              </th>
              {headers.map((h) => (
                <th
                  key={h}
                  className={`px-4 py-2.5 text-right text-xs font-bold uppercase tracking-widest ${
                    editableColumns.includes(h)
                      ? "text-beaver-orange"
                      : "text-body-text"
                  }`}
                >
                  {h}
                  {editableColumns.includes(h) && (
                    <span className="ml-1 text-[10px] font-normal normal-case">
                      (editable)
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={`${row.label}-${i}`}
                className={
                  row.isHeader
                    ? "bg-dark-section/5 font-bold"
                    : i % 2 === 0
                      ? "bg-white"
                      : "bg-page-bg"
                }
              >
                <td
                  className={`sticky left-0 px-4 py-2 ${
                    row.isHeader
                      ? "bg-dark-section/5 text-xs uppercase tracking-widest text-body-text"
                      : i % 2 === 0
                        ? "bg-white text-paddletail-black"
                        : "bg-page-bg text-paddletail-black"
                  }`}
                >
                  {row.label}
                </td>
                {headers.map((h) => {
                  const editable = editableColumns.includes(h) && !row.isHeader;
                  const val = row.values[h];
                  return (
                    <td key={h} className="px-4 py-2 text-right">
                      {editable ? (
                        <input
                          type="number"
                          step="any"
                          value={val ?? ""}
                          onChange={(e) =>
                            onCellChange?.(
                              i,
                              h,
                              e.target.value === ""
                                ? null
                                : parseFloat(e.target.value)
                            )
                          }
                          className="w-24 rounded border border-beaver-orange/30 bg-beaver-orange/5 px-2 py-1 text-right text-sm font-semibold text-paddletail-black focus:border-beaver-orange focus:outline-none"
                        />
                      ) : (
                        <span
                          className={
                            row.isHeader ? "text-body-text" : "text-paddletail-black"
                          }
                        >
                          {val != null ? formatNumber(val) : "—"}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatNumber(n: number): string {
  if (Math.abs(n) >= 1_000_000_000)
    return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  if (Math.abs(n) >= 1_000) return n.toLocaleString("en-US");
  return n.toFixed(1);
}
