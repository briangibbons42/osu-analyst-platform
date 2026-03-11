import { fetchCompanyFacts, resolveTickerToCIK } from "./edgar";

export interface HistoricalFinancials {
  ticker: string;
  companyName: string;
  cik: string;
  periods: string[];
  incomeStatement: StatementRow[];
  balanceSheet: StatementRow[];
  cashFlow: StatementRow[];
}

export interface StatementRow {
  label: string;
  isHeader: boolean;
  values: Record<string, number | null>;
  xbrlTag?: string;
}

interface XBRLFact {
  val: number;
  end: string;
  fy: number;
  fp: string;
  form: string;
  accn: string;
  filed: string;
}

interface XBRLConcept {
  label: string;
  units: Record<string, XBRLFact[]>;
}

const IS_TAGS: { tag: string; label: string; negate?: boolean }[] = [
  { tag: "Revenues", label: "Revenue" },
  { tag: "RevenueFromContractWithCustomerExcludingAssessedTax", label: "Revenue" },
  { tag: "SalesRevenueNet", label: "Revenue" },
  { tag: "CostOfRevenue", label: "Cost of Revenue", negate: true },
  { tag: "CostOfGoodsAndServicesSold", label: "Cost of Revenue", negate: true },
  { tag: "CostOfGoodsSold", label: "Cost of Revenue", negate: true },
  { tag: "GrossProfit", label: "Gross Profit" },
  { tag: "ResearchAndDevelopmentExpense", label: "R&D Expense", negate: true },
  { tag: "SellingGeneralAndAdministrativeExpense", label: "SG&A Expense", negate: true },
  { tag: "OperatingIncomeLoss", label: "Operating Income" },
  { tag: "InterestExpense", label: "Interest Expense", negate: true },
  { tag: "IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest", label: "Pre-Tax Income" },
  { tag: "IncomeTaxExpenseBenefit", label: "Tax Expense", negate: true },
  { tag: "NetIncomeLoss", label: "Net Income" },
  { tag: "EarningsPerShareDiluted", label: "Diluted EPS" },
];

const BS_TAGS: { tag: string; label: string }[] = [
  { tag: "CashAndCashEquivalentsAtCarryingValue", label: "Cash & Equivalents" },
  { tag: "AccountsReceivableNetCurrent", label: "Accounts Receivable" },
  { tag: "InventoryNet", label: "Inventory" },
  { tag: "PropertyPlantAndEquipmentNet", label: "PP&E (net)" },
  { tag: "Assets", label: "Total Assets" },
  { tag: "AccountsPayableCurrent", label: "Accounts Payable" },
  { tag: "LongTermDebtNoncurrent", label: "Long-Term Debt" },
  { tag: "LongTermDebt", label: "Long-Term Debt" },
  { tag: "Liabilities", label: "Total Liabilities" },
  { tag: "StockholdersEquity", label: "Shareholders' Equity" },
];

const CF_TAGS: { tag: string; label: string; negate?: boolean }[] = [
  { tag: "NetIncomeLoss", label: "Net Income" },
  { tag: "DepreciationDepletionAndAmortization", label: "D&A" },
  { tag: "Depreciation", label: "Depreciation" },
  { tag: "NetCashProvidedByUsedInOperatingActivities", label: "Cash from Operations" },
  { tag: "PaymentsToAcquirePropertyPlantAndEquipment", label: "CapEx", negate: true },
  { tag: "NetCashProvidedByUsedInInvestingActivities", label: "Cash from Investing" },
  { tag: "PaymentsOfDividends", label: "Dividends", negate: true },
  { tag: "NetCashProvidedByUsedInFinancingActivities", label: "Cash from Financing" },
];

