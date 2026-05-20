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
    <Card className="border-dashed border-stone-300 bg-white/80 shadow-sm">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-md border border-stone-200 bg-stone-100 text-stone-500">
          <Archive className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-stone-800">{title}</h2>
          <p className="mx-auto max-w-md text-sm leading-6 text-stone-500">
            {description}
          </p>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
