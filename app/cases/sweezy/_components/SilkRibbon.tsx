'use client';

import { memo } from 'react';

/**
 * Ukrainian silk ribbon — pure CSS version.
 * Two soft radial bands (blue + gold) drift slowly via transform-only animations.
 * No blur() filter, no SVG filters, no blend modes — GPU friendly on scroll.
 * Softness comes from the radial gradients themselves (very wide, low-opacity).
 */
function SilkRibbonComponent() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <div className="silk-band silk-blue" />
      <div className="silk-band silk-gold" />
      <div className="silk-vignette" />

      <style jsx>{`
        .silk-band {
          position: absolute;
          left: -30%;
          right: -30%;
          height: 80vh;
          opacity: 0.45;
          will-change: transform;
          transform: translateZ(0);
        }
        .silk-blue {
          top: -10%;
          background: radial-gradient(
            ellipse 55% 60% at 50% 50%,
            rgba(0, 87, 184, 0.55) 0%,
            rgba(44, 125, 214, 0.22) 35%,
            rgba(0, 30, 80, 0.08) 60%,
            transparent 80%
          );
          animation: silk-drift-blue 36s ease-in-out infinite alternate;
        }
        .silk-gold {
          bottom: -10%;
          background: radial-gradient(
            ellipse 50% 55% at 50% 50%,
            rgba(255, 215, 0, 0.32) 0%,
            rgba(255, 184, 0, 0.14) 35%,
            rgba(120, 80, 0, 0.04) 60%,
            transparent 80%
          );
          animation: silk-drift-gold 42s ease-in-out infinite alternate;
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
            transform: translate3d(-3%, -1%, 0);
          }
          100% {
            transform: translate3d(3%, 2%, 0);
          }
        }
        @keyframes silk-drift-gold {
          0% {
            transform: translate3d(3%, 1%, 0);
          }
          100% {
            transform: translate3d(-3%, -2%, 0);
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
