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
    <Card className="rounded-none border-dashed border-stone-300 bg-[#FFFCF4]/80 shadow-none">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center border border-stone-200 bg-stone-100 text-stone-500">
          <Archive className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h2 className="text-[var(--text-xl)] font-semibold text-stone-800">{title}</h2>
          <p className="mx-auto max-w-md text-[var(--text-sm)] leading-7 text-stone-500">
            {description}
          </p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
