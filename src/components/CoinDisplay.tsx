
import React from 'react';
import { Coins } from 'lucide-react';

interface CoinDisplayProps {
  coins: number;
}

const CoinDisplay = ({ coins }: CoinDisplayProps) => {
  return (
    <div className="flex items-center space-x-2 bg-gold-100 px-3 py-1 rounded-full border border-gold-200">
      <Coins className="w-4 h-4 text-gold-600" />
      <span className="font-semibold text-gold-700">{coins}</span>
    </div>
  );
};

export default CoinDisplay;
