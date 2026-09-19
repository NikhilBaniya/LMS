import React, { useState } from 'react';
import { BorrowingTransaction } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../ui/Button';
import { RotateCcw } from 'lucide-react';
import { getCurrentFormattedDateTime } from '../../utils/helpers';

export interface ReturnBookModalProps {
  transaction: BorrowingTransaction | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmReturn: (transaction: BorrowingTransaction, fine: number, notes: string) => void;
}

export const ReturnBookModal: React.FC<ReturnBookModalProps> = ({
  transaction,
  isOpen,
  onClose,
  onConfirmReturn,
}) => {
  const [fineAmount, setFineAmount] = useState('0.00');
  const [returnNotes, setReturnNotes] = useState('Returned in good condition');

  if (!transaction) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmReturn(transaction, parseFloat(fineAmount) || 0, returnNotes);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Return Book & Process"
      icon={<RotateCcw className="w-5 h-5 text-[#005b7f]" />}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200/70 space-y-1.5 text-xs text-gray-700">
          <div>
            <span className="font-semibold text-gray-900">Transaction ID:</span> {transaction.tId}
          </div>
          <div>
            <span className="font-semibold text-gray-900">User ID:</span> {transaction.userId} ({transaction.userName || 'Member'})
          </div>
          <div>
            <span className="font-semibold text-gray-900">Book ID:</span> {transaction.bookId}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Book Title:</span> {transaction.bookTitle}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Issued On:</span> {transaction.date}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Due Date:</span> {transaction.dueDate}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              Return Timestamp
            </label>
            <input
              type="text"
              readOnly
              value={getCurrentFormattedDateTime()}
              className="w-full bg-gray-100 rounded-xl px-3 py-2 text-xs text-gray-600 font-mono border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-1">
              Late Fee / Fine (Rs.)
            </label>
            <input
              type="number"
              step="0.5"
              min="0"
              value={fineAmount}
              onChange={(e) => setFineAmount(e.target.value)}
              className="w-full bg-white rounded-xl px-3 py-2 text-xs text-gray-800 font-semibold border border-gray-300 focus:border-[#005b7f] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-800 mb-1">
            Condition / Return Notes
          </label>
          <textarea
            rows={2}
            value={returnNotes}
            onChange={(e) => setReturnNotes(e.target.value)}
            className="w-full bg-white rounded-xl px-3 py-2 text-xs text-gray-800 border border-gray-300 focus:border-[#005b7f] outline-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-gray-200">
          <Button variant="outline" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit">
            Confirm Return
          </Button>
        </div>
      </form>
    </Modal>
  );
};
