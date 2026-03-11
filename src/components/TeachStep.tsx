"use client";

import type { ExplainerVideo } from "@/lib/types";
import VideoHelp from "./VideoHelp";

interface TeachStepProps {
  stepNumber: number;
  title: string;
  description: string;
  hint?: string;
  video?: ExplainerVideo;
  completed: boolean;
  active: boolean;
  children?: React.ReactNode;
}

export default function TeachStep({
  stepNumber,
  title,
  description,
  hint,
  video,
  completed,
  active,
  children,
}: TeachStepProps) {
  return (
    <div
      className={`rounded-xl border-2 transition-all ${
        active
          ? "border-beaver-orange shadow-lg"
          : completed
            ? "border-green-500 bg-green-50/30"
            : "border-light-gray opacity-60"
      }`}
    >
      <div className="flex items-start gap-4 p-5">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            completed
              ? "bg-green-500 text-white"
              : active
                ? "bg-beaver-orange text-white"
                : "bg-light-gray text-body-text"
          }`}
        >
          {completed ? "✓" : stepNumber}
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-paddletail-black">{title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-body-text">
            {description}
          </p>
          {hint && active && (
            <div className="mt-3 rounded-md bg-beaver-orange/5 border border-beaver-orange/20 p-3">
              <span className="text-xs font-bold text-beaver-orange">
                Hint:
              </span>
              <p className="mt-0.5 text-xs text-body-text">{hint}</p>
            </div>
          )}
        </div>
      </div>

      {video && active && (
        <div className="border-t border-light-gray px-5 py-4">
          <VideoHelp video={video} variant="inline" />
        </div>
      )}

      {active && children && (
        <div className="border-t border-light-gray p-5">{children}</div>
      )}
    </div>
  );
}
