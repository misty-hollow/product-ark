import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { EmptyState } from "@/components/empty-state";
import { ItemCard } from "@/components/item-card";
import { UserProfileCard } from "@/components/user-profile-card";
import { Button } from "@/components/ui/button";
import { requireCurrentUserInDb } from "@/lib/auth";
import { getUserProfile } from "@/lib/items";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserPage({ params }: UserPageProps) {
  const [{ id }, { userId }] = await Promise.all([params, auth()]);

  if (!userId) {
    redirect(`/sign-in?redirect_url=/users/${id}`);
  }

  let user = await getUserProfile(id);

  if (!user && id === userId) {
    await requireCurrentUserInDb();
    user = await getUserProfile(id);
  }

  if (!user) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <UserProfileCard user={user} />

      <section className="mt-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">보존한 물건</p>
            <h2 className="mt-1 text-2xl font-bold">최초 기록 목록</h2>
          </div>
          {id === userId ? (
            <Button asChild>
              <Link href="/items/new">새 기록 남기기</Link>
            </Button>
          ) : null}
        </div>

        {user.items.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {user.items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="아직 최초 기록이 없습니다."
            description="눈앞의 물건 하나를 지구 도감에 처음 남겨보세요."
          >
            {id === userId ? (
              <Button asChild>
                <Link href="/items/new">첫 기록 남기기</Link>
              </Button>
            ) : null}
          </EmptyState>
        )}
      </section>
    </div>
  );
}
