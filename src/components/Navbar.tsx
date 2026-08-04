"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { DiscordButton } from "./DiscordButton";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300"
    >
      <nav
        className={`flex w-full max-w-5xl flex-col rounded-2xl px-5 py-3 shadow-[var(--shadow-ambient)] transition-all duration-300 ${scrolled
          ? "glass-strong border-white/[0.12] bg-[var(--bg-surface)]/80"
          : "glass border-white/[0.08]"
          }`}
      >
        <div className="flex w-full items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src="/mapleland.webp"
              alt="메이플 플래닛"
              width={150}
              height={121}
              priority
              className="h-9 w-auto"
            />
            <span className="font-display text-sm font-bold tracking-tight text-[var(--text-primary)]">
              메이플 플래닛
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-7 text-sm text-[var(--text-secondary)] md:flex">
            <a href="#features" className="transition-colors hover:text-[var(--text-primary)]">
              기능
            </a>
            <a href="#community" className="transition-colors hover:text-[var(--text-primary)]">
              커뮤니티
            </a>
          </div>

          <div className="hidden items-center md:flex">
            <DiscordButton href="#cta" label="참여하기" size="md" />
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[var(--text-primary)] hover:bg-white/10 md:hidden"
            aria-label="메뉴 열기"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-4 pt-5 pb-2 text-sm text-[var(--text-secondary)]">
                <a
                  href="#features"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-[var(--text-primary)]"
                >
                  기능
                </a>
                <a
                  href="#community"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-[var(--text-primary)]"
                >
                  커뮤니티
                </a>
                <a
                  href="#stats"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-[var(--text-primary)]"
                >
                  현황
                </a>
                <div className="pt-2 border-t border-white/[0.06]">
                  <DiscordButton
                    href="#cta"
                    label="참여하기"
                    size="md"
                    className="w-full justify-center"
                    onClick={() => setIsOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

