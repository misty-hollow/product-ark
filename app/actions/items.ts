"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { requireCurrentUserInDb } from "@/lib/auth";
import {
  createItemWithUniqueSlug,
  findPotentialDuplicateByName
} from "@/lib/items";
import { prisma } from "@/lib/prisma";

type CreateItemInput = {
  name: string;
  description: string;
  imageUrl: string;
  category?: string;
  brand?: string;
};

export async function checkItemNameAction(name: string) {
  const duplicate = await findPotentialDuplicateByName(name);

  if (!duplicate) {
    return {
      exists: false
    };
  }

  return {
    exists: true,
    item: duplicate
  };
}

export async function createItemAction(input: CreateItemInput) {
  const { userId } = await auth();

  if (!userId) {
    return {
      ok: false,
      error: "로그인 후 기록을 남길 수 있습니다."
    };
  }

  const name = input.name.trim();
  const description = input.description.trim();
  const category = input.category?.trim();
  const brand = input.brand?.trim();
  const imageUrl = input.imageUrl.trim();

  if (!name || !description || !imageUrl) {
    return {
      ok: false,
      error: "상품명, 대표 이미지, 한 줄 설명은 꼭 필요합니다."
    };
  }

  const duplicate = await findPotentialDuplicateByName(name);
  const user = await requireCurrentUserInDb();

  const item = await createItemWithUniqueSlug({
    name,
    description,
    imageUrl,
    category,
    brand,
    firstRecorderId: user.id
  });

  revalidatePath("/");
  revalidatePath("/search");
  revalidatePath(`/users/${user.id}`);

  return {
    ok: true,
    itemId: item.id,
    duplicateItemId: duplicate?.id ?? null
  };
}

export async function createMemoryAction(itemId: string, content: string) {
  const { userId } = await auth();

  if (!userId) {
    return {
      ok: false,
      error: "로그인 후 기억을 남길 수 있습니다."
    };
  }

  const trimmedContent = content.trim();

  if (trimmedContent.length < 2) {
    return {
      ok: false,
      error: "기억은 두 글자 이상 남겨주세요."
    };
  }

  if (trimmedContent.length > 500) {
    return {
      ok: false,
      error: "기억은 500자 이하로 남겨주세요."
    };
  }

  const item = await prisma.item.findUnique({
    where: { id: itemId },
    select: { id: true }
  });

  if (!item) {
    return {
      ok: false,
      error: "기록된 물건을 찾지 못했습니다."
    };
  }

  const user = await requireCurrentUserInDb();

  await prisma.memory.create({
    data: {
      itemId,
      userId: user.id,
      content: trimmedContent
    }
  });

  revalidatePath(`/items/${itemId}`);
  revalidatePath(`/users/${user.id}`);

  return {
    ok: true
  };
}
