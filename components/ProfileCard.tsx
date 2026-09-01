"use client";

import { useRouter } from 'next/navigation';
import { siteConfig } from '../siteConfig';
import { useToast } from './ToastProvider';
import SocialIcon from './SocialIcon';

export default function ProfileCard({ postCount, photoCount }: { postCount: number, photoCount: number }) {
  const router = useRouter();
  const { showToast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`✨ ${label}已复制到剪贴板: ${text}`, 'success');
  };

  return (
    <div
      onClick={() => router.push('/about')}
      className="md:col-span-7 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8 flex flex-col justify-between transition-all duration-700 hover:scale-[1.01] cursor-pointer group relative overflow-hidden h-full min-h-[280px]"
    >
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-white to-slate-200 p-1 shadow-lg flex-shrink-0 transition-transform duration-500 group-hover:rotate-3">
            <img src={siteConfig.avatarUrl} alt="avatar" className="w-full h-full rounded-xl object-cover bg-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-wider transition-colors duration-700">{siteConfig.authorName}</h1>
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-md transition-colors duration-700">{siteConfig.bio}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-end md:items-center justify-between mt-8 gap-6 relative z-10">
        {/* 数据统计区 */}
        <div className="flex gap-6 w-full md:w-auto justify-around md:justify-start">
          <StatItem count={postCount} label="文章" color="text-dark-300 dark:text-dark-400" />
          <div className="w-px h-10 bg-slate-300/50 dark:bg-slate-700 hidden md:block"></div>
          <StatItem count={photoCount} label="照片" color="text-dark-300 dark:text-dark-400" />
        </div>

        {/* 社交图标区 - 阻止冒泡防止触发卡片跳转 */}
        <div className="flex gap-3 flex-wrap justify-end" onClick={(e) => e.stopPropagation()}>
          <SocialBtn type="github" url={siteConfig.social?.github} />
          <SocialBtn type="x" url={siteConfig.social?.x} />
          <SocialBtn type="telegram" url={siteConfig.social?.telegram} />
          <SocialBtn type="google" url={siteConfig.social?.google ? `mailto:${siteConfig.social.google}` : undefined} />
          <SocialBtn type="wechat" onClick={() => copyToClipboard(siteConfig.social?.wechat || '', '微信号')} />
        </div>
      </div>
    </div>
  );
}

function StatItem({ count, label, color }: { count: number, label: string, color: string }) {
  return (
    <div className="text-center group/stat">
      <div className={`text-2xl font-black ${color} transition-transform group-hover/stat:scale-110`}>{count}</div>
      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</div>
    </div>
  );
}

function SocialBtn({ type, url, onClick }: { type: string, url?: string, onClick?: () => void }) {
  const content = (
    <div
      onClick={onClick}
      className="w-10 h-10 rounded-xl bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm"
      title={type}
    >
      <SocialIcon type={type} className="w-5 h-5" />
    </div>
  );
  return url ? <a href={url} target={url.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{content}</a> : content;
}
