import React from 'react';
import type { ViewMode } from '../../types/course';
import { Icon } from '../atoms/Icon';

export interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  className?: string;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewChange,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center bg-white dark:bg-[#131A2A] rounded-xl p-1 neo-border ${className}`}
    >
      <button
        type="button"
        title="Grid View"
        onClick={() => onViewChange('grid')}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          viewMode === 'grid'
            ? 'bg-[#FDE047] text-background-dark border border-background-dark'
            : 'text-slate-500 hover:text-background-dark dark:hover:text-white'
        }`}
      >
        <Icon name="grid_view" size="lg" className="font-bold" />
      </button>
      <button
        type="button"
        title="List View"
        onClick={() => onViewChange('list')}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          viewMode === 'list'
            ? 'bg-[#FDE047] text-background-dark border border-background-dark'
            : 'text-slate-500 hover:text-background-dark dark:hover:text-white'
        }`}
      >
        <Icon name="view_list" size="lg" className="font-bold" />
      </button>
    </div>
  );
};
