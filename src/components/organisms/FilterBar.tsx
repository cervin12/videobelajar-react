import React from 'react';
import type { Discipline, DisciplineId, SortOption } from '../../types/course';
import { SearchBar } from '../molecules/SearchBar';
import { Select } from '../atoms/Select';
import { DisciplinePill } from '../molecules/DisciplinePill';
import { softwareOptions, levelOptions, sortOptions } from '../../data/coursesData';

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSoftware: string;
  onSoftwareChange: (software: string) => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedDiscipline: DisciplineId;
  onDisciplineChange: (discipline: DisciplineId) => void;
  disciplines: Discipline[];
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSoftware,
  onSoftwareChange,
  selectedLevel,
  onLevelChange,
  selectedSort,
  onSortChange,
  selectedDiscipline,
  onDisciplineChange,
  disciplines,
  className = '',
}) => {
  return (
    <div
      className={`p-space-md md:p-space-lg bg-[#FFFDF8] dark:bg-[#111726] neo-border-3 rounded-2xl mb-space-lg transition-colors ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
        {/* Search Input */}
        <div className="md:col-span-5">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search by concept, style, or mentor..."
            showKbd={false}
          />
        </div>

        {/* Software Dropdown */}
        <div className="md:col-span-3">
          <Select
            value={selectedSoftware}
            onChange={(e) => onSoftwareChange(e.target.value)}
            options={softwareOptions}
          />
        </div>

        {/* Experience Level Dropdown */}
        <div className="md:col-span-2">
          <Select
            value={selectedLevel}
            onChange={(e) => onLevelChange(e.target.value)}
            options={levelOptions}
          />
        </div>

        {/* Sort by Dropdown */}
        <div className="md:col-span-2">
          <Select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            options={sortOptions}
            iconName="swap_vert"
          />
        </div>
      </div>

      {/* Discipline Filter Pills - Fun Sticker Palette */}
      <div className="mt-space-md pt-space-md border-t-2 border-dashed border-[#CBD5E1] dark:border-slate-700 flex flex-wrap gap-2.5 items-center">
        <span className="font-black text-xs text-background-dark dark:text-slate-300 uppercase tracking-wider mr-1">
          Discipline:
        </span>
        {disciplines.map((discipline) => (
          <DisciplinePill
            key={discipline.id}
            discipline={discipline}
            isActive={selectedDiscipline === discipline.id}
            onClick={onDisciplineChange}
          />
        ))}
      </div>
    </div>
  );
};
