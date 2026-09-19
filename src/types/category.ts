export interface Category {
  id: string;
  name: string;
  description: string;
  code: string;
  totalBooks: number;
  availableBooks: number;
  status: 'Active' | 'Inactive';
  color?: string;
  iconName?: string;
}
