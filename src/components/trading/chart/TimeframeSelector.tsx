
import React from 'react';
import { Button } from '@/components/ui/button';
import { TimeframeOption } from './types';

interface TimeframeSelectorProps {
  timeframe: TimeframeOption;
  onTimeframeChange: (timeframe: TimeframeOption) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ 
  timeframe, 
  onTimeframeChange 
}) => {
  const timeframeLabels: Record<TimeframeOption, string> = {
    '1h': '1Ч',
    '1d': '1Д',
    '1w': '1Н',
    '1m': '1М'
  };

  const timeframeOptions: TimeframeOption[] = ['1h', '1d', '1w', '1m'];

  return (
    <div className="flex gap-1">
      {timeframeOptions.map((option) => (
        <Button 
          key={option}
          variant={timeframe === option ? 'default' : 'outline'} 
          size="sm" 
          onClick={() => onTimeframeChange(option)}
        >
          {timeframeLabels[option]}
        </Button>
      ))}
    </div>
  );
};

export default TimeframeSelector;
