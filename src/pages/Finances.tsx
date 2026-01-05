
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import BottomNavigation from '@/components/BottomNavigation';
import Bubbles from '@/components/Bubbles';
import Logo from '@/components/Logo';
import TransactionItem, { Transaction } from '@/components/TransactionItem';
import TransactionsSummary from '@/components/TransactionsSummary';
import { fetchTransactions } from '@/services/transactionService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, CreditCard } from 'lucide-react';

const Finances = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('deposit');
  
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  const handleDeposit = () => {
    toast({
      title: "Deposit",
      description: "Deposit functionality will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-trent-primary pb-20">
      <Bubbles />
      <Logo />
      
      <div className="container px-4 py-4">
        <div className="flex justify-around mb-6">
          <button
            className={`px-6 py-2 rounded-full ${
              activeSection === 'deposit' 
                ? 'bg-white text-trent-primary' 
                : 'bg-white/10 text-white'
            }`}
            onClick={() => setActiveSection('deposit')}
          >
            DEPOSIT
          </button>
          
          <button
            className={`px-6 py-2 rounded-full ${
              activeSection === 'access' 
                ? 'bg-white text-trent-primary' 
                : 'bg-white/10 text-white'
            }`}
            onClick={() => setActiveSection('access')}
          >
            ACCESS CARDS
          </button>
        </div>
        
        {activeSection === 'deposit' && (
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-white font-semibold text-lg mb-4">Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Student #:</span>
                  <span className="text-white">{user?.studentId || '0000000'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Current Balance:</span>
                  <span className="text-white font-bold">$243.78</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Transaction Limit:</span>
                  <span className="text-white">$500.00</span>
                </div>
              </div>
              
              <button 
                onClick={handleDeposit}
                className="mt-4 w-full flex items-center justify-center bg-white text-trent-primary font-medium p-2 rounded-md"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Funds
              </button>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-white font-semibold text-lg mb-4">Bank Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Affiliated Bank #:</span>
                  <span className="text-white">003</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Affiliated Bank Transit #:</span>
                  <span className="text-white">05392</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-white/80">Affiliated Bank Account #:</span>
                  <span className="text-white">1234567</span>
                </div>
              </div>
            </div>
            
            <TransactionsSummary transactions={transactions} />
          </div>
        )}
        
        {activeSection === 'access' && (
          <div className="space-y-6">
            <div className="bg-white/10 rounded-xl p-4 flex items-center">
              <CreditCard className="h-10 w-10 text-white mr-4" />
              <div>
                <h3 className="text-white font-semibold">Trent Card</h3>
                <p className="text-white/80">Card Number: {user?.cardNumber || '0000000'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Activity</h3>
              
              <Tabs defaultValue="all">
                <TabsList className="bg-white/10 border border-white/20">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-trent-primary text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="cafeteria" className="data-[state=active]:bg-white data-[state=active]:text-trent-primary text-white">
                    Cafeteria
                  </TabsTrigger>
                  <TabsTrigger value="tim" className="data-[state=active]:bg-white data-[state=active]:text-trent-primary text-white">
                    Tim Hortons
                  </TabsTrigger>
                  <TabsTrigger value="social" className="data-[state=active]:bg-white data-[state=active]:text-trent-primary text-white">
                    The Social
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <p className="text-white">Loading transactions...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {transactions.map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="cafeteria" className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <p className="text-white">Loading transactions...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {transactions
                        .filter(t => t.vendor === 'Cafeteria')
                        .map((transaction) => (
                          <TransactionItem key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="tim" className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <p className="text-white">Loading transactions...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {transactions
                        .filter(t => t.vendor === 'Tim Hortons')
                        .map((transaction) => (
                          <TransactionItem key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="social" className="mt-4">
                  {isLoading ? (
                    <div className="flex justify-center py-4">
                      <p className="text-white">Loading transactions...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {transactions
                        .filter(t => t.vendor === 'The Social')
                        .map((transaction) => (
                          <TransactionItem key={transaction.id} transaction={transaction} />
                        ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Finances;
