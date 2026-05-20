import "server-only";

import { CATALOG_TREE, type CatalogNode } from "@/lib/catalog";
import { prisma } from "@/lib/prisma";

type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  level: number;
  sortOrder: number;
  parentId: string | null;
};

function toCatalogTree(records: CategoryRecord[]): CatalogNode[] {
  const nodesById = new Map<string, CatalogNode>();
  const roots: CatalogNode[] = [];

  for (const record of records) {
    nodesById.set(record.id, {
      id: record.id,
      name: record.name,
      slug: record.slug,
      description: record.description ?? undefined,
      level: record.level,
      sortOrder: record.sortOrder,
      children: []
    });
  }

  for (const record of records) {
    const node = nodesById.get(record.id);
    if (!node) continue;

    if (record.parentId) {
      nodesById.get(record.parentId)?.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export async function getActiveCategoryTree() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: [{ level: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      level: true,
      sortOrder: true,
      parentId: true
    }
  });

  if (categories.length === 0) {
    return CATALOG_TREE;
  }

  return toCatalogTree(categories);
}
