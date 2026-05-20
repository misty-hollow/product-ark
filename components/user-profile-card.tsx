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
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-stone-200 bg-stone-100 text-2xl font-semibold text-stone-500">
            {user.image ? (
              <img src={user.image} alt="" className="h-full w-full object-cover" />
            ) : (
              user.name.slice(0, 1)
            )}
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
              Keeper Profile
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-stone-800">
              기록자 프로필 · {user.name}
            </h1>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="flex items-center gap-2 text-xs text-stone-500">
              <Sparkles className="h-4 w-4 text-stone-500" aria-hidden="true" />
              최초 등록 자료
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold text-stone-800">
              {user._count.items}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4">
            <p className="flex items-center gap-2 text-xs text-stone-500">
              <MessageCircle className="h-4 w-4 text-stone-500" aria-hidden="true" />
              관련 기억 기록
            </p>
            <p className="mt-2 font-mono text-3xl font-semibold text-stone-800">
              {user._count.memories}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-600">
        <Archive className="mr-2 inline h-4 w-4 text-stone-500" aria-hidden="true" />
        이 보관인은 지구물건보관소에 {user._count.items}개의 소장 기록을 처음
        남겼습니다.
      </div>
    </section>
  );
}
