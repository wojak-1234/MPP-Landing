export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, #8b7dfb 0%, #4d9fff 100%)" }}
          >
            M
          </span>
          <span className="font-display text-sm font-semibold text-[var(--text-secondary)]">
            메이플 월드 커뮤니티
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          본 커뮤니티는 Nexon Korea와 무관한 비공식 팬 커뮤니티입니다.
        </p>
      </div>
    </footer>
  );
}