function extractAnnualValues(
  concept: XBRLConcept | undefined,
  negate: boolean = false
): Record<number, number> {
  if (!concept) return {};

  const usdFacts = concept.units["USD"] ?? concept.units["USD/shares"] ?? [];
  const result: Record<number, number> = {};

  const annuals = usdFacts.filter(
    (f) => f.fp === "FY" && (f.form === "10-K" || f.form === "10-K/A")
  );

  annuals.sort((a, b) => b.fy - a.fy);

  const seen = new Set<number>();
  for (const fact of annuals) {
    if (!seen.has(fact.fy)) {
      seen.add(fact.fy);
      result[fact.fy] = negate ? -Math.abs(fact.val) : fact.val;
    }
  }

  return result;
}

function buildRows(
  tags: { tag: string; label: string; negate?: boolean }[],
  usGaap: Record<string, XBRLConcept>,
  periods: string[],
  fyYears: number[]
): StatementRow[] {
  const seen = new Set<string>();
  const rows: StatementRow[] = [];

  for (const { tag, label, negate } of tags) {
    if (seen.has(label)) continue;
    const concept = usGaap[tag];
    if (!concept) continue;

    const annualValues = extractAnnualValues(concept, negate);
    if (Object.keys(annualValues).length === 0) continue;

    seen.add(label);

    const values: Record<string, number | null> = {};
    for (let i = 0; i < fyYears.length; i++) {
      values[periods[i]] = annualValues[fyYears[i]] ?? null;
    }
    // projected periods are null
    for (const p of [`${periods[0].slice(0, 2)}${fyYears[0] + 1}E`, `${periods[0].slice(0, 2)}${fyYears[0] + 2}E`, `${periods[0].slice(0, 2)}${fyYears[0] + 3}E`]) {
      values[p] = null;
    }

    const isHeaderLine = [
      "Gross Profit", "Operating Income", "Pre-Tax Income",
      "Net Income", "Total Assets", "Total Liabilities",
      "Shareholders' Equity", "Cash from Operations",
      "Cash from Investing", "Cash from Financing",
    ].includes(label);

    rows.push({
      label,
      isHeader: isHeaderLine,
      values,
      xbrlTag: tag,
    });
  }

  return rows;
}

export async function fetchHistoricalFinancials(
  ticker: string
): Promise<HistoricalFinancials | null> {
  const resolved = await resolveTickerToCIK(ticker);
  if (!resolved) return null;

  const facts = await fetchCompanyFacts(resolved.cik);
  if (!facts) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usGaap: Record<string, XBRLConcept> = (facts as any)?.facts?.["us-gaap"] ?? {};

  const revConcept =
    usGaap["Revenues"] ??
    usGaap["RevenueFromContractWithCustomerExcludingAssessedTax"] ??
    usGaap["SalesRevenueNet"];

  if (!revConcept) return null;

  const revValues = extractAnnualValues(revConcept);
  const allYears = Object.keys(revValues)
    .map(Number)
    .sort((a, b) => b - a);

  const fyYears = allYears.slice(0, 3);
  if (fyYears.length === 0) return null;

  fyYears.sort((a, b) => a - b);

  const periods = fyYears.map((y) => `FY${y}`);
  const projPeriods = [
    `FY${fyYears[fyYears.length - 1] + 1}E`,
    `FY${fyYears[fyYears.length - 1] + 2}E`,
    `FY${fyYears[fyYears.length - 1] + 3}E`,
  ];

  const isRows = buildRows(IS_TAGS, usGaap, periods, fyYears);
  const bsRows = buildRows(BS_TAGS, usGaap, periods, fyYears);
  const cfRows = buildRows(CF_TAGS, usGaap, periods, fyYears);

  // Scale to millions for display
  for (const rows of [isRows, bsRows, cfRows]) {
    for (const row of rows) {
      if (row.label === "Diluted EPS") continue;
      for (const key of Object.keys(row.values)) {
        if (row.values[key] != null) {
          row.values[key] = Math.round(row.values[key]! / 1_000_000);
        }
      }
    }
  }

  return {
    ticker: ticker.toUpperCase(),
    companyName: resolved.name,
    cik: resolved.cik,
    periods: [...periods, ...projPeriods],
    incomeStatement: isRows,
    balanceSheet: bsRows,
    cashFlow: cfRows,
  };
}
