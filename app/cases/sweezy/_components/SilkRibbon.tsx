'use client';

import { memo } from 'react';

/**
 * Ukrainian silk ribbon — fixed background that flows through the whole page.
 * Two wavy horizontal bands (blue + gold) morph continuously via CSS keyframes,
 * producing a silk-like motion.
 */
function SilkRibbonComponent() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ mixBlendMode: 'screen' }}
    >
      <svg
        className="silk-svg"
        width="100%"
        height="100%"
        viewBox="0 0 1600 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="silk-blue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0057B8" stopOpacity="0" />
            <stop offset="30%" stopColor="#0057B8" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#2c7dd6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0057B8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silk-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
            <stop offset="35%" stopColor="#FFD700" stopOpacity="0.5" />
            <stop offset="65%" stopColor="#FFB800" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </linearGradient>
          <filter id="silk-blur">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <g filter="url(#silk-blur)" className="silk-band silk-band-blue">
          <path
            className="silk-path silk-path-blue-1"
            fill="url(#silk-blue)"
            d="M -200 300 C 200 220, 500 420, 900 320 S 1600 260, 1800 360 L 1800 440 C 1500 480, 1100 380, 700 460 S 200 520, -200 420 Z"
          />
          <path
            className="silk-path silk-path-blue-2"
            fill="url(#silk-blue)"
            opacity="0.55"
            d="M -200 340 C 300 260, 600 460, 1000 360 S 1700 300, 1900 400 L 1900 430 C 1400 500, 1000 380, 600 460 S 100 540, -200 450 Z"
          />
        </g>

        <g filter="url(#silk-blur)" className="silk-band silk-band-gold">
          <path
            className="silk-path silk-path-gold-1"
            fill="url(#silk-gold)"
            d="M -200 500 C 200 420, 500 620, 900 520 S 1600 460, 1800 560 L 1800 640 C 1500 680, 1100 580, 700 660 S 200 720, -200 620 Z"
          />
          <path
            className="silk-path silk-path-gold-2"
            fill="url(#silk-gold)"
            opacity="0.5"
            d="M -200 540 C 300 460, 600 660, 1000 560 S 1700 500, 1900 600 L 1900 630 C 1400 700, 1000 580, 600 660 S 100 740, -200 650 Z"
          />
        </g>
      </svg>

      <div className="silk-grain" />
      <div className="silk-vignette" />

      <style jsx>{`
        .silk-svg {
          position: absolute;
          inset: -10%;
          width: 120%;
          height: 120%;
          opacity: 0.32;
        }
        .silk-path-blue-1 {
          animation: silk-flow-1 22s ease-in-out infinite alternate;
          transform-origin: center;
        }
        .silk-path-blue-2 {
          animation: silk-flow-2 26s ease-in-out infinite alternate;
          transform-origin: center;
        }
        .silk-path-gold-1 {
          animation: silk-flow-3 28s ease-in-out infinite alternate;
          transform-origin: center;
        }
        .silk-path-gold-2 {
          animation: silk-flow-4 24s ease-in-out infinite alternate;
          transform-origin: center;
        }

        @keyframes silk-flow-1 {
          0% { transform: translate3d(-40px, -30px, 0) scaleY(1); }
          50% { transform: translate3d(20px, 40px, 0) scaleY(1.08); }
          100% { transform: translate3d(60px, -20px, 0) scaleY(0.95); }
        }
        @keyframes silk-flow-2 {
          0% { transform: translate3d(30px, 20px, 0) scaleY(0.95); }
          50% { transform: translate3d(-50px, -30px, 0) scaleY(1.06); }
          100% { transform: translate3d(40px, 40px, 0) scaleY(1); }
        }
        @keyframes silk-flow-3 {
          0% { transform: translate3d(-30px, 40px, 0) scaleY(1.02); }
          50% { transform: translate3d(40px, -20px, 0) scaleY(0.92); }
          100% { transform: translate3d(-50px, 30px, 0) scaleY(1.07); }
        }
        @keyframes silk-flow-4 {
          0% { transform: translate3d(50px, -30px, 0) scaleY(0.94); }
          50% { transform: translate3d(-40px, 30px, 0) scaleY(1.08); }
          100% { transform: translate3d(30px, -40px, 0) scaleY(1); }
        }

        .silk-grain {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='140' height='140' filter='url(%23n)'/></svg>");
        }

        .silk-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(5, 6, 11, 0.85) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .silk-path {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(SilkRibbonComponent);
