import { HomePageClient } from "@/components/home-page-client";
import { getArchiveStats, getRecentItems } from "@/lib/items";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [recentItems, stats] = await Promise.all([getRecentItems(6), getArchiveStats()]);

  return (
    <HomePageClient
      stats={stats}
      recentItems={recentItems.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        createdAt: item.createdAt.toISOString(),
        firstRecorderName: item.firstRecorder.name,
        memoryCount: item._count?.memories ?? 0
      }))}
    />
  );
}
