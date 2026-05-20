"use client";

import { AlertCircle, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState, useTransition } from "react";

import { checkItemNameAction, createItemAction } from "@/app/actions/items";
import { CategorySelector } from "@/components/category-selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CatalogNode } from "@/lib/catalog";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/lib/uploads";

type DuplicateState =
  | {
      exists: false;
    }
  | {
      exists: true;
      item: {
        id: string;
        name: string;
        description: string;
        firstRecorder: {
          name: string;
        };
      };
    };

export function ItemForm({
  initialName = "",
  categories
}: {
  initialName?: string;
  categories: CatalogNode[];
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState("");
  const [primaryCategoryId, setPrimaryCategoryId] = useState("");
  const [categoryPath, setCategoryPath] = useState("");
  const [brand, setBrand] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState<DuplicateState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  async function checkDuplicate(nextName = name) {
    const trimmedName = nextName.trim();

    if (trimmedName.length < 2) {
      setDuplicate(null);
      return;
    }

    const result = await checkItemNameAction(trimmedName);
    setDuplicate(result as DuplicateState);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;
    setError(null);

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(selectedFile.type as never)) {
      setFile(null);
      setError("jpg, jpeg, png, webp 형식의 이미지만 기록할 수 있습니다.");
      return;
    }

    if (selectedFile.size > MAX_IMAGE_SIZE) {
      setFile(null);
      setError("이미지는 5MB 이하로 올려주세요.");
      return;
    }

    setFile(selectedFile);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !description.trim()) {
      setError("물건 이름과 기록 해설을 입력해주세요.");
      return;
    }

    if (!file) {
      setError("대표 이미지는 꼭 필요합니다.");
      return;
    }

    if (!primaryCategoryId || categoryPath.split(" > ").length < 3) {
      setError("대분류, 중분류, 소분류까지 대표 분류 체계를 선택해주세요.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      let uploadResult: {
        url?: string;
        error?: string;
      };

      try {
        uploadResult = (await uploadResponse.json()) as {
          url?: string;
          error?: string;
        };
      } catch {
        setError("이미지 보존에 실패했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      if (!uploadResponse.ok || !uploadResult.url) {
        setError(uploadResult.error ?? "이미지 보존에 실패했습니다.");
        return;
      }

      const result = await createItemAction({
        name,
        description,
        category: categoryPath,
        primaryCategoryId,
        brand,
        imageUrl: uploadResult.url
      });

      if (!result.ok) {
        setError(result.error ?? "기록을 저장하지 못했습니다.");
        return;
      }

      router.push(`/items/${result.itemId}?created=1`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-stone-700">
            물건 이름 <span className="text-xs text-stone-400">필수</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setDuplicate(null);
            }}
            onBlur={() => void checkDuplicate()}
            placeholder="예: 모나미 153 볼펜, 노란색 맥심 로고 에디션"
            className="border-stone-300 bg-white text-stone-800 placeholder:text-stone-400 focus-visible:ring-stone-400"
            required
          />
          {duplicate?.exists ? (
            <div className="rounded-lg border border-stone-300 bg-stone-100 p-3 text-sm leading-6">
              <p className="flex items-start gap-2 font-semibold text-stone-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                이미 보존된 기록일 수 있어요.
              </p>
              <p className="mt-1 text-stone-500">
                <Link href={`/items/${duplicate.item.id}`} className="font-semibold underline">
                  {duplicate.item.name}
                </Link>
                이 먼저 보존되어 있습니다. 다른 시기나 다른 모습의 물건이라면 새
                소장 기록으로 남길 수 있습니다.
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="text-stone-700">
            식별 이미지 <span className="text-xs text-stone-400">필수</span>
          </Label>
          <label
            htmlFor="image"
            className="flex min-h-64 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-stone-300 bg-stone-50/50 p-4 text-center transition hover:border-stone-500 hover:bg-stone-100/70"
          >
            {previewUrl ? (
              <div className="w-full space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                  Specimen Photo
                </p>
                <img
                  src={previewUrl}
                  alt="선택한 대표 이미지"
                  className="mx-auto max-h-80 w-full rounded-md border border-stone-200 bg-white object-contain p-2 shadow-sm"
                />
              </div>
            ) : (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-md border border-stone-300 bg-white text-stone-500">
                  <ImagePlus className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold text-stone-700">
                  표본 이미지를 선택하세요
                </span>
                <span className="max-w-sm text-xs leading-5 text-stone-500">
                  대상의 형태를 식별할 수 있는 이미지를 등록하십시오.
                </span>
                <span className="text-xs text-stone-400">
                  jpg, jpeg, png, webp / 최대 5MB
                </span>
              </>
            )}
          </label>
          <Input
            id="image"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileChange}
            className="sr-only"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-stone-700">
            기록 해설 <span className="text-xs text-stone-400">필수</span>
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="이 물건의 형태적 특징, 사용 목적, 또는 미래 인류학적 관점에서의 추정 용도를 서술하십시오. 예: 플라스틱 원통형 몸체 내부에 검은 필기용 액체가 내장된 도구. 주로 21세기 종이 매체에 기호를 기록하기 위해 사용됨."
            maxLength={160}
            className="border-stone-300 bg-white text-stone-800 placeholder:text-stone-400 focus-visible:ring-stone-400"
            required
          />
          <p className="font-mono text-xs text-stone-400">{description.length}/160</p>
        </div>

        <CategorySelector
          categories={categories}
          selectedCategoryId={primaryCategoryId}
          onChange={(next) => {
            setPrimaryCategoryId(next.categoryId);
            setCategoryPath(next.categoryPath);
          }}
        />

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="brand" className="text-stone-700">
              브랜드/제조사 <span className="text-xs text-stone-400">선택</span>
            </Label>
            <Input
              id="brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="예: 주식회사 모나미 (Monami Co., Ltd.)"
              className="border-stone-300 bg-white text-stone-800 placeholder:text-stone-400 focus-visible:ring-stone-400"
            />
          </div>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="w-full bg-stone-800 text-stone-50 hover:bg-stone-700"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : null}
        {isPending ? "기록 보존 처리 중..." : "기초 기록 등록"}
      </Button>
    </form>
  );
}
