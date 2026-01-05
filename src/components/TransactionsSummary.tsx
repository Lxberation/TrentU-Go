import React from 'react';
import { Transaction } from './TransactionItem';

interface TransactionsSummaryProps {
  transactions: Transaction[];
}

const TransactionsSummary: React.FC<TransactionsSummaryProps> = ({ transactions }) => {
  // Calculate total spent
  const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div className="bg-white/10 rounded-xl p-4 mb-4">
      <h3 className="text-white font-semibold text-lg mb-4">Wallet Summary</h3>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-white/80">Total Spent:</span>
        <span className="text-white font-bold">${totalSpent.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TransactionsSummary;
