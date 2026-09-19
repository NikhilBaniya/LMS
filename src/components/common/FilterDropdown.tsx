import React from 'react';
import { Filter } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterDropdownProps {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <div className="absolute left-3 text-gray-500 pointer-events-none flex items-center">
        <Filter className="w-3.5 h-3.5" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-300 rounded-xl pl-8 pr-8 py-2 text-sm text-gray-700 font-medium focus:outline-none focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 cursor-pointer"
        aria-label={label}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 pointer-events-none text-gray-400 text-xs">▼</div>
    </div>
  );
};
