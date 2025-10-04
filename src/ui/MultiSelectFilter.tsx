import React from 'react';

interface MultiSelectOption {
  value: string;
  label: string;
  color?: string;
  bgColor?: string;
  textColor?: string;
  dotColor?: string;
}

interface MultiSelectFilterProps {
  label: string;
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  label,
  options,
  selectedValues,
  onChange,
}) => {
  const handleToggle = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const defaultClasses = 'px-3 py-2 rounded-lg text-sm font-medium transition-colors';
          const selectedClasses = option.bgColor && option.textColor && option.color
            ? `${option.bgColor} ${option.textColor} border ${option.color}`
            : option.color
              ? `${option.color} text-white` // Fallback for priority where color is full class
              : 'bg-blue-100 text-blue-800 border border-blue-200'; // Default selected style
          const unselectedClasses = 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200';

          return (
            <button
              key={option.value}
              onClick={() => handleToggle(option.value)}
              className={`${defaultClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
            >
              {option.dotColor && isSelected && (
                <span className={`w-2 h-2 rounded-full ${option.dotColor} mr-2`}></span>
              )}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelectFilter;
