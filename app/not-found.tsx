import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="ark-wrap flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="label-mono">Missing Archive Record</p>
      <h1 className="font-serif text-[var(--t-26)] font-semibold text-[var(--ink-0)]">
        보관소 색인에서 해당 기록을 찾을 수 없음
      </h1>
      <p className="max-w-md text-sm text-[var(--ink-2)]">
        아직 보존되지 않았거나 주소가 바뀐 자료일 수 있습니다. 신규 기록 생성 또는 검색으로 다시 확인하십시오.
      </p>
      <Button asChild className="btn-ark-primary">
        <Link href="/search">사물 색인 검색</Link>
      </Button>
    </div>
  );
}
