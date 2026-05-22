import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
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
  const preservationStatus = "보존 상태: 양호";

  return (
    <div className="archive-container bg-[var(--bg-base)] py-10 text-[var(--ink-primary)] md:py-16">
      {created ? (
        <div className="mb-6 border border-[var(--border-medium)] bg-[var(--bg-surface)] p-4 text-sm font-semibold text-[var(--ink-primary)]">
          <CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-600" aria-hidden="true" />
          기초 소장 기록 생성 완료. 본 개체는 지구물건보관소의 정식 아카이브 자료로
          편입되었습니다. 소장번호: {archiveNumber}
        </div>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="print-section border border-[var(--border-fine)] bg-white/80 p-3 shadow-sm">
          <SpecimenImage
            src={item.imageUrl}
            alt={item.name}
            className="aspect-[4/3] border border-[var(--border-fine)] shadow-inner"
          />
          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
            Specimen Image
          </p>
        </section>

        <section className="print-section space-y-6 border border-[var(--border-fine)] bg-[#FFFCF4] p-5 shadow-sm">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-none border border-[var(--border-fine)] bg-[var(--bg-surface)] font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-secondary)]">
                {archiveNumber}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-none border-[var(--border-fine)] font-mono text-[10px] text-[var(--ink-secondary)]"
              >
                {categoryPath}
              </Badge>
              <Badge className="hidden rounded-none border border-emerald-200/70 bg-emerald-50 text-[10px] font-medium text-emerald-800 sm:inline-flex">
                {preservationStatus}
              </Badge>
              <Badge
                variant="outline"
                className="hidden rounded-none border-[var(--border-fine)] font-mono text-[10px] text-[var(--ink-muted)] sm:inline-flex"
              >
                {item.slug}
              </Badge>
            </div>
            <div>
              <p className="label mb-3">{archiveNumber}</p>
              <h1 className="text-[var(--text-2xl)] font-semibold leading-tight text-[var(--ink-primary)] md:text-[var(--text-3xl)]">
                {item.name}
              </h1>
              <p className="mt-5 text-[var(--text-base)] leading-[1.9] text-[var(--ink-secondary)]">
                {item.description}
              </p>
            </div>
          </div>

          <div className="overflow-hidden border border-[var(--border-fine)]">
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
                className="grid border-b border-[var(--border-fine)] transition hover:bg-stone-50 last:border-b-0 sm:grid-cols-[160px_1fr]"
              >
                <div className="bg-[var(--bg-surface)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                  {label}
                </div>
                <div className="px-4 py-3 text-sm text-[var(--ink-secondary)]">{value}</div>
              </div>
            ))}
            <div className="grid border-t border-[var(--border-fine)] transition hover:bg-stone-50 sm:grid-cols-[160px_1fr]">
              <div className="bg-[var(--bg-surface)] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
                최초 등록자
              </div>
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 text-sm text-[var(--ink-secondary)]">
                <Sparkles className="h-4 w-4 text-amber-700" aria-hidden="true" />
                <span>최초 기초 기록 기여자:</span>
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

          <div className="border border-[var(--border-fine)] bg-[var(--bg-surface)]/70 p-4 text-sm leading-7 text-[var(--ink-secondary)]">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-[var(--ink-secondary)]" aria-hidden="true" />
            {formatKoreanDate(item.createdAt)} 지구물건보관소에 기초 자료로 편입되었습니다.
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
        <div className="mb-6 border-l-[3px] border-[var(--accent-signal)] pl-5 lg:mb-0">
          <p className="label">Memory Ledger</p>
          <h2 className="mt-2 text-[var(--text-2xl)] font-semibold text-[var(--ink-primary)]">
            이 물건을 기억하는 사람들
          </h2>
          <p className="mt-4 text-[var(--text-base)] leading-[1.9] text-[var(--ink-secondary)]">
            이 물건과 함께 기억되는 사용 경험, 시대적 맥락, 발견 장소를 관련 기억 기록으로
            보탤 수 있습니다.
          </p>
        </div>
        <div className="space-y-4">
          {userId ? (
            <MemoryForm itemId={item.id} />
          ) : (
            <div className="border border-[var(--border-fine)] bg-white p-4 text-sm text-[var(--ink-secondary)]">
              로그인하면 이 물건에 대한 관련 기억 기록을 보탤 수 있습니다.
              <div className="mt-3">
                <SignInButton mode="modal">
                  <Button className="rounded-none bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]">
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
