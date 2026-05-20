"use client";

import { AlertCircle, ImagePlus, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState, useTransition } from "react";

import { checkItemNameAction, createItemAction } from "@/app/actions/items";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export function ItemForm({ initialName = "" }: { initialName?: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
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
      setError("상품명과 한 줄 설명을 입력해주세요.");
      return;
    }

    if (!file) {
      setError("대표 이미지는 꼭 필요합니다.");
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
  setError("이미지 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.");
  return;
}

      if (!uploadResponse.ok || !uploadResult.url) {
        setError(uploadResult.error ?? "이미지 업로드에 실패했습니다.");
        return;
      }

      const result = await createItemAction({
        name,
        description,
        category,
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
      <div className="rounded-lg border bg-card p-4 text-sm leading-6 text-muted-foreground">
        완벽하지 않아도 괜찮아요. 사진과 한 줄 설명만으로도 기록을 시작할 수
        있습니다.
      </div>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="name">상품명</Label>
          <Input
            id="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setDuplicate(null);
            }}
            onBlur={() => void checkDuplicate()}
            placeholder="예: 바나나맛 우유"
            required
          />
          {duplicate?.exists ? (
            <div className="rounded-lg border border-primary/25 bg-accent p-3 text-sm leading-6">
              <p className="flex items-start gap-2 font-semibold text-primary">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                이미 기록된 상품일 수 있어요.
              </p>
              <p className="mt-1 text-muted-foreground">
                <Link href={`/items/${duplicate.item.id}`} className="font-semibold underline">
                  {duplicate.item.name}
                </Link>
                이 먼저 보존되어 있습니다. 다른 시기나 다른 모습의 물건이라면 새
                기록으로 남길 수 있습니다.
              </p>
            </div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">대표 이미지</Label>
          <label
            htmlFor="image"
            className="flex min-h-56 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-card p-4 text-center transition hover:border-primary/60 hover:bg-accent/50"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="선택한 대표 이미지"
                className="max-h-72 w-full rounded-md object-contain"
              />
            ) : (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent text-primary">
                  <ImagePlus className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">사진을 선택하세요</span>
                <span className="text-xs text-muted-foreground">
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
          <Label htmlFor="description">미래 세대에게 한 줄 설명</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="이 물건이 어떤 물건인지 한 문장으로 남겨주세요."
            maxLength={160}
            required
          />
          <p className="text-xs text-muted-foreground">{description.length}/160</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">카테고리</Label>
            <Input
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="예: 음료"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">브랜드</Label>
            <Input
              id="brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              placeholder="예: 빙그레"
            />
          </div>
        </div>
      </div>

      {error ? <p className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}

      <Button type="submit" size="lg" disabled={isPending} className="w-full">
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
        )}
        미래 도감에 남기기
      </Button>
    </form>
  );
}
