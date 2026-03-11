export interface CompanyInfo {
  cik: string;
  ticker: string;
  name: string;
  sic: string;
  sicDescription: string;
  fiscalYearEnd: string;
  stateOfIncorporation: string;
  filings: FilingSummary[];
}

export interface FilingSummary {
  accessionNumber: string;
  filingDate: string;
  reportDate: string;
  form: string;
  primaryDocument: string;
  primaryDocDescription: string;
}

export interface ValidationResult {
  valid: boolean;
  company: CompanyInfo | null;
  has10K: boolean;
  has10Q: boolean;
  latestAnnual: FilingSummary | null;
  latestQuarterly: FilingSummary | null;
  edgarUrl: string;
  irUrl: string | null;
  message: string;
}

export interface Thesis {
  ticker: string;
  catalyst: string;
  view: "bull" | "base" | "bear";
  keyAssumptions: string[];
  relativeToConsensus: string;
  summary: string;
}

export interface FramingValue {
  label: string;
  yourAssumption: number | null;
  management: number | null;
  consensus: number | null;
  unit: "%" | "$M" | "$B" | "x" | "$";
}

export interface IncomeStatementLine {
  label: string;
  isHeader: boolean;
  historical: Record<string, number | null>;
  projected: Record<string, number | null>;
  framing?: FramingValue;
}

export interface BalanceSheetLine {
  label: string;
  isHeader: boolean;
  historical: Record<string, number | null>;
  projected: Record<string, number | null>;
}

export interface CashFlowLine {
  label: string;
  isHeader: boolean;
  historical: Record<string, number | null>;
  projected: Record<string, number | null>;
}

export interface ThreeStatementModel {
  ticker: string;
  incomeStatement: IncomeStatementLine[];
  balanceSheet: BalanceSheetLine[];
  cashFlow: CashFlowLine[];
  periods: string[];
  projectionPeriods: string[];
}

export interface DCFInputs {
  revenueGrowthRates: Record<string, number>;
  ebitdaMargins: Record<string, number>;
  capexPercent: number;
  nwcChange: number;
  taxRate: number;
  wacc: number;
  terminalGrowth: number;
  sharesOutstanding: number;
  netDebt: number;
}

export interface DCFOutput {
  projectedFCF: Record<string, number>;
  terminalValue: number;
  enterpriseValue: number;
  equityValue: number;
  impliedSharePrice: number;
  impliedUpside: number;
}

export interface ConsensusComparison {
  metric: string;
  yourEstimate: number | null;
  consensus: number | null;
  management: number | null;
  difference: number | null;
  differencePercent: number | null;
  unit: string;
}

export interface Scenario {
  name: "bull" | "base" | "bear";
  assumptions: Record<string, number>;
  dcfInputs: Partial<DCFInputs>;
  impliedPrice: number | null;
}

export interface ExplainerVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  keyPoints: string[];
  videoUrl: string | null;
  thumbnailUrl: string | null;
}

export type AppMode = "teach" | "analyst";

export interface TeachStep {
  id: string;
  title: string;
  description: string;
  hint?: string;
  videoId?: string;
  completed: boolean;
}
