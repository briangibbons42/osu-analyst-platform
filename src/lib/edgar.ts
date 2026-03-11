import type { CompanyInfo, FilingSummary, ValidationResult } from "./types";

const SEC_BASE = "https://data.sec.gov";
const USER_AGENT = "OSU-AnalystPlatform/1.0 (oregon-state-finance-club)";

const TICKER_TO_CIK_URL =
  "https://www.sec.gov/files/company_tickers.json";

export async function resolveTickerToCIK(
  ticker: string
): Promise<{ cik: string; name: string } | null> {
  const res = await fetch(TICKER_TO_CIK_URL, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) return null;

  const data: Record<
    string,
    { cik_str: number; ticker: string; title: string }
  > = await res.json();

  const upper = ticker.toUpperCase().trim();
  for (const entry of Object.values(data)) {
    if (entry.ticker === upper) {
      return {
        cik: String(entry.cik_str).padStart(10, "0"),
        name: entry.title,
      };
    }
  }
  return null;
}

export async function fetchCompanySubmissions(
  cik: string
): Promise<CompanyInfo | null> {
  const url = `${SEC_BASE}/submissions/CIK${cik}.json`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) return null;

  const data = await res.json();
  const recent = data.filings?.recent;
  if (!recent) return null;

  const filings: FilingSummary[] = [];
  const count = Math.min(recent.accessionNumber?.length ?? 0, 200);
  for (let i = 0; i < count; i++) {
    filings.push({
      accessionNumber: recent.accessionNumber[i],
      filingDate: recent.filingDate[i],
      reportDate: recent.reportDate[i],
      form: recent.form[i],
      primaryDocument: recent.primaryDocument[i],
      primaryDocDescription: recent.primaryDocDescription?.[i] ?? "",
    });
  }

  return {
    cik,
    ticker: (data.tickers?.[0] ?? "").toUpperCase(),
    name: data.name ?? "",
    sic: data.sic ?? "",
    sicDescription: data.sicDescription ?? "",
    fiscalYearEnd: data.fiscalYearEnd ?? "",
    stateOfIncorporation: data.stateOfIncorporation ?? "",
    filings,
  };
}

export async function fetchCompanyFacts(
  cik: string
): Promise<Record<string, unknown> | null> {
  const url = `${SEC_BASE}/api/xbrl/companyfacts/CIK${cik}.json`;
  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function validateCompany(
  ticker: string
): Promise<ValidationResult> {
  const resolved = await resolveTickerToCIK(ticker);
  if (!resolved) {
    return {
      valid: false,
      company: null,
      has10K: false,
      has10Q: false,
      latestAnnual: null,
      latestQuarterly: null,
      edgarUrl: "",
      irUrl: null,
      message: `Could not find "${ticker}" in the SEC database. Check the ticker symbol and try again.`,
    };
  }

  const company = await fetchCompanySubmissions(resolved.cik);
  if (!company) {
    return {
      valid: false,
      company: null,
      has10K: false,
      has10Q: false,
      latestAnnual: null,
      latestQuarterly: null,
      edgarUrl: "",
      irUrl: null,
      message: `Found CIK for "${ticker}" but could not load filing data.`,
    };
  }

  company.name = resolved.name;
  const annuals = company.filings.filter((f) => f.form === "10-K");
  const quarterlies = company.filings.filter((f) => f.form === "10-Q");

  const has10K = annuals.length > 0;
  const has10Q = quarterlies.length > 0;
  const latestAnnual = annuals[0] ?? null;
  const latestQuarterly = quarterlies[0] ?? null;

  const edgarUrl = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${resolved.cik}&type=10-K&dateb=&owner=include&count=40`;

  const valid = has10K;
  const message = valid
    ? `${resolved.name} (${ticker.toUpperCase()}) — data available. Latest 10-K: ${latestAnnual?.filingDate ?? "N/A"}, Latest 10-Q: ${latestQuarterly?.filingDate ?? "N/A"}.`
    : `${resolved.name} (${ticker.toUpperCase()}) — limited data. No 10-K filings found. You may proceed with caveats or pick another company.`;

  return {
    valid,
    company,
    has10K,
    has10Q,
    latestAnnual,
    latestQuarterly,
    edgarUrl,
    irUrl: null,
    message,
  };
}

export function buildEdgarFilingUrl(cik: string, accession: string): string {
  const clean = accession.replace(/-/g, "");
  return `https://www.sec.gov/Archives/edgar/data/${parseInt(cik, 10)}/${clean}/${accession}-index.htm`;
}
