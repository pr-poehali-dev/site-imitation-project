
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartType, SymbolOption } from './types';

interface ChartControlsProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  symbol: SymbolOption;
  onSymbolChange: (symbol: SymbolOption) => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({
  chartType,
  onChartTypeChange,
  symbol,
  onSymbolChange
}) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={symbol} onValueChange={(value) => onSymbolChange(value as SymbolOption)}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder={symbol} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BTC/USD">BTC/USD</SelectItem>
          <SelectItem value="ETH/USD">ETH/USD</SelectItem>
          <SelectItem value="LTC/USD">LTC/USD</SelectItem>
          <SelectItem value="XRP/USD">XRP/USD</SelectItem>
        </SelectContent>
      </Select>
      
      <Tabs value={chartType} onValueChange={(value) => onChartTypeChange(value as ChartType)} className="w-[180px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="line">Линейный</TabsTrigger>
          <TabsTrigger value="area">Область</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default ChartControls;
