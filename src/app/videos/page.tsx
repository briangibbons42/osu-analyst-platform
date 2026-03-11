import VideoHelp from "@/components/VideoHelp";
import { EXPLAINER_VIDEOS } from "@/lib/explainer-videos";

const VIDEO_ORDER = [
  "platform-overview",
  "company-validation",
  "thesis-framing",
  "three-statement-model",
  "dcf",
  "segments-guidance",
  "compare-consensus",
  "report-pitch",
] as const;

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.2em] text-beaver-orange">
        Learning Resources
      </span>
      <h1 className="mb-2 text-3xl font-extrabold text-paddletail-black">
        Explainer Videos
      </h1>
      <p className="mb-8 text-sm leading-relaxed text-body-text">
        Short, focused videos explaining each feature and best practice. These
        are also available in context throughout Teach Mode and via the
        &quot;How this works&quot; button in Analyst Mode.
      </p>

      <div className="space-y-4">
        {VIDEO_ORDER.map((id) => {
          const video = EXPLAINER_VIDEOS[id];
          if (!video) return null;
          return <VideoHelp key={id} video={video} />;
        })}
      </div>
    </div>
  );
}
