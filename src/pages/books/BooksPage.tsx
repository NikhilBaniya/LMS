import React, { useState, useMemo } from 'react';
import { BookPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common/PageHeader';
import { BookForm } from '../../components/books/BookForm';
import { BookTable } from '../../components/books/BookTable';
import { BookDetailsModal } from '../../components/books/BookDetailsModal';
import { EditBookModal } from '../../components/books/EditBookModal';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { SearchInput } from '../../components/common/SearchInput';
import { INITIAL_BOOKS } from '../../constants/books';
import { Book } from '../../types';

export const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const navigate = useNavigate();

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const query = searchQuery.toLowerCase();
    return books.filter(
      (b) =>
        b.bookId.toLowerCase().includes(query) ||
        b.title.toLowerCase().includes(query) ||
        b.isbn.toLowerCase().includes(query) ||
        b.genre.toLowerCase().includes(query) ||
        b.authorId.toLowerCase().includes(query)
    );
  }, [books, searchQuery]);

  // Compute next auto-assigned book ID
  const nextBookId = useMemo(() => {
    const numericIds = books
      .map((b) => parseInt(b.bookId, 10))
      .filter((n) => !isNaN(n));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 997373626 + books.length;
    return String(maxId + 1);
  }, [books]);

  const handleAddBook = (
    bookData: Omit<Book, 'id' | 'availableCopies' | 'totalCopies' | 'status' | 'publishedYear'> & { quantity: number }
  ) => {
    const newBook: Book = {
      id: `bk-${Date.now()}`,
      bookId: bookData.bookId || nextBookId,
      isbn: bookData.isbn,
      title: bookData.title,
      genre: bookData.genre,
      category: bookData.genre,
      authorId: bookData.authorId,
      authorName: bookData.authorName || 'Author',
      quantity: bookData.quantity,
      totalCopies: bookData.quantity,
      availableCopies: bookData.quantity,
      status: 'Available',
      publishedYear: new Date().getFullYear(),
    };
    setBooks((prev) => [newBook, ...prev]);
  };

  const handleSaveEditedBook = (updatedBook: Book) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
    if (selectedBook && selectedBook.id === updatedBook.id) {
      setSelectedBook(updatedBook);
    }
    setEditingBook(null);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      setBooks((prev) => prev.filter((b) => b.id !== bookToDelete.id));
      setBookToDelete(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header - Matching Screenshot 4 */}
      <PageHeader
        title="Books Details"
        icon={<BookPlus className="w-6 h-6 text-[#005b7f]" />}
      >
        <div className="w-64">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search book or ISBN..."
          />
        </div>
      </PageHeader>

      {/* Top Form Card - Matching Screenshot 4 */}
      <BookForm
        onAddBook={handleAddBook}
        autoBookId={nextBookId}
        isEditing={false}
      />

      {/* Bottom Table Card - Matching Screenshot 4 */}
      <BookTable
        books={filteredBooks}
        onEdit={(book) => setEditingBook(book)}
        onDelete={(book) => setBookToDelete(book)}
        onView={(book) => setSelectedBook(book)}
      />

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        isOpen={Boolean(selectedBook)}
        onClose={() => setSelectedBook(null)}
        onEdit={(b) => {
          setSelectedBook(null);
          setEditingBook(b);
        }}
        onBorrow={(b) => {
          setSelectedBook(null);
          navigate(`/issuing?bookId=${b.bookId}&bookTitle=${encodeURIComponent(b.title)}&isbn=${b.isbn}`);
        }}
      />

      {/* Edit Book Modal with all editable fields */}
      <EditBookModal
        book={editingBook}
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
        onSave={handleSaveEditedBook}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(bookToDelete)}
        onClose={() => setBookToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Book"
        message={`Are you sure you want to delete "${bookToDelete?.title}" (ID: ${bookToDelete?.bookId})? This action will remove all catalog entries.`}
        confirmText="Delete Book"
      />
    </div>
  );
};
