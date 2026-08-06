import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "개인정보 처리방침 | 메이플 플래닛",
  description:
    "메이플 플래닛 디스코드 봇이 수집하는 개인정보 항목, 이용 목적, 보유 기간 및 삭제 요청 방법을 안내합니다.",
};

const LAST_UPDATED = "2026년 8월 6일";

const collectedItems = [
  {
    item: "Discord 사용자 ID (스노우플레이크)",
    desc: "유저를 식별하기 위한 고유 번호. 이름·이메일 등 직접적인 개인정보는 아님",
    source: "Discord API (SERVER MEMBERS INTENT)",
  },
  {
    item: "서버(길드) ID",
    desc: "데이터가 속한 디스코드 서버 식별자",
    source: "Discord API",
  },
  {
    item: "초대 코드 및 사용 횟수",
    desc: "어떤 초대 링크로 입장했는지 기록",
    source: "Discord API (GUILD_INVITES)",
  },
  {
    item: "가입/퇴장 횟수(집계 카운트)",
    desc: "초대자별 누적 실적",
    source: "봇 자체 로직으로 산출",
  },
  {
    item: "로그 채널 설정(서버별)",
    desc: "관리자가 지정한 채널 ID",
    source: "관리자 입력",
  },
];

function Section({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-28" id={`section-${index}`}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] font-mono-num text-xs font-semibold text-[var(--text-secondary)]">
          {index}
        </span>
        <h2 className="font-display text-lg font-bold text-[var(--text-primary)] sm:text-xl">
          {title}
        </h2>
      </div>
      <div className="space-y-4 pl-10 text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            홈으로 돌아가기
          </Link>

          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-maple-soft)]">
              Privacy Policy
            </span>
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-gradient-primary sm:text-4xl">
            개인정보 처리방침
          </h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            최종 업데이트: {LAST_UPDATED}
          </p>

          <div className="glass mt-8 rounded-2xl border border-white/[0.08] p-5 text-sm leading-relaxed text-[var(--text-secondary)]">
            메이플 플래닛(이하 &ldquo;봇&rdquo;)은 디스코드(Discord) 서버 운영을 위해
            아래와 같이 개인정보를 처리합니다. 본 방침은 봇의 실제 동작을 기준으로
            작성되었으며, 이용자는 아래 내용을 확인하신 후 서비스를 이용하시기 바랍니다.
          </div>

          <div className="mt-12 space-y-12">
            <Section index={1} title="서비스 개요">
              <p>
                이 애플리케이션은 디스코드 서버 전용 봇으로, 아래 기능을 제공합니다.
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>서버 초대 링크 추적: 누가 어떤 초대 링크로 입장했는지 식별하고 초대자 실적을 집계</li>
                <li>입장 시 역할 자동 부여 (버튼 클릭 방식)</li>
                <li>신규 입장 로그(환영 메시지) 자동 게시</li>
                <li>서버 내 초대 실적 리더보드(<code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono-num text-[13px] text-[var(--text-primary)]">/초대순위</code>) 제공</li>
                <li>유저 본인 요청에 따른 데이터 삭제 처리(<code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono-num text-[13px] text-[var(--text-primary)]">/내데이터삭제</code>)</li>
              </ul>
            </Section>

            <Section index={2} title="수집하는 개인정보 항목">
              <div className="neo-card overflow-hidden rounded-xl">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                        <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">항목</th>
                        <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">설명</th>
                        <th className="px-4 py-3 font-semibold text-[var(--text-primary)]">수집 경로</th>
                      </tr>
                    </thead>
                    <tbody>
                      {collectedItems.map((row, i) => (
                        <tr
                          key={row.item}
                          className={i !== collectedItems.length - 1 ? "border-b border-white/[0.06]" : ""}
                        >
                          <td className="px-4 py-3 align-top font-medium text-[var(--text-primary)]">
                            {row.item}
                          </td>
                          <td className="px-4 py-3 align-top">{row.desc}</td>
                          <td className="px-4 py-3 align-top text-[var(--text-muted)]">{row.source}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>
                  <strong className="text-[var(--text-primary)]">메시지 본문(채팅 내용)은 전혀 수집하지 않습니다</strong>
                  {" "}(MESSAGE CONTENT INTENT 미사용).
                </li>
                <li>이름, 이메일, 전화번호, 실명 등 Discord 계정 외의 개인정보는 수집하지 않습니다.</li>
              </ul>
            </Section>

            <Section index={3} title="개인정보 수집 목적">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>초대 링크 기반 커뮤니티 성장 기여도(추천 실적) 산출 및 리더보드 제공</li>
                <li>신규 유저 입장 시 자동 역할 부여 및 환영 로그 제공</li>
                <li>서비스 운영·부정 사용 방지(동일 초대자 재입장, 초대자 변경 등 실적 조정 로직)</li>
              </ul>
            </Section>

            <Section index={4} title="보유 및 이용 기간">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>
                  초대 실적 데이터(referrals, joined_members)는 리더보드 기능의 특성상(누적 통계)
                  유저가 서버에 남아있는 동안 또는 별도 삭제 요청이 있기 전까지 보유합니다.
                </li>
                <li>유저가 본인 데이터를 삭제 요청하면, 검증 후 즉시 영구 삭제합니다 (아래 6번 참고).</li>
                <li>서버별 설정값(로그 채널 등)은 해당 서버가 봇을 이용하는 동안 보유합니다.</li>
              </ul>
            </Section>

            <Section index={5} title="개인정보의 안전성 확보 조치">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>전송 구간: 데이터베이스(Supabase/PostgreSQL) 연결 시 TLS 암호화 통신 사용</li>
                <li>저장 구간: 관리형 데이터베이스(Supabase)의 디스크 암호화(저장 시 암호화) 적용</li>
                <li>접근 통제: 데이터베이스 접속 정보(자격증명)는 소스 코드에 포함하지 않고 별도 환경변수로 관리</li>
                <li>최소 수집 원칙: 기능 제공에 필요한 Discord ID·카운트 값 외의 정보는 수집하지 않음</li>
              </ul>
            </Section>

            <Section index={6} title="이용자의 권리 및 행사 방법 (개인정보 삭제 요청)">
              <p>이용자는 언제든지 본인의 데이터에 대해 삭제를 요청할 수 있습니다.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="neo-card rounded-xl p-4">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-maple-soft)]">
                    1차 경로 — 봇 명령어
                  </p>
                  <p>
                    디스코드 서버 내에서{" "}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono-num text-[13px] text-[var(--text-primary)]">
                      /내데이터삭제
                    </code>{" "}
                    명령어를 실행하면, 해당 서버의 관리자에게 삭제 요청이 전달되도록
                    안내되며, 관리자가 확인 후 즉시 삭제를 처리합니다.
                  </p>
                </div>
                <div className="neo-card rounded-xl p-4">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">
                    2차 경로(백업) — 이메일
                  </p>
                  <p>
                    서버 관리자를 통한 처리가 어려운 경우{" "}
                    <a
                      href="mailto:chozzabzr@gmail.com"
                      className="text-[var(--text-primary)] underline decoration-white/20 underline-offset-2 hover:decoration-white/60"
                    >
                      chozzabzr@gmail.com
                    </a>
                    으로 문의하실 수 있습니다.
                  </p>
                </div>
              </div>
              <p>삭제 시 아래 데이터가 영구 삭제됩니다.</p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>본인이 초대받아 가입한 기록(누가 초대했는지)</li>
                <li>본인이 초대자로서 쌓은 실적(가입/퇴장 집계)</li>
                <li>다른 유저의 기록에 남아있는 본인의 초대자 표기</li>
              </ul>
            </Section>

            <Section index={7} title="제3자 제공 및 처리위탁">
              <ul className="list-disc space-y-1.5 pl-5 marker:text-[var(--text-muted)]">
                <li>데이터베이스 호스팅을 위해 Supabase(PostgreSQL 관리형 서비스)를 이용합니다.</li>
                <li>그 외 제3자에게 개인정보를 제공하지 않습니다.</li>
              </ul>
            </Section>

            <Section index={8} title="문의처">
              <p>
                개인정보 처리방침에 대한 문의사항은 아래 이메일로 연락 주시기 바랍니다.
              </p>
              <p className="font-medium text-[var(--text-primary)]">
                개발자 이메일:{" "}
                <a
                  href="mailto:chozzabzr@gmail.com"
                  className="underline decoration-white/20 underline-offset-2 hover:decoration-white/60"
                >
                  chozzabzr@gmail.com
                </a>
              </p>
            </Section>
          </div>

          <p className="mt-16 text-center text-xs text-[var(--text-muted)]">
            본 방침은 서비스 운영 방식 변경에 따라 사전 고지 없이 개정될 수 있습니다.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
