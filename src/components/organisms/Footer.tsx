import React from 'react';
import { BrandLogo } from '../atoms/BrandLogo';

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer
      className={`w-full bg-[#FFFDF8] dark:bg-[#0B0F19] border-t-4 border-background-dark dark:border-[#38BDF8] transition-colors ${className}`}
    >
      <div className="w-full px-gutter py-space-xl max-w-340 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm mb-1">
              <BrandLogo
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
            <p className="font-bold text-sm text-slate-600 dark:text-slate-400 max-w-sm">
              The neo-creative learning ecosystem engineered for 3D artists, real-time visualists,
              motion technologists, and generative designers worldwide.
            </p>
            <div className="inline-flex items-center gap-space-sm px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#131A2A] text-background-dark dark:text-slate-300 font-black text-xs w-fit neo-border">
              <span className="w-2.5 h-2.5 rounded-full bg-[#A3E635] border border-background-dark animate-pulse" />
              <span>SkillPop Arcade: 100% Operational</span>
            </div>
          </div>

          {/* Curriculum */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-black text-xs text-background-dark dark:text-white uppercase tracking-wider mb-space-xs">
              Curriculum
            </span>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#courses">
              All Courses
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#career-tracks">
              Interactive 3D Paths
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#challenges">
              Game Dev Sprints
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#generative">
              Generative Graphics
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#shaders">
              Shader Engineering
            </a>
          </div>

          {/* Ecosystem */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-black text-xs text-background-dark dark:text-white uppercase tracking-wider mb-space-xs">
              Ecosystem
            </span>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#gallery">
              Student Gallery
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#jams">
              Weekly Jams
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#reviews">
              1-on-1 Reviews
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#discord">
              Discord Guild
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#campus">
              Campus Licenses
            </a>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-black text-xs text-background-dark dark:text-white uppercase tracking-wider mb-space-xs">
              Platform
            </span>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#login">
              Member Portal
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#privacy">
              Privacy Policy
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#terms">
              Terms of Service
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#honor">
              Honor Code
            </a>
            <a className="font-bold text-sm text-slate-600 dark:text-slate-400 hover:text-background-dark dark:hover:text-white transition-colors" href="#security">
              Security Status
            </a>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-space-lg border-t-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-space-md text-slate-600 dark:text-slate-400 font-bold text-xs">
          <p>© 2025 SkillPop Academy Inc. Crafted with 🔥 for expressive digital creators.</p>
          <div className="flex items-center gap-space-lg">
            <a className="hover:text-background-dark dark:hover:text-white transition-colors" href="#legal">
              Legal
            </a>
            <a className="hover:text-background-dark dark:hover:text-white transition-colors" href="#cookies">
              Cookies
            </a>
            <a className="hover:text-background-dark dark:hover:text-white transition-colors" href="#support">
              Support Guild
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
