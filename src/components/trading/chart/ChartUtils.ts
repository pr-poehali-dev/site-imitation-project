
import { ChartDataPoint } from './types';

/**
 * Функция для генерации фейковых данных графика с тенденцией к росту
 * @param days количество точек данных
 * @param isUptrend определяет общую тенденцию (рост/падение)
 */
export const generateChartData = (days: number, isUptrend: boolean = true): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
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

/**
 * Определяет количество дней для графика на основе выбранного таймфрейма
 */
export const getDaysForTimeframe = (timeframe: string): number => {
  switch (timeframe) {
    case '1h': return 60; // 60 минут
    case '1d': return 24; // 24 часа
    case '1w': return 7;  // 7 дней
    case '1m': return 30; // 30 дней
    default: return 24;
  }
};

/**
 * Форматирует дату в зависимости от таймфрейма
 */
export const formatDateForTimeframe = (value: string, timeframe: string): string => {
  // Сокращаем формат даты для часового таймфрейма
  if (timeframe === '1h') {
    const parts = value.split(' ');
    if (parts.length > 1) return parts[1]; // Возвращаем только время
  }
  return value;
};
