
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  containerClassName?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, containerClassName = '', className = '', ...props }) => {
  // Base classes are minimal, AddPropertyForm's fieldStyling will provide detailed styles
  const baseTextareaClasses = "transition-all duration-150 ease-in-out";

  return (
    <div className={containerClassName}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>}
      <textarea
        id={id}
        className={`${className} ${baseTextareaClasses}`} // className from props is prioritized
        rows={4} 
        {...props}
      />
    </div>
  );
};