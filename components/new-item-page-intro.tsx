export function NewItemPageIntro() {
  return (
    <div className="mb-7 space-y-4">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
          NEW REGISTRY ENTRY
        </p>
        <h1 className="mt-1 text-3xl font-semibold">신규 소장 기록 생성</h1>
        <p className="mt-3 text-sm leading-6 text-stone-500">
          아직 보관소에 등록되지 않은 개체에 대한 기초 아카이브 자료를 작성합니다.
          작성된 기록은 보관소의 신규 자료로 등록됩니다.
        </p>
      </div>
      <div className="border-l-2 border-stone-400 bg-[#F4F1EA]/80 p-4 text-xs leading-6 text-stone-600">
        주의: 등록 대상은 현대 일상에서 관찰 가능한 실물이어야 합니다. 입력
        정보는 고증의 관점에서 사실에 기반해 차분히 작성해 주십시오.
      </div>
    </div>
  );
}
