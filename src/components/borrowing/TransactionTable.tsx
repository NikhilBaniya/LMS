import React from 'react';
import { BorrowingTransaction } from '../../types';
import { Button } from '../ui/Button';
import { CheckCircle2, RotateCcw } from 'lucide-react';

export interface TransactionTableProps {
  transactions: BorrowingTransaction[];
  onReturnBook?: (transaction: BorrowingTransaction) => void;
  showActions?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onReturnBook,
  showActions = true,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header matching Screenshot 6 */}
          <thead>
            <tr className="border-b border-gray-200 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-50/70">
              <th className="py-3.5 px-4 sm:px-6">T_ID</th>
              <th className="py-3.5 px-4 sm:px-6">User ID</th>
              <th className="py-3.5 px-4 sm:px-6">S_ID</th>
              <th className="py-3.5 px-4 sm:px-6">Book ID</th>
              <th className="py-3.5 px-4 sm:px-6">Transaction Type</th>
              <th className="py-3.5 px-4 sm:px-6">Date</th>
              {showActions && <th className="py-3.5 px-4 sm:px-6 text-center">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-800">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={showActions ? 7 : 6}
                  className="py-10 text-center text-gray-500 font-medium"
                >
                  No transactions recorded yet.
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="hover:bg-gray-50/80 transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-gray-900 whitespace-nowrap">
                    {trx.tId}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800 whitespace-nowrap">
                    {trx.userId}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-gray-700 whitespace-nowrap">
                    {trx.sId}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-gray-900 whitespace-nowrap">
                    {trx.bookId}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-medium">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        trx.transactionType === 'Borrow'
                          ? 'bg-amber-100 text-amber-900'
                          : trx.transactionType === 'Returned'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-red-100 text-red-900'
                      }`}
                    >
                      {trx.transactionType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-gray-600 font-mono text-xs whitespace-nowrap">
                    {trx.date}
                  </td>
                  {showActions && (
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      {trx.transactionType === 'Borrow' && onReturnBook ? (
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<RotateCcw size={13} className="text-[#005b7f]" />}
                          onClick={() => onReturnBook(trx)}
                          className="px-3 py-1 text-xs border-[#005b7f]/30 text-[#005b7f] hover:bg-[#005b7f]/10"
                        >
                          Return
                        </Button>
                      ) : (
                        <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
                          <CheckCircle2 size={13} className="text-emerald-500" /> Settled
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
