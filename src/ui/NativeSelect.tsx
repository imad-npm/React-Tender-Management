import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface NativeSelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const NativeSelect: React.FC<NativeSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {/* Left Icon */}
        {Icon && (
          <Icon className="absolute left-3 text-gray-400 w-5 h-5 pointer-events-none" />
        )}

        {/* Select */}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`appearance-none w-full pr-10 py-2.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${Icon ? 'pl-10' : 'pl-3'}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <ChevronDown className="absolute right-3 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
};

export default NativeSelect;
