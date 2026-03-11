import { NextRequest, NextResponse } from "next/server";
import { validateCompany } from "@/lib/edgar";

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get("ticker");
  if (!ticker) {
    return NextResponse.json(
      { valid: false, message: "Missing ticker parameter." },
      { status: 400 }
    );
  }

  try {
    const result = await validateCompany(ticker);
    return NextResponse.json(result);
  } catch (error) {
    console.error("EDGAR API error:", error);
    return NextResponse.json(
      {
        valid: false,
        message: "Error contacting SEC EDGAR. Please try again.",
      },
      { status: 502 }
    );
  }
}
