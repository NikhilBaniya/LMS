import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'form-card' | 'white' | 'table-card' | 'stats';
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'form-card',
  title,
  subtitle,
  headerAction,
  className = '',
  ...props
}) => {
  const variantStyles = {
    // Reference forms & table wrapper card style
    'form-card': 'bg-[#eaedf0] border border-gray-200/70 shadow-sm rounded-2xl p-4 sm:p-6 sm:px-8',
    'table-card': 'bg-[#eaedf0] border border-gray-200/70 shadow-sm rounded-2xl p-4 sm:p-6',
    white: 'bg-white border border-gray-200 shadow-sm rounded-2xl p-4 sm:p-6',
    stats: 'bg-white border border-gray-100 shadow-sm rounded-2xl p-5 hover:shadow-md transition-shadow',
  };

  return (
    <div className={`${variantStyles[variant]} ${className}`} {...props}>
      {(title || headerAction) && (
        <div className="flex items-center justify-between mb-4 pb-2">
          <div>
            {title && <h3 className="text-base sm:text-lg font-bold text-gray-800 tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
