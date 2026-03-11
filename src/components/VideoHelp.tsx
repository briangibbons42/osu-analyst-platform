"use client";

import { useState } from "react";
import type { ExplainerVideo } from "@/lib/types";

interface VideoHelpProps {
  video: ExplainerVideo;
  variant?: "inline" | "button";
}

export default function VideoHelp({ video, variant = "inline" }: VideoHelpProps) {
  const [open, setOpen] = useState(false);

  if (variant === "button") {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-md border border-light-gray bg-white px-3 py-1.5 text-xs font-semibold text-beaver-orange transition-colors hover:bg-beaver-orange hover:text-white"
          title={`Watch: ${video.title}`}
        >
          <PlayIcon />
          How this works
        </button>

        {open && (
          <VideoModal video={video} onClose={() => setOpen(false)} />
        )}
      </>
    );
  }

  return (
    <div className="rounded-xl border border-light-gray bg-white overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-page-bg"
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-beaver-orange/10 text-beaver-orange">
          <PlayIcon size={28} />
        </div>
        <div className="flex-1">
          <span className="mb-0.5 block text-xs font-bold uppercase tracking-widest text-beaver-orange">
            Explainer Video &middot; {video.duration}
          </span>
          <h4 className="text-base font-bold text-paddletail-black">
            {video.title}
          </h4>
          <p className="mt-1 text-sm text-body-text">{video.description}</p>
        </div>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="border-t border-light-gray p-5">
          {video.videoUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-dark-section">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-dark-section/5 border-2 border-dashed border-light-gray">
              <div className="text-center">
                <PlayIcon size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-semibold text-body-text">
                  Video coming soon
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  This video will be available after production
                </p>
              </div>
            </div>
          )}

          <div className="mt-4">
            <h5 className="mb-2 text-xs font-bold uppercase tracking-widest text-beaver-orange">
              Key Points
            </h5>
            <ul className="space-y-1">
              {video.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-body-text">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-beaver-orange" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: ExplainerVideo;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-light-gray p-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-beaver-orange">
              Explainer Video &middot; {video.duration}
            </span>
            <h4 className="text-lg font-bold text-paddletail-black">
              {video.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-body-text transition-colors hover:bg-page-bg"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {video.videoUrl ? (
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-dark-section">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-dark-section/5 border-2 border-dashed border-light-gray">
              <div className="text-center">
                <PlayIcon size={48} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm font-semibold text-body-text">
                  Video coming soon
                </p>
              </div>
            </div>
          )}
          <div className="mt-4">
            <h5 className="mb-2 text-xs font-bold uppercase tracking-widest text-beaver-orange">
              Key Points
            </h5>
            <ul className="space-y-1">
              {video.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-body-text">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-beaver-orange" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`shrink-0 text-body-text transition-transform ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
