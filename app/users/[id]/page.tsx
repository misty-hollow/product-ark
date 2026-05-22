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
    <div className="archive-container bg-[var(--bg-base)] py-10 text-[var(--ink-primary)] md:py-16">
      <UserProfileCard user={user} />

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-4 border-l-[3px] border-[var(--accent-signal)] pl-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="label">Keeper Ledger</p>
            <h2 className="mt-2 text-[var(--text-2xl)] font-semibold">
              등록한 소장 기록
            </h2>
          </div>
          {id === userId ? (
            <Button
              asChild
              className="rounded-none bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]"
            >
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
            description="식별 가능한 자료가 있다면 신규 기초 기록으로 보관소에 보탤 수 있습니다."
          >
            {id === userId ? (
              <Button
                asChild
                className="rounded-none bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]"
              >
                <Link href="/items/new">신규 소장 기록 생성</Link>
              </Button>
            ) : null}
          </EmptyState>
        )}
      </section>
    </div>
  );
}
