import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import {
  ChartDataPoint,
  TimeframeOption,
  ChartType,
  SymbolOption,
} from "./chart/types";
import { generateChartData, getDaysForTimeframe } from "./chart/ChartUtils";
import LineChartComponent from "./chart/LineChartComponent";
import AreaChartComponent from "./chart/AreaChartComponent";
import TimeframeSelector from "./chart/TimeframeSelector";
import ChartControls from "./chart/ChartControls";
import ChartActions from "./chart/ChartActions";

/**
 * Компонент для отображения графика торговли
 */
const TradingChart: React.FC = () => {
  // Состояния компонента
  const [timeframe, setTimeframe] = useState<TimeframeOption>("1d");
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartType, setChartType] = useState<ChartType>("line");
  const [symbol, setSymbol] = useState<SymbolOption>("BTC/USD");

  // Обработчики изменения состояний
  const handleTimeframeChange = (value: TimeframeOption) => setTimeframe(value);
  const handleChartTypeChange = (value: ChartType) => setChartType(value);
  const handleSymbolChange = (value: SymbolOption) => setSymbol(value);

  // Эффект для обновления данных графика при изменении таймфрейма или символа
  useEffect(() => {
    const days = getDaysForTimeframe(timeframe);

    // Для BTC/USD и ETH/USD делаем в основном растущий тренд
    const isUptrend = symbol === "BTC/USD" || symbol === "ETH/USD";

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

          {/* Элементы управления графиком */}
          <ChartControls
            chartType={chartType}
            onChartTypeChange={handleChartTypeChange}
            symbol={symbol}
            onSymbolChange={handleSymbolChange}
          />
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between mb-4">
          <div className="text-2xl font-bold">
            {symbol.split("/")[0]} <span className="text-green-500">+2.4%</span>
          </div>

          {/* Селектор таймфрейма */}
          <TimeframeSelector
            timeframe={timeframe}
            onTimeframeChange={handleTimeframeChange}
          />
        </div>

        {/* Контейнер для графика */}
        <div className="h-[400px] w-full">
          {chartType === "line" ? (
            <LineChartComponent
              data={chartData}
              symbol={symbol}
              timeframe={timeframe}
            />
          ) : (
            <AreaChartComponent
              data={chartData}
              symbol={symbol}
              timeframe={timeframe}
            />
          )}
        </div>

        {/* Кнопки действий */}
        <ChartActions symbol={symbol} />
      </CardContent>
    </Card>
  );
};

export default TradingChart;
