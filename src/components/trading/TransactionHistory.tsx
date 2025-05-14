
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

// Типы для транзакций
type TransactionType = 'buy' | 'sell';
type TransactionStatus = 'success' | 'pending' | 'failed';

interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  asset: string;
  amount: number;
  price: number;
  total: number;
  status: TransactionStatus;
  profit?: number;
}

// Форматирование даты
const formatDate = (date: Date): string => {
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Форматирование валюты
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Генерация случайной транзакции с наклоном к успешным сделкам
const generateRandomTransaction = (id: string): Transaction => {
  const assets = ['BTC', 'ETH', 'LTC', 'XRP', 'DOGE'];
  const now = new Date();
  const type: TransactionType = Math.random() > 0.5 ? 'buy' : 'sell';
  const asset = assets[Math.floor(Math.random() * assets.length)];
  const amount = parseFloat((Math.random() * 2).toFixed(4));
  const price = parseFloat((Math.random() * 50000 + 1000).toFixed(2));
  const total = parseFloat((amount * price).toFixed(2));
  
  // Добавляем случайный профит для продаж, с тенденцией к прибыльности
  let profit = undefined;
  if (type === 'sell') {
    // 70% шанс прибыли, 30% шанс убытка
    const profitChance = Math.random();
    if (profitChance < 0.7) {
      profit = parseFloat((total * (Math.random() * 0.2 + 0.01)).toFixed(2));
    } else {
      profit = -parseFloat((total * (Math.random() * 0.1 + 0.01)).toFixed(2));
    }
  }
  
  // Большинство сделок успешны
  const statusRandom = Math.random();
  let status: TransactionStatus = 'success';
  if (statusRandom > 0.9) {
    status = 'failed';
  } else if (statusRandom > 0.85) {
    status = 'pending';
  }
  
  // Создаем случайную дату в пределах последних 3 дней
  const randomDate = new Date(now.getTime() - Math.random() * 3 * 24 * 60 * 60 * 1000);
  
  return {
    id,
    date: formatDate(randomDate),
    type,
    asset,
    amount,
    price,
    total,
    status,
    profit
  };
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    // Генерируем начальные транзакции
    const initialTransactions: Transaction[] = [];
    for (let i = 0; i < 10; i++) {
      initialTransactions.push(generateRandomTransaction(`tx-${i+1}`));
    }
    setTransactions(initialTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    
    // Периодически добавляем новые транзакции
    const interval = setInterval(() => {
      const newTransaction = generateRandomTransaction(`tx-${Math.floor(Math.random() * 10000)}`);
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
    }, 20000); // Каждые 20 секунд
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="mt-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Icon name="History" className="text-primary" />
          История транзакций
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Дата</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Актив</TableHead>
              <TableHead className="text-right">Количество</TableHead>
              <TableHead className="text-right">Цена</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
              <TableHead className="text-right">Прибыль</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {transaction.type === 'buy' ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200">
                        Покупка
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200">
                        Продажа
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{transaction.asset}</TableCell>
                <TableCell className="text-right font-mono">{transaction.amount}</TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(transaction.price)}</TableCell>
                <TableCell className="text-right font-mono">{formatCurrency(transaction.total)}</TableCell>
                <TableCell className="text-right font-mono">
                  {transaction.profit !== undefined ? (
                    <span className={transaction.profit >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {transaction.profit >= 0 ? '+' : ''}{formatCurrency(transaction.profit)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {transaction.status === 'success' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Icon name="CheckCircle" className="mr-1 h-3 w-3" /> Успешно
                    </Badge>
                  ) : transaction.status === 'pending' ? (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Icon name="Clock" className="mr-1 h-3 w-3" /> В процессе
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <Icon name="XCircle" className="mr-1 h-3 w-3" /> Отказано
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
