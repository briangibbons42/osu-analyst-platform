# Company Validation — Script Outline

**Video ID:** `company-validation`
**Title:** Choosing a Company and Checking Data
**Duration:** 2–3 minutes
**Published URL:** _(to be added after production)_

---

## Opening (0:00–0:15)

- Before you can build a model, you need data. This video shows how to pick a company and verify that SEC filing data is available.

## Entering a Ticker (0:15–0:45)

- On the Research page (or the landing page), type a ticker symbol — e.g., MU for Micron, AAPL for Apple.
- Click "Validate." The platform resolves your ticker to the company's SEC CIK number using the SEC's company tickers database.
- This happens in real time — the platform calls SEC EDGAR's Submissions API.

## What Validation Checks (0:45–1:20)

- **10-K (annual filing):** Does the company have a recent annual report? This is where the detailed financial statements, segment data, and management discussion live.
- **10-Q (quarterly filing):** More recent quarterly data for updating your model.
- If both are available, you'll see a green "Data available" confirmation with the filing dates.
- If data is limited (e.g., the company is foreign or newly public), you'll see a clear message explaining why and suggesting next steps.

## What You See After Validation (1:20–1:50)

- Company name, SIC code (industry), and filing dates.
- A link to the company's EDGAR page so you can browse filings directly.
- After validation, you choose Teach Mode or Analyst Mode to begin your research.

## Why This Matters (1:50–2:15)

- In Teach Mode, explain what each data source provides — annual vs quarterly, financial statements vs segment data, management discussion vs earnings guidance.
- Good research starts with knowing what data you have and where it comes from.

## Close (2:15–2:30)

- Validate your company first — the platform won't let you skip this step because you need to know your data before modeling.
- Next: articulate your thesis.

---

## Key Points (for in-app display)

- Enter a ticker symbol — the platform resolves it to the SEC CIK number
- Validation checks for recent 10-K and 10-Q filings
- Links to EDGAR and investor relations pages are provided
- If data is limited, you'll see clear guidance on next steps
