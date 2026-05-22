"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="ark-wrap flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="label-mono">Archive Access Error</p>
      <h1 className="font-serif text-[var(--t-26)] font-semibold text-[var(--ink-0)]">
        소장 기록을 불러오지 못했습니다.
      </h1>
      <Button type="button" onClick={reset} className="btn-ark-primary">
        다시 조회하기
      </Button>
    </div>
  );
}
