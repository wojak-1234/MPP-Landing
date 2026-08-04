"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, ShieldCheck, MessageSquareHeart, PartyPopper } from "lucide-react";
import { animate, stagger } from "animejs";
import { HeroBackdrop } from "./HeroBackdrop";
import { DiscordButton } from "./DiscordButton";
import { useCountUp } from "./useCountUp";
import { LiveOnlineCounter } from "./LiveOnlineCounter";
import { belagak } from "@/lib/fonts";

const DISCORD_INVITE = "https://discord.com/invite/mpplanet";

function useParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 60, damping: 18, mass: 0.4 });

  useEffect(() => {
    function handle(e: PointerEvent) {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      x.set(nx);
      y.set(ny);
    }
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, [x, y]);

  return { sx, sy };
}

type StatCardProps = {
  depth: number;
  className: string;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  delay?: number;
  icon: typeof Users;
  target: number;
  suffix: string;
  label: string;
  numeric: boolean;
  iconColorClass: string;
  iconBgClass: string;
};

function StatFloatingCard({
  depth,
  className,
  sx,
  sy,
  delay = 0,
  icon: Icon,
  target,
  suffix,
  label,
  numeric,
  iconColorClass,
  iconBgClass,
}: StatCardProps) {
  const { ref, value } = useCountUp(target, 2.2);
  const tx = useTransform(sx, (v) => v * depth * -0.7);
  const ty = useTransform(sy, (v) => v * depth * -0.7);
  const rx = useTransform(sy, (v) => v * depth * 0.8);
  const ry = useTransform(sx, (v) => v * depth * -0.8);

  return (
    <motion.div
      ref={ref}
      style={{ x: tx, y: ty, rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-strong absolute rounded-2xl ${className}`}
    >
      <div style={{ transform: "translateZ(12px)" }} className="flex items-center gap-3 p-4 shadow-[var(--shadow-raised)]">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBgClass} ${iconColorClass} shadow-[var(--shadow-inset)]`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-mono-num text-sm font-semibold text-[var(--text-primary)]">
            {numeric ? value.toLocaleString() : ""}
            {suffix}
          </p>
          <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const { sx, sy } = useParallax();
  const [memberCount, setMemberCount] = useState(5820); // 온라인 멤버 수 (fallback)
  const [totalMembers, setTotalMembers] = useState(29847); // 총 회원 수 (fallback)
  const ref = useRef<HTMLDivElement>(null);

  // Refs for Anime.js targetting
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const statsData = [
    {
      depth: 26,
      className: "left-[6%] top-[20%] w-[180px]",
      delay: 0.5,
      icon: Users,
      target: totalMembers,
      suffix: "+",
      label: "멤버",
      numeric: true,
      iconBgClass: "bg-[var(--accent-violet)]/20",
      iconColorClass: "text-[var(--accent-violet-soft)]"
    },
    {
      depth: 18,
      className: "right-[8%] top-[15%] w-[210px]",
      delay: 0.65,
      icon: ShieldCheck,
      target: 100,
      suffix: "%",
      label: "신뢰 제휴인",
      numeric: true,
      iconBgClass: "bg-[var(--accent-blue)]/20",
      iconColorClass: "text-[var(--accent-blue)]"
    },
    {
      depth: 22,
      className: "left-[8%] bottom-[18%] w-[190px]",
      delay: 0.75,
      icon: MessageSquareHeart,
      target: 24,
      suffix: "/7",
      label: "상시 소통",
      numeric: true,
      iconBgClass: "bg-[var(--accent-violet)]/20",
      iconColorClass: "text-[var(--accent-violet-soft)]"
    },
    {
      depth: 14,
      className: "right-[6%] bottom-[16%] w-[190px]",
      delay: 0.8,
      icon: PartyPopper,
      target: 0,
      suffix: "레이드",
      label: "파티 찾기",
      numeric: false,
      iconBgClass: "bg-[var(--accent-ember)]/20",
      iconColorClass: "text-[var(--accent-ember)]"
    }
  ];

  useEffect(() => {
    async function loadLiveStats() {
      try {
        const res = await fetch("/api/discord");
        const data = await res.json();
        if (data.success || data.members) {
          setTotalMembers(data.members);
          setMemberCount(data.presence);
        }
      } catch (e) {
        console.error("Failed to load discord api metrics:", e);
      }
    }
    loadLiveStats();
  }, []);

  useEffect(() => {
    // 1. Badge animation
    if (badgeRef.current) {
      animate(badgeRef.current, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 800,
        ease: "outExpo"
      });
    }

    // 2. Title stagger animation
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll(".title-word");
      animate(words, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 1100,
        delay: stagger(80, { start: 100 }),
        ease: "outElastic(1, 0.8)"
      });
    }

    // 3. Description animation
    if (descRef.current) {
      animate(descRef.current, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 1000,
        delay: 500,
        ease: "outExpo"
      });
    }

    // 4. Action buttons animation
    if (actionRef.current) {
      animate(actionRef.current, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 1000,
        delay: 650,
        ease: "outExpo"
      });
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100vh] w-full items-center justify-center overflow-hidden pt-28 pb-20"
    >
      <HeroBackdrop />

      {/* floating glass instrument cards — spatial UI signature */}
      <div className="pointer-events-none absolute inset-0 hidden md:block overflow-hidden perspective-1000 preserve-3d">
        {statsData.map((stat) => (
          <StatFloatingCard
            key={stat.label}
            depth={stat.depth}
            className={stat.className}
            sx={sx}
            sy={sy}
            delay={stat.delay}
            icon={stat.icon}
            target={stat.target}
            suffix={stat.suffix}
            label={stat.label}
            numeric={stat.numeric}
            iconColorClass={stat.iconColorClass}
            iconBgClass={stat.iconBgClass}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
        <div ref={badgeRef} style={{ opacity: 0 }} className="mb-8 flex flex-col items-center">
          <LiveOnlineCounter
            memberCount={memberCount}
            className={`${belagak.className} text-5xl leading-none tracking-tight text-gradient-accent sm:text-6xl`}
          />
          <span className="mt-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--text-muted)]">
            온라인
          </span>
        </div>

        <h1
          ref={titleRef}
          className="font-display text-5xl font-extrabold leading-[1.2] tracking-tight text-[var(--text-primary)] sm:text-6xl md:text-7xl"
        >
          <span className="block mb-2">
            {["메이플", "월드", "최대", "규모"].map((word, idx) => (
              <span
                key={idx}
                className="title-word inline-block mr-3"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            {["디스코드", "커뮤니티"].map((word, idx) => (
              <span
                key={idx}
                className="title-word text-gradient-accent inline-block mr-3"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={descRef}
          style={{ opacity: 0 }}
          className="mt-7 max-w-xl text-balance text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        >
          약 {(totalMembers / 10000).toFixed(0)}만 명의 메이플러가 모여 메소·닉네임·길드 거래부터 파티 모집,
          친목까지 — 가장 신뢰할 수 있는 방식으로 메이플 월드를 함께합니다.
        </p>

        <div
          ref={actionRef}
          style={{ opacity: 0 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <DiscordButton href={DISCORD_INVITE} label="Discord 참여하기" size="lg" />
          <DiscordButton
            href="#features"
            label="커뮤니티 둘러보기"
            size="lg"
            variant="ghost"
          />
        </div>
      </div>
    </section>
  );
}


