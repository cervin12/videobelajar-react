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
        return parseInt(b.duration) - parseInt(a.duration);
      }
      if (selectedSort === 'newest') {
        return b.id.localeCompare(a.id);
      }
      // 'trending' default
      return 0;
    });
  }, [searchQuery, selectedDiscipline, selectedSoftware, selectedLevel, selectedSort]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDiscipline, selectedSoftware, selectedLevel, selectedSort]);

  // Paginated Courses
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCourses.slice(start, start + itemsPerPage);
  }, [filteredCourses, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDiscipline('all');
    setSelectedSoftware('');
    setSelectedLevel('');
    setSelectedSort('trending');
    setCurrentPage(1);
  };

  const handleEnrollCourse = (course: Course) => {
    alert(`🎉 Enrolling in "${course.title}" for $${course.price}!`);
  };

  const handleEnrollSpotlight = () => {
    alert(`⚡ Enrolling in Featured Cohort: "${featuredCourseData.title}"!`);
  };

  const handlePreviewSpotlight = () => {
    alert(`📺 Opening Syllabus Preview for "${featuredCourseData.title}"!`);
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

      {/* 3. Footer Organism */}
      <RevealOnScroll variant="fade-up" duration={600}>
        <Footer />
      </RevealOnScroll>
    </div>
  );
};

export default CoursePage;
