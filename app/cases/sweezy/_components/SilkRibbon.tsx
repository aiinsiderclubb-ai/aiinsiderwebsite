'use client';

import { memo } from 'react';

/**
 * Ukrainian silk ribbon — pure CSS version.
 * Two soft radial bands (blue + gold) drift slowly via transform-only animations.
 * No SVG filters, no blend modes, no path morphing — GPU-friendly.
 */
function SilkRibbonComponent() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: 'strict' }}
    >
      <div className="silk-band silk-blue" />
      <div className="silk-band silk-gold" />
      <div className="silk-vignette" />

      <style jsx>{`
        .silk-band {
          position: absolute;
          left: -20%;
          right: -20%;
          height: 42vh;
          filter: blur(80px);
          opacity: 0.35;
          will-change: transform;
        }
        .silk-blue {
          top: 18%;
          background: radial-gradient(
            ellipse 60% 100% at 50% 50%,
            rgba(0, 87, 184, 0.85) 0%,
            rgba(44, 125, 214, 0.4) 40%,
            transparent 70%
          );
          animation: silk-drift-blue 26s ease-in-out infinite alternate;
        }
        .silk-gold {
          bottom: 12%;
          background: radial-gradient(
            ellipse 55% 100% at 50% 50%,
            rgba(255, 215, 0, 0.6) 0%,
            rgba(255, 184, 0, 0.3) 40%,
            transparent 70%
          );
          animation: silk-drift-gold 32s ease-in-out infinite alternate;
        }
        .silk-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 55%,
            rgba(5, 6, 11, 0.85) 100%
          );
        }

        @keyframes silk-drift-blue {
          0% {
            transform: translate3d(-4%, -2%, 0) scaleY(1);
          }
          50% {
            transform: translate3d(3%, 3%, 0) scaleY(1.08);
          }
          100% {
            transform: translate3d(5%, -1%, 0) scaleY(0.96);
          }
        }
        @keyframes silk-drift-gold {
          0% {
            transform: translate3d(4%, 2%, 0) scaleY(0.96);
          }
          50% {
            transform: translate3d(-5%, -3%, 0) scaleY(1.08);
          }
          100% {
            transform: translate3d(-3%, 3%, 0) scaleY(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .silk-band {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default memo(SilkRibbonComponent);
