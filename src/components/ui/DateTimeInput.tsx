import React, { InputHTMLAttributes } from 'react';

interface DateTimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  helpText?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  label,
  id,
  error,
  helpText,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="datetime-local"
        className={`w-full px-3 py-2 border ${
          error ? 'border-red-300' : 'border-gray-300'
        } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
        {...props}
      />
      {helpText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
};

export default DateTimeInput;