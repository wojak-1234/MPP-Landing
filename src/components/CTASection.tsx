"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DiscordButton } from "./DiscordButton";

export function CTASection() {
  const [totalMembers, setTotalMembers] = useState(29847);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/discord");
        const data = await res.json();
        if (data.success || data.members) {
          setTotalMembers(data.members);
        }
      } catch (e) {
        console.error("Failed to load discord metrics in CTA:", e);
      }
    }
    loadStats();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    e.currentTarget.style.setProperty("--mouse-x", `${mouseX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${mouseY}px`);
  }

  return (
    <section id="cta" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          className="neo-raised spotlight-card group relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20"
        >
          <div className="spotlight-card-glow" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full -translate-x-1/2">
            <div className="absolute left-1/2 top-[-30%] h-[70%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(124,111,240,0.3),transparent_70%)] blur-2xl" />
            <div className="absolute right-[-10%] bottom-[-30%] h-[60%] w-[60%] rounded-full bg-[radial-gradient(circle,rgba(77,159,255,0.22),transparent_70%)] blur-2xl" />
          </div>


          <div className="relative">
            <p className="mb-4 text-sm font-semibold text-[var(--accent-violet-soft)]">
              Join Us
            </p>
            <h2 className="font-display mx-auto max-w-2xl text-balance text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] sm:text-4xl md:text-5xl">
              지금 메이플 최고의
              <br />
              커뮤니티에 참여하세요.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-balance text-base leading-relaxed text-[var(--text-secondary)]">
              {(totalMembers / 10000).toFixed(0)}만 명의 메이플러가 기다리고 있습니다. 거래, 파티, 친목까지 — 지금 바로 함께하세요.
            </p>

            <div className="mt-10 flex justify-center">
              <DiscordButton
                href="https://discord.com/invite/mpplanet"
                label="Discord 참여하기"
                size="lg"
                className="px-10 py-5 text-lg"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
