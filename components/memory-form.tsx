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
        setError(result.error ?? "기억을 저장하지 못했습니다.");
        return;
      }

      setContent("");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border bg-card p-4">
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={500}
        placeholder="이 물건을 보면 떠오르는 기억을 남겨보세요."
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">{content.length}/500</p>
        <Button type="submit" disabled={isPending || content.trim().length < 2}>
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <MessageCirclePlus className="mr-2 h-4 w-4" aria-hidden="true" />
          )}
          기억 남기기
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
