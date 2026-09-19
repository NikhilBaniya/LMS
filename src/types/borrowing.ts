export type BorrowingStatus = 'Borrow' | 'Returned' | 'Overdue' | 'Renewed';

export interface BorrowingTransaction {
  id: string;
  tId: string; // e.g. "001", "TRX-101"
  userId: string; // e.g. "001" or "STU-1001"
  userName?: string;
  sId: string; // e.g. "002 Books" or "STU-001"
  bookId: string; // e.g. "997373627" or "BK-001"
  bookTitle: string;
  isbn: string;
  transactionType: BorrowingStatus;
  date: string; // e.g. "25-02-2024 10:39:43"
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  fineAmount: number;
  notes?: string;
  issuerAdmin?: string;
}
