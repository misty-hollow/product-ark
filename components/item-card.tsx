import { CalendarDays, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatKoreanDate } from "@/lib/format";

type ItemCardItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string | null;
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
  return (
    <Link href={`/items/${item.id}`} className="group block h-full">
      <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-archive">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <CardContent className="space-y-4 p-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {item.category ? <Badge variant="secondary">{item.category}</Badge> : null}
              {item.brand ? <Badge variant="outline">{item.brand}</Badge> : null}
            </div>
            <h3 className="line-clamp-2 text-lg font-bold leading-snug">{item.name}</h3>
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
          <div className="space-y-2 border-t pt-3 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              최초 기록자: {item.firstRecorder.name}
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {formatKoreanDate(item.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                기억 {item._count?.memories ?? 0}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
