UPDATE "Category"
SET "name" = '식생활',
    "description" = '일상에서 먹고 마시고 보관하는 식생활 관련 물건입니다.',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food';

UPDATE "Category"
SET "name" = '음료',
    "description" = '마시는 형태로 유통되거나 소비되는 식생활 물건입니다.',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-drink';

UPDATE "Category"
SET "name" = '식품',
    "description" = '끼니, 간식, 면류처럼 먹는 형태로 소비되는 식생활 물건입니다.',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-eat';

UPDATE "Category"
SET "name" = '가공유',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-drink-milk';

UPDATE "Category"
SET "name" = '탄산음료',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-drink-soft';

UPDATE "Category"
SET "name" = '커피/차',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-drink-tea';

UPDATE "Category"
SET "name" = '즉석식',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-eat-meal';

UPDATE "Category"
SET "name" = '간식',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-eat-snack';

UPDATE "Category"
SET "name" = '라면',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-food-eat-noodle';

UPDATE "Category"
SET "name" = '의류와 신발',
    "description" = '몸에 착용하는 의류, 신발, 기본 착장 물건입니다.',
    "updatedAt" = CURRENT_TIMESTAMP
WHERE "id" = 'cat-wear-clothes';
