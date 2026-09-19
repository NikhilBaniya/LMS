import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  variant?: 'filled' | 'outline';
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  variant = 'filled',
  className = '',
  id,
  ...props
}) => {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const variantStyles = {
    filled: 'bg-[#dbe0e6] border-transparent text-gray-800 focus:bg-white focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 rounded-xl',
    outline: 'bg-white border border-gray-300 text-gray-800 focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 rounded-xl',
  };

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={generatedId}
          className="text-xs sm:text-sm font-semibold text-gray-700 select-none"
        >
          {label}
        </label>
      )}
      <select
        id={generatedId}
        className={`w-full py-2.5 px-3.5 text-sm transition-all duration-150 outline-none cursor-pointer ${
          variantStyles[variant]
        } ${error ? '!border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};
