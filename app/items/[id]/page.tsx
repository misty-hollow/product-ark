import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarDays, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MemoryForm } from "@/components/memory-form";
import { MemoryList } from "@/components/memory-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getItemById } from "@/lib/items";
import { formatKoreanDate } from "@/lib/format";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ItemDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    created?: string;
  }>;
};

export default async function ItemDetailPage({
  params,
  searchParams
}: ItemDetailPageProps) {
  const [{ id }, query, { userId }] = await Promise.all([
    params,
    searchParams,
    auth()
  ]);
  const item = await getItemById(id);

  if (!item) {
    notFound();
  }

  const created = query.created === "1";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {created ? (
        <div className="mb-5 rounded-lg border border-primary/25 bg-accent p-4 text-sm font-semibold text-primary">
          <CheckCircle2 className="mr-2 inline h-4 w-4" aria-hidden="true" />
          최초 기록 성공. 이 상품은 이제 지구 상품 도감에 보존되었습니다.
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
            <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="space-y-6 rounded-lg border bg-card p-5 shadow-sm">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {item.category ? <Badge variant="secondary">{item.category}</Badge> : null}
              {item.brand ? <Badge variant="outline">{item.brand}</Badge> : null}
              <Badge variant="muted">slug: {item.slug}</Badge>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold leading-tight md:text-4xl">
                {item.name}
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border bg-background p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                최초 기록자
              </p>
              <Link
                href={`/users/${item.firstRecorder.id}`}
                className="text-xl font-bold hover:text-primary"
              >
                {item.firstRecorder.name}
              </Link>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                기록일
              </p>
              <p className="text-xl font-bold">{formatKoreanDate(item.createdAt)}</p>
            </div>
          </div>

          <div className="rounded-lg bg-accent/70 p-4 text-sm leading-6">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
            {formatKoreanDate(item.createdAt)} 지구 도감에 처음 보존됨. 이 상품은
            지구물건보관소에 보존되었습니다.
          </div>
        </section>
      </div>

      <section className="mt-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold text-primary">기억 보태기</p>
          <h2 className="mt-1 text-2xl font-bold">이 물건에 남겨진 기억</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            기억은 평점이 아닙니다. 이 물건을 봤던 순간이나 알고 있는 이야기를
            가볍게 남깁니다.
          </p>
        </div>
        <div className="space-y-4">
          {userId ? (
            <MemoryForm itemId={item.id} />
          ) : (
            <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
              로그인하면 이 물건에 기억을 남길 수 있습니다.
              <div className="mt-3">
                <SignInButton mode="modal">
                  <Button>로그인하기</Button>
                </SignInButton>
              </div>
            </div>
          )}
          <MemoryList memories={item.memories} />
        </div>
      </section>
    </div>
  );
}
