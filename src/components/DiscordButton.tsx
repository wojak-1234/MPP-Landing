"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function DiscordMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369A19.79 19.79 0 0 0 15.885 3c-.211.378-.456.888-.626 1.294a18.27 18.27 0 0 0-5.518 0A12.6 12.6 0 0 0 9.115 3a19.74 19.74 0 0 0-4.432 1.369C1.674 8.146.965 11.83 1.249 15.46a19.93 19.93 0 0 0 5.993 3.03c.483-.659.913-1.36 1.282-2.098a12.9 12.9 0 0 1-2.017-.967c.17-.124.336-.255.497-.39 3.83 1.764 7.97 1.764 11.752 0 .163.135.328.266.497.39-.642.382-1.32.703-2.02.969.37.738.8 1.439 1.283 2.097a19.9 19.9 0 0 0 5.997-3.03c.348-4.207-.66-7.857-2.696-11.092ZM8.02 13.33c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.42 2.156-2.42 1.2 0 2.176 1.087 2.156 2.42.001 1.334-.955 2.419-2.156 2.419Zm7.96 0c-1.183 0-2.156-1.085-2.156-2.419 0-1.333.955-2.42 2.156-2.42 1.199 0 2.176 1.087 2.156 2.42 0 1.334-.957 2.419-2.156 2.419Z" />
    </svg>
  );
}

export function DiscordButton({
  label = "Discord 참여하기",
  size = "lg",
  variant = "primary",
  href = "https://discord.com/invite/mpplanet",
  className = "",
  onClick,
}: {
  label?: string;
  size?: "lg" | "md";
  variant?: "primary" | "ghost";
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const sizeCls = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";

  if (variant === "ghost") {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`group inline-flex items-center gap-2.5 rounded-full glass ${sizeCls} font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-violet-soft)]/50 ${className}`}
      >
        <DiscordMark className="h-5 w-5 text-[var(--accent-violet-soft)]" />
        {label}
        <ArrowUpRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </motion.a>
    );
  }

  return (
    <div className={`shimmer-btn-wrapper inline-flex ${className}`}>
      <div className="shimmer-btn-border" />
      <motion.a
        href={href}
        onClick={onClick}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        className="group relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-full font-bold text-white bg-[#0e1017] shadow-[0_20px_45px_-15px_rgba(124,111,240,0.3)] transition-shadow hover:shadow-[0_25px_55px_-12px_rgba(124,111,240,0.5)]"
        style={{
          background: "linear-gradient(135deg, rgba(22, 25, 40, 0.95) 0%, rgba(14, 16, 27, 0.95) 100%)",
        }}
      >
        <div className={sizeCls + " flex items-center gap-2.5"}>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <DiscordMark className="h-5 w-5 text-[var(--accent-violet-soft)] transition-colors group-hover:text-white" />
          <span className="relative bg-gradient-to-r from-white to-[#d4d1f5] bg-clip-text text-transparent group-hover:from-white group-hover:to-white">
            {label}
          </span>
          <ArrowUpRight className="relative h-4 w-4 text-[var(--accent-violet-soft)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
        </div>
      </motion.a>
    </div>
  );
}

