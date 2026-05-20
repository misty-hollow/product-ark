export const REPORT_REASONS = [
  { value: "DUPLICATE_RECORD", label: "중복 기록" },
  { value: "IRRELEVANT_RECORD", label: "자료와 무관한 기록" },
  { value: "INAPPROPRIATE_IMAGE", label: "부적절한 이미지" },
  { value: "AD_SPAM", label: "광고/스팸" },
  { value: "PERSONAL_INFO", label: "개인정보 포함" },
  { value: "INCORRECT_INFO", label: "잘못된 정보" },
  { value: "OTHER", label: "기타" }
] as const;

export type ReportReasonValue = (typeof REPORT_REASONS)[number]["value"];

export function isReportReason(value: string): value is ReportReasonValue {
  return REPORT_REASONS.some((reason) => reason.value === value);
}
