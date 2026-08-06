import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] px-6 py-10">
      <Image
        src="/images/maple-leaf.png"
        alt=""
        width={130}
        height={130}
        className="pointer-events-none absolute -right-4 -top-10 opacity-[0.05]"
        style={{ transform: "rotate(10deg)" }}
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-extrabold text-white"
            style={{ background: "linear-gradient(135deg, #ff7a29 0%, #ffc94d 100%)" }}
          >
            M
          </span>
          <span className="font-display text-sm font-semibold text-[var(--text-secondary)]">
            메이플 월드 통합 디스코드
          </span>
        </div>
        <div className="flex flex-col items-center gap-2 sm:items-end">
          <Link
            href="/privacy"
            className="text-xs text-[var(--text-muted)] underline decoration-white/10 underline-offset-2 transition-colors hover:text-[var(--text-secondary)] hover:decoration-white/30"
          >
            개인정보 처리방침
          </Link>
          <p className="text-xs text-[var(--text-muted)]">
            본 커뮤니티는 Nexon Korea와 무관한 비공식 팬 커뮤니티입니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
