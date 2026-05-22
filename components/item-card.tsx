import { CalendarDays, ClipboardList, MessageSquareText } from "lucide-react";
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
      <Card className="ark-card-flat h-full overflow-hidden shadow-none transition hover:-translate-y-0.5 hover:border-[var(--border-medium)] hover:shadow-[0_10px_26px_rgba(26,26,24,0.07)]">
        <div className="ark-card-header">
          <span>{archiveNumber}</span>
          <span>Catalog Sheet</span>
        </div>
        <SpecimenImage
          src={item.imageUrl}
          alt={item.name}
          className="aspect-[4/3] border-b border-[var(--border-fine)]"
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
                  className="rounded-none border-[var(--border-fine)] text-[11px] text-[var(--ink-secondary)]"
                >
                  {categoryPath}
                </Badge>
              ) : null}
            </div>
            <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
              보존 대상 라벨
            </p>
            <h3 className="line-clamp-2 text-[var(--text-lg)] font-medium leading-snug tracking-normal text-[var(--ink-primary)]">
              {item.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-7 text-[var(--ink-secondary)]">
              {item.description}
            </p>
            {item.brand ? (
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-muted)]">
                Maker: <span className="text-[var(--ink-secondary)]">{item.brand}</span>
              </p>
            ) : null}
          </div>
          <div className="space-y-2 border-t border-[var(--border-fine)] pt-3 text-xs text-[var(--ink-muted)]">
            <div className="flex items-center justify-between gap-3 font-mono">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatKoreanDate(item.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquareText className="h-3.5 w-3.5" aria-hidden="true" />
                기억 기록 {item._count?.memories ?? 0}
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
