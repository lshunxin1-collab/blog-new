"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [show, setShow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash') === 'true';

    if (!hasSeenSplash) {
      setShow(true);
      const timer = setTimeout(() => {
        exitSplash();
      }, 2200);
      return () => clearTimeout(timer);
    } else {
      // 容错处理：确保直接访问时类名存在
      document.documentElement.classList.add('splash-seen');
    }
  }, []);

  const exitSplash = () => {
    setShow(false);
    sessionStorage.setItem('hasSeenSplash', 'true');

    // 【核心解封】：动画快结束时，给 html 加上类名，CSS 会自动把内容显示出来
    setTimeout(() => {
      document.documentElement.classList.add('splash-seen');
    }, 500);
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash-screen-container"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-white dark:bg-slate-950"
        >
          <div className="w-40 h-[1.5px] bg-slate-200 dark:bg-slate-800 relative">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-black shadow-[0_0_12px_rgba(0,0,0,0.8)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}