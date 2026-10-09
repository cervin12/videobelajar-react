import React from 'react';
import type { FeaturedCourse } from '../../types/course';
import { InstructorTag } from '../molecules/InstructorTag';
import { Rating } from '../atoms/Rating';
import { Icon } from '../atoms/Icon';

export interface FeaturedSpotlightProps {
  course: FeaturedCourse;
  onEnroll?: () => void;
  onPreview?: () => void;
  className?: string;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  course,
  onEnroll,
  onPreview,
  className = '',
}) => {
  return (
    <div
      className={`mb-space-xl p-space-md md:p-space-lg bg-[#FEF9C3] dark:bg-[#111726] neo-border-3 rounded-2xl relative overflow-hidden transition-all ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
        {/* Spotlight Media with Neo Frame */}
        <div className="lg:col-span-6 relative rounded-xl overflow-hidden neo-border-3 group bg-black">
          <img
            className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            src={course.imageUrl}
            alt={course.imageAlt}
          />
          {/* Top floating badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-lg bg-pop-pink text-white font-black text-xs uppercase tracking-wide border-2 border-background-dark -rotate-2">
              ★ STAFF PICK OF THE WEEK
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#A3E635] text-background-dark font-black text-xs uppercase border-2 border-background-dark">
              NEW COHORT
            </span>
          </div>

          {/* Bottom duration badge */}
          <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-background-dark text-white font-black text-xs flex items-center gap-1.5 border-2 border-white">
            <Icon name="schedule" size="sm" className="text-[#A3E635]" />
            <span>{course.cohortDuration}</span>
          </div>
        </div>

        {/* Spotlight Content */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-md bg-[#F472B6] text-background-dark font-black text-xs border-2 border-background-dark">
                🌸 {course.category}
              </span>
              <span className="flex items-center bg-white dark:bg-[#1E293B] px-2.5 py-0.5 rounded-md border-2 border-background-dark text-background-dark dark:text-white font-black text-xs">
                <Rating score={course.rating} totalReviews={course.reviewsCount} showReviews />
              </span>
            </div>

            {/* Title */}
            <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-background-dark dark:text-white tracking-tight mb-space-sm leading-tight">
              {course.title}
            </h2>

            {/* Description */}
            <p className="font-bold text-sm sm:text-base text-slate-700 dark:text-slate-300 mb-space-md">
              {course.description}
            </p>

            {/* Instructor and Tools */}
            <div className="flex flex-wrap items-center gap-space-sm mb-space-lg">
              <InstructorTag instructor={course.instructor} size="md" />
              <div className="flex items-center gap-1.5">
                {course.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-black text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#1E293B] text-background-dark dark:text-white border-2 border-background-dark"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Pricing & CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-space-md pt-3 border-t-2 border-dashed border-[#CBD5E1] dark:border-slate-700">
            <div className="flex flex-col">
              <span className="font-black text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                Cohort {course.cohortStarts}
              </span>
              <span className="font-black text-2xl text-background-dark dark:text-white">
                Included with Pro Pass{' '}
                <span className="font-bold text-sm text-slate-600 dark:text-slate-400">
                  or ${course.priceStandalone} standalone
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onPreview}
                className="px-4 py-3 rounded-xl bg-white dark:bg-[#1E293B] text-background-dark dark:text-white hover:bg-slate-100 dark:hover:bg-[#253248] font-black text-sm neo-border transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Icon name="play_arrow" size="md" />
                Syllabus Preview
              </button>
              <button
                type="button"
                onClick={onEnroll}
                className="px-6 py-3 rounded-xl bg-[#A3E635] text-background-dark hover:bg-primary-dark font-black text-sm neo-border hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Enroll in Cohort</span>
                <Icon name="arrow_forward" size="md" className="font-bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
