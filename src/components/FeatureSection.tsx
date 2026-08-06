"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  ShieldCheck,
  Tag,
  Users,
  MessageCircle,
  PartyPopper,
  Flame,
  ArrowRight
} from "lucide-react";
import { ShaderGradientCanvas, ShaderGradient } from "./ShaderGradient";

type TabId = "market" | "names" | "party" | "chat";

type FeatureTab = {
  id: TabId;
  icon: typeof Coins;
  title: string;
  shortDesc: string;
  detailTitle: string;
  detailDesc: string;
};

const featureTabs: FeatureTab[] = [
  {
    id: "market",
    icon: Coins,
    title: "메소 거래소",
    shortDesc: "제휴 중개 안전 메소 거래",
    detailTitle: "제휴인을 통한 신뢰할 수 있는 메소 거래",
    detailDesc: "검증된 제휴인이 중개하는 안전 거래 시스템으로 사기 걱정 없이 자유롭게 메소와 재화를 거래하세요.",
  },
  {
    id: "names",
    icon: Tag,
    title: "닉네임 & 길드",
    shortDesc: "S급 닉네임 및 길드 양도소",
    detailTitle: "원하는 닉네임 입찰 및 길드 인수 정보",
    detailDesc: "희귀한 닉네임을 입찰하거나 가치 높은 길드 거래 정보를 안전한 전용 채널을 통해 공유하고 투명하게 조율합니다.",
  },
  {
    id: "party",
    icon: PartyPopper,
    title: "파티 모집",
    shortDesc: "보스 레이드 및 사냥 파티 구인",
    detailTitle: "목표별 맞춤형 파티원 매칭 시스템",
    detailDesc: "보스 레이드, 파티 사냥, 주간 퀘스트까지 — 매시간 올라오는 모집 게시판을 통해 즉각적인 파티 매칭이 가능합니다.",
  },
  {
    id: "chat",
    icon: MessageCircle,
    title: "친목 & 일상 커뮤니티",
    shortDesc: "24시간 활성화된 소통 공간",
    detailTitle: "메이플러들이 소통하는 일상 아지트",
    detailDesc: "사냥 정보, 꿀팁 전수부터 아이템 가치 토론 및 사소한 일상 잡담까지 24시간 내내 활기찬 채팅이 흐릅니다.",
  },
];

