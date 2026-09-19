import React from 'react';
import { Book } from '../../types';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../ui/Button';
import { BookOpen, BookPlus, Bookmark, Edit } from 'lucide-react';

export interface BookDetailsModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (book: Book) => void;
  onBorrow?: (book: Book) => void;
  onReserve?: (book: Book) => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({
  book,
  isOpen,
  onClose,
  onEdit,
  onBorrow,
  onReserve,
}) => {
  if (!book) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Details"
      icon={<BookOpen className="w-5 h-5 text-[#005b7f]" />}
      maxWidth="lg"
    >
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Cover image or placeholder */}
          <div className="w-full sm:w-36 h-48 bg-gray-100 rounded-xl overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <BookOpen className="w-12 h-12 text-gray-400" />
            )}
          </div>

          {/* Details info */}
          <div className="flex-1 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-lg font-bold text-gray-900 leading-snug">
                {book.title}
              </h4>
              <StatusBadge status={book.status} />
            </div>

            <p className="text-sm font-semibold text-[#005b7f]">
              By {book.authorName} <span className="text-gray-400 font-normal">(Author ID: {book.authorId})</span>
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600 pt-1">
              <div>
                <span className="font-semibold text-gray-800">Book ID:</span> {book.bookId}
              </div>
              <div>
                <span className="font-semibold text-gray-800">ISBN:</span> {book.isbn}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Genre:</span> {book.genre}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Language:</span> {book.language || 'English'}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Total Copies:</span> {book.quantity || book.totalCopies}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Available:</span> {book.availableCopies}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Publisher:</span> {book.publisher || 'Academic Press'}
              </div>
              <div>
                <span className="font-semibold text-gray-800">Published:</span> {book.publishedYear}
              </div>
              {book.shelfLocation && (
                <div className="col-span-2">
                  <span className="font-semibold text-gray-800">Shelf Location:</span> {book.shelfLocation}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/70 text-xs text-gray-600 leading-relaxed">
            <p className="font-semibold text-gray-800 mb-1">Description:</p>
            {book.description}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-gray-200">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              icon={<Edit size={14} />}
              onClick={() => {
                onClose();
                onEdit(book);
              }}
            >
              Edit Book
            </Button>
          )}
          {onReserve && (
            <Button
              variant="light"
              size="sm"
              icon={<Bookmark size={14} className="text-purple-600" />}
              onClick={() => {
                onClose();
                onReserve(book);
              }}
            >
              Reserve
            </Button>
          )}
          {onBorrow && (
            <Button
              variant="primary"
              size="sm"
              icon={<BookPlus size={14} />}
              onClick={() => {
                onClose();
                onBorrow(book);
              }}
            >
              Issue Book
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
