"use client";

import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { SearchBar } from "@/components/search-bar";
import { SpecimenImage } from "@/components/specimen-image";
import { Button } from "@/components/ui/button";
import { VaultStatusLog } from "@/components/vault-status-log";
import { formatArchiveNumber, formatKoreanDate } from "@/lib/format";

export type HomeRecentItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  firstRecorderName: string;
  memoryCount: number;
};

export type HomeStats = {
  itemCount: number;
  firstRecorderCount: number;
  memoryCount: number;
};

function displayCount(value: number) {
  return value === 0 ? "—" : value.toLocaleString("ko-KR");
}

function RecentArchiveCard({
  item,
  index
}: {
  item: HomeRecentItem;
  index: number;
}) {
  const createdAt = new Date(item.createdAt);
  const archiveNumber = formatArchiveNumber(createdAt, item.id);

  return (
    <Link
      href={`/items/${item.id}`}
      className="memory-card group block overflow-hidden border border-[var(--border-fine)] bg-white"
    >
      <div className="flex h-9 items-center justify-between bg-[var(--bg-inset)] px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
        <span>{archiveNumber}</span>
        <span>
          색인 #{String(index + 1).padStart(3, "0")}
        </span>
      </div>
      <div className="grid gap-0 sm:grid-cols-[142px_1fr]">
        <SpecimenImage
          src={item.imageUrl}
          alt={item.name}
          className="aspect-[4/3] border-b border-[var(--border-fine)] sm:h-full sm:border-b-0 sm:border-r"
          imageClassName="transition duration-300 group-hover:scale-[1.025]"
        />
        <div className="relative min-h-52 p-5">
          <span className="pointer-events-none absolute left-3 top-8 font-display text-[60px] leading-none text-[var(--accent-signal)] opacity-15">
            "
          </span>
          <p className="font-display text-[var(--text-lg)] font-medium tracking-[-0.02em] text-[var(--ink-primary)]">
            {item.name}
          </p>
          <p className="mt-4 line-clamp-4 font-mono text-[13px] font-light leading-[1.8] text-[var(--ink-secondary)]">
            {item.description}
          </p>
          <div className="mt-5 border-t border-dashed border-[var(--border-fine)] pt-4 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
            <span className="font-medium text-[var(--ink-primary)]">
              {item.firstRecorderName}
            </span>
            <span className="mx-2">·</span>
            <span>{formatKoreanDate(createdAt)}</span>
            <span className="mx-2">·</span>
            <span>기억 {item.memoryCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function HomePageClient({
  recentItems,
  stats
}: {
  recentItems: HomeRecentItem[];
  stats: HomeStats;
}) {
  const statItems = [
    {
      index: "01 /",
      label: "총 소장 기록",
      code: "TOTAL RECORDS",
      value: stats.itemCount,
      unit: "건",
      href: "/search"
    },
    {
      index: "02 /",
      label: "최초 등록자 수",
      code: "FIRST KEEPERS",
      value: stats.firstRecorderCount,
      unit: "명",
      href: "/search"
    },
    {
      index: "03 /",
      label: "누적 기억 기록",
      code: "MEMORY LEDGER",
      value: stats.memoryCount,
      unit: "증언",
      href: "/search"
    }
  ];

  return (
    <div className="bg-[var(--bg-base)] text-[var(--ink-primary)]">
      <section className="hero relative overflow-hidden border-b border-[var(--border-fine)]">
        <div className="archive-container animate-in w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 border-b border-[var(--border-medium)] pb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
              <span className="h-2 w-2 bg-[var(--accent-signal)]" />
              [OPEN OBJECT REGISTRY]
            </div>
            <h1 className="mt-8 max-w-5xl font-display text-[var(--text-hero)] font-black leading-none tracking-[-0.04em] text-[var(--ink-primary)]">
              <span className="font-black">오늘의 물건은</span>
              <br />
              <span className="font-light tracking-tight">내일의 자료가 됩니다.</span>
            </h1>
            <p className="mt-8 max-w-3xl text-[var(--text-base)] font-light leading-[1.9] text-[var(--ink-secondary)]">
              지구물건보관소는 지금 존재하는 물건의 이름, 모습, 해설과 기억을
              기록하는 오픈 아카이브입니다.
            </p>

            <div className="mt-9 max-w-2xl">
              <SearchBar
                className="flex-col gap-3 sm:flex-row"
                inputClassName="h-12 rounded-none border-[var(--border-medium)] bg-white/70 font-mono text-sm text-[var(--ink-primary)] focus-visible:ring-[var(--ink-muted)]"
                buttonClassName="btn-primary h-12 rounded-none bg-[var(--ink-primary)] px-7 font-mono text-xs uppercase tracking-widest text-[var(--bg-base)] hover:bg-[var(--ink-primary)]"
                placeholder="식별 번호, 물건 명칭, 또는 기록 해설로 조회..."
                buttonText="조회"
              />
              <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/items/new"
                  className="btn-primary inline-flex min-h-11 items-center justify-center bg-[var(--ink-primary)] px-6 font-mono text-xs uppercase tracking-widest text-[var(--bg-base)]"
                >
                  <span>기초 기록 수립하기</span>
                </Link>
                <Link
                  href="/search"
                  className="inline-flex min-h-11 items-center justify-center border border-[var(--border-medium)] px-6 font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] transition hover:border-[var(--accent-signal)] hover:text-[var(--accent-signal)]"
                >
                  최근 기록 살펴보기 →
                </Link>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-[-1.5rem] rotate-45 font-mono text-5xl uppercase leading-none tracking-widest text-[var(--ink-primary)] opacity-[0.06] md:right-16 md:text-7xl">
            Specimen
            <br />
            EST.2026
            <br />
            ARK-∞
          </div>
        </div>

        <div className="archive-container animate-in delay-1 pb-12">
          <VaultStatusLog />
        </div>
      </section>

      <section className="animate-in delay-2 border-y border-[var(--border-fine)] bg-[var(--bg-surface)]">
        <div className="archive-container grid py-14 sm:grid-cols-3">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="border-t border-[var(--border-fine)] py-8 sm:border-t-0 sm:px-8 sm:py-4 sm:[&:not(:first-child)]:border-l"
            >
              <p className="font-mono text-xs font-medium text-[var(--accent-signal)]">
                {stat.index}
              </p>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-[var(--ink-muted)]">
                {stat.code}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-[64px] leading-none tracking-[-0.03em] text-[var(--ink-primary)]">
                  {displayCount(stat.value)}
                </span>
                {stat.value > 0 && stat.unit ? (
                  <span className="pb-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-muted)]">
                    {stat.unit}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-[var(--ink-secondary)]">{stat.label}</p>
              <Link
                href={stat.href}
                className="mt-6 inline-flex font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] transition hover:text-[var(--accent-signal)]"
              >
                전체 조회 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="archive-container section-spacious animate-in delay-3">
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="border-l-[3px] border-[var(--accent-signal)] pl-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)]">
              Recently Accessioned Objects
            </p>
            <h2 className="mt-2 font-display text-[var(--text-2xl)] font-semibold text-[var(--ink-primary)]">
              최근 소장품에 보태진 기록들
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--text-base)] font-light leading-[1.9] text-[var(--ink-secondary)]">
              공개 기록물 아래에 채워진 개별 주관적 역사입니다.
            </p>
          </div>
          <Link
            href="/search"
            className="font-mono text-xs uppercase tracking-widest text-[var(--ink-secondary)] transition hover:text-[var(--accent-signal)]"
          >
            소장 기록 전체 →
          </Link>
        </div>

        {recentItems.length > 0 ? (
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))]">
            {recentItems.map((item, index) => (
              <RecentArchiveCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="아직 보관소에 등록된 자료가 없습니다."
            description="첫 번째 소장 기록을 생성할 수 있습니다. 보관소는 아직 조용하지만, 업무는 시작될 준비가 되어 있습니다."
          >
            <Button asChild className="rounded-none bg-stone-900 text-stone-50 hover:bg-stone-800">
              <Link href="/items/new">신규 소장 기록 생성</Link>
            </Button>
          </EmptyState>
        )}
      </section>

      <section className="archive-container pb-20 md:pb-32">
        <div className="relative overflow-hidden bg-[var(--ink-primary)] px-6 py-12 text-[var(--bg-base)] md:px-12 md:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 opacity-[0.05]">
            <svg viewBox="0 0 320 320" fill="none" aria-hidden="true">
              {[44, 78, 112, 146].map((radius) => (
                <circle
                  key={radius}
                  cx="160"
                  cy="160"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="1"
                />
              ))}
            </svg>
          </div>
          <p className="absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--bg-base)] opacity-10 md:block">
            A·R·K·I·V
          </p>
          <div className="relative max-w-3xl md:pl-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-signal)]">
              ACQUISITION CODE OF CONDUCT
            </p>
            <h2 className="mt-4 font-display text-[var(--text-2xl)] font-semibold leading-tight text-[var(--bg-base)]">
              보편적 사물의 기초 서식
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--text-base)] font-light leading-[1.9] text-[rgba(247,245,239,0.65)]">
              어제 먹은 가공 음료의 빈 병, 책상 구석에 방치된 오래된 볼펜,
              서랍 속 잠자던 아날로그 스마트폰까지. 우리 시대의 평범한 문화
              유산을 소장품 기록지로 영원히 박제할 수 있는 권한을 제공합니다.
            </p>
            <Link
              href="/items/new"
              className="mt-8 inline-flex min-h-11 items-center justify-center bg-[var(--accent-signal)] px-7 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-[#d75b40]"
            >
              신규 기초 소장 서식 수립
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
