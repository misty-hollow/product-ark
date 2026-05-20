export type CatalogNode = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  level: number;
  sortOrder: number;
  children: CatalogNode[];
};

export const CATALOG_TREE: CatalogNode[] = [
  {
    id: "cat-food",
    name: "식생활",
    slug: "food-life",
    description: "일상에서 먹고 마시고 보관하는 식생활 관련 물건입니다.",
    level: 1,
    sortOrder: 10,
    children: [
      {
        id: "cat-food-drink",
        name: "음료",
        slug: "drink-materials",
        description: "마시는 형태로 유통되거나 소비되는 식생활 물건입니다.",
        level: 2,
        sortOrder: 10,
        children: [
          {
            id: "cat-food-drink-milk",
            name: "가공유",
            slug: "milk-dairy",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-food-drink-soft",
            name: "탄산음료",
            slug: "soft-drinks",
            level: 3,
            sortOrder: 20,
            children: []
          },
          {
            id: "cat-food-drink-tea",
            name: "커피/차",
            slug: "tea-coffee",
            level: 3,
            sortOrder: 30,
            children: []
          }
        ]
      },
      {
        id: "cat-food-eat",
        name: "식품",
        slug: "eating-materials",
        description: "끼니, 간식, 면류처럼 먹는 형태로 소비되는 식생활 물건입니다.",
        level: 2,
        sortOrder: 20,
        children: [
          {
            id: "cat-food-eat-meal",
            name: "즉석식",
            slug: "convenience-meals",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-food-eat-snack",
            name: "간식",
            slug: "snacks",
            level: 3,
            sortOrder: 20,
            children: []
          },
          {
            id: "cat-food-eat-noodle",
            name: "라면",
            slug: "instant-noodles",
            level: 3,
            sortOrder: 30,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "cat-daily",
    name: "생활 도구",
    slug: "daily-tools",
    description: "가정, 개인 생활, 반복 노동에 쓰인 도구와 용품입니다.",
    level: 1,
    sortOrder: 20,
    children: [
      {
        id: "cat-daily-house",
        name: "가정 생활 도구",
        slug: "household-tools",
        description: "집 안에서 보관, 정리, 청소, 조리에 쓰인 물건입니다.",
        level: 2,
        sortOrder: 10,
        children: [
          {
            id: "cat-daily-house-clean",
            name: "청소/세탁",
            slug: "cleaning-laundry",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-daily-house-kitchen",
            name: "주방 도구",
            slug: "kitchen-tools",
            level: 3,
            sortOrder: 20,
            children: []
          },
          {
            id: "cat-daily-house-storage",
            name: "보관 용기",
            slug: "storage-containers",
            level: 3,
            sortOrder: 30,
            children: []
          }
        ]
      },
      {
        id: "cat-daily-personal",
        name: "개인 생활 도구",
        slug: "personal-care-tools",
        description: "위생, 미용, 휴대 행위와 관련된 물건입니다.",
        level: 2,
        sortOrder: 20,
        children: [
          {
            id: "cat-daily-personal-hygiene",
            name: "위생 용품",
            slug: "hygiene-goods",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-daily-personal-beauty",
            name: "미용 도구",
            slug: "beauty-tools",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "cat-digital",
    name: "전자/디지털 물건",
    slug: "digital-objects",
    description: "전기, 신호, 화면, 소리, 저장 매체를 포함한 현대 기술 자료입니다.",
    level: 1,
    sortOrder: 30,
    children: [
      {
        id: "cat-digital-sound",
        name: "소리/영상 장치",
        slug: "sound-visual-devices",
        description: "음향, 영상, 촬영, 표시 장치입니다.",
        level: 2,
        sortOrder: 10,
        children: [
          {
            id: "cat-digital-sound-earphone",
            name: "이어폰/헤드폰",
            slug: "earphones-headphones",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-digital-sound-camera",
            name: "카메라/화면 장치",
            slug: "camera-display-devices",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      },
      {
        id: "cat-digital-compute",
        name: "컴퓨팅 주변 자료",
        slug: "computing-materials",
        description: "휴대전화, 컴퓨터 주변기기, 충전/저장 매체입니다.",
        level: 2,
        sortOrder: 20,
        children: [
          {
            id: "cat-digital-compute-phone",
            name: "휴대전화",
            slug: "mobile-phones",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-digital-compute-cable",
            name: "충전/케이블",
            slug: "charging-cables",
            level: 3,
            sortOrder: 20,
            children: []
          },
          {
            id: "cat-digital-compute-storage",
            name: "저장 장치",
            slug: "storage-devices",
            level: 3,
            sortOrder: 30,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "cat-stationery",
    name: "기록/학습 도구",
    slug: "recording-learning-tools",
    description: "필기, 학습, 사무 기록 행위에 쓰인 물건입니다.",
    level: 1,
    sortOrder: 40,
    children: [
      {
        id: "cat-stationery-writing",
        name: "필기 도구",
        slug: "writing-tools",
        description: "손으로 기호를 남기는 도구입니다.",
        level: 2,
        sortOrder: 10,
        children: [
          {
            id: "cat-stationery-writing-pen",
            name: "펜/볼펜",
            slug: "pens-ballpoint-pens",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-stationery-writing-marker",
            name: "형광펜/마커",
            slug: "highlighters-markers",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      },
      {
        id: "cat-stationery-paper",
        name: "종이/정리 자료",
        slug: "paper-organizing-materials",
        description: "노트, 파일, 라벨 등 종이 기반 기록 보조물입니다.",
        level: 2,
        sortOrder: 20,
        children: [
          {
            id: "cat-stationery-paper-note",
            name: "노트/종이",
            slug: "notebooks-paper",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-stationery-paper-file",
            name: "파일/바인더",
            slug: "files-binders",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "cat-wear",
    name: "착용/휴대 물건",
    slug: "wear-carry-objects",
    description: "몸에 걸치거나 휴대하며 이동한 물건입니다.",
    level: 1,
    sortOrder: 50,
    children: [
      {
        id: "cat-wear-clothes",
        name: "의류와 신발",
        slug: "clothing-materials",
        description: "몸에 착용하는 의류, 신발, 기본 착장 물건입니다.",
        level: 2,
        sortOrder: 10,
        children: [
          {
            id: "cat-wear-clothes-top",
            name: "상의/하의",
            slug: "clothing-top-bottom",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-wear-clothes-shoes",
            name: "신발",
            slug: "shoes",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      },
      {
        id: "cat-wear-accessory",
        name: "휴대/착용 소품",
        slug: "wearable-accessories",
        description: "가방, 시계, 안경 등 휴대 또는 착용 소품입니다.",
        level: 2,
        sortOrder: 20,
        children: [
          {
            id: "cat-wear-accessory-bag",
            name: "가방",
            slug: "bags",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-wear-accessory-small",
            name: "시계/안경/소품",
            slug: "watches-glasses-accessories",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: "cat-etc",
    name: "기타 미분류 자료",
    slug: "uncategorized-materials",
    description: "현재 분류 체계에 정확히 귀속되지 않은 임시 자료입니다.",
    level: 1,
    sortOrder: 90,
    children: [
      {
        id: "cat-etc-temporary",
        name: "임시 보관 자료",
        slug: "temporary-holding-materials",
        description: "판단 보류 상태의 기초 자료입니다.",
        level: 2,
        sortOrder: 10,
        children: [
          {
            id: "cat-etc-temporary-unknown",
            name: "용도 불명",
            slug: "unknown-use",
            level: 3,
            sortOrder: 10,
            children: []
          },
          {
            id: "cat-etc-temporary-collection",
            name: "기념품/수집품",
            slug: "souvenirs-collectibles",
            level: 3,
            sortOrder: 20,
            children: []
          }
        ]
      }
    ]
  }
];

export function formatCategoryPath(parts: Array<string | null | undefined>) {
  const labels = parts.map((part) => part?.trim()).filter(Boolean);

  return labels.join(" > ");
}

export function findCatalogPathById(
  nodes: CatalogNode[],
  id: string,
  path: CatalogNode[] = []
): CatalogNode[] | null {
  for (const node of nodes) {
    const nextPath = [...path, node];

    if (node.id === id) return nextPath;

    const childPath = findCatalogPathById(node.children, id, nextPath);

    if (childPath) return childPath;
  }

  return null;
}

export type CategoryPathRecord = {
  name: string;
  parent: {
    name: string;
    parent: {
      name: string;
    } | null;
  } | null;
} | null;

export function formatCategoryRecordPath(
  category: CategoryPathRecord,
  legacyCategory?: string | null
) {
  if (!category) return legacyCategory ?? null;

  return formatCategoryPath([
    category.parent?.parent?.name,
    category.parent?.name,
    category.name
  ]);
}
