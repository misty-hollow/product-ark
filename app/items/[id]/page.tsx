import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarDays, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ItemActionPanel } from "@/components/item-action-panel";
import { MemoryForm } from "@/components/memory-form";
import { MemoryList } from "@/components/memory-list";
import { SpecimenImage } from "@/components/specimen-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCategoryRecordPath } from "@/lib/catalog";
import { formatArchiveNumber, formatKoreanDate } from "@/lib/format";
import { getItemById, hasUserReportedItem } from "@/lib/items";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ItemDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
  }>;
};

export default async function ItemDetailPage({
  params,
  searchParams
}: ItemDetailPageProps) {
  const [{ id }, query, { userId }] = await Promise.all([
    params,
    searchParams,
    auth()
  ]);
  const item = await getItemById(id);

  if (!item) {
    notFound();
  }

  const created = query.created === "1";
  const hasReported = userId ? await hasUserReportedItem(item.id, userId) : false;
  const isOwner = userId === item.firstRecorderId;
  const archiveNumber = formatArchiveNumber(item.createdAt, item.id);
  const categoryPath =
    formatCategoryRecordPath(item.primaryCategory, item.category) ?? "미분류";
  const isRecentlyRegistered =
    Date.now() - item.createdAt.getTime() < 1000 * 60 * 60 * 24 * 90;
  const preservationStatus = isRecentlyRegistered
    ? "보존 상태: 양호 (일상적 관찰 가능)"
    : "보존 상태: 양호";

  return (
    <div className="mx-auto w-full max-w-6xl bg-[#FAF9F5] px-4 py-8 text-stone-800">
      {created ? (
        <div className="mb-5 rounded-lg border border-stone-300 bg-stone-100 p-4 text-sm font-semibold text-stone-700">
          <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          기초 소장 기록 생성 완료. 본 개체는 지구물건보관소의 정식 아카이브
          자료로 편입되었습니다. 보관소는 이 물건의 존재를 공식적으로 기억하기
          시작합니다. 식별번호: {archiveNumber}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="print-section rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
          <SpecimenImage
            src={item.imageUrl}
            alt={item.name}
            className="aspect-[4/3] rounded-md border border-stone-200 shadow-inner"
          />
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Specimen Image
          </p>
        </section>

        <section className="print-section space-y-6 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge className="border border-stone-200 bg-stone-100 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-600">
                Artifact Registry Sheet
              </Badge>
              <Badge className="border border-amber-200/70 bg-amber-50 text-[10px] font-medium text-amber-800">
                {preservationStatus}
              </Badge>
              <Badge
                variant="outline"
                className="border-stone-200 font-mono text-[10px] text-stone-400"
              >
                {item.slug}
              </Badge>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-stone-400">
                {archiveNumber}
              </p>
              <h1 className="text-3xl font-semibold leading-tight text-stone-800 md:text-4xl">
                {item.name}
              </h1>
              <p className="mt-4 text-base leading-8 text-stone-500">
                {item.description}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-stone-200">
            <div className="grid border-b border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                소장번호
              </div>
              <div className="px-4 py-3 font-mono text-sm text-stone-700">
                {archiveNumber}
              </div>
            </div>
            <div className="grid border-b border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                분류 체계
              </div>
              <div className="px-4 py-3 text-sm text-stone-700">
                {categoryPath}
              </div>
            </div>
            <div className="grid border-b border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                브랜드/제조사
              </div>
              <div className="px-4 py-3 text-sm text-stone-700">
                {item.brand || "기록 없음"}
              </div>
            </div>
            <div className="grid border-b border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                최초 기록 기여자
              </div>
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-sm text-stone-700">
                <Sparkles className="h-4 w-4 text-amber-700" aria-hidden="true" />
                <span className="text-stone-500">최초 기초 기록 기여자:</span>
                <Link
                  href={`/users/${item.firstRecorder.id}`}
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  {item.firstRecorder.name}
                </Link>
                <span className="rounded border border-amber-200/70 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                  최초 등록자
                </span>
              </div>
            </div>
            <div className="grid sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                최초 등록일
              </div>
              <div className="flex items-center gap-2 px-4 py-3 text-sm text-stone-700">
                <CalendarDays className="h-4 w-4 text-stone-400" aria-hidden="true" />
                {formatKoreanDate(item.createdAt)}
              </div>
            </div>
            <div className="grid border-t border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                상태
              </div>
              <div className="px-4 py-3 text-sm text-stone-700">
                {preservationStatus}
              </div>
            </div>
            <div className="grid border-t border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                관련 기억 기록
              </div>
              <div className="px-4 py-3 font-mono text-sm text-stone-700">
                {item.memories.length}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-500">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-stone-500" aria-hidden="true" />
            {formatKoreanDate(item.createdAt)} 지구물건보관소에 기초 자료로
            편입되었습니다.
          </div>

          <ItemActionPanel
            itemId={item.id}
            isOwner={isOwner}
            canReport={Boolean(userId)}
            hasReported={hasReported}
          />
        </section>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Memory Ledger
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-stone-800">
            관련 기억 기록 및 고증 (Memory Ledger)
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            이 개체와 관련된 개인의 목격 기억, 실제 사용 시기의 에피소드,
            시대적 맥락에 대한 추가 진술을 남길 수 있습니다. 기억은 다소
            흐릴 수 있으나, 의도적인 왜곡은 보관소 업무에 혼선을 줄 수
            있습니다.
          </p>
        </div>
        <div className="space-y-4">
          {userId ? (
            <MemoryForm itemId={item.id} />
          ) : (
            <div className="rounded-lg border border-stone-200 bg-white p-4 text-sm text-stone-500">
              로그인하면 이 물건에 대한 관련 기억 기록을 남길 수 있습니다.
              <div className="mt-3">
                <SignInButton mode="modal">
                  <Button className="bg-stone-800 text-stone-50 hover:bg-stone-700">
                    로그인하기
                  </Button>
                </SignInButton>
              </div>
            </div>
          )}
          <MemoryList memories={item.memories} />
        </div>
      </section>
    </div>
  );
}
