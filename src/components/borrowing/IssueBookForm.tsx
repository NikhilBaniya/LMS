import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { getCurrentFormattedDateTime } from '../../utils/helpers';
import { INITIAL_BOOKS } from '../../constants/books';

export interface IssueBookFormProps {
  onIssueBook: (issueData: {
    bookId: string;
    userId: string;
    bookTitle: string;
    isbn: string;
    date: string;
  }) => void;
}

export const IssueBookForm: React.FC<IssueBookFormProps> = ({ onIssueBook }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialBookId = searchParams.get('bookId') || '';
  const initialBookTitle = searchParams.get('bookTitle') || '';
  const initialIsbn = searchParams.get('isbn') || '';
  const initialUserId = searchParams.get('userId') || '';

  const [bookId, setBookId] = useState(initialBookId);
  const [userId, setUserId] = useState(initialUserId);
  const [bookTitle, setBookTitle] = useState(initialBookTitle);
  const [isbn, setIsbn] = useState(initialIsbn);
  const [date, setDate] = useState(getCurrentFormattedDateTime());
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-fill title and isbn if bookId changes
  const handleBookIdChange = (idVal: string) => {
    setBookId(idVal);
    const found = INITIAL_BOOKS.find((b) => b.bookId === idVal);
    if (found) {
      setBookTitle(found.title);
      setIsbn(found.isbn);
    }
  };

  useEffect(() => {
    if (initialBookId) {
      handleBookIdChange(initialBookId);
    }
  }, [initialBookId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId || !userId) return;

    onIssueBook({
      bookId,
      userId,
      bookTitle: bookTitle || 'Issued Book',
      isbn: isbn || 'N/A',
      date: date || getCurrentFormattedDateTime(),
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      navigate('/transaction');
    }, 1200);
  };

  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      {isSuccess && (
        <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold rounded-xl text-center">
          Book successfully issued! Redirecting to Transactions...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Book ID & UserID - Exact layout from Screenshot 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Book ID
            </label>
            <input
              type="text"
              value={bookId}
              onChange={(e) => handleBookIdChange(e.target.value)}
              placeholder="e.g. 997373627"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              UserID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 001"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Row 2: Book Title & ISBN - Exact layout from Screenshot 7 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Book Title
            </label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book Title"
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              ISBN
            </label>
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="e.g. 978-0132350884"
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Row 3: Date - Exact layout from Screenshot 7 */}
        <div>
          <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
            Date
          </label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="25-02-2024 10:39:43"
            required
            className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
          />
        </div>

        {/* Action Button - Exact 'Borrow' teal button from Screenshot 7 */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="text-xs font-bold px-10 py-3 rounded-xl bg-[#005b7f] hover:bg-[#004d6b]"
          >
            Borrow
          </Button>
        </div>
      </form>
    </div>
  );
};
