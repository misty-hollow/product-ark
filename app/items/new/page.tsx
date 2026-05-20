import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { ItemForm } from "@/components/item-form";
import { NewItemPageIntro } from "@/components/new-item-page-intro";
import { getActiveCategoryTree } from "@/lib/categories";

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
  const categoryTree = await getActiveCategoryTree();

  return (
    <div className="mx-auto w-full max-w-3xl bg-[#FAF9F5] px-4 py-10 text-stone-900">
      <NewItemPageIntro />
      <ItemForm initialName={initialName} categories={categoryTree} />
    </div>
  );
}
