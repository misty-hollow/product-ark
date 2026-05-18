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
      <div className="rounded-lg border border-dashed bg-card p-5 text-sm text-muted-foreground">
        아직 이 물건에 남겨진 기억이 없습니다. 누군가의 작은 기억이 도감을 더
        선명하게 만듭니다.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {memories.map((memory) => (
        <article key={memory.id} className="rounded-lg border bg-card p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link
              href={`/users/${memory.user.id}`}
              className="flex min-w-0 items-center gap-2 text-sm font-semibold hover:text-primary"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-accent text-xs text-primary">
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
            <time className="shrink-0 text-xs text-muted-foreground">
              {formatKoreanDateTime(memory.createdAt)}
            </time>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-6">{memory.content}</p>
        </article>
      ))}
    </div>
  );
}
