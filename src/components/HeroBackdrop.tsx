"use client";

/**
 * Hero section background: a looping video (public/videos/backdrop.mp4)
 * with a dark readability overlay so the badge/title/buttons stay legible
 * on top of it.
 */
export function HeroBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/backdrop.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* 가독성을 위한 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}


