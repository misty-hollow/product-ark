import { CalendarDays, MessageCircle } from "lucide-react";
import Link from "next/link";

import { SpecimenImage } from "@/components/specimen-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  formatCategoryRecordPath,
  type CategoryPathRecord
} from "@/lib/catalog";
import { formatArchiveNumber, formatKoreanDate } from "@/lib/format";

type ItemCardItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string | null;
  primaryCategory: CategoryPathRecord;
  brand: string | null;
  createdAt: Date;
  firstRecorder: {
    name: string;
  };
  _count?: {
    memories: number;
  };
};

export function ItemCard({ item }: { item: ItemCardItem }) {
  const archiveNumber = formatArchiveNumber(item.createdAt, item.id);
  const categoryPath = formatCategoryRecordPath(item.primaryCategory, item.category);

  return (
    <Link href={`/items/${item.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden rounded-none border-[var(--border-fine)] bg-[#FFFCF4]/90 shadow-none transition hover:-translate-y-0.5 hover:border-[var(--border-medium)] hover:shadow-[0_12px_32px_rgba(26,26,24,0.08)]">
        <SpecimenImage
          src={item.imageUrl}
          alt={item.name}
          className="aspect-square border-b border-[var(--border-fine)]"
          imageClassName="transition duration-300 group-hover:scale-[1.025]"
        />
        <CardContent className="space-y-4 p-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="rounded-none border border-[var(--border-fine)] bg-[var(--bg-surface)] font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-secondary)]">
                소장 기록
              </Badge>
              {categoryPath ? (
                <Badge
                  variant="outline"
                  className="rounded-none border-[var(--border-fine)] text-[var(--ink-secondary)]"
                >
                  {categoryPath}
                </Badge>
              ) : null}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              {archiveNumber}
            </p>
            <h3 className="line-clamp-2 text-[var(--text-lg)] font-medium leading-snug tracking-[-0.02em] text-[var(--ink-primary)]">
              {item.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-7 text-[var(--ink-secondary)]">
              {item.description}
            </p>
          </div>
          <div className="space-y-2 border-t border-[var(--border-fine)] pt-3 text-xs text-[var(--ink-muted)]">
            <div className="flex items-center justify-between gap-3 font-mono">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatKoreanDate(item.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                기억 {item._count?.memories ?? 0}
              </span>
            </div>
            <p className="truncate text-xs text-[var(--ink-secondary)]">
              최초 등록자 {item.firstRecorder.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
