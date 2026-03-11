import { NextRequest, NextResponse } from "next/server";
import { fetchHistoricalFinancials } from "@/lib/xbrl-parser";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker");
  if (!ticker) {
    return NextResponse.json(
      { error: "Missing ticker parameter." },
      { status: 400 }
    );
  }

  try {
    const data = await fetchHistoricalFinancials(ticker);
    if (!data) {
      return NextResponse.json(
        { error: `Could not load financial data for "${ticker}".` },
        { status: 404 }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("Financials API error:", error);
    return NextResponse.json(
      { error: "Error fetching financial data from EDGAR." },
      { status: 502 }
    );
  }
}
