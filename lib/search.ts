import "server-only";

import { prisma } from "@/lib/prisma";

export async function searchItems(query: string, limit = 24) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
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

  return prisma.item.findMany({
    take: limit,
    where: {
      OR: [
        {
          name: {
            contains: trimmedQuery,
            mode: "insensitive"
          }
        },
        {
          brand: {
            contains: trimmedQuery,
            mode: "insensitive"
          }
        }
      ]
    },
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
