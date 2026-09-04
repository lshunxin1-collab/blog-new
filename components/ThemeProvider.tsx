"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ isDark: true, toggleTheme: () => {} });

// 判断是否为手机端
function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua)
    || window.innerWidth < 768;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 默认设为 true，这样在读取到配置前，如果是夜间模式就不会闪烁
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 标记组件已挂载，避免 hydration 报错
    setMounted(true);

    const root = document.documentElement;
    const applyTheme = (dark: boolean) => {
      if (dark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    const savedTheme = localStorage.getItem('blog-theme');

    // 用户手动切换过：直接使用用户设置（手机端、桌面端通用）
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      applyTheme(isDarkMode);
      return;
    }

    // 手机端且从未手动设置过：跟随系统主题
    if (isMobileDevice()) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const dark = mq.matches;
      setIsDark(dark);
      applyTheme(dark);

      const handler = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        applyTheme(e.matches);
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }

    // 桌面端：没有记录时默认深色模式（流萤飞舞）
    setIsDark(true);
    applyTheme(true);
  }, []);

  // 极其重要：监听 isDark 状态，只要它变了，立刻强制更新 html 标签，防止路由切换丢失
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark, mounted]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem('blog-theme', newDark ? 'dark' : 'light');
  };

  // 在客户端挂载完成前，为了防止闪屏，先隐藏内容
  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);