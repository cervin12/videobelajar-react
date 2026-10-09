import React from 'react';
import type { Course, ViewMode } from '../../types/course';
import { Rating } from '../atoms/Rating';
import { InstructorTag } from '../molecules/InstructorTag';
import { PriceTag } from '../molecules/PriceTag';

export interface CourseCardProps {
  course: Course;
  viewMode?: ViewMode;
  onEnroll?: (course: Course) => void;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  viewMode = 'grid',
  onEnroll,
  className = '',
}) => {
  const isList = viewMode === 'list';

  if (isList) {
    return (
      <div
        className={`flex flex-col md:flex-row bg-white dark:bg-[#111726] neo-border-3 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all group ${className}`}
        style={{
          ['--accent-color' as string]: course.accentColor,
        }}
      >
        {/* Left media block */}
        <div className="relative md:w-72 h-48 md:h-auto overflow-hidden bg-slate-100 dark:bg-[#182235] shrink-0 border-b-2 md:border-b-0 md:border-r-2 border-background-dark">
          <div
            className="absolute top-0 left-0 right-0 h-2 md:hidden"
            style={{ backgroundColor: course.accentColor }}
          />
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={course.imageUrl}
            alt={course.imageAlt}
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-white font-black text-xs uppercase border-2 border-background-dark -rotate-2"
            style={{ backgroundColor: course.accentColor }}
          >
            {course.disciplineIcon && `${course.disciplineIcon} `}
            {course.disciplineLabel}
          </span>
          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-background-dark text-white font-black text-xs border border-white">
            {course.duration}
          </span>
        </div>

        {/* Right info block */}
        <div className="flex flex-col justify-between p-space-md flex-1">
          <div>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-2">
              <span
                className="font-bold text-xs uppercase px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: course.tagBgColor,
                  color: course.tagTextColor,
                  borderColor: course.tagBorderColor,
                }}
              >
                {course.softwareTag}
              </span>
              <Rating score={course.rating} />
            </div>

            <h4 className="font-black text-xl text-background-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
              {course.title}
            </h4>

            <InstructorTag instructor={course.instructor} className="mb-4" />
          </div>

          <PriceTag
            price={course.price}
            onEnroll={() => onEnroll?.(course)}
            className="w-full max-w-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-between bg-white dark:bg-[#111726] neo-border-3 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all group ${className}`}
    >
      <div>
        {/* Top accent color bar */}
        <div
          className="h-3 w-full"
          style={{ backgroundColor: course.accentColor }}
        />

        {/* Thumbnail media */}
        <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-[#182235] border-b-2 border-background-dark">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            src={course.imageUrl}
            alt={course.imageAlt}
          />
          <span
            className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-white font-black text-xs uppercase border-2 border-background-dark -rotate-2"
            style={{ backgroundColor: course.accentColor }}
          >
            {course.disciplineIcon && `${course.disciplineIcon} `}
            {course.disciplineLabel}
          </span>
          <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-background-dark text-white font-black text-xs border border-white">
            {course.duration}
          </span>
        </div>

        {/* Content */}
        <div className="p-space-md">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1.5">
            <span
              className="font-bold text-xs uppercase px-2 py-0.5 rounded border"
              style={{
                backgroundColor: course.tagBgColor,
                color: course.tagTextColor,
                borderColor: course.tagBorderColor,
              }}
            >
              {course.softwareTag}
            </span>
            <Rating score={course.rating} />
          </div>

          <h4 className="font-black text-lg text-background-dark dark:text-white line-clamp-2 mb-2 group-hover:opacity-85 transition-opacity">
            {course.title}
          </h4>

          <InstructorTag instructor={course.instructor} className="mb-space-md" />
        </div>
      </div>

      {/* Bottom price tag & action */}
      <div className="p-space-md pt-0">
        <PriceTag
          price={course.price}
          onEnroll={() => onEnroll?.(course)}
        />
      </div>
    </div>
  );
};
