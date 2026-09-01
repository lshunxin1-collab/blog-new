"use client";

import { useEffect, useState } from 'react';

interface MomentComment {
  id: string;
  nickname: string;
  content: string;
  time: number;
}

interface MomentCommentsProps {
  id: string; // 说说的专属 ID
}

// 全局一分钟限流的 localStorage key（所有说说共用，一分钟只能留一次言）
const RATE_LIMIT_KEY = 'moment-comment-lasttime';

export default function MomentComments({ id }: MomentCommentsProps) {
  const [comments, setComments] = useState<MomentComment[]>([]);
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const storageKey = `moment-comments-${id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setComments(JSON.parse(saved));
    } catch (e) {}
  }, [storageKey]);

  const handleSubmit = () => {
    const text = content.trim();
    if (!text) {
      setError('留言内容不能为空');
      return;
    }

    // 一分钟限流：距离上次留言不足 60 秒则拒绝
    try {
      const last = Number(localStorage.getItem(RATE_LIMIT_KEY) || 0);
      const now = Date.now();
      if (now - last < 60000) {
        const remain = Math.ceil((60000 - (now - last)) / 1000);
        setError(`留言太频繁啦，请 ${remain} 秒后再试`);
        return;
      }
      localStorage.setItem(RATE_LIMIT_KEY, String(now));
    } catch (e) {}

    const newComment: MomentComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      nickname: nickname.trim() || '匿名访客',
      content: text,
      time: Date.now(),
    };

    const next = [newComment, ...comments];
    setComments(next);
    setContent('');
    setError('');

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
    } catch (e) {}
  };

  const timeAgo = (t: number) => {
    const diff = Date.now() - t;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return '刚刚';
    if (mins < 60) return `${mins} 分钟前`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours} 小时前`;
    return new Date(t).toLocaleDateString();
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 输入区 */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="昵称（选填）"
          maxLength={20}
          className="w-full md:w-1/2 bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="说点什么吧，不需要登录～"
          rows={2}
          className="w-full bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-black"
        />
        {error && <p className="text-xs text-amber-500 font-medium">{error}</p>}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-4 py-1.5 rounded-lg bg-black hover:bg-black text-white text-xs font-bold transition-colors"
          >
            留言
          </button>
        </div>
      </div>

      {/* 留言列表 */}
      <div className="flex flex-col gap-2.5">
        {comments.length === 0 ? (
          <p className="text-sm text-slate-400 dark:text-slate-500 py-2">还没有留言，快来抢沙发～</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="flex flex-col gap-1 border-b border-slate-200/50 dark:border-slate-700/50 pb-2 last:border-none">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-[#576b95] dark:text-[#7f99cc]">{c.nickname}</span>
                <span className="text-[11px] text-slate-400">{timeAgo(c.time)}</span>
              </div>
              <p className="text-[14px] text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap break-words">{c.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
