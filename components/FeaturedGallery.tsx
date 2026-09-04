"use client";

import { useState } from 'react';
import Link from 'next/link';
import LazyImg from './LazyImg';

export default function FeaturedGallery({ moments, photos }: { moments: any[], photos: string[] }) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (moments.length === 0 && photos.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-8 mt-2">
      {moments.length > 0 && (
        <section className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">精选说说</h2>
            <Link href="/moments" className="text-xs text-slate-400 hover:text-indigo-500 font-bold ml-auto">全部说说 →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moments.map((m: any) => (
              <div key={m.id} className="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-lg p-5 flex flex-col gap-3">
                <span className="text-[11px] font-bold text-slate-400">
                  {m.date ? new Date(m.date).toLocaleDateString('zh-CN') : ''}{m.location ? ` · ${m.location}` : ''}
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap line-clamp-4">{m.content}</p>
                {m.images && m.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    {m.images.slice(0, 3).map((img: any) => (
                      <button
                        key={img}
                        onClick={() => setLightbox(img)}
                        className="cursor-zoom-in overflow-hidden rounded-xl group"
                      >
                        <LazyImg src={img} alt="" className="w-full h-20 object-cover rounded-xl group-hover:scale-105" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white">精选图片</h2>
            <Link href="/photowall" className="text-xs text-slate-400 hover:text-indigo-500 font-bold ml-auto">全部照片 →</Link>
          </div>
          <div className="flex flex-col gap-4">
            {photos.map((url: string) => (
              <button
                key={url}
                onClick={() => setLightbox(url)}
                className="w-full rounded-2xl overflow-hidden border border-white/40 dark:border-white/10 shadow-md group cursor-zoom-in"
              >
                <LazyImg src={url} alt="" className="w-full h-auto max-h-[70vh] object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </button>
            ))}
          </div>
        </section>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
