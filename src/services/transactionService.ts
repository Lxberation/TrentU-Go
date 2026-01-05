
import { Transaction } from '@/components/TransactionItem';

// Mock transaction data
const generateMockTransactions = (): Transaction[] => {
  const vendors = ['Cafeteria', 'Tim Hortons', 'The Social'];
  const transactions: Transaction[] = [];

  for (let i = 0; i < 10; i++) {
    const vendor = vendors[Math.floor(Math.random() * vendors.length)];
    const amount = parseFloat((Math.random() * 20 + 5).toFixed(2));
    const daysAgo = Math.floor(Math.random() * 14); // Up to 14 days ago
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    transactions.push({
      id: `trans-${i}`,
      vendor,
      amount,
      date,
    });
  }

  // Sort by date (newest first)
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return generateMockTransactions();
};
