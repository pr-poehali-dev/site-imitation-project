
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ChartActionsProps {
  symbol: string;
}

const ChartActions: React.FC<ChartActionsProps> = ({ symbol }) => {
  // Получаем первую часть символа (например, BTC из BTC/USD)
  const assetName = symbol.split('/')[0];

  return (
    <div className="mt-4 flex justify-between">
      <Button className="bg-green-600 hover:bg-green-700 gap-2">
        <Icon name="ArrowUpRight" />
        Купить {assetName}
      </Button>
      <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 gap-2">
        <Icon name="ArrowDownRight" />
        Продать {assetName}
      </Button>
    </div>
  );
};

export default ChartActions;
