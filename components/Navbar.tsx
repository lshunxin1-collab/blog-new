"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { siteConfig } from '../siteConfig';
import { useTheme } from './ThemeProvider';

export default function Navbar() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const mobileNavLinks = navLinks;

  return (
    <>
      {/* PC端导航栏 */}
      <header className={`hidden md:block w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${showNav ? 'translate-y-0' : '-translate-y-full'} bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border-white/20 dark:border-white/5 shadow-sm`}>
        <div className="w-[90%] max-w-6xl mx-auto h-16 flex items-center justify-between px-4 sm:px-[30px] box-border">
          <Link href="/" className="text-xl font-black text-black dark:text-white tracking-tighter hover:text-black-600 dark:hover:text-slate-300 transition-all duration-300">
            {siteConfig.navTitle || siteConfig.authorName}
            <span className="text-black dark:text-white mx-1">{siteConfig.navSuffix || 'の'}</span>
            {siteConfig.navAfter}
          </Link>
          <div className="flex items-center gap-5">
            <nav className="flex gap-8 text-sm font-bold">
              {/* PC端依然使用全量的 navLinks */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname === `${link.href}/`;
                return (
                  <Link key={link.href} href={link.href} className={`relative py-1 transition-colors ${isActive ? 'text-black-600' : 'text-slate-700 dark:text-slate-200 hover:text-black-600'}`}>
                    {link.name}
                    {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full animate-pulse"></span>}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={toggleTheme}
              title={isDark ? '切换到日间模式' : '切换到夜间模式'}
              className="w-9 h-9 rounded-xl bg-white/50 dark:bg-slate-800/50 flex items-center justify-center hover:scale-105 transition-all border border-white/20 shadow-sm cursor-pointer text-slate-700 dark:text-amber-300"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* 📱 手机端：右上角汉堡菜单 */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="打开菜单"
          className="fixed top-4 right-4 z-[60] w-11 h-11 rounded-xl bg-black/70 backdrop-blur-xl flex items-center justify-center text-white shadow-lg border border-white/20 active:scale-95 transition-all"
        >
          <Menu size={20} />
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[65]"
              />

              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 28 }}
                className="fixed top-4 right-4 left-4 z-[70] bg-white/80 dark:bg-slate-800/90 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-2xl rounded-3xl p-4"
              >
                <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-200/60 dark:border-slate-700/60 mb-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">导航</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="关闭菜单"
                    className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 active:scale-95 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                <nav className="grid grid-cols-3 gap-2">
                  {mobileNavLinks.map((link) => {
                    const isActive = pathname === link.href || pathname === `${link.href}/`;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-center py-3 rounded-2xl text-sm font-bold transition-all ${
                          isActive
                            ? 'bg-black text-white shadow-md'
                            : 'bg-white/60 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border border-white/50 dark:border-slate-600'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>

                <button
                  onClick={toggleTheme}
                  className="mt-3 w-full py-3 rounded-2xl bg-white/60 dark:bg-slate-700/50 border border-white/50 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? '切换到日间模式' : '切换到夜间模式'}
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}