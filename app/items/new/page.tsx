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
    <div className="mx-auto w-full max-w-3xl bg-[#FAF9F5] px-4 py-10 text-stone-800">
      <div className="mb-7 space-y-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
            New Registry Entry
          </p>
          <h1 className="mt-1 text-3xl font-semibold">신규 소장 기록 생성</h1>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            아직 보관소에 등록되지 않은 개체에 대한 기초 아카이브 자료를
            작성합니다. 작성된 기록은 보관소의 신규 자료로 편입됩니다.
          </p>
        </div>
        <div className="border-l-2 border-stone-400 bg-stone-100 p-4 text-xs leading-6 text-stone-600">
          주의: 등록 대상은 현대 일상에서 관찰 가능한 실물이어야 합니다. 입력
          정보는 고증의 관점에서 사실에 기반해 차분히 작성해 주십시오.
        </div>
      </div>
      <ItemForm initialName={initialName} />
    </div>
  );
}