function MarketMockup() {
  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">메소 거래 신뢰 지표</span>
          <span className="inline-flex items-center gap-1 text-[10px] rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-400 font-medium">
            <ShieldCheck className="h-3 w-3" /> 실시간 보증
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-6">검증된 시스템을 통해 실시간 거래 안전도를 보장합니다.</p>

        <div className="space-y-5">
          {/* 신뢰율 카드 */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">거래 안전 신뢰율</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">사기 사고율 0% 보장</p>
            </div>
            <p className="font-display text-3xl font-extrabold text-emerald-400">100%</p>
          </div>

          {/* 거래 상태 카드 */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[var(--text-muted)]">실시간 거래 강도</p>
              <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">최근 1시간 내 거래 성사</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-bold text-white">매우 활발</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-[var(--text-muted)] border-t border-white/[0.08] pt-4.5">
        * 본 커뮤니티는 보증금 제도를 도입한 제휴 거래인 제도를 운영하여, 사고 발생 시 보증 기금을 통해 피해액 전액을 보장합니다.
      </p>
    </div>
  );
}

function NamesMockup() {
  const [bids, setBids] = useState([
    { name: "타락파워전사", price: 15, time: "2분 전" },
    { name: "아시안느", price: 9.8, time: "10분 전" },
    { name: "똠양꿍", price: 4.2, time: "1시간 전" },
  ]);

  const placeBid = (idx: number) => {
    setBids(prev => prev.map((b, i) => i === idx ? { ...b, price: parseFloat((b.price + 0.5).toFixed(1)), time: "방금 전" } : b));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      placeBid(0);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-ember)]">실시간 레어 닉네임 입찰</span>
          <span className="flex items-center gap-1 text-[10px] rounded-md bg-[var(--accent-ember)]/10 px-2 py-0.5 text-[var(--accent-ember)] font-medium">
            <Flame className="h-3 w-3" /> HOT 입찰중
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] mb-5">커뮤니티 내 거래되는 인기 닉네임의 입찰 현황입니다.</p>

        <div className="space-y-3">
          {bids.map((b, i) => (
            <div key={b.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 hover:bg-white/[0.07] transition-all">
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">{b.name}</p>
                <p className="text-[9px] text-[var(--text-muted)]">{b.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono-num text-xs font-bold text-[var(--accent-ember)]">{b.price} 억</span>
                <button
                  onClick={() => placeBid(i)}
                  className="rounded-lg bg-[var(--accent-ember)]/20 px-2.5 py-1.5 text-[10px] font-bold text-[var(--accent-ember)] hover:bg-[var(--accent-ember)] hover:text-white transition-all active:scale-95 cursor-pointer"
                >
                  호가 +0.5
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PartyMockup() {
  const [slotCount, setSlotCount] = useState(2);
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (joined) {
      setSlotCount(2);
      setJoined(false);
    } else {
      setSlotCount(3);
      setJoined(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlotCount(3);
      setJoined(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-maple-soft)]">파티 매칭</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[var(--accent-maple)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--accent-maple-soft)]">
            <Users className="h-3 w-3" /> {slotCount} / 4 구인중
          </span>
        </div>

        <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-maple)]/15 text-[var(--accent-maple-soft)]">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">혼테일 레이드 도기/격수 구함</p>
              <p className="text-[10px] text-[var(--text-secondary)]">아이템 분배 자유 배분제</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 my-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-7 w-7 rounded-lg flex items-center justify-center border text-[10px] font-bold transition-all duration-300 ${i < slotCount
                  ? "bg-[var(--accent-maple)]/20 border-[var(--accent-maple-soft)] text-[var(--accent-maple-soft)]"
                  : "bg-white/5 border-white/10 text-[var(--text-muted)]"
                  }`}
              >
                {i < slotCount ? "P" : "대기"}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={handleJoin}
          className={`w-full rounded-xl py-3 text-xs font-bold transition-all active:scale-98 cursor-pointer ${joined
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
            : "bg-[var(--accent-maple)] text-white hover:bg-[var(--accent-maple-soft)] hover:shadow-[0_0_20px_rgba(255,122,41,0.4)]"
            }`}
        >
          {joined ? "지원 취소하기" : "파티 즉시 지원"}
        </button>
      </div>
    </div>
  );
}

function ChatMockup() {
  const [messages, setMessages] = useState([
    { user: "격수마스터", text: "핑크빈 12채 가실 격수 구함" },
    { user: "안전거래상", text: "오늘 메소 평균 시세 거래 완료" },
    { user: "레어닉컬렉터", text: "두글자 닉네임 교환 및 거래 가능" },
  ]);

  useEffect(() => {
    const chatSamples = [
      { user: "신용보증인", text: "제휴 거래소 덕분에 안전하게 마쳤네요" },
      { user: "혼테일딜러", text: "오늘 저녁 혼테일 정모 8시" },
      { user: "길드마스터", text: "길드 합병 및 매매 정보 공유함" },
      { user: "잡담맨", text: "오늘도 메이플 월드는 붐비네요" }
    ];

    const interval = setInterval(() => {
      const randomMsg = chatSamples[Math.floor(Math.random() * chatSamples.length)];
      setMessages(prev => [...prev.slice(1), randomMsg]);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-gold)]">소통 채널</span>
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            32,948 명 활성화
          </span>
        </div>

        <div className="space-y-2.5 font-sans">
          {messages.map((m, i) => (
            <motion.div
              key={i + m.user}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col rounded-xl bg-white/[0.02] border border-white/[0.04] p-2.5"
            >
              <span className="text-[10px] font-bold text-[var(--text-secondary)]">{m.user}</span>
              <span className="text-xs text-[var(--text-primary)] mt-0.5">{m.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureSection() {
  const [activeTab, setActiveTab] = useState<TabId>("market");

  const currentTabInfo = featureTabs.find((t) => t.id === activeTab)!;

  return (
    <section id="features" className="relative px-6 py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-maple-soft)]">
            <Image src="/images/maple-leaf.png" alt="" width={14} height={14} className="opacity-90" />
            Features
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            메이플 월드를 더 안전하고
            <br />
            즐겁게 즐기는 방법
          </h2>
        </motion.div>

        {/* Unified Hub Card Component with ShaderGradient Backdrop */}
        <div className="neo-raised relative overflow-hidden rounded-3xl border border-white/[0.06] p-8 md:p-12 shadow-[var(--shadow-raised)]">

          {/* Animated 3D Fluid Gradient Background */}
          <ShaderGradientCanvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
            <ShaderGradient />
          </ShaderGradientCanvas>

          {/* Subtle maple leaf watermark */}
          <Image
            src="/images/maple-leaf.png"
            alt=""
            width={180}
            height={180}
            className="pointer-events-none absolute -right-8 -top-8 opacity-[0.06]"
            style={{ transform: "rotate(18deg)" }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-12">

            {/* Left Column: Tab Selectors */}
            <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
              {featureTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="group relative flex w-full items-start gap-4 rounded-xl p-4.5 text-left transition-all duration-300 hover:bg-white/[0.02] cursor-pointer"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFeatureBg"
                        className="absolute inset-0 rounded-xl bg-white/[0.04] border border-white/[0.08]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all ${isActive ? "bg-[var(--accent-maple)]/15 border-[var(--accent-maple-soft)]/30 text-[var(--accent-maple-soft)]" : "text-[var(--text-secondary)]"
                      }`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="relative z-10">
                      <p className={`text-sm font-bold tracking-tight transition-colors ${isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-white"
                        }`}>
                        {tab.title}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">{tab.shortDesc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Middle and Right Column: Tab Descriptions & Mini Simulator */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

              {/* Detailed Description Pane */}
              <div className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTabInfo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="font-display text-xl font-bold leading-snug text-[var(--text-primary)] mb-4">
                      {currentTabInfo.detailTitle}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-6">
                      {currentTabInfo.detailDesc}
                    </p>

                    <a
                      href="https://discord.com/invite/mpplanet"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-maple-soft)] hover:text-white transition-colors"
                    >
                      실시간 소통방 참여하기 <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Dynamic Interactive Simulator / Mockup Box */}
              <div className="glass rounded-2xl border border-white/[0.08] min-h-[300px] overflow-hidden bg-[var(--bg-surface)]/45">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="h-full"
                  >
                    {activeTab === "market" && <MarketMockup />}
                    {activeTab === "names" && <NamesMockup />}
                    {activeTab === "party" && <PartyMockup />}
                    {activeTab === "chat" && <ChatMockup />}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
