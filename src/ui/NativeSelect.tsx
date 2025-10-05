import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { NativeSelectProps } from '../types/ui';

const NativeSelect: React.FC<NativeSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  icon: Icon,
  width = 'w-full',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`${width} flex flex-col gap-1.5 relative`}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`relative flex items-center justify-between rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 
          px-4 py-2.5 text-sm text-gray-800 dark:text-gray-100 shadow-sm transition-all duration-200 
          hover:shadow-md hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900
          ${Icon ? 'pl-10' : ''}`}
      >
        {/* Left icon */}
        {Icon && (
          <Icon className="absolute left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200 w-5 h-5" />
        )}

        {/* Selected text */}
        <span
          className={`truncate ${
            !selected ? 'text-gray-500' : 'text-gray-800 dark:text-gray-100'
          }`}
        >
          {selected ? selected.label : placeholder}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={`ml-2 h-5 w-5 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180 text-blue-500' : ''
          }`}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div
          className="absolute top-16 z-20 mt-2 w-full rounded-xl border border-gray-100 dark:border-gray-700 
          bg-white dark:bg-gray-900 shadow-lg overflow-y-scroll max-h-48 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between transition-colors duration-150 ${
                opt.value === value
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'
              }`}
            >
              {opt.label}
              {opt.value === value && (
                <Check className="w-4 h-4 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NativeSelect;
