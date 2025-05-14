
import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartDataPoint } from './types';
import { formatDateForTimeframe } from './ChartUtils';

interface LineChartComponentProps {
  data: ChartDataPoint[];
  symbol: string;
  timeframe: string;
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data, symbol, timeframe }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#33333320" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(value) => formatDateForTimeframe(value, timeframe)}
        />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          name={symbol}
          stroke="#8B5CF6" 
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
