import React, { useState } from 'react';
import { Book } from '../../types';
import { Button } from '../ui/Button';

export interface BookFormProps {
  onAddBook: (book: Omit<Book, 'id' | 'availableCopies' | 'totalCopies' | 'status' | 'publishedYear'> & { quantity: number }) => void;
  autoBookId?: string;
  initialValues?: Partial<Book>;
  isEditing?: boolean;
  onCancelEdit?: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({
  onAddBook,
  autoBookId = '997373627',
  initialValues,
  isEditing = false,
  onCancelEdit,
}) => {
  const currentBookId = initialValues?.bookId || autoBookId;
  const [isbn, setIsbn] = useState(initialValues?.isbn || '');
  const [title, setTitle] = useState(initialValues?.title || '');
  const [genre, setGenre] = useState(initialValues?.genre || '');
  const [authorId, setAuthorId] = useState(initialValues?.authorId || '');
  const [quantity, setQuantity] = useState<string>(
    initialValues?.quantity ? String(initialValues.quantity) : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddBook({
      bookId: currentBookId,
      isbn: isbn.trim() || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      title: title.trim(),
      genre: genre.trim() || 'General',
      category: genre.trim() || 'General',
      authorId: authorId.trim() || '001',
      authorName: initialValues?.authorName || 'Laxmi Prasad Devkota',
      quantity: parseInt(quantity, 10) || 1,
    });

    if (!isEditing) {
      setIsbn('');
      setTitle('');
      setGenre('');
      setAuthorId('');
      setQuantity('');
    }
  };

  return (
    <div className="bg-[#eaedf0] rounded-2xl p-5 sm:p-7 border border-gray-200/70 shadow-xs">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Book ID & ISBN - Exact layout with auto-assigned Book ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-gray-800">
                Book ID
              </label>
              <span className="text-[11px] font-medium text-gray-500 bg-gray-200/80 px-2 py-0.5 rounded-md">
                Auto-assigned
              </span>
            </div>
            <input
              type="text"
              value={currentBookId}
              disabled
              readOnly
              className="w-full bg-[#dbe0e6]/70 border border-gray-300/80 rounded-xl px-4 py-2.5 text-sm text-gray-600 font-mono cursor-not-allowed select-none focus:outline-none"
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
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Row 2: Title & Genre - Exact layout from Screenshot 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Book Title"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
          <div className="sm:col-span-1">
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Genre
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g. Computer Science, Fiction"
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Row 3: AuthorID & Quantity - Exact layout from Screenshot 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Author ID
            </label>
            <input
              type="text"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
              placeholder="e.g. 001"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1.5">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 10"
              required
              className="w-full bg-[#dbe0e6] rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#005b7f]/20 focus:border-[#005b7f] transition-all"
            />
          </div>
        </div>

        {/* Action Button - Exact teal 'ADD BOOK' button */}
        <div className="pt-2 flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            className="text-xs uppercase tracking-wider font-bold px-8 py-3 rounded-xl bg-[#005b7f] hover:bg-[#004d6b]"
          >
            {isEditing ? 'UPDATE BOOK' : 'ADD BOOK'}
          </Button>

          {isEditing && onCancelEdit && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancelEdit}
              className="rounded-xl"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

