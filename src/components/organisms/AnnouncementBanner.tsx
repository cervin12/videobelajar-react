import React from 'react';
import { Icon } from '../atoms/Icon';

export interface AnnouncementBannerProps {
  className?: string;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`mb-space-md flex flex-wrap items-center justify-between gap-space-sm p-3 bg-[#FEF08A] dark:bg-[#1E293B] neo-border-3 rounded-2xl transition-colors ${className}`}
    >
      <div className="flex items-center gap-space-sm flex-wrap sm:flex-nowrap">
        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#A3E635] text-background-dark border-2 border-background-dark -rotate-6 shrink-0">
          <Icon name="bolt" filled size="md" />
        </span>
        <span className="font-black text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-background-dark text-[#FDE047] shrink-0">
          SPRING SPRINT JAM '25
        </span>
        <span className="font-bold text-sm text-background-dark dark:text-slate-200">
          💥 Double XP enabled on all Sakuga &amp; Shader masterclasses this week!
        </span>
      </div>
      <div className="flex items-center gap-space-sm">
        <span className="font-black text-xs uppercase px-3 py-1 rounded-full bg-[#EC4899] text-white border-2 border-background-dark animate-pulse">
          🔥 LIVE JAM ACTIVE
        </span>
        <span className="hidden md:inline font-bold text-xs bg-white text-background-dark px-2.5 py-1 rounded-full border-2 border-background-dark">
          Ends in 48h ⏳
        </span>
      </div>
    </div>
  );
};
