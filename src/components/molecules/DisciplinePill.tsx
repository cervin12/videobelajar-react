import React from 'react';
import type { Discipline } from '../../types/course';

export interface DisciplinePillProps {
  discipline: Discipline;
  isActive: boolean;
  onClick: (id: Discipline['id']) => void;
  className?: string;
}

export const DisciplinePill: React.FC<DisciplinePillProps> = ({
  discipline,
  isActive,
  onClick,
  className = '',
}) => {
  const activeClass =
    'bg-[#A3E635] text-background-dark neo-border hover:-translate-y-0.5 font-black';
  const inactiveClass = `bg-white dark:bg-[#182235] text-background-dark dark:text-slate-200 neo-border ${
    discipline.hoverColor || 'hover:bg-[#FDE047]'
  } hover:text-background-dark font-bold`;

  return (
    <button
      type="button"
      onClick={() => onClick(discipline.id)}
      className={`discipline-pill px-3.5 py-1.5 rounded-xl text-xs uppercase cursor-pointer select-none transition-all ${
        isActive ? activeClass : inactiveClass
      } ${className}`}
    >
      {discipline.icon && <span className="mr-1">{discipline.icon}</span>}
      {discipline.label} ({discipline.count})
    </button>
  );
};
