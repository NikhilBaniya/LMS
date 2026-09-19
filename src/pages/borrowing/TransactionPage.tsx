import React, { useState, useMemo } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { TransactionTable } from '../../components/borrowing/TransactionTable';
import { ReturnBookModal } from '../../components/borrowing/ReturnBookModal';
import { SearchInput } from '../../components/common/SearchInput';
import { INITIAL_TRANSACTIONS } from '../../constants/borrowing';
import { BorrowingTransaction } from '../../types';

export const TransactionPage: React.FC = () => {
  const [transactions, setTransactions] = useState<BorrowingTransaction[]>(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrxForReturn, setSelectedTrxForReturn] = useState<BorrowingTransaction | null>(null);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery.trim()) return transactions;
    const q = searchQuery.toLowerCase();
    return transactions.filter(
      (t) =>
        t.tId.toLowerCase().includes(q) ||
        t.userId.toLowerCase().includes(q) ||
        t.bookId.toLowerCase().includes(q) ||
        t.sId.toLowerCase().includes(q) ||
        t.transactionType.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q)
    );
  }, [transactions, searchQuery]);

  const handleConfirmReturn = (
    targetTrx: BorrowingTransaction,
    fine: number,
    notes: string
  ) => {
    const updated = transactions.map((t) =>
      t.id === targetTrx.id
        ? {
            ...t,
            transactionType: 'Returned' as const,
            returnDate: new Date().toISOString().split('T')[0],
            fineAmount: fine,
            notes,
          }
        : t
    );
    setTransactions(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header - Matching Screenshot 6 */}
      <PageHeader
        title="Transaction"
        icon={<ArrowLeftRight className="w-6 h-6 text-[#005b7f]" />}
      >
        <div className="w-64">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search transaction or Book ID..."
          />
        </div>
      </PageHeader>

      {/* Transaction Table - Matching Screenshot 6 */}
      <TransactionTable
        transactions={filteredTransactions}
        onReturnBook={(trx) => setSelectedTrxForReturn(trx)}
      />

      {/* Return Book Processing Modal */}
      <ReturnBookModal
        transaction={selectedTrxForReturn}
        isOpen={Boolean(selectedTrxForReturn)}
        onClose={() => setSelectedTrxForReturn(null)}
        onConfirmReturn={handleConfirmReturn}
      />
    </div>
  );
};
