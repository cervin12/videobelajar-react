import React from 'react';
import type { Course, ViewMode } from '../../types/course';
import { CourseCard } from './CourseCard';
import { ViewToggle } from '../molecules/ViewToggle';
import { Pagination } from '../molecules/Pagination';
import { Icon } from '../atoms/Icon';
import { RevealOnScroll } from '../atoms/RevealOnScroll';

export interface CourseCatalogProps {
  courses: Course[];
  totalCoursesCount: number;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onEnrollCourse?: (course: Course) => void;
  onResetFilters?: () => void;
  className?: string;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  courses,
  totalCoursesCount,
  viewMode,
  onViewChange,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onEnrollCourse,
  onResetFilters,
  className = '',
}) => {
  const isGrid = viewMode === 'grid';

  return (
    <div className={`w-full ${className}`}>
      {/* Section Header & Active Result Stats */}
      <RevealOnScroll variant="fade-up" duration={500}>
        <div className="flex flex-wrap items-center justify-between gap-space-md mb-space-md">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-2xl sm:text-3xl text-background-dark dark:text-white">
                Core Masterclass Catalog
              </h3>
              <span className="px-2 py-0.5 text-xs font-black bg-[#FDE047] text-background-dark rounded border-2 border-background-dark rotate-2">
                POPULAR
              </span>
            </div>
            <p className="font-bold text-sm text-slate-600 dark:text-slate-400">
              {totalCoursesCount} active studio courses vetted for real-world creative technology jobs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-black text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-[#182235] text-background-dark dark:text-white neo-border">
              Showing {courses.length > 0 ? 1 : 0}–{courses.length} of {totalCoursesCount}
            </span>
            <ViewToggle viewMode={viewMode} onViewChange={onViewChange} />
          </div>
        </div>
      </RevealOnScroll>

      {/* Course Grid / List */}
      {courses.length > 0 ? (
        <div
          className={
            isGrid
               ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md md:gap-space-lg mb-space-xl'
              : 'flex flex-col gap-space-md mb-space-xl'
          }
        >
          {courses.map((course, idx) => (
            <RevealOnScroll
              key={course.id}
              variant="fade-up"
              delay={(idx % 4) * 80}
              duration={550}
            >
              <CourseCard
                course={course}
                viewMode={viewMode}
                onEnroll={onEnrollCourse}
              />
            </RevealOnScroll>
          ))}
        </div>
      ) : (
        <div className="p-space-xl my-space-lg bg-white dark:bg-[#111726] neo-border-3 rounded-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#FEF08A] text-background-dark border-2 border-background-dark flex items-center justify-center">
            <Icon name="search_off" size="2xl" />
          </div>
          <h4 className="font-black text-xl text-background-dark dark:text-white mb-2">
            No courses found matching your criteria
          </h4>
          <p className="font-bold text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-4">
            Try adjusting your search query, selecting "All Courses", or clearing your filters.
          </p>
          {onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="px-4 py-2 bg-[#A3E635] text-background-dark font-black text-xs uppercase rounded-xl border-2 border-background-dark hover:-translate-y-0.5 transition-transform cursor-pointer"
            >
              Reset All Filters ⚡
            </button>
          )}
        </div>
      )}

      {/* Pagination Dock */}
      {courses.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCoursesCount}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};
