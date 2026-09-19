import React from 'react';

export interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  color = 'bg-[#005b7f]',
  showPercentage = true,
}) => {
  const percentage = Math.min(100, Math.round((value / (max || 1)) * 100));

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
          {label && <span>{label}</span>}
          {showPercentage && <span>{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
