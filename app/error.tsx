"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center text-stone-800">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
        Archive Access Error
      </p>
      <h1 className="text-2xl font-semibold">소장 기록을 불러오지 못했습니다.</h1>
      <Button onClick={reset} className="bg-stone-800 text-stone-50 hover:bg-stone-700">
        다시 조회하기
      </Button>
    </div>
  );
}
