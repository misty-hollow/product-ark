"use client";

import {
  findCatalogPathById,
  formatCategoryPath,
  type CatalogNode
} from "@/lib/catalog";
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
        "min-h-10 rounded-none border px-3 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ink-muted)]",
        selected
          ? "border-[var(--ink-primary)] bg-[var(--ink-primary)] text-[var(--bg-base)]"
          : "border-[var(--border-fine)] bg-transparent text-[var(--ink-secondary)] hover:border-[var(--border-medium)] hover:bg-[var(--bg-surface)]"
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
  const selectedPathNodes = selectedCategoryId
    ? findCatalogPathById(categories, selectedCategoryId)
    : null;
  const majorNode = selectedPathNodes?.[0];
  const middleNode = selectedPathNodes?.[1];
  const minorNode = selectedPathNodes?.[2];
  const selectedPath = selectedPathNodes
    ? formatCategoryPath(selectedPathNodes.map((node) => node.name))
    : "";

  return (
    <div className="space-y-4 border border-[var(--border-fine)] bg-[#FFFCF4]/70 p-4">
      <div>
        <p className="text-sm font-semibold text-[var(--ink-primary)]">
          <span className="mr-2 font-mono text-xs text-[var(--ink-muted)]">04.</span>
          대표 분류 <span className="text-xs text-[var(--ink-muted)]">필수</span>
        </p>
        <p className="mt-1 text-xs leading-5 text-[var(--ink-secondary)]">
          보관소 기준 대표 분류를 대분류, 중분류, 소분류 순서로 확정합니다.
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          대분류
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((node) => (
            <Chip
              key={node.id}
              label={node.name}
              selected={majorNode?.id === node.id}
              onClick={() => onChange({ categoryId: node.id, categoryPath: node.name })}
            />
          ))}
        </div>
      </div>

      {majorNode ? (
        <div
          key={majorNode.id}
          className="anim-up space-y-2 opacity-100 transition-all duration-200"
          style={{ animationDuration: "0.3s" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            중분류
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
        <div
          key={middleNode.id}
          className="anim-up space-y-2 opacity-100 transition-all duration-200"
          style={{ animationDuration: "0.3s" }}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
            소분류
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

      <div className="border border-[var(--border-fine)] bg-[var(--bg-surface)]/80 px-3 py-2 text-sm text-[var(--ink-secondary)]">
        <span
          className={cn(
            "mr-1",
            selectedPath ? "font-semibold text-[var(--ink-primary)]" : ""
          )}
        >
          보관소 기준 대표 분류:
        </span>
        <span>{selectedPath || "소분류까지 선택하면 표시됩니다"}</span>
      </div>
    </div>
  );
}
