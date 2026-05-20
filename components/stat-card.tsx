import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="border-stone-200 bg-white/70 shadow-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-stone-200 bg-stone-100 text-stone-500">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-2xl font-semibold leading-tight text-stone-800">
            {value}
          </p>
          <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
