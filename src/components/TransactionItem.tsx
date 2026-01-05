
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

export interface Transaction {
  id: string;
  vendor: string;
  amount: number;
  date: Date;
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/10">
      <div className="flex flex-col">
        <span className="font-medium text-white">{transaction.vendor}</span>
        <span className="text-xs text-white/70">
          {formatDistanceToNow(transaction.date, { addSuffix: true })}
        </span>
      </div>
      <span className="text-white font-semibold">-${transaction.amount.toFixed(2)}</span>
    </div>
  );
};

export default TransactionItem;
