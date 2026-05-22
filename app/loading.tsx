export default function Loading() {
  return (
    <div className="ark-wrap flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center">
      <p className="label-mono">CONNECTING TO EARTH_CORE_DATABASE...</p>
      <div className="flex gap-1.5" aria-label="로딩 중">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--ink-3)",
              animation: `fadeIn 0.6s ${index * 0.15}s ease infinite alternate`
            }}
          />
        ))}
      </div>
    </div>
  );
}
