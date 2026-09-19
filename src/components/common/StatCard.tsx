import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  isPositive?: boolean;
  color?: string;
  bgIconColor?: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  isPositive = true,
  color = 'text-[#005b7f]',
  bgIconColor = 'bg-[#005b7f]/10',
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-all flex items-start justify-between">
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</p>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
        {(change || subtitle) && (
          <div className="flex items-center gap-1.5 text-xs pt-0.5">
            {change && (
              <span
                className={`font-semibold ${
                  isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {change}
              </span>
            )}
            {subtitle && <span className="text-gray-400">{subtitle}</span>}
          </div>
        )}
      </div>
      <div className={`p-3 rounded-xl ${bgIconColor} ${color} shrink-0`}>
        <Icon size={22} />
      </div>
    </div>
  );
};
