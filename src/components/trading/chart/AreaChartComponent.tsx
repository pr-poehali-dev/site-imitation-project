
import React from 'react';
import {
  CartesianGrid,
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import { ChartDataPoint } from './types';
import { formatDateForTimeframe } from './ChartUtils';

interface AreaChartComponentProps {
  data: ChartDataPoint[];
  symbol: string;
  timeframe: string;
}

const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data, symbol, timeframe }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#33333320" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => formatDateForTimeframe(value, timeframe)}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="value" 
          name={symbol}
          stroke="#8B5CF6" 
          fillOpacity={1} 
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
