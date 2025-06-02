
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactElement<{ className?: string }>;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, icon, containerClassName = '', className = '', ...props }, ref) => {
    // Base classes are now very minimal, AddPropertyForm's fieldStyling will provide the detailed styles
    const baseInputClasses = "transition-all duration-150 ease-in-out"; // Only essential base for transition
    const iconPadding = icon ? "pl-10" : "";

    return (
      <div className={containerClassName}>
        {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
        <div className="relative"> {/* Removed shadow-sm from here as fieldStyling will handle it */}
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400"})}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`${className} ${iconPadding} ${baseInputClasses}`} // className from props is prioritized
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';
