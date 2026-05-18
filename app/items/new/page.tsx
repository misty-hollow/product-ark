import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ItemForm } from "@/components/item-form";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type NewItemPageProps = {
  searchParams: Promise<{
    name?: string;
  }>;
};

export default async function NewItemPage({ searchParams }: NewItemPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/items/new");
  }

  const params = await searchParams;
  const initialName = typeof params.name === "string" ? params.name : "";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-7">
        <p className="text-sm font-semibold text-primary">최초 기록 남기기</p>
        <h1 className="mt-1 text-3xl font-bold">미래 도감에 물건을 보존하세요</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          첫 기록은 30초 안에 끝날 수 있어야 합니다. 꼭 필요한 것만 남겨주세요.
        </p>
      </div>
      <ItemForm initialName={initialName} />
    </div>
  );
}
