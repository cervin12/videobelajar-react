import React from 'react';
import type { ValuePromise } from '../../types/course';
import { Icon } from '../atoms/Icon';

export interface ValueCardProps {
  promise: ValuePromise;
  className?: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  promise,
  className = '',
}) => {
  return (
    <div
      className={`p-6 rounded-2xl ${promise.cardBg} text-background-dark neo-border-3 transform hover:-translate-y-1 transition-all ${className}`}
    >
      <div
        className={`w-12 h-12 rounded-xl ${promise.iconBg} text-white flex items-center justify-center mb-4 border-2 border-background-dark ${promise.rotateClass}`}
      >
        <Icon name={promise.icon} size="2xl" />
      </div>
      <div
        className={`inline-block px-2.5 py-0.5 rounded ${promise.badgeBg} text-white font-black text-[10px] uppercase mb-2`}
      >
        {promise.badge}
      </div>
      <h4 className="font-black text-xl text-background-dark mb-2">{promise.title}</h4>
      <p className="font-bold text-sm text-slate-800 leading-relaxed">
        {promise.description}
      </p>
    </div>
  );
};
