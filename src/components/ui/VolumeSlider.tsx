import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface VolumeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  onChange,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? 50);
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const handleValueChange = (newValue: number) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleValueChange(Number(event.target.value));
  };
  
  const getGradient = () => {
    const blue = [59, 130, 246];
    const red = [239, 68, 68];
    const r = blue[0] + (red[0] - blue[0]) * (percentage / 100);
    const g = blue[1] + (red[1] - blue[1]) * (percentage / 100);
    const b = blue[2] + (red[2] - blue[2]) * (percentage / 100);
    const color = `rgb(${r}, ${g}, ${b})`;

    return `linear-gradient(90deg, ${color} ${percentage}%, #4A5568 ${percentage}%)`;
  };

  return (
    <div
      className={cn('relative w-full flex items-center group', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute left-[-40px] w-[35px] text-center text-xs text-gray-500">
        {Math.round(value)}%
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        ref={sliderRef}
        onChange={handleInputChange}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        className="w-full h-2 appearance-none cursor-pointer"
        style={{
          background: getGradient(),
          borderRadius: '9999px',
          transition: 'all 0.2s ease-in-out',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
    </div>
  );
};

export default VolumeSlider; 