import type { ExplainerVideo } from "./types";

export const EXPLAINER_VIDEOS: Record<string, ExplainerVideo> = {
  "platform-overview": {
    id: "platform-overview",
    title: "Using the Analyst Platform",
    description:
      "An overview of Teach vs Analyst mode, the company picker, and where to start your research.",
    duration: "2–3 min",
    keyPoints: [
      "Teach Mode walks you through step-by-step; Analyst Mode gives full access",
      "Start by entering a ticker to validate data availability",
      "Every workflow begins with a thesis before building the model",
      "Use explainer videos at any time by clicking 'How this works'",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  "company-validation": {
    id: "company-validation",
    title: "Choosing a Company and Checking Data",
    description:
      "How to pick a company, validate data availability via EDGAR, and understand what each source provides.",
    duration: "2–3 min",
    keyPoints: [
      "Enter a ticker symbol — the platform resolves it to the SEC CIK number",
      "Validation checks for recent 10-K and 10-Q filings",
      "Links to EDGAR and investor relations pages are provided",
      "If data is limited, you'll see clear guidance on next steps",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  "three-statement-model": {
    id: "three-statement-model",
    title: "Building a 3-Statement Model from Filings",
    description:
      "Where the numbers come from (10-K/10-Q), how to map them to IS/BS/CF, and how to use segment detail.",
    duration: "4–6 min",
    keyPoints: [
      "Income Statement, Balance Sheet, and Cash Flow are linked — changes flow through",
      "Historical data comes from SEC filings (XBRL); you map reported line items",
      "Segment and geographic detail adds granularity to revenue and cost projections",
      "Management guidance goes into dedicated fields for comparison",
      "Projected periods are driven by your assumptions — the framing columns show how they differ from consensus",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  dcf: {
    id: "dcf",
    title: "DCF Inputs and Linking to Your 3-Statement",
    description:
      "How revenue/FCF flow from the model, how WACC and terminal value work, and how to interpret the output.",
    duration: "4–5 min",
    keyPoints: [
      "DCF inputs (revenue, FCF) link directly from the 3-statement model",
      "WACC = weighted average cost of equity and debt — reflects risk",
      "Terminal value captures value beyond the explicit forecast period",
      "Growth assumptions should tie back to your thesis",
      "The implied share price is an output, not a prediction — it reflects your assumptions",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  "segments-guidance": {
    id: "segments-guidance",
    title: "Segments, Geographic Data, and Management Guidance",
    description:
      "Where to find segment and geographic data in filings, how to add guidance, and how they tie to your model.",
    duration: "3–4 min",
    keyPoints: [
      "Segment data lives in 10-K/10-Q footnotes and XBRL tags",
      "Geographic revenue breakdown adds another dimension to your projections",
      "Management guidance comes from earnings calls, investor day, and filings",
      "Guidance fields in the model help you compare your assumptions to management's stated targets",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  "report-pitch": {
    id: "report-pitch",
    title: "Industry Deep Dive, Report, and Pitch Deck",
    description:
      "How to use the report and pitch templates, fill sections, and export to Word/PPT.",
    duration: "3–4 min",
    keyPoints: [
      "Report template follows a standard equity research structure",
      "Pitch deck distills thesis, key charts, and recommendation into slides",
      "Industry deep-dive checklist covers structure, competitive position, and risks",
      "Export to Word/PPT to match the club's current deliverable format",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  "thesis-framing": {
    id: "thesis-framing",
    title: "Thesis, Assumptions vs Consensus and Management",
    description:
      "Why thesis comes first, how to frame your view vs management and consensus, and how your opinion changes the model.",
    duration: "3–4 min",
    keyPoints: [
      "Strong research starts with a thesis — what is the market missing?",
      "Your key assumptions drive which model line items matter most",
      "Framing columns show Your Assumption | Management | Consensus for each key driver",
      "When you change an assumption, the model updates — you see the impact immediately",
      "Being explicit about divergences is what separates good research from generic analysis",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
  "compare-consensus": {
    id: "compare-consensus",
    title: "Using Model Output vs Consensus to Frame Your View",
    description:
      "How to read the comparison table, stress-test your thesis, and articulate why you're above or below consensus.",
    duration: "2–3 min",
    keyPoints: [
      "The comparison table shows your estimates vs consensus for key metrics (revenue, EPS, PT)",
      "Identify where you diverge from the Street and trace it back to your assumptions",
      "If you can't defend a divergence, revisit the assumption",
      "Your pitch should lead with the divergences that matter most",
    ],
    videoUrl: null,
    thumbnailUrl: null,
  },
};
