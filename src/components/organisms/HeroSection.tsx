import React from 'react';
import type { QuickStat } from '../../types/course';
import { Icon } from '../atoms/Icon';

export interface HeroSectionProps {
  stats: QuickStat[];
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-2xl bg-[#E0F2FE] dark:bg-[#111A2E] neo-border-3 p-space-lg md:p-space-xl mb-space-xl transition-all ${className}`}
    >
      {/* Floating Doodles & Stickers Background */}
      <div className="absolute -top-4 right-10 hidden md:block rotate-12 z-20 pointer-events-none">
        <div className="px-4 py-2 bg-pop-pink text-white font-black text-sm uppercase rounded-xl border-2 border-background-dark">
          🎨 100% HANDS-ON
        </div>
      </div>
      <div className="absolute bottom-6 right-8 hidden lg:block -rotate-6 z-0 pointer-events-none">
        <div className="px-4 py-2 bg-[#FDE047] text-background-dark font-black text-sm uppercase rounded-xl border-2 border-background-dark">
          👾 ZERO BORING LECTURES
        </div>
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-black text-xs px-3 py-1 rounded-full bg-[#A3E635] text-background-dark border-2 border-background-dark uppercase tracking-wider">
            CREATIVE TECH CURRICULUM
          </span>
          <span className="font-black text-xs px-3 py-1 rounded-full bg-white dark:bg-[#1E293B] text-background-dark dark:text-white border-2 border-background-dark">
            ⚡ V 4.2 UPDATED
          </span>
          <span className="font-black text-xs px-3 py-1 rounded-full bg-[#F472B6] text-white border-2 border-background-dark rotate-2">
            ⭐ TOP RATED 2025
          </span>
        </div>

        {/* Title */}
        <h1 className="font-black text-3xl sm:text-5xl lg:text-6xl text-background-dark dark:text-white tracking-tight mb-4 leading-tight">
          Level Up Your Creative &amp; Tech Superpowers{' '}
          <span className="inline-block transform hover:rotate-12 transition-transform cursor-pointer">
            🚀✨
          </span>
        </h1>

        {/* Description */}
        <p className="font-bold text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mb-space-lg">
          Conquer 2D/3D Animation, Motion Graphics, Shaders, Generative AI, and Indie Game Dev with
          battle-tested studio directors and interactive sandboxes!
        </p>

        {/* Live Quick Stats Badges (Chunky Neo-Pop Tiles) */}
        <div className="flex flex-wrap items-center gap-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#182235] neo-border transform hover:-translate-y-1 transition-transform"
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-lg ${stat.bgColor} border-2 border-background-dark`}
              >
                <Icon name={stat.icon} filled size="md" className="text-background-dark" />
              </span>
              <span className="font-black text-sm text-background-dark dark:text-white">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Neo-Pop Geometric Vector */}
      <div className="absolute right-6 top-8 hidden lg:block opacity-70 pointer-events-none">
        <div className="relative w-44 h-44 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#A3E635] rounded-full border-4 border-background-dark opacity-20" />
          <div className="w-32 h-32 bg-[#FDE047] rounded-3xl border-4 border-background-dark rotate-12 flex items-center justify-center">
            <span className="text-5xl select-none">🎨</span>
          </div>
        </div>
      </div>
    </div>
  );
};
