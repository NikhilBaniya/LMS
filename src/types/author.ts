export interface Author {
  id: string;
  authorId: string; // e.g. "AUT-001"
  name: string;
  bio: string;
  genre: string;
  totalBooks: number;
  status: 'Active' | 'Inactive';
  avatar?: string;
  bornYear?: number;
  nationality?: string;
  notableWorks?: string[];
}
