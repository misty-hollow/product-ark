CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "level" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Item" ADD COLUMN "primaryCategoryId" TEXT;

CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
CREATE INDEX "Category_parentId_idx" ON "Category"("parentId");
CREATE INDEX "Category_level_idx" ON "Category"("level");
CREATE INDEX "Category_sortOrder_idx" ON "Category"("sortOrder");
CREATE INDEX "Item_primaryCategoryId_idx" ON "Item"("primaryCategoryId");

ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Item" ADD CONSTRAINT "Item_primaryCategoryId_fkey" FOREIGN KEY ("primaryCategoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Category" ("id", "name", "slug", "description", "level", "sortOrder", "parentId", "updatedAt") VALUES
('cat-food', '식생활 자료', 'food-life', '먹고 마시는 행위와 관련된 일상 물질문화 자료입니다.', 1, 10, NULL, CURRENT_TIMESTAMP),
('cat-daily', '생활 도구', 'daily-tools', '가정, 개인 생활, 반복 노동에 쓰인 도구와 용품입니다.', 1, 20, NULL, CURRENT_TIMESTAMP),
('cat-digital', '전자/디지털 물건', 'digital-objects', '전기, 신호, 화면, 소리, 저장 매체를 포함한 현대 기술 자료입니다.', 1, 30, NULL, CURRENT_TIMESTAMP),
('cat-stationery', '기록/학습 도구', 'recording-learning-tools', '필기, 학습, 사무 기록 행위에 쓰인 물건입니다.', 1, 40, NULL, CURRENT_TIMESTAMP),
('cat-wear', '착용/휴대 물건', 'wear-carry-objects', '몸에 걸치거나 휴대하며 이동한 물건입니다.', 1, 50, NULL, CURRENT_TIMESTAMP),
('cat-etc', '기타 미분류 자료', 'uncategorized-materials', '현재 분류 체계에 정확히 귀속되지 않은 임시 자료입니다.', 1, 90, NULL, CURRENT_TIMESTAMP),

('cat-food-drink', '마시는 자료', 'drink-materials', '음료, 유제품, 마실 수 있는 가공품입니다.', 2, 10, 'cat-food', CURRENT_TIMESTAMP),
('cat-food-eat', '먹는 자료', 'eating-materials', '간편식, 간식, 면류 등 섭취 대상 자료입니다.', 2, 20, 'cat-food', CURRENT_TIMESTAMP),
('cat-daily-house', '가정 생활 도구', 'household-tools', '집 안에서 보관, 정리, 청소, 조리에 쓰인 물건입니다.', 2, 10, 'cat-daily', CURRENT_TIMESTAMP),
('cat-daily-personal', '개인 생활 도구', 'personal-care-tools', '위생, 미용, 휴대 행위와 관련된 물건입니다.', 2, 20, 'cat-daily', CURRENT_TIMESTAMP),
('cat-digital-sound', '소리/영상 장치', 'sound-visual-devices', '음향, 영상, 촬영, 표시 장치입니다.', 2, 10, 'cat-digital', CURRENT_TIMESTAMP),
('cat-digital-compute', '컴퓨팅 주변 자료', 'computing-materials', '휴대전화, 컴퓨터 주변기기, 충전/저장 매체입니다.', 2, 20, 'cat-digital', CURRENT_TIMESTAMP),
('cat-stationery-writing', '필기 도구', 'writing-tools', '손으로 기호를 남기는 도구입니다.', 2, 10, 'cat-stationery', CURRENT_TIMESTAMP),
('cat-stationery-paper', '종이/정리 자료', 'paper-organizing-materials', '노트, 파일, 라벨 등 종이 기반 기록 보조물입니다.', 2, 20, 'cat-stationery', CURRENT_TIMESTAMP),
('cat-wear-clothes', '입는 자료', 'clothing-materials', '의류와 신발 등 착용 대상 자료입니다.', 2, 10, 'cat-wear', CURRENT_TIMESTAMP),
('cat-wear-accessory', '휴대/착용 소품', 'wearable-accessories', '가방, 시계, 안경 등 휴대 또는 착용 소품입니다.', 2, 20, 'cat-wear', CURRENT_TIMESTAMP),
('cat-etc-temporary', '임시 보관 자료', 'temporary-holding-materials', '판단 보류 상태의 기초 자료입니다.', 2, 10, 'cat-etc', CURRENT_TIMESTAMP),

