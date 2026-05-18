import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[55vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-sm font-semibold text-primary">빈 도감 페이지</p>
      <h1 className="text-2xl font-bold">요청한 기록을 찾지 못했습니다.</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        아직 보존되지 않았거나 주소가 바뀐 물건일 수 있습니다.
      </p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
