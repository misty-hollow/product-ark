"use client";

import { Loader2, MessageCirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { createMemoryAction } from "@/app/actions/items";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function MemoryForm({ itemId }: { itemId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createMemoryAction(itemId, content);

      if (!result.ok) {
        setError(result.error ?? "증언을 저장하지 못했습니다.");
        return;
      }

      setContent("");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border border-stone-200 bg-[#FFFCF4] p-4 shadow-sm"
    >
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={500}
        placeholder="예: 본 진술인은 2010년경 이 제품을 주로 독서실에서 사용했으며, 마찰음이 다소 거슬렸던 기억이 있음."
        className="rounded-none border-x-0 border-t-0 border-b-stone-300 bg-transparent text-stone-700 placeholder:text-stone-400 focus-visible:border-stone-800 focus-visible:ring-0"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-stone-400">{content.length}/500</p>
        <Button
          type="submit"
          disabled={isPending || content.trim().length < 2}
          className="min-h-11 rounded-none bg-stone-900 text-stone-50 hover:bg-stone-800"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <MessageCirclePlus className="mr-2 h-4 w-4" aria-hidden="true" />
          )}
          기억 기록 보완 및 증언 제출
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
