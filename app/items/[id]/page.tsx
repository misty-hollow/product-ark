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
  const preservationStatus = "보존됨";

  return (
    <div className="archive-container bg-[#FAF9F5] py-10 text-stone-800 md:py-16">
      {created ? (
        <div className="mb-6 border border-stone-300 bg-[#F4F1EA] p-4 text-sm font-semibold text-stone-700">
          <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          기초 소장 기록 생성 완료. 본 개체는 지구물건보관소의 신규 자료로
          편입되었습니다. 소장번호: {archiveNumber}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="print-section border border-stone-200 bg-white/80 p-3 shadow-sm">
          <SpecimenImage
            src={item.imageUrl}
            alt={item.name}
            className="aspect-[4/3] border border-stone-200 shadow-inner"
          />
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            Specimen Image
          </p>
        </section>

        <section className="print-section space-y-6 border border-stone-200 bg-[#FFFCF4] p-5 shadow-sm">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-none border border-stone-200 bg-stone-100 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-600">
                소장품 기록지
              </Badge>
              <Badge className="rounded-none border border-emerald-200/70 bg-emerald-50 text-[10px] font-medium text-emerald-800">
                상태: {preservationStatus}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-none border-stone-200 font-mono text-[10px] text-stone-400"
              >
                {item.slug}
              </Badge>
            </div>
            <div>
              <p className="label mb-3">{archiveNumber}</p>
              <h1 className="text-[var(--text-2xl)] font-semibold leading-tight text-stone-900 md:text-[var(--text-3xl)]">
                {item.name}
              </h1>
              <p className="mt-5 text-[var(--text-base)] leading-[1.9] text-stone-600">
                {item.description}
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-stone-200">
            {[
              ["소장번호", archiveNumber],
              ["분류 체계", categoryPath],
              ["브랜드/제조사", item.brand || "기록 없음"],
              ["최초 등록일", formatKoreanDate(item.createdAt)],
              ["상태", preservationStatus],
              ["관련 기억 기록", `${item.memories.length}건`]
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid border-b border-stone-200 last:border-b-0 sm:grid-cols-[160px_1fr]"
              >
                <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                  {label}
                </div>
                <div className="px-4 py-3 text-sm text-stone-700">{value}</div>
              </div>
            ))}
            <div className="grid border-t border-stone-200 sm:grid-cols-[160px_1fr]">
              <div className="bg-stone-50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                최초 등록자
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
                <span className="border border-amber-200/70 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                  최초 등록자
                </span>
              </div>
            </div>
          </div>

          <div className="border border-stone-200 bg-stone-50 p-4 text-sm leading-7 text-stone-500">
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

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-l-[3px] border-[var(--accent-signal)] pl-5">
          <p className="label">Memory Ledger</p>
          <h2 className="mt-2 text-[var(--text-2xl)] font-semibold text-stone-900">
            이 물건을 기억하는 사람들
          </h2>
          <p className="mt-4 text-[var(--text-base)] leading-[1.9] text-stone-600">
            이 물건과 함께 기억되는 사용 경험, 시대적 맥락, 발견 장소를 관련
            기억 기록으로 남길 수 있습니다.
          </p>
        </div>
        <div className="space-y-4">
          {userId ? (
            <MemoryForm itemId={item.id} />
          ) : (
            <div className="border border-stone-200 bg-white p-4 text-sm text-stone-500">
              로그인하면 이 물건에 대한 관련 기억 기록을 남길 수 있습니다.
              <div className="mt-3">
                <SignInButton mode="modal">
                  <Button className="rounded-none bg-stone-900 text-stone-50 hover:bg-stone-800">
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
