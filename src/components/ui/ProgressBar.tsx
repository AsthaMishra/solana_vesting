import React from 'react';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  showLabel = true,
  className = ''
}) => {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        {showLabel && (
          <div className="flex justify-between w-full">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-purple-600">{clampedProgress}%</span>
          </div>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="h-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 ease-in-out" 
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;