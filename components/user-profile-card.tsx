import { Archive, MessageCircle, Sparkles } from "lucide-react";

type UserProfileCardProps = {
  user: {
    name: string;
    image: string | null;
    _count: {
      items: number;
      memories: number;
    };
  };
};

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <section className="border border-[var(--border-fine)] bg-[#FFFCF4] p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-[var(--border-fine)] bg-[var(--bg-surface)] text-3xl font-semibold text-[var(--ink-muted)]">
            {user.image ? (
              <img src={user.image} alt="" className="h-full w-full object-cover" />
            ) : (
              user.name.slice(0, 1)
            )}
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              Keeper Profile
            </p>
            <h1 className="mt-1 text-[var(--text-2xl)] font-semibold text-[var(--ink-primary)]">
              기록자 프로필 · {user.name}
            </h1>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-t-2 border-[var(--border-fine)] border-t-[var(--accent-signal)] bg-[var(--bg-surface)]/70 p-4">
            <p className="flex items-center gap-2 text-xs text-[var(--ink-secondary)]">
              <Sparkles className="h-4 w-4 text-[var(--ink-secondary)]" aria-hidden="true" />
              최초 등록 자료
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold text-[var(--ink-primary)]">
              {user._count.items}
            </p>
          </div>
          <div className="border border-t-2 border-[var(--border-fine)] border-t-[var(--accent-active)] bg-[var(--bg-surface)]/70 p-4">
            <p className="flex items-center gap-2 text-xs text-[var(--ink-secondary)]">
              <MessageCircle className="h-4 w-4 text-[var(--ink-secondary)]" aria-hidden="true" />
              관련 기억 기록
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold text-[var(--ink-primary)]">
              {user._count.memories}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 border border-[var(--border-fine)] bg-[var(--bg-surface)]/70 p-4 text-sm leading-7 text-[var(--ink-secondary)]">
        <Archive className="mr-2 inline h-4 w-4 text-[var(--ink-secondary)]" aria-hidden="true" />
        이 보관인은 지구물건보관소에 {user._count.items}개의 소장 기록을 처음 남겼습니다.
      </div>
    </section>
  );
}
