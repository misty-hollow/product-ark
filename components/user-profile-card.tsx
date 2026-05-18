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
    <section className="rounded-lg border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent text-2xl font-bold text-primary">
            {user.image ? (
              <img src={user.image} alt="" className="h-full w-full object-cover" />
            ) : (
              user.name.slice(0, 1)
            )}
          </span>
          <div>
            <p className="text-sm font-semibold text-primary">최초 기록자 프로필</p>
            <h1 className="mt-1 text-2xl font-bold">{user.name}</h1>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-background p-4">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              최초 기록한 물건
            </p>
            <p className="mt-2 text-3xl font-bold">{user._count.items}</p>
          </div>
          <div className="rounded-lg border bg-background p-4">
            <p className="flex items-center gap-2 text-xs text-muted-foreground">
              <MessageCircle className="h-4 w-4 text-primary" aria-hidden="true" />
              남긴 기억
            </p>
            <p className="mt-2 text-3xl font-bold">{user._count.memories}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-accent/70 p-4 text-sm leading-6">
        <Archive className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
        이 기록자는 지구 도감에 {user._count.items}개의 물건을 처음 보존했습니다.
      </div>
    </section>
  );
}
