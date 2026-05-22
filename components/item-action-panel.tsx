"use client";

import { Flag, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { deleteItemAction, reportItemAction } from "@/app/actions/items";
import { Button } from "@/components/ui/button";
import { REPORT_REASONS, type ReportReasonValue } from "@/lib/report-reasons";

type ItemActionPanelProps = {
  itemId: string;
  isOwner: boolean;
  canReport: boolean;
  hasReported: boolean;
};

export function ItemActionPanel({
  itemId,
  isOwner,
  canReport,
  hasReported
}: ItemActionPanelProps) {
  const router = useRouter();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isReportPending, startReportTransition] = useTransition();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reason, setReason] = useState<ReportReasonValue>(REPORT_REASONS[0].value);
  const [reportSubmitted, setReportSubmitted] = useState(hasReported);
  const [message, setMessage] = useState<string | null>(
    hasReported ? "신고가 접수되었습니다" : null
  );
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      "이 소장 기록을 보존 해제할까요? 해제하면 이 물건에 남겨진 기억 기록도 함께 삭제됩니다."
    );

    if (!confirmed) return;

    setError(null);
    startDeleteTransition(async () => {
      const result = await deleteItemAction(itemId);

      if (!result.ok) {
        setError(result.error ?? "기록을 보존 해제하지 못했습니다.");
        return;
      }

      router.push("/");
      router.refresh();
    });
  }

  function handleReport() {
    setError(null);
    setMessage(null);

    startReportTransition(async () => {
      const result = await reportItemAction(itemId, reason);

      if (!result.ok) {
        setError(result.error ?? "신고를 접수하지 못했습니다.");
        return;
      }

      setReportSubmitted(true);
      setIsReportOpen(false);
      setMessage(result.message ?? "신고가 접수되었습니다");
      router.refresh();
    });
  }

  if (!isOwner && !canReport) {
    return null;
  }

  return (
    <div className="space-y-3 border border-[var(--border-fine)] bg-[var(--bg-surface)]/70 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--ink-primary)]">
            소장 기록 관리
          </p>
          <p className="mt-1 text-xs text-[var(--ink-secondary)]">
            보존 해제는 최초 등록자 본인만 수행할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canReport ? (
            <Button
              type="button"
              variant="outline"
              className="rounded-none border-[var(--border-medium)] text-[var(--ink-secondary)] hover:bg-[var(--bg-surface)]"
              onClick={() => setIsReportOpen((current) => !current)}
              disabled={reportSubmitted}
            >
              <Flag className="mr-2 h-4 w-4" aria-hidden="true" />
              {reportSubmitted ? "신고 접수됨" : "이 기록 신고"}
            </Button>
          ) : null}
          {isOwner ? (
            <Button
              type="button"
              variant="destructive"
              className="rounded-none"
              onClick={handleDelete}
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              기록 보존 해제
            </Button>
          ) : null}
        </div>
      </div>

      {isReportOpen && !reportSubmitted ? (
        <div className="grid gap-3 border border-[var(--border-fine)] bg-white p-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="grid gap-2 text-sm font-medium text-[var(--ink-secondary)]">
            신고 사유
            <select
              value={reason}
              onChange={(event) => setReason(event.target.value as ReportReasonValue)}
              className="h-10 rounded-none border border-[var(--border-medium)] bg-[var(--bg-base)] px-3 text-sm text-[var(--ink-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink-muted)]"
            >
              {REPORT_REASONS.map((reportReason) => (
                <option key={reportReason.value} value={reportReason.value}>
                  {reportReason.label}
                </option>
              ))}
            </select>
          </label>
          <Button
            type="button"
            onClick={handleReport}
            disabled={isReportPending}
            className="rounded-none bg-[var(--ink-primary)] text-[var(--bg-base)] hover:bg-[var(--accent-signal)]"
          >
            {isReportPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Flag className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            신고 제출
          </Button>
        </div>
      ) : null}

      {message ? <p className="text-sm font-semibold text-[var(--ink-primary)]">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
