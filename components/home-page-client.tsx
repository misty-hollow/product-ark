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
      className="ark-card-flat card-lift group block overflow-hidden"
    >
      <div className="flex h-9 items-center justify-between bg-[var(--surface-inset)] px-4 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
        <span>{archiveNumber}</span>
        <span>색인 #{String(index + 1).padStart(3, "0")}</span>
      </div>
      <div className="space-y-4 p-4">
        <SpecimenImage
          src={item.imageUrl}
          alt={item.name}
          className="aspect-[4/3] border border-[var(--border-xs)]"
          imageClassName="transition duration-300 group-hover:scale-[1.025]"
        />
        <div>
          <span className="badge-ark">소장 기록</span>
          <p className="mt-4 font-serif text-[18px] font-medium tracking-[-0.02em] text-[var(--ink-0)]">
            {item.name}
          </p>
          <p className="mt-3 line-clamp-3 text-[13px] leading-[1.75] text-[var(--ink-2)]">
            {item.description}
          </p>
          <div className="mt-5 border-t border-dashed border-[var(--border-xs)] pt-4 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-3)]">
            <span className="font-medium text-[var(--ink-0)]">
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
    <div className="bg-[var(--surface-page)] text-[var(--ink-0)]">
      <section className="hero relative overflow-hidden border-b border-[var(--border-xs)]">
        <div className="ark-wrap anim-up w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 border-b border-[var(--border-md)] pb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)]">
              <span className="h-2 w-2 bg-[var(--accent-red)]" />
              [OPEN OBJECT REGISTRY]
            </div>
            <h1 className="mt-8 max-w-5xl font-serif text-[var(--t-hero)] font-bold leading-none tracking-[-0.045em] text-[var(--ink-0)]">
              <span className="font-bold">오늘의 물건은</span>
              <br />
              <span className="font-light tracking-tight text-[var(--ink-2)]">
                내일의 자료가 됩니다.
              </span>
            </h1>
            <p className="mt-8 max-w-3xl text-[var(--t-17)] font-light leading-[1.9] text-[var(--ink-2)]">
              지구물건보관소는 지금 존재하는 물건의 이름, 모습, 해설과 기억을 기록하는
              오픈 아카이브입니다.
            </p>

            <div className="mt-9 max-w-2xl">
              <SearchBar
                className="flex-col gap-3 sm:flex-row"
                inputClassName="input-ark h-12 bg-[var(--surface-card)] font-mono text-sm"
                buttonClassName="btn-ark-primary h-12 w-full sm:w-auto"
                placeholder="식별 번호, 물건 명칭, 또는 기록 해설로 조회..."
                buttonText="조회"
              />
              <div className="mt-5 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/items/new"
                  className="btn-ark-primary"
                >
                  신규 소장 기록 생성
                </Link>
                <Link
                  href="/search"
                  className="btn-ark-ghost"
                >
                  소장 기록 조회 →
                </Link>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-[-1.5rem] rotate-45 font-mono text-5xl uppercase leading-none tracking-widest text-[var(--ink-0)] opacity-[0.06] md:right-16 md:text-7xl">
            Specimen
            <br />
            EST.2026
            <br />
            ARK-∞
          </div>
        </div>

        <div className="ark-wrap anim-up delay-100 pb-12">
          <VaultStatusLog />
        </div>
      </section>

      <section className="ark-wrap anim-up delay-200 py-14">
        <div className="grid grid-cols-1 gap-px bg-[var(--border-sm)] sm:grid-cols-3">
          {statItems.map((stat) => (
            <div
              key={stat.label}
              className="ark-card-flat p-6"
            >
              <p className="font-mono text-[var(--t-11)] font-medium text-[var(--accent-red)]">
                {stat.index}
              </p>
              <p className="label-mono mt-4">
                {stat.code}
              </p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-serif text-[clamp(2.5rem,10vw,4rem)] leading-none tracking-[-0.03em] text-[var(--ink-0)]">
                  {displayCount(stat.value)}
                </span>
                {stat.value > 0 && stat.unit ? (
                  <span className="pb-2 font-mono text-xs uppercase tracking-widest text-[var(--ink-3)]">
                    {stat.unit}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-sm text-[var(--ink-2)]">{stat.label}</p>
              <Link
                href={stat.href}
                className="mt-6 inline-flex font-mono text-[10px] uppercase tracking-widest text-[var(--ink-3)] transition hover:text-[var(--accent-red)]"
              >
                전체 조회 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="ark-wrap ark-section anim-up delay-300">
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="ark-accent-bar">
            <p className="label-mono">
              Recently Accessioned Objects
            </p>
            <h2 className="mt-2 font-serif text-[var(--t-36)] font-semibold text-[var(--ink-0)]">
              최근 편입된 소장 기록
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--t-17)] font-light leading-[1.9] text-[var(--ink-2)]">
              방금 전까지는 아무도 기록하지 않았던 물건들입니다.
            </p>
          </div>
          <Link
            href="/search"
            className="font-mono text-xs uppercase tracking-widest text-[var(--ink-2)] transition hover:text-[var(--accent-red)]"
          >
            소장 기록 전체 →
          </Link>
        </div>

        {recentItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentItems.map((item, index) => (
              <RecentArchiveCard key={item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="아직 보관소에 등록된 자료가 없습니다."
            description="첫 번째 소장 기록을 생성할 수 있습니다. 보관소는 아직 조용하지만 업무를 시작할 준비가 되어 있습니다."
          >
            <Button
              asChild
              className="btn-ark-primary"
            >
              <Link href="/items/new">신규 소장 기록 생성</Link>
            </Button>
          </EmptyState>
        )}
      </section>

      <section className="ark-wrap pb-20 md:pb-32">
        <div className="relative overflow-hidden bg-[var(--ink-0)] px-6 py-[clamp(4rem,8vw,7rem)] text-[var(--surface-page)] md:px-12">
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
          <p className="absolute left-4 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--surface-page)] opacity-10 md:block">
            A·R·K·I·V
          </p>
          <div className="relative max-w-3xl md:pl-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-red)]">
              ACQUISITION CODE OF CONDUCT
            </p>
            <h2 className="mt-4 font-serif text-[var(--t-36)] font-semibold leading-tight text-[var(--surface-card)]">
              보편적 사물의 기초 서식
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--t-15)] font-light leading-[1.9] text-[rgba(245,242,234,0.6)]">
              어제 마신 가공 음료의 빈 병, 책상 구석에 방치된 오래된 볼펜, 서랍 속
              잠자던 아날로그 스마트폰까지. 우리 시대의 평범한 문화 유산을 소장품
              기록지로 영구 보존할 수 있습니다.
            </p>
            <Link
              href="/items/new"
              className="mt-8 inline-flex min-h-11 items-center justify-center bg-[var(--accent-red)] px-7 font-mono text-xs uppercase tracking-widest text-white transition hover:bg-[var(--accent-red-hover)]"
            >
              신규 기초 소장 서식 수립
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
