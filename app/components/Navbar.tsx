'use client';

import { Menu, X, Zap } from 'lucide-react';
import { SCHEDULING_URL } from '../lib/config';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

const SCROLL_THROTTLE_MS = 100;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const lastScrollUpdate = useRef(0);
  const rafId = useRef<number | null>(null);
  const pathname = usePathname();
  const { t, lang } = useLanguage();
  const basePath = `/${lang}`;
  const isHomePage = pathname === basePath;

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollUpdate.current < SCROLL_THROTTLE_MS) return;
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
      rafId.current = window.requestAnimationFrame(() => {
        lastScrollUpdate.current = now;
        const y = window.scrollY;
        setIsScrolled(y > 50);
        if (isHomePage) {
          setNavVisible(y > 30);
        }
      });
    };
    if (!isHomePage) setNavVisible(true);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId.current !== null) window.cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  const navLinks = [
    { name: t('nav.about'), href: `${basePath}/about` },
    { name: t('nav.services'), href: `${basePath}/services` },
    { name: t('nav.contentFactory'), href: `${basePath}/content-factory` },
    { name: t('nav.solutions'), href: `${basePath}/solutions` },
    { name: t('nav.cases'), href: `${basePath}/cases` },
    { name: t('nav.blog'), href: `${basePath}/blog` },
    { name: t('nav.pricing'), href: isHomePage ? '#pricing' : `${basePath}#pricing` },
    { name: t('nav.contact'), href: isHomePage ? '#bookcall' : `${basePath}#bookcall` },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage ? 'py-4' : 'py-6'
      } ${
        isHomePage && !navVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {(isScrolled || !isHomePage) && (
        <div
          className="absolute inset-0 nav-backdrop border-b border-white/10 transition-opacity duration-300"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href={basePath} className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center
              transition-transform duration-300 group-hover:scale-110"
            style={{ boxShadow: 'var(--theme-shadow-glow)' }}
          >
            <Zap className="w-6 h-6 text-black" fill="currentColor" />
          </div>
          <span className="text-2xl font-bold font-heading text-white">
            AI Insider
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isExternal = link.href.startsWith('#');
            const isActive =
              (!isExternal && pathname === link.href) ||
              (!isExternal && link.href.endsWith('/about') && pathname === `${basePath}/about`) ||
              (!isExternal && link.href.endsWith('/services') && pathname?.startsWith(`${basePath}/services`)) ||
              (!isExternal && link.href.endsWith('/solutions') && pathname?.startsWith(`${basePath}/solutions`)) ||
              (!isExternal && link.href.endsWith('/cases') && pathname?.startsWith(`${basePath}/cases`)) ||
              (!isExternal && link.href.endsWith('/blog') && pathname?.startsWith(`${basePath}/blog`));

            if (isExternal) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors duration-200 group
                    ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
                </a>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors duration-200 group
                  ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}

          <LanguageSwitcher />
          <ThemeSwitcher />

          <a
            href={SCHEDULING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary relative px-6 py-3 text-sm overflow-hidden active:scale-95"
          >
            <span className="relative z-10">{t('nav.bookCall')}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-10 h-10 rounded-lg border border-white/15 bg-white/[0.04] flex items-center justify-center
            transition-transform duration-200 active:scale-95"
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-6 animate-fade-in">
          <div className="rounded-2xl p-6 border border-white/10 bg-black/90 max-h-[80vh] overflow-y-auto" style={{ backdropFilter: 'blur(16px)' }}>
            {navLinks.map((link) => {
              const isExternal = link.href.startsWith('#');

              if (isExternal) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-gray-300 hover:text-white font-semibold transition-colors border-b border-white/5 last:border-0"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-gray-300 hover:text-white font-semibold transition-colors border-b border-white/5"
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </div>
            <a
              href={SCHEDULING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-4 w-full px-6 py-3 text-center"
            >
              {t('nav.bookCall')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
