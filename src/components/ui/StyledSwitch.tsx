import React from 'react';
import { cn } from '@/lib/utils';

interface StyledSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const StyledSwitch: React.FC<StyledSwitchProps> = ({ checked, onCheckedChange, className }) => {
  return (
    <div
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer',
        checked ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'bg-gray-700',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500',
        className
      )}
    >
      <div
        className={cn(
          'w-4 h-4 rounded-full bg-white shadow-lg transform transition-transform duration-300',
          checked ? 'translate-x-6' : 'translate-x-0'
        )}
      />
    </div>
  );
};

export default StyledSwitch; 