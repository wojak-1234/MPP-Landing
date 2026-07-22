# 메이플 월드 디스코드 커뮤니티 랜딩 페이지

Spatial UI + Neo Morphism 컨셉의 다크 테마 랜딩 페이지입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속.

배포용 빌드:

```bash
npm run build
npm run start
```

## 폰트 안내

기본값은 시스템 폰트 스택(Pretendard / Apple SD Gothic Neo 등)으로 설정되어 있어 별도 설정 없이 바로 동작합니다.

실제 서비스에 배포할 때 디자인 의도를 100% 살리려면 `next/font/google`로 교체하는 것을 권장합니다:

```tsx
// src/app/layout.tsx
import { Plus_Jakarta_Sans, Noto_Sans_KR, JetBrains_Mono } from "next/font/google";

const display = Plus_Jakarta_Sans({
  variable: "--font-display-google",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
// ... body(Noto_Sans_KR), mono(JetBrains_Mono) 동일하게 적용 후
// html className에 `${display.variable}` 추가하고
// globals.css의 --font-display 값을 `var(--font-display-google), "Pretendard", sans-serif` 형태로 연결하세요.
```

(이 샌드박스 환경은 외부 네트워크 정책상 Google Fonts를 직접 fetch할 수 없어 시스템 폰트로 대체했습니다. 일반적인 로컬/Vercel 환경에서는 `next/font/google` 코드가 정상 동작합니다.)

## 디자인 토큰

`src/app/globals.css`에 컬러/그림자/글래스 효과가 CSS 변수로 정의되어 있습니다.

- 배경: `--bg-void`, `--bg-surface` 등 (다크 네이비 계열)
- 포인트 컬러: `--accent-violet`(보라), `--accent-blue`(블루), `--accent-ember`(메이플 단풍 포인트)
- 글래스 효과: `.glass`, `.glass-strong`
- 뉴몰피즘 카드: `.neo-card`, `.neo-raised`

## 디스코드 초대 링크 변경

각 컴포넌트의 `href="https://discord.gg/"` 부분을 실제 초대 링크로 교체하세요.
검색 대상 파일: `HeroSection.tsx`, `CommunitySection.tsx`, `CTASection.tsx`, `Navbar.tsx`.

## 구조

```
src/
  app/
    layout.tsx        # 메타데이터, 전역 레이아웃
    globals.css        # 디자인 토큰 (컬러/그림자/글래스)
    page.tsx            # 섹션 조합
  components/
    Navbar.tsx           # 플로팅 글래스 네비게이션
    HeroSection.tsx      # 히어로 + 패럴랙스 떠다니는 카드
    HeroBackdrop.tsx     # 추상 단풍 폴리곤 배경 (게임 에셋 미사용)
    DiscordButton.tsx    # 공용 CTA 버튼
    FeatureSection.tsx   # 7개 기능 bento-grid 카드
    CommunitySection.tsx # 메이플 플래닛 / 메이플 랜드 2개 카드
    StatisticsSection.tsx # 카운트업 통계
    useCountUp.ts         # 카운트업 훅
    CTASection.tsx        # 최종 CTA
    Footer.tsx
```
