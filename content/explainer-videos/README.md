# Explainer Video Scripts

This folder contains script outlines for each explainer video in the Analyst Platform.
Each script corresponds to an entry in `src/lib/explainer-videos.ts`.

## Video Catalog

| # | File | Video ID | Title | Duration |
|---|------|----------|-------|----------|
| 1 | `01-platform-overview.md` | `platform-overview` | Using the Analyst Platform | 2–3 min |
| 2 | `02-company-validation.md` | `company-validation` | Choosing a Company and Checking Data | 2–3 min |
| 3 | `03-three-statement-model.md` | `three-statement-model` | Building a 3-Statement Model from Filings | 4–6 min |
| 4 | `04-dcf.md` | `dcf` | DCF Inputs and Linking to Your 3-Statement | 4–5 min |
| 5 | `05-segments-guidance.md` | `segments-guidance` | Segments, Geographic Data, and Management Guidance | 3–4 min |
| 6 | `06-report-pitch.md` | `report-pitch` | Industry Deep Dive, Report, and Pitch Deck | 3–4 min |
| 7 | `07-thesis-framing.md` | `thesis-framing` | Thesis, Assumptions vs Consensus and Management | 3–4 min |
| 8 | `08-compare-consensus.md` | `compare-consensus` | Using Model Output vs Consensus to Frame Your View | 2–3 min |

## Workflow

1. **Write/edit the script** in this folder.
2. **Produce the video** — screen recording of the app + voiceover.
3. **Publish** to YouTube (unlisted or public) or other host.
4. **Update** `src/lib/explainer-videos.ts` with the `videoUrl` for the corresponding entry.
5. The `VideoHelp` component in the app will automatically embed the video.

## In-App Placement

- **Teach Mode:** Video at the start of each module, plus "Watch again" at checkpoints.
- **Analyst Mode:** "How this works" button next to each tool opens the video in a modal.
- **Landing page:** Platform overview video on the home page.
