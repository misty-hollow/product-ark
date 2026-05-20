import { PrismaClient } from "@prisma/client";

import {
  CATALOG_TREE,
  findCatalogPathById,
  formatCategoryPath,
  type CatalogNode
} from "../lib/catalog";

const prisma = new PrismaClient();

function normalizeName(name: string) {
  return name.trim().replace(/\s+/g, " ").toLocaleLowerCase("ko-KR");
}

function placeholderImage(label: string, color: string) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="960" height="720" viewBox="0 0 960 720">
  <rect width="960" height="720" fill="#f8f4ec"/>
  <rect x="96" y="80" width="768" height="560" rx="34" fill="${color}" opacity="0.16"/>
  <circle cx="480" cy="320" r="146" fill="${color}" opacity="0.42"/>
  <rect x="270" y="476" width="420" height="76" rx="22" fill="#ffffff" opacity="0.88"/>
  <text x="480" y="526" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#173b36">${label}</text>
</svg>`.trim();

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

type SeedCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  level: number;
  sortOrder: number;
  parentId: string | null;
};

function flattenCategories(
  nodes: CatalogNode[],
  parentId: string | null = null
): SeedCategory[] {
  return nodes.flatMap((node) => [
    {
      id: node.id,
      name: node.name,
      slug: node.slug,
      description: node.description ?? null,
      level: node.level,
      sortOrder: node.sortOrder,
      parentId
    },
    ...flattenCategories(node.children, node.id)
  ]);
}

function categoryPathById(categoryId: string) {
  const path = findCatalogPathById(CATALOG_TREE, categoryId);

  return path ? formatCategoryPath(path.map((node) => node.name)) : null;
}

async function main() {
  const categories = flattenCategories(CATALOG_TREE);

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        level: category.level,
        sortOrder: category.sortOrder,
        parentId: category.parentId,
        isActive: true
      },
      create: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        level: category.level,
        sortOrder: category.sortOrder,
        parentId: category.parentId,
        isActive: true
      }
    });
  }

  const recorder = await prisma.user.upsert({
    where: { id: "seed-user-earth-archive" },
    update: {},
    create: {
      id: "seed-user-earth-archive",
      name: "지구물건보관소",
      email: "seed@example.com",
      image: null
    }
  });

  const items = [
    {
      name: "바나나맛 우유",
      slug: "banana-milk",
      description: "한국에서 오래 사랑받은 단지 모양의 달콤한 우유입니다.",
      primaryCategoryId: "cat-food-drink-milk",
      brand: "빙그레",
      color: "#f1c84b"
    },
    {
      name: "신라면 컵",
      slug: "shin-ramyun-cup",
      description: "2020년대 한국 편의점에서 흔히 볼 수 있었던 매운 컵라면입니다.",
      primaryCategoryId: "cat-food-eat-noodle",
      brand: "농심",
      color: "#d84635"
    },
    {
      name: "삼각김밥",
      slug: "triangle-gimbap",
      description: "한국 편의점에서 빠르게 끼니를 해결할 때 먹던 삼각형 간편식입니다.",
      primaryCategoryId: "cat-food-eat-meal",
      brand: "편의점",
      color: "#3d6f56"
    },
    {
      name: "유선 이어폰",
      slug: "wired-earphones",
      description: "무선 이어폰이 대중화되기 전 스마트폰과 음악기기에 연결해 쓰던 소리 도구입니다.",
      primaryCategoryId: "cat-digital-sound-earphone",
      brand: "기타",
      color: "#546a7b"
    },
    {
      name: "형광펜",
      slug: "highlighter",
      description: "학생들이 중요한 문장을 표시하기 위해 사용하던 밝은 색의 필기구입니다.",
      primaryCategoryId: "cat-stationery-writing-marker",
      brand: "기타",
      color: "#80b94d"
    }
  ];

  for (const item of items) {
    const category = categoryPathById(item.primaryCategoryId);

    await prisma.item.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        normalizedName: normalizeName(item.name),
        description: item.description,
        category,
        primaryCategoryId: item.primaryCategoryId,
        brand: item.brand,
        imageUrl: placeholderImage(item.name, item.color)
      },
      create: {
        name: item.name,
        slug: item.slug,
        normalizedName: normalizeName(item.name),
        description: item.description,
        category,
        primaryCategoryId: item.primaryCategoryId,
        brand: item.brand,
        imageUrl: placeholderImage(item.name, item.color),
        firstRecorderId: recorder.id
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
