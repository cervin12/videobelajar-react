import React from 'react';
import type { ValuePromise } from '../../types/course';
import { ValueCard } from '../molecules/ValueCard';
import { RevealOnScroll } from '../atoms/RevealOnScroll';

export interface ValuePropositionProps {
  promises: ValuePromise[];
  className?: string;
}

export const ValueProposition: React.FC<ValuePropositionProps> = ({
  promises,
  className = '',
}) => {
  return (
    <div
      className={`p-space-lg md:p-space-xl bg-background-dark dark:bg-[#0B0F19] text-white rounded-3xl neo-border-3 relative overflow-hidden transition-colors ${className}`}
    >
      <RevealOnScroll variant="fade-up" duration={600}>
        <div className="max-w-3xl mb-space-lg relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3E635] text-background-dark font-black text-xs uppercase tracking-wide mb-space-sm border-2 border-white -rotate-2">
            <span>CREATOR PROMISE 🔥</span>
          </div>
          <h3 className="font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight mb-space-sm">
            Why SkillPop Courses Hit Different ⚡
          </h3>
          <p className="font-bold text-base sm:text-lg text-slate-300">
            We threw out stale 40-hour monotone video lectures. Every course is an interactive creative
            studio designed to ship production-level portfolio pieces that get you hired.
          </p>
        </div>
      </RevealOnScroll>

      {/* 3 Distinct Neo-Brutalist Sticker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg relative z-10">
        {promises.map((promise, idx) => (
          <RevealOnScroll
            key={promise.id}
            variant="pop"
            delay={idx * 130}
            duration={650}
          >
            <ValueCard promise={promise} />
          </RevealOnScroll>
        ))}
      </div>

      {/* Fun background glow effects */}
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#A3E635] rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#EC4899] rounded-full blur-3xl opacity-15 pointer-events-none" />
    </div>
  );
};
