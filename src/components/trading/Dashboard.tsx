
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowUpRight, TrendingUp, DollarSign, PiggyBank } from 'lucide-react';
import Icon from '@/components/ui/icon';
import { useToast } from '@/components/ui/use-toast';

// Генерация случайного числа в диапазоне
const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

// Функция для форматирования чисел как валюты
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

const Dashboard = () => {
  const [balance, setBalance] = useState(10000);
  const [profit, setProfit] = useState(0);
  const [profitPercent, setProfitPercent] = useState(0);
  const [dayProgress, setDayProgress] = useState(45);
  const [isPositive, setIsPositive] = useState(true);
  const { toast } = useToast();

  // Эффект для периодического обновления баланса, чтобы создать иллюзию торговли
  useEffect(() => {
    const interval = setInterval(() => {
      // Генерируем случайное изменение баланса с уклоном в положительную сторону
      const change = randomInRange(-200, 400);
      const newBalance = balance + change;
      
      // Обновляем баланс
      setBalance(newBalance);
      
      // Вычисляем процент прибыли
      const newProfit = newBalance - 10000;
      setProfit(newProfit);
      setProfitPercent((newProfit / 10000) * 100);
      setIsPositive(newProfit > 0);
      
      // Обновляем прогресс дня
      setDayProgress(prev => Math.min(prev + randomInRange(-2, 5), 100));
      
      // Уведомление о крупной сделке если изменение больше определенного порога
      if (change > 300) {
        toast({
          title: "Успешная сделка!",
          description: `Прибыль: ${formatCurrency(change)}`,
          duration: 3000,
        });
      }
      
    }, 5000);

    return () => clearInterval(interval);
  }, [balance, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Карточка с балансом */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Icon name="Wallet" className="text-primary" />
            Ваш баланс
          </CardTitle>
          <CardDescription>Текущее состояние счета</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold mb-2 font-mono animate-pulse">
            {formatCurrency(balance)}
          </div>
          <div className={`flex items-center gap-2 text-lg ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} />
            {isPositive ? '+' : ''}{formatCurrency(profit)} ({profitPercent.toFixed(2)}%)
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" className="flex gap-2">
            <Icon name="RefreshCcw" size={16} />
            Обновить
          </Button>
          <Button variant="outline" size="sm" className="flex gap-2">
            <Icon name="Download" size={16} />
            Отчёт
          </Button>
        </CardFooter>
      </Card>

      {/* Карточка с прогрессом торгового дня */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon name="Timer" className="text-primary" />
            Прогресс торгового дня
          </CardTitle>
          <CardDescription>Осталось времени до закрытия биржи</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={dayProgress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>9:30 AM</span>
            <span>{dayProgress}%</span>
            <span>16:00 PM</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground w-full">
            Оптимальное время для сделок: <span className="font-medium text-primary">сейчас</span>
          </div>
        </CardFooter>
      </Card>

      {/* Карточка с быстрыми действиями */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Icon name="Zap" className="text-primary" />
            Быстрые действия
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-primary/5">
            <Icon name="PiggyBank" size={24} className="mb-2 text-primary" />
            <span>Пополнить</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-primary/5">
            <Icon name="CreditCard" size={24} className="mb-2 text-primary" />
            <span>Вывести</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-primary/5">
            <Icon name="BarChart" size={24} className="mb-2 text-primary" />
            <span>Инвестировать</span>
          </Button>
          <Button variant="outline" className="flex flex-col items-center justify-center h-24 hover:bg-primary/5">
            <Icon name="Settings" size={24} className="mb-2 text-primary" />
            <span>Настройки</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
