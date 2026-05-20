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
    <div className="mx-auto w-full max-w-6xl bg-[#FAF9F5] px-4 py-8 text-stone-800">
      <UserProfileCard user={user} />

      <section className="mt-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Keeper Ledger
            </p>
            <h2 className="mt-1 text-2xl font-semibold">등록한 소장 기록</h2>
          </div>
          {id === userId ? (
            <Button asChild className="bg-stone-800 text-stone-50 hover:bg-stone-700">
              <Link href="/items/new">신규 소장 기록 생성</Link>
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
            title="아직 등록한 소장 기록이 없습니다."
            description="식별 가능한 자료가 있다면 신규 기초 기록을 생성할 수 있습니다."
          >
            {id === userId ? (
              <Button asChild className="bg-stone-800 text-stone-50 hover:bg-stone-700">
                <Link href="/items/new">신규 소장 기록 생성</Link>
              </Button>
            ) : null}
          </EmptyState>
        )}
      </section>
    </div>
  );
}
