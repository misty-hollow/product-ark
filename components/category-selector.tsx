"use client";

import { CATALOG_TREE, formatCategoryPath } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CategorySelectorProps = {
  major: string;
  middle: string;
  minor: string;
  onChange: (next: { major: string; middle: string; minor: string }) => void;
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
        "rounded-md border px-3 py-2 text-sm font-medium transition",
        selected
          ? "border-stone-800 bg-stone-800 text-stone-50"
          : "border-stone-300 bg-white text-stone-600 hover:border-stone-500 hover:bg-stone-100"
      )}
    >
      {label}
    </button>
  );
}

export function CategorySelector({
  major,
  middle,
  minor,
  onChange
}: CategorySelectorProps) {
  const majorNode = CATALOG_TREE.find((node) => node.label === major);
  const middleNode = majorNode?.children.find((node) => node.label === middle);
  const selectedPath = formatCategoryPath(major, middle, minor);

  return (
    <div className="space-y-4 rounded-lg border border-stone-200 bg-white p-4">
      <div>
        <p className="text-sm font-semibold text-stone-700">
          분류 <span className="text-xs text-stone-400">선택</span>
        </p>
        <p className="mt-1 text-xs leading-5 text-stone-500">
          대분류, 중분류, 소분류를 차례로 선택합니다. 소분류까지 선택하면 보관소
          분류가 저장됩니다.
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">대분류</p>
        <div className="flex flex-wrap gap-2">
          {CATALOG_TREE.map((node) => (
            <Chip
              key={node.label}
              label={node.label}
              selected={major === node.label}
              onClick={() => onChange({ major: node.label, middle: "", minor: "" })}
            />
          ))}
        </div>
      </div>

      {majorNode ? (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">중분류</p>
          <div className="flex flex-wrap gap-2">
            {majorNode.children.map((node) => (
              <Chip
                key={node.label}
                label={node.label}
                selected={middle === node.label}
                onClick={() => onChange({ major, middle: node.label, minor: "" })}
              />
            ))}
          </div>
        </div>
      ) : null}

      {middleNode ? (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">소분류</p>
          <div className="flex flex-wrap gap-2">
            {middleNode.children.map((label) => (
              <Chip
                key={label}
                label={label}
                selected={minor === label}
                onClick={() => onChange({ major, middle, minor: label })}
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-500">
        저장될 분류:{" "}
        <span className="font-semibold text-stone-800">
          {selectedPath || "소분류까지 선택하면 표시됩니다"}
        </span>
      </div>
    </div>
  );
}
