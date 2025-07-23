import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SegmentedControlProps<T extends string> {
  options: { label: string; value: T }[];
  value: T;
  onChange: (value: T) => void;
}

const SegmentedControl = <T extends string>({ options, value, onChange }: SegmentedControlProps<T>) => {
  return (
    <div className="flex w-full p-1 bg-white/5 rounded-lg">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative flex-1 px-2 py-1 text-sm font-medium text-white/70 transition-colors duration-300 rounded-md focus:outline-none',
            { 'text-white': value === option.value }
          )}
        >
          {value === option.value && (
            <motion.div
              layoutId="segmented-control-active-bg"
              className="absolute inset-0 bg-white/20 rounded-md"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl; 