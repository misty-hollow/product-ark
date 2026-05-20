import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  code?: string;
};

export function StatCard({ label, value, icon: Icon, code }: StatCardProps) {
  return (
    <Card className="rounded-none border-[0.5px] border-stone-200 bg-[#FFFCF4]/80 shadow-none">
      <CardContent className="relative flex min-h-28 items-end justify-between gap-4 p-5">
        <span className="absolute left-4 top-4 flex h-8 w-8 shrink-0 items-center justify-center border border-stone-200 bg-[#F4F1EA] text-stone-500">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 pt-10">
          <p className="font-mono text-[9px] uppercase tracking-widest text-stone-400">
            {code ?? label}
          </p>
          <p className="mt-2 font-mono text-4xl font-semibold leading-none text-stone-900">
            {value}
          </p>
          <p className="mt-3 truncate text-sm font-medium text-stone-600">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
