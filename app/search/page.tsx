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
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8 space-y-4">
        <div>
          <p className="text-sm font-semibold text-primary">도감 검색</p>
          <h1 className="mt-1 text-3xl font-bold">
            {query ? `"${query}" 기록을 찾고 있습니다` : "최근 보존된 물건"}
          </h1>
        </div>
        <SearchBar defaultQuery={query} className="max-w-2xl" />
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="아직 기록되지 않은 상품입니다."
          description="당신이 최초 기록자가 될 수 있어요. 사진과 한 줄 설명으로 이 물건을 지구 도감에 남겨보세요."
        >
          <Button asChild>
            <Link href={`/items/new?name=${encodeURIComponent(query)}`}>
              최초 기록하기
            </Link>
          </Button>
        </EmptyState>
      )}
    </div>
  );
}
