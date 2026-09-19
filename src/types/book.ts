export type BookStatus = 'Available' | 'Borrowed' | 'Reserved' | 'Out of Stock';

export interface Book {
  id: string;
  bookId: string; // e.g. "BK-001" or "997373627"
  title: string;
  authorId: string;
  authorName: string;
  isbn: string;
  genre: string; // or category
  category: string;
  quantity: number;
  availableCopies: number;
  totalCopies: number;
  status: BookStatus;
  publishedYear: number;
  publisher?: string;
  language?: string;
  description?: string;
  coverImage?: string;
  shelfLocation?: string;
  edition?: string;
  pages?: number;
}
