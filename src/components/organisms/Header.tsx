import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { Icon } from '../atoms/Icon';
import { BrandLogo } from '../atoms/BrandLogo';
import userAvatar from '../../assets/user-avatar.jpg';

export interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToAuth?: () => void;
}

type NavTab = 'courses' | 'challenges' | 'community' | 'mentors';

interface NavItem {
  id: NavTab;
  label: string;
  icon: string;
  activeColor: string;
  hoverColor: string;
}

const navItems: NavItem[] = [
  { id: 'courses', label: 'Courses', icon: '🚀', activeColor: 'bg-[#FDE047]', hoverColor: 'hover:bg-[#FDE047]' },
  { id: 'challenges', label: 'Challenges', icon: '🔥', activeColor: 'bg-[#A3E635]', hoverColor: 'hover:bg-[#A3E635]' },
  { id: 'community', label: 'Community', icon: '✨', activeColor: 'bg-[#F472B6]', hoverColor: 'hover:bg-[#F472B6]' },
  { id: 'mentors', label: 'Mentors', icon: '👾', activeColor: 'bg-[#38BDF8]', hoverColor: 'hover:bg-[#38BDF8]' },
];

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  onNavigateToAuth,
}) => {
  const [activeTab, setActiveTab] = useState<NavTab>('courses');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#FFFDF8]/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b-2 border-background-dark dark:border-[#38BDF8] transition-colors">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-space-md max-w-340 mx-auto">
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-space-lg">
          <BrandLogo
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Nav Tabs */}
          <nav
            id="headerMainNav"
            className="hidden xl:flex items-center gap-1 p-1 bg-[#FFFDF8] dark:bg-[#131A2A] rounded-lg neo-border"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 transition-all text-xs cursor-pointer select-none rounded-md ${
                    isActive
                      ? `${item.activeColor} text-background-dark font-black border-2 border-background-dark`
                      : `text-background-dark dark:text-slate-200 font-bold ${item.hoverColor} hover:text-background-dark hover:border-2 hover:border-background-dark`
                  }`}
                >
                  <span className="leading-none">{item.label}</span>
                  <span className="leading-none">{item.icon}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Quick Search, Theme Toggle, Notification, CTA, User */}
        <div className="flex items-center gap-space-md">
          {/* Quick Search */}
          <div className="hidden md:flex items-center gap-space-sm bg-white dark:bg-[#131a2a] px-space-md py-1 px-2 rounded-xl text-background-dark dark:text-slate-200 neo-border">
            <Icon name="search" size="lg" className="font-bold" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search course ..."
              className="text-sm font-semibold focus:outline-none bg-transparent pr-space-md text-background-dark dark:text-slate-200 w-36 lg:w-48 placeholder:text-slate-400"
            />
            <kbd className="text-[11px] px-1.5 py-0.5 rounded bg-[#FDE047] text-background-dark font-extrabold border border-background-dark select-none">
              ⌘K
            </kbd>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle
            isDark={isDark}
            onToggle={onToggleTheme}
          />

          {/* Notification Button */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-2 rounded-xl bg-white dark:bg-[#131a2a] neo-border hover:bg-[#FDE047] transition-colors cursor-pointer"
          >
            <Icon name="notifications" size="xl" className="text-background-dark dark:text-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-background-dark" />
          </button>

          {/* CTA: Go Pro */}
          <a
            href="#pricing"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#A3E635] text-background-dark font-black text-sm uppercase tracking-wide neo-border hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Go Pro ⚡
          </a>

          {/* User Profile / Auth Link */}
          <div
            className="flex items-center pl-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            title="Account / Sign In"
            onClick={onNavigateToAuth}
          >
            <div className="relative">
              <img
                alt="Creator Profile"
                className="w-9 h-9 rounded-full object-cover border-2 border-background-dark dark:border-[#38BDF8]"
                src={userAvatar}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#A3E635] ring-2 ring-white dark:ring-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Animated On-Scroll Progress Bar */}
      <div className="w-full h-1 bg-slate-200/50 dark:bg-slate-800/50 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-[#A3E635] via-[#FDE047] to-[#F472B6] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};
