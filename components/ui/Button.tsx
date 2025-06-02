
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  leftIcon,
  rightIcon,
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-all duration-200 ease-in-out inline-flex items-center justify-center transform hover:scale-[1.03] active:scale-[0.98] focus:ring-offset-2";
  
  let variantStyles = "";
  switch (variant) {
    case 'primary':
      variantStyles = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
      break;
    case 'secondary':
      variantStyles = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 border border-gray-300 hover:border-gray-400";
      break;
    case 'danger':
      variantStyles = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case 'ghost':
      variantStyles = "bg-transparent text-blue-600 hover:bg-blue-100/50 focus:ring-blue-500";
      break;
  }

  let sizeStyles = "";
  switch (size) {
    case 'sm':
      sizeStyles = "px-3 py-1.5 text-sm";
      break;
    case 'md':
      sizeStyles = "px-4 py-2 text-base";
      break;
    case 'lg':
      sizeStyles = "px-6 py-3 text-lg";
      break;
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}
      <span className="flex-grow text-center">{children}</span>
      {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};