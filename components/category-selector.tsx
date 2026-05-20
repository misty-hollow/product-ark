"use client";

import {
  findCatalogPathById,
  formatCategoryPath,
  type CatalogNode
} from "@/lib/catalog";
import { useLang } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

type CategorySelectorProps = {
  categories: CatalogNode[];
  selectedCategoryId: string;
  onChange: (next: { categoryId: string; categoryPath: string }) => void;
};

function Chip({
  label,
  selected,
  onClick
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-none border px-3 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-400",
        selected
          ? "border-stone-900 bg-stone-900 text-stone-50"
          : "border-stone-200 bg-transparent text-stone-600 hover:border-stone-300 hover:bg-stone-50"
      )}
    >
      {label}
    </button>
  );
}

export function CategorySelector({
  categories,
  selectedCategoryId,
  onChange
}: CategorySelectorProps) {
  const { lang } = useLang();
  const tx = t[lang];
  const selectedPathNodes = selectedCategoryId
    ? findCatalogPathById(categories, selectedCategoryId)
    : null;
  const majorNode = selectedPathNodes?.[0];
  const middleNode = selectedPathNodes?.[1];
  const minorNode = selectedPathNodes?.[2];
  const selectedPath = selectedPathNodes
    ? formatCategoryPath(selectedPathNodes.map((node) => node.name))
    : "";
  const rootLabels: Record<string, string> = {
    "cat-food": tx.cat1,
    "cat-daily": tx.cat2,
    "cat-digital": tx.cat3,
    "cat-stationery": tx.cat4,
    "cat-wear": tx.cat5,
    "cat-etc": tx.cat6
  };
  const labelFor = (node: CatalogNode) => rootLabels[node.id] ?? node.name;

  return (
    <div className="space-y-4 border border-stone-200 bg-[#FFFCF4]/70 p-4">
      <div>
        <p className="text-sm font-semibold text-stone-800">
          <span className="mr-2 font-mono text-xs text-stone-400">04.</span>
          {tx.field4Label}{" "}
          <span className="text-xs text-stone-400">{tx.field4Required}</span>
        </p>
        <p className="mt-1 text-xs leading-5 text-stone-500">
          {tx.field4Desc}
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
          {tx.field4Category}
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((node) => (
            <Chip
              key={node.id}
              label={labelFor(node)}
              selected={majorNode?.id === node.id}
              onClick={() => onChange({ categoryId: node.id, categoryPath: node.name })}
            />
          ))}
        </div>
      </div>

      {majorNode ? (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
            {tx.field4Middle}
          </p>
          <div className="flex flex-wrap gap-2">
            {majorNode.children.map((node) => (
              <Chip
                key={node.id}
                label={node.name}
                selected={middleNode?.id === node.id}
                onClick={() =>
                  onChange({
                    categoryId: node.id,
                    categoryPath: formatCategoryPath([majorNode.name, node.name])
                  })
                }
              />
            ))}
          </div>
        </div>
      ) : null}

      {middleNode ? (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
            {tx.field4Minor}
          </p>
          <div className="flex flex-wrap gap-2">
            {middleNode.children.map((node) => (
              <Chip
                key={node.id}
                label={node.name}
                selected={minorNode?.id === node.id}
                onClick={() =>
                  onChange({
                    categoryId: node.id,
                    categoryPath: formatCategoryPath([
                      majorNode?.name,
                      middleNode.name,
                      node.name
                    ])
                  })
                }
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="border border-stone-200 bg-[#F4F1EA]/80 px-3 py-2 text-sm text-stone-500">
        {selectedPath ? tx.field4SavedPrefix : tx.field4SubPrompt}{" "}
        <span className="font-semibold text-stone-800">
          {selectedPath || ""}
        </span>
      </div>
    </div>
  );
}
