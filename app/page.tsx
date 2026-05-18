import { Archive, Search, Sparkles, UsersRound } from "lucide-react";
import Link from "next/link";

import { ItemCard } from "@/components/item-card";
import { SearchBar } from "@/components/search-bar";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { getArchiveStats, getRecentItems } from "@/lib/items";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [recentItems, stats] = await Promise.all([getRecentItems(6), getArchiveStats()]);

  return (
    <div className="pb-16">
      <section className="archive-grid border-b">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              오늘의 물건을 미래의 도감에 남긴다
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal md:text-6xl">
                아직 아무도 기록하지 않은 물건이 있습니다.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                오늘 본 물건을 미래의 도감에 남겨보세요. 사진과 한 줄 설명만으로
                첫 기록을 시작할 수 있습니다.
              </p>
            </div>
            <div className="max-w-2xl space-y-3">
              <SearchBar />
              <div className="flex flex-wrap gap-2">
                <Button asChild variant="secondary">
                  <Link href="/items/new">기록 남기기</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/search">최근 기록 둘러보기</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-4 shadow-archive">
            <div className="aspect-[4/3] rounded-md bg-[linear-gradient(135deg,#e7f1ed,#f7efe0)] p-5">
              <div className="flex h-full flex-col justify-between rounded-md border bg-white/78 p-5">
                <div>
                  <p className="text-sm font-semibold text-primary">지구 도감 보존 카드</p>
                  <h2 className="mt-3 text-3xl font-bold">최초 기록자</h2>
                </div>
                <div className="space-y-3">
                  <div className="h-24 rounded-md bg-primary/12" />
                  <div className="h-3 w-2/3 rounded-full bg-primary/30" />
                  <div className="h-3 w-1/2 rounded-full bg-primary/20" />
                </div>
                <p className="text-sm leading-6 text-muted-foreground">
                  누군가의 작은 발견이 미래 세대에게 남는 도감 조각이 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          <StatCard icon={Archive} label="기록된 물건" value={stats.itemCount} />
          <StatCard
            icon={UsersRound}
            label="최초 기록자"
            value={stats.firstRecorderCount}
          />
          <StatCard icon={Search} label="남겨진 기억" value={stats.memoryCount} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">최근 보존된 물건</p>
            <h2 className="mt-1 text-2xl font-bold">새로 도감에 들어온 기록</h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/search">더 찾아보기</Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-semibold text-primary">아직 빈 페이지</p>
              <h2 className="mt-2 text-2xl font-bold">
                아직 아무도 기록하지 않은 물건을 찾아보세요.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                눈앞의 음료, 책상 위의 필기구, 오래 쓰던 전자기기까지. 완벽한
                정보보다 첫 발견이 중요합니다.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/items/new">최초 기록하기</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
