
// Тип данных для точек графика
export interface ChartDataPoint {
  date: string;
  value: number;
  volume: number;
}

// Тип данных для таймфрейма
export type TimeframeOption = '1h' | '1d' | '1w' | '1m';

// Тип данных для типа графика
export type ChartType = 'line' | 'area';

// Тип данных для символа торговой пары
export type SymbolOption = 'BTC/USD' | 'ETH/USD' | 'LTC/USD' | 'XRP/USD';
