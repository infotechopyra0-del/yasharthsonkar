import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block font-paragraph text-sm font-medium text-[#000000]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 bg-[#B7AEA3] border border-[#000000] text-[#000000] placeholder:text-[#000000]/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none ${className}`}
          rows={5}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500 font-paragraph">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';


