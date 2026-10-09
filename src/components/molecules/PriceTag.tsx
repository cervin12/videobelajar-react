import React from 'react';
import { Button } from '../atoms/Button';

export interface PriceTagProps {
  price: number;
  onEnroll?: () => void;
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  onEnroll,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center justify-between bg-[#F8FAFC] dark:bg-[#182235] p-3 rounded-xl border-2 border-background-dark ${className}`}
    >
      <div>
        <p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">
          Single Purchase
        </p>
        <p className="font-black text-lg text-background-dark dark:text-white">
          ${price}{' '}
          <span className="text-xs font-bold text-slate-500">/ Pro Pass</span>
        </p>
      </div>
      <Button
        variant="primary"
        size="sm"
        onClick={onEnroll}
        className="px-4 py-2 text-xs uppercase"
      >
        Enroll ⚡
      </Button>
    </div>
  );
};
