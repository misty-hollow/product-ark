import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center text-stone-800">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
        Missing Archive Record
      </p>
      <h1 className="text-2xl font-semibold">요청한 소장 기록을 찾지 못했습니다.</h1>
      <p className="max-w-md text-sm text-stone-500">
        아직 보존되지 않았거나 주소가 바뀐 물건일 수 있습니다.
      </p>
      <Button asChild className="bg-stone-800 text-stone-50 hover:bg-stone-700">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
