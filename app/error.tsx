"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold text-primary">기록을 불러오지 못했습니다</p>
      <h1 className="text-2xl font-bold">잠시 후 다시 시도해주세요.</h1>
      <Button onClick={reset}>다시 펼치기</Button>
    </div>
  );
}
