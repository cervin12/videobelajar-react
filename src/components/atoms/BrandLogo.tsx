import React from 'react';

export interface BrandLogoProps {
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  className?: string;
  size?: 'sm' | 'md';
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  onClick,
  href,
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const isSm = size === 'sm';

  const badgeBoxClass = isSm
    ? 'w-10 h-10 rounded-xl'
    : 'w-11 h-11 rounded-xl';

  const badgeTextClass = isSm ? 'text-xl' : 'text-2xl';
  const titleTextClass = isSm ? 'text-xl' : 'text-2xl';
  const subtitleTextClass = isSm ? 'text-[9px] -mt-0.5' : 'text-[10px] -mt-1';

  const content = (
    <>
      {/* S! Icon Badge */}
      <div
        className={`${badgeBoxClass} bg-[#A3E635] custom-doodle-border shadow-pop flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform shrink-0`}
      >
        <span className={`${badgeTextClass} font-black font-doodle text-neutral-900 leading-none`}>
          S!
        </span>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col text-left">
        <span className={`font-doodle ${titleTextClass} font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-0.5 leading-none`}>
          Skill<span className="text-pop-purple dark:text-[#A3E635]">Pop.</span>
        </span>
        {showSubtitle && (
          <span className={`${subtitleTextClass} uppercase font-bold tracking-widest mt-0.5 text-neutral-500 dark:text-neutral-400`}>
            Play • Learn • Ship
          </span>
        )}
      </div>
    </>
  );

  const containerClasses = `flex items-center gap-2 group cursor-pointer select-none ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={containerClasses}>
        {content}
      </a>
    );
  }

  return (
    <div onClick={onClick} className={containerClasses}>
      {content}
    </div>
  );
};
