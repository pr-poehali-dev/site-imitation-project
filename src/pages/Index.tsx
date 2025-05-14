
import React from 'react';
import Header from '@/components/trading/Header';
import Dashboard from '@/components/trading/Dashboard';
import TradingChart from '@/components/trading/TradingChart';
import TransactionHistory from '@/components/trading/TransactionHistory';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-6">
        <h1 className="text-3xl font-bold mb-6">Дашборд трейдера</h1>
        
        <Dashboard />
        <TradingChart />
        <TransactionHistory />
      </main>
      
      <footer className="border-t py-4 bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 ТрейдерПро. Это демонстрационная версия. Все операции виртуальные.</p>
          <p className="mt-1 text-xs">Данный симулятор не дает финансовых советов и не предназначен для реальной торговли.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
