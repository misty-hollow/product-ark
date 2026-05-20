import Link from "next/link";

import { formatKoreanDateTime } from "@/lib/format";

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
  if (memories.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-stone-300 bg-white p-5 text-sm text-stone-500">
        아직 제출된 관련 기억 기록이 없습니다. 이 개체는 현재 조용히 관찰 대기
        중입니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {memories.map((memory) => (
        <article
          key={memory.id}
          className="rounded-md border border-stone-200 bg-white p-4 shadow-sm"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link
              href={`/users/${memory.user.id}`}
              className="flex min-w-0 items-center gap-2 text-sm font-semibold text-stone-700 hover:text-stone-900"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-stone-200 bg-stone-100 text-xs text-stone-500">
                {memory.user.image ? (
                  <img
                    src={memory.user.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  memory.user.name.slice(0, 1)
                )}
              </span>
              <span className="truncate">{memory.user.name}</span>
            </Link>
            <time className="shrink-0 font-mono text-xs text-stone-400">
              {formatKoreanDateTime(memory.createdAt)}
            </time>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-6 text-stone-600">
            {memory.content}
          </p>
        </article>
      ))}
    </div>
  );
}
