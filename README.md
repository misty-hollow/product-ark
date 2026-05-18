# 지구물건보관소

오늘 본 물건을 미래의 도감에 남기는 상품 도감형 커뮤니티 MVP입니다.

이 서비스는 가격비교나 쇼핑몰이 아니라, 사용자가 세상에 존재하는 물건을 발견하고 사진과 한 줄 설명으로 보존하는 기록 놀이에 가깝습니다. 핵심 경험은 “최초 기록자”로 남는 것입니다.

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui 스타일 로컬 컴포넌트
- Prisma
- PostgreSQL
- Clerk
- Vercel Blob

## 로컬 실행

1. 의존성을 설치합니다.

```bash
npm install
```

2. 환경 변수를 준비합니다.

```bash
cp .env.example .env
```

3. PostgreSQL을 준비합니다.

Docker가 설치되어 있다면:

```bash
docker compose up -d
```

외부 PostgreSQL을 사용할 경우 `.env`의 `DATABASE_URL`만 교체하면 됩니다.

4. DB 마이그레이션과 seed를 실행합니다.

```bash
npm run db:migrate
npm run db:seed
```

5. 개발 서버를 실행합니다.

```bash
npm run dev
```

기본 주소는 `http://localhost:3000`입니다.

## 환경 변수

| 변수 | 설명 |
| --- | --- |
| `DATABASE_URL` | PostgreSQL 연결 문자열 |
| `NEXT_PUBLIC_APP_URL` | 앱 기본 URL |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Clerk 로그인 경로 |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Clerk 가입 경로 |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | 로그인 후 이동 경로 |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | 가입 후 이동 경로 |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob 서버 업로드 토큰 |

local dev에서 `BLOB_READ_WRITE_TOKEN`이 비어 있으면 업로드 이미지는 data URL로 DB에 저장됩니다. production에서는 이 값이 없으면 이미지 업로드가 실패하고 안내 메시지를 보여줍니다.

## Prisma

마이그레이션 생성 및 적용:

```bash
npm run db:migrate
```

배포 환경에 기존 migration 적용:

```bash
npm run db:deploy
```

개발용 seed:

```bash
npm run db:seed
```

seed는 production 배포 중 자동 실행하지 않습니다.

## Vercel 배포

1. Vercel 프로젝트를 생성하고 이 저장소를 연결합니다.
2. PostgreSQL 데이터베이스를 준비한 뒤 `DATABASE_URL`을 Vercel 환경 변수에 등록합니다.
3. Clerk 프로젝트를 만들고 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`를 등록합니다.
4. Vercel Blob store를 만들고 `BLOB_READ_WRITE_TOKEN`을 등록합니다.
5. 배포 빌드는 `npm run vercel-build`를 사용합니다.

`vercel-build`는 `prisma generate`, `prisma migrate deploy`, `next build`를 순서대로 실행합니다. Preview 배포에는 production DB와 분리된 `DATABASE_URL`을 사용하는 것을 권장합니다.

## MVP 기능

- 홈 화면
- 상품명/브랜드 기준 검색
- 상품 기록 생성
- 대표 이미지 업로드
- 상품 상세 페이지
- 최초 기록자 표시
- Clerk 로그인
- 사용자 프로필
- 기억 댓글 작성
- 최초 기록 개수 표시
- 로딩, 에러, 빈 상태 UI

## 추후 개발 예정

- 중복 기록 병합 제안
- 바코드 기반 기록 보조
- AI 이미지 인식 보조
- 신고 및 검수 흐름
- 랭킹과 배지
- 더 정교한 검색
- 다국어 도감
