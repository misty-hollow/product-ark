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
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          name="q"
          defaultValue={defaultQuery}
          placeholder="오늘 본 물건의 이름을 적어보세요"
          className={cn("h-11 pl-9", inputClassName)}
        />
      </div>
      <Button type="submit" size="lg" className="shrink-0">
        찾아보기
      </Button>
    </form>
  );
}
