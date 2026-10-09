import React from 'react';
import type { Instructor } from '../../types/course';
import { Avatar } from '../atoms/Avatar';
import { Icon } from '../atoms/Icon';

export interface InstructorTagProps {
  instructor: Instructor;
  size?: 'sm' | 'md';
  className?: string;
}

export const InstructorTag: React.FC<InstructorTagProps> = ({
  instructor,
  size = 'sm',
  className = '',
}) => {
  if (size === 'md') {
    return (
      <div
        className={`flex items-center gap-2.5 pr-3 bg-white dark:bg-[#1E293B] p-2 rounded-xl border-2 border-background-dark ${className}`}
      >
        <Avatar src={instructor.avatar} alt={instructor.name} size="lg" shadow={false} />
        <div>
          <div className="flex items-center gap-1">
            <p className="font-black text-sm text-background-dark dark:text-white leading-tight">
              {instructor.name}
            </p>
            {instructor.verified && (
              <Icon name="verified" filled size="xs" className="text-[#38BDF8]" />
            )}
          </div>
          <p className="font-bold text-xs text-slate-600 dark:text-slate-400">
            {instructor.title}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar src={instructor.avatar} alt={instructor.name} size="sm" shadow={false} />
      <span className="font-bold text-xs text-slate-700 dark:text-slate-300 truncate">
        {instructor.name} • {instructor.title}
      </span>
    </div>
  );
};
