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
        setError(result.error ?? "기억 기록을 저장하지 못했습니다.");
        return;
      }

      setContent("");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 border border-[var(--border-fine)] bg-[#FFFCF4] p-4 shadow-sm"
    >
      <div>
        <p className="label-mono">Memory Testimony Form</p>
        <h3 className="mt-1 font-serif text-xl font-semibold text-[var(--ink-primary)]">
          기억 기록 남기기
        </h3>
      </div>
      <Textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        maxLength={500}
        placeholder="예: 초등학교 소풍 때 친구들과 나눠 먹던 과자였습니다."
        className="rounded-none border-x-0 border-t-0 border-b-[var(--border-medium)] bg-transparent text-[var(--ink-secondary)] placeholder:text-[var(--ink-muted)] focus-visible:border-[var(--ink-primary)] focus-visible:ring-0"
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-[var(--ink-muted)]">{content.length}/500</p>
        <Button
          type="submit"
          disabled={isPending || content.trim().length < 2}
          className="min-h-11 rounded-none bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <MessageCirclePlus className="mr-2 h-4 w-4" aria-hidden="true" />
          )}
          시대 증언 제출
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </form>
  );
}
