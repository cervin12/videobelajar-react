import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '../molecules/ThemeToggle';
import { Icon } from '../atoms/Icon';
import { BrandLogo } from '../atoms/BrandLogo';
import userAvatar from '../../assets/user-avatar.jpg';

export type NavTab = 'courses' | 'challenges' | 'community' | 'mentors';

export interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigateToAuth?: () => void;
  onNavigateToDashboard?: () => void;
  onProfileClick?: () => void;
  activeNav?: string;
  onNavigate?: (page: 'courses' | 'dashboard' | 'notes' | 'auth') => void;
  variant?: 'landing' | 'dashboard';
  onToggleSidebar?: () => void;
  streakDays?: number;
  xp?: number;
  level?: string;
  showNavList?: boolean;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: string;
  activeColor: string;
  hoverColor: string;
  hashLink?: string;
}

const navItems: NavItem[] = [
  { id: 'courses', label: 'Courses', icon: '🚀', activeColor: 'bg-[#FDE047]', hoverColor: 'hover:bg-[#FDE047]' },
  { id: 'challenges', label: 'Challenges', icon: '🔥', activeColor: 'bg-[#A3E635]', hoverColor: 'hover:bg-[#A3E635]', hashLink: '#active-missions' },
  { id: 'community', label: 'Community', icon: '✨', activeColor: 'bg-[#F472B6]', hoverColor: 'hover:bg-[#F472B6]', hashLink: '#discord-guild' },
  { id: 'mentors', label: 'Mentors', icon: '👾', activeColor: 'bg-[#38BDF8]', hoverColor: 'hover:bg-[#38BDF8]', hashLink: '#mentor-reviews' },
];

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  onNavigateToAuth,
  onNavigateToDashboard,
  onProfileClick,
  activeNav = 'courses',
  onNavigate,
  variant = 'landing',
  onToggleSidebar,
  streakDays = 14,
  xp = 2840,
  level = 'Lvl 6',
  showNavList = true,
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState<string>(activeNav);
  const [scrollProgress, setScrollProgress] = useState(0);

  const isDashboard = variant === 'dashboard';

  useEffect(() => {
    setInternalActiveTab(activeNav);
  }, [activeNav]);

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else if (onNavigateToDashboard) {
      onNavigateToDashboard();
    } else if (onNavigate) {
      onNavigate('dashboard');
    } else if (onNavigateToAuth) {
      onNavigateToAuth();
    }
  };

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

  const handleNavClick = (item: NavItem) => {
    setInternalActiveTab(item.id);
    if (item.id === 'courses' && onNavigate) {
      onNavigate('courses');
    } else if (item.hashLink) {
      const el = document.querySelector(item.hashLink);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 right-0 z-40 bg-[#FFFDF8]/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b-2 border-background-dark dark:border-[#38BDF8] transition-all duration-300 ${
        isDashboard ? 'left-0 lg:left-72' : 'left-0'
      }`}
    >
      <div
        className={`h-20 w-full px-gutter flex items-center justify-between gap-space-md mx-auto ${
          isDashboard ? 'max-w-7xl' : 'max-w-340'
        }`}
      >
        {/* Left: Branding & Search / Mobile Hamburger */}
        <div className="flex items-center gap-space-sm sm:gap-space-md flex-1">
          {/* Mobile Sidebar Hamburger Toggle for Dashboard */}
          {isDashboard && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl bg-white dark:bg-[#131a2a] neo-border hover:bg-[#FDE047] text-background-dark dark:text-white transition-colors cursor-pointer shrink-0"
              title="Open Navigation Menu"
            >
              <Icon name="menu" size="lg" />
            </button>
          )}

          {/* Logo on Landing page, or Logo on mobile dashboard if sidebar is closed */}
          {!isDashboard ? (
            <div className="flex items-center gap-space-lg">
              <BrandLogo
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate('courses');
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />

              {/* Nav Tabs for Landing page */}
              {showNavList && (
                <nav
                  id="headerMainNav"
                  className="hidden xl:flex items-center gap-1 p-1 bg-[#FFFDF8] dark:bg-[#131A2A] rounded-lg neo-border"
                >
                  {navItems.map((item) => {
                    const isActive = (activeNav || internalActiveTab) === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleNavClick(item)}
                        className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 transition-all text-xs cursor-pointer select-none rounded-md ${
                          isActive
                            ? `${item.activeColor} text-background-dark font-black border-2 border-background-dark shadow-[1.5px_1.5px_0px_#0F172A]`
                            : `text-background-dark dark:text-slate-200 font-bold ${item.hoverColor} hover:text-background-dark hover:border-2 hover:border-background-dark`
                        }`}
                      >
                        <span className="leading-none">{item.label}</span>
                        <span className="leading-none">{item.icon}</span>
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          ) : (
            /* Dashboard Search Input */
            <div className="flex items-center gap-space-sm bg-white dark:bg-[#131a2a] px-space-md py-1.5 px-2.5 rounded-xl text-background-dark dark:text-slate-200 neo-border max-w-md w-full">
              <Icon name="search" size="lg" className="font-bold text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search missions, shaders, notes..."
                className="text-xs sm:text-sm font-semibold focus:outline-none bg-transparent pr-2 text-background-dark dark:text-slate-200 flex-1 placeholder:text-slate-400"
              />
              <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#FDE047] text-background-dark font-extrabold border border-background-dark select-none shadow-[1px_1px_0px_#0F172A]">
                ⌘K
              </kbd>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-space-sm sm:gap-space-md shrink-0">
          {/* Landing Mode Quick Search */}
          {!isDashboard && (
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
          )}

          {/* Gamification Stats for Dashboard mode */}
          {isDashboard && (
            <div className="hidden xl:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#131A2A] neo-border px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#0F172A]">
                <span className="material-symbols-outlined text-[#EF4444] text-[18px]">
                  local_fire_department
                </span>
                <span className="font-black text-xs text-background-dark dark:text-white">
                  {streakDays}-Day Streak
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-white dark:bg-[#131A2A] neo-border px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#0F172A]">
                <span className="material-symbols-outlined text-[#EAB308] text-[18px]">bolt</span>
                <span className="font-black text-xs text-background-dark dark:text-white">
                  {xp.toLocaleString()} XP
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#A3E635] text-background-dark neo-border px-2.5 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#0F172A]">
                <span className="material-symbols-outlined text-[18px] font-black">shield</span>
                <span className="font-black text-xs">{level}</span>
              </div>
              <div className="h-6 w-0.5 bg-slate-300 dark:bg-slate-700 mx-1" />
            </div>
          )}

          {/* Theme Toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />

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
            className="hidden sm:inline-flex items-center justify-center px-3 py-2 rounded-lg bg-[#A3E635] text-background-dark font-black text-xs uppercase tracking-wider neo-border shadow-[2px_2px_0px_#0F172A] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Go Pro ⚡
          </a>

          {/* User Profile / Student Dashboard Link */}
          <div
            className="flex items-center pl-1 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            title="Student Dashboard • Sarah Vance"
            onClick={handleProfileClick}
          >
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover border-2 border-background-dark shadow-[2px_2px_0px_#0F172A]"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XGof4N_6Ilm5rNH6DoNos8mnGnG1-uS1v2xS9gL4TrT2wdr24YeSIORA9xI502dEc28frPRf7NQ_L0dYda4MKS8BWuCx-zdjj1s0eTMgEv2Vq9t5o4Ls_cG0UuKJY8lWbsguJK7wIAQAVu-W1pTruHDCUPY2yFp0CGznsEFi2kkoy4rrZLqMxYoNQ6Im5wb9z0mAwMb0UXQMPnkvxHmhPxWzwDtnj_FksmNfIhWcSYOsX_LpfnKDq0Ghw"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = userAvatar;
              }}
            />
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
