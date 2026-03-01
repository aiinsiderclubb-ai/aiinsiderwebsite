'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null,
});

export default function LazyChatWidget() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timeoutId: number | null = null;

    const activate = () => {
      setIsReady(true);
      window.removeEventListener('scroll', activate);
      window.removeEventListener('mousemove', activate);
      window.removeEventListener('touchstart', activate);
      window.removeEventListener('keydown', activate);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', activate, { passive: true });
    window.addEventListener('mousemove', activate, { passive: true });
    window.addEventListener('touchstart', activate, { passive: true });
    window.addEventListener('keydown', activate);

    // Fallback: show widget even without interaction.
    timeoutId = window.setTimeout(activate, 2500);

    return () => {
      window.removeEventListener('scroll', activate);
      window.removeEventListener('mousemove', activate);
      window.removeEventListener('touchstart', activate);
      window.removeEventListener('keydown', activate);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  if (!isReady) return null;

  return <ChatWidget />;
}
