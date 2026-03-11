import CompanyPicker from "@/components/CompanyPicker";
import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-section text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Oregon State University &middot; College of Business
          </span>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
            Finance Investment Club
            <br />
            <span className="text-beaver-orange">Analyst Platform</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-300">
            A learning-first equity research platform. Build 3-statement models,
            construct DCFs, articulate your thesis, and frame your views
            vs&nbsp;consensus and management — all driven by SEC filings and
            best practices.
          </p>
          <div className="mt-8">
            <CompanyPicker />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-page-bg">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            How It Works
          </span>
          <h2 className="mb-8 text-3xl font-extrabold text-paddletail-black">
            Research like a professional analyst
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StepCard
              number={1}
              title="Pick a Company"
              description="Enter a ticker. We validate data availability via SEC EDGAR and show you what's available."
            />
            <StepCard
              number={2}
              title="Articulate Your Thesis"
              description="Start with a catalyst and key assumptions. Your thesis drives which line items to stress-test."
            />
            <StepCard
              number={3}
              title="Build the Model"
              description="Map filings to a 3-statement model and DCF. Frame every assumption vs management and consensus."
            />
            <StepCard
              number={4}
              title="Compare & Pitch"
              description="See how your model compares to the Street. Articulate why you're different and frame the pitch."
            />
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Choose Your Path
          </span>
          <h2 className="mb-8 text-3xl font-extrabold text-paddletail-black">
            Two modes, one platform
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border-2 border-light-gray p-8">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-beaver-orange">
                New Analysts
              </span>
              <h3 className="mb-3 text-2xl font-bold text-paddletail-black">
                Teach Mode
              </h3>
              <p className="text-sm leading-relaxed text-body-text">
                Step-by-step guidance through every concept. Start with
                &quot;why&quot; before &quot;how&quot;. Includes explainer
                videos, hints, checkpoints, and lessons on framing your view vs
                consensus and management.
              </p>
            </div>
            <div className="rounded-xl border-2 border-light-gray p-8">
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-beaver-orange">
                Returning Analysts
              </span>
              <h3 className="mb-3 text-2xl font-bold text-paddletail-black">
                Analyst Mode
              </h3>
              <p className="text-sm leading-relaxed text-body-text">
                Full access to all tools with framing columns always visible.
                Same best-practice spine — thesis first, model, compare — but
                you move at your own pace. &quot;Why?&quot; links are always one
                click away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explainer Video */}
      <section className="bg-page-bg">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Getting Started
          </span>
          <h2 className="mb-6 text-3xl font-extrabold text-paddletail-black">
            Watch: Platform Overview
          </h2>
          <VideoHelp video={EXPLAINER_VIDEOS["platform-overview"]} />
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
            Equity Research Best Practices
          </span>
          <h2 className="mb-8 text-3xl font-extrabold text-paddletail-black">
            What this platform teaches
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <BestPracticeCard
              title="Thesis-Driven Research"
              description="Every analysis starts with a thesis: a catalyst, key assumptions, and a view. The model exists to test the thesis, not the other way around."
            />
            <BestPracticeCard
              title="Frame Your View"
              description="For every key driver, see Your Assumption vs Management vs Consensus. When you diverge, articulate why — that's the core of strong research."
            />
            <BestPracticeCard
              title="Model Transparency"
              description="No black boxes. Every formula is visible, every input is editable, and every change flows through the model so you can see the impact."
            />
            <BestPracticeCard
              title="Compare to Consensus"
              description="After building your model, compare outputs (revenue, EPS, target price) to consensus. Identify divergences and use them to frame your pitch."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-light-gray bg-white p-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-beaver-orange text-sm font-bold text-white">
        {number}
      </div>
      <h3 className="mb-2 text-base font-bold text-paddletail-black">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-body-text">{description}</p>
    </div>
  );
}

function BestPracticeCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border-l-4 border-beaver-orange bg-page-bg p-6">
      <h3 className="mb-2 text-base font-bold text-paddletail-black">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-body-text">{description}</p>
    </div>
  );
}
