import React from 'react';

export interface BrandLogoProps {
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
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
  const badgeSize = isSm ? 'w-9 h-9' : 'w-11 h-11';
  const badgeText = isSm ? 'text-xl' : 'text-2xl';
  const titleText = isSm ? 'text-xl' : 'text-2xl';

  const content = (
    <div className="flex items-center gap-2 group cursor-pointer select-none">
      <div
        className={`${badgeSize} bg-primary rounded-xl custom-doodle-border shadow-pop flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform shrink-0`}
      >
        <span className={`${badgeText} font-black font-doodle text-neutral-900 leading-none`}>
          S!
        </span>
      </div>
      <div className="flex flex-col text-left">
        <span
          className={`font-doodle ${titleText} font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-0.5 leading-tight`}
        >
          Skill<span className="text-pop-purple dark:text-pop-lime">Pop.</span>
        </span>
        {showSubtitle && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 dark:text-neutral-400 -mt-0.5">
            Play • Learn • Ship
          </span>
        )}
      </div>
    </div>
  );

  const containerClasses = `inline-flex items-center ${className}`.trim();

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

export default BrandLogo;
