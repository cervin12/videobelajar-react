import React from 'react';
import { BrandLogo } from '../atoms/BrandLogo';
import { Icon } from '../atoms/Icon';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activePath?: string;
  onNavigate?: (page: 'courses' | 'dashboard' | 'notes' | 'auth') => void;
  currentXp?: number;
}

interface NavItemConfig {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  badgeTextColor?: string;
  action?: 'navigate_dashboard' | 'navigate_courses' | 'navigate_notes' | 'scroll_to' | 'toast';
  targetId?: string;
}

const curriculumNav: NavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    action: 'navigate_dashboard',
  },
  {
    id: 'courses',
    label: 'All Courses',
    icon: 'auto_stories',
    badge: 'CATALOG',
    badgeColor: 'bg-[#A3E635]',
    badgeTextColor: 'text-background-dark',
    action: 'navigate_courses',
  },
  {
    id: 'my-learning',
    label: 'My Learning',
    icon: 'local_library',
    action: 'scroll_to',
    targetId: 'active-missions',
  },
  {
    id: 'enrolled-courses',
    label: 'Enrolled Courses',
    icon: 'play_lesson',
    action: 'scroll_to',
    targetId: 'active-missions',
  },
  {
    id: 'study-notes',
    label: 'Study Notes',
    icon: 'edit_note',
    badge: 'Active',
    badgeColor: 'bg-white dark:bg-slate-800',
    badgeTextColor: 'text-background-dark dark:text-white',
    action: 'navigate_notes',
  },
  {
    id: 'redlines',
    label: 'Redlines & WIPs',
    icon: 'draw',
    badge: '3',
    badgeColor: 'bg-[#EF4444]',
    badgeTextColor: 'text-white',
    action: 'scroll_to',
    targetId: 'mentor-reviews',
  },
];

const communityNav: NavItemConfig[] = [
  {
    id: 'discord-jams',
    label: 'Discord Jams',
    icon: 'forum',
    badge: 'LIVE',
    badgeColor: 'bg-[#A3E635]',
    badgeTextColor: 'text-background-dark',
    action: 'scroll_to',
    targetId: 'discord-guild',
  },
  {
    id: 'quests-badges',
    label: 'Quests & Badges',
    icon: 'military_tech',
    action: 'scroll_to',
    targetId: 'quests-badges',
  },
  {
    id: 'mentorship',
    label: 'Mentorship',
    icon: 'supervisor_account',
    action: 'scroll_to',
    targetId: 'mentor-sync',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activePath = 'dashboard',
  onNavigate,
}) => {
  const handleItemClick = (item: NavItemConfig) => {
    if (item.action === 'navigate_dashboard' && onNavigate) {
      onNavigate('dashboard');
    } else if (item.action === 'navigate_courses' && onNavigate) {
      onNavigate('courses');
    } else if (item.action === 'navigate_notes' && onNavigate) {
      onNavigate('notes');
    } else if (item.action === 'scroll_to' && item.targetId) {
      const el = document.getElementById(item.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Auto-close drawer on mobile
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Main Sidebar Aside */}
      <aside
        className={`fixed left-0 top-0 h-screen w-72 bg-[#FFFDF8] dark:bg-[#0B0F19] border-r-2 border-background-dark dark:border-[#38BDF8] z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Sidebar Top: Brand Logo and Mobile Close */}
          <div className="h-20 px-6 flex items-center justify-between border-b-2 border-background-dark dark:border-[#38BDF8] bg-[#FFFDF8] dark:bg-[#0B0F19]">
            <BrandLogo
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) {
                  onNavigate('courses');
                }
              }}
            />
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg neo-border hover:bg-slate-100 dark:hover:bg-slate-800 text-background-dark dark:text-white cursor-pointer"
              title="Close sidebar"
            >
              <Icon name="close" size="lg" />
            </button>
          </div>

          {/* Section 1: Curriculum & Studio */}
          <div className="px-6 pt-4 pb-1">
            <div className="py-1 font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Curriculum &amp; Studio
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 px-4">
            {curriculumNav.map((item) => {
              const isActive = activePath === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all font-bold text-xs cursor-pointer select-none text-left w-full ${
                    isActive
                      ? 'bg-[#FDE047] text-background-dark border-2 border-background-dark font-black shadow-[2px_2px_0px_#0F172A]'
                      : 'text-background-dark dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131A2A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px] leading-none">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border border-background-dark ${item.badgeColor} ${item.badgeTextColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Section Divider */}
          <div className="my-3 border-t-2 border-slate-200 dark:border-slate-800 mx-5" />

          {/* Section 2: Community & Guilds */}
          <div className="px-6 pt-2 pb-1">
            <div className="py-1 font-bold text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Community &amp; Guilds
            </div>
          </div>

          <nav className="flex flex-col gap-1.5 px-4">
            {communityNav.map((item) => {
              const isActive = activePath === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all font-bold text-xs cursor-pointer select-none text-left w-full ${
                    isActive
                      ? 'bg-[#FDE047] text-background-dark border-2 border-background-dark font-black shadow-[2px_2px_0px_#0F172A]'
                      : 'text-background-dark dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#131A2A]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px] leading-none">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border border-background-dark ${item.badgeColor} ${item.badgeTextColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Active Rig Status card */}
        <div className="p-4 border-t-2 border-background-dark dark:border-[#38BDF8] bg-[#F8FAFC] dark:bg-[#131A2A]">
          <div className="bg-white dark:bg-[#182235] neo-border rounded-xl p-3 flex flex-col gap-1.5 shadow-[2px_2px_0px_#0F172A] dark:shadow-[2px_2px_0px_#38BDF8]">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400">
                Active Rig
              </span>
              <span className="text-[10px] bg-[#A3E635] text-background-dark border border-background-dark px-1.5 py-0.5 rounded-full font-black">
                Blender 4.2
              </span>
            </div>
            <p className="text-xs font-bold text-background-dark dark:text-white leading-snug truncate">
              Cyber Samurai Character Model
            </p>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-0.5">
              <div className="h-full bg-[#A3E635] rounded-full" style={{ width: '68%' }} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
