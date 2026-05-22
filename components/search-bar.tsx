import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  defaultQuery?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  placeholder?: string;
  buttonText?: string;
};

export function SearchBar({
  defaultQuery = "",
  className,
  inputClassName,
  buttonClassName,
  placeholder = "식별 번호, 물건 명칭, 또는 기록 해설로 조회...",
  buttonText = "조회"
}: SearchBarProps) {
  return (
    <form action="/search" className={cn("flex w-full gap-2", className)}>
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-muted)]"
          aria-hidden="true"
        />
        <Input
          name="q"
          defaultValue={defaultQuery}
          placeholder={placeholder}
          className={cn(
            "h-12 border-[var(--border-medium)] bg-white/80 pl-9 text-[var(--ink-primary)] placeholder:text-[var(--ink-muted)] focus-visible:ring-[var(--ink-muted)]",
            inputClassName
          )}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className={cn(
          "h-12 shrink-0 bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]",
          buttonClassName
        )}
      >
        <span>{buttonText}</span>
      </Button>
    </form>
  );
}
