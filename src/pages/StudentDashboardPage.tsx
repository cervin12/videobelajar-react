import React, { useState, useEffect } from 'react';
import { Header } from '../components/organisms/Header';
import { Sidebar } from '../components/organisms/Sidebar';
import { Footer } from '../components/organisms/Footer';
import { RevealOnScroll } from '../components/atoms/RevealOnScroll';
import {
  studentProfileData,
  activeCoursesData,
  mentorReviewData,
  questBadgesData,
  discordJamsData,
  projectAssetsData,
} from '../data/studentDashboardData';

export interface StudentDashboardPageProps {
  onNavigateToCourses?: () => void;
  onNavigateToAuth?: () => void;
  onNavigateToNotes?: () => void;
}

interface ToastMessage {
  id: number;
  text: string;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  onNavigateToCourses,
  onNavigateToAuth,
  onNavigateToNotes,
}) => {
  // 1. Theme State (matches CoursePage logic)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('skillpop-theme');
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
      document.body.classList.add('dark');
      localStorage.setItem('skillpop-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('skillpop-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // 2. Search state for Header
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Interactive Student Dashboard States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentXp, setCurrentXp] = useState(studentProfileData.currentXp);
  const [isSprintCompleted, setIsSprintCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [rsvpedEvents, setRsvpedEvents] = useState<Record<string, boolean>>({});
  const [uploadedFileNotes, setUploadedFileNotes] = useState('');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  // 4. Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (text: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addXp = (amount: number) => {
    setCurrentXp((prev) => prev + amount);
    showToast(`⭐ +${amount} XP Earned! Total: ${(currentXp + amount).toLocaleString()} XP`);
  };

  // Sprint task completion
  const handleCompleteSprint = () => {
    if (isSprintCompleted) {
      showToast('✅ Sprint already completed for today!');
      return;
    }
    setIsSprintCompleted(true);
    addXp(120);
    showToast('🔥 Sprint completed! Export uploaded (+120 XP).');
  };

  // Audio preview toggle
  const handleToggleAudio = () => {
    setIsPlayingAudio((prev) => {
      const next = !prev;
      if (next) {
        showToast('🔊 Playing Mentor Dikshant audio critique...');
      }
      return next;
    });
  };

  // RSVP Event toggle
  const handleRsvpEvent = (eventId: string) => {
    setRsvpedEvents((prev) => {
      const isCurrentlyRsvped = !!prev[eventId];
      if (!isCurrentlyRsvped) {
        showToast('🚀 You are registered! Discord Stage invite sent.');
      }
      return { ...prev, [eventId]: !isCurrentlyRsvped };
    });
  };

  // Modal actions
  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadModalOpen(false);
    setSelectedFileName(null);
    setUploadedFileNotes('');
    addXp(120);
    showToast('🎉 Project WIP submitted! Mentor notified (+120 XP).');
  };

  return (
    <div className="bg-[#FFFDF8] dark:bg-[#0B0F19] text-background-dark dark:text-white min-h-screen transition-colors duration-200 pattern-dots flex">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activePath="dashboard"
        currentXp={currentXp}
        onNavigate={(page) => {
          if (page === 'courses' && onNavigateToCourses) {
            onNavigateToCourses();
          } else if (page === 'notes' && onNavigateToNotes) {
            onNavigateToNotes();
          } else if (page === 'auth' && onNavigateToAuth) {
            onNavigateToAuth();
          }
        }}
      />

      {/* 2. Main Page Layout with offset for Sidebar */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen w-full transition-all duration-300">
        {/* Top Header (Navigation list removed, moved to sidebar; search + stats + controls retained) */}
        <Header
          variant="dashboard"
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          streakDays={studentProfileData.streakDays}
          xp={currentXp}
          level="Lvl 6"
          isDark={isDark}
          onToggleTheme={toggleTheme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNavigateToAuth={onNavigateToAuth}
          onNavigateToDashboard={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          activeNav="dashboard"
          onNavigate={(page) => {
            if (page === 'courses' && onNavigateToCourses) {
              onNavigateToCourses();
            } else if (page === 'notes' && onNavigateToNotes) {
              onNavigateToNotes();
            } else if (page === 'auth' && onNavigateToAuth) {
              onNavigateToAuth();
            }
          }}
        />

        {/* Main Dashboard Content */}
        <main className="w-full pt-24 pb-20 min-h-[calc(100vh-80px)] transition-colors flex-1">
        <div className="w-full px-gutter max-w-7xl mx-auto space-y-6">

          {/* Top Announcement Ticker Banner */}
          <RevealOnScroll variant="fade-down" duration={500}>
            <div className="flex flex-wrap items-center justify-between gap-space-sm p-3 bg-[#FEF08A] dark:bg-[#1E293B] neo-border-3 neo-shadow rounded-2xl transition-colors">
              <div className="flex items-center gap-space-sm flex-wrap">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#A3E635] text-background-dark border-2 border-background-dark shadow-[2px_2px_0px_#0F172A] -rotate-6">
                  <span
                    className="material-symbols-outlined text-lg leading-none"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                </span>
                <span className="font-black text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-background-dark text-[#FDE047]">
                  SPRING SPRINT JAM '25
                </span>
                <span className="font-bold text-sm text-background-dark dark:text-slate-200">
                  💥 Double XP enabled on all Sakuga &amp; Shader masterclasses this week!
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-black text-xs uppercase px-3 py-1 rounded-full bg-[#EC4899] text-white border-2 border-background-dark shadow-[2px_2px_0px_#0F172A] animate-pulse">
                  🔥 LIVE JAM ACTIVE
                </span>
                <span className="hidden md:inline font-bold text-xs bg-white text-background-dark px-2.5 py-1 rounded-full border-2 border-background-dark">
                  Ends in 48h ⏳
                </span>
              </div>
            </div>
          </RevealOnScroll>

          {/* Hero Student Momentum Banner */}
          <RevealOnScroll variant="fade-up" duration={600}>
            <section className="relative overflow-hidden rounded-2xl bg-[#FFFDF8] dark:bg-[#111A2E] p-6 sm:p-8 neo-border-3 neo-shadow-lg transition-colors">
              <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#A3E635]/20 dark:bg-[#A3E635]/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Greeting & Today's Goal */}
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A3E635] text-background-dark neo-border text-[11px] uppercase tracking-wider font-black shadow-[1.5px_1.5px_0px_#0F172A]">
                    <span className="material-symbols-outlined text-[16px] font-black">stars</span>
                    <span>{studentProfileData.cohort}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-background-dark dark:text-white tracking-tight leading-tight">
                    Welcome back,{' '}
                    <span className="text-primary-dark dark:text-[#A3E635] underline decoration-[#FDE047] decoration-wavy decoration-2">
                      {studentProfileData.name}!
                    </span>{' '}
                    ✨
                  </h1>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                    Ready to level up your rig today? Your animation sprint has 3 new keyframe goals, and mentor Dikshant posted redline notes on your cape collision physics.
                  </p>

                  {/* Today's Sprint Quest Pill Banner */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FEF08A] dark:bg-[#1E293B] text-xs sm:text-sm text-background-dark dark:text-white neo-border neo-shadow-sm">
                      <span className="text-base">🎯</span>
                      <span>
                        <strong className="font-black text-background-dark dark:text-[#A3E635]">Today's Sprint:</strong> Export 3 walk-cycle keyframes in Blender (+120 XP)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCompleteSprint}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-black neo-border transition-all cursor-pointer ${
                        isSprintCompleted
                          ? 'bg-[#FDE047] text-background-dark neo-shadow-sm cursor-default'
                          : 'bg-[#A3E635] text-background-dark neo-shadow hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isSprintCompleted ? 'check_circle' : 'play_arrow'}
                      </span>
                      <span>{isSprintCompleted ? 'Sprint Done!' : 'Start Sprint'}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Gamification Mosaic Stats Cards */}
                <div className="grid grid-cols-2 gap-3 min-w-72 lg:w-80">
                  {/* Level Progress */}
                  <div className="col-span-2 p-3.5 rounded-xl bg-white dark:bg-[#182235] neo-border neo-shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-primary-dark dark:text-[#A3E635] text-[20px] font-bold">
                          military_tech
                        </span>
                        <span className="text-xs font-black text-background-dark dark:text-white">
                          {studentProfileData.level}
                        </span>
                      </div>
                      <span className="text-xs font-black text-primary-dark dark:text-[#A3E635]">
                        {Math.min(100, Math.round((currentXp / studentProfileData.xpToNextLevel) * 100))}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 my-2 overflow-hidden border border-background-dark">
                      <div
                        className="h-full rounded-full bg-[#A3E635] transition-all duration-500 ease-out"
                        style={{
                          width: `${Math.min(100, (currentXp / studentProfileData.xpToNextLevel) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      <span>{currentXp.toLocaleString()} XP</span>
                      <span className="text-primary-dark dark:text-[#A3E635]">
                        {studentProfileData.xpToNextLevel.toLocaleString()} XP to Lvl 7
                      </span>
                    </div>
                  </div>

                  {/* Streak Counter */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#182235] neo-border neo-shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-1 text-[#EF4444]">
                      <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                      <span className="text-[10px] uppercase font-black tracking-wide">Streak</span>
                    </div>
                    <span className="text-lg font-black text-background-dark dark:text-white mt-0.5">
                      {studentProfileData.streakDays} Days
                    </span>
                    <span className="text-[10px] text-[#EF4444] font-bold">+50 XP Today</span>
                  </div>

                  {/* Weekly Lessons Goal */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#182235] neo-border neo-shadow-sm flex flex-col justify-center">
                    <div className="flex items-center gap-1 text-primary-dark dark:text-[#A3E635]">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      <span className="text-[10px] uppercase font-black tracking-wide">Weekly Jam</span>
                    </div>
                    <span className="text-lg font-black text-background-dark dark:text-white mt-0.5">
                      {studentProfileData.weeklyJamDone} of {studentProfileData.weeklyJamTotal}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                      Lessons complete
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </RevealOnScroll>

          {/* Submit WIP / Drag & Drop Quick Upload Bar */}
          <RevealOnScroll variant="fade-up" delay={50} duration={600}>
            <div
              id="dropZoneContainer"
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full rounded-2xl neo-border-3 neo-shadow bg-[#FEF9C3] dark:bg-[#182235] p-4 sm:p-5 transition-all cursor-pointer group flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#A3E635] text-background-dark neo-border neo-shadow-sm flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                  <span className="material-symbols-outlined text-[28px] font-bold">cloud_upload</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-black text-background-dark dark:text-white group-hover:text-primary-dark transition-colors">
                      Submit Project WIP / Upload New Iteration
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#A3E635] text-background-dark text-[10px] font-black neo-border">
                      +120 XP
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                    Drop your <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-background-dark text-xs">.blend</code>, <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-background-dark text-xs">.aep</code>, <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-background-dark text-xs">.mp4</code>, or <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-background-dark text-xs">.fig</code> file for community &amp; mentor redlines.
                  </p>
                </div>
              </div>

              <div className="flex items-center shrink-0 w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#A3E635] text-background-dark text-xs sm:text-sm font-black neo-border neo-shadow group-hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] font-black">add_circle</span>
                  <span>Upload Work</span>
                </button>
              </div>
            </div>
          </RevealOnScroll>

          {/* Main 8 / 4 Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN (8 cols): Continue Learning & Mentor Redlines & Quests */}
            <div className="lg:col-span-8 space-y-8">

              {/* Section: Continue Learning (In Flight Masterclasses) */}
              <section id="active-missions" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-2 rounded-full bg-[#A3E635] inline-block" />
                    <h2 className="text-xl sm:text-2xl font-black text-background-dark dark:text-white tracking-tight">
                      Continue Learning
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#A3E635] text-background-dark text-[10px] font-black neo-border">
                      3 IN FLIGHT
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onNavigateToCourses}
                    className="text-xs sm:text-sm font-black text-background-dark dark:text-[#A3E635] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Browse All Courses</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {/* Course Cards Stack */}
                <div className="space-y-4">
                  {activeCoursesData.map((course) => (
                    <RevealOnScroll key={course.id} variant="fade-up" duration={500}>
                      <div className="p-5 rounded-2xl bg-white dark:bg-[#182235] neo-border-3 neo-shadow flex flex-col md:flex-row gap-5 items-stretch transition-transform hover:-translate-y-0.5">
                        <div className="relative w-full md:w-56 h-36 rounded-xl overflow-hidden shrink-0 neo-border bg-slate-900">
                          <img
                            className="w-full h-full object-cover"
                            src={course.imageUrl}
                            alt={course.title}
                          />
                          <span
                            className="absolute top-2 left-2 px-2 py-0.5 text-background-dark text-[10px] font-black rounded neo-border"
                            style={{ backgroundColor: course.accentColor }}
                          >
                            {course.softwareTag}
                          </span>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white rounded text-[11px] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">timer</span>
                            <span>{course.durationLeft}</span>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="text-[11px] font-black uppercase"
                                style={{ color: course.accentColor }}
                              >
                                {course.moduleLabel}
                              </span>
                              <span
                                className="text-xs font-black"
                                style={{ color: course.accentColor }}
                              >
                                {course.progressPercentage}% Complete
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-black text-background-dark dark:text-white leading-snug mt-1">
                              {course.title}
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold line-clamp-1 mt-1">
                              Next Lesson: <strong>{course.nextLesson}</strong>
                            </p>
                          </div>

                          <div className="space-y-2">
                            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden neo-border">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${course.progressPercentage}%`,
                                  backgroundColor: course.accentColor,
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <div className="flex items-center gap-2">
                                <img
                                  className="w-6 h-6 rounded-full neo-border object-cover"
                                  src={course.mentor.avatar}
                                  alt={course.mentor.name}
                                />
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                  {course.mentor.name} • {course.mentor.role}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => showToast(`🎬 Resuming lesson for ${course.title}...`)}
                                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl ${course.buttonColor} text-background-dark text-xs font-black neo-border neo-shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer`}
                              >
                                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                                <span>Resume</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </section>

              {/* Section: Mentor Redlines & WIP Reviews */}
              <RevealOnScroll variant="fade-up" duration={550}>
                <section id="mentor-reviews" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-2 rounded-full bg-[#EC4899] inline-block" />
                      <h2 className="text-xl sm:text-2xl font-black text-background-dark dark:text-white tracking-tight">
                        Mentor Redlines &amp; WIP Reviews
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-[#EF4444] text-white text-[10px] font-black neo-border">
                        1 Action Required
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">Updated 2h ago</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-white dark:bg-[#182235] neo-border-3 neo-shadow space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b-2 border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-11 h-11 rounded-full neo-border object-cover"
                          src={mentorReviewData.mentorAvatar}
                          alt={mentorReviewData.mentorName}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-background-dark dark:text-white">
                              {mentorReviewData.mentorName}
                            </span>
                            <span className="px-1.5 py-0.2 bg-[#A3E635] text-background-dark text-[10px] font-black rounded neo-border">
                              {mentorReviewData.mentorRole}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500 font-bold">
                            Review for: <strong>{mentorReviewData.fileName}</strong>
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] dark:bg-[#93000a] dark:text-[#ffdad6] text-xs font-black neo-border">
                        {mentorReviewData.status}
                      </span>
                    </div>

                    {/* Critique Text & Audio Player */}
                    <div className="space-y-3">
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        {mentorReviewData.quote}
                      </p>

                      {/* Audio Feedback Waveform Player */}
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#0c1322] neo-border flex items-center justify-between gap-3">
                        <button
                          type="button"
                          id="btnAudioPlay"
                          onClick={handleToggleAudio}
                          className="w-9 h-9 rounded-full bg-[#A3E635] text-background-dark neo-border neo-shadow-sm flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {isPlayingAudio ? 'pause' : 'play_arrow'}
                          </span>
                        </button>

                        <div className="flex-1 flex items-center gap-1 h-6">
                          {[2, 5, 3, 4, 6, 2, 4, 3, 5, 2].map((height, i) => (
                            <span
                              key={i}
                              className={`w-1 rounded-full ${
                                i % 2 === 1 ? 'bg-[#A3E635]' : 'bg-slate-400 dark:bg-slate-600'
                              } ${isPlayingAudio ? 'wave-bar' : ''}`}
                              style={{
                                height: isPlayingAudio ? undefined : `${height * 3}px`,
                              }}
                            />
                          ))}
                        </div>

                        <span className="text-xs font-mono font-bold text-slate-500">
                          {mentorReviewData.audioTime} / {mentorReviewData.totalAudioTime}
                        </span>
                      </div>
                    </div>

                    {/* Redline Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => showToast('📥 Downloading annotated redline screenshots...')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#182235] text-background-dark dark:text-white text-xs font-black neo-border neo-shadow-sm hover:bg-[#FDE047] transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>View Redline Markup</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsUploadModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#A3E635] text-background-dark text-xs font-black neo-border neo-shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">upload_file</span>
                        <span>Submit Fixed Rig (v4)</span>
                      </button>
                    </div>
                  </div>
                </section>
              </RevealOnScroll>

              {/* Section: Quests & Guild Achievements */}
              <RevealOnScroll variant="fade-up" duration={600}>
                <section id="quests-badges" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-2 rounded-full bg-[#EAB308] inline-block" />
                      <h2 className="text-xl sm:text-2xl font-black text-background-dark dark:text-white tracking-tight">
                        Quests &amp; Guild Achievements
                      </h2>
                    </div>
                    <span className="text-xs font-black text-[#EAB308]">12 Badges Earned</span>
                  </div>

                  {/* Badges Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {questBadgesData.map((badge) => (
                      <div
                        key={badge.id}
                        className={`p-3.5 rounded-xl neo-border text-center flex flex-col items-center justify-between space-y-2 hover:scale-105 transition-transform ${
                          badge.status === 'locked'
                            ? 'bg-slate-100 dark:bg-[#0c1322] opacity-75'
                            : 'bg-white dark:bg-[#182235] neo-shadow-sm'
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-full ${badge.bgColor} neo-border flex items-center justify-center text-xl shadow-[1.5px_1.5px_0px_#0F172A]`}
                        >
                          {badge.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-background-dark dark:text-white">
                            {badge.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                            {badge.description}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-background-dark text-[10px] font-black rounded ${
                            badge.status === 'locked'
                              ? 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-500'
                              : `${badge.labelBgColor} neo-border`
                          }`}
                        >
                          {badge.badgeLabel}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </RevealOnScroll>

            </div>

            {/* RIGHT COLUMN (4 cols): Live Jams, Downloads & 1-on-1 Office Hours */}
            <div className="lg:col-span-4 space-y-8">

              {/* Discord Jams & Live Workshops */}
              <RevealOnScroll variant="fade-left" duration={500}>
                <section id="discord-guild" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-2 rounded-full bg-[#38BDF8] inline-block" />
                      <h3 className="text-lg font-black text-background-dark dark:text-white tracking-tight">
                        Discord Jams &amp; Live
                      </h3>
                    </div>
                    <span className="text-[10px] bg-[#A3E635] text-background-dark neo-border px-2 py-0.5 rounded-full font-black animate-pulse">
                      LIVE SOON
                    </span>
                  </div>

                  {discordJamsData.map((jam) => {
                    const isRsvped = !!rsvpedEvents[jam.id];
                    return (
                      <div
                        key={jam.id}
                        className="p-4 rounded-xl bg-white dark:bg-[#182235] neo-border neo-shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-[#FEF08A] text-background-dark text-[10px] font-black border border-background-dark">
                            {jam.timeTag}
                          </span>
                          {jam.attendees && (
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px] text-primary-dark dark:text-[#A3E635]">
                                group
                              </span>
                              <span>{jam.attendees}</span>
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-black text-background-dark dark:text-white leading-snug">
                          {jam.title}
                        </h4>

                        <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold">
                          {jam.description}
                        </p>

                        <div className="pt-1">
                          {jam.type === 'discord_stage' ? (
                            <button
                              type="button"
                              onClick={() => handleRsvpEvent(jam.id)}
                              className={`w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black neo-border neo-shadow-sm transition-all cursor-pointer ${
                                isRsvped
                                  ? 'bg-[#FDE047] text-background-dark'
                                  : 'bg-[#A3E635] text-background-dark hover:-translate-y-0.5 active:translate-y-0'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[16px]">
                                {isRsvped ? 'check' : 'event_available'}
                              </span>
                              <span>{isRsvped ? 'RSVP Confirmed!' : 'RSVP Discord Stage'}</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => showToast('📅 Added to your Google Calendar!')}
                              className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-white dark:bg-[#0c1322] text-background-dark dark:text-white text-xs font-black neo-border hover:bg-[#FDE047] hover:text-background-dark transition-all cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                              <span>Add to Calendar</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </section>
              </RevealOnScroll>

              {/* Project Downloads & Assets */}
              <RevealOnScroll variant="fade-left" delay={50} duration={550}>
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-6 w-2 rounded-full bg-[#EC4899] inline-block" />
                      <h3 className="text-lg font-black text-background-dark dark:text-white tracking-tight">
                        Project Resources
                      </h3>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {projectAssetsData.length} files
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {projectAssetsData.map((asset) => (
                      <div
                        key={asset.id}
                        className="p-3 rounded-xl bg-white dark:bg-[#182235] neo-border flex items-center justify-between hover:neo-shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-lg ${asset.color} neo-border text-background-dark flex items-center justify-center font-black text-xs`}
                          >
                            {asset.ext}
                          </div>
                          <div>
                            <div className="text-xs font-black text-background-dark dark:text-white">
                              {asset.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-bold">
                              {asset.size} • {asset.category}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => showToast(`💾 Downloading ${asset.name}...`)}
                          title={`Download ${asset.ext} file`}
                          className="p-2 rounded-lg neo-border hover:bg-[#A3E635] text-background-dark dark:text-white hover:text-background-dark transition-colors cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
              </RevealOnScroll>

              {/* 1-on-1 Office Hours Sync */}
              <RevealOnScroll variant="fade-left" delay={100} duration={600}>
                <section
                  id="mentor-sync"
                  className="p-5 rounded-2xl bg-[#FEF08A] dark:bg-[#1E293B] neo-border-3 neo-shadow space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-background-dark dark:text-[#A3E635] text-[22px] font-black">
                      calendar_today
                    </span>
                    <h3 className="text-base font-black text-background-dark dark:text-white">
                      1-on-1 Office Hours Sync
                    </h3>
                  </div>

                  <p className="text-xs text-slate-800 dark:text-slate-300 font-semibold leading-relaxed">
                    You have <strong>{studentProfileData.mentorSyncCredits} mentor sync credits</strong> remaining for October. Get live 1-on-1 portfolio review or debug your rig topology directly.
                  </p>

                  <button
                    type="button"
                    onClick={() => showToast('📅 Opening calendar sync slots for Dikshant M...')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#A3E635] text-background-dark text-xs sm:text-sm font-black neo-border neo-shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] font-black">
                      event_available
                    </span>
                    <span>Book 30-min Mentor Sync</span>
                  </button>
                </section>
              </RevealOnScroll>

              {/* Active Rig Quick Status */}
              <RevealOnScroll variant="fade-left" delay={150} duration={650}>
                <div className="bg-white dark:bg-[#182235] neo-border neo-shadow-sm rounded-xl p-4 flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black uppercase text-slate-500 dark:text-slate-400">
                      Active Rig in Studio
                    </span>
                    <span className="text-[10px] bg-[#A3E635] text-background-dark neo-border px-2 py-0.5 rounded-full font-black">
                      {studentProfileData.activeRigSoftware}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-background-dark dark:text-white truncate">
                    {studentProfileData.activeRigName}
                  </p>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-1">
                    <div
                      className="h-full bg-[#A3E635] rounded-full"
                      style={{ width: `${studentProfileData.activeRigProgress}%` }}
                    />
                  </div>
                </div>
              </RevealOnScroll>

            </div>

          </div>

        </div>
      </main>

      {/* 3. Upload Project Iteration Modal */}
      {isUploadModalOpen && (
        <div
          id="uploadModal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsUploadModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#0B0F19] rounded-2xl neo-border-3 neo-shadow-lg max-w-lg w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b-2 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-dark dark:text-[#A3E635] text-2xl font-black">
                  cloud_upload
                </span>
                <h3 className="text-lg font-black text-background-dark dark:text-white">
                  Upload Project Iteration
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1 rounded-lg neo-border hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div
              className="border-2 border-dashed border-slate-400 dark:border-slate-700 rounded-xl p-8 text-center space-y-2 bg-slate-50 dark:bg-[#182235] cursor-pointer hover:border-primary-dark transition-colors"
              onClick={() => {
                const sampleFiles = ['Cyber_Alley_Rig_v4.blend', 'Sakuga_Slash_Smear_v2.mp4', 'Character_Walk_Cycle.aep'];
                const randomFile = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
                setSelectedFileName(randomFile);
                showToast(`📁 Attached ${randomFile}`);
              }}
            >
              <span className="material-symbols-outlined text-4xl text-primary-dark dark:text-[#A3E635]">
                upload_file
              </span>
              <p className="text-sm font-bold text-slate-800 dark:text-white">
                {selectedFileName ? (
                  <span className="text-primary-dark font-black">Ready to upload: {selectedFileName}</span>
                ) : (
                  <>Drag &amp; drop files here or <span className="text-[#0284C7] underline">browse</span></>
                )}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                Supports .blend, .aep, .mp4, .psd, .fig up to 500 MB
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-400 block">
                Notes for Mentor Review:
              </label>
              <textarea
                value={uploadedFileNotes}
                onChange={(e) => setUploadedFileNotes(e.target.value)}
                className="w-full rounded-xl neo-border p-2.5 text-xs font-semibold bg-white dark:bg-[#182235] text-background-dark dark:text-white placeholder:text-slate-400 focus:outline-none"
                rows={3}
                placeholder="Describe what you updated, keyframes to watch, or specific questions..."
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl neo-border text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitUpload}
                className="px-5 py-2 rounded-xl bg-[#A3E635] text-background-dark neo-border neo-shadow-sm text-xs font-black hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                Submit Work (+120 XP)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Toast Notification Container */}
      <div
        id="toastContainer"
        className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="px-4 py-2.5 rounded-xl bg-background-dark text-white dark:bg-white dark:text-background-dark text-xs font-black neo-border shadow-[3px_3px_0px_#A3E635] pointer-events-auto flex items-center gap-2 animate-bounce-short"
          >
            <span>{toast.text}</span>
          </div>
        ))}
      </div>

        {/* 5. Footer Matching Course Catalog Page */}
        <RevealOnScroll variant="fade-up" duration={600}>
          <Footer />
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
