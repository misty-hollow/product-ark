import Link from "next/link";

import { EmptyState } from "@/components/empty-state";
import { ItemCard } from "@/components/item-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { searchItems } from "@/lib/search";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const items = await searchItems(query);
  return (
    <div className="ark-wrap ark-section bg-[var(--surface-page)] text-[var(--ink-0)]">
      <div className="mb-10 grid gap-6 border-l-[3px] border-[var(--accent-signal)] pl-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="label">Global Object Search Desk</p>
          <h1 className="mt-2 text-[var(--text-2xl)] font-semibold">
            {query ? `"${query}" 검색된 소장 기록` : "사물 색인 검색"}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--ink-secondary)]">
            {query
              ? "세계 아카이브 분류표와 최초 기록 장부에서 해당 명칭을 대조했습니다."
              : "소장 기록 조회를 위해 물건명 또는 제조사를 입력하십시오. 최근 편입 자료도 함께 열람할 수 있습니다."}
          </p>
        </div>
        <SearchBar
          defaultQuery={query}
          className="max-w-2xl flex-col sm:flex-row"
          inputClassName="rounded-none bg-white/70"
          buttonClassName="h-12 w-full rounded-none bg-[var(--ink-primary)] hover:bg-[var(--accent-signal)] sm:w-auto"
          placeholder="보관 사물 색인 명칭 입력... 예: 모나미 153 볼펜"
          buttonText="소장 기록 조회"
        />
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="anim-up"
              style={{ animationDelay: `${Math.min(index * 0.06, 0.3)}s` }}
            >
              <ItemCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="검색된 소장 기록이 없습니다."
          description="해당 물건은 아직 세계 아카이브 분류에 수록되지 않은 미개척 자산일 가능성이 큽니다. 신규 소장 기록을 수립하면 귀하가 해당 물건의 최초 기록자가 됩니다."
        >
          <Button
            asChild
            className="rounded-none bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]"
          >
            <Link href={`/items/new?name=${encodeURIComponent(query)}`}>
              신규 소장 기록 즉시 수립
            </Link>
          </Button>
        </EmptyState>
      )}
    </div>
  );
}
