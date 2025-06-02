
import React from 'react';
import { ChevronDownIcon } from './Icons.tsx';


interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  containerClassName?: string;
}

export const Select: React.FC<SelectProps> = ({ label, id, options, containerClassName = '', className = '', ...props }) => {
  // Base classes are minimal, AddPropertyForm's fieldStyling will provide detailed styles
  const baseSelectClasses = "appearance-none pr-10 transition-all duration-150 ease-in-out"; 
  
  return (
    <div className={containerClassName}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <div className="relative">
        <select
          id={id}
          className={`${className} ${baseSelectClasses}`} // className from props is prioritized
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDownIcon className="h-5 w-5"/>
        </div>
      </div>
    </div>
  );
};