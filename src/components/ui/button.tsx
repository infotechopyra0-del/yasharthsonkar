import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-paragraph font-medium transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      default: 'bg-[#000000] text-[#FFFFFF] hover:bg-[#000000]/90',
      outline: 'border border-[#000000] text-[#000000] hover:bg-[#D9D2C9]',
      ghost: 'text-[#000000] hover:bg-[#D9D2C9]',
    };
    
    const sizes = {
      default: 'px-6 py-3',
      sm: 'px-4 py-2 text-sm',
      lg: 'px-8 py-4 text-lg',
    };
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';


