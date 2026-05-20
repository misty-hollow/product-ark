import "server-only";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("ko-KR");
}

export function slugBaseFromName(name: string) {
  const base = name
    .trim()
    .toLocaleLowerCase("ko-KR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return base || "item";
}

function isUniqueSlugError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002" &&
    Array.isArray(error.meta?.target) &&
    error.meta.target.includes("slug")
  );
}

type CreateItemInput = {
  name: string;
  description: string;
  imageUrl: string;
  category?: string | null;
  brand?: string | null;
  firstRecorderId: string;
};

export async function createItemWithUniqueSlug(input: CreateItemInput) {
  const baseSlug = slugBaseFromName(input.name);
  const normalizedName = normalizeName(input.name);

  for (let attempt = 1; attempt <= 50; attempt += 1) {
    const slug = attempt === 1 ? baseSlug : `${baseSlug}-${attempt}`;

    try {
      return await prisma.item.create({
        data: {
          name: input.name,
          slug,
          normalizedName,
          description: input.description,
          imageUrl: input.imageUrl,
          category: input.category || null,
          brand: input.brand || null,
          firstRecorderId: input.firstRecorderId
        },
        include: {
          firstRecorder: true
        }
      });
    } catch (error) {
      if (isUniqueSlugError(error)) {
        continue;
      }

      throw error;
    }
  }

  throw new Error("고유한 기록 주소를 만들지 못했습니다.");
}

export async function findPotentialDuplicateByName(name: string) {
  const normalizedName = normalizeName(name);

  if (!normalizedName) return null;

  return prisma.item.findFirst({
    where: { normalizedName },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      firstRecorder: {
        select: {
          name: true
        }
      }
    }
  });
}

export async function getRecentItems(limit = 6) {
  return prisma.item.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      firstRecorder: true,
      _count: {
        select: {
          memories: true
        }
      }
    }
  });
}

export async function getItemById(id: string) {
  return prisma.item.findUnique({
    where: { id },
    include: {
      firstRecorder: true,
      memories: {
        orderBy: { createdAt: "asc" },
        include: {
          user: true
        }
      }
    }
  });
}

export async function hasUserReportedItem(itemId: string, userId: string) {
  const report = await prisma.report.findUnique({
    where: {
      itemId_userId: {
        itemId,
        userId
      }
    },
    select: {
      id: true
    }
  });

  return Boolean(report);
}

export async function getArchiveStats() {
  const [itemCount, firstRecorderCount, memoryCount] = await Promise.all([
    prisma.item.count(),
    prisma.user.count({
      where: {
        items: {
          some: {}
        }
      }
    }),
    prisma.memory.count()
  ]);

  return {
    itemCount,
    firstRecorderCount,
    memoryCount
  };
}

export async function getUserProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          firstRecorder: true,
          _count: {
            select: {
              memories: true
            }
          }
        }
      },
      _count: {
        select: {
          items: true,
          memories: true
        }
      }
    }
  });
}
