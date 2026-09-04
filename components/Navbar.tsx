"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sun, Moon } from 'lucide-react';
import { siteConfig } from '../siteConfig';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  // 控制 PC 端导航栏
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '项目', href: '/projects' },
    { name: '归档', href: '/timeline' },
    { name: '照片', href: '/photowall' },
    { name: '说说', href: '/moments' },
    { name: '关于', href: '/about' },
  ];

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${showNav ? 'translate-y-0' : '-translate-y-full'} bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border-white/20 dark:border-white/5 shadow-sm`}>
      <div className="w-full max-w-6xl mx-auto h-14 md:h-16 flex items-center justify-between px-3 sm:px-6 lg:px-10 box-border gap-2">
        <Link href="/" className="shrink-0 text-base md:text-xl font-black text-black dark:text-white tracking-tighter hover:text-black-600 dark:hover:text-slate-300 transition-all duration-300">
          {siteConfig.navTitle || siteConfig.authorName}
          <span className="text-black dark:text-white mx-0.5 md:mx-1">{siteConfig.navSuffix || 'の'}</span>
          {siteConfig.navAfter}
        </Link>

        <div className="flex items-center gap-2 md:gap-5">
          <nav className="flex gap-3 sm:gap-4 md:gap-8 text-xs sm:text-sm font-bold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `${link.href}/`;
              return (
                <Link key={link.href} href={link.href} className={`relative py-1 whitespace-nowrap transition-colors ${isActive ? 'text-black-600' : 'text-slate-700 dark:text-slate-200 hover:text-black-600'}`}>
                  {link.name}
                  {isActive && <span className="absolute -bottom-0.5 md:-bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full animate-pulse"></span>}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            title={isDark ? '切换到日间模式' : '切换到夜间模式'}
            className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/50 dark:bg-slate-800/50 flex items-center justify-center hover:scale-105 transition-all border border-white/20 shadow-sm cursor-pointer text-slate-700 dark:text-amber-300"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}