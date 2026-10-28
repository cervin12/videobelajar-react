import React, { useState, useEffect } from 'react';
import { ThemeToggle } from '../components/molecules/ThemeToggle';
import { BrandLogo } from '../components/atoms/BrandLogo';
import userAvatar from '../assets/user-avatar.jpg';

export interface AuthPageProps {
  onNavigateToCourses?: () => void;
}

export type AuthMode = 'register' | 'login';
export type CreativeTrack = '3d' | 'motion' | 'uiux' | 'code' | '2d' | 'all';

export const AuthPage: React.FC<AuthPageProps> = ({
  onNavigateToCourses,
}) => {
  // Theme state synced with localStorage
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('skillpop-theme') || localStorage.getItem('skillpop_theme');
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('skillpop-theme', 'dark');
      localStorage.setItem('skillpop_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('skillpop-theme', 'light');
      localStorage.setItem('skillpop_theme', 'light');
    }
  }, [isDark]);

  // Auth Mode State
  const [authMode, setAuthMode] = useState<AuthMode>('register');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<CreativeTrack>('3d');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'register') {
      alert(`Welcome to SkillPop!, ${fullName || 'Creator'}! Your 7-day free trial is active. Level 1 Unlocked ⚡`);
    } else {
      alert(`Welcome back, ${email || 'Creator'}! Loading courses... 🚀`);
    }
    if (onNavigateToCourses) {
      onNavigateToCourses();
    }
  };

  const tracks: { id: CreativeTrack; label: string; icon: string }[] = [
    { id: '3d', label: '3D & Blender', icon: '🕹️' },
    { id: 'motion', label: 'Motion & VFX', icon: '🎬' },
    { id: 'uiux', label: 'Product / UI', icon: '🎨' },
    { id: 'code', label: 'Creative Code', icon: '💻' },
    { id: '2d', label: '2D Animation', icon: '✏️' },
    { id: 'all', label: 'Everything!', icon: '✨' },
  ];

  return (
    <div className="bg-[#faf8ff] dark:bg-background-dark text-[#1A0914] dark:text-slate-100 min-h-screen flex flex-col font-sans selection:bg-[#ff8bcb] selection:text-[#1A0914] overflow-x-hidden transition-colors duration-200">
      {/* Top Header */}
      <header className="w-full border-b-2 border-[#1A0914] dark:border-slate-800 bg-white dark:bg-background-dark sticky top-0 z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-3">
          <BrandLogo onClick={onNavigateToCourses} />
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onNavigateToCourses}
            className="flex items-center gap-1.5 text-sm font-bold text-[#1A0914] dark:text-slate-200 hover:text-primary dark:hover:text-pop-lime transition-colors py-1.5 px-3 rounded-lg border-2 border-transparent hover:border-[#1A0914] dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:shadow-[2px_2px_0px_#1A0914] cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="hidden sm:inline">Back to Courses</span>
            <span className="sm:hidden">Courses</span>
          </button>

          {/* Theme Toggle */}
          <ThemeToggle
            isDark={isDark}
            onToggle={() => setIsDark((prev) => !prev)}
          />

          {/* Quick Help Capsule */}
          <div className="flex items-center gap-2 border-l-2 border-neutral-200 dark:border-slate-700 pl-3">
            <button
              type="button"
              onClick={() => alert('Need help? Join the SkillPop 24/7 Discord guild or email support@skillpop.dev')}
              className="w-8 h-8 rounded-lg border-2 border-[#1A0914] dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-xs font-black text-[#1A0914] dark:text-slate-100 shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] hover:translate-y-0.5 active:translate-y-1 transition-transform cursor-pointer"
              title="Help"
            >
              ?
            </button>
          </div>

          {/* Profile Image (Same as Course Catalog) */}
          <div className="flex items-center pl-1 cursor-pointer" title="Creator Profile">
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
      </header>

      {/* Main Split Auth Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 relative">
        {/* Card Box with 3 Stickers sticking directly to its border perimeter */}
        <div className="w-full max-w-6xl bg-white dark:bg-background-dark border-2 border-[#1A0914] dark:border-slate-700 rounded-3xl shadow-[6px_6px_0px_#1A0914] dark:shadow-[6px_6px_0px_#020617] overflow-visible flex flex-col lg:flex-row my-auto transition-colors duration-200 relative z-20">
          
          {/* Sticker 1: Top-Left Line (Yellow) */}
          <div className="absolute -top-3.5 left-4 sm:left-6 z-30 flex items-center gap-1.5 bg-pop-yellow text-[#1A0914] border-2 border-[#1A0914] px-3.5 py-1 rounded-lg font-black text-xs shadow-[2px_2px_0px_#1A0914] -rotate-3 select-none">
            <span>✦ 45,000+ Students live!</span>
          </div>

          {/* Sticker 2: Top-Right Line (Lime) */}
          <div className="absolute -top-3.5 right-6 sm:right-8 z-30 flex items-center gap-1.5 bg-pop-lime text-[#1A0914] border-2 border-[#1A0914] px-3.5 py-1 rounded-full font-black text-xs shadow-[2px_2px_0px_#1A0914] rotate-2 select-none">
            <span>⚡ Discord Jams 24/7</span>
          </div>

          {/* Sticker 3: Bottom-Left Line (Pink) */}
          <div className="absolute -bottom-3.5 left-6 sm:left-10 z-30 flex items-center gap-1.5 bg-[#ff8bcb] text-[#1A0914] border-2 border-[#1A0914] px-3.5 py-1 rounded-full font-black text-xs shadow-[2px_2px_0px_#1A0914] rotate-2 select-none">
            <span>🎨 Fresh Sprints Daily</span>
          </div>

          {/* Left Column: Creative Showcase */}
          <div className="w-full lg:w-5/12 bg-[#240f1b] dark:bg-[#140e1f] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden border-b-2 lg:border-b-0 lg:border-r-2 border-[#1A0914] dark:border-slate-800 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#ff8bcb]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#ff8bcb] text-[#240f1b] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-[#240f1b] shadow-[2px_2px_0px_#1A0914]">
                <span className="material-symbols-outlined text-sm">stars</span>
                Student Spotlight
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Ready to unlock your creative superpowers? ✨
              </h1>
              <p className="text-[#ce8db1] dark:text-purple-200/80 text-sm sm:text-base mt-2 font-medium leading-relaxed">
                Join 45,000+ creators building games, 3D worlds, and motion design portfolios with instant mentor feedback.
              </p>
            </div>

            <div className="my-6 relative z-10 bg-[#361728] dark:bg-[#1f1430] border-2 border-[#4b2038] dark:border-purple-900/60 rounded-2xl p-4 sm:p-5 shadow-lg">
              <div className="relative rounded-xl overflow-hidden mb-4 border border-[#4b2038] dark:border-purple-800/40">
                <img
                  className="w-full h-44 object-cover object-center"
                  alt="3D Workstation Artwork"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUD_re4nPnwWv4WOy9ehxDBAK7LgIaYpEZ7HoGxcDvJ4e3n-s1ihixc7xnPrDUq0iCOgboTQvM-2Ryt2sN8ttKCv_4nuuE8K7-smjw7tIuF18qnFjGwF-iPi_xo-h1YiZSqH5Ee04GAuF2tcJ6nloGCOuHYp5KBBxIdD3e9NgvMJS6wX8yPOCUDgNk7urCV9d9DWBqa43efCZ5dtEkPBcxubQBkbVGNBJz2jQeXtdeiVvQovuNf7Es6A"
                />
                <div className="absolute top-2.5 right-2.5 bg-[#1A0914]/90 text-pop-lime border border-[#1A0914] px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 backdrop-blur-sm shadow-sm">
                  <span className="material-symbols-outlined text-xs">bolt</span> Level 1 Unlocked
                </div>
              </div>
              <blockquote className="text-white text-base font-bold leading-snug">
                “Joined to learn Blender, stayed for the 24/7 Discord jams!”
              </blockquote>
              <div className="mt-3 flex items-center justify-between border-t border-[#4b2038] dark:border-purple-900/50 pt-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#ff8bcb] to-pop-yellow text-[#240f1b] font-black text-xs flex items-center justify-center border border-white">
                    LC
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Leo Chen</p>
                    <p className="text-[11px] text-[#ce8db1] dark:text-purple-300/70">3D Track Member · 240 XP</p>
                  </div>
                </div>
                <span className="text-xs text-pop-yellow font-bold bg-[#4b2038]/80 dark:bg-purple-950/80 px-2 py-0.5 rounded border border-[#ce8db1]/20 dark:border-purple-700/50">
                  Badge #4
                </span>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ce8db1] dark:text-purple-300/80 mb-2.5 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">hub</span>
                Master Real Production Tools:
              </p>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1.5 bg-[#4b2038] dark:bg-[#251733] text-white px-3 py-1.5 rounded-xl border border-[#5d2b48] dark:border-purple-900/60 text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#ff8bcb]">palette</span>
                  Figma
                </div>
                <div className="flex items-center gap-1.5 bg-[#4b2038] dark:bg-[#251733] text-white px-3 py-1.5 rounded-xl border border-[#5d2b48] dark:border-purple-900/60 text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-sm text-pop-yellow">view_in_ar</span>
                  Blender 4.0
                </div>
                <div className="flex items-center gap-1.5 bg-[#4b2038] dark:bg-[#251733] text-white px-3 py-1.5 rounded-xl border border-[#5d2b48] dark:border-purple-900/60 text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-sm text-pop-lime">graphic_eq</span>
                  Spline 3D
                </div>
                <div className="flex items-center gap-1.5 bg-[#4b2038] dark:bg-[#251733] text-white px-3 py-1.5 rounded-xl border border-[#5d2b48] dark:border-purple-900/60 text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-sm text-[#ff8bcb]">movie</span>
                  After Effects
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="w-full lg:w-7/12 bg-white dark:bg-background-dark p-6 sm:p-8 md:p-10 flex flex-col justify-between rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl transition-colors duration-200">
            <div>
              {/* Mode Switcher Tabs */}
              <div className="flex items-center justify-between gap-2 p-1.5 bg-[#f5f1fa] dark:bg-[#1e293b] rounded-2xl border-2 border-[#1A0914] dark:border-slate-700 mb-6 transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-white dark:bg-slate-800 text-[#1A0914] dark:text-white shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] border-2 border-[#1A0914] dark:border-slate-600'
                      : 'text-neutral-600 dark:text-slate-400 hover:text-[#1A0914] dark:hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base text-primary dark:text-pop-lime">rocket_launch</span>
                  Sign Up / Register
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-black bg-pop-lime text-[#1A0914] border border-[#1A0914] rounded">Free</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-slate-800 text-[#1A0914] dark:text-white shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] border-2 border-[#1A0914] dark:border-slate-600'
                      : 'text-neutral-600 dark:text-slate-400 hover:text-[#1A0914] dark:hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">login</span>
                  Log In
                </button>
              </div>

              {/* Social Quick Sign-In */}
              <div className="space-y-2 mb-6">
                <p className="text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                  Instant one-click access:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => alert('Google Sign-In: Simulation successful 🚀')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white dark:bg-[#1e293b] hover:bg-neutral-50 dark:hover:bg-slate-700 border-2 border-[#1A0914] dark:border-slate-700 rounded-xl text-xs font-bold text-[#1A0914] dark:text-white shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('GitHub Sign-In: Simulation successful 🚀')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white dark:bg-[#1e293b] hover:bg-neutral-50 dark:hover:bg-slate-700 border-2 border-[#1A0914] dark:border-slate-700 rounded-xl text-xs font-bold text-[#1A0914] dark:text-white shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fillRule="evenodd" />
                    </svg>
                    GitHub
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('Discord Sign-In: Simulation successful 🚀')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white dark:bg-[#1e293b] hover:bg-neutral-50 dark:hover:bg-slate-700 border-2 border-[#1A0914] dark:border-slate-700 rounded-xl text-xs font-bold text-[#1A0914] dark:text-white shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-[#5865F2]" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </button>

                  <button
                    type="button"
                    onClick={() => alert('Apple Sign-In: Simulation successful 🚀')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white dark:bg-[#1e293b] hover:bg-neutral-50 dark:hover:bg-slate-700 border-2 border-[#1A0914] dark:border-slate-700 rounded-xl text-xs font-bold text-[#1A0914] dark:text-white shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] hover:translate-y-0.5 transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.74 1.02-1.77.91-2.8-.88.04-1.94.59-2.57 1.33-.55.63-.99 1.68-.86 2.68 1 .08 1.99-.49 2.52-1.21z" />
                    </svg>
                    Apple
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-5">
                <div className="border-t-2 border-neutral-200 dark:border-slate-700 w-full" />
                <span className="bg-white dark:bg-background-dark px-3 text-xs font-bold text-neutral-500 dark:text-slate-400 uppercase tracking-wider relative">
                  or with email &amp; superpowers ✨
                </span>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {authMode === 'register' && (
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-[#1A0914] dark:text-slate-200 uppercase tracking-wider">
                      Full Name / Creator Handle
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-3 text-neutral-400 dark:text-slate-500 text-lg">badge</span>
                      <input
                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-[#182234] border-2 border-[#1A0914] dark:border-slate-700 text-[#1A0914] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-500 rounded-xl text-sm font-medium focus:bg-white dark:focus:bg-[#1e293b] focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pop-lime shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] transition-colors"
                        placeholder="What should mentors call you?"
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-[#1A0914] dark:text-slate-200 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-3 text-neutral-400 dark:text-slate-500 text-lg">mail</span>
                    <input
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-[#182234] border-2 border-[#1A0914] dark:border-slate-700 text-[#1A0914] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-500 rounded-xl text-sm font-medium focus:bg-white dark:focus:bg-[#1e293b] focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pop-lime shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] transition-colors"
                      placeholder="your.best.creative@inbox.com"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-extrabold text-[#1A0914] dark:text-slate-200 uppercase tracking-wider">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Password reset instructions sent to your email!')}
                        className="text-xs font-bold text-primary dark:text-pop-lime hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3.5 top-3 text-neutral-400 dark:text-slate-500 text-lg">key</span>
                    <input
                      className="w-full pl-10 pr-11 py-2.5 bg-neutral-50 dark:bg-[#182234] border-2 border-[#1A0914] dark:border-slate-700 text-[#1A0914] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-slate-500 rounded-xl text-sm font-medium focus:bg-white dark:focus:bg-[#1e293b] focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-pop-lime shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712] transition-colors"
                      placeholder="8+ characters with high energy ⚡"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-neutral-500 dark:text-slate-400 hover:text-[#1A0914] dark:hover:text-white p-0.5 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {authMode === 'register' && (
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-extrabold text-[#1A0914] dark:text-slate-200 uppercase tracking-wider">
                      What do you want to master first?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {tracks.map((track) => (
                        <label
                          key={track.id}
                          className={`relative flex items-center justify-center p-2 rounded-xl border-2 border-[#1A0914] dark:border-slate-700 text-xs font-bold cursor-pointer transition-all ${
                            selectedTrack === track.id
                              ? 'bg-pop-yellow text-[#1A0914] border-[#1A0914] shadow-[2px_2px_0px_#1A0914]'
                              : 'bg-white dark:bg-[#182234] text-[#1A0914] dark:text-slate-200 hover:bg-neutral-50 dark:hover:bg-slate-700 shadow-[2px_2px_0px_#1A0914] dark:shadow-[2px_2px_0px_#030712]'
                          }`}
                        >
                          <input
                            className="sr-only"
                            type="radio"
                            name="track"
                            value={track.id}
                            checked={selectedTrack === track.id}
                            onChange={() => setSelectedTrack(track.id)}
                          />
                          <span>{track.icon} {track.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-1">
                  {authMode === 'register' ? (
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-neutral-700 dark:text-slate-300">
                      <input
                        className="mt-0.5 rounded text-primary focus:ring-primary border-2 border-[#1A0914] dark:border-slate-600 dark:bg-slate-800 h-4 w-4"
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        required
                      />
                      <span>I agree to build cool stuff, complete jams, and respect friendly community vibes.</span>
                    </label>
                  ) : (
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700 dark:text-slate-300">
                      <input
                        className="rounded text-primary focus:ring-primary border-2 border-[#1A0914] dark:border-slate-600 dark:bg-slate-800 h-4 w-4"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span>Keep me signed in on this workstation</span>
                    </label>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full mt-3 py-3.5 px-6 rounded-2xl font-black text-base border-2 border-[#1A0914] shadow-[4px_4px_0px_#1A0914] hover:shadow-[1px_1px_0px_#1A0914] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-pop-lime text-[#1A0914]'
                      : 'bg-pop-yellow text-[#1A0914]'
                  }`}
                >
                  <span>
                    {authMode === 'register'
                      ? 'Claim Your Free Pass & Start Learning 🚀'
                      : 'Jump Back In ⚡'}
                  </span>
                </button>
              </form>
            </div>

            {/* Security Capsule */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-neutral-200 dark:border-slate-700 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-bold text-neutral-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <span className="material-symbols-outlined text-xs">lock</span>
                  256-bit encrypted
                </span>
                <span>·</span>
                <span>Free 7-day trial</span>
                <span>·</span>
                <span>No credit card required to start</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full border-t-2 border-[#1A0914] dark:border-slate-800 bg-white dark:bg-[#0d111d] py-4 px-6 text-xs text-neutral-600 dark:text-slate-400 font-semibold transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#1A0914] dark:text-slate-200 font-bold">SkillPop Engine: All systems operational</span>
          </div>
          <div className="flex items-center gap-6">
            <button type="button" onClick={onNavigateToCourses} className="hover:text-primary dark:hover:text-pop-lime transition-colors cursor-pointer">
              Course Catalog
            </button>
            <span className="text-neutral-400 dark:text-slate-500">Privacy Policy</span>
            <span className="text-neutral-400 dark:text-slate-500">Community Guidelines</span>
            <span className="text-neutral-400 dark:text-slate-500">© 2025 SkillPop! Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default AuthPage;
