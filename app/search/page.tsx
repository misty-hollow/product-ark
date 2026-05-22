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
    <div className="archive-container section-spacious bg-[#FAF9F5] text-stone-800">
      <div className="mb-10 space-y-5 border-l-[3px] border-[var(--accent-signal)] pl-5">
        <div>
          <p className="label">
            Archive Search
          </p>
          <h1 className="mt-2 text-[var(--text-2xl)] font-semibold">
            {query ? `"${query}"에 대한 소장 기록` : "소장 기록 조회"}
          </h1>
        </div>
        <SearchBar
          defaultQuery={query}
          className="max-w-2xl flex-col sm:flex-row"
          inputClassName="rounded-none bg-white/70"
          buttonClassName="rounded-none bg-stone-900 hover:bg-stone-800"
        />
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="검색된 소장 기록이 없습니다."
          description="아직 보관소가 이 물건을 모르는 상태입니다. 식별 가능한 자료가 있다면 신규 기초 기록으로 등록할 수 있습니다. 발견자는 기록자가 될 수 있습니다."
        >
          <Button asChild className="rounded-none bg-stone-900 text-stone-50 hover:bg-stone-800">
            <Link href={`/items/new?name=${encodeURIComponent(query)}`}>
              신규 소장 기록 생성
            </Link>
          </Button>
        </EmptyState>
      )}
    </div>
  );
}
