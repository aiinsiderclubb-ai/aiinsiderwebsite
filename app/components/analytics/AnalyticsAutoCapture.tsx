'use client';

import { useEffect, useRef } from 'react';
import {
  getCtaFromElement,
  getLastCtaAttribution,
  setAnalyticsContext,
  saveLastCtaAttribution,
  track,
  trackClusterArticleClick,
  trackFormEvent,
  trackScrollDepth,
  type AnalyticsLocale,
  type AnalyticsPageType,
  type AnalyticsVertical,
} from '@/app/lib/analytics';

type Props = {
  pageType: AnalyticsPageType;
  vertical: AnalyticsVertical;
  locale: AnalyticsLocale;
};

const SCROLL_MILESTONES: Array<25 | 50 | 75 | 90> = [25, 50, 75, 90];

export default function AnalyticsAutoCapture({ pageType, vertical, locale }: Props) {
  const firedScroll = useRef<Set<number>>(new Set());
  const rafId = useRef<number | null>(null);
  const lastScrollPercent = useRef<number>(0);

  useEffect(() => {
    setAnalyticsContext({ pageType, vertical, locale });

    const handleClick = (e: MouseEvent) => {
      const info = getCtaFromElement(e.target as Element);
      if (!info.cta) return;

      // Generic CTA click
      track('aiinsider_cta_click', {
        cta: info.cta,
        href: info.href,
        text: info.text,
        source_section: info.sourceSection,
        cta_type: info.ctaType,
        cta_variant: info.ctaVariant,
      });
      saveLastCtaAttribution({
        cta: info.cta,
        href: info.href,
        text: info.text,
        sourceSection: info.sourceSection,
        ctaType: info.ctaType,
        ctaVariant: info.ctaVariant,
      });

      // Cluster-specific article click
      if (info.article) {
        trackClusterArticleClick({
          articleSlug: info.article,
          clusterGroup: info.group,
          sourceSection: info.sourceSection || 'beauty-cluster',
        });
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true } as unknown as boolean);
  }, [locale, pageType, vertical]);

  useEffect(() => {
    // Form submit success/error on landing (post-redirect)
    try {
      const params = new URLSearchParams(window.location.search);
      const leadMagnet = params.get('leadMagnet');
      const audit = params.get('audit');
      let fired = false;

      if (leadMagnet === 'success' || leadMagnet === 'error') {
        const last = getLastCtaAttribution();
        trackFormEvent({
          action: leadMagnet === 'success' ? 'success' : 'error',
          formType: 'lead-magnet',
          slug: window.location.pathname,
          sourceSection: 'lead-magnet',
          ctaType: last.ctaType,
          ctaVariant: last.ctaVariant,
        });
        fired = true;
      }
      if (audit === 'success' || audit === 'error') {
        const last = getLastCtaAttribution();
        trackFormEvent({
          action: audit === 'success' ? 'success' : 'error',
          formType: 'audit-request',
          slug: window.location.pathname,
          sourceSection: 'audit',
          ctaType: last.ctaType,
          ctaVariant: last.ctaVariant,
        });
        fired = true;
      }

      if (fired) {
        // Also expose generic event for non-GA consumers
        window.dispatchEvent(
          new CustomEvent('aiinsider:lead', {
            detail: { source: 'beauty-pillar', locale, leadMagnet, audit },
          })
        );

        // Remove params to prevent double-fire on refresh
        params.delete('leadMagnet');
        params.delete('audit');
        const next = window.location.pathname + (params.toString() ? `?${params.toString()}` : '') + window.location.hash;
        window.history.replaceState({}, '', next);
      }
    } catch {
      // no-op
    }
  }, [locale]);

  useEffect(() => {
    const computeScrollPercent = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop || 0;
      const scrollHeight = Math.max(doc.scrollHeight, document.body.scrollHeight);
      const viewport = window.innerHeight || doc.clientHeight || 1;
      const maxScroll = Math.max(1, scrollHeight - viewport);
      const percent = Math.min(100, Math.max(0, Math.round((scrollTop / maxScroll) * 100)));
      return percent;
    };

    const checkMilestones = () => {
      if (rafId.current !== null) return;
      rafId.current = window.requestAnimationFrame(() => {
        rafId.current = null;
        const percent = computeScrollPercent();
        if (percent === lastScrollPercent.current) return;
        lastScrollPercent.current = percent;
        for (const m of SCROLL_MILESTONES) {
          if (percent >= m && !firedScroll.current.has(m)) {
            firedScroll.current.add(m);
            trackScrollDepth(m);
          }
        }
      });
    };

    checkMilestones();
    window.addEventListener('scroll', checkMilestones, { passive: true });
    window.addEventListener('resize', checkMilestones, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkMilestones);
      window.removeEventListener('resize', checkMilestones);
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
    };
  }, []);

  return null;
}

