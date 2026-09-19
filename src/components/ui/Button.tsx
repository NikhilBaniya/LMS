import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'edit' | 'delete' | 'outline' | 'ghost' | 'light';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  children,
  icon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer';

  const variants = {
    // Exact deep teal matching reference screenshots
    primary: 'bg-[#005b7f] hover:bg-[#004d6b] active:bg-[#003e57] text-white shadow-sm focus:ring-[#005b7f]',
    // Light grey button (e.g. Sign Up in modal, Register on auth page)
    secondary: 'bg-[#d1d5db] hover:bg-[#c2c7ce] active:bg-[#b0b6be] text-gray-800 focus:ring-gray-400',
    // Edit olive/mustard yellow button from screenshot 3
    edit: 'bg-[#b29718] hover:bg-[#9e8615] active:bg-[#8a7512] text-white shadow-sm focus:ring-amber-500',
    // Delete red button from screenshot 3
    delete: 'bg-[#db2828] hover:bg-[#c52222] active:bg-[#aa1d1d] text-white shadow-sm focus:ring-red-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-[#005b7f]',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 focus:ring-[#005b7f]',
    light: 'bg-[#e5e7eb] hover:bg-[#d9dde2] text-gray-700 focus:ring-gray-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-7 py-3 rounded-xl gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
