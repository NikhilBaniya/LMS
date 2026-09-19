import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'filled' | 'outline' | 'pill';
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  variant = 'filled',
  className = '',
  id,
  ...props
}) => {
  const generatedId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const variantStyles = {
    // Reference forms style: soft grey container / fill with clean rounded corners
    filled: 'bg-[#dbe0e6] border-transparent text-gray-800 placeholder-gray-500 focus:bg-white focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 rounded-xl',
    // Outlined style for clean modals
    outline: 'bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 rounded-xl',
    // Pill style from login screen
    pill: 'bg-[#dbe0e6] border border-gray-300/80 text-gray-800 placeholder-gray-500 focus:bg-white focus:border-[#005b7f] focus:ring-2 focus:ring-[#005b7f]/20 rounded-full px-5',
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
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-gray-500 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          id={generatedId}
          className={`w-full py-2.5 px-3.5 text-sm transition-all duration-150 outline-none ${
            leftIcon ? 'pl-10' : ''
          } ${rightIcon ? 'pr-10' : ''} ${variantStyles[variant]} ${
            error ? '!border-red-500 !ring-red-200' : ''
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-gray-500 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
      {!error && helperText && <p className="text-xs text-gray-500">{helperText}</p>}
    </div>
  );
};
