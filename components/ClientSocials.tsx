// src/components/ClientSocials.tsx
"use client";

import { siteConfig } from '../siteConfig';
import SocialIcon from './SocialIcon';

function SocialBtn({ type, url, onClick }: { type: string, url?: string, onClick?: () => void }) {
  const content = (
    <div
      onClick={onClick}
      className="w-8 h-8 rounded-lg bg-white/50 dark:bg-slate-700/50 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white transition-all duration-300 border border-white/40 dark:border-white/10 shadow-sm cursor-pointer"
      title={type}
    >
      <SocialIcon type={type} className="w-4 h-4" />
    </div>
  );
  return url ? <a href={url} target={url.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer">{content}</a> : content;
}

export default function ClientSocials() {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`✨ ${label}已复制到剪贴板: ${text}`);
  };

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-4">
      <SocialBtn type="github" url={siteConfig.social?.github} />
      <SocialBtn type="x" url={siteConfig.social?.x} />
      <SocialBtn type="telegram" url={siteConfig.social?.telegram} />
      <SocialBtn type="google" url={siteConfig.social?.google ? `mailto:${siteConfig.social.google}` : undefined} />
      <SocialBtn type="wechat" onClick={() => copyToClipboard(siteConfig.social?.wechat || '', '微信号')} />
    </div>
  );
}
