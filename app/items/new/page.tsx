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
    <div className="ark-wrap bg-[var(--surface-page)] py-10 text-[var(--ink-0)] md:py-16">
      <div className="mx-auto max-w-4xl">
        <NewItemPageIntro />
        <ItemForm initialName={initialName} categories={categoryTree} />
      </div>
    </div>
  );
}
