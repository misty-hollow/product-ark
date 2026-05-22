import { CalendarDays, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SpecimenImage } from "@/components/specimen-image";
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
      <Card className="h-full overflow-hidden rounded-none border-stone-200 bg-[#FFFCF4]/90 shadow-none transition hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_12px_32px_rgba(26,26,24,0.08)]">
        <SpecimenImage
          src={item.imageUrl}
          alt={item.name}
          className="aspect-square border-b border-stone-200"
          imageClassName="transition duration-300 group-hover:scale-[1.025]"
        />
        <CardContent className="space-y-4 p-4">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge className="border border-stone-200 bg-stone-100 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-600">
                소장 기록
              </Badge>
              {categoryPath ? (
                <Badge variant="outline" className="border-stone-200 text-stone-500">
                  {categoryPath}
                </Badge>
              ) : null}
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
              {archiveNumber}
            </p>
            <h3 className="line-clamp-2 text-[var(--text-lg)] font-medium leading-snug tracking-[-0.02em] text-stone-800">
              {item.name}
            </h3>
            <p className="line-clamp-2 text-sm leading-7 text-stone-500">
              {item.description}
            </p>
          </div>
          <div className="space-y-2 border-t border-stone-200 pt-3 text-xs text-stone-400">
            <div className="flex items-center justify-between gap-3 font-mono">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatKoreanDate(item.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                증언 {item._count?.memories ?? 0}
              </span>
            </div>
            <p className="truncate text-xs text-stone-500">
              최초 등록자: {item.firstRecorder.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
