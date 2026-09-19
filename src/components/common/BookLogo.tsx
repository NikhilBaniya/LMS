import React from 'react';

export interface BookLogoProps {
  className?: string;
  variant?: 'black' | 'white' | 'teal';
  size?: number;
}

export const BookLogo: React.FC<BookLogoProps> = ({
  className = '',
  variant = 'black',
  size = 64,
}) => {
  const fillClass = {
    black: 'text-gray-900',
    white: 'text-white',
    teal: 'text-[#005b7f]',
  }[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="currentColor"
      className={`${fillClass} ${className} transition-transform`}
    >
      {/* Stylized open book matching the exact reference logo in Image 2 */}
      <path
        d="M 50,70 Q 30,55 5,58 L 15,20 Q 32,25 50,42 Q 68,25 85,20 L 95,58 Q 70,55 50,70 Z"
        opacity="0.9"
      />
      <path
        d="M 50,65 Q 32,48 10,48 L 18,15 Q 35,20 50,36 Q 65,20 82,15 L 90,48 Q 68,48 50,65 Z"
        opacity="0.8"
      />
      <path
        d="M 50,58 Q 35,38 18,36 L 24,10 Q 38,15 50,28 Q 62,15 76,10 L 82,36 Q 65,38 50,58 Z"
        opacity="0.7"
      />
      <path
        d="M 50,74 L 50,28"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};
