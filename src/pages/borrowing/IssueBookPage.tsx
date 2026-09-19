import React, { useState } from 'react';
import { BookPlus } from 'lucide-react';
import { PageHeader } from '../../components/common/PageHeader';
import { IssueBookForm } from '../../components/borrowing/IssueBookForm';
import { INITIAL_TRANSACTIONS } from '../../constants/borrowing';
import { BorrowingTransaction } from '../../types';

export const IssueBookPage: React.FC = () => {
  const [, setTransactions] = useState<BorrowingTransaction[]>(INITIAL_TRANSACTIONS);

  const handleIssueBook = (issueData: {
    bookId: string;
    userId: string;
    bookTitle: string;
    isbn: string;
    date: string;
  }) => {
    const nextTId = String(INITIAL_TRANSACTIONS.length + 1).padStart(3, '0');
    const newTrx: BorrowingTransaction = {
      id: `trx-${Date.now()}`,
      tId: nextTId,
      userId: issueData.userId,
      sId: '001 Books',
      bookId: issueData.bookId,
      bookTitle: issueData.bookTitle,
      isbn: issueData.isbn,
      transactionType: 'Borrow',
      date: issueData.date,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      fineAmount: 0,
      issuerAdmin: 'Admin Clara',
    };

    setTransactions((prev) => [newTrx, ...prev]);
    INITIAL_TRANSACTIONS.unshift(newTrx);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header - Matching Screenshot 7 */}
      <PageHeader
        title="Issue Book"
        icon={<BookPlus className="w-6 h-6 text-[#005b7f]" />}
      />

      {/* Form Card - Matching Screenshot 7 */}
      <IssueBookForm onIssueBook={handleIssueBook} />
    </div>
  );
};
