import { Archive } from "lucide-react";
import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <Card className="rounded-none border-dashed border-[var(--border-md)] bg-[var(--surface-card)]/80 shadow-none">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <p className="label-mono text-[var(--accent-red)]">Vacancy Notice</p>
        <span className="flex h-12 w-12 items-center justify-center border border-[var(--border-sm)] bg-[var(--surface-inset)] text-[var(--ink-2)]">
          <Archive className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h2 className="text-[var(--t-26)] font-semibold text-[var(--ink-0)]">{title}</h2>
          <p className="mx-auto max-w-md text-[var(--t-14)] leading-7 text-[var(--ink-2)]">
            {description}
          </p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
