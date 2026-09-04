"use client";

import { useEffect, useState } from "react";

interface BusuanziData {
  site_uv: number;
  page_pv: number;
  site_pv: number;
}

export default function VisitCounter() {
  const [data, setData] = useState<BusuanziData | null>(null);

  useEffect(() => {
    const callbackName = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
    let cleanedUp = false;

    (window as any)[callbackName] = (d: BusuanziData) => {
      if (cleanedUp) return;
      setData(d);
      try { delete (window as any)[callbackName]; } catch {}
      const s = document.getElementById(callbackName);
      if (s) s.remove();
    };

    const script = document.createElement("script");
    script.id = callbackName;
    script.src = "https://busuanzi.ibruce.info/busuanzi?jsonpCallback=" + callbackName;
    script.referrerPolicy = "no-referrer-when-downgrade";
    document.head.appendChild(script);

    return () => {
      cleanedUp = true;
      const s = document.getElementById(callbackName);
      if (s) s.remove();
      try { delete (window as any)[callbackName]; } catch {}
    };
  }, []);

  if (!data) return null;

  return (
    <div className="w-full flex justify-center mt-6 pb-4">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-serif">
        <span className="flex items-center gap-1">
          本站总访问量
          <span className="font-semibold text-slate-700 dark:text-slate-200">{data.site_pv}</span>
          次
        </span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span className="flex items-center gap-1">
          访客数
          <span className="font-semibold text-slate-700 dark:text-slate-200">{data.site_uv}</span>
          人
        </span>
      </div>
    </div>
  );
}
