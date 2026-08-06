"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { DiscordButton } from "./DiscordButton";
import { ShaderGradientCanvas, ShaderGradient } from "./ShaderGradient";

type Community = {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  desc: string;
  href: string;
  gradient: string;
};

const communities: Community[] = [
  {
    id: "planet",
    emoji: "🍁",
    name: "메이플 플래닛 디스코드",
    tagline: "정통 메이플 월드를 위한 공간",
    desc: "보스, 사냥, 거래까지 — 메이플 플래닛 유저들을 위한 가장 활발한 거래·정보 채널을 만나보세요.",
    href: "https://discord.com/invite/mpplanet",
    gradient: "linear-gradient(135deg, rgba(255,122,41,0.22), rgba(255,201,77,0.08))",
  },
  {
    id: "land",
    emoji: "🌎",
    name: "메이플 랜드 디스코드",
    tagline: "메이플 랜드 유저들의 모임터",
    desc: "메이플 랜드만의 시세, 닉네임, 길드 정보를 실시간으로 공유하는 전용 커뮤니티입니다.",
    href: "https://discord.gg/wa7AaupNR",
    gradient: "linear-gradient(135deg, rgba(255,77,62,0.2), rgba(255,201,77,0.08))",
  },
];

function CommunityCard({ c, index }: { c: Community; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 22 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);

    e.currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="neo-raised spotlight-card group relative overflow-hidden rounded-3xl p-9 transition-shadow duration-300 hover:shadow-[0_50px_90px_-30px_rgba(255,122,41,0.35)] sm:p-10"
    >
      <div className="spotlight-card-glow" />
      <Image
        src="/images/maple-leaf.png"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute -bottom-6 -right-6 opacity-[0.07]"
        style={{ transform: "rotate(-12deg)" }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-15 overflow-hidden rounded-3xl -z-10">
        <ShaderGradientCanvas style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
          <ShaderGradient
            animate="on"
            axesHelper="off"
            brightness={1}
            cAzimuthAngle={180}
            cDistance={2.8}
            cPolarAngle={80}
            cameraZoom={9.1}
            color1={c.id === "planet" ? "#5c4530" : "#7a3d2e"}
            color2="#c9903d"
            color3="#241a12"
            destination="onCanvas"
            embedMode="off"
            envPreset="city"
            format="gif"
            fov={45}
            frameRate={10}
            gizmoHelper="hide"
            grain="on"
            lightType="3d"
            pixelDensity={1}
            positionX={0}
            positionY={0}
            positionZ={0}
            range="disabled"
            rangeEnd={40}
            rangeStart={0}
            reflection={0.1}
            rotationX={50}
            rotationY={0}
            rotationZ={-60}
            shader="defaults"
            type="waterPlane"
            uAmplitude={0}
            uDensity={1.5}
            uFrequency={0}
            uSpeed={0.3}
            uStrength={1.5}
            uTime={8}
            wireframe={false}
          />
        </ShaderGradientCanvas>
      </div>
      <div className="relative z-10" style={{ transform: "translateZ(10px)" }}>
        <motion.div
          whileHover={{ y: -5, rotate: [0, -5, 5, 0] }}
          transition={{
            y: { type: "spring", stiffness: 200, damping: 12 },
            rotate: { type: "keyframes", duration: 0.45, ease: "easeInOut" }
          }}
          className="glass mb-7 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
        >

          {c.emoji}
        </motion.div>

        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          {c.tagline}
        </p>
        <h3 className="font-display text-2xl font-bold text-[var(--text-primary)] sm:text-[1.7rem]">
          {c.name}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
          {c.desc}
        </p>

        <div className="mt-8">
          <DiscordButton href={c.href} label="이 커뮤니티 참여하기" size="md" />
        </div>
      </div>
    </motion.div>
  );
}

export function CommunitySection() {
  return (
    <section id="community" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-gold)]">
            <Image src="/images/maple-leaf.png" alt="" width={14} height={14} className="opacity-90" />
            Community
          </p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            두 개의 메이플 월드,
            <br />
            하나의 커뮤니티
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {communities.map((c, i) => (
            <CommunityCard key={c.name} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

