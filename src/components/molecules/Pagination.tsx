import React from 'react';
import { Icon } from '../atoms/Icon';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = '',
}) => {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-space-md p-space-md bg-white dark:bg-[#111726] neo-border-3 rounded-2xl transition-colors ${className}`}
    >
      <span className="font-bold text-sm text-slate-600 dark:text-slate-300">
        Showing{' '}
        <span className="font-black text-background-dark dark:text-white">
          {startItem}–{endItem}
        </span>{' '}
        of{' '}
        <span className="font-black text-background-dark dark:text-white">
          {totalItems}
        </span>{' '}
        courses
      </span>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPage <= 1
              ? 'bg-slate-100 dark:bg-[#182235] text-slate-400 dark:text-slate-600 cursor-not-allowed border-2 border-slate-300 dark:border-slate-700'
              : 'bg-white dark:bg-[#182235] hover:bg-[#A3E635] text-background-dark dark:text-slate-200 border-2 border-background-dark cursor-pointer'
          }`}
        >
          <Icon name="chevron_left" size="lg" className="font-bold" />
        </button>

        {/* Page numbers */}
        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl font-black text-sm border-2 border-background-dark transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#FDE047] text-background-dark'
                  : 'bg-white dark:bg-[#182235] hover:bg-[#A3E635] text-background-dark dark:text-slate-200'
              }`}
            >
              {page}
            </button>
          )
        )}

        {totalPages > 4 && (
          <span className="px-1 text-slate-500 font-black text-sm">...</span>
        )}

        {totalPages > 3 && (
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 rounded-xl font-black text-sm border-2 border-background-dark transition-all cursor-pointer ${
              currentPage === totalPages
                ? 'bg-[#FDE047] text-background-dark'
                : 'bg-white dark:bg-[#182235] hover:bg-[#A3E635] text-background-dark dark:text-slate-200'
            }`}
          >
            {totalPages}
          </button>
        )}

        {/* Next Button */}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            currentPage >= totalPages
              ? 'bg-slate-100 dark:bg-[#182235] text-slate-400 dark:text-slate-600 cursor-not-allowed border-2 border-slate-300 dark:border-slate-700'
              : 'bg-[#A3E635] text-background-dark font-black border-2 border-background-dark hover:translate-x-0.5 cursor-pointer'
          }`}
        >
          <Icon name="chevron_right" size="lg" className="font-bold" />
        </button>
      </div>
    </div>
  );
};
