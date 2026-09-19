import React from 'react';

export interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  subtitle?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  icon,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="text-[#005b7f] text-2xl flex items-center justify-center">
            {icon}
          </span>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {children && <div className="flex items-center gap-2.5 shrink-0">{children}</div>}
    </div>
  );
};
