"use client";

import { Archive } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type SpecimenImageProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  imageClassName?: string;
};

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--bg-surface)] text-center text-[var(--ink-muted)]">
      <div className="flex h-12 w-12 items-center justify-center border border-[var(--border-medium)] bg-[var(--bg-base)]">
        <Archive className="h-5 w-5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
          No Specimen Image
        </p>
        <p className="mt-1 text-xs">식별 이미지 없음</p>
      </div>
    </div>
  );
}

export function SpecimenImage({
  src,
  alt,
  className,
  imageClassName
}: SpecimenImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("overflow-hidden bg-[var(--bg-surface)]", className)}>
      {!src || failed ? (
        <Placeholder />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          loading="lazy"
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      )}
    </div>
  );
}
