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
    hasReported ? "신고가 접수되었습니다." : null
  );
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      "이 소장 기록을 삭제할까요? 삭제하면 이 물건에 남겨진 증언도 함께 삭제됩니다."
    );

    if (!confirmed) return;

    setError(null);
    startDeleteTransition(async () => {
      const result = await deleteItemAction(itemId);

      if (!result.ok) {
        setError(result.error ?? "기록을 삭제하지 못했습니다.");
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
      setMessage(result.message ?? "신고가 접수되었습니다.");
      router.refresh();
    });
  }

  if (!isOwner && !canReport) {
    return null;
  }

  return (
    <div className="space-y-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone-800">소장 기록 관리</p>
          <p className="mt-1 text-xs text-stone-500">
            삭제는 최초 기록자 본인만 할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {canReport ? (
            <Button
              type="button"
              variant="outline"
              className="border-stone-300 text-stone-600 hover:bg-stone-100"
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
        <div className="grid gap-3 rounded-lg border border-stone-200 bg-white p-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="grid gap-2 text-sm font-medium text-stone-700">
            신고 사유
            <select
              value={reason}
              onChange={(event) => setReason(event.target.value as ReportReasonValue)}
              className="h-10 rounded-md border border-stone-300 bg-stone-50 px-3 text-sm text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
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
            className="bg-stone-800 text-stone-50 hover:bg-stone-700"
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

      {message ? <p className="text-sm font-semibold text-stone-700">{message}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
