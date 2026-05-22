"use client";

import { AlertCircle, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useState,
  useTransition
} from "react";

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
  const [isDragOver, setIsDragOver] = useState(false);
  const [submitStep, setSubmitStep] = useState<"idle" | "uploading" | "saving">(
    "idle"
  );
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

  useEffect(() => {
    const trimmedName = name.trim();

    if (trimmedName.length < 2) {
      setDuplicate(null);
      return;
    }

    const timer = window.setTimeout(() => {
      void checkDuplicate(trimmedName);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [name]);

  async function checkDuplicate(nextName: string) {
    const trimmedName = nextName.trim();

    if (trimmedName.length < 2) {
      setDuplicate(null);
      return;
    }

    const result = await checkItemNameAction(trimmedName);
    setDuplicate(result as DuplicateState);
  }

  function validateAndSetFile(selectedFile: File | null) {
    setError(null);
    setIsDragOver(false);

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
      setError("이미지는 5MB 이하로 올려주십시오.");
      return;
    }

    setFile(selectedFile);
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    validateAndSetFile(event.target.files?.[0] ?? null);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    validateAndSetFile(event.dataTransfer.files?.[0] ?? null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!name.trim() || !description.trim()) {
      setError("물건 이름과 기록 해설을 입력해 주십시오.");
      return;
    }

    if (!file) {
      setError("식별 이미지는 필수입니다.");
      return;
    }

    if (!primaryCategoryId || categoryPath.split(" > ").length < 3) {
      setError("대분류, 중분류, 소분류까지 대표 분류 체계를 선택해 주십시오.");
      return;
    }

    startTransition(async () => {
      setSubmitStep("uploading");
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
        setError("이미지 보존에 실패했습니다. 잠시 후 다시 시도해 주십시오.");
        setSubmitStep("idle");
        return;
      }

      if (!uploadResponse.ok || !uploadResult.url) {
        setError(uploadResult.error ?? "이미지 보존에 실패했습니다.");
        setSubmitStep("idle");
        return;
      }

      setSubmitStep("saving");
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
        setSubmitStep("idle");
        return;
      }

      router.push(`/items/${result.itemId}?created=1`);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="ark-card-flat space-y-6 p-5 md:p-7">
      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[var(--ink-primary)]">
            <span className="mr-2 font-mono text-xs text-[var(--ink-muted)]">01.</span>
            물건 이름 <span className="text-xs text-[var(--ink-muted)]">필수</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setDuplicate(null);
            }}
            placeholder="예: 모나미 153 볼펜, 노란색 맥심 로고 에디션"
            className="rounded-none border-x-0 border-t-0 border-b-[var(--border-medium)] bg-transparent px-0 text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus-visible:border-[var(--ink-primary)] focus-visible:ring-0"
            required
          />
          {duplicate?.exists ? (
            <div className="border border-[var(--border-medium)] bg-[var(--bg-surface)]/80 p-3 text-sm leading-6">
              <p className="flex items-start gap-2 font-semibold text-[var(--ink-primary)]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                이미 보존된 기록일 수 있습니다.
              </p>
              <p className="mt-1 text-[var(--ink-secondary)]">
                <Link href={`/items/${duplicate.item.id}`} className="font-semibold underline">
                  {duplicate.item.name}
                </Link>
                이 먼저 보존되어 있습니다. 다른 시기, 다른 모습의 물건이라면 별도 소장
                기록으로 남길 수 있습니다.
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image" className="text-[var(--ink-primary)]">
            <span className="mr-2 font-mono text-xs text-[var(--ink-muted)]">02.</span>
            식별 이미지 <span className="text-xs text-[var(--ink-muted)]">필수</span>
          </Label>
          <label
            htmlFor="image"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex min-h-56 cursor-pointer flex-col items-center justify-center gap-2 border border-dashed p-5 text-center transition hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface)]/70 ${
              isDragOver
                ? "border-stone-600 bg-[#F4F1EA]"
                : "border-[var(--border-medium)] bg-[#FFFCF4]/60"
            }`}
          >
            {previewUrl ? (
              <div className="w-full space-y-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                  [ REGISTER IMAGE SPECIMEN ]
                </p>
                <img
                  src={previewUrl}
                  alt="선택한 식별 이미지 미리보기"
                  className="mx-auto max-h-80 w-full border border-[var(--border-fine)] bg-white object-contain p-2 shadow-sm"
                />
              </div>
            ) : (
              <>
                <span className="flex h-10 w-10 items-center justify-center border border-[var(--border-medium)] bg-white text-[var(--ink-secondary)]">
                  <ImagePlus className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
                  [ REGISTER IMAGE SPECIMEN ]
                </span>
                <span className="text-sm font-semibold text-[var(--ink-primary)]">
                  실측/스캔 베드에 식별 이미지를 배치하십시오
                </span>
                <span className="max-w-sm text-xs leading-5 text-[var(--ink-secondary)]">
                  대상의 형태, 표면, 색상 또는 사용 흔적을 식별할 수 있는 보존 사진을 등록하십시오.
                </span>
                <span className="text-xs text-[var(--ink-muted)]">
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
          <Label htmlFor="description" className="text-[var(--ink-primary)]">
            <span className="mr-2 font-mono text-xs text-[var(--ink-muted)]">03.</span>
            기록 해설 <span className="text-xs text-[var(--ink-muted)]">필수</span>
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="이 물건의 형태적 특징, 사용 목적, 또는 미래 인류학적 관점에서의 추정 용도를 서술하십시오."
            maxLength={160}
            className="min-h-28 rounded-none border-x-0 border-t-0 border-b-[var(--border-medium)] bg-transparent px-0 text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus-visible:border-[var(--ink-primary)] focus-visible:ring-0"
            required
          />
          <p
            className={`font-mono text-xs ${
              description.length >= 150
                ? "text-red-500"
                : description.length >= 120
                  ? "text-amber-600"
                  : "text-[var(--ink-muted)]"
            }`}
          >
            기록 규격 부합도: {description.length}/160 자
          </p>
        </div>

        <CategorySelector
          categories={categories}
          selectedCategoryId={primaryCategoryId}
          onChange={(next) => {
            setPrimaryCategoryId(next.categoryId);
            setCategoryPath(next.categoryPath);
          }}
        />

        <div className="space-y-2">
          <Label htmlFor="brand" className="text-[var(--ink-primary)]">
            <span className="mr-2 font-mono text-xs text-[var(--ink-muted)]">05.</span>
            브랜드/제조사 <span className="text-xs text-[var(--ink-muted)]">선택</span>
          </Label>
          <Input
            id="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            placeholder="예: 주식회사 모나미 (Monami Co., Ltd.)"
            className="rounded-none border-x-0 border-t-0 border-b-[var(--border-medium)] bg-transparent px-0 text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus-visible:border-[var(--ink-primary)] focus-visible:ring-0"
          />
        </div>
      </div>

      {error ? (
        <p className="border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={isPending}
        className="min-h-12 w-full rounded-none bg-[var(--ink-primary)] py-4 font-mono text-xs font-medium tracking-widest text-[var(--bg-base)] hover:bg-[var(--accent-signal)]"
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : null}
        {isPending
          ? submitStep === "uploading"
            ? "이미지 보존 중..."
            : "기초 기록 등록 중..."
          : "기초 기록 등록"}
      </Button>
    </form>
  );
}
