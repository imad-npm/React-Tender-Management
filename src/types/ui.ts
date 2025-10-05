
import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface NativeSelectProps {
  label?: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  width?: string;
}

export interface DatePickerProps {
  label?: string;
  value: string; // ISO YYYY-MM-DD or empty string
  onChange: (value: string) => void;
  placeholder?: string;
}
