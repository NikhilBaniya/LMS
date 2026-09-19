import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-9 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 text-gray-400 hover:text-gray-600 p-0.5 rounded-full cursor-pointer"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
