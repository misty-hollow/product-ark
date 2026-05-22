"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatKoreanDateTime } from "@/lib/format";

function formatMemoryId(id: string, index: number) {
  const suffix = id.replace(/[^a-zA-Z0-9]/g, "").slice(-5).toUpperCase();
  return `MEM-${suffix || String(index + 1).padStart(5, "0")}`;
}

type Memory = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
  };
};

export function MemoryList({ memories }: { memories: Memory[] }) {
  const [expanded, setExpanded] = useState(false);
  const initialShow = 5;
  const shouldCollapse = memories.length > initialShow;
  const visibleMemories = expanded ? memories : memories.slice(0, initialShow);

  if (memories.length === 0) {
    return (
      <div className="border border-dashed border-[var(--border-medium)] bg-[#FFFCF4] p-5 text-sm text-[var(--ink-secondary)]">
        아직 이 물건에 편철된 관련 기억 기록이 없습니다. 첫 번째 기억 감정일을 남길 수 있습니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visibleMemories.map((memory, index) => (
        <article
          key={memory.id}
          className="border border-[var(--border-fine)] bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link
              href={`/users/${memory.user.id}`}
              aria-label={`제술인 ${memory.user.name} 프로필 보기`}
              className="flex min-w-0 items-center gap-2 text-sm font-semibold text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden border border-[var(--border-fine)] bg-[var(--bg-surface)] font-mono text-xs text-[var(--ink-muted)]">
                {memory.user.image ? (
                  <img
                    src={memory.user.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  memory.user.name.slice(0, 1)
                )}
              </span>
              <span className="truncate">제술인 {memory.user.name}</span>
            </Link>
            <time
              dateTime={memory.createdAt.toISOString()}
              className="shrink-0 font-mono text-xs text-[var(--ink-muted)]"
            >
              {formatMemoryId(memory.id, index)} ·{" "}
              {formatKoreanDateTime(memory.createdAt)}
            </time>
          </div>
          <p className="label-mono mb-2">시대 증언</p>
          <p className="whitespace-pre-wrap border-l-2 border-[var(--border-medium)] pl-4 text-sm leading-7 text-[var(--ink-secondary)]">
            "{memory.content}"
          </p>
        </article>
      ))}

      {shouldCollapse ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setExpanded((current) => !current)}
          className="btn-ark-ghost mt-2 w-full"
          style={{ fontSize: "var(--t-11)" }}
        >
          {expanded
            ? "접기"
            : `기억 기록 ${memories.length - visibleMemories.length}건 더 보기 ↓`}
        </Button>
      ) : null}
    </div>
  );
}
