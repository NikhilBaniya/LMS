import React from 'react';
import { SquarePen, Trash2, Eye } from 'lucide-react';
import { Book } from '../../types';

export interface BookTableProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onView: (book: Book) => void;
}

export const BookTable: React.FC<BookTableProps> = ({
  books,
  onEdit,
  onDelete,
  onView,
}) => {
  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 tracking-tight">
        Book Lists
      </h3>

      <div className="overflow-x-auto border border-gray-300 rounded-xl bg-white shadow-xs">
        <table className="w-full text-left border-collapse">
          {/* Header matching Screenshot 4 */}
          <thead>
            <tr className="bg-[#56595d] text-white text-xs sm:text-sm font-semibold divide-x divide-gray-400/40">
              <th className="py-3 px-4 sm:px-5">BookID</th>
              <th className="py-3 px-4 sm:px-5 min-w-[200px]">Title</th>
              <th className="py-3 px-4 sm:px-5">AuthorID</th>
              <th className="py-3 px-4 sm:px-5">Genre</th>
              <th className="py-3 px-4 sm:px-5">ISBN</th>
              <th className="py-3 px-4 sm:px-5 text-center">Quantity</th>
              <th className="py-3 px-4 sm:px-5 text-center w-28">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-800">
            {books.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500 font-medium">
                  No books found in the catalog.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 transition-colors divide-x divide-gray-200"
                >
                  <td className="py-3 px-4 sm:px-5 font-semibold text-gray-900 whitespace-nowrap">
                    {book.bookId}
                  </td>
                  <td className="py-3 px-4 sm:px-5 font-medium text-gray-900">
                    <button
                      onClick={() => onView(book)}
                      className="text-left hover:text-[#005b7f] hover:underline cursor-pointer"
                    >
                      {book.title}
                    </button>
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-gray-700 whitespace-nowrap">
                    {book.authorId}
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-gray-700">{book.genre}</td>
                  <td className="py-3 px-4 sm:px-5 text-gray-600 font-mono text-xs whitespace-nowrap">
                    {book.isbn}
                  </td>
                  <td className="py-3 px-4 sm:px-5 text-center font-bold text-gray-900">
                    {book.quantity}
                  </td>
                  <td className="py-3 px-4 sm:px-5">
                    {/* Action icons matching Screenshot 4 */}
                    <div className="flex items-center justify-center gap-3 text-[#005b7f]">
                      <button
                        onClick={() => onView(book)}
                        title="View Details"
                        className="p-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-[#005b7f] transition-colors cursor-pointer"
                        aria-label="View Details"
                      >
                        <Eye size={17} />
                      </button>
                      <button
                        onClick={() => onEdit(book)}
                        title="Edit Book"
                        className="p-1 rounded-md hover:bg-gray-100 text-[#005b7f] hover:text-[#00425c] transition-colors cursor-pointer"
                        aria-label="Edit Book"
                      >
                        <SquarePen size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(book)}
                        title="Delete Book"
                        className="p-1 rounded-md hover:bg-red-50 text-[#005b7f] hover:text-red-600 transition-colors cursor-pointer"
                        aria-label="Delete Book"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
