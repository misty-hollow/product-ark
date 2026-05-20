import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  defaultQuery?: string;
  className?: string;
  inputClassName?: string;
};

export function SearchBar({
  defaultQuery = "",
  className,
  inputClassName
}: SearchBarProps) {
  return (
    <form action="/search" className={cn("flex w-full gap-2", className)}>
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400"
          aria-hidden="true"
        />
        <Input
          name="q"
          defaultValue={defaultQuery}
          placeholder="식별 번호, 물건 명칭, 또는 기록 해설로 조회..."
          className={cn(
            "h-11 border-stone-300 bg-white/80 pl-9 text-stone-800 placeholder:text-stone-400 focus-visible:ring-stone-400",
            inputClassName
          )}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="shrink-0 bg-stone-800 text-stone-50 hover:bg-stone-700"
      >
        조회
      </Button>
    </form>
  );
}
