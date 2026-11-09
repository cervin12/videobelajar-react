import React, { useState, useEffect, useMemo } from 'react';
import type {
  DisciplineId,
  SortOption,
  ViewMode,
  Course,
} from '../types/course';
import {
  coursesData,
  disciplinesData,
  featuredCourseData,
  quickStatsData,
  valuePromisesData,
} from '../data/coursesData';
import {
  Header,
  AnnouncementBanner,
  HeroSection,
  FilterBar,
  FeaturedSpotlight,
  CourseCatalog,
  ValueProposition,
  Footer,
} from '../components/organisms';
import { RevealOnScroll } from '../components/atoms';

export interface CoursePageProps {
  onNavigateToAuth?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToNotes?: () => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({
  onNavigateToAuth,
  onNavigateToDashboard,
  onNavigateToNotes,
}) => {
  // 1. Theme State
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

  // 2. Filter & Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineId>('all');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('trending');

  // 3. View Mode State
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // 4. Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Helper to convert duration string (e.g. '18h 40m', '45m', '2h') to total minutes
  const parseDurationToMinutes = (durationStr: string): number => {
    const hoursMatch = durationStr.match(/(\d+)\s*h/i);
    const minutesMatch = durationStr.match(/(\d+)\s*m/i);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
  };

  // 5. Filter & Sort Execution
  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesSoftware = course.softwareTag.toLowerCase().includes(query);
        const matchesDiscipline = course.disciplineLabel.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSoftware && !matchesDiscipline && !matchesInstructor) {
          return false;
        }
      }

      // Discipline filter
      if (selectedDiscipline !== 'all' && course.discipline !== selectedDiscipline) {
        return false;
      }

      // Software filter
      if (selectedSoftware && course.software !== selectedSoftware) {
        return false;
      }

      // Level filter
      if (selectedLevel && course.level !== selectedLevel) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'rating') {
        return b.rating - a.rating;
      }
      if (selectedSort === 'duration') {
        return parseDurationToMinutes(b.duration) - parseDurationToMinutes(a.duration);
      }
      if (selectedSort === 'newest') {
        const numA = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
        const numB = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
        return numB - numA;
      }
      // 'trending' default
      return 0;
    });
  }, [searchQuery, selectedDiscipline, selectedSoftware, selectedLevel, selectedSort]);

  // Paginated Courses
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCourses = useMemo(() => {
    const start = (safeCurrentPage - 1) * itemsPerPage;
    return filteredCourses.slice(start, start + itemsPerPage);
  }, [filteredCourses, safeCurrentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDiscipline('all');
    setSelectedSoftware('');
    setSelectedLevel('');
    setSelectedSort('trending');
    setCurrentPage(1);
  };

  // Toast state
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);
  const toastIdRef = React.useRef(0);

  const showToast = (text: string) => {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts((prev) => [...prev, { id, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleEnrollCourse = (course: Course) => {
    showToast(`🎉 Enrolled in "${course.title}"! Course added to My Learning.`);
  };

  const handleEnrollSpotlight = () => {
    showToast(`⚡ Enrolled in Featured Cohort: "${featuredCourseData.title}"!`);
  };

  const handlePreviewSpotlight = () => {
    showToast(`📺 Opened Syllabus Preview for "${featuredCourseData.title}"!`);
  };

  return (
    <div className="bg-[#FFFDF8] dark:bg-[#0B0F19] text-background-dark dark:text-white min-h-screen transition-colors duration-200 pattern-dots flex flex-col">
      {/* 1. Sticky Header Organism */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigateToAuth={onNavigateToAuth}
        onNavigateToDashboard={onNavigateToDashboard}
        onProfileClick={onNavigateToDashboard}
        activeNav="courses"
        onNavigate={(page) => {
          if (page === 'dashboard' && onNavigateToDashboard) {
            onNavigateToDashboard();
          } else if (page === 'notes' && onNavigateToNotes) {
            onNavigateToNotes();
          } else if (page === 'auth' && onNavigateToAuth) {
            onNavigateToAuth();
          }
        }}
      />

      {/* 2. Main Page Content */}
      <main className="w-full pt-24 bg-[#FFFDF8] dark:bg-[#090D16] min-h-[calc(100vh-80px)] transition-colors flex-1 pb-16">
        <div className="w-full relative px-gutter max-w-340 mx-auto">
          {/* Top Announcement Ticker */}
          <RevealOnScroll variant="fade-down" duration={500}>
            <AnnouncementBanner />
          </RevealOnScroll>

          {/* Hero Section */}
          <RevealOnScroll variant="fade-up" delay={50} duration={650}>
            <HeroSection stats={quickStatsData} />
          </RevealOnScroll>

          {/* Filter & Search Bar */}
          <RevealOnScroll variant="fade-up" delay={100} duration={600}>
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedSoftware={selectedSoftware}
              onSoftwareChange={setSelectedSoftware}
              selectedLevel={selectedLevel}
              onLevelChange={setSelectedLevel}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              selectedDiscipline={selectedDiscipline}
              onDisciplineChange={setSelectedDiscipline}
              disciplines={disciplinesData}
            />
          </RevealOnScroll>

          {/* Featured Spotlight Banner */}
          <RevealOnScroll variant="zoom-in" delay={80} duration={700}>
            <FeaturedSpotlight
              course={featuredCourseData}
              onEnroll={handleEnrollSpotlight}
              onPreview={handlePreviewSpotlight}
            />
          </RevealOnScroll>

          {/* Course Catalog (Grid / List & Pagination) */}
          <CourseCatalog
            courses={paginatedCourses}
            totalCoursesCount={filteredCourses.length}
            viewMode={viewMode}
            onViewChange={setViewMode}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onEnrollCourse={handleEnrollCourse}
            onResetFilters={handleResetFilters}
          />

          {/* Value Proposition / Creator Promise */}
          <div className="mt-10">
            <RevealOnScroll variant="fade-up" delay={100} duration={750}>
              <ValueProposition promises={valuePromisesData} />
            </RevealOnScroll>
          </div>
        </div>
      </main>

      {/* Toast Notification Container */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="px-4 py-2.5 rounded-xl bg-background-dark text-white dark:bg-white dark:text-background-dark text-xs font-black neo-border shadow-[3px_3px_0px_#A3E635] pointer-events-auto flex items-center gap-2 animate-bounce-short"
          >
            <span>{toast.text}</span>
          </div>
        ))}
      </div>

      {/* 3. Footer Organism */}
      <RevealOnScroll variant="fade-up" duration={600}>
        <Footer />
      </RevealOnScroll>
    </div>
  );
};

export default CoursePage;
