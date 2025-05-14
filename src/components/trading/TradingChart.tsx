
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Legend,
} from 'recharts';

// Функция для генерации фейковых данных графика с тенденцией к росту
const generateChartData = (days: number, isUptrend: boolean = true) => {
  const data = [];
  let lastValue = 100;
  
  for (let i = 0; i < days; i++) {
    // Определяем склонность к росту или падению, но с общей тенденцией вверх
    const trend = isUptrend ? 0.6 : 0.4;
    
    // Генерируем случайное изменение с склонностью к росту
    const changePercent = Math.random() > trend ? 
      -Math.random() * 4 : // Падение
      Math.random() * 5;   // Рост (чуть больше потенциал роста)
    
    lastValue = lastValue * (1 + changePercent / 100);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU'),
      value: parseFloat(lastValue.toFixed(2)),
      volume: Math.floor(Math.random() * 10000 + 1000),
    });
  }
  
  return data;
};

const TradingChart = () => {
  const [timeframe, setTimeframe] = useState('1d');
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState('line');
  const [symbol, setSymbol] = useState('BTC/USD');
  
  useEffect(() => {
    // Генерируем разное количество точек данных в зависимости от выбранного таймфрейма
    let days;
    switch (timeframe) {
      case '1h': days = 60; break; // 60 минут
      case '1d': days = 24; break; // 24 часа
      case '1w': days = 7; break;  // 7 дней
      case '1m': days = 30; break; // 30 дней
      default: days = 24;
    }
    
    // Для BTC/USD и ETH/USD делаем в основном растущий тренд
    const isUptrend = symbol === 'BTC/USD' || symbol === 'ETH/USD';
    
    setChartData(generateChartData(days, isUptrend));
  }, [timeframe, symbol]);

  return (
    <Card className="mt-6">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon name="LineChart" className="text-primary" />
            График торгов
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={symbol} onValueChange={setSymbol}>
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
            
            <Tabs value={chartType} onValueChange={setChartType} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="line">Линейный</TabsTrigger>
                <TabsTrigger value="area">Область</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between mb-4">
          <div className="text-2xl font-bold">
            {symbol.split('/')[0]} <span className="text-green-500">+2.4%</span>
          </div>
          <div className="flex gap-1">
            <Button 
              variant={timeframe === '1h' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeframe('1h')}
            >
              1Ч
            </Button>
            <Button 
              variant={timeframe === '1d' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeframe('1d')}
            >
              1Д
            </Button>
            <Button 
              variant={timeframe === '1w' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeframe('1w')}
            >
              1Н
            </Button>
            <Button 
              variant={timeframe === '1m' ? 'default' : 'outline'} 
              size="sm" 
              onClick={() => setTimeframe('1m')}
            >
              1М
            </Button>
          </div>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#33333320" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => {
                    // Сокращаем формат даты для таймфрейма
                    if (timeframe === '1h') return value.split(' ')[1]; // Только время
                    return value;
                  }}
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
            ) : (
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#33333320" />
                <XAxis dataKey="date" />
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
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-between">
          <Button className="bg-green-600 hover:bg-green-700 gap-2">
            <Icon name="ArrowUpRight" />
            Купить {symbol.split('/')[0]}
          </Button>
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 gap-2">
            <Icon name="ArrowDownRight" />
            Продать {symbol.split('/')[0]}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingChart;
