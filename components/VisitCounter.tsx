'use client';

import { useEffect } from 'react';

export default function VisitCounter() {
  useEffect(() => {
    // 加载不蒜子访客统计脚本（纯前端，无需后端）
    const script = document.createElement('script');
    script.async = true;
    script.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full flex justify-center mt-6 pb-4">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-serif">
        <span id="busuanzi_container_site_pv" className="hidden items-center gap-1">
          本站总访问量
          <span id="busuanzi_value_site_pv" className="font-semibold text-slate-700 dark:text-slate-200" />
          次
        </span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span id="busuanzi_container_site_uv" className="hidden items-center gap-1">
          访客数
          <span id="busuanzi_value_site_uv" className="font-semibold text-slate-700 dark:text-slate-200" />
          人
        </span>
      </div>
    </div>
  );
}
