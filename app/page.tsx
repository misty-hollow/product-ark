import { Archive, Search, UsersRound } from "lucide-react";
import Link from "next/link";

import { ItemCard } from "@/components/item-card";
import { SearchBar } from "@/components/search-bar";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { VaultStatusLog } from "@/components/vault-status-log";
import { getArchiveStats, getRecentItems } from "@/lib/items";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [recentItems, stats] = await Promise.all([getRecentItems(6), getArchiveStats()]);

  return (
    <div className="bg-[#FAF9F5] pb-16 text-stone-800">
      <section className="archive-grid border-b border-stone-200">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 text-center md:py-20">
          <div className="mx-auto max-w-4xl space-y-7">
            <div className="mx-auto inline-flex items-center rounded-md border border-stone-200 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 shadow-sm">
              Open Object Registry
            </div>
            <div className="space-y-4">
              <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-stone-800 md:text-6xl">
                오늘의 물건은 내일의 자료가 됩니다.
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-stone-500 md:text-lg">
                지구물건보관소는 지금 존재하는 물건의 이름, 모습, 해설을 기록하여
                보존하는 오픈 아카이브입니다.
              </p>
            </div>
            <div className="mx-auto max-w-2xl space-y-4">
              <SearchBar />
              <div className="flex flex-col justify-center gap-2 sm:flex-row">
                <Button
                  asChild
                  className="bg-stone-800 px-5 py-2.5 text-sm text-stone-50 hover:bg-stone-700"
                >
                  <Link href="/items/new">신규 소장 기록 생성</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-stone-300 px-5 py-2.5 text-sm text-stone-600 hover:bg-stone-100"
                >
                  <Link href="/search">최근 기록 살펴보기</Link>
                </Button>
              </div>
            </div>
            <VaultStatusLog />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard
            icon={Archive}
            label="총 소장 기록"
            value={stats.itemCount}
            code="TOTAL RECORDS"
          />
          <StatCard
            icon={UsersRound}
            label="최초 등록자 수"
            value={stats.firstRecorderCount}
            code="FIRST KEEPERS"
          />
          <StatCard
            icon={Search}
            label="누적 기억 기록"
            value={stats.memoryCount}
            code="MEMORY LEDGER"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Recent Exhibits
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-stone-800">
              최근 편입된 소장 기록
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              방금 전까지는 아무도 기록하지 않았던 물건들입니다.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-stone-300 text-stone-600 hover:bg-stone-100"
          >
            <Link href="/search">소장 기록 조회</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="border border-stone-300 bg-[#F4F1EA] p-6 shadow-none md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                Unregistered Object Notice
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-stone-800">
                아직 보관소에 없는 자료를 기초 기록으로 남겨보세요.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
                눈앞의 음료, 책상 위의 필기구, 오래 쓰던 전자기기까지. 완벽한
                정보보다 첫 발견이 중요합니다.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="rounded-none bg-stone-900 px-6 font-mono text-xs tracking-widest text-stone-50 hover:bg-stone-800"
            >
              <Link href="/items/new">신규 소장 기록 생성</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
