import React from 'react';
import { Icon } from './Icon';

export interface RatingProps {
  score: number;
  totalReviews?: number;
  className?: string;
  showReviews?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  score,
  totalReviews,
  className = '',
  showReviews = false,
}) => {
  return (
    <span className={`inline-flex items-center font-black text-xs text-background-dark dark:text-white ${className}`}>
      <Icon
        name="star"
        filled
        size="sm"
        className="text-[#EAB308] mr-0.5"
      />
      <span>{score.toFixed(score % 1 === 0 ? 1 : 2)}</span>
      {showReviews && totalReviews && (
        <span className="text-slate-500 dark:text-slate-400 font-bold ml-1">
          ({totalReviews.toLocaleString()} verified reviews)
        </span>
      )}
    </span>
  );
};