('cat-food-drink-milk', '우유/유제품', 'milk-dairy', NULL, 3, 10, 'cat-food-drink', CURRENT_TIMESTAMP),
('cat-food-drink-soft', '탄산/음료', 'soft-drinks', NULL, 3, 20, 'cat-food-drink', CURRENT_TIMESTAMP),
('cat-food-drink-tea', '차/커피', 'tea-coffee', NULL, 3, 30, 'cat-food-drink', CURRENT_TIMESTAMP),
('cat-food-eat-meal', '간편식', 'convenience-meals', NULL, 3, 10, 'cat-food-eat', CURRENT_TIMESTAMP),
('cat-food-eat-snack', '과자/간식', 'snacks', NULL, 3, 20, 'cat-food-eat', CURRENT_TIMESTAMP),
('cat-food-eat-noodle', '라면/면류', 'instant-noodles', NULL, 3, 30, 'cat-food-eat', CURRENT_TIMESTAMP),
('cat-daily-house-clean', '청소/세탁', 'cleaning-laundry', NULL, 3, 10, 'cat-daily-house', CURRENT_TIMESTAMP),
('cat-daily-house-kitchen', '주방 도구', 'kitchen-tools', NULL, 3, 20, 'cat-daily-house', CURRENT_TIMESTAMP),
('cat-daily-house-storage', '보관 용기', 'storage-containers', NULL, 3, 30, 'cat-daily-house', CURRENT_TIMESTAMP),
('cat-daily-personal-hygiene', '위생 용품', 'hygiene-goods', NULL, 3, 10, 'cat-daily-personal', CURRENT_TIMESTAMP),
('cat-daily-personal-beauty', '미용 도구', 'beauty-tools', NULL, 3, 20, 'cat-daily-personal', CURRENT_TIMESTAMP),
('cat-digital-sound-earphone', '이어폰/헤드폰', 'earphones-headphones', NULL, 3, 10, 'cat-digital-sound', CURRENT_TIMESTAMP),
('cat-digital-sound-camera', '카메라/화면 장치', 'camera-display-devices', NULL, 3, 20, 'cat-digital-sound', CURRENT_TIMESTAMP),
('cat-digital-compute-phone', '휴대전화', 'mobile-phones', NULL, 3, 10, 'cat-digital-compute', CURRENT_TIMESTAMP),
('cat-digital-compute-cable', '충전/케이블', 'charging-cables', NULL, 3, 20, 'cat-digital-compute', CURRENT_TIMESTAMP),
('cat-digital-compute-storage', '저장 장치', 'storage-devices', NULL, 3, 30, 'cat-digital-compute', CURRENT_TIMESTAMP),
('cat-stationery-writing-pen', '펜/볼펜', 'pens-ballpoint-pens', NULL, 3, 10, 'cat-stationery-writing', CURRENT_TIMESTAMP),
('cat-stationery-writing-marker', '형광펜/마커', 'highlighters-markers', NULL, 3, 20, 'cat-stationery-writing', CURRENT_TIMESTAMP),
('cat-stationery-paper-note', '노트/종이', 'notebooks-paper', NULL, 3, 10, 'cat-stationery-paper', CURRENT_TIMESTAMP),
('cat-stationery-paper-file', '파일/바인더', 'files-binders', NULL, 3, 20, 'cat-stationery-paper', CURRENT_TIMESTAMP),
('cat-wear-clothes-top', '상의/하의', 'clothing-top-bottom', NULL, 3, 10, 'cat-wear-clothes', CURRENT_TIMESTAMP),
('cat-wear-clothes-shoes', '신발', 'shoes', NULL, 3, 20, 'cat-wear-clothes', CURRENT_TIMESTAMP),
('cat-wear-accessory-bag', '가방', 'bags', NULL, 3, 10, 'cat-wear-accessory', CURRENT_TIMESTAMP),
('cat-wear-accessory-small', '시계/안경/소품', 'watches-glasses-accessories', NULL, 3, 20, 'cat-wear-accessory', CURRENT_TIMESTAMP),
('cat-etc-temporary-unknown', '용도 불명', 'unknown-use', NULL, 3, 10, 'cat-etc-temporary', CURRENT_TIMESTAMP),
('cat-etc-temporary-collection', '기념품/수집품', 'souvenirs-collectibles', NULL, 3, 20, 'cat-etc-temporary', CURRENT_TIMESTAMP);
