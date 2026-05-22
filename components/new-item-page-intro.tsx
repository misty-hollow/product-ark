export function NewItemPageIntro() {
  return (
    <div className="mb-7 space-y-4 border-l-[3px] border-[var(--accent-red)] pl-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
          NEW REGISTRY ENTRY
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-[var(--ink-primary)]">
          기초 소장 서식 수립 및 등재
        </h1>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-secondary)]">
          아직 보관소에 등록되지 않은 개체에 대한 신규 소장 기록 생성 절차입니다.
          이름, 식별 이미지, 분류, 제조 정보를 한 장의 보존 서식으로 정리합니다.
        </p>
      </div>
      <div className="border-l-2 border-[var(--ink-muted)] bg-[var(--bg-surface)]/80 p-4 text-xs leading-6 text-[var(--ink-secondary)]">
        주의: 등록 대상은 현대 일상에서 관찰 가능한 실물이어야 합니다. 입력 정보는 고증의
        관점에서 사실에 기반해 차분히 작성해 주십시오.
      </div>
    </div>
  );
}
